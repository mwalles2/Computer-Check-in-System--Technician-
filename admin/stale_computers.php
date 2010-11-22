<?php
	require_once("includes/php/list_computer.php");
	require_once("includes/php/admin-general.php");
	require_once("../includes/php/general.php");

	list($page, $connect, $tech_row) = start_admin_page("Stale Computers");
	$current_locid = get_location($connect);

	($_GET['time'])?$time = strtotime($_GET['time']):$time = time();

	$out_list = array();

	$brand_new_result = mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, ticket.untildate, ticket.locid from ticket, user, ttc, computer where ticket.untildate = '0000-00-00' and ticket.outdate = '0000-00-00 00:00:00' and ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.nuid=user.nuid and ticket.status = 'new' order by ticket.INDATE");

	while($brand_new_row=mysql_fetch_array($brand_new_result,MYSQL_ASSOC))
	{
		$brand_new_notes_results = mysql_query("select * from notes, ntt where ntt.tid = ".$brand_new_row["tid"]." and ntt.nid = notes.nid");
		$list_row = new HtmlTemplate("includes/inc/computer_list_row.inc");
		if(mysql_num_rows($brand_new_notes_results) < 2)
		{
			$out_list = create_rows($brand_new_row, $out_list, "Brand New");
		}
	}

	$result = mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, ticket.untildate, ticket.locid, MAX(notes.cDate) as cDate from ticket, user, ttc, computer, notes, ntt where ticket.untildate = '0000-00-00' and notes.nid = ntt.nid and ntt.tid = ticket.tid and ticket.outdate = '0000-00-00 00:00:00' and ticket.status != 'repair' and notes.nType != 'system' and ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.nuid=user.nuid group by ticket.tid HAVING cDate < '".date("Y-m-d H:i:s",$time - (4 * 24 * 60 * 60))."' order by ticket.INDATE");

	while($row=mysql_fetch_array($result,MYSQL_ASSOC))
	{
		$out_list = create_rows($row, $out_list);
	}

	$result = mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, ticket.untildate, MAX(notes.cDate) as cDate from ticket, user, ttc, computer, notes, ntt where ticket.untildate = '0000-00-00' and notes.nid = ntt.nid and ntt.tid = ticket.tid and ticket.outdate = '0000-00-00 00:00:00' and ticket.status = 'repair' and notes.nType != 'system' and ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.nuid=user.nuid group by ticket.tid HAVING cDate < '".date("Y-m-d H:i:s",$time - (8 * 24 * 60 * 60))."' order by ticket.INDATE");
	while($row=mysql_fetch_array($result,MYSQL_ASSOC))
	{
		$out_list = create_rows($row, $out_list);
	}

	$show_array = array();

	$page -> SetParameter ("SCRIPTSRC" , "includes/js/general.js");
	$page -> SetParameter ("CSSSRC" , "includes/php/list_computer_css.php?locid=".$current_locid);
	$page = output_rows($page, $out_list, "", array("Brand New","new","work"));
	end_admin_page($page, $connect);
?>