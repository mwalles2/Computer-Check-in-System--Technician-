<?php
// /includes/php/save_comment.php
	require_once("db.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$result=mysql_query("insert into notes (ntype, note, techid) values('".$_GET["type"]."', '".$_GET["comment"]."', '1')");
	$nid=mysql_insert_id();

	$result=mysql_query("insert into ntt (nid, tid, nuid) values ('".$nid."','".$_GET["tid"]."','".$_GET["nuid"]."')");

	$result=mysql_query("select notes.nid, notes.nType, notes.note, notes.cDate, tech.name from notes, ntt, tech where ntt.tid='".$_GET["tid"]."' and ntt.nid=notes.nid and notes.techid=tech.techid order by notes.cDate",$connect);

	header('Content-Type: text/xml');
	$xml = "<?xml version=\"1.0\" encoding=\"UTF-8\""."?".">\n";
	$xml .= "<notes>";
	while( $row = mysql_fetch_array($result) )
	{
		$xml .= "\t<note>\n";
		$xml .= "\t\t<nid>".$row["nid"]."</nid>\n";
		$xml .= "\t\t<type>".$row["nType"]."</type>\n";
		$xml .= "\t\t<text>".$row["note"]."</text>\n";
		$xml .= "\t\t<date>".$row["cDate"]."</date>\n";
		$xml .= "\t\t<tech>".$row["name"]."</tech>\n";
		$xml .= "\t</note>\n";
	}
	$xml .= "</notes>\n";

	echo $xml;
?>