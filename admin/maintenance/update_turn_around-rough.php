<?php
	require_once("../../includes/php/db.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$done_date_range = date("Y-m-d",mktime(date("H"), date("i"), date("s"), date("n"), date("j") -28));
	
	$in_date_query = mysql_query("select * from ticket where donedate = '0000-00-00' and untildate = '0000-00-00' and  outdate= '0000-00-00 00:00:00'");
	$in_date_num = mysql_num_rows($in_date_query);

	$done_date_query = mysql_query("select * from ticket where donedate > '" . $done_date_range . "'");
	$done_date_num = mysql_num_rows($done_date_query);

	$average = $in_date_num / ($done_date_num / 4) * 7;
	echo $average;
?>