<?php
	$administration_tab = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-administration/ticket_detail-administration-tab.inc");

	$administration_tab_ticket_query = mysql_query("select ticket.repairstatus,ticket.express,ticket.outdate,ticket.warranty,computer.serialnum from ticket,computer,ttc where ticket.tid = '".$_GET['tid']."' and ticket.tid=ttc.tid and ttc.compid=computer.compid");
	$administration_tab_ticket_array = mysql_fetch_array($administration_tab_ticket_query);

	if($administration_tab_ticket_array['express'])
	{
		$administration_tab -> SetParameter ("RUSHBOX", " checked");
	}
	else
	{
		$administration_tab -> SetParameter ("RUSHBOX", "");
	}

	if($administration_tab_ticket_array['warranty'])
	{
		$administration_tab -> SetParameter ("WARRANTYBOX", " checked");
	}
	else
	{
		$administration_tab -> SetParameter ("WARRANTYBOX", "");
	}

	$administration_tab -> SetParameter ("SERIALNUM", $administration_tab_ticket_array['serialnum']);

	$administration_tab_repairtype_query = mysql_query("select * from repairtype order by name");
	while($administration_tab_repairtype_array = mysql_fetch_array($administration_tab_repairtype_query))
	{
		if($administration_tab_repairtype_array['active'] || $administration_tab_ticket_array['repairstatus'] == $administration_tab_repairtype_array['rtid'])
		{
			$adminstration_tab_repairtype_options = "\t\t\t\t\t\t<option value=\"".$administration_tab_repairtype_array['rtid']."\"";
			if($administration_tab_ticket_array['repairstatus'] == $administration_tab_repairtype_array['rtid'])
			{
				$adminstration_tab_repairtype_options .= " selected";
			}
			$adminstration_tab_repairtype_options .= ">".$administration_tab_repairtype_array['name']."</option>\r";
		}
		$administration_tab -> AppendParameter ("REPAIRTYPEOPTIONS", $adminstration_tab_repairtype_options);
	}

	if($administration_tab_ticket_array['outdate'] == "0000-00-00 00:00:00")
	{
		$administration_tab -> SetParameter ("BUTTONTEXT", "Check-out");
	}
	else
	{
		$administration_tab -> SetParameter ("BUTTONTEXT", "Check-in");
	}

	$administration_tab_nuid_query = mysql_query("select ttc.nuid,ttc.compid from ticket, ttc where ticket.tid = '".$_GET['tid']."' and ticket.nuid = ttc.nuid and ttc.tid = ticket.tid");
	$administration_tab_nuid_array = mysql_fetch_array($administration_tab_nuid_query);

	$administration_tab_ticket_query = mysql_query("select ttc.*, ticket.indate, ticket.status, computer.brand, computer.type from ticket, ttc, computer where ttc.nuid = '".$administration_tab_nuid_array['nuid']."' and ttc.tid = ticket.tid and ttc.compid = computer.compid ORDER BY indate");

	while ($administration_tab_ticket_array = mysql_fetch_array($administration_tab_ticket_query))
	{
		$administration_tab_history_row = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-administration/ticket_detail-administration-tab-history-row.inc");
		$administration_tab_history_row -> SetParameter ("ROWID", "userHistRow".$administration_tab_ticket_array['tid']);
		if($_GET['tid'] == $administration_tab_ticket_array['TID'])
		{
			$administration_tab_history_row -> SetParameter ("BACKGROUND", " background-color:#0D0;");
		}
		else
		{
			$administration_tab_history_row -> SetParameter ("BACKGROUND", "");
		}

		$LTID = str_replace(array(":","-"," " ),"",$administration_tab_ticket_array['indate']).$administration_tab_ticket_array['TID'];
		$SDATE = substr($administration_tab_ticket_array['indate'], 0, 10);

		$administration_tab_history_row -> SetParameter ("TID", $administration_tab_ticket_array['TID']);
		$administration_tab_history_row -> SetParameter ("LTID", $LTID);
		$administration_tab_history_row -> SetParameter ("DATE", $SDATE);
		$administration_tab_history_row -> SetParameter ("BRAND", $administration_tab_ticket_array['brand']);
		$administration_tab_history_row -> SetParameter ("TYPE", $administration_tab_ticket_array['type']);
		$administration_tab_history_row -> SetParameter ("STATUS", $administration_tab_ticket_array['status']);
		$administration_tab -> AppendParameter ("USERHIST", $administration_tab_history_row -> CreateHTML());

		if($administration_tab_ticket_array['COMPID'] == $administration_tab_nuid_array['compid'])
		{
			$administration_tab_history_row -> SetParameter ("ROWID", "compHistRow".$administration_tab_ticket_array['tid']);
			$administration_tab -> AppendParameter ("COMPHIST", $administration_tab_history_row -> CreateHTML());
		}

	}
	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-administration/ticket_detail-administration-ajax.js");
	$ticket_detail	-> AppendParameter	("CONTENT", $administration_tab -> CreateHTML());
?>