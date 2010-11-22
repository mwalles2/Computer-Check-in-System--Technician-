<?php
	global $CONFIG;
	$base_path = $_SERVER['DOCUMENT_ROOT'];
	require_once($base_path."/includes/php/db.php");
	require_once($base_path."/includes/php/general.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	setConfig($connect);

	$page = new HtmlTemplate("includes/inc/main/unl_s2.inc");
	$page -> SetParameter("WEBDEVHEADERS", implode('',file($base_path.'/ucomm/templatedependents/templatesharedcode/includes/browsersniffers/ie.html')));
	$page -> AppendParameter("WEBDEVHEADERS", implode('',file($base_path.'/ucomm/templatedependents/templatesharedcode/includes/comments/developersnote.html')));
	$page -> AppendParameter("WEBDEVHEADERS", implode('',file($base_path.'/ucomm/templatedependents/templatesharedcode/includes/metanfavico/metanfavico.html')));

	$navigation = new HtmlTemplate("includes/inc/main/navigation.inc");
	$navigation -> SetParameter("PROTOCOL",$CONFIG['site_protocol']);
	$navigation -> SetParameter("SERVER",$CONFIG['site_address']);

	$page -> SetParameter("NAVIGATION", $navigation->CreateHtml());
	$page -> SetParameter("HEADER", implode('',file($base_path.'/ucomm/templatedependents/templatesharedcode/includes/siteheader/siteheader_secure.shtml')));
	$page -> SetParameter("BADGE", implode('',file($base_path.'/ucomm/templatedependents/templatesharedcode/includes/badges/secure.html')));
	$page -> SetParameter("FOOTER", implode('',file('includes/inc/main/footer.inc')));
	$page -> SetParameter("SCRIPTCODE",	"var protocol=\"".$CONFIG['site_protocol']."\";\r\t\tvar server=\"".$CONFIG['site_address']."\";");
?>
