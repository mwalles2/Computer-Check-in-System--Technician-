<?php
	require_once("../../../../../includes/php/db.php");
	require_once("../../../../../includes/class/HtmlTemplate.class");
	require_once("../../admin-general-ajax.php");

	$page = new HtmlTemplate("../../../../../includes/inc/xml.inc");
	$page -> SetParameter("BASE", "data");

//	require_once("auth.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);
	$debug = false;
	$mysql_error_bool=false;
	$mysql_out = "<mysql>\r";
	switch($_GET['action'])
	{
		case "express":
			$mysql_set_value = "express = ".$_GET['value'];
			if($_GET['value'] == 1)
			{
				$note_text = "set this ticket to rush";
				$status_query = mysql_query("select status from ticket where tid = ".$_GET['tid']);
				$status_row = mysql_fetch_array($status_query);
				$page -> AppendParameter("CONTENT", "<status>".$status_row["status"]."</status>");
				if($status_row["status"] == "new")
				{
					$mysql_set_value .= ",status = 'tech'";
				}
			}
			else
			{
				$note_text = "set this ticket to non-rush";
			}
			break;
		case "warranty":
			$mysql_set_value = "warranty = ".$_GET['value'];
			if($_GET['value'] == 1)
			{
				$note_text = "mark this repair as under warranty";
			}
			else
			{
				$note_text = "mark this repair as out of warranty";
			}
			break;
		case "repairtype":
			if($_GET['value'] == "")
			{
				$status = "NULL";
				$text = "none";
			}
			else
			{
				$status = $_GET['value'];
				$text = $_GET['text'];
			}
			$mysql_set_value = "repairstatus = ".$status;
			$note_text = "set the repairstatus to ".$text;
			break;
		case "checkin":
			$mysql_set_value = "outdate = '0000-00-00 00:00:00', checkouttech = 0, status = 'tech'";
			$note_text = "rechecked in this ticket";
			break;
		case "checkout":
			$mysql_set_value = "outdate = '".date("y-m-d h:i:s")."', checkouttech = ".$_COOKIE['TECHID'].", status = 'done'";
			$note_text = "checked out this ticket through the admin panel";
			break;
	}

	$query = "update ticket set ".$mysql_set_value." where tid = ".$_GET['tid'];
	mysql_query($query);
	$mysql_error_num = mysql_errno();

	if($mysql_error_num == 0)
	{
		$page -> AppendParameter("CONTENT", "<true />");
		$page -> AppendParameter("CONTENT", "\t<action>".$_GET['action']."</action>");
		if($_GET['action'] == "checkin")
		{
			$working_tech_query = mysql_query("select tech.name from ticket, tech where ticket.tid = ".$_GET['tid']." and ticket.workingtech = tech.techid");
			if(mysql_num_rows($working_tech_query) > 0)
			{
				$working_tech_array = mysql_fetch_array($working_tech_query);
				$working_tech = $working_tech_aray['name'];
			}
			else
			{
				$working_tech = "System";
			}
			$page -> AppendParameter("CONTENT", "<workingtech>".$working_tech."</workingtech>");
		}
		$page -> AppendParameter("CONTENT", create_note('log',str_replace("+"," ",$_COOKIE['TECHNAME'])." has ".$note_text,0,0,$connect));
	}
	else
	{
		$page -> AppendParameter("CONTENT", "<false />");
		$page -> AppendParameter("CONTENT",	"\t<mysql>");
		$page -> AppendParameter("CONTENT",	"\t\t<errornum>".mysql_errno()."</errornum>");
		$page -> AppendParameter("CONTENT",	"\t\t<error>".mysql_error()."</error>");
		$page -> AppendParameter("CONTENT",	"\t\t<query>".$query."</query>");
		$page -> AppendParameter("CONTENT",	"\t</mysql>");
	}

	mysql_close($connect);
	header('Content-Type: text/xml');
	$page -> CreatePage();
?>