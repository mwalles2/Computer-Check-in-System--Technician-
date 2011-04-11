#! /usr/bin/php
<?php
	require_once(__DIR__ . "/../../includes/class/HtmlTemplate.class");
	require_once(__DIR__ . "/../../includes/php/db.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$survey_link = "";
	$survey_subject = "Customer Survey"; //Default survey subject text
	$survey_text = "";
	$survey_return_address = "";  //This needs to be update so that the return address is taken from the database.

	$config_query = mysql_query("select * from config");
	while($config_result = mysql_fetch_array($config_query))
	{
		//echo "config name = ".$config_result["name"]."\n";
		if($config_result["name"] == "survey_link")
			$survey_link = $config_result["value"];
		else if($config_result["name"] == "survey_subject")
			$survey_subject = $config_result["value"];
		else if($config_result["name"] == "survey_text")
			$survey_text = $config_result["value"];
		else if($config_result["name"] == "survey_return_address")
			$survey_return_address = $config_result["value"];
	}

	//echo "before IF\n";
	if($survey_text != "" && $survey_link != "" && $survey_return_address != "")
	{
		//echo "in IF\n";
		$email = new HtmlTemplate(__DIR__ . "/../../includes/inc/email.inc");
		$email -> SetParameter("SUBJECT", $survey_subject);
		$message = new HtmlTemplate(NULL, str_replace(array("\n","\r"),"<br>\n",$survey_text));
		$message -> SetParameter("SURVEYLINK",$survey_link);

		$email_headers = "MIME-Version: 1.0\r\n";
		$email_headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
		$email_headers .= "From: " . $survey_return_address . "\r\n";

		//This is temporary, it will be cange to get the date range from the database
		$oldest_date = date("Y-m-d", mktime(0,0,0,date("m"),date("d")-1,date("Y"))); //Yesterday
		$newest_date = date("Y-m-d"); //Today

		$survey_query = mysql_query("select ticket.nuid, user.name, contact.data, computer.brand, computer.type from ticket,contacttoticket,contact,user,ttc,computer where ticket.outdate>'" . $oldest_date. "' and ticket.outdate<'" . $newest_date . "' and ticket.tid=contacttoticket.tid and contacttoticket.cid = contact.cid and contact.type='email' and ticket.nuid=user.nuid and ticket.tid=ttc.tid and ttc.compid=computer.compid");

		while($survey_resluts = mysql_fetch_array($survey_query))
		{
			$current_email = clone $email;
			$current_message = clone $message;
			
			if($survey_resluts["type"]=="desk")
				$type="Desktop";
			else if($survey_resluts["type"]=="laptop")
				$type="Laptop";
			else
				$type=$survey_resluts["type"];

			$current_message -> SetParameter("CUSTOMERNAME",$survey_resluts["name"]);
			$current_message -> SetParameter("CUSTOMERCOMPUTER",$survey_resluts["brand"] . " " . $type);

			$current_email -> SetParameter("CONTENT",$current_message->CreateHtml());
			//echo $survey_resluts["data"]."\n";
			mail($survey_resluts["data"],$survey_subject,$current_email->CreateHtml(),$email_headers);
		}
	}
?>