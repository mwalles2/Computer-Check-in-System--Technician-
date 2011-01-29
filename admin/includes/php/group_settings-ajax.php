<?php
	header("Cache-Control: no-cache");
	require_once("../../../includes/class/HtmlTemplate.class");
	require_once("../../../includes/php/db.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$out = new HtmlTemplate("../../../includes/inc/xml.inc");
	$out->SetParameter("BASE","data");

	switch($_GET["action"])
	{
		case "create":
			$query = "insert into groupstatus (active, admin, checkin, checkout, view) values (1,0,0,0,0)";
			mysql_query($query);
			if(mysql_errno()==0)
			{
				$row_num = mysql_insert_id();
				$out->SetParameter("CONTENT","\t<result>true</result>\r");
				$out->AppendParameter("CONTENT","\t<oldid>" . $_GET["oldid"] . "</oldid>\r");
				$out->AppendParameter("CONTENT","\t<newid>" . $row_num . "</newid>");
			}
			else
			{
				$out->SetParameter("CONTENT","\t<result>false</result>");
			}
			break;
		default:
			switch($_GET["action"])
			{
				case "delete":
					$query = "deleted = 1";
					break;
				case "update":
					($_GET["item"]=="name")?$value = "\"" . mysql_escape_string($_GET["value"]) . "\"":$value = mysql_escape_string($_GET["value"]);
					$query = mysql_escape_string($_GET["item"]). " = " . $value;
					break;
			}
			mysql_query("update groupstatus set " . $query . " where gsid = " . mysql_escape_string($_GET["gsid"]));
			(mysql_errno()==0)?$out->SetParameter("CONTENT","\t<result>true</result>"):$out->SetParameter("CONTENT","\t<result>false</result>");
			break;
	}

	mysql_close($connect);;
	header('Content-Type: text/xml');

	$out->CreatePage();
?>