<?php
	global $CONFIG;
	require_once("includes/php/admin-general.php");
	require_once("../includes/php/general.php");

	list($page, $connect, $tech_row) = start_admin_page("Survey Configuration");
	setLocations($connect);

	$page -> SetParameter ("CSSSRC" , "includes/css/survey_config.css");
	$page -> SetParameter ("SCRIPTSRC" , "includes/js/general.js");
	$page -> SetParameter ("SCRIPTSRC" , "includes/js/survey_config/survey_config.js");
	$page -> SetParameter ("SCRIPTSRC", "../includes/js/ajax-fade.js");
	$page -> SetParameter ("SCRIPTSRC", "../includes/js/xmlrequest.js");

	$survey_config = new HtmlTemplate("includes/inc/survey_config.inc");
	if(isset($CONFIG["survey_link"]))
	{
		$survey_config->SetParameter("URLTEXT",$CONFIG["survey_link"]);
	}
	else
	{
		$survey_config->SetParameter("URLTEXT","http://");
	}

	if(isset($CONFIG["survey_subject"]))
	{
		$survey_config->SetParameter("SUBJECTTEXT",$CONFIG["survey_subject"]);
	}
	else
	{
		$survey_config->SetParameter("SUBJECTTEXT","Customer Survey");
	}

	if(isset($CONFIG["survey_return_address"]))
	{
		$survey_config->SetParameter("RETURNHTML",str_replace(array("&","<",">","\n"),array("&amp;","&lt;","&gt;","<br>"),$CONFIG["survey_return_address"]));
		$survey_config->SetParameter("RETURNTEXT",$CONFIG["survey_return_address"]);
	}
	else
	{
		$survey_config->SetParameter("RETURNHTML","Company Survey Address &lt;survey@example.com&gt;");
		$survey_config->SetParameter("RETURNTEXT","");
	}

	if(isset($CONFIG["survey_text"]))
	{
		$survey_config->SetParameter("EMAILHTML",str_replace(array("&","<",">","\n"),array("&amp;","&lt;","&gt;","<br>"),$CONFIG["survey_text"]));
		$survey_config->SetParameter("EMAILTEXT",$CONFIG["survey_text"]);
	} 
	else
	{
		$survey_config->SetParameter("EMAILHTML","(There is not currently an email message configured)");
		$survey_config->SetParameter("EMAILTEXT","");
	} 

	$page -> SetParameter("CONTENT", $survey_config->CreateHtml());

	end_admin_page($page, $connect);
?>