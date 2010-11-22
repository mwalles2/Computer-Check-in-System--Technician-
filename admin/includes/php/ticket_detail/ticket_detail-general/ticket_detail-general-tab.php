<?php
	$general_tab = new HtmlTemplate("../admin/includes/inc/ticket_detail/ticket_detail-general/ticket_detail-general-tab.inc");
	$general_result = mysql_query("select ticket.tid, user.name, user.nuid, ticket.indate, computer.brand, computer.serialnum, computer.type, ticket.status, ticket.cds, ticket.accounts, ticket.laptopcase, ticket.laptoppower, ticket.ethernet, ticket.problems, ticket.wireless, ticket.workingtech, ticket.backup, ticket.OutDate, ticket.untilDate, ticket.checkouttech, ticket.locid from ticket, user, ttc, computer where ticket.tid='".$_GET["tid"]."' and ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.nuid=user.nuid",$connect);

	$general_row=mysql_fetch_array($general_result);
	$location_query=mysql_query("select * from locations where active = 1");

	$general_tab -> SetParameter("NUID", $general_row['nuid']);
	$general_address = mysql_query("select * from address where tid = ".$general_row['tid']);

	if($general_row['OutDate']=="0000-00-00 00:00:00")
	{
		if(mysql_num_rows($location_query))
		{
			$location_select = "";
			$old_location = true;
			foreach($LOCATIONS as $location_row)
			{
				$location_select .= "<option value=\"".$location_row['locid']."\"";
				if($general_row['locid'] == $location_row['locid'])
				{
					$location_select .= " selected";
					$old_location = false;
				}
				$location_select .= ">".$location_row['name']."</option>\r";
			}
			if ($old_location)
			{
				$page -> SetParameter("BODYOPTIONS", " onload=\"javascript:toggleLocation('on')\"");
			}
			$general_tab -> SetParameter("DATEWIDTH"			,"25%");
			$general_tab -> SetParameter("PRINTWIDTH"			,"25%");
			$general_tab -> SetParameter("LOCATIONSTYLE"		,"");
			$general_tab -> SetParameter("STATUSWIDTH"			,"25%");
			$general_tab -> SetParameter("LOCATIONSELECT"		, $location_select);
			$general_tab -> SetParameter("LOCATIONSELECTSTYLE"	, "");
			$general_tab -> SetParameter("LOCATIONNAMESTYLE"	,"display:none");
		}
		else
		{
			$general_tab -> SetParameter("DATEWIDTH","33%");
			$general_tab -> SetParameter("PRINTWIDTH","34%");
			$general_tab -> SetParameter("LOCATIONSTYLE"," display:none;");
			$general_tab -> SetParameter("STATUSWIDTH","33%");
		}
	}
	else
	{
		$checkout_location_query = mysql_query("select * from locations where locid = ".$general_row["locid"]);
		$checkout_location_row = mysql_fetch_array($checkout_location_query);
		$general_tab -> SetParameter("LOCATIONNAME",$checkout_location_row['name']);
		$general_tab -> SetParameter("LOCATIONNAMESTYLE"	,"display:inline");
		$general_tab -> SetParameter("DATEWIDTH"			,"25%");
		$general_tab -> SetParameter("PRINTWIDTH"			,"25%");
		$general_tab -> SetParameter("LOCATIONSTYLE"		,"");
		$general_tab -> SetParameter("LOCATIONSELECTSTYLE"	,"display:none;");
		$general_tab -> SetParameter("STATUSWIDTH"			,"25%");
	}

	if(mysql_num_rows($general_address) > 0)
	{
		$general_address_row = mysql_fetch_array($general_address);
		$general_tab -> SetParameter("SHOWADDRESS"," style=\"display:inline;\"");
		$general_tab -> SetParameter("STREET",$general_address_row['street']);
		$general_tab -> SetParameter("STATE",$general_address_row['state']);
		$general_tab -> SetParameter("CITY",$general_address_row['city']);
		$general_tab -> SetParameter("ZIP",$general_address_row['zip']);
	}
	else
	{
		$general_tab -> SetParameter("SHOWADDRESS","");
	}

	$general_tab -> SetParameter("USERNOTES","");
	$general_tab -> SetParameter("FROMUSERNOTES","");
	$general_tab -> SetParameter("TECHNOTES","");
	$general_tab -> SetParameter("LOGNOTES","");
	$general_tab -> SetParameter("USERNOTEHEADERCLASS","cell bottom_border");
	$general_tab -> SetParameter("FROMUSERNOTEHEADERCLASS","cell bottom_border");
	$general_tab -> SetParameter("TECHNOTEHEADERCLASS","cell bottom_border");
	$general_tab -> SetParameter("LOGNOTEHEADERCLASS","cell bottom_border");

	$general_notes = mysql_query("select notes.nid, notes.cDate, notes.note, tech.name, notes.nType from tech, notes, ntt where ntt.tid='".$_GET["tid"]."' and ntt.nid=notes.nid and notes.techid=tech.techid order by notes.cDate",$connect);
	while($general_notes_row = mysql_fetch_array($general_notes))
	{
		$general_tab_note = new HtmlTemplate("../admin/includes/inc/ticket_detail/ticket_detail-general/ticket_detail-general-tab-note.inc");
		$general_tab_note -> SetParameter("COUNTER",$general_notes_row['nid']);
		$general_tab_note -> SetParameter("TECH",$general_notes_row['name']);
		$general_tab_note -> SetParameter("NOTE",str_replace(array ("\n","\r"),"<br>",str_replace(array("\r\n","\n\r"),"\n",stripslashes($general_notes_row['note']))));
		$general_tab_note -> SetParameter("DATE",$general_notes_row['cDate']);
		$general_tab_note -> SetParameter("EXTARSTYLE","");
		
		if($general_notes_row["nType"]=="User")
		{
			$general_tab_note -> SetParameter("TYPE","user");
			$general_tab -> SetParameter("USERNOTEHEADERCLASS","cell");
			$general_tab -> AppendParameter("USERNOTES",$general_tab_note -> CreateHTML());
		}
		else if($general_notes_row["nType"]=="Tech")
		{
			$general_tab_note -> SetParameter("TYPE","tech");
			$general_tab -> SetParameter("TECHNOTEHEADERCLASS","cell");
			$general_tab -> AppendParameter("TECHNOTES",$general_tab_note -> CreateHTML());
		}
		else if($general_notes_row["nType"]=="log")
		{
			$general_tab_note -> SetParameter("TYPE","log");
			$general_tab_note -> SetParameter("EXTARSTYLE"," style=\"display:none;\"");
			$general_tab -> SetParameter("LOGNOTEHEADERCLASS","cell");
			$general_tab -> AppendParameter("LOGNOTES",$general_tab_note -> CreateHTML());
		}
		unset($general_tab_note);
	}

	$general_from_user_notes_query = mysql_query("select notes.nid, notes.cDate, notes.note, user.name, notes.nType from user, notes, ntt where ntt.tid='".$_GET["tid"]."' and ntt.nid=notes.nid and notes.techid=user.uid and nType = 'fromUser' order by notes.cDate",$connect);

	while($general_from_user_notes_row = mysql_fetch_array($general_from_user_notes_query))
	{
		$general_tab_note = new HtmlTemplate("../admin/includes/inc/ticket_detail/ticket_detail-general/ticket_detail-general-tab-note.inc");
		$general_tab_note -> SetParameter("COUNTER",$general_from_user_notes_row['nid']);
		$general_tab_note -> SetParameter("TECH",$general_from_user_notes_row['name']);
		$general_tab_note -> SetParameter("NOTE",str_replace(array ("\n","\r"),"<br>",str_replace(array("\r\n","\n\r"),"\n",stripslashes($general_from_user_notes_row['note']))));
		$general_tab_note -> SetParameter("DATE",$general_from_user_notes_row['cDate']);
		$general_tab_note -> SetParameter("TYPE","fromUser");
		$general_tab_note -> SetParameter("EXTARSTYLE"," style=\"display:none;\"");
		$general_tab -> SetParameter("FROMUSERNOTEHEADERCLASS","cell");
		$general_tab -> AppendParameter("FROMUSERNOTES",$general_tab_note -> CreateHTML());
	}

	if($general_row['type']=="laptop")
	{
		$general_tab_laptop = new HtmlTemplate("../admin/includes/inc/ticket_detail/ticket_detail-general/ticket_detail-general-tab-laptop.inc");
		$general_tab_laptop -> SetParameter("POWERSUPPLY", ($general_row['laptoppower'])?"yes":"no");
		$general_tab_laptop -> SetParameter("CASE", ($general_row['laptopcase']!="NONE")?$general_row['laptopcase']:"no");
		$general_laptop = $general_tab_laptop -> CreateHTML();
	}
	else
	{
		$general_laptop="";
	}

	$general_accounts_i = 0;
	$general_tab -> SetParameter("ACCOUNTS","");
	$general_accounts = mysql_query("select * from accounts where tid=".$general_row['tid'],$connect);
	while($general_accounts_row = mysql_fetch_array($general_accounts))
	{
		$general_accounts_i++;
		$general_tab_accounts = new HtmlTemplate("../admin/includes/inc/ticket_detail/ticket_detail-general/ticket_detail-general-tab-accounts.inc");
		$general_tab_accounts -> SetParameter("COUNTER",$general_accounts_row['aid']);
		$general_tab_accounts -> SetParameter("USERNAME",$general_accounts_row['username']);
		$general_tab_accounts -> SetParameter("PASSWORD",$general_accounts_row['password']);
		if($general_accounts_i == mysql_num_rows($general_accounts))
		{
			$general_tab_accounts -> SetParameter("ACCOUNT_IFBOTTOM","bottom_");
		}
		else
		{
			$general_tab_accounts -> SetParameter("ACCOUNT_IFBOTTOM","");
		}
		$general_tab -> AppendParameter("ACCOUNTS",$general_tab_accounts -> CreateHTML());
		unset($general_tab_accounts);
	}

	$general_tab -> SetParameter("MACADDRESSES","");
	$general_macs = mysql_query("select eid,internal,wireless,mac from ethernet where tid=".$_GET['tid'],$connect);
	$general_macs_i = 0;
	while($general_macs_row = mysql_fetch_array($general_macs))
	{
		$general_macs_i++;
		$general_tab_mac = new HtmlTemplate("../admin/includes/inc/ticket_detail/ticket_detail-general/ticket_detail-general-tab-mac.inc");
		$general_tab_mac -> SetParameter("COUNTER",$general_macs_row['eid']);
		$general_tab_mac -> SetParameter("ADDRESS",$general_macs_row['mac']);
		$general_tab_mac -> SetParameter("FORM",($general_macs_row['internal'])?"Internal":"External");
		$general_tab_mac -> SetParameter("TYPE",($general_macs_row['wireless'])?"Wireless":"Wired");
		if($general_macs_i == mysql_num_rows($general_macs))
		{
			$general_tab_mac -> SetParameter("MAC_IFBOTTOM","bottom_");
		}
		else
		{
			$general_tab_mac -> SetParameter("MAC_IFBOTTOM","");
		}
		$general_tab -> AppendParameter("MACADDRESSES",$general_tab_mac -> CreateHTML());
		unset($general_tab_mac);
	}

	$general_tab -> SetParameter("WORKSELECT","");
	$general_tab -> SetParameter("USERSELECT","");
	$general_tab -> SetParameter("TECHSELECT","");
	$general_tab -> SetParameter("PARTSELECT","");
	$general_tab -> SetParameter("PRICESELECT","");
	$general_tab -> SetParameter("REPAIRSELECT","");
	$general_tab -> SetParameter("DONESELECT","");
	$general_tab -> SetParameter("PICKEDUP","");
	$general_tab -> SetParameter("PICKEDUPSELECT","");
	$general_tab -> SetParameter("WORKINGTECH","");

	$status_text="";
	$status_select = mysql_query("select * from status where sort_order != 0 order by sort_order");
	while($status_row = mysql_fetch_array($status_select))
	{
		$status_text .= "\t\t\t\t\t\t<option value=\"".$status_row['short_text']."\"";
//echo ($status_row['short_text']==$general_row['status'] && $general_row['OutDate']=="0000-00-00" && $general_row['untilDate']=="0000-00-00")?"test 1 = true<br>":"test 1 = false<br>";
//echo ($status_row['short_text'] == "until" && $general_row['untilDate']!="0000-00-00")?"test 2 = true<br>":"test 2 = false<br>";
		if(($status_row['short_text']==$general_row['status'] && $general_row['OutDate']=="0000-00-00 00:00:00" && $general_row['untilDate']=="0000-00-00") || ($status_row['short_text'] == "until" && $general_row['untilDate']!="0000-00-00"))
		{
			$status_text .= " selected";
		}
		$status_text .= ">".$status_row["status_text"]."</option>";
	}
	if($general_row['status'] != "new")
	{
		if($general_row['untilDate']!="0000-00-00")
		{
			$general_tab -> SetParameter("WORKINGTECH", " ".$general_row['untilDate']);
		}
		if($general_row['OutDate']!="0000-00-00 00:00:00")
		{
			$general_tab -> SetParameter("PICKEDUP"," disabled");
			$general_tab -> SetParameter("PICKEDUPSELECT","\r\t\t\t\t\t<option value=\"pickedup\" selected>Picked Up</option>");
			$working_tech = mysql_query("select name from tech where techid = '".$general_row['checkouttech']."'");
		}
		else
		{
			$working_tech = mysql_query("select name from tech where techid = '".$general_row['workingtech']."'");
		}
		$working_tech_row = mysql_fetch_array($working_tech);
		$general_tab -> AppendParameter("WORKINGTECH"," by: ".$working_tech_row['name']);		
	}

