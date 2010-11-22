<?php
	header('Content-Type: text/xml');
	echo implode("",file('http://localhost:8080/includes/php/ncard.php?nuid='.$_GET['nuid'].'&npin='.$_GET['npin'].'&amount='.$_GET['amount'].'&tid='.$_GET['tid']));
?>