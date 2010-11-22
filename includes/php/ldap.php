<?php
	header("Cache-Control: no-cache");
	require_once("db.php");
	require_once("ldap_info.php");
	require_once("general.php");

	$check_in_cards  = array("6271390000869234","1111");
	$check_out_cards = array("6271394000004081","2222");
	

	$remove_array = array("+","(",")","-"," ");
	$xml = "";

	$mail_xml = "";
	$mail_array = array();

	$phone_xml = "";
	$phone_array = array();

	$checkout_xml="";

	$ldap="true";
	
	$mysql_query = "\t<mysql>\n";
	
	if(in_array($_GET["iso"], $check_in_cards) || in_array($_GET["iso"], $check_out_cards) || in_array($_GET["nuid"], $check_in_cards) || in_array($_GET["nuid"], $check_out_cards))
	{
		$LDAP_xml="\t<unlUNCWID>unknown</unlUNCWID>\n";
		if(in_array($_GET["iso"], $check_out_cards) || in_array($_GET["nuid"], $check_out_cards))
		{
			$checkout_xml .= "\t<checkout>\n";
			$checkout_xml .= "\t\t<tid>unknown</tid>\n";
			$checkout_xml .= "\t\t<date>unknown</date>\n";
			$checkout_xml .= "\t</checkout>\n";
		}
	}
	else
	{
		$LDAP_link = ldap_connect($LDAP_server);
		if(ldap_bind($LDAP_link,$LDAP_dn,$LDAP_password))
		{
			$LDAP_attrib_list = array("edupersonprincipalname","displayname","sn","givenname","unlactive","edupersonaffiliation","edupersonprimaryaffiliation","mail","telephonenumber","unlsislocalphone","unlprimaryaffiliation","unluncwid","uid");
			if($_GET["iso"] != "")
			{
				$LDAP_query = "unlidcardiso=".$_GET["iso"];
			}
			else if($_GET["nuid"] != "")
			{
				$LDAP_query = "unlUNCWID=".$_GET["nuid"];
			}
			$LDAP_search = ldap_search($LDAP_link,$LDAP_base_dn,"(".$LDAP_query.")",$LDAP_attrib_list);
			$LDAP_info = ldap_get_entries($LDAP_link,$LDAP_search);
		}
		else
		{
			$ldap="false";
		}

		$connect = mysql_connect($DB_server,$DB_user,$DB_password);

		mysql_select_db($DB_database, $connect);
//		$nuid = $LDAP_info[0]["unluncwid"][0];
		if($LDAP_info["count"]>0)
		{
			$nuid = $LDAP_info[0]["unluncwid"][0];
			$edupersonprincipalname = $LDAP_info[0]["edupersonprincipalname"][0];
			$displayname = $LDAP_info[0]["displayname"][0];
			$givenname = $LDAP_info[0]["givenname"][0];
			$sn = $LDAP_info[0]["sn"][0];
			$unlactive = $LDAP_info[0]["unlactive"][0];
			$edupersonaffiliation = $LDAP_info[0]["edupersonaffiliation"][0];
			$edupersonprimaryaffiliation = $LDAP_info[0]["edupersonprimaryaffiliation"][0];
			$uid = $LDAP_info[0]["uid"][0];
			$unlprimaryaffiliation = $LDAP_info[0]["unlprimaryaffiliation"][0];
			$unlidcardiso = $LDAP_info[0]["unlidcardiso"][0];
		}
		else
		{
			$mysql_user_query = mysql_query("select * from user where nuid = '".$_GET["nuid"]."'");
			$mysql_query .= "\t\t<check>select * from user where nuid = '".$nuid."'</check>\n";
			$mysql_user_row = mysql_fetch_array($mysql_user_query);
			$edupersonprincipalname = "";
			$displayname = $mysql_user_row["Name"];
			$givenname = $mysql_user_row["Givenname"];
			$sn = $mysql_user_row["Surname"];
			$unlactive = $mysql_user_row["status"];
			$edupersonaffiliation = $mysql_user_row["status"];
			$edupersonprimaryaffiliation = $mysql_user_row["status"];
			$uid = $mysql_user_row["username"];
			$unlprimaryaffiliation = $mysql_user_row["status"];
			$nuid = $mysql_user_row["nuid"];
			$unlidcardiso = "";
		}

		//echo $LDAP_info[0]["unluncwid"][0]."<br>";

		//echo "1) ".mysql_errno().": ".mysql_error()."\n";
		$computer_result = mysql_query("select distinct computer.*,user.* from computer,user,ticket,ttc where user.nuid='".$nuid."' and user.nuid=computer.nuid and computer.compid = ttc.compid and ttc.tid = ticket.tid and ticket.outdate != '0000-00-00'",$connect);

		if (mysql_errno()>0)
		{
			$mysql_query .= "\t<error>\r";
			$mysql_query .= "\t\t<check>select distinct computer.*,user.* from computer,user,ticket,ttc where user.nuid='".$nuid."' and user.nuid=computer.nuid and computer.compid = ttc.compid and ttc.tid = ticket.tid and ticket.outdate != '0000-00-00'</check>\n";
			$mysql_query .= "\t\t<number>".mysql_errno()."</number>\r";
			$mysql_query .= "\t\t<text><![CDATA[".mysql_error()."]]></text>\r";
			$mysql_query .= "\t</error>\r";
		}

		$mysql_query .= "\t\t<check>select distinct computer.*,user.* from computer,user,ticket,ttc where user.nuid='".$nuid."' and user.nuid=computer.nuid and computer.compid = ttc.compid and ttc.tid = ticket.tid and ticket.outdate != '0000-00-00'</check>\n";
		//echo "2) ".mysql_errno().": ".mysql_error()."\n";

		$comp="";
		if(mysql_num_rows($computer_result) > 0)
		{
			while ($computer_row = mysql_fetch_array($computer_result))  //1
			{
				//echo "3+) ".mysql_errno().": ".mysql_error()."\n";
				$comp.="\t<computer>\n\t\t<compid>".$computer_row["CompID"]."</compid>\n\t\t<brand>".$computer_row["Brand"]."</brand>\n\t\t<type>".typeOut($computer_row["Type"])."</type>\n\t\t<serialnum>".$computer_row["serialnum"]."</serialnum>\n\t</computer>\n";
			}
			$contact_computer_result = mysql_query("select DISTINCT type,data from contact where nuid='".$nuid."'",$connect);
			$mysql_query .= "\t\t<check>select DISTINCT type,data from contact where nuid='".$nuid."'</check>\n";

			//echo mysql_errno()." :".mysql_error()."<br>";
			while ($contact_row = mysql_fetch_array($contact_computer_result))  //2
			{
				//echo mysql_errno()." :".mysql_error()."<br>";
				if($contact_row["type"] == "phone")
				{
					$phone_xml .= "\t<telephoneNumber>".$contact_row["data"]."</telephoneNumber>\n";
					$phone_array[] = str_replace($remove_array,"",$contact_row["data"]);
				}
				if ($contact_row["type"] == "email")
				{
					$mail_xml .= "\t<mail>".$contact_row["data"]."</mail>\n";
					$mail_array[] = strtolower($contact_row["data"]);
				}
			}
		}
		$out_result = mysql_query("select tid,indate from ticket where nuid='".$nuid."' and status='done' and outdate='0000-00-00'");
		$mysql_query .= "\t\t<check>select tid,indate from ticket where nuid='".$nuid."' and status='done' and outdate='0000-00-00'</check>\n";
		while($out_row = mysql_fetch_array($out_result))
		{
			$checkout_xml .= "\t<checkout>\n";
			$checkout_xml .= "\t\t<tid>".$out_row['tid']."</tid>\n";
			$checkout_xml .= "\t\t<date>".$out_row['indate']."</date>\n";
			$checkout_xml .= "\t</checkout>\n";
		}

		mysql_close($connect);

		if($ldap=="true")
		{
			$LDAP_xml = "\t<eduPersonPrincipalName>".$edupersonprincipalname."</eduPersonPrincipalName>\n\t<displayName>".$displayname."</displayName>\n\t<givenName>".$givenname."</givenName>\n\t<sn>".$sn."</sn>\n\t<unlActive>".$unlactive."</unlActive>\n\t<eduPersonAffiliation>".$edupersonaffiliation."</eduPersonAffiliation>\n\t<eduPersonPrimaryAffiliation>".$edupersonprimaryaffiliation."</eduPersonPrimaryAffiliation>\n\t<username>".$uid."</username>\n";

			for($i=0; $i < $LDAP_info["count"]; $i++)
			{
				$e_bool = true;
				$p_bool = true;
				$mail = $LDAP_info[$i]["mail"][0];
				if($LDAP_info[$i]["telephonenumber"]["count"] != 0)
				{
					$phone = $LDAP_info[$i]["telephonenumber"][0];
				}
				if($LDAP_info[$i]["unlsislocalphone"]["count"] != 0)
				{
					$phone = $LDAP_info[$i]["unlsislocalphone"][0];
				}
				foreach ($mail_array as $e_key => $e_value)
				{
					if (strtolower($mail) == $e_value)
					{
						$e_bool = false;
					}
				}
				foreach ($phone_array as $p_key => $p_value)
				{
					$t_phone = str_replace($remove_array,"",$phone);
					if ($t_phone == substr($p_value,strlen($t_phone)*-1))
					{
						$p_bool = false;
					}
				}
				if($e_bool && $mail != "")
				{
					$mail_xml .= "\t<mail>".$mail."</mail>\n";
				}
				if($p_bool && $phone != "")
				{
					$phone_xml .= "\t<telephoneNumber>".$phone."</telephoneNumber>\n";
				}
			}
			$LDAP_xml .= $mail_xml;
			$LDAP_xml .= $phone_xml;
			$LDAP_xml .= "\t<unlPrimaryAffiliation>".$unlprimaryaffiliation."</unlPrimaryAffiliation>\n\t<unlidcardiso>".$unlidcardiso."</unlidcardiso>\n\t<unlUNCWID>".$nuid."</unlUNCWID>\n";
		}
		$form="l";

		$ldapAvailable="\t<ldapAvailable>".$ldap."</ldapAvailable>\n";
		$formLength="\t<formLength>".$form."</formLength>\n";
	}
	$mysql_query .= "\t</mysql>\n";

	header('Content-Type: text/xml');
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	$xml  = "<person>\n";
	$xml .= $formLength;
	$xml .= $ldapAvailable;
	$xml .= $LDAP_xml;
	$xml .= $comp;
	$xml .= $checkout_xml;
	$xml .= $mysql_query;
	$xml .= "</person>";
	echo $xml;
?>