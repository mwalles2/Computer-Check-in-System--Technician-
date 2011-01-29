<?php
	require_once("includes/php/admin-general.php");

	list($page, $connect, $tech_row) = start_admin_page("Group Settings");
	$settings = new HtmlTemplate("includes/inc/group_settings/group_settings.inc");

	$page->SetParameter("SCRIPTSRC","includes/js/group_settings.js");
	$page->SetParameter("SCRIPTSRC","includes/js/group_settings-ajax.js");
	$page->SetParameter("SCRIPTSRC","includes/js/general.js");
	$page->SetParameter("SCRIPTSRC","../includes/js/ajax-fade.js");
	$page->SetParameter("CSSSRC","includes/css/group_settings.css");

	$query = "select * from groupstatus";
	$group_status_select = mysql_query($query);
	
	if(mysql_num_rows($group_status_select)==0)
	{
		$row = new HtmlTemplate("includes/inc/group_settings/group_settings-empty.inc");
		$settings->SetParameter("ROWS", $row->CreateHtml());
	}
	else
	{
		while($group_status_array = mysql_fetch_array($group_status_select))
		{
			$row = new HtmlTemplate("includes/inc/group_settings/group_settings-row.inc");
			$row->SetParameter("NAME",$group_status_array["name"]);
			$row->SetParameter("GSID",$group_status_array["gsid"]);
			if($group_status_array["active"])
			{
				$row->SetParameter("ACTIVECHECKED"," checked");
				$row->SetParameter("ADMINDISABLED","");
				$row->SetParameter("CHECKINDISABLED","");
				$row->SetParameter("CHECKOUTDISABLED","");
				$row->SetParameter("VEIWDISABLED","");
			}
			else
			{
				$row->SetParameter("ACTIVECHECKED","");
				$row->SetParameter("ADMINDISABLED"," disabled");
				$row->SetParameter("CHECKINDISABLED"," disabled");
				$row->SetParameter("CHECKOUTDISABLED"," disabled");
				$row->SetParameter("VEIWDISABLED"," disabled");
			}
			$row->SetParameter("ADMINCHECKED",($group_status_array["admin"])?" checked":"");
			$row->SetParameter("CHECKINCHECKED",($group_status_array["checkin"])?" checked":"");
			$row->SetParameter("CHECKOUTCHECKED",($group_status_array["checkout"])?" checked":"");
			$row->SetParameter("VEIWCHECKED",($group_status_array["view"])?" checked":"");
			$settings->AppendParameter("ROWS", $row->CreateHtml());
		}
	}


	$page->SetParameter("CONTENT",$settings->CreateHtml());
	$page->CreatePage();
?>