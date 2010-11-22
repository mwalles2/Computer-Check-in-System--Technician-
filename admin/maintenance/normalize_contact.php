<?php
	require_once("../../includes/php/db.php");
	require_once("../../includes/php/general.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$query = mysql_query("select * from contact where normalized is null");
	while($row=mysql_fetch_array($query))
	{
		mysql_query("update contact set normalized = '" . normalizeContact($row['data'],$row["type"]) . "' where cid = " . $row['cid']);
	}
?>