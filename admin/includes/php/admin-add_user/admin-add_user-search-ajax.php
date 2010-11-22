<?php
	header("Cache-Control: no-cache");
	require_once("../../../../includes/class/HtmlTemplate.class");
	require_once("../auth.php");

	$out = new HtmlTemplate("../../../../includes/inc/xml.inc");
	$out -> SetParameter("BASE", "search");
	$people = "";

	if ($_GET['field'] != "" && $_GET['string'] != "")
	{
		require_once("../../../../includes/php/db.php");
		require_once("../../../../includes/php/ldap_info.php");

		$connect = mysql_connect($DB_server,$DB_user,$DB_password);
		mysql_select_db($DB_database, $connect);

		$LDAP_link = ldap_connect($LDAP_server);
		if(ldap_bind($LDAP_link,$LDAP_dn,$LDAP_password))
		{
			switch($_GET['field'])
			{
				case "given":
					$filter = "(givenName=*".$_GET['string']."*)";
					break;
				case "sur":
					$filter = "(sn=*".$_GET['string']."*)";
					break;
				case "username":
					$filter = "(uid=*".$_GET['string']."*)";
					break;
				case "nuid":
					$filter = "(unlUNCWID=*".$_GET['string']."*)";
					break;
			}

			$search = ldap_search($LDAP_link,$LDAP_base_dn, $filter);
			$entries = ldap_get_entries ($LDAP_link, $search);

			for($i = 0; $i < $entries["count"]; $i++)
			{
				$is_tech_query = mysql_query("select * from tech where username = '".$entries[$i]["uid"][0]."'");
				if(mysql_num_rows($is_tech_query)<1)
				{
					$curent_tech = "false";
				}
				else
				{
					$is_tech_row = mysql_fetch_array($is_tech_query);
					$curent_tech = $is_tech_row['status'];
				}
				$people .= "\t<person>\r";
				$people .= "\t\t<cn>".$entries[$i]["cn"][0]."</cn>\r";
				$people .= "\t\t<unluncwid>".$entries[$i]["unluncwid"][0]."</unluncwid>\r";
				$people .= "\t\t<uid>".$entries[$i]["uid"][0]."</uid>\r";
				$people .= "\t\t<uidMod>".str_replace("-","_",$entries[$i]["uid"][0])."</uidMod>\r";
				$people .= "\t\t<currentTech>".$curent_tech."</currentTech>\r";
				$people .= "\t</person>\r";
				}
			ldap_unbind($LDAP_link);
			mysql_close($connect);
		}
	}

	if($people == "")
	{
		$people = "\t <false />";
	}
	$out -> SetParameter("CONTENT", $people);

	header('Content-Type: text/xml');
	$out -> CreatePage();
?>