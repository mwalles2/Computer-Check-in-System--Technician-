<?php
	global $CONFIG;
	require_once("includes/php/admin-general.php");
	require_once("../includes/php/general.php");

	list($page, $connect, $tech_row) = start_admin_page("Survey Configuration");
	setLocations($connect);

	$page -> SetParameter ("CSSSRC" , "includes/css/survey_config.css");
	$page -> SetParameter ("SCRIPTSRC" , "includes/js/survey_config.js");

	$survey_config = new HtmlTemplate("includes/inc/survey_config.inc");
	if(isset($CONFIG["survey_link"]))
	{
		$suvey_config->SetParameter("URLTEXT",$CONFIG["survey_link"]);
	}
	else
	{
		$suvey_config->SetParameter("URLTEXT","http://");
	}

	if(isset($CONFIG["survey_text"]))
	{
		$suvey_config->SetParameter("EMAILHTML",str_replace("\n","<br>",$CONFIG["survey_text"]);
		$suvey_config->SetParameter("EMAILTEXT",$CONFIG["survey_text"]);
	} 

	$page -> SetParameter("CONTENT", $survey_config->CreateHtml());

	end_admin_page($page, $connect);
?>