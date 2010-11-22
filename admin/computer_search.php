<?php
	require_once("includes/php/admin-general.php");

	list($page, $connect, $tech_row) = start_admin_page("Computer Search");

	$html = implode("",file("includes/html/computer_search.html"));

	$search_page = new HtmlTemplate("../admin/includes/inc/computer_search.inc");

	$page -> SetParameter("SCRIPTSRC", "includes/js/computer_search.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/debug.js");
	$page -> SetParameter("SCRIPTSRC", "../includes/js/ajax-fade.js");
	$page -> SetParameter ("CONTENT", $search_page -> CreateHtml());
	
	end_admin_page($page, $connect);
?>