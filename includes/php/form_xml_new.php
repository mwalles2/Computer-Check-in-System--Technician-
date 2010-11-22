<?php
	header("Cache-Control: no-cache");
	require_once("db.php");
	require_once("ldap_info.php");
	require_once("general.php");

	error_reporting(E_ERROR);

	$unl_ldap = false;		// This is true if the auth attempt is going to be off ldap.unl.edu
	$try_auth = true;		// This is true if an auth attempt needs to happen
							// This will be false if an UNL domain is provided with the email
	$ldap_auth = true;		// This is true if the auth attempt will be against any LDAP server
							// This will be false if the auth attempt will be against the local DB

	$xml_out = "";
	$mysql_xml_out = "\t<mysql>\n";

	$remove_array = array("+","(",")","-"," ");

	$mail_xml = "";
	$mail_array = array();

	$phone_xml = "";
	$phone_array = array();

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$mysql_user_query = mysql_query("select * from user where uid = '".$_GET['uid']."'");
	$mysql_user_row = mysql_fetch_array($mysql_user_query);
	$nuid = $mysql_user_row["nuid"];


	$LDAP_link = ldap_connect($LDAP_server);
	if(ldap_bind($LDAP_link,$LDAP_dn,$LDAP_password))
	{
		$LDAP_attrib_list = array("mail","telephonenumber","unlsislocalphone");
		$LDAP_query = "unlUNCWID=".$nuid;
		$LDAP_search = ldap_search($LDAP_link,$LDAP_base_dn,"(".$LDAP_query.")",$LDAP_attrib_list);
		$LDAP_info = ldap_get_entries($LDAP_link,$LDAP_search);
	}

	$LDAP_contact = array();
	for($i = 0; $i < $LDAP_info[0]['mail']['count']; $i++)
	{
		$LDAP_contact["email"][] = $LDAP_info[0]['mail'][$i];
	}
	for($i = 0; $i < $LDAP_info[0]['telephonenumber']['count']; $i++)
	{
		$LDAP_contact["phone"][] = $LDAP_info[0]['telephonenumber'][$i];
	}
	for($i = 0; $i < $LDAP_info[0]['unlsislocalphone']['count']; $i++)
	{
		$LDAP_contact["phone"][] = $LDAP_info[0]['unlsislocalphone'][$i];
	}

	$computer_result = mysql_query("select distinct computer.*,user.* from computer,user,ticket,ttc where user.nuid='".$nuid."' and user.nuid=computer.nuid and computer.compid = ttc.compid and ttc.tid = ticket.tid and ticket.outdate < '".date("Y-m-d H:i:s", mktime(date("H"),date("i"),date("s")-30))."'",$connect);

	$comp="";
	if(mysql_num_rows($computer_result) > 0)
	{
		while ($computer_row = mysql_fetch_array($computer_result))  //1
		{
			//echo "3+) ".mysql_errno().": ".mysql_error()."\n";
			$comp .= "\t<computer>\n\t\t<compid>".$computer_row["CompID"]."</compid>\n";
			$comp .= "\t\t<brand>".$computer_row["Brand"]."</brand>\n";
			$comp .= "\t\t<type>".typeOut($computer_row["Type"])."</type>\n";
			$comp .= "\t\t<serialnum>".$computer_row["serialnum"]."</serialnum>\n";
			$comp .= "\t</computer>\n";
		}
	}

	$contact_computer_result = mysql_query("select DISTINCT type,data,active from contact where nuid='".$nuid."'",$connect);
	$mysql_xml_out .= "\t\t<check>select DISTINCT type,data from contact where nuid='".$nuid."'</check>\n";
	if(mysql_num_rows($contact_computer_result))
	{
		//echo mysql_errno()." :".mysql_error()."<br>";
		while ($contact_row = mysql_fetch_array($contact_computer_result))  //2
		{
			//echo mysql_errno()." :".mysql_error()."<br>";
			if($contact_row["type"] == "phone")
			{
				$phone_xml .= "\t<telephoneNumber>".$contact_row["data"]."</telephoneNumber>\n";
				$phone_array[] = str_replace($remove_array,"",$contact_row["data"]);
			}
			if ($contact_row["type"] == "email")
			{
				$mail_xml .= "\t<mail>".$contact_row["data"]."</mail>\n";
				$mail_array[] = strtolower($contact_row["data"]);
			}
		}
	}

	mysql_close($connect);
	$mysql_xml_out .= "\t</mysql>\n";

	header('Content-Type: text/xml');
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	$xml  = "<person>\n";
	$xml .= $xml_out;
	$xml .= $comp;
	$xml .= $phone_xml;
	$xml .= $mail_xml;
	$xml .= $mysql_xml_out;
	$xml .= "</person>";
	echo $xml;
?>