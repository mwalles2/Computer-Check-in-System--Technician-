<?php
	header("Cache-Control: no-cache");
	require_once("includes/php/db.php");
	require_once("includes/class/HtmlTemplate.class");
	require_once("includes/php/general.php");
	$debug = false;// true; //
	$debugout = "";

	function debug_mysql_query($number)
	{
		global $debugout;
		global $debug;
		if ($debug)
		{
			$debugout .= $number." ".mysql_errno().": ".mysql_error()."<br>\n";
		}		
	}

	if($_POST["uid"]==""||$_POST["date"]==""||$_POST["phone"]==""||$_POST["email"]==""||$_POST["computer"]==""||$_POST["compType"]==""||$_POST["powersupply"]==""||$_POST["caseText"]==""||$_POST["ethernet"]==""||$_POST["wireless"]==""||$_POST["cds"]==""||$_POST["accounts"]==""||$_POST["prob"]=="")
	{
		header("Location: entry.php");
		exit;
	}

	$uid = $_POST["uid"];


	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	debug_mysql_query(1);

	mysql_select_db($DB_database, $connect);
	debug_mysql_query(2);

	$error_connect = mysql_connect($DB_server,$DB_user,$DB_password);
	debug_mysql_query(3);
	
	mysql_select_db($DB_database, $error_connect);
	debug_mysql_query(4);

	$nuid_query = mysql_query("select * from user where uid = ".$uid);
	debug_mysql_query(5);

	$nuid_row = mysql_fetch_array($nuid_query);
	debug_mysql_query(6);

	$nuid = $nuid_row["nuid"];

	$power=($_POST["powersupply"]=="yes")?true:false;
	$ethernet=($_POST["ethernet"]=="yes")?true:false;
	$wireless=($_POST["wireless"]=="yes")?true:false;
	$backup=($_POST["backup"]=="y")?true:false;

	$locid = get_location($connect);
 
	$result = mysql_query("insert into ticket (nuid,CDs,problems,Accounts,laptopcase,laptoppower,Ethernet,Wireless,status,backup,locid) values ('".$nuid."','".mysql_real_escape_string($_POST["cds"])."','".mysql_real_escape_string($_POST["prob"])."','".mysql_real_escape_string($_POST["accounts"])."','".mysql_real_escape_string($_POST["caseText"])."','".$power."','".$ethernet."','".$wireless."','new','".$backup."',".$locid.")",$connect);
	debug_mysql_query(7);

	$tid = mysql_insert_id();
	$date_result = mysql_query("select INDATE from ticket where tid=".$tid,$connect);
	debug_mysql_query(8);

	$date_row = mysql_fetch_array($date_result);
	debug_mysql_query(9);

	$date = substr($date_row["INDATE"],0,10);
	$date_s = str_replace(array("-"," ",":"),"",substr($date_row["INDATE"],0,16));

	$SI_result = mysql_query("insert into search_index (TableID, TableIDNum, TableName, Type, Data) values ('tid','".$tid."','ticket','tidl','".$date_s.$tid."')",$connect);
	debug_mysql_query(10);

	if($_POST["street"]!="")
	{
		$address_insert = mysql_query("insert into address (tid, nuid, street, city, state, zip) values ('".$tid."','".$nuid."','".mysql_real_escape_string($_POST["street"])."','".mysql_real_escape_string($_POST["city"])."','".mysql_real_escape_string($_POST["state"])."','".mysql_real_escape_string($_POST["zip"])."')",$connect);
	}
	debug_mysql_query(11);


	$error_result = mysql_query("insert into error (errorno,error,tid,note) values ('0','".$_POST["compid"]."','".$tid."','\$_POST[\"compid\"] value')", $error_connect);
	if($_POST["compid"]=="NONE" || $_POST["compid"]=="")
	{
		$result = mysql_query("insert into computer (tid, nuid, brand, type, serialnum) values ('".$tid."','".$nuid."','".$_POST["computer"]."','".$_POST["compType"]."','')",$connect);
		$error_result = mysql_query("insert into error (errorno,error,tid,note) values ('".mysql_errno($connect)."','','".$tid."','insert computer')", $error_connect);

		$compid_query=mysql_query("select * from computer where tid = ".$tid,$connect);
		$error_result = mysql_query("insert into error (errorno,error,tid,note) values ('".mysql_errno($connect)."','','".$tid."','get compid')", $error_connect);
		$compid_row=mysql_fetch_array($compid_query);
		$compid=$compid_row['CompID'];
	}
	else
	{
		$compid=$_POST["compid"];
	}

	if(strpos($_POST["phone"], "cid:") !== false)
	{
		list($trash,$cid) = explode(":",$_POST["phone"]);
		$result = mysql_query("insert into contacttoticket (cid,tid,nuid) values ('".$cid."','".$tid."','".$nuid."')",$connect);
	}
	else if($_POST["phone"]!="NONE")
	{
		$normPhone = normalizePhone($_POST["phone"]);
		$check_reslut = mysql_query("select * from contact where nuid = '".$nuid."' and type = 'phone' and normalized = '".$normPhone."'");
		if(mysql_num_rows($check_reslut) == 0)
		{
			$result = mysql_query("insert into contact (nuid, type, data, normalized) values ('".$nuid."','phone','".$_POST["phone"]."','".$normPhone."')",$connect);
			debug_mysql_query(12);
			$result = mysql_query("insert into contacttoticket (cid,tid,nuid) values ('".mysql_insert_id()."','".$tid."','".$nuid."')",$connect);
		}
		else
		{
			$check_row = mysql_fetch_array($check_result);
			$result = mysql_query("insert into contacttoticket (cid,tid,nuid) values ('".$check_row["cid"]."','".$tid."','".$nuid."')",$connect);
		}
	}


	if(strpos($_POST["email"], "cid:") !== false)
	{
		list($trash,$cid) = explode(":",$_POST["email"]);
		$result = mysql_query("insert into contacttoticket (cid,tid,nuid) values ('".$cid."','".$tid."','".$nuid."')",$connect);
	}
	else if($_POST["email"]!="NONE")
	{
		$normEmail = normalizeEmail($_POST["email"]);
		$check_reslut = mysql_query("select * from contact where nuid = '".$nuid."' and type = 'email' and normalized = '".$normEmail."'");
		if(mysql_num_rows($check_reslut) == 0)
		{
			$result = mysql_query("insert into contact (nuid, type, data, normalized) values ('".$nuid."','email','".$_POST["email"]."','".$normEmail."')",$connect);
			debug_mysql_query(14);
			$result = mysql_query("insert into contacttoticket (cid,tid,nuid) values ('".mysql_insert_id()."','".$tid."','".$nuid."')",$connect);
		}
		else
		{
			$check_row = mysql_fetch_array($check_result);
			$result = mysql_query("insert into contacttoticket (cid,tid,nuid) values ('".$check_row["cid"]."','".$tid."','".$nuid."')",$connect);
		}
	}

	$result = mysql_query("insert into ttc (compid,tid,nuid) values ('".$compid."','".$tid."','".$nuid."')",$connect);
	debug_mysql_query(16);

	$accounts = $accounts_insert = "";
	if ($_POST["accounts"] != "NONE" && $_POST["accounts"] != "")
	{
		$accounts_i = 0;
		$pairs = explode(";",$_POST["accounts"]);
		foreach($pairs as $pair)
		{
			if($accounts_i>0)
			{
				$accounts_insert.=",";
			}
			$accounts_i++;
			list($username,$password) = explode(",",$pair);
			$accounts .= "\t\t\t\t<div class=\"row_wide\">\n\t\t\t\t\t<div class=\"cell\" style=\"width:50%\">".$username."</div>\n\t\t\t\t\t<div class=\"cell\" style=\"width:50%\">".$password."</div>\n\t\t\t\t</div>\n";
			$accounts_insert .= "('".$tid."','".$username."','".$password."')";
		}
		$result_acccounts=mysql_query("insert into accounts (tid, username, password) values ".$accounts_insert,$connect);
		debug_mysql_query(17);
	}

	$note_result = mysql_query("insert into notes (nType,note,techid) values ('system','computer checked in',0)");
	$nid = mysql_insert_id();
	$ntt_result = mysql_query("insert into ntt (nid, tid, nuid) values ('".$nid."','".$tid."','".$nuid."')");
	
	mysql_close($connect);
	if ($debug)
	{
		echo "<html>\n<head>\n<title>CHC - Check-in</title>\n<meta http-equiv=\"refresh\" content=\"15;url=print_pdf.php?tid=".$tid."&type=new\">\n</head>\n";
		echo "<body>\nThis is a debuging message.  Your ticket should print in 15 seconds.  Thank you.\n";
		echo $debugout;
		echo "</body>\r</html>";
	}
	else
	{
		header("Location: print_pdf.php?tid=".$tid."&type=new");
	}
?>