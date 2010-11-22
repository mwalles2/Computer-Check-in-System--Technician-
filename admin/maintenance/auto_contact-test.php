<html>
<body>
<?php
	require_once("../../includes/class/HtmlTemplate.class");
	require_once("../../includes/php/db.php");
	require_once("../includes/php/class.twitter.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$twitterResults = mysql_query("select user.name, contact.cid, contact.data,ticket.tid,status.status_text from user,contact,ticket,status,contact_services where ticket.status=status.short_text and ticket.needsupdate = 1 and ticket.lastupdatestatus != ticket.status and ticket.nuid=contact.nuid and contact.contactme = 1 and contact.type = 'other' and user.nuid = ticket.nuid and contact_services.csid = contact.service and contact_services.name = 'Twitter'");

	$tweet = new twitter("unlchc", "weneed10", "xml");
	while($twitterRow = mysql_fetch_array($twitterResults))
	{
		$tweet_message = new HtmlTemplate("../includes/inc/auto_contact/auto_contact_twitter.inc");
		$tweet_message -> SetParameter("STATUS", $twitterRow["status_text"]);
		$tweet -> sendDirectMessage($twitterRow["data"], $tweet_message -> CreateHTML());
	}
?>
</body>
</html>