<?php
//	echo mysql_errno().": ".mysql_error()."\r";
	$checklist_tab = new HtmlTemplate("../admin/includes/inc/ticket_detail/ticket_detail-checklist/ticket_detail-checklist-tab.inc");
	$checklist_tab -> SetParameter("CONTENT","");

	$checklist_result = mysql_query("select * from checklistheader",$connect);
//	echo mysql_errno().": ".mysql_error()."\r";
	while ($checklist_row = mysql_fetch_array($checklist_result,MYSQL_ASSOC))
	{
		$checklist_headers[$checklist_row['CLHID']]=$checklist_row['header'];
	}

	$checklist_result = mysql_query("select checklistitem.text,checklistitem.clhid,checklist.CLNote,checklist.status,checklist.clo,checklist.CheckID from checklist,checklistitem where checklist.tid=".$_GET['tid']." && checklist.cliid=checklistitem.cliid order by checklist.clo",$connect);
	if(mysql_num_rows($checklist_result)==0)
	{
		mysql_query("insert into checklist (tid,nuid,cliid,clo,clhid,compid) select ticket.tid,ticket.nuid,checklistitem.CLIID,checklistitem.CLIOrder,checklistitem.CLHID,ttc.COMPID from ticket,checklistitem,ttc where checklistitem.Active = 1 and ticket.tid=ttc.tid && ticket.tid=".$_GET['tid'],$connect);
		$checklist_result = mysql_query("select checklistitem.text,checklistitem.clhid,checklist.CLNote,checklist.status,checklist.clo,checklist.CheckID from checklist,checklistitem where checklist.tid=".$_GET['tid']." && checklist.cliid=checklistitem.cliid order by checklist.clo",$connect);
	}	
	
//	echo mysql_errno().": ".mysql_error()."\r";
	$checklist_header_index=-1;
	while ($checklist_row = mysql_fetch_array($checklist_result,MYSQL_ASSOC))
	{
		//$checklist_items[]=array($row['text'],$row['clhid'],$row['status'],$row['CLNote']);
		if($checklist_header_index != $checklist_row['clhid'])
		{
			$checklist_header_index = $checklist_row['clhid'];
			$checklist_header = mysql_query("select header from checklistheader where CLHID = ".$checklist_row['clhid'],$connect);
			$checklist_header_row =mysql_fetch_array($checklist_header);
			$checklist_tab_header = new HtmlTemplate("../admin/includes/inc/ticket_detail/ticket_detail-checklist/ticket_detail-checklist-tab-header.inc");
			$checklist_tab_header -> SetParameter("HEADER",$checklist_header_row['header']);
			$checklist_tab -> AppendParameter("CONTENT",$checklist_tab_header -> CreateHTML());
			unset($checklist_tab_header);
		}
		$checklist_tab_row = new HtmlTemplate("../admin/includes/inc/ticket_detail/ticket_detail-checklist/ticket_detail-checklist-tab-row.inc");
		$checklist_tab_row -> SetParameter("NOTES","");
		$checklist_tab_row -> SetParameter("NOTESTATUS","&nbsp;");
		$checklist_notes_result = mysql_query("select note from checklistnotes where checkid = '".$checklist_row['CheckID']."'",$connect);
		while($checklist_notes_row = mysql_fetch_array($checklist_notes_result))
		{
			$checklist_tab_row -> AppendParameter("NOTES",$checklist_notes_row['note']."<br>");
			$checklist_tab_row -> SetParameter("NOTESTATUS","X");
		}
		$checklist_tab_row -> SetParameter("COUNTER",$checklist_row['clo']);
		$checklist_tab_row -> SetParameter("CHECKLISTTEXT",$checklist_row['text']);
		$checklist_tab_row -> SetParameter("SELECTEMPTY",($checklist_row['status']=="empty")?" selected":"");
		$checklist_tab_row -> SetParameter("SELECTDONE",($checklist_row['status']=="done")?" selected":"");
		$checklist_tab_row -> SetParameter("STATUS",$checklist_row['status']);
		$checklist_tab -> AppendParameter("CONTENT",$checklist_tab_row -> CreateHTML());
	}

	$ticket_detail -> AppendParameter("CONTENT",$checklist_tab -> CreateHTML());

	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-checklist/ticket_detail-checklist.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-checklist/ticket_detail-checklist-ajax.js");

?>
