<?php
	require_once("db.php");
	require_once("ldap_info.php");
	require_once("general.php");

	error_reporting(E_ERROR);

	$unl_ldap = false;		// This is true if the auth attempt is going to be off ldap.unl.edu
	$try_auth = true;		// This is true if an auth attempt needs to happen
							// This will be false if an UNL domain is provided with the email
	$ldap_auth = true;		// This is true if the auth attempt will be against any LDAP server
							// This will be false if the auth attempt will be against the local DB
	$cardAuth = false;
	$msg = false;

	/*  This needs to be moved to the database.*/
	$check_in_cards  = array("6271390000869234","1111");
	$check_out_cards = array("6271394000004081","2222");
	$no_auth_domains = array("bigred.unl.edu","unl.edu","unlnotes.unl.edu","unlserve.unl.edu");
	$auth_domains = array("mail.unomaha.edu","nebraska.edu","unk.edu","unmc.edu");
	
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$remove_array = array("+","(",")","-"," ");
	$xml = "";

	$mysql_query = "\t<mysql>\n";

	if(in_array($_GET["iso"], $check_in_cards) || in_array($_GET["username"], $check_in_cards))
	{
		$LDAP_xml="\t<newaccount>true</newaccount>\n";
	}
	else if(in_array($_GET["iso"], $check_out_cards) || in_array($_GET["username"], $check_out_cards))
	{
		$checkout_xml .= "\t<reset>true</reset>\n";
	}
	else
	{
		if($_GET["username"] != "" && $_GET["password"] != "")
		{
			if(strpos($_GET["username"],"@") === false)
			{
				$server = "ldap.unl.edu";
				$uid = $_GET['username'];
				$username = "uid=".$_GET['username'].",".$LDAP_ou.",".$LDAP_base_dn;
				$base_dn = $LDAP_base_dn;
				$unl_ldap = true;
			}
			else
			{
				list($username,$domain) = split ("@",$_GET["username"]);
				if(in_array($domain, $auth_domains))
				{
					$server = "notes.unl.edu"; // Needs to be set up in the database.
					$base_dn = "";
					$uid = $username;
				}
				else if(in_array($domain, $no_auth_domains))
				{
					$try_auth = false;
					$msg = "ldap";
				}
				else
				{
					$ldap_auth = false;
				}
			}

			if($try_auth)
			{
				$connect = mysql_connect($DB_server,$DB_user,$DB_password);
				mysql_select_db($DB_database, $connect);
				if($ldap_auth)
				{
					$LDAP_link = ldap_connect($server);
					if(ldap_bind($LDAP_link,$username,$_GET["password"]))
					{
						if($unl_ldap)
						{
							ldap_unbind($LDAP_link);
							$LDAP_link = ldap_connect($LDAP_server);
							if(ldap_bind($LDAP_link,$LDAP_dn,$LDAP_password))
							{
								$base_dn = $LDAP_base_dn;
							}
						}
						$filter = "(uid=".$uid.")";
						$search = ldap_search($LDAP_link,$base_dn, $filter);
						$entries = ldap_get_entries ($LDAP_link, $search);
						$first = ldap_first_entry($LDAP_link,$search);

						//var_dump($entries);
						//might need to change query
						$select_user = mysql_query("select * from user where username ='".$_GET["username"]."'");
						if(mysql_num_rows($select_user) > 0)
						{
							$msg = "good";
							$user_row = mysql_fetch_array($select_user,MYSQL_ASSOC);
							$userid = $user_row["UID"];
						}
						else
						{
							$msg = "create";
							$nuid = $entries[0]["unluncwid"][0];
						}
					}
					else
					{
						$msg = false;
					}
					ldap_unbind($LDAP_link);
				}
				else
				{
					$user_select = mysql_query("select * from user where username='".$_GET["username"]."'");
					if(mysql_num_rows($user_select))
					{
						$user_row = mysql_fetch_array($user_select,MYSQL_ASSOC);
						if($user_row["password"]==md5($_GET["password"]))
						{
							$msg = "good";
							$userid = $user_row["UID"];
						}
						else
						{
							$msg = false;
						}
					}
					else
					{
						$msg = false;
					}
				}
			}
		}
		else if ($_GET["username"] != "" || $_GET["iso"] != "")
		{
			if($_GET["username"] != "")
			{
				$iso = $_GET["username"];
			}
			else
			{
				$iso = $_GET["iso"];
			}
			$LDAP_link = ldap_connect($LDAP_server);
			if(ldap_bind($LDAP_link,$LDAP_dn,$LDAP_password))
			{
				$LDAP_attrib_list = array("edupersonprincipalname","displayname","sn","givenname","unlactive","edupersonaffiliation","edupersonprimaryaffiliation","mail","telephonenumber","unlsislocalphone","unlprimaryaffiliation","unluncwid","uid");
				$LDAP_query = "(| (unlidcardiso=". $iso .") (unlUNCWID=" . $iso . "))";
				$LDAP_search = ldap_search($LDAP_link,$LDAP_base_dn,$LDAP_query,$LDAP_attrib_list);
				$LDAP_info = ldap_get_entries($LDAP_link,$LDAP_search);
				if($LDAP_info["count"]>0)
				{
					$nuid = $LDAP_info[0]["unluncwid"][0];
					$select_user = mysql_query("select * from user where nuid ='".$nuid."'");
					if(mysql_num_rows($select_user) > 0)
					{
						$msg = "good";
						$user_row = mysql_fetch_array($select_user,MYSQL_ASSOC);
						$userid = $user_row["UID"];
					}
					else
					{
						$cardAuth = true;
						$msg = "create";
					}
				}
				else
				{
					$mysql_user_query = mysql_query("select * from user where nuid = '".$_GET["nuid"]."'");
					if(mysql_num_rows($mysql_user_query) > 0)
					{
						$mysql_user_row = mysql_fetch_array($mysql_user_query);
						$userid = $mysql_user_row["UID"];
						$msg = "good";
					}
					else
					{
						$msg = false;
					}
				}
			}
			else
			{
				$ldap = "false";
			}
			ldap_unbind($LDAP_link);
		}

		if($msg == "good")
		{
			$LDAP_xml .= "\t<uid>".$userid."</uid>\n";
			$computer_in_query = mysql_query("select ticket.tid,ticket.indate from ticket,user where user.uid='".$userid."' and ticket.nuid = user.nuid and ticket.outdate='0000-00-00 00:00:00'");
			if(mysql_num_rows($computer_in_query))
			{
				$LDAP_xml .= "<computerin>true</computerin>";
			}
			else
			{
				$LDAP_xml .= "<computerin>false</computerin>";
			}
		}
		else if($msg == "create")
		{
			$LDAP_xml .= "<createuser>true</createuser>";
			if($unl_ldap || $cardAuth)
			{
				$LDAP_xml .= "<nuid>".$nuid."</nuid>";
			}
			else
			{
				$LDAP_xml .= "<username>".$_GET['username']."</username>";
				$LDAP_xml .= "<password>".$_GET['password']."</password>";
			}
		}
		else if($msg == "ldap")
		{
			$LDAP_xml .= "\t<error>ldap</error>";
		}
		else
		{
			$LDAP_xml .= "\t<error>failed</error>";
		}
	}
	mysql_close($connect);

	$mysql_query .= "\t</mysql>\n";

	setcookie("uid",$userid,0,"/");

	header("Cache-Control: no-cache");
	header('Content-Type: text/xml');
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	$xml  = "<person>\n";
	$xml .= $LDAP_xml;
	$xml .= $checkout_xml;
	$xml .= $mysql_query;
	$xml .= "</person>";
	echo $xml;
?>