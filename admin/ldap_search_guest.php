<?php
	header("Cache-Control: no-cache");
	require_once("../includes/php/ldap_info.php");
	require_once("includes/php/admin-general.php");

	list($page, $connect, $tech_row) = start_admin_page("LDAP Search");

	$out = "";
	if ($_POST['given'] || $_POST['sur'] || $_POST['username'] || $_POST['nuid'] || $_GET['username'])
	{
		require_once("../includes/php/db.php");
		require_once("../includes/php/ldap_info.php");

		$LDAP_link = ldap_connect($LDAP_server);
		if(ldap_bind($LDAP_link,$LDAP_dn,$LDAP_password))
		{
			$out = "<table style='clear:both;'>\n";
			$nuid = ($_POST['nuid'])?$_POST['nuid']:"*";
			$filter = "(&(givenName=Micah)(sn=Walles))";
			$filter = str_replace("**","*",$filter);
//			echo $filter;
			$search = ldap_search($LDAP_link,$LDAP_base_dn, $filter);
			$entries = ldap_get_entries ($LDAP_link, $search);
//			var_dump($entries);
			for($i = 0; $i < $entries["count"]; $i++)
			{
				for ($j = 0; $j < $entries[$i]["count"]; $j++)
				{
					$out .= "<tr><th rowspan='".$entries[$i][$entries[$i][$j]]["count"]."'>".$entries[$i][$j]."</th>";
					for ($k = 0; $k < $entries[$i][$entries[$i][$j]]["count"]; $k++)
					{
						$out .= "<td>".$entries[$i][$entries[$i][$j]][$k]."</td>";
						if($entries[$i][$entries[$i][$j]]["count"] > 1)
						{
							$out .= "</tr>\n";
						}
					}
					$out .= "</tr>\n";
				}
			}
		}
		$out .= "</table>";
	}
	$content = new HtmlTemplate("includes/inc/ldap_search.inc");
	$page -> SetParameter ("CONTENT",$content -> CreateHtml());
	if ($out != "")
	{
		$page -> AppendParameter ("CONTENT",$out);
	}
	end_admin_page($page, $connect);
?>