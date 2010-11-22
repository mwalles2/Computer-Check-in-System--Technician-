<?php
	require_once("includes/class/HtmlTemplate.class");
	require_once("includes/php/web_dev_template_v3.php");
	require_once("includes/php/general.php");
	require_once("includes/php/db.php");
	if($_COOKIE['uid'] == "")
	{
		header ("Location: entry.php");
	}

	$out_rows = array();
	$sections = array();
	$done_rows = 0;

	$page -> SetParameter("TITLE", "Computer Help Center - Your Computers");
	$page -> SetParameter("BODYOPTIONS", "");
	$page -> SetParameter("CSSSRC",		"includes/css/error.css");
	$page -> SetParameter("CSSSRC",		"includes/css/main.css");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/user_list.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/error.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/general.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/rfid-ldap.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/xmlrequest.js");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);
	$locid = get_location($connect);

	$content = new HtmlTemplate("includes/inc/user_list/user_list.inc");

	$computer_list_query = mysql_query("select user.name, user.username, ticket.status, ticket.indate, ticket.tid, computer.brand, computer.type, computer.serialnum,ticket.locid,locations.name as location_name from user,ticket,ttc,computer,locations where user.uid = '".$_COOKIE['uid']."' and ticket.nuid = user.nuid and ttc.tid = ticket.tid and ticket.outdate = '0000-00-00 00:00:00' and ttc.compid = computer.compid and ticket.locid = locations.locid order by ticket.indate");
//echo mysql_errno().": ".mysql_error()."<br>";

	if(mysql_num_rows($computer_list_query) == 0)
	{
		header ("Location: form.php");
	}

	while($computer_list_row = mysql_fetch_array($computer_list_query))
	{
		if ($computer_list_row["locid"] == $locid || $locid == 0)
		{
			$at_location=true;
		}
		else
		{
			$at_location=false;
		}

		$content -> SetParameter("USERNAME", $computer_list_row["name"]);
		$list_row = new HtmlTemplate("includes/inc/user_list/user_list-row.inc");
		$list_row_out = new HtmlTemplate("includes/inc/user_list/user_list-row-out.inc");

		$ticketNum = str_replace(array("-"," ",":"),"",substr($computer_list_row["indate"],0,16)).$computer_list_row["tid"];
		$list_row -> SetParameter ("TID",			$computer_list_row["tid"]);
		$list_row -> SetParameter ("LTID",			$ticketNum);
		$list_row -> SetParameter ("DATE",			$date);
		$list_row -> SetParameter ("BRAND",			$computer_list_row["brand"]);
		$list_row -> SetParameter ("TYPE",			typeOut($computer_list_row["type"]));
		$list_row -> SetParameter ("SERIALNUMBER",	($computer_list_row["serialnum"]!="")?$computer_list_row["serialnum"]:"N/A");
		$list_row -> SetParameter ("CHECKBOXSTYLE",	($at_location)?"":" style=\"visibility:hidden;\"");
		$list_row -> SetParameter ("DONECHECK",		($computer_list_row[status]=="done")?"checked=\"checked\"":"");
		$list_row -> SetParameter ("REPAIRCENTER",	($computer_list_row[status]=="repair")?"disabled=\"disabled\"":"");

		if($locid == 0)
		{
			$list_row -> SetParameter ("CHECKBOXWIDTH",	"10");
			$list_row -> SetParameter ("CELLWIDTH",		"30");
			$list_row -> SetParameter ("CELLSTYLE",		"style=\"display:none;\"");
			$list_row -> SetParameter ("LOCATION",		"");
		}
		else
		{
			$list_row -> SetParameter ("CHECKBOXWIDTH",	"12");
			$list_row -> SetParameter ("CELLWIDTH",		"22");
			$list_row -> SetParameter ("CELLSTYLE",		"");
			$list_row -> SetParameter ("LOCATION",		$computer_list_row["location_name"]);
		}

		$list_row_out -> SetParameter ("TID",			$computer_list_row["tid"]);
		$list_row_out -> SetParameter ("LTID",			$ticketNum);
		$list_row_out -> SetParameter ("BRAND",			$computer_list_row["brand"]);
		$list_row_out -> SetParameter ("TYPE",			typeOut($computer_list_row["type"]));
		$list_row_out -> SetParameter ("SERIALNUMBER",	($computer_list_row["serialnum"]!="")?$computer_list_row["serialnum"]:"N/A");
		$list_row_out -> SetParameter ("DISPLAY",		($computer_list_row[status]=="done")?"inline":"none");
		$list_row_out -> SetParameter ("OUTVALUE",		($computer_list_row[status]=="done" && $at_location)?$computer_list_row["tid"]:"");

		if($computer_list_row[status]=="done")
		{
			$done_rows++;
		}

		$out_rows[$computer_list_row[status]][] = $list_row -> CreateHTML();
		$content -> AppendParameter("OUTCOMPUTERS", $list_row_out -> CreateHTML());
	}

	$status_list_query = mysql_query ("select short_text, status_text, sort_order from status order by sort_order");
	while($status_list_row = mysql_fetch_array($status_list_query))
	{
		if(isset($out_rows[$status_list_row['short_text']]))
		{
			$list_section = new HtmlTemplate("includes/inc/user_list/user_list-header.inc");
			$list_section -> SetParameter ("HEADER", $status_list_row['status_text']);
			foreach ($out_rows[$status_list_row['short_text']] as $out_row)
			{
				$list_section -> AppendParameter ("ROWS", $out_row);
			}
			$sections[] = $list_section -> CreateHTML();
		}
	}

	foreach($sections as $section)
	{
		$content -> AppendParameter("CONTENTS", $section);
	}

	$page -> SetParameter("SCRIPTCODE",	"outCount=".$done_rows.";");
	$page -> SetParameter("CONTENT" , $content -> CreateHTML());
	$page -> CreatePage();
?>