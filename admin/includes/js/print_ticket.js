	function printTicket(tid)
	{
		xmlInit = doNothing;
		//alert(protocol+server+"/includes/php/print_ticket.php?tid="+tid);
		loadXMLDoc(protocol+server+"/admin/includes/php/print_ticket.php?tid="+tid);
	}