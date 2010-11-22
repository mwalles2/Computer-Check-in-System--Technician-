	function checklistTabStatus(cliid,status)
	{
		xmlInit = doNothing;
		ajaxRequest=protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-checklist/ticket_detail-checklist-ajax.php?action=status&tid="+tid+"&cliid="+cliid+"&status="+status;
		//alert(ajaxRequest);
		loadXMLDoc(ajaxRequest);
	}
		
	function checklistTabAddNote(cliid,note)
	{
		note = encodeURI(note).replace(/&/,"%26");
		xmlInit = doNothing;
		ajaxRequest=protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-checklist/ticket_detail-checklist-ajax.php?action=note&tid="+tid+"&cliid="+cliid+"&note="+note;
		//alert(ajaxRequest);
		loadXMLDoc(ajaxRequest);
	}