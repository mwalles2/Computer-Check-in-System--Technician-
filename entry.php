<?php
	$base_path = "/Library/WebServer/Gateway_Documents";
	require_once("includes/class/HtmlTemplate.class");
	require_once("includes/php/checkin_functions.php");
	require_once("includes/php/db.php");
	require_once("includes/php/web_dev_template_v3.php");

	setcookie("uid",$userid,time()-15,"/");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$page -> SetParameter("BODYOPTIONS", "");

	$page -> SetParameter("CSSSRC",		"includes/css/error.css");
	$page -> SetParameter("CSSSRC",		"includes/css/main.css");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/xmlrequest.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/rfid-entry.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/entry.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/general.js");

	$page -> SetParameter("BODYOPTIONS", " onload=\"getKeys()\"");

	$content = new HtmlTemplate("includes/inc/entry.inc");

	$page -> SetParameter("TITLE", "Computer Help Center - Check-in");

	$content -> SetParameter("MEDIANTURNAROUND", medianTurnAround($connect));
	$content -> SetParameter("CURRENTNOTDONE", flowerDayNumber($connect));
	$content -> SetParameter("DONETHISWEEK", doneThisWeek($connect));

	$page  -> SetParameter("CONTENT" , $content -> CreateHTML());
	$page -> CreatePage();
	mysql_close($connect);
?>
