<?php
	require_once("../../../includes/php/db.php");
//	require_once("auth.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);
	$xml ="<data>\r";
	$debug = false;
	$mysql_error_bool=false;
	$mysql_out = "<mysql>\r";
	switch($_GET['action'])
	{
		case "getpart":
			$part_query = mysql_query("select * from parts where partnum = ".$_GET['partnum']);
			$part_row = mysql_fetch_array($part_query);
			$xml .= "\t<description>".$part_row['description']."</description>\r";
			$xml .= "\t<manpartnum>".rtrim($part_row['manpartnum'])."</manpartnum>\r";
			$xml .= "\t<cost>".$part_row['cost']."</cost>\r";
			$xml .= "\t<price>".$part_row['price']."</price>\r";
			break;
		case "updatePredefined":
			if($_GET['chid'] != "")
			{
				$predefined_query = mysql_query("update charges set quantity = ".$_GET['value']." where chid = ".$_GET['chid']);
//echo mysql_errno().": ".mysql_error()."\n";
				$xml .= "\t<true />\r";
			}
			else
			{
				$id = substr($_GET["item"],6,strpos($_GET["item"],"Check")-6);
				$predefined_query = mysql_query("insert into charges values ('','".$_GET['tid']."','rates',".$id.",1)");
				$xml .= "\t<id>".$id."</id>\r";
				$xml .= "\t<rownum>".mysql_insert_id()."</rownum>\r";
			}
			break;
		case "addpart":
			$part_query = mysql_query("select * from parts where partnum = ".$_GET['partnum']);
			$part_row = mysql_fetch_array($part_query);
			$add_part_query = mysql_query("insert into charges values ('','".$_GET['tid']."','parts','".$part_row['pid']."','".$_GET['qty']."')");
			$xml .= "\t<rownum>".mysql_insert_id()."</rownum>\r";
			break;
		case "updateExpress":
			($_GET['express']=="true")?$express=1:$express=0;
//echo "update ticket set express='".$express."' where tid=".$_GET['tid']."<br>";
//echo mysql_errno().": ".mysql_error()."<br>";
			$express = mysql_query("update ticket set express='".$express."' where tid=".$_GET['tid']);
			$xml .= "\t<true />\r";
			break;
		case "updateHours":	
			if($_GET['id']!="")
			{
				$hours_query = mysql_query("update charges set quantity=".$_GET['hours']." where chid=".$_GET['id']);
				$xml .= "\t<true />\r";
			}
			else
			{
				$rate_query = mysql_query("select rates.* from ticket, rrs, rates where ticket.tid = '".$_GET['tid']."' and ticket.rsid =rrs.rsid and rrs.rid = rates.rid and rates.title = 'hourly'");
				$rate_row = mysql_fetch_array($rate_query);
				$hours_query = mysql_query("insert into charges values ('','".$_GET['tid']."','rates','".$rate_row['rid']."','".$_GET['hours']."')");
				$xml .= "\t<rownum>".mysql_insert_id()."</rownum>\r";
			}
			break;
		case "removePart":
			$remove_part = mysql_query("update charges set quantity='0' where chid=".$_GET['chid']);
			$xml .= "\t<true />\r";
			break;
		case "updateTax":
			($_GET['taxExempt']=="true")?$taxable=0:$taxable=1;
//			$express = mysql_query("update ticket set express='".$express."' where tid=".$_GET['tid']);
			$tax = mysql_query("update ticket set taxable='".$taxable."' where tid=".$_GET['tid']);
//			echo "update ticket set taxable=".$taxable." where tid=".$_GET['tid']."<br>";
			echo mysql_errno().": ".mysql_error()."<br>";
			$xml .= "\t<true />\r";
			break;
	}
	$xml.= "</data>\r";
	header('Content-Type: text/xml');
	echo $xml;
	mysql_close($connect);
?>