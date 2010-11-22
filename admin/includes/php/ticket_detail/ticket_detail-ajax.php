<?php
	require_once("../../../../includes/php/db.php");
	require_once("../../../../includes/class/HtmlTemplate.class");
	require_once("../admin-general-ajax.php");

	$page = new HtmlTemplate("../../../../includes/inc/xml.inc");
	$page -> SetParameter("BASE", "data");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);
	$debug = false;
	$mysql_error_bool=false;
	$mysql_out = "<mysql>\r";
	switch($_GET['action'])
	{
		case "update":
			$feild = $_GET["feild"];
			switch($feild)
			{
				case "serialnum":
					$table = "computer";
					$compid_query = mysql_query("select computer.* from computer, ttc where ttc.compid = computer.compid and ttc.tid = " . $_GET["tid"]);
					$compid_result = mysql_fetch_array($compid_query);
					$compid = $compid_result["CompID"];
					$value = trim(strtoupper($_GET["value"]));
					break;
			}
			$query = "update " . $table . " set " . $feild . "='" . $_GET["value"] . "' where compid = " . $compid;
			$out = "\t<tab>" . $_GET["tab"] . "</tab>\n\t<feild>" . $feild . "</feild>\n\t<value>" . $value . "</value>\n";
			break;
	}

	mysql_query($query);

	$mysql_error_num = mysql_errno();

	if($mysql_error_num == 0)
	{
		$page -> AppendParameter("CONTENT", "\t<true />\n");
		$page -> AppendParameter("CONTENT", $out);
	}
	else
	{
		$page -> AppendParameter("CONTENT", "<false />\n");
		$page -> AppendParameter("CONTENT",	"\t<mysql>\n");
		$page -> AppendParameter("CONTENT",	"\t\t<errornum>".mysql_errno()."</errornum>\n");
		$page -> AppendParameter("CONTENT",	"\t\t<error>".mysql_error()."</error>\n");
		$page -> AppendParameter("CONTENT",	"\t\t<query>".$query."</query>\n");
		$page -> AppendParameter("CONTENT",	"\t</mysql>\n");
	}

	mysql_close($connect);
	header('Content-Type: text/xml');
	$page -> CreatePage();
?>