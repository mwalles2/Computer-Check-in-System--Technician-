<?php
	require_once("../../includes/class/HtmlTemplate.class");
	require_once("../../includes/php/db.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$stats = array();
	$weeks = array();

	$last_year = "";
	$first_year = "";
	$first_month = "";

	$indates = mysql_query("select indate,tid from ticket order by indate");
	while ($row = mysql_fetch_array($indates))
	{
		list($year,$month,$rest) = explode("-",$row['indate']);
//		echo $row["tid"].": ".$row["indate"];
		$week = date("W" ,strtotime($row['indate']));
//		echo " week ".$week."<br>";
		if ($first_year == "")
		{
			$first_year = $year;
			$first_month = $month;
		}
		$last_year = $year;
		if(!isset($stats[$year]))
		{
			$stats[$year] = array();
		}
		if(!isset($weeks[$year]))
		{
			$weeks[$year] = array();
		}
		$stats[$year][$month]++;
		$weeks[$year][$week]++;
	}

	$page = new HtmlTemplate("../includes/inc/admin.inc");
	print_r($stats);
	print_r($weeks);
?>