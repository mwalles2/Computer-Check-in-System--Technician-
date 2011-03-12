#! /usr/bin/php
<?php
	require_once(__DIR__ . "/../../includes/class/HtmlTemplate.class");
	require_once(__DIR__ . "/../../includes/php/db.php");
	require_once(__DIR__ . "/../includes/php/class.twitter.php");
	require_once(__DIR__ . "/../includes/php/admin-general-ajax.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$updated_ticket = array();

	$email_subject = "Computer Help Center Ticket Update";

	$email_headers = "MIME-Version: 1.0\r\n";
	$email_headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
	$email_header_from = "From: Computer Help Center <helpdesk@unl.edu>\r\n";

	$emailResults = mysql_query("select user.name, contact.cid, contact.data,ticket.tid,status.status_text from user,contact,ticket,status where ticket.status=status.short_text and ticket.needsupdate = 1 and ticket.lastupdatestatus != ticket.status and ticket.nuid=contact.nuid and contact.contactme = 1 and contact.type = 'email' and user.nuid = ticket.nuid");

	while($emailRow = mysql_fetch_array($emailResults))
	{
		$email_header_to = "To: " . $emailRow["name"] . "<" . $emailRow["data"] . ">\r\n";
		$email_to = $emailRow["data"];
		$email_message = new HtmlTemplate(__DIR__ . "/../includes/inc/auto_contact/auto_contact_email.inc");
		$email_message -> SetParameter("NAME", $emailRow["name"]);
		$email_message -> SetParameter("STATUS", $emailRow["status_text"]);
		$email_message -> SetParameter("TID", $emailRow["tid"]);
		mail($email_to, $email_subject ,$email_message -> CreateHTML(), $email_headers .  $email_header_from);
		if(!in_array($emailRow["tid"],$updated_ticket))
		{
			$updated_ticket[] = $emailRow["tid"];
		}
		create_note_cmd("log","An automatic status update message was sent by e-mail",0,$emailRow["tid"],$connect);
	}

	$twitterResults = mysql_query("select user.name, contact.cid, contact.data,ticket.tid,status.status_text from user,contact,ticket,status,contact_services where ticket.status=status.short_text and ticket.needsupdate = 1 and ticket.lastupdatestatus != ticket.status and ticket.nuid=contact.nuid and contact.contactme = 1 and contact.type = 'other' and user.nuid = ticket.nuid and contact_services.csid = contact.service and contact_services.name = 'Twitter'");

	$tweet = new twitter("unlchc", "weneed10", "xml");
	while($twitterRow = mysql_fetch_array($twitterResults))
	{
		$tweet_message = new HtmlTemplate(__DIR__ . "/../includes/inc/auto_contact/auto_contact_twitter.inc");
		$tweet_message -> SetParameter("STATUS", $twitterRow["status_text"]);
		if($tweet -> sendDirectMessage($twitterRow["data"], $tweet_message -> CreateHTML()) === false)
		{
			mysql_query("update contact_services_verify set verify = 0 where cid = " . $twitterRow["cid"]);
		}
		else
		{
			mysql_query("update contact_services_verify set verify = 1 where cid = " . $twitterRow["cid"]);
			if(!in_array($twitterRow["tid"],$updated_ticket))
			{
				$updated_ticket[] = $twitterRow["tid"];
			}
			create_note_cmd("log","An automatic status update message was sent by Twitter",0,$twitterRow["tid"],$connect);
		}
	}

	foreach($updated_ticket as $tid)
	{
		mysql_query("update ticket set lastupdatestatus = status, needsupdate = 0 where tid = " . $tid);
	}
?>