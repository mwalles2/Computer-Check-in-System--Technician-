<?php
	header("Cache-Control: no-cache");
	require_once("includes/php/db.php");
	require_once("includes/php/ldap_info.php");
	require_once("includes/php/general.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);
	if($_GET["test"] == "true")
	{
		$test = true;
	}
	else if($_POST["test"] == "true")
	{
		$test = true;
	}
	else
	{
		$test = false;
	}

	$contact_query = array();

	if($_GET['LDAP'] == "true")
	{
		if($test)
		{
			echo "LDAP<br>";
		}
		$LDAP_link = ldap_connect($LDAP_server);
		if(ldap_bind($LDAP_link,$LDAP_dn,$LDAP_password))
		{
			if($test)
			{
				echo "LDAP Bind<br>";
			}
			$LDAP_attrib_list = array("displayname","sn","givenname","edupersonprimaryaffiliation","mail","telephonenumber","unlsislocalphone","unluncwid","uid");
			$LDAP_query = "unlUNCWID=".$_GET["nuid"];
			$LDAP_search = ldap_search($LDAP_link,$LDAP_base_dn,"(".$LDAP_query.")",$LDAP_attrib_list);
			$LDAP_info = ldap_get_entries($LDAP_link,$LDAP_search);

			$nuid = mysql_real_escape_string($LDAP_info[0]['unluncwid'][0]);
			$name = mysql_real_escape_string($LDAP_info[0]['displayname'][0]);
			$given = mysql_real_escape_string($LDAP_info[0]['givenname'][0]);
			$sur = mysql_real_escape_string($LDAP_info[0]['sn'][0]);
			$status = mysql_real_escape_string($LDAP_info[0]['edupersonprimaryaffiliation'][0]);
			$username = mysql_real_escape_string($LDAP_info[0]['uid'][0]);
			$password = mysql_real_escape_string("NULL");

			if($test)
			{
				echo "nuid = ".$nuid."<br>";
				echo "name = ".$name."<br>";
				echo "given = ".$given."<br>";
				echo "sur = ".$sur."<br>";
				echo "status = ".$status."<br>";
				echo "username = ".$username."<br>";
				echo "password = ".$password."<br>";
			}

			for($i = 0; $i < $LDAP_info[0]['mail']['count']; $i++)
			{
				$contact_query[] = "('".$nuid."','email','".$LDAP_info[0]['mail'][$i]."','".normalizeEmail($LDAP_info[0]['mail'][$i])."')";
			}

			for($i = 0; $i < $LDAP_info[0]['telephonenumber']['count']; $i++)
			{
				$contact_query[] = "('".$nuid."','phone','".$LDAP_info[0]['telephonenumber'][$i]."','".normalizePhone($LDAP_info[0]['telephonenumber'][$i])."')";
			}

			for($i = 0; $i < $LDAP_info[0]['unlsislocalphone']['count']; $i++)
			{
				$contact_query[] = "('".$nuid."','phone','".$LDAP_info[0]['unlsislocalphone'][$i]."','".normalizePhone($LDAP_info[0]['unlsislocalphone'][$i])."' )";
			}
		}
	}
	else if($_GET['notes'] == "true")
	{
		if($test)
		{
			echo "Notes<br>";
		}
		list($notesUsername, $server) = explode("@",$_GET['username']);
		$LDAP_link = ldap_connect("notes.unl.edu");
		if(ldap_bind($LDAP_link,$notesUsername,urldecode($_GET["password"])))
		{
			if($test)
			{
				echo "Notes Bind<br>";
			}
			$LDAP_query = "uid=".$notesUsername;
			$LDAP_search = ldap_search($LDAP_link,"","(".$LDAP_query.")");
			$LDAP_info = ldap_get_entries($LDAP_link,$LDAP_search);

			$nuid = mysql_real_escape_string("X"); 	//Once central adds NUIDs to Notes I will update this and will need a way to combine with UNL LDAP
			$name = mysql_real_escape_string($LDAP_info[0]['cn'][0]);
			$given = mysql_real_escape_string($LDAP_info[0]['givenname'][0]);
			$sur = mysql_real_escape_string($LDAP_info[0]['sn'][0]);
			$status = mysql_real_escape_string($status);
			$username = mysql_real_escape_string($_GET['username']);
			$password = mysql_real_escape_string("NULL");

			if($test)
			{
				echo "nuid = ".$nuid."<br>";
				echo "name = ".$name."<br>";
				echo "given = ".$given."<br>";
				echo "sur = ".$sur."<br>";
				echo "status = ".$status."<br>";
				echo "username = ".$username."<br>";
				echo "notesUsername = ".$notesUsername."<br>";
				echo "password = ".$password."<br>";
			}

			for($i = 0; $i < $LDAP_info[0]['mail']['count']; $i++)
			{
				$contact_query[] = "('".$nuid."','email','".$LDAP_info[0]['mail'][$i]."','".normalizeEmail($LDAP_info[0]['mail'][$i])."' )";
			}

			for($i = 0; $i < $LDAP_info[0]['telephonenumber']['count']; $i++)
			{
				$contact_query[] = "('".$nuid."','phone','".$LDAP_info[0]['telephonenumber'][$i]."','".normalizePhone($LDAP_info[0]['telephonenumber'][$i])."' )";
			}
		}
	}
	else if($_POST['new'] == "true")
	{
		if($test)
		{
			echo "local<br>";
		}

		$nuid = mysql_real_escape_string("x");
		$name = mysql_real_escape_string($_POST["first"] . " " . $_POST["last"]);
		$given = mysql_real_escape_string($_POST["first"]);
		$sur = mysql_real_escape_string($_POST["last"]);
		$status = mysql_real_escape_string("other");
		$username = mysql_real_escape_string($_POST["email"]);
		$password = "'".md5($_POST["password"])."'";
		if($test)
		{
			echo "nuid = ".$nuid."<br>";
			echo "name = ".$name."<br>";
			echo "given = ".$given."<br>";
			echo "sur = ".$sur."<br>";
			echo "status = ".$status."<br>";
			echo "username = ".$username."<br>";
			echo "password = ".$password."<br>";
		}
 		$contact_query[] = "('".$nuid."','email','".$username."','".normalizeEmail($username)."')";
	}

	$new_user = mysql_query("insert into user (nuid,iso, name, givenname, surname, status, username, password) values ('".$nuid."', NULL, '".$name."', '".$given."', '".$sur."', '".$status."', '".$username."', ".$password.")");
	if($test)
	{
		echo mysql_errno().": ".mysql_error()."<br>";
	}
	$new_user_uid = mysql_insert_id();
	$search_index = mysql_query("insert into search_index (TableID, TableIDNum, TableName, Type, Data) values ('uid',".$new_user_uid.",'user','firstname','".strtolower($given)."'),('uid',".$new_user_uid.",'user','lastname','".strtolower($sur)."'),('uid',".$new_user_uid.",'user','nuid','".$nuid."')");
	if($test)
	{
		echo mysql_errno().": ".mysql_error()."<br>";
	}
	if($_POST['new'] == "true" || $_GET['notes'] == "true")
	{
		mysql_query("update user set nuid='X".$new_user_uid."' where uid = ".$new_user_uid);
		mysql_query("insert into contact (nuid, type, data, normalized) values ('X".$new_user_uid."','email','".$username."','".normalizeEmail($username)."')");
	}

	if(count($contact_query) > 0)
	{
		mysql_query("insert into contact (nuid, type, data, normalized) values ".implode(",",$contact_query));
	}

	setcookie("uid",$new_user_uid,0,"/");

	mysql_close($connect);
	if($_GET["test"] != "true")
	{
		header("Location: form.php");
	}
?>