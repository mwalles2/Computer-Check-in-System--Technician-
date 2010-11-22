<?php
	header("Cache-Control: no-cache");
	require_once("db.php");
	require_once("ldap_info.php");
	require_once("general.php");

	error_reporting(E_ERROR);

	$unl_ldap = false;		// This is true if the auth attempt is going to be off ldap.unl.edu
	$try_auth = true;		// This is true if an auth attempt needs to happen
							// This will be false if an UNL domain is provided with the email
	$ldap_auth = true;		// This is true if the auth attempt will be against any LDAP server
							// This will be false if the auth attempt will be against the local DB

	$xml_out = "";
	$mysql_xml_out = "\t<mysql>\n";

	$mail_xml = "";
	$mail_array = array();

	$phone_xml = "";
	$phone_array = array();

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$mysql_user_query = mysql_query("select * from user where uid = '".$_GET['uid']."'");
	$mysql_user_row = mysql_fetch_array($mysql_user_query);
	$nuid = $mysql_user_row["nuid"];


	$LDAP_link = ldap_connect($LDAP_server);
	if(ldap_bind($LDAP_link,$LDAP_dn,$LDAP_password))
	{
		$LDAP_attrib_list = array("mail","telephonenumber","unlsislocalphone");
		$LDAP_query = "unlUNCWID=".$nuid;
		$LDAP_search = ldap_search($LDAP_link,$LDAP_base_dn,"(".$LDAP_query.")",$LDAP_attrib_list);
		$LDAP_info = ldap_get_entries($LDAP_link,$LDAP_search);
	}

	$computer_result = mysql_query("select distinct computer.*,user.* from computer,user,ticket,ttc where user.nuid='".$nuid."' and user.nuid=computer.nuid and computer.compid = ttc.compid and ttc.tid = ticket.tid and ticket.outdate < '".date("Y-m-d H:i:s", mktime(date("H"),date("i"),date("s")-30))."'",$connect);

	if (mysql_errno()>0)
	{
		$mysql_xml_out .= "\t<error>\r";
		$mysql_xml_out .= "\t\t<check>select distinct computer.*,user.* from computer,user,ticket,ttc where user.nuid='".$nuid."' and user.nuid=computer.nuid and computer.compid = ttc.compid and ttc.tid = ticket.tid and ticket.outdate < '".date("Y-m-d H:i:s", mktime(date("H"),date("i"),date("s")-30))."'</check>\n";
		$mysql_xml_out .= "\t\t<number>".mysql_errno()."</number>\r";
		$mysql_xml_out .= "\t\t<text><![CDATA[".mysql_error()."]]></text>\r";
		$mysql_xml_out .= "\t</error>\r";
	}

	//echo "2) ".mysql_errno().": ".mysql_error()."\n";

	$comp="";
	if(mysql_num_rows($computer_result) > 0)
	{
		while ($computer_row = mysql_fetch_array($computer_result))  //1
		{
			//echo "3+) ".mysql_errno().": ".mysql_error()."\n";
			$comp .= "\t<computer>\n\t\t<compid>".$computer_row["CompID"]."</compid>\n";
			$comp .= "\t\t<brand>".$computer_row["Brand"]."</brand>\n";
			$comp .= "\t\t<type>".typeOut($computer_row["Type"])."</type>\n";
			$comp .= "\t\t<serialnum>".$computer_row["serialnum"]."</serialnum>\n";
			$comp .= "\t</computer>\n";
		}
	}

	$contact_computer_result = mysql_query("select cid,type,data,normalized,active from contact where nuid='".$nuid."'",$connect);
	$mysql_xml_out .= "\t\t<check>select cid,type,data,active from contact where nuid='".$nuid."'</check>\n";
	if(mysql_num_rows($contact_computer_result))
	{
		//echo mysql_errno()." :".mysql_error()."<br>";
		while ($contact_row = mysql_fetch_array($contact_computer_result))  //2
		{
			//echo mysql_errno()." :".mysql_error()."<br>";
			if($contact_row["type"] == "phone")
			{
				$phone_array[] = $contact_row["normalized"];
				if($contact_row["active"])
				{
					$phone_xml .= "\t<telephoneNumber>\r\t\t<cid>".$contact_row["cid"]."</cid>\r\t\t<data>".$contact_row["data"]."</data>\r\t</telephoneNumber>\n";
				}
			}
			if ($contact_row["type"] == "email")
			{
				$mail_array[] = $contact_row["normalized"];
				if($contact_row["active"])
				{
					$mail_xml .= "\t<mail>\r\t\t<cid>".$contact_row["cid"]."</cid>\r\t\t<data>".$contact_row["data"]."</data>\r\t</mail>\n";
				}
			}
		}
	}

	for($i = 0; $i < $LDAP_info["count"]; $i++)
	{
		for($j = 0; $j < $LDAP_info[$i]["mail"]["count"]; $j++)
		{
			if(!in_array(normalizeEmail($LDAP_info[$i]["mail"][$j]),$mail_array))
			{
				mysql_query("insert into contact (nuid, type, data, normalized) values ('".$nuid."','email','".$LDAP_info[$i]["mail"][$j]."','".normalizeEmail($LDAP_info[$i]["mail"][$j])."')");
				$mail_xml .= "\t<mail>\r\t\t<new>true</new>\r\t\t<cid>".mysql_insert_id()."</cid>\r\t\t<data>".$LDAP_info[$i]["mail"][$j]."</data>\r\t</mail>\n";
			}
		}
		for($j = 0; $j < $LDAP_info[$i]["telephonenumber"]["count"]; $j++)
		{
			if(!in_array(normalizePhone($LDAP_info[$i]["telephonenumber"][$j]),$phone_array))
			{
				mysql_query("insert into contact (nuid, type, data, normalized) values ('".$nuid."','phone','".$LDAP_info[$i]["telephonenumber"][$j]."','".normalizePhone($LDAP_info[$i]["telephonenumber"][$j])."')");
				$phone_xml .= "\t<telephoneNumber>\r\t\t<new>true</new>\r\t\t<cid>".mysql_insert_id()."</cid>\r\t\t<data>".$LDAP_info[$i]["telephonenumber"][$j]."</data>\r\t</telephoneNumber>\n";
			}
		}
		for($j = 0; $j < $LDAP_info[$i]["unlsislocalphone"]["count"]; $j++)
		{
			if(!in_array(normalizePhone($LDAP_info[$i]["unlsislocalphone"][$j]),$phone_array))
			{
				mysql_query("insert into contact (nuid, type, data, normalized) values ('".$nuid."','phone','".$LDAP_info[$i]["unlsislocalphone"][$j]."','".normalizePhone($LDAP_info[$i]["unlsislocalphone"][$j])."')");
				$phone_xml .= "\t<telephoneNumber>\r\t\t<new>true</new>\r\t\t<cid>".mysql_insert_id()."</cid>\r\t\t<data>".$LDAP_info[$i]["unlsislocalphone"][$j]."</data>\r\t</telephoneNumber>\n";
			}
		}
	}

	mysql_close($connect);
	$mysql_xml_out .= "\t</mysql>\n";

	header('Content-Type: text/xml');
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	$xml  = "<person>\n";
	$xml .= $xml_out;
	$xml .= $comp;
	$xml .= $phone_xml;
	$xml .= $mail_xml;
	$xml .= $mysql_xml_out;
	$xml .= "</person>";
	echo $xml;
?>