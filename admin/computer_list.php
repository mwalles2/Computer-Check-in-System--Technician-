<?php
	global $LOCATIONS;
	require_once("includes/php/list_computer.php");
	require_once("includes/php/admin-general.php");
  
	list($page, $connect, $tech_row) = start_admin_page("Computer List");

	$desktops = $laptops = array();
	$first_desktop = $first_laptop = false;

//	$result=mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, ticket.untildate, ticket.express, repairtype.symbol from ticket, user, ttc, computer, repairtype where ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.OutDate = '0000-00-00 00:00:00' and ticket.nuid=user.nuid and repairtype.rtid = ticket.repairstatus order by ticket.INDATE");
	$result=mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, ticket.untildate, ticket.express, ticket.locid, locations.name as location_name from ticket, user, ttc, computer, locations where ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.OutDate = '0000-00-00 00:00:00' and ticket.nuid=user.nuid and ticket.locid = locations.locid order by ticket.INDATE");

	$current_locid = get_location($connect);
	$list_javascript = new HtmlTemplate("includes/inc/computer_list_js.inc");
	$laptop_i = $desktop_i = 0;
	$out_list = array($connect);

	$page -> AppendParameter ("CONTENT", implode('',file('includes/inc/computer_list_header.inc')));

	while($row=mysql_fetch_array($result,MYSQL_ASSOC))
	{
		$ticketNum = str_replace(array("-"," ",":"),"",substr($row["indate"],0,16)).$row["tid"];
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

	foreach($LOCATIONS as $location_row)
	{
		$location_option = "\t\t\t<option value=\"".$location_row['locid']."\"";
		if($location_row['locid'] == $current_locid)
		{
			$location_option .= " selected";
		}
		$location_option .= ">".$location_row['name']."</option>";
		$page -> AppendParameter ("LOCATIONSELECT",	$location_option);

	}
//var_dump($out_list);

	$page -> SetParameter ("SCRIPTSRC" , "includes/js/general.js");
	$page -> AppendParameter ("JAVASCRIPT" , $list_javascript -> CreateHTML());
	$page -> SetParameter ("SCRIPTSRC" , "includes/js/list_computer.js");
	$page -> SetParameter ("CSSSRC" , "includes/php/list_computer_css.php?locid=".$current_locid);

	$show_array = array("new","tech");
	$sort_order = array("tech","new");

	$page = output_rows($page, $out_list, $show_array, $sort_order);
	end_admin_page($page, $connect);
?>