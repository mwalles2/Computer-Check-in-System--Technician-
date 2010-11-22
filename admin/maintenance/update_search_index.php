#! /usr/bin/php
<?php
	require_once("/Library/WebServer/Gateway/check-in/"."includes/php/db.php");
	//require_once("../../includes/php/general.php");

	$stdout = fopen('php://stdout', 'w');

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);
	fwrite($stdout,$DB_database."\n");

	$index_query = mysql_query("select SIID, data from search_index where (TableName = 'user' && (Type='firstname' || Type='lastname')) && data!=''");
	while($index_array = mysql_fetch_array($index_query))
	{
		$index = $index_array["data"];
		$index = strtolower($index);
		$index = trim($index);
		fwrite($stdout,$index_array["SIID"] . ": '".$index."'\n");
		mysql_query("update search_index set data = '" . $index . "' where SIID = " . $index_array["SIID"]);
	}
?>