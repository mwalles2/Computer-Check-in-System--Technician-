<?php
	header("Cache-Control: no-cache");
	require_once("../includes/php/ldap_info.php");
	require_once("includes/php/admin-general.php");

	$out = "";
	$LDAP_link = ldap_connect($LDAP_server);
	if(ldap_bind($LDAP_link,$LDAP_dn,$LDAP_password))
	{
		$filter = "(&(givenName=micah)(sn=walles))";
		$search = ldap_search($LDAP_link,$LDAP_base_dn, $filter);
		$entries = ldap_get_entries ($LDAP_link, $search);
		for($i = 0; $i < $entries["count"]; $i++)
		{
			for ($j = 0; $j < $entries[$i]["count"]; $j++)
			{
				echo $entries[$i][$j];
				for ($k = 0; $k < $entries[$i][$entries[$i][$j]]["count"]; $k++)
				{
					echo "," . $entries[$i][$entries[$i][$j]][$k] . "\n";
				}
			}
			echo "\n";
		}
	}
?>