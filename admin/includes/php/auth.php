<?php
	global $TECH_STATUS;
	global $CONFIG;
	global $LOCATIONS;

	$path = $_SERVER['DOCUMENT_ROOT'];
	header("Cache-Control: no-cache");
	require_once($path."/includes/class/HtmlTemplate.class");
	require_once($path."/includes/php/db.php");
	require_once($path."/includes/php/ldap_info.php");
	require_once($path."/includes/php/general.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	setConfig($connect);
	setLocations($connect);

	function set_auth($techid,$action)
	{
		$path = dirname(__FILE__);

		global $TECH_STATUS;
		global $CONFIG;

		$tech_query = mysql_query("select * from tech where techid = \"".$techid."\"");
		$tech_row = mysql_fetch_array($tech_query);

		$TECH_STATUS = explode (":",$tech_row['status']);

		$cookie_hash = md5($tech_row['username'].$_SERVER['REMOTE_ADDR'].time().rand());

		setcookie("TECHID",$techid,time()+60*60,"/admin/");
		setcookie("TECHNAME",$tech_row['name'],time()+60*60,"/admin/");
		setcookie("TECHHASH",$cookie_hash,time()+60*60,"/admin/");
		if($action=="u")
		{
			$cookie_results_2 = mysql_query("update login set last = \"".date("Y-m-d H:i:s")."\", hash=\"".$cookie_hash."\" where techid = \"".$tech_row["techid"]."\" && ip = \"".$_SERVER['REMOTE_ADDR']."\" && hash = \"".$_COOKIE['TECHHASH']."\"");
		}
		else if($action=="n")
		{
			$cookie_results_2 = mysql_query("insert into login (ip,techid,hash,last) values(\"".$_SERVER['REMOTE_ADDR']."\",\"".$tech_row["techid"]."\",\"".$cookie_hash."\",\"".date("Y-m-d H:i:s")."\")");
		}
	}

	$no_auth = true;
	if(isset($_COOKIE['TECHID']) && isset($_COOKIE['TECHHASH']))
	{
		$cookie_results = mysql_query("select * from login where techid = \"".$_COOKIE['TECHID']."\" && hash = \"".$_COOKIE['TECHHASH']."\" && ip =\"".$_SERVER['REMOTE_ADDR']."\"");
		if(mysql_num_rows($cookie_results) > 0)
		{
			$cookie_row = mysql_fetch_array($cookie_results);
			if((strtotime($cookie_row['last'])+(60*60)) > time())
			{
				set_auth($_COOKIE['TECHID'],"u");
				$no_auth = false;
			}
		}
	}
	if(isset($_POST['username']) && isset($_POST['password']))
	{
		$tech_query = mysql_query("select * from tech where username = \"".$_POST['username']."\" and status != \"none\"");
		if(mysql_num_rows($tech_query) > 0)
		{
			$tech_row = mysql_fetch_array($tech_query);
			$LDAP_link = ldap_connect($LDAP_server);
			if(ldap_bind($LDAP_link,"uid=".$_POST['username'].",".$LDAP_ou.",".$LDAP_base_dn,$_POST['password']))
			{
				set_auth($tech_row['techid'],"n");
				if(strpos($_POST['uri'],"includes") === false)
				{
					header("Location: ".$CONFIG['site_protocol'].$CONFIG['site_address'].str_replace("*AMP*","&",$_POST['uri']));
					$no_auth =false;
					exit;
				}
				else
				{
					header('Content-Type: text/xml');
					$no_auth =false;
					$out = new HtmlTemplate($path."/../inc/login_xml.inc");
					$out -> SetParameter("CURRENT",1);
					$out -> SetParameter("URI", $CONFIG['site_protocol'].$CONFIG['site_address'].str_replace("*AMP*","&",$_POST['uri']));
					$out -> CreatePage();
				}
			}
		}
	}
	mysql_close($connect);

	if($no_auth)
	{
		$file_path = dirname(__FILE__);

		(isset($_POST['uri']))?$path=str_replace("*AMP*","&",$_POST['uri']):$path = $_SERVER["REQUEST_URI"];
		if(strpos($path,"includes") === false)
		{
			$out = new HtmlTemplate($file_path."/../inc/login_main.inc");
		}
		else
		{
			header('Content-Type: text/xml');
			$out = new HtmlTemplate($file_path."/../inc/login_xml.inc");
			$out -> SetParameter("CURRENT","0");
		}
		$out -> SetParameter("URI", $path);
		$out -> CreatePage();
		exit;
	}
?>