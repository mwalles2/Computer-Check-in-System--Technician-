<?php
	require_once("../../../includes/php/db.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$tid = $_GET['tid'];
	$result=mysql_query("select indate from ticket where tid='".$tid."'");
	$row = mysql_fetch_array($result);

	list($year, $month, $rest) = explode("-", $row['indate']);
	$date = str_replace(array("-"," ",":"),"",substr($row["indate"],0,16));

	$full_path = "../../../pdf/".$year."/".$month."/new/";
	$pdf_name = "Ticket - ".$date.$tid.".pdf";
	if(file_exists($full_path.$pdf_name))
	{
		system("lpr -P ischc_counter_unl_edu -o page-ranges=1 '".$full_path.$pdf_name."'");
	}
	$xml = "<data>\r";
	$xml .= "\t<work>true</work>";
	$xml .= "</data>\r";
	header('Content-Type: text/xml');
	echo $xml;
	mysql_close($connect);
?>