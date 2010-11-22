<?php
	header("Cache-Control: no-cache");
	require_once("../class/HtmlTemplate.class");
	require_once("db.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$page = new HtmlTemplate("../inc/xml.inc");
	$page -> SetParameter("BASE", "data");

	$account = mysql_query("select * from user where username ='".urldecode($_GET['email'])."'");
	$account_num = mysql_num_rows($account);

	$page -> AppendParameter("CONTENT", ($account_num > 0)?"<exists>true</exists>":"<exists>false</exists>");

	mysql_close($connect);;
	header('Content-Type: text/xml');
	$page -> CreatePage();
?>