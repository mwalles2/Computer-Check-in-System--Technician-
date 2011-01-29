<?php
	function create_rows($row, $out_list, $over_ride = "")
	{
		$repair_type_query = mysql_query("select repairtype.symbol from ticket, repairtype where ticket.tid = ".$row["tid"]." and ticket.repairstatus = repairtype.rtid");
		if(mysql_num_rows($repair_type_query) > 0)
		{
			$repair_type_array = mysql_fetch_array($repair_type_query);
			$symbol = $repair_type_array['symbol'];
		}
		else
		{
			$symbol = "&nbsp;";
		}
		
		$list_row = new HtmlTemplate("includes/inc/computer_list_row.inc");

		$ticketNum = str_replace(array("-"," ",":"),"",substr($row["indate"],0,16)).$row["tid"];
		if($over_ride != "")
		{
			$area = $over_ride;
		}
		else if ($row["untildate"]=="0000-00-00")
		{
			$area = $row["status"];
		}
		else
		{
			$area = "until";
		}

		$date = substr($row["indate"],0,10);
		$date = substr($row["indate"],0,10);
		$list_row -> SetParameter ("ROWNUM",		(isset($out_list[$area]))?count($out_list[$area])+1:1);
		$list_row -> SetParameter ("TID",			$row["tid"]);
		$list_row -> SetParameter ("TICKETNUM",		$ticketNum);
		$list_row -> SetParameter ("NAME",			$row["name"]);
		$list_row -> SetParameter ("DATE",			$date);
		$list_row -> SetParameter ("BRAND",			$row["brand"]);
		$list_row -> SetParameter ("TYPE",			typeOut($row["type"]));
		$list_row -> SetParameter ("REPAIRTYPE",	$symbol);
		$list_row -> SetParameter ("LOCATION",		$row["location_name"]);
		if($row['express'])
		{
			$list_row -> SetParameter ("ROWSTYLE",	"background-color:{RUSHCOLOR}");
		}

		$out_list[$area][] = array("row" => $list_row -> CreateHTML(), "locid" => $row["locid"]);
		unset ($list_row);
		return $out_list;
	}

	function output_rows($page, $out_list, $show_array = array(), $sort_order = array())
	{
		global $LOCATIONS;
		if(count($out_list) > 0)
		{
			$location = new HtmlTemplate("includes/inc/list_computer/list_computer-location_divs.inc");
			$location -> SetParameter("LOCATIONID", "All");
			$location_divs = $location -> CreateHTML();

			foreach($LOCATIONS as $location_row)
			{
				$location = new HtmlTemplate("includes/inc/list_computer/list_computer-location_divs.inc");
				$location -> SetParameter("LOCATIONID", $location_row['locid']);
				$location_divs .= $location -> CreateHTML();
			}

			if($show_array == "")
			{
				$show_array = array();
			}

			$status_array = array();
			$status_order = array();

			$status_query = mysql_query("select * from status where sort_order > 0 order by display_order");
			while ($status_row = mysql_fetch_array($status_query))
			{
				$status_array[$status_row['short_text']] = $status_row['status_text'];
			}

			foreach($sort_order as $sort_key => $sort_value)
			{
				$status_order[$sort_value] = (isset($status_array[$sort_value]))?$status_row[$sort_value]:$sort_value;
			}

			foreach($status_array as $sort_key => $sort_value)
			{
				if(!isset($status_order[$sort_key]))
				{
					$status_order[$sort_key] = $sort_value;
				}
			}
			
			foreach($status_order as $sort_key => $sort_value)
			{
				if(isset($out_list[$sort_key]))
				{
					$section_heading = new HtmlTemplate("includes/inc/list_computer/list_computer-sections.inc");
					$section_heading -> SetParameter ("SHORTNAME", $sort_key);
					$section_heading -> SetParameter ("LONGNAME", $sort_value);
					$section_heading -> SetParameter ("HIDESHOWTEXT",  (in_array($sort_key,$show_array)||count($show_array)==0)?"Hide":"Show");
					$section_heading -> SetParameter ("HIDESHOWCLASS", (in_array($sort_key,$show_array)||count($show_array)==0)?"":"hidden");
					$section_heading -> AppendParameter ("COMPUTERS", $location_divs);
					foreach($out_list[$sort_key] as $out_list_key => $out_list_value)
					{
						$computer_row = str_replace("{ROWSTYLE}","",$out_list_value["row"]);
						$section_heading -> AppendParameter("LOCIDAllCOMPUTERS",	$computer_row);
						$section_heading -> AppendParameter("LOCID".$out_list_value["locid"]."COMPUTERS",	$computer_row);
					}
					$page -> AppendParameter ("CONTENT", preg_replace("/\{LOCID\d+COMPUTERS\}/",implode("", file("includes/inc/list_computer/list_computer-none.inc")),$section_heading ->CreateHTML()));
				}
			}
			$page -> SetParameter ("RUSHCOLOR", "#F00; color:#FFF");
		}
		else
		{
			$page -> AppendParameter ("CONTENT", implode('', file("includes/inc/list_computer/list_computer-none.inc")));
		}
		return $page;
	}
?>