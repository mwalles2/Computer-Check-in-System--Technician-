<?php
	require_once("../includes/php/ldap_info.php");
	require_once("includes/php/admin-general.php");

	list($page, $connect, $tech_row) = start_admin_page("Add Tech");

	$content = new HtmlTemplate ("includes/inc/admin-add_user.inc");

	$page -> SetParameter ("SCRIPTSRC", "includes/js/admin-add_user/admin-add_user-create_tech.js");
	$page -> SetParameter ("SCRIPTSRC", "includes/js/admin-add_user/admin-add_user-create_tech-ajax.js");
	$page -> SetParameter ("SCRIPTSRC", "includes/js/admin-add_user/admin-add_user-search.js");
	$page -> SetParameter ("SCRIPTSRC", "includes/js/admin-add_user/admin-add_user-search-ajax.js");
	$page -> SetParameter ("SCRIPTSRC", "includes/js/general.js");
	$page -> SetParameter ("SCRIPTSRC", "includes/js/admin.js");
	$page -> SetParameter ("SCRIPTSRC", "../includes/js/xmlrequest.js");
	$page -> SetParameter ("SCRIPTSRC", "../includes/js/ajax-fade.js");

	$page -> SetParameter ("CONTENT", $content -> CreateHTML());
	end_admin_page($page, $connect);
?>