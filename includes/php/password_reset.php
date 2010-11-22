<?php
	require_once("../class/HtmlTemplate.class");
	require_once("db.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$page = new HtmlTemplate("../inc/xml.inc");
	$page -> SetParameter("BASE", "data");

	mysql_query("update user set password = '".md5($_GET['password'])."' where nuid = '".$_GET['nuid']."'");
	$computer_query = mysql_query("select * from user, ticket where user.nuid = '".$_GET['nuid']."' and ticket.nuid = user.nuid and ticket.outdate = '0000-00-00 00:00:00'");
	$computers = mysql_num_rows($computer_query);
	$computer_out = ($computers >0)?"true":"false";

	$userid_query = mysql_query("select uid from user where nuid = '".$_GET['nuid']."'");
	$userid_row = mysql_fetch_array($userid_query);
	$userid = $userid_row["uid"];
	
	$page -> SetParameter("CONTENT", "\t<computer>".$computer_out."</computer>\r");

	setcookie("uid",$userid,0,"/");
	mysql_close($connect);
	header('Content-Type: text/xml');
	$page -> CreatePage();
?>