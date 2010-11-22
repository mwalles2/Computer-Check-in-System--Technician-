<?php
	header("Cache-Control: no-cache");
	require_once("../../../../includes/class/HtmlTemplate.class");
	//require_once("../auth.php");
	require_once("../../../../includes/php/db.php");
	require_once("../../../../includes/php/general.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$out = new HtmlTemplate("../../../../includes/inc/xml.inc");
	$out -> SetParameter("BASE", "data");

	if($_GET["action"] != "" && $_GET["ipRangeId"] != "")
	{
		list($tabId,$ipRangeId) = explode("IpRange", $_GET["ipRangeId"]);
		list($temp,$tabId) = explode("tab",$tabId);
		require_once("../../../../includes/php/db.php");
		switch($_GET["action"])
		{
			case "saveIpRange":
				mysql_query("update location_range set startip = '".$_GET["startIp"]."', endip = '".$_GET["endIp"]."', startiplong = ".iptolong($_GET["startIp"]).", endiplong = ".iptolong($_GET["endIp"])." where locrid = '".$ipRangeId."'");
				break;
			case "removeIpRange":
				mysql_query("update location_range set locid = '' where locrid = '".$ipRangeId."'");
				break;
		}
		if(mysql_errno()==0)
		{
			$content = "\t<tabId>".$tabId."</tabId>\r\t<ipRangeId>".$ipRangeId."</ipRangeId>\r";
			if($_GET["action"] == "saveIpRange")
			{
				$content .= "\t<startIp>".$_GET['startIp']."</startIp>\r\t<endIp>".$_GET['endIp']."</endIp>\r";
			}
		}
		else
		{
			$content = "\t<false />\r";
		}
		$mysql = "\t<mysql>\r\t\t<errno>".mysql_errno()."</errno>\r\t\t<error>".mysql_error()."</error>\r\t</mysql>";
	}

	if($content == "")
	{
		$content = "\t<false />\r";
		$mysql = "";
	}
	$out -> SetParameter("CONTENT", $content.$mysql);

	header('Content-Type: text/xml');
	$out -> CreatePage();
?>