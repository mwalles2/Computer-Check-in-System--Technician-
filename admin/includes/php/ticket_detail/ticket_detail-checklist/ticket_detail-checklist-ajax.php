<?php
	ini_set("dispaly_errors",1);
	ini_set("html_errors", true);
	require_once($_SERVER["DOCUMENT_ROOT"] . "/includes/php/db.php");
//	require_once("auth.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);
	$xml ="<data>\r";
	switch ($_GET['action'])
	{
		case "status":
			$xml.="<true />\n";
			$today=date("Y-m-d");
			mysql_query("update checklist set status = '".$_GET['status']."', ModDate = '".$today."' where tid = ".$_GET['tid']." && cliid = ".$_GET['cliid']);
			break;
		case "note":
			$xml.="<true />\n";
			$checkid_query = mysql_query("select checkid from checklist where cliid = ".$_GET['cliid']." && tid = ".$_GET['tid']);
			$checkid_array = mysql_fetch_array($checkid_query);
			mysql_query("insert into checklistnotes (checkid,techid,note) values (".$checkid_array["checkid"].",".$_COOKIE['TECHID'].",'".$_GET['note']."')");
//echo mysql_errno().": ".mysql_error()."\r";
			break;
	}
	$xml.= "</data>\r";
	header('Content-Type: text/xml');
	echo $xml;
	mysql_close($connect);
?>