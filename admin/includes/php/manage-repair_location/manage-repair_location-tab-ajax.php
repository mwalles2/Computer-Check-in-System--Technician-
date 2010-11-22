<?php
	header("Cache-Control: no-cache");
	require_once("../../../../includes/class/HtmlTemplate.class");
	//require_once("../auth.php");
	require_once("../../../../includes/php/db.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$out = new HtmlTemplate("../../../../includes/inc/xml.inc");
	$out -> SetParameter("BASE", "data");

	$content = "";
	if($_GET["action"] == "addTab")
	{
		mysql_query("insert into locations (name,active) values ('New Tab', 1)");
		if(mysql_errno()==0)
		{
			$content = "\t<tabId>".mysql_insert_id()."</tabId>\r";
		}
		else
		{
			$content = "\t<false />\r";
		}
		$mysql = "\t<mysql>\r\t\t<errno>".mysql_errno()."</errno>\r\t\t<error>".mysql_error()."</error>\r\t</mysql>";
	}
	else if($_GET["action"] != "" && $_GET['tabId'] != "")
	{
		list($temp,$tabId)=explode("tab", $_GET['tabId']);
		switch($_GET["action"])
		{
			case "removeTab":
				mysql_query("update locations set active = 0 where locid = ".$tabId);
				break;
			case "saveTabName":
				mysql_query("update locations set name = '".$_GET['name']."' where locid = ".$tabId);
				$content = "\t<tabName>".$_GET['name']."</tabName>\r";
				break;
			case "SaveDefaultTab":
				if($_GET['oldDefault']!="")
				{
					$query = "update locations set primary_range = 0 where locid = ".$_GET['oldDefault'];
					mysql_query($query);
				}
				if(mysql_errno()==0)
				{
					mysql_query("update locations set primary_range = 1 where locid = ".$tabId);
				}
				break;
			case "addIpRange":
				$query = "insert into location_range (locid, startip, endip) values (".$tabId.",'0.0.0.0','0.0.0.0')";
				mysql_query($query);
				$content = "\t<ipRangeId>".mysql_insert_id()."</ipRangeId>\r";
				break;
		}
		if(mysql_errno()==0)
		{
			$content .= "\t<tabId>".$tabId."</tabId>\r";
		}
		else
		{
			$content = "\t<false />\r";
		}
		$mysql = "\t<mysql>\r\t\t<errno>".mysql_errno()."</errno>\r\t\t<error>".mysql_error()."</error>\r";
		if($query!="")
		{
			$mysql .= "\t\t<query>".$query."</query>\r";
		}
		$mysql .= "\t</mysql>";
	}

	if($content == "")
	{
		$content = "\t<false />";
		$mysql = "";
	}
	$out -> SetParameter("CONTENT", $content.$mysql);

	header('Content-Type: text/xml');
	$out -> CreatePage();
?>