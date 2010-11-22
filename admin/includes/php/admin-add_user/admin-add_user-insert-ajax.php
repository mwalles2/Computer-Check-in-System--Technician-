<?php
	header("Cache-Control: no-cache");
	require_once("../../../../includes/class/HtmlTemplate.class");
	require_once("../../../../includes/php/db.php");
	require_once("../../../../includes/php/ldap_info.php");
	//require_once("../auth.php");

	$out = new HtmlTemplate("../../../../includes/inc/xml.inc");
	$out -> SetParameter("BASE", "techs");

	$content = "";
	//$mysql = "\t<msyql>\r";
	$mysql = "";

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	//$out -> SetParameter("BASE", "search");

	$LDAP_link = ldap_connect($LDAP_server);
	if(ldap_bind($LDAP_link,$LDAP_dn,$LDAP_password))
	{
		$techs = explode(";", $_GET["uids"]);
		foreach($techs as $entry)
		{
			list($tech,$status) = explode(",", $entry);
			$tech = str_replace("_", "-", $tech);
			$search = ldap_search($LDAP_link,$LDAP_base_dn, "(uid=".$tech.")");
			$entries = ldap_get_entries ($LDAP_link, $search);

			$query="insert into tech values ('','".$tech."','".$entries[0]['unluncwid'][0]."','".$entries[0]['displayname'][0]."','".$status."')";
			mysql_query($query);
			(mysql_errno() == 0)?$insert="true":$insert="false";

			$content .= "\t<tech>\r";
			$content .= "\t\t<uid>".str_replace("-","_",$tech)."</uid>\r";
			$content .= "\t\t<insert>".$insert."</insert>\r";
			//$content .= "\t\t<mysql>".$query."</mysql>\r";
			$mysql .= "\t<query>".$query."</query>\r";
			//$content .= "\t\t<cn>".$entries[0]['cn'][0]."</cn>\r";
			//$content .= "\t\t<unluncwid>".$entries[0]['unlUNCWID'][0]."</unluncwid>\r";
			$content .= "\t</tech>\r";
		}
	}
	//$mysql .= "\t</msyql>\r";

	$out -> SetParameter("CONTENT", $content.$mysql);

	header('Content-Type: text/xml');
	$out -> CreatePage();
?>