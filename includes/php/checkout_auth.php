<?php
	require_once("db.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$results= mysql_query("select techid from tech where nuid = ".$_GET['nuid']);
	if(mysql_num_rows($results)>0)
	{
		$active = "1";
	}
	else
	{
		$active = "0";
	}

	$row = mysql_fetch_array($results);

	mysql_close($connect);

	header('Content-Type: text/xml');
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	echo "<tech>\n";
	echo "\t<active>".$active."</active>";
	echo "\t<techid>".$row['techid']."</techid>\n";
	echo "\t<nuid>".$_GET['nuid']."</nuid>\n";
	echo "</tech>";
?>