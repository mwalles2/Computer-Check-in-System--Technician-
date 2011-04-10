<?php
	require_once("../../../includes/class/HtmlTemplate.class");
	require_once("../../../includes/php/db.php");
	require_once("../../../includes/php/general.php");
	require_once("auth.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$page = new HtmlTemplate("../../../includes/inc/xml.inc");
	$page -> SetParameter("BASE", "data");

	$search_array="";
	$search_string1 = $search_string2 = "";
	$search_string = "(";

	$search_items = explode(" ",$_GET['search_items']);

	foreach ($search_items as $search_key => $search_item)
	{
		if($search_key > 0)
		{
			$search_string .= " or ";
		}
		$search_string .= "data like \"%".strtolower($search_item)."%\"";
	}
	$search_string .= ") and tableName != 'contact'";

	$search1_results = mysql_query("select DISTINCT tableName,tableID, TableIDNum from search_index where (".$search_string.") order by TableName");

	while($search1_row = mysql_fetch_array($search1_results))
	{
		$search_array[$search1_row['tableName']] .= $search1_row['tableName'].".".$search1_row['tableID'] ."='". $search1_row['TableIDNum']."' or ";
	}

	foreach($search_array as $search_value)
	{
		$search_string2 .= $search_value;
	}
	
	$search_string2 = substr($search_string2, 0, -4);

	$search_select = "user.Givenname, user.Surname, user.nuid, ticket.INDATE, ticket.tid, ticket.status, ticket.outdate, ";
	$search_select .= "computer.Brand, computer.Type as Computer_type";
	$search_where = "(ticket.nuid=user.nuid and ticket.tid = ttc.tid and ttc.compid = computer.compid) order by nuid";
	$search2_results = mysql_query("select distinct ".$search_select." from user, ticket, computer, ttc where (".$search_string2.") and ".$search_where);

	$last_tid=0;
	$last_nuid = "";
	$sort_first = array();
	$sort_last = array();

	$contact = "";
$search_2_loop_start_time = mktime();
	while($search2_row = mysql_fetch_array($search2_results,MYSQL_ASSOC))
	{
		if($last_nuid != $search2_row['nuid'])
		{
			if($last_nuid != "")
			{
				$page -> AppendParameter("CONTENT", $person -> CreateHtml());
			}
			$sort_first[$search2_row['nuid']] = $search2_row['Givenname'];
			$sort_last[$search2_row['nuid']] = $search2_row['Surname'];

			$contact = array();
			$contact["email"] = array();
			$contact["phone"] = array();
			$contact_query = mysql_query("select * from contact where nuid = '" . $search2_row['nuid'] . "' and (type = 'email' || type = 'phone')");
			while($contact_results = mysql_fetch_array($contact_query))
			{
				$contact[$contact_results["type"]][] = $contact_results["data"];
			}
			$last_nuid = $search2_row['nuid'];
			$person = new HtmlTemplate("../inc/computer_search_xml.inc");
			$person -> SetParameter("GIVEN", $search2_row['Givenname']);
			$person -> SetParameter("SURNAME", $search2_row['Surname']);
			$person -> SetParameter("NUID", $search2_row['nuid']);
			(count($contact["email"]) > 0)?$person -> SetParameter("EMAIL","\t\t<email>" . implode("</email>\n\t\t<email>", $contact["email"]) . "</email>\n"):$person -> SetParameter("EMAIL","");
			(count($contact["phone"]) > 0)?$person -> SetParameter("PHONE","\t\t<phone>" . implode("</phone>\n\t\t<phone>", $contact["phone"]) . "</phone>\n"):$person -> SetParameter("PHONE","");
		}
		if($last_tid != $search2_row['tid'])
		{
			$last_tid = $search2_row['tid'];
			$ticket = new HtmlTemplate("../inc/computer_search_xml_ticket.inc");
			$ticket -> SetParameter("TID", $search2_row['tid']);
			$ticket -> SetParameter("DATE", $search2_row['INDATE']);
			$ticket -> SetParameter("BRAND", $search2_row['Brand']);
			$ticket -> SetParameter("TYPE", typeOut($search2_row['Computer_type']));
			$ticket -> SetParameter("STATUS", ($search2_row['outdate']=="0000-00-00 00:00:00")?$search2_row['status']:"Picked up");
			$person -> AppendParameter("TICKET", $ticket -> CreateHtml());
		}
	}

	asort($sort_first);
	asort($sort_last);

	$page -> AppendParameter("CONTENT", $person -> CreateHtml());

	foreach($sort_first as $key => $value)
	{
		$page -> AppendParameter("CONTENT", "\n\t<sort_first>".$key."</sort_first>");
	}

	foreach($sort_last as $key => $value)
	{
		$page -> AppendParameter("CONTENT", "\n\t<sort_last>".$key."</sort_last>");
	}

	mysql_close($connect);
	header('Content-Type: text/xml');

	$page -> CreatePage();
?>