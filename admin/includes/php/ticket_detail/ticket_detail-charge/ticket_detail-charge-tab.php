<?php
	$charge_tab = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-charge/ticket_detail-charge-tab.inc");
	$charge_tab_rates_query = mysql_query("select rates.*,ticket.taxable,ticket.express from rates,rrs,ticket where ticket.rsid=rrs.rsid and rrs.rid=rates.rid and ticket.tid=".$_GET['tid']);

	$charge_tab_total = 0;
	$charge_tab_is_express = false;

	if(mysql_num_rows($charge_tab_rates_query)==0)
	{
		mysql_query("update ticket,rateset set ticket.rsid = rateset.rsid where ticket.tid = ".$_GET['tid']." and rateset.enddate=\"0000-00-00\"");
		$charge_tab_rates_query = mysql_query("select rates.*,ticket.taxable,ticket.express from rates,rrs,ticket where ticket.rsid=rrs.rsid and rrs.rid=rates.rid and ticket.tid=".$_GET['tid']);
	}
	$i=0;
	$page -> SetParameter("SCRIPTCODE", "chargeTabPredefined=new Array();");
	while($charge_tab_rates_row=mysql_fetch_array($charge_tab_rates_query))
	{
		if($charge_tab_rates_row[express])
		{
			$charge_tab -> SetParameter("ISEXPRESS", " checked");
			$charge_tab_is_express = true;
		}
		else
		{
			$charge_tab -> SetParameter("ISEXPRESS", "");
		}

		if($charge_tab_rates_row["title"]=="hourly")
		{
			$charge_tab -> SetParameter("LABORRATE", $charge_tab_rates_row["rate"]);
			$charge_tab_hourlyrate = $charge_tab_rates_row["rate"];
		}
		elseif($charge_tab_rates_row["title"]=="express")
		{
			$charge_tab -> SetParameter("EXPRESSRATE", $charge_tab_rates_row["rate"]);
			$charge_tab_expressrate = $charge_tab_rates_row["rate"];
		}
		elseif($charge_tab_rates_row["title"]=="tax")
		{
			$charge_tab -> SetParameter("TAX", $charge_tab_rates_row["rate"]);
			$charge_tab_tax = $charge_tab_rates_row["rate"];

			if($charge_tab_rates_row['taxable'])
			{
				$charge_tab -> SetParameter("HASTAX", "");
				$charge_tab_tax = $charge_tab_rates_row["rate"];
			}
			else
			{
				$charge_tab -> SetParameter("HASTAX", " checked");
				$charge_tab_tax = 0;
			}
		}
		else
		{
			$charge_tab_rate_charges_query = mysql_query("select chid,quantity from charges where tid='".$_GET['tid']."' and chargetable = 'rates' and tableid='".$charge_tab_rates_row['rid']."'");
			$charge_tab_rate_charges_row = mysql_fetch_array($charge_tab_rate_charges_query);
			$charge_tab_rate_row = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-charge/ticket_detail-charge-rate-row.inc");
			$charge_tab_rate_row -> SetParameter("ID", $charge_tab_rates_row["rid"]);
			$charge_tab_rate_row -> SetParameter("TITLE", $charge_tab_rates_row["title"]);
			$charge_tab_rate_row -> SetParameter("RATEFORMATED", "$".number_format($charge_tab_rates_row["rate"],2));
			$charge_tab_rate_row -> SetParameter("RATE",$charge_tab_rates_row["rate"]);
			if(mysql_num_rows($charge_tab_rate_charges_query)>0)
			{
				$charge_tab_rate_row -> SetParameter("ROWID", $charge_tab_rate_charges_row["chid"]);
			}
			else
			{
				$charge_tab_rate_row -> SetParameter("ROWID", "");
			}
			if($charge_tab_rate_charges_row['quantity']>0)
			{
				$charge_tab_rate_row -> SetParameter("ISCHECKED"," checked");
				$charge_tab_total += $charge_tab_rates_row["rate"];
			}
			else
			{
				$charge_tab_rate_row -> SetParameter("ISCHECKED","");
			}
 			$charge_tab -> AppendParameter("PREDEFINED","\r".$charge_tab_rate_row -> CreateHTML());
 			$page -> SetParameter ("SCRIPTCODE", "chargeTabPredefined[".$i."]=\"".$charge_tab_rates_row["rid"]."\";");
 			$i++;
		}
	}
	$charge_tab_parts = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-charge/ticket_detail-charge-parts.inc");
	$charge_tab_parts ->  SetParameter("PARTS",	"");

	$i=0;
	$page -> SetParameter("SCRIPTCODE", "chargeTabParts=new Array();");
	$charge_tab_parts_mysql_query=mysql_query("select parts.*,charges.chid,charges.quantity from parts,charges where charges.tid=".$_GET['tid']." and charges.chargetable='parts' and charges.tableid=parts.pid");
	while($charge_tab_parts_mysql_row=mysql_fetch_array($charge_tab_parts_mysql_query))
	{
		if($charge_tab_parts_mysql_row['quantity']>0)
		{
			$charge_tab_parts_row = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-charge/ticket_detail-charge-parts-row.inc");
			$charge_tab_parts_row -> SetParameter("ID", $charge_tab_parts_mysql_row['chid']);
			$charge_tab_parts_row -> SetParameter("PARTNUM", $charge_tab_parts_mysql_row['partnum']);
			$charge_tab_parts_row -> SetParameter("DESCRIPTION", $charge_tab_parts_mysql_row['description']);
			$charge_tab_parts_row -> SetParameter("PRICEFORMATED", "$".number_format($charge_tab_parts_mysql_row['price'],2));
			$charge_tab_parts_row -> SetParameter("PRICE", $charge_tab_parts_mysql_row['price']);
			$charge_tab_parts_row -> SetParameter("QTY", $charge_tab_parts_mysql_row['quantity']);
			$charge_tab_parts_row -> SetParameter("TOTAL", "$".number_format($charge_tab_parts_mysql_row['quantity']*$charge_tab_parts_mysql_row['price'],2));
			$charge_tab_parts ->  AppendParameter("PARTS",	$charge_tab_parts_row -> CreateHTML());
			$charge_tab_total += $charge_tab_parts_mysql_row['quantity']*$charge_tab_parts_mysql_row['price'];
			$page -> SetParameter ("SCRIPTCODE", "chargeTabParts[".$i."]=\"".$charge_tab_parts_mysql_row["chid"]."\";");
			$i++;
		}
	}

	$charge_tab -> SetParameter("PARTS", $charge_tab_parts -> CreateHTML());

	$charge_tab_laborhours_query = mysql_query("select charges.chid, charges.quantity from ticket, rates, rrs, charges where ticket.tid=".$_GET['tid']." and ticket.tid=charges.tid and ticket.rsid = rrs.rsid and rrs.rid = rates.rid and rates.title='hourly' and charges.chargetable='rates' and charges.tableid = rates.rid");
	$charge_tab_laborhours_row = mysql_fetch_array($charge_tab_laborhours_query);

	if(isset($charge_tab_laborhours_row['quantity']))
	{
		$charge_tab_laborhours = $charge_tab_laborhours_row['quantity'];
		$charge_tab -> SetParameter("LABORHOURSID", $charge_tab_laborhours_row['chid']);
	}
	else
	{
		$charge_tab_laborhours = 0;
		$charge_tab -> SetParameter("LABORHOURSID", "");
	}
	($charge_tab_is_express)?$charge_tab_labourhours_total = $charge_tab_laborhours * $charge_tab_expressrate:$charge_tab_labourhours_total = $charge_tab_laborhours * $charge_tab_hourlyrate;
	$charge_tab_total += $charge_tab_labourhours_total;

	$charge_tab -> SetParameter("LABORHOURS", $charge_tab_laborhours);
	
	$charge_tab -> SetParameter("LABORTOTAL", number_format($charge_tab_labourhours_total,2));
	$charge_tab -> SetParameter("SUBTOTAL", number_format($charge_tab_total,2));
	$charge_tab -> SetParameter("TAXTOTAL", number_format($charge_tab_total*$charge_tab_tax,2));
	$charge_tab -> SetParameter("LABORTOTALFORMATED", "$".number_format($charge_tab_total,2));
	$charge_tab -> SetParameter("TOTALCOST", number_format($charge_tab_total+$charge_tab_total*$charge_tab_tax,2));

	$ticket_detail -> AppendParameter("CONTENT",$charge_tab -> CreateHTML());

	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-charge/ticket_detail-charge.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-charge/ticket_detail-charge-ajax.js");
?>