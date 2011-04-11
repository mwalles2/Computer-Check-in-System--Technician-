<?php
	function start_admin_page($title)
	{
		global $CONFIG;
		$path = dirname(__FILE__);

		require_once("../includes/class/HtmlTemplate.class");
		require_once("../includes/php/db.php");
		require_once("../includes/php/general.php");
		require_once($path."/auth.php");

		$connect = mysql_connect($DB_server,$DB_user,$DB_password);
		mysql_select_db($DB_database, $connect);

		$tech_query = mysql_query ("select * from tech where techid = ".$_COOKIE["TECHID"]);
		$tech_row = mysql_fetch_array($tech_query);

		if(isset($_GET["template"]))
		{
			if($_GET["template"] == "new")
			{
				$page = new HtmlTemplate("includes/inc/admin-new.inc");
				$page -> SetParameter("TECH", $tech_row['name']);
				$page -> SetParameter("NAV", implode("", file("includes/inc/nav/main.inc")));
				$nav_links_admin = "";
				$nav_links_manage = "";
				switch($tech_row['status'])
				{
					case "all":
						$nav_links_admin = implode("", file("includes/inc/nav/admin.inc"));
					case "manage":
						$nav_links_manage = implode("", file("includes/inc/nav/manage.inc"));
				}
				$page -> AppendParameter("NAV", $nav_links_manage.$nav_links_admin);
			}
		}
		else
		{
			$page = new HtmlTemplate("includes/inc/admin.inc");
			$page -> SetParameter("TECH", $tech_row['name']);
			$page -> SetParameter("NAV", implode("", file("includes/inc/nav/main.inc")));
			$nav_links_admin = "";
			$nav_links_manage = "";
			switch($tech_row['status'])
			{
				case "all":
					$nav_links_admin = implode("", file("includes/inc/nav/admin.inc"));
				case "manage":
					$nav_links_manage = implode("", file("includes/inc/nav/manage.inc"));
			}
			$page -> AppendParameter("NAV", $nav_links_manage.$nav_links_admin);
		}

		$page -> SetParameter ("TITLE",$title);
		$page -> SetParameter("SCRIPTCODE",	"var protocol=\"".$CONFIG['site_protocol']."\";\r\t\tvar server=\"".$CONFIG['site_address']."\";");

		return array($page, $connect, $tech_row);
	}

	function end_admin_page($page,$connect)
	{
		mysql_close($connect);
		$page -> AppendParameter("BODYOPTIONS", "");
		$page -> CreatePage();
	}
?>