<?php
	require_once("includes/class/HtmlTemplate.class");
	require_once("includes/php/web_dev_template_v3.php");

	$page -> SetParameter("CSSSRC", "includes/css/error.css");
	$page -> SetParameter("CSSSRC", "includes/css/main.css");
	$page -> SetParameter("TITLE", "Computer Help Center - Thank You");

	if($_GET["type"] == "new")
	{
		$content = new HtmlTemplate("includes/inc/out_page/out_page_in.inc");
	}
	else if($_GET["type"] == "out")
	{
		$content = new HtmlTemplate("includes/inc/out_page/out_page_out.inc");
		$content -> SetParameter("GRAMMAR", ($_GET["number"] <= 1)?"":"s");
		$content -> SetParameter("GRAMMAR2", ($_GET["number"] <= 1)?"has":"have");
			
	}
	else
	{
		header ("Location: entry.php");
	}

	$page -> SetParameter("CONTENT",   $content -> CreateHTML());
	$page -> SetParameter("BODYOPTIONS", " onload=\"javascript:setTimeout('window.location=\'entry.php\'',10000)\"");

	$page -> CreatePage();
?>