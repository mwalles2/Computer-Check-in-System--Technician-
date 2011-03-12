#! /usr/bin/php
<?php
	require_once(__DIR__ . "/../../includes/php/db.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	function average($values)
	{
		$total = 0;
		foreach ($values as $value)
		{
			$total += $value;
		}
		return ($total / count($values));
	}
	
	function median($values)
	{
		sort($values);
		if(count($values)&1)
		{
			return ($values[(count($values) - 1) / 2]);
		}
		else if(count($values)>0)
		{
			$first_index = count($values) / 2;
			$second_index = $first_index - 1;
			return (($values[$first_index] + $values[$second_index]) / 2);
		}
		else
		{
			return 0;
		}
	}

	function number_of_days($first_date, $second_date)
	{
		$first_ts = strtotime($first_date);
		$second_ts = strtotime($second_date);
		$ts_diff = abs($first_ts - $second_ts);
		$number_of_days = $ts_diff/86400;
		return $number_of_days;
	}

	$done_date_range = date("Y-m-d",mktime(date("H"), date("i"), date("s"), date("n"), date("j") -28));
	$turn_arounds = array();

	$turn_around_query = mysql_query("select indate,donedate,tid from ticket where donedate > \"" . $done_date_range . "\"");
	while($turn_around_results = mysql_fetch_array($turn_around_query))
	{
		list($in_date,$temp) = explode(" ", $turn_around_results["indate"]);
		$done_date = $turn_around_results["donedate"];
		if($done_date != $in_date)
		{
			$turn_arounds[] = number_of_days($done_date, $in_date);
		}
	}

	$median_turn_around = median($turn_arounds);

	$pcv_check_query = mysql_query("select * from pre_comp_val where pcv_name = 'median_turn_around'");
	if(mysql_num_rows($pcv_check_query))
	{
		mysql_query("update pre_comp_val set value = '" . $median_turn_around . "' where pcv_name = 'median_turn_around'");
	}
	else
	{
		mysql_query("insert into pre_comp_val (pcv_name,value) values ('median_turn_around','" . $median_turn_around . "')");
	}
	mysql_query("insert into graph_data (gd_name,value) values ('median_turn_around','" . $median_turn_around . "')");
?>