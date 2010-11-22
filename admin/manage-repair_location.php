<?php
	require_once("includes/php/list_computer.php");
	require_once("includes/php/admin-general.php");

	list($page, $connect, $tech_row) = start_admin_page("Repair Locations");

	$content = new HtmlTemplate("includes/inc/manage-repair_location/manage-repair_location.inc");

	$location_query = mysql_query("select * from locations where active = 1");

	$locationDefaltTab="''";
	if(mysql_num_rows($location_query)>0)
	{
		while($location_results = mysql_fetch_array($location_query))
		{
			$tab = new HtmlTemplate("includes/inc/manage-repair_location/manage-repair_location-tab.inc");
			$tab -> SetParameter("TABNAME",				$location_results["name"]);
			if($location_results["primary_range"])
			{
				$locationDefaltTab=$location_results["locid"];
				$tab -> SetParameter("DEFAULTTAB",		"");
				$tab -> SetParameter("TABDEFAULTCHECKED","checked disabled ");
			}
			else
			{
				$tab -> SetParameter("DEFAULTTAB",		"display:none;");
				$tab -> SetParameter("TABDEFAULTCHECKED","");
			}

			$range_query = mysql_query("select * from location_range where locid =".$location_results["locid"]);
			while($range_row = mysql_fetch_array($range_query))
			{
				$ipRange = new HtmlTemplate("includes/inc/manage-repair_location/manage-repair_location-ip_row.inc");
				$ipRange -> SetParameter("RANGENUMBER",	$range_row["locrid"]);
				$ipRange -> SetParameter("STARTIP",		$range_row["startip"]);
				$ipRange -> SetParameter("ENDIP",		$range_row["endip"]);

				$tab -> AppendParameter("IPRANGES",		$ipRange -> CreateHtml());
			}
			$tab -> SetParameter("TABNUMBER",			$location_results["locid"]);

			$content -> AppendParameter("LOCATIONTABS",	$tab -> CreateHtml());
			$content -> SetParameter("NOTABS",			"display:none;");
		}
	}
	else
	{
		$content -> SetParameter("NOTABS",		";");
		$content -> SetParameter("LOCATIONTABS", "");
	}

	$page -> SetParameter("CSSSRC", "includes/css/manage-repair_location.css");
	$page -> SetParameter("SCRIPTSRC", "includes/js/manage-repair_location/manage-repair_location.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/manage-repair_location/manage-repair_location-ajax.js ");
	$page -> SetParameter("SCRIPTSRC", "../includes/js/ajax-fade.js");
	$page -> SetParameter("SCRIPTCODE",	"currentDefaultTab=".$locationDefaltTab.";\r");

	$page -> SetParameter("CONTENT", $content -> CreateHtml());

	end_admin_page($page, $connect)
?>