<?php
	require_once("../../../includes/class/HtmlTemplate.class");
	require_once("../../../includes/php/db.php");
	require_once("../../../includes/php/general.php");
	require_once("auth.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$page = new HtmlTemplate("../../../includes/inc/xml.inc");
	$page -> SetParameter("BASE", "data");

//echo $_GET["itemId"];
	switch ($_GET["itemId"])
	{
		case "urlText":
			$config_field = "survey_link";
			break;
		case "emailText":
			$config_field = "survey_text";
			break;
		case "subjectText":
			$config_field = "survey_subject";
			break;
		case "returnText":
			$config_field = "survey_return_address";
			break;
	}

	$content = str_replace("<br>", "\n", $_GET["content"]);
	$select_test = mysql_query("select * from config where name = '" . $config_field . "'");
	if(mysql_num_rows($select_test) > 0)
		$query = "update config set value = '" . mysql_escape_string($content) . "' where name = '" . $config_field . "'";
	else
		$query = "insert into config (name,value) values ('" . $config_field . "','" . mysql_escape_string($content) . "')";
	mysql_query($query);

	if(mysql_errno() == 0)
		$page -> SetParameter ("CONTENT", "\t<true />");
	else
		$page -> SetParameter ("CONTENT", "\t<false />");		

	mysql_close($connect);
	header('Content-Type: text/xml');
	
	$page -> CreatePage();
?>