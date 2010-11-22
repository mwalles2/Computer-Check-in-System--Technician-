<?php
	$path = $_SERVER['DOCUMENT_ROOT'];
	require_once($path."/includes/class/HtmlTemplate.class");
	require_once($path."/includes/php/db.php");
	require_once($path."/includes/php/general.php");

	global $LOCATIONS;
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	setLocations($connect);
	$page = new HtmlTemplate("../inc/list_computer/list_computer_css.inc");

	($_GET['locid'] == "all" || $_GET['locid'] == "" || $_GET['locid'] == 0)?$show_all = true:$show_all = false;

	$page -> SetParameter("COMPUTERTYPECOLWIDTH",	($show_all)?"15":"20");
	$page -> SetParameter("LOCATIONCOLDISPLAY",		($show_all)?"block":"none");
	$page -> SetParameter("MAINODDROW",				"#FAF9D3");
	$page -> SetParameter("MAINEVENROW",			"#C2DEFB");

	$page -> AppendParameter("DISPLAYALL", ($show_all)?"block":"none");
	foreach($LOCATIONS as $location_row)
	{
		$style = new HtmlTemplate("../inc/list_computer/list_computer_css-row.inc");
		$style -> SetParameter("LOCATIONID", $location_row["locid"]);
		if($location_row["locid"] == $_GET['locid'])
		{
			$style -> SetParameter("LOCATIONSTYLE",		"block");
		}
		else
		{
			$style -> SetParameter("LOCATIONSTYLE",		"none");
		}
		$page -> AppendParameter("LOCATIONSCLASSES", $style->CreateHtml());
	}
	header('Content-type: text/css');
	header("Cache-Control: no-cache");
	$page -> CreatePage();
?>