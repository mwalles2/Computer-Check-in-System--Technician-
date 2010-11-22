<?php
	require_once("../../../../../includes/php/db.php");
	require_once("../../admin-general-ajax.php");
	require_once("../../auth.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);
	$xml ="<data>\r";
	$debug = false;
	$mysql_error_bool=false;
	$mysql_out = "<mysql>\r";
	switch ($_GET['action'])
	{
		case "status":
			$status_query = mysql_query("select * from status where short_text = '".$_GET['status']."'",$connect);
			$status_row = mysql_fetch_array($status_query);
			$message = $status_row['status_text'];

			$untilDate = "0000-00-00";
			$doneDate = "0000-00-00";
			$workingTech = "";

			$status = "status = '".$_GET['status']."', ";
			if($_GET['status'] == "work")
			{
				$workingTech = "workingtech='".$_COOKIE['TECHID']."', ";
			}
			else if($_GET['status'] == "until")
			{
				$untilDate = date("Y-m-d",strtotime($_GET['untildate']));
				$message .= " ".$untilDate;
				$status = "";
			}

			if($_GET['status'] == "done")
			{
				$doneDate =date("Y-m-d");
			}

			mysql_query("update ticket set ".$status.$workingTech."untilDate='".$untilDate."', DoneDate='".$doneDate."', needsupdate=1 where tid = '".$_GET['tid']."'",$connect);
			$xml .="\t<mysql>update ticket set ".$status.$workingTech."untilDate='".$untilDate."' where tid = '".$_GET['tid']."'</mysql>\r";
			$xml .="\t<mysqlerror>".mysql_errno().": ".mysql_error()."</mysqlerror>\r";
			$xml .= create_note("log",str_replace("+"," ",$_COOKIE['TECHNAME'])." changed the status to ".$message,0,0,$connect);
			break;
		case "edit":
			if($_GET['new_item']=="true")
			{
				if($_GET['item'] == "account")
				{
					$table = "accounts";
					list($username, $password) = explode(";",$_GET['value']);
					$values = "'',".$_GET['tid'].",'".$username."','".$password."'";
				}
				else if($_GET['item'] == "mac")
				{
					$compid = mysql_query("select compid from ttc where tid = ".$_GET['tid']);
					$compid_row = mysql_fetch_array($compid);
					$table = "ethernet";
					$tableId = "eid";
					$type = "mac";
					$data = $address;
					list($address, $type, $form) = explode(";",$_GET['value']);
					$values = "'',".$_GET['tid'].",".$compid_row['compid'].",";
					$values .= ($form=="Internal")?1:0;
					$values .= ", ";
					$values .= ($type=="Wireless")?1:0;
					$values .= ", '".$address."'";
				}
				$newItem=mysql_query("insert into ".$table." values (".$values.")");
				if($_GET['item'] == "mac")
				{
					$newSearch = mysql_query("insert into search_index values ('','".$tableId."','".mysql_insert_id($newItem)."','".$table."','".$type."','".$data."')");
				}
				$xml.="\t<item>".$_GET['item']."</item>\r";
				$xml.="\t<itemnum>".$_GET['item_num']."</itemnum>\r";
				$xml.="\t<newitem>".mysql_insert_id()."</newitem>\r";
			}
			else
			{
				$xml.= "\t<true />\r";
				if($_GET['item'] == "cardEth" || $_GET['item'] == "cardWireless" || $_GET['item'] == "laptopCase" || $_GET['item'] == "laptopPower")
				{
					$table="ticket";
					$clause="tid=".$_GET['tid'];
					switch($_GET['item'])
					{
						case "cardEth":
							$values = "Ethernet=";
							$values .= ($_GET['value']=="yes")?1:0;
							break;
						case "cardWireless":
							$values = "Wireless=";
							$values .= ($_GET['value']=="yes")?1:0;
							break;
						case "laptopCase":
							$values = "laptopcase='";
							$values .= ($_GET['value']=="yes")?"yes":"NONE";
							$values .= "'";
							break;
						case "laptopPower":
							$values = "laptoppower=";
							$values .= ($_GET['value']=="yes")?1:0;
							break;
					}
				}
				else if(substr($_GET['item'],0,5) == "phone" || substr($_GET['item'],0,5) == "email")
				{
					$table = "contact";
					$clause = "cid='".substr($_GET['item'],6)."'";
					$clause_2 = "tableid = cid and tablenum = ";
					$data = $_GET['value'];
					switch(substr($_GET['item'],0,5))
					{
						case "phone":
							$values = "phone='".$_GET['value']."'";
							break;
						case "email":
							$values = "email='".$_GET['value']."'";
							break;
					}
				}
				else if($_GET['item'] == "account" || $_GET['item'] == "mac")
				{
					switch($_GET['item'])
					{
						case "account":
							$table = "accounts";
							$clause = "aid=".$_GET['item_num'];
							list($username, $password) = explode(";",$_GET['value']);
							$values = "username='".$username."', password='".$password."'";
							break;
						case "mac":
							$data = $adderss;
							$clause_2 = "tableid = eid and tableidnum = '".$_GET['item_num']."'";
							$table = "ethernet";
							$clause = "eid=".$_GET['item_num'];
							list($address, $type, $form) = explode(";",$_GET['value']);
							$values = "mac='".$address."', internal='";
							$values .= ($form=="Internal")?1:0;
							$values .= "', wireless='";
							$values .= ($type=="Wireless")?1:0;
							$values .= "'";
							break;
					}
				}
				else if($_GET['item'] == "serialnum")
				{
					$table = "computer";
					$compid_results = mysql_query("select compid from ttc where tid = '".$_GET['tid']."'");
if (mysql_errno()>0 || $debug)
{
	$mysql_error_bool=true;
	$mysql_out .= "\t<error>\r";
	$mysql_out .= "\t\t<query>"."select compid from ttc where tid = '".$_GET['tid']."'"."</query>\r";
	$mysql_out .= "\t\t<number>".mysql_errno()."</number>\r";
	$mysql_out .= "\t\t<text><![CDATA[".mysql_error()."]]></text>\r";
	$mysql_out .= "\t</error>\r";
}
					$compid_row = mysql_fetch_array($compid_results);
					$values = "serialnum = '".$_GET['value']."'";
					$clause = "compid = '".$compid_row["compid"]."'";
				}
				mysql_query("update ".$table." set ".$values." where ".$clause);
if (mysql_errno()>0 || $debug)
{
	$mysql_error_bool=true;
	$mysql_out .= "\t<error>\r";
	$mysql_out .= "\t\t<query>"."update ".$table." set ".$values." where ".$clause."</query>\r";
	$mysql_out .= "\t\t<number>".mysql_errno()."</number>\r";
	$mysql_out .= "\t\t<text><![CDATA[".mysql_error()."]]></text>\r";
	$mysql_out .= "\t</error>\r";
}
				if (substr($_GET['item'],0,5) == "phone" || substr($_GET['item'],0,5) == "email" || $_GET['item'] == "mac")
				{
					mysql_query("updae search_index set data = ".$_GET['value']." where ".$clause_2);
				}
			}
			break;
		case "delete":
			$xml.= "\t<true />\r";
			if($_GET['item']=="account")
			{
				$table = "accounts";
				$clause = "aid=".$_GET['row'];
			}
			else if($_GET['item']=="mac")
			{
				$table = "ethernet";
				$clause = "eid=".$_GET['row'];
			}
			mysql_query("delete from ".$table." where ".$clause,$connect);			
			break;
		case "addNote":
			$type=($_GET['type']=="techNote")?"Tech":"User";
			$xml .= create_note($type,urldecode($_GET['note']),$_COOKIE['TECHID'],$_GET['id'],$connect);
			break;
		case "moveNote":
			$xml.= "\t<true />\r";
			$type=($_GET['type']==techNote)?"Tech":"User";
			mysql_query("update notes set nType = '".$type."' where nid=".$_GET['nid']);
			break;
		case "changeLocation":
			$locname_query = mysql_query("select name from locations where locid = ".$_GET['locid']);
			$locname_row = mysql_fetch_array($locname_query);
			mysql_query("update ticket set locid = ".$_GET['locid']." where tid = ".$_GET['tid']);
			$note_text = $_COOKIE['TECHNAME']." changed the location to ".$locname_row['name'];
			$xml .= create_note("log",$note_text,0,0,$connect);
			break;
	}
	$mysql_out .= "</mysql>\r";
	if($mysql_error_bool)
	{
		$xml .= $mysql_out;
	}
	$xml.= "</data>\r";
	header('Content-Type: text/xml');
	echo $xml;
	mysql_close($connect);
?>