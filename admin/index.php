<?php
	require_once("includes/php/admin-general.php");

	list($page, $connect, $tech_row) = start_admin_page("Main");

	$html = implode("",file("includes/html/main/main.html"));
	if($tech_row["status"] == "all")
	{
		$html .= implode("",file("includes/html/main/main-admin.html"));
	}
	$page -> SetParameter ("CONTENT",$html);
	
	end_admin_page($page, $connect)
?>