//	$general_email_result = mysql_query("select contact.* from contact,contacontacttoticketoticket where contacontacttoticketoticket.tid = '".$general_row['tid']."' and contact.cid = contacontacttoticketoticket.cid and contact.type = 'phone'");
	$general_phone_result = mysql_query("select contact.* from contacttoticket,contact where contacttoticket.tid = '".$general_row['tid']."' and contact.cid = contacttoticket.cid and contact.type = 'phone'");
	$general_phone = "";
	$general_javascript = "//From ticket_detail-general-tab.php\n\n";
	$general_javascript .= "\t\tgeneralTabPhoneId=new Array();\n";
	while($general_phone_row = mysql_fetch_array($general_phone_result))
	{
		$general_javascript .= "\t\tgeneralTabPhoneId[".$general_phone_row["cid"]."]='".$general_phone_row["data"]."';\n";
		$general_phone .= $general_phone_row["data"]."<br>";
	}
	if($general_phone == "")
	{
		$general_phone = "&nbsp;";
	}

//	$general_email_result = mysql_query("select contact.* from contact,contacontacttoticketoticket where contacontacttoticketoticket.tid = '".$general_row['tid']."' and contact.cid = contacontacttoticketoticket.cid and contact.type = 'email'");
	$general_email_result = mysql_query("select contact.* from contacttoticket,contact where contacttoticket.tid = '".$general_row['tid']."' and contact.cid = contacttoticket.cid and contact.type = 'email'");
	$general_email = "";
	$general_javascript .= "\t\tgeneralTabEmailId=new Array();\n";
	while($general_email_row = mysql_fetch_array($general_email_result))
	{
		$general_javascript .= "\t\tgeneralTabEmailId[".$general_email_row["cid"]."]='".$general_email_row["data"]."';\n";
		$general_email .= $general_email_row["data"]."<br>";
	}
	if($general_email == "")
	{
		$general_email = "&nbsp;";
	}

	$general_tab	-> SetParameter		("STATUS",			$status_text);
	$general_tab	-> SetParameter		("USERNAME",		$general_row['name']);
	$general_tab	-> SetParameter		("DATE",			$general_row['indate']);
	$general_tab	-> SetParameter		("PHONENUMBER",		$general_phone);
	$general_tab	-> SetParameter		("EMAILADDRESS",	$general_email);
	$general_tab	-> SetParameter		("BRAND",			$general_row['brand']);
	$general_tab	-> SetParameter		("TYPE",			typeOut($general_row['type']));
	$general_tab	-> SetParameter		("SERIALNUM",		$general_row['serialnum']);
	$general_tab	-> SetParameter		("CARDETH",			($general_row['ethernet'])?"yes":"no");
	$general_tab	-> SetParameter		("CARDWIRELESS",	($general_row['wireless'])?"yes":"no");
	$general_tab	-> SetParameter		("LAPTOP",			$general_laptop);
	$general_tab	-> SetParameter		("PROBLEMS",		str_replace(array (";;","\n","\r"),"<br>",str_replace(array("\r\n","\n\r"),"\n",$general_row['problems'])));
	$general_tab	-> SetParameter		("CDS",				str_replace(array (";;","\n","\r"),"<br>",str_replace(array("\r\n","\n\r"),"\n",$general_row['cds'])));
	$general_tab	-> SetParameter		("BACKUP",			($general_row['backup'])?"yes":"no");
	$general_tab	-> SetParameter		("UNTILDATE",		date("n/j/Y",strtotime("+1 month")));
	$general_tab	-> SetParameter		("CURRENTSTAT",		($general_row['untilDate']=="0000-00-00")?$general_row['status']:"until");

	$ticket_detail	-> AppendParameter	("CONTENT",			$general_tab -> CreateHTML());

	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-general/ticket_detail-general.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/print_ticket.js");
	$page -> SetParameter("SCRIPTCODE", $general_javascript);
?>