<?php
	global $LOCATIONS;
	require_once("includes/php/admin-general.php");
	require_once("../includes/php/general.php");

	list($page, $connect, $tech_row) = start_admin_page("Ticket Detail");
	setLocations($connect);

	$ticket_detail = new HtmlTemplate("../admin/includes/inc/ticket_detail/ticket_detail.inc");
	//need to add a table that will have the current tabs in it

	$ticket_detail_tabs = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-tabs.inc");

	$ticket_detail -> SetParameter("TABS", $ticket_detail_tabs -> CreateHTML());

	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-ajax.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-tabs.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-multi_tab.js");
	$page -> SetParameter("SCRIPTSRC", "../includes/js/ajax-fade.js");
	$page -> SetParameter("CSSSRC", "includes/css/tabs.css");
	//need to replace this with a loop that will get the tab ticket_details out of the data base.

	require_once("../admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-tab.php");
	require_once("../admin/includes/php/ticket_detail/ticket_detail-checklist/ticket_detail-checklist-tab.php");
	require_once("../admin/includes/php/ticket_detail/ticket_detail-charge/ticket_detail-charge-tab.php");
	require_once("../admin/includes/php/ticket_detail/ticket_detail-administration/ticket_detail-administration-tab.php");

	$page -> SetParameter ("CONTENT", $ticket_detail -> CreateHTML());
	$page -> SetParameter("TID", $_GET['tid']);

	end_admin_page($page, $connect);
?>