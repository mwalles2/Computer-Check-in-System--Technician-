<?php
	require_once("../class/Transaction.class");
	require_once("db.php");

	$xml ="<data>\r";

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$transaction = new Transact();

	$transaction->CreditCheck($_GET['nuid'],$_GET['npin'],$_GET['abount']);
	if($transaction_1 -> check)
	{
		$transaction->ChargeNcard($_GET['nuid'],$_GET['npin'],$_GET['abount']);
		$xml.="<true />\n";
	}
	else
	{
		$xml.="<error>" . $transaction_1 -> checkReason . "</error>";
	}

	$xml.= "</data>\r";
	header('Content-Type: text/xml');
	echo $xml;
	mysql_close($connect);
?>