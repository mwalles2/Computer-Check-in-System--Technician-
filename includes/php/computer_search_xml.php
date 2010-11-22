<?php
	require_once("../class/HtmlTemplate.class");
	require_once("db.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$page = new HtmlTemplate("../inc/xml.inc");
	$page -> SetParameter("BASE", "data");

	$search_array="";
	$search_string1 = $search_string2 = "";
	$search_string = "(";

	$search_items = explode(" ",$_GET['search_items']);
//	$search_items= array("mic");

	if($_GET['filterType'] == "only")
	{
		$mysql_filter = " and ".$_GET['filterTable'].".".$_GET['filterCol']."=\"".$_GET['filter']."\"";
	}
	else
	{
		$mysql_filter = "";
	}

	foreach ($search_items as $search_key => $search_item)
	{
		if($search_key > 0)
		{
			$search_string .= " or ";
		}
		$search_string .= "data like \"%".strtolower($search_item)."%\"";
	}
	$search_string .= ") and tableName != 'contact'";

//echo "select DISTINCT tableName,tableID, TableIDNum from search_index where (".$search_string.") order by TableName<br>";
	$search1_results = mysql_query("select DISTINCT tableName,tableID, TableIDNum from search_index where (".$search_string.") order by TableName");
//echo "select DISTINCT tableName,tableID, TableIDNum from search_index where (".$search_string.") order by TableName";
//echo "1. ".mysql_errno().": ".mysql_error()."<br>";
	while($search1_row = mysql_fetch_array($search1_results))
	{
		$search_array[$search1_row['tableName']] .= $search1_row['tableName'].".".$search1_row['tableID'] ."='". $search1_row['TableIDNum']."' or ";
	}

	foreach($search_array as $search_value)
	{
		$search_string2 .= $search_value;
	}
	
	$search_string2 = substr($search_string2, 0, -4);
//echo $search_string2;

	$search_select = "user.name, user.Givenname, user.Surname, user.nuid, user.username";
	if($_GET["computerIn"] == "yes")
	{
		$search_where .= " and ticket.outdate = '0000-00-00'";
	}
	$search_where .= " and ticket.tid = ttc.tid and ttc.compid = computer.compid)";
	$search_order = " order by nuid";
//echo "select distinct ".$search_select." from user, ticket, contact, computer, ttc where (".$search_string2.") and ".$search_where;
	$search2_results = mysql_query("select distinct ".$search_select." from user  where (".$search_string2.") and user.username != 'NULL' ".$mysql_filter.$search_order);
//echo "select distinct ".$search_select." from user  where (".$search_string2.") and user.username != 'NULL' ".$mysql_filter.$search_order;
//echo "<br>".mysql_errno().": ".mysql_error();
	$last_tid=0;
	$last_nuid = "";
	$sort_first = array();
	$sort_last = array();

	$contact = "";
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
			$last_nuid = $search2_row['nuid'];
			$person = new HtmlTemplate("../inc/computer_search_xml.inc");
			$person -> SetParameter("NAME", $search2_row['name']);
			$person -> SetParameter("GIVEN", $search2_row['Givenname']);
			$person -> SetParameter("SURNAME", $search2_row['Surname']);
			$person -> SetParameter("NUID", $search2_row['nuid']);
			$person -> SetParameter("USERNAME", $search2_row['username']);
			$person -> SetParameter("EMAIL","");
			$person -> SetParameter("PHONE","");
		}
	}

	asort($sort_first);
	asort($sort_last);

	$page -> AppendParameter("CONTENT", $person -> CreateHtml());

	foreach($sort_first as $key => $value)
	{
		$page -> AppendParameter("CONTENT", "\t<sort_first>".$key."</sort_first>");
	}
	foreach($sort_last as $key => $value)
	{
		$page -> AppendParameter("CONTENT", "\t<sort_last>".$key."</sort_last>");
	}

	mysql_close($connect);;
	header('Content-Type: text/xml');
	$page -> CreatePage();
?>