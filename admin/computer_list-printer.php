<?php
	require_once("includes/php/list_computer.php");
	require_once("includes/php/admin-general.php");

	list($page, $connect, $tech_row) = start_admin_page("Computer List");

	$desktops = $laptops = array();
	$first_desktop = $first_laptop = false;

//	$result=mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, ticket.untildate, ticket.express, repairtype.symbol from ticket, user, ttc, computer, repairtype where ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.OutDate = '0000-00-00 00:00:00' and ticket.nuid=user.nuid and repairtype.rtid = ticket.repairstatus order by ticket.INDATE");
	$result=mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, ticket.untildate, ticket.express from ticket, user, ttc, computer where ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.OutDate = '0000-00-00 00:00:00' and ticket.nuid=user.nuid and computer.type='Printer' order by ticket.INDATE");

	$list_javascript = new HtmlTemplate("includes/inc/computer_list_js.inc");
	$laptop_i = $desktop_i = 0;
	$out_list = array();

	$page -> AppendParameter ("CONTENT", implode('',file('includes/inc/computer_list_header.inc')));

	while($row=mysql_fetch_array($result,MYSQL_ASSOC))
	{
		$type = typeOut($row["type"]);
		if ($type == "Laptop")
		{
			if(!$first_laptop && $row['status']=="new")
			{
				$list_javascript -> SetParameter ("FIRSTLAPTOP", $ticketNum);
				$first_laptop = true;
			}
			$list_javascript -> AppendParameter ("LAPTOPARRAY", "\t\t\tlaptopArray[".$laptop_i."]=\"".$ticketNum."\";\n");
			$laptop_i++;
		}
		if ($type == "Desktop")
		{
			if(!$first_desktop && $row['status']=="new")
			{
				$list_javascript -> SetParameter ("FIRSTDESKTOP", $ticketNum);
				$first_desktop = true;
			}
			$list_javascript -> AppendParameter ("DESKTOPARRAY", "\t\t\tdesktopArray[".$desktop_i."]=\"".$ticketNum."\";\n");
			$desktop_i++;
		}

		$out_list = create_rows($row, $out_list);
	}

//var_dump($out_list);

	$page -> SetParameter ("JAVASCRIPT" , "\t<script type=\"text/javascript\" language=\"javascript\" src=\"includes/js/general.js\"></script>\t<!-- General functions -->\r");
	$page -> AppendParameter ("JAVASCRIPT" , $list_javascript -> CreateHTML());
	$page -> SetParameter ("CSS" , "<style type=\"text/css\">\r<!--\r\r\t.highlight { background-color: #3CC; }\r\r-->\r</style>\r");
	$page -> SetParameter ("CSSSRC" , "includes/css/list_computer.css");

	$show_array = array("new","tech");
	$sort_order = array("tech","new");

	$page = output_rows($page, $out_list, $show_array, $sort_order);
	end_admin_page($page, $connect);
?>