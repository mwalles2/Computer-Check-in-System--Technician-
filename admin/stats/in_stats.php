<?
	require_once("../../includes/class/HtmlTemplate.class");
	require_once("../../includes/php/db.php");
//	require_once("includes/php/auth.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$weekday = array("Sunday" => 0,
					 "Monday" => 0,
					 "Tuseday" => 0,
					 "Wednesday" => 0,
					 "Thursay" => 0,
					 "Firday" => 0,
					 "Saturday" => 0);

	$hours = array(0 => 0,
				   1 => 0,
				   2 => 0,
				   3 => 0,
				   4 => 0,
				   5 => 0,
				   6 => 0,
				   7 => 0,
				   8 => 0,
				   9 => 0,
				  10 => 0,
				  11 => 0,
				  12 => 0,
				  13 => 0,
				  14 => 0,
				  15 => 0,
				  16 => 0,
				  17 => 0,
				  18 => 0,
				  19 => 0,
				  20 => 0,
				  21 => 0,
				  22 => 0,
				  23 => 0);

	$indates = mysql_query("select indate from ticket");
	$total_returned = mysql_num_rows($indates);
	while ($row = mysql_fetch_array($indates))
	{
		$day = date("l",strtotime($row['indate']));
		$hour = date("G",strtotime($row['indate']));
		$weekday[$day]++;
		$hours[$hour]++;
	}

	$page = new HtmlTemplate("../includes/inc/admin.inc");

	//This is the test html
	$html = implode("",file("../includes/html/computer_search.html"));
	$page -> SetParameter ("TITLE","Computer In Stats");

	$search_page = new HtmlTemplate("../includes/inc/computer_search.inc");

	$content = new HtmlTemplate("../includes/inc/in_stats.inc");

	foreach($weekday as $key => $value)
	{
		$content -> SetParameter (strtoupper($key), $value);
		$content -> SetParameter (strtoupper($key)."PERCENT", $value/$total_returned*200);
	}

	foreach($hours as $key => $value)
	{
		$content -> SetParameter ("HOUR".$key, $value);
		$content -> SetParameter ("PERCENT".strtoupper($key), $value/$total_returned*200);
	}

	$page -> SetParameter ("CONTENT", $content -> CreateHTML());

	mysql_close($connect);
	$page -> CreatePage();

?>