<?php
	function create_note($type,$note,$tech_id,$id,$connect)
	{
		$debug = false;
		$newItem=mysql_query("insert into notes (nType,note,techid) values ('".$type."','".mysql_real_escape_string($note)."',".$tech_id.")");

		if (mysql_errno()>0 || $debug)
		{
			$mysql_error_bool=true;
			$mysql_out .= "\t<error>\r";
			$mysql_out .= "\t\t<query>"."insert into notes (nType,note,techid) values ('".$type."','".mysql_real_escape_string($_GET['note'])."',".$_COOKIE['TECHID'].")"."</query>\r";
			$mysql_out .= "\t\t<number>".mysql_errno()."</number>\r";
			$mysql_out .= "\t\t<text><![CDATA[".mysql_error()."]]></text>\r";
			$mysql_out .= "\t</error>\r";
		}
		$new_num=mysql_insert_id();
		$nuid_query = mysql_query("select nuid from ticket where tid=".$_GET['tid'],$connect);

		$mysql_out .= "\t\t<query>"."select nuid from ticket where tid=".$_GET['tid']."</query>\r";
		if (mysql_errno()>0 || $debug)
		{
			$mysql_error_bool=true;
			$mysql_out .= "\t<error>\r";
			$mysql_out .= "\t\t<query>"."select nuid from ticket where tid=".$_GET['tid']."</query>\r";
			$mysql_out .= "\t\t<number>".mysql_errno()."</number>\r";
			$mysql_out .= "\t\t<text><![CDATA[".mysql_error()."]]></text>\r";
			$mysql_out .= "\t</error>\r";
		}

		$nuid_row = mysql_fetch_array($nuid_query);

		if (mysql_errno()>0 || $debug)
		{
			$mysql_error_bool=true;
			$mysql_out .= "\t<error>\r";
			$mysql_out .= "\t\t<query>"."fetch Array"."</query>\r";
			$mysql_out .= "\t\t<number>".mysql_errno()."</number>\r";
			$mysql_out .= "\t\t<text><![CDATA[".mysql_error()."]]></text>\r";
			$mysql_out .= "\t</error>\r";
		}

		$new_ntt=mysql_query("insert into ntt values ('','".$new_num."','".$_GET['tid']."','".$nuid_row['nuid']."')");

		if (mysql_errno()>0 || $debug)
		{
			$mysql_error_bool=true;
			$mysql_out .= "\t<error>\r";
			$mysql_out .= "\t\t<query>"."insert into ntt values ('','".$new_num."','".$_GET['tid']."',".$nuid_row['nuid'].")"."</query>\r";
			$mysql_out .= "\t\t<number>".mysql_errno()."</number>\r";
			$mysql_out .= "\t\t<text><![CDATA[".mysql_error()."]]></text>\r";
			$mysql_out .= "\t</error>\r";
		}

		$xml = "";
		$xml.="\t<type>".strtolower($type)."Note</type>\r";
		$xml.="\t<notenum>".$id."</notenum>\r";
		$xml.="\t<newnum>".$new_num."</newnum>\r";
		return $xml.$mysql_out;
	}

	function create_note_cmd($type,$note,$tech_id,$tid,$connect)
	{
		$newItem=mysql_query("insert into notes (nType,note,techid) values ('".$type."','".mysql_real_escape_string($note)."',".$tech_id.")");
		$new_num=mysql_insert_id();
		$nuid_query = mysql_query("select nuid from ticket where tid=".$tid,$connect);
		$nuid_row = mysql_fetch_array($nuid_query);
		$new_ntt=mysql_query("insert into ntt values ('','".$new_num."','".$tid."','".$nuid_row['nuid']."')");
		//return $xml.$mysql_out;
	}
?>