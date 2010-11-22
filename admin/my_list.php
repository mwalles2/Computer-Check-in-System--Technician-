<?php
	require_once("includes/php/list_computer.php");
	require_once("includes/php/admin-general.php");

	list($page, $connect, $tech_row) = start_admin_page("My Tickets");

	$out_list = array();
//	$result=mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, ticket.untildate, ticket.express, repairtype.symbol from ticket, user, ttc, computer, repairtype where ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.OutDate = '0000-00-00 00:00:00' and ticket.nuid=user.nuid and repairtype.rtid = ticket.repairstatus order by ticket.INDATE");
	$result=mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, ticket.untildate, ticket.express from ticket, user, ttc, computer where ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.OutDate = '0000-00-00 00:00:00' and ticket.nuid=user.nuid and ticket.workingtech = ".$_COOKIE['TECHID']." order by ticket.INDATE");

	while($row=mysql_fetch_array($result))
	{
		$out_list = create_rows($row, $out_list);
	}
	
	$page -> SetParameter ("TITLE", "My Computer List");
	$page -> SetParameter ("CSS" , "<style type=\"text/css\">
<!--

	.highlight { background-color: #3CC; }

-->
</style>\r");

	$show_array = array("work","tech");

	$page = output_rows($page, $out_list, $show_array);
	$page -> SetParameter ("JAVASCRIPT" , "\t<script type=\"text/javascript\" language=\"javascript\" src=\"includes/js/general.js\"></script>\t<!-- General functions -->\r");
	$page -> SetParameter ("CSSSRC" , "includes/php/list_computer_css.php?locid=all");
	end_admin_page($page, $connect);
?>