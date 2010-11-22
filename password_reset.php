<?php
	$base_path = "/Library/WebServer/Gateway_Documents";
	require_once("includes/class/HtmlTemplate.class");
	require_once("includes/php/web_dev_template_v3.php");

	$page -> SetParameter("TITLE", "Computer Help Center - Password Reset");
	$page -> SetParameter("BODYOPTIONS", "");

	$page -> SetParameter("CSSSRC",		"includes/css/error.css");
	$page -> SetParameter("CSSSRC",		"includes/css/main.css");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/password_reset.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/general.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/xmlrequest.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/rfid-ldap.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/error.js");

	$main = new HtmlTemplate("includes/inc/password_reset/password_reset_main.inc");
	$serch = new HtmlTemplate("includes/inc/password_reset/password_reset_search.inc");
	$form = new HtmlTemplate("includes/inc/password_reset/password_reset_form.inc");

	$page -> SetParameter("BODYOPTIONS"," onload=\"getKeys()\"");
	$page -> SetParameter("CONTENT", $main->CreateHTML());
	$page -> AppendParameter("CONTENT", $serch->CreateHTML());
	$page -> AppendParameter("CONTENT", $form->CreateHTML());

	$page -> CreatePage();
?>