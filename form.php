<?php
	require_once("includes/class/HtmlTemplate.class");
	require_once("includes/php/web_dev_template_v3.php");
	require_once("includes/php/db.php");
	require_once("includes/php/form_arrays.php");
	
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	/* needed for Web Developer Network Template */
//	$page = init_web_dev_template();
	/* end need for Web Developer Network Template */
	$page -> SetParameter("TITLE", "Computer Help Center - Check-in");
	$page -> SetParameter("BODYOPTIONS", " onload=\"formInit()\"");
	$page -> SetParameter("CSSSRC", "includes/css/error.css");
	$page -> SetParameter("CSSSRC", "includes/css/main.css");

	$page -> SetParameter("SCRIPTSRC", "includes/js/xmlrequest.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/date.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/form.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/form-php.js");
	//$page -> SetParameter("SCRIPTSRC", "includes/js/form-arrays.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/validate.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/general.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/rfid-ldap.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/error.js");
//	$page -> SetParameter("SCRIPTCODE", "uid=".$_GET['uid'].";\n");
	$page -> SetParameter("SCRIPTCODE", "uid=".$_COOKIE['uid'].";\n");

//	$mysql_user_query = mysql_query("select * from user where uid = '".$_GET['uid']."'"); //the $_GET is for debuging, it will be replaced with $_COOKIE when it goes live
	$mysql_user_query = mysql_query("select * from user where uid = '".$_COOKIE['uid']."'"); //the $_GET is for debuging, it will be replaced with $_COOKIE when it goes live
	if(mysql_num_rows($mysql_user_query))
	{
		$mysql_user_row = mysql_fetch_array($mysql_user_query);
	}
	else
	{
		header ("Location:entry.php");
	}

	if(strpos($mysql_user_row['nuid'],"X") === 0)
	{
		$nuid = "N/A";
	}
	else
	{
		$nuid = $mysql_user_row['nuid'];
	}

	$brandselect = "";
	foreach($comps as $comp_value)
	{
		$brandselect .= "\t\t\t\t\t<option value=\"".$comp_value[1]."\">".$comp_value[0]."</option>\n";
	}

	$otherselect = "";
	$page -> SetParameter("SCRIPTCODE", "other = new Array();");
	foreach($other as $other_key => $other_value)
	{
		$otherselect .= "\t\t\t\t\t<option value=\"".$other_value[1]."\">".$other_value[0]."</option>\n";
		$page -> SetParameter("SCRIPTCODE", "other[".$other_key."]=new Array(\"".$other_value[1]."\",\"".$other_value[0]."\");");
	}

	$problemselect = "";
	$page -> SetParameter("SCRIPTCODE", "probs = new Array();");
	foreach($probs as $probs_key => $probs_value)
	{
		//$problemselect .= "\t\t\t\t\t<option value=\"".$probs_value[1]."\">".$probs_value[0]."</option>\n";
		$page -> SetParameter("SCRIPTCODE", "probs[".$probs_key."]=new Array(\"".$probs_value[0]."\",".$probs_value[1].");");
	}

	$main = new HtmlTemplate("includes/inc/form/form-main.inc");
	$main -> SetParameter("NAME", $mysql_user_row['Name']);
	$main -> SetParameter("DATE",  date("Y-m-d"));
	$main -> SetParameter("NUID",  $nuid);
	$main -> SetParameter("STATUS",  ucfirst($mysql_user_row['status']));

	$check = new HtmlTemplate("includes/inc/form/form-check.inc");
	$out = new HtmlTemplate("includes/inc/form/form-out.inc");
	$out -> SetParameter("UID", $_COOKIE["uid"]);
	$out -> SetParameter("DATE",  date("Y-m-d"));

	$page -> SetParameter("CONTENT", $main -> CreateHTML());
	$page -> AppendParameter("CONTENT", $check -> CreateHTML());
	$page -> AppendParameter("CONTENT", $out -> CreateHTML());
	$page -> SetParameter("BRANDSELECT", $brandselect);
	$page -> SetParameter("OTHERSELECT", $otherselect);
	$page -> SetParameter("PROBLEMSELECT", $problemselect);
	$page -> CreatePage();

	mysql_close($connect);
?>