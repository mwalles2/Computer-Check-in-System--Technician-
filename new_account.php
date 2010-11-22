<?php
	$base_path = "/Library/WebServer/Gateway_Documents";
	require_once("includes/class/HtmlTemplate.class");
	require_once("includes/php/web_dev_template_v3.php");

	$page -> SetParameter("TITLE", "Computer Help Center - Account Creation");
	$page -> SetParameter("BODYOPTIONS", "");

	$page -> SetParameter("CSSSRC",		"includes/css/error.css");
	$page -> SetParameter("CSSSRC",		"includes/css/main.css");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/general.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/xmlrequest.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/new_account.js");

	$page -> SetParameter("BODYOPTIONS", "");

	$content = new HtmlTemplate("includes/inc/new_account.inc");
	if($_GET['test'] == "true")
	{
		$content -> SetParameter("TEST", "<input type=\"hidden\" name=\"test\" value=\"true\">");
	}
	else
	{
	{
		$content -> SetParameter("TEST", "");
	}
	}

	$page  -> SetParameter("CONTENT" , $content -> CreateHTML());
	$page -> CreatePage();
?>