<html>
<body>
<?php
	require_once("../../includes/php/db.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	mysql_query("drop table if exists temp1,temp2, temp3");
	mysql_query("create table temp1 (t1id int auto_increment primary key, nuid text, normalized blob)");
	mysql_query("insert into temp1 (nuid, normalized) select distinct nuid,normalized from contact where normalized is not null and nuid != 'x'");
	mysql_query("create table temp2 like contact");
	mysql_query("create table temp3 (t3id int auto_increment primary key, old_id int, new_id int)");

	$query1 = mysql_query("select * from temp1");
	//echo mysql_num_rows($query1) . "<br>";

	while($result1 = mysql_fetch_array($query1))
	{
		//echo $result1["t1id"] . " ";
		$query2 = mysql_query("select * from contact where nuid = '" . $result1['nuid'] . "' and normalized = '" . $result1['normalized'] . "'");

		if(mysql_num_rows($query2) == 1)
		{
			$results2 = mysql_fetch_array($query2);
			echo "<span style='color:green;'>&bull;</span>\n";
			$insert1 = mysql_query("insert into temp2 (nuid,data,type,location,service,active,normalized,contactme) values ('" . $results2["nuid"] . "','" . $results2["data"] . "','" . $results2["type"] . "','" . $results2["location"] . "','" . $results2["service"] . "','" . $results2["active"] . "','" . $results2["normalized"] . "','" . $results2["contactme"] . "')");
			$new_id = mysql_insert_id();
			mysql_query("insert into temp3 (old_id, new_id) values (" . $results2["cid"] . "," . $new_id . ")");
			//echo mysql_error()." query = insert into temp3 (old_id, new_id) values (" . $results2["cid"] . "," . $new_id . ")\n<br>";
		}
		else
		{
			echo "<span style='color:blue;'>&raquo; ";
			$old_ids = array();
			$values = array();
			while($results2 = mysql_fetch_array($query2))
			{
				$location = 0;
				$service = 0;
				$active = 0;
				$contactme = 0;
				echo ". ";
				if($results2["location"] != 0)
				{
					$location = $results2["location"];
				}
				if($results2["service"] != 0)
				{
					$service = $results2["service"];
				}
				if($results2["active"] != 0)
				{
					$active = $results2["active"];
				}
				if($results2["contactme"] != 0)
				{
					$contactme = $results2["contactme"];
				}
				$old_ids[] = $results2["cid"];
				$results2_out = $results2;
			}
			echo "&bull;</span>\n";
			$insert2 = mysql_query("insert into temp2 (nuid,data,type,location,service,active,normalized,contactme) values ('" . $results2_out["nuid"] . "','" . $results2_out["data"] . "','" . $results2_out["type"] . "','" . $location . "','" . $service . "','" . $active . "','" . $results2_out["normalized"] . "','" . $contactme . "')");
			$new_id = mysql_insert_id();
			foreach($old_ids as $old_id)
			{
				$values[] = "(" . $old_id . "," . $new_id . ")";
			}
			$values_out = implode(",",$values);
			//mysql_query("insert into temp3 (old_id, new_id) values "$values);
			//echo mysql_error();
		}
	}

	mysql_query("drop table contact");
	mysql_query("create table contact like temp2");
	mysql_query("insert into contact select * from temp2");
?>
<hr />
<?php
	$query3 = mysql_query("select * from temp3");
	//echo mysql_num_rows($query3) . "<br>";
	while($reslut3 = mysql_fetch_array($query3))
	{
		echo $reslut3["t3id"] . " <span style=\"color:red\">&bull;</span>\n";
		//echo "update contacttoticket set cid = " . $reslut3["new_id"] . " where cid = " . $reslut3["old_id"] . "\n<br>";
		mysql_query("update contacttoticket set cid = " . $reslut3["new_id"] . " where cid = " . $reslut3["old_id"]);
	}
?>
<hr />
done
</body>
</html>