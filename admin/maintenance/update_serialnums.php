#! /usr/bin/php
<?php
	require_once("/Library/WebServer/Gateway/check-in/"."includes/php/db.php");
	//require_once("../../includes/php/general.php");

	$stdout = fopen('php://stdout', 'w');

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);
	fwrite($stdout,$DB_database."\n");

	$serialnum_query = mysql_query("select compid, serialnum from computer where serialnum != ''");
	while($serialnum_array = mysql_fetch_array($serialnum_query))
	{
		$serial = $serialnum_array["serialnum"];
		$serial = strtoupper($serial);
		$serial = trim($serial);
		fwrite($stdout,$serialnum_array["compid"] . ": '".$serial."'\n");
		mysql_query("update computer set serialnum = '" . $serial . "' where compid = " . $serialnum_array["compid"]);
	}
?>