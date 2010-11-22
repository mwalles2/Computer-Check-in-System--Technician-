<?php
	require_once("../includes/php/ldap_info.php");
	require_once("includes/php/admin-general.php");

	list($page, $connect, $tech_row) = start_admin_page("Edit Tech");

	$content = new HtmlTemplate ("includes/inc/admin-remove_user/admin-remove_user.inc");

	$page -> SetParameter ("SCRIPTSRC", "includes/js/admin-remove_user/admin-remove_user.js");
	$page -> SetParameter ("SCRIPTSRC", "includes/js/admin-remove_user/admin-remove_user-ajax.js");
	$page -> SetParameter ("SCRIPTSRC", "includes/js/general.js");
	$page -> SetParameter ("SCRIPTSRC", "includes/js/admin.js");
	$page -> SetParameter ("SCRIPTSRC", "../includes/js/xmlrequest.js");
	$page -> SetParameter ("SCRIPTSRC", "../includes/js/ajax-fade.js");

	$techs_query = mysql_query("select * from tech where status != 'deleted' and techid != 0 and status != 'all' order by name");
	$i=0;
	while($techs_row = mysql_fetch_array($techs_query))
	{
		$row = new HtmlTemplate ("includes/inc/admin-remove_user/admin-remove_user-row.inc");
		$row -> SetParameter("TECHID",			$techs_row['techid']);
		$row -> SetParameter("NAME",			$techs_row['name']);
		$row -> SetParameter("USERNAME",		$techs_row['username']);
		$row -> SetParameter("NUID",			$techs_row['nuid']);
		$row -> SetParameter("ROWCOLOR",		($i % 2)?"#FAF9D3":"#C2DEFB");
		$content -> AppendParameter("CONTENT",	$row -> CreateHTML());
		$i++;
	}

	$page -> SetParameter ("CONTENT", $content -> CreateHTML());
	end_admin_page($page, $connect);
?>