<?php
	global $CONFIG;
	$base_path = $_SERVER['DOCUMENT_ROOT'];
	require_once($base_path."/includes/php/db.php");
	require_once($base_path."/includes/php/general.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	setConfig($connect);

	$page = new HtmlTemplate($base_path."/includes/inc/main/unl_wdn_v3_main_secure.inc");
	$page -> SetParameter("WEBDEVHEADERS", implode('',file($base_path.'/wdn/templates_3.0/includes/browserspecifics.html')));
	$page -> AppendParameter("WEBDEVHEADERS", implode('',file($base_path.'/wdn/templates_3.0/includes/metanfavico.html')));

	$navigation = new HtmlTemplate($base_path."/includes/inc/main/unl_wdn_v3_navigation.inc");
	$navigation -> SetParameter("PROTOCOL",$CONFIG['site_protocol']);
	$navigation -> SetParameter("SERVER",$CONFIG['site_address']);

	$page -> SetParameter("NAVIGATION", $navigation->CreateHtml());
	$page -> SetParameter("NOSCRIPT", implode('',file($base_path.'/wdn/templates_3.0/includes/noscript.html')));
	$page -> SetParameter("FOOTER", implode('',file($base_path.'/includes/html/wdn_v3/footer.html')));
	$page -> SetParameter("WDNFOOTER", implode('',file($base_path.'/wdn/templates_3.0/includes/wdn.html')));

	$page -> SetParameter("DEPARTMENT", "Computer Help Center");
	$page -> SetParameter("PAGETITLE", "Check-in System");

	$page -> SetParameter("SCRIPTCODE",	"var protocol=\"".$CONFIG['site_protocol']."\";\r\t\tvar server=\"".$CONFIG['site_address']."\";");
?>
