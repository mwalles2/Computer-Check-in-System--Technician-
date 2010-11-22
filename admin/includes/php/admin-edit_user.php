<?php
	header("Cache-Control: no-cache");
	require_once("../../../includes/class/HtmlTemplate.class");
	require_once("../../../includes/php/db.php");
	require_once("../../../includes/php/ldap_info.php");
	//require_once("../auth.php");

	$out = new HtmlTemplate("../../../includes/inc/xml.inc");
	$out -> SetParameter("BASE", "tech");

	$content = "";
	$mysql = "";

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$query = "update tech set status = '" . $_GET['status'] . "' where techid = " . $_GET['uid'];
	mysql_query($query);
	(mysql_errno() == 0)?$insert="true":$insert="false";

	$mysql .= "\t<mysql>\r";
	$mysql .= "\t\t<query>".$query."</query>\r";
	$mysql .= "\t\t<error>".mysql_error()."</error>\r";
	$mysql .= "\t</mysql>";

	$content .= "\t<uid>".$_GET['uid']."</uid>\r";
	$content .= "\t<insert>".$insert."</insert>\r";

	$out -> SetParameter("CONTENT", $content.$mysql);

	header('Content-Type: text/xml');
	$out -> CreatePage();
?>