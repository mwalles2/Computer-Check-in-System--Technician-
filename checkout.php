<?php
	require_once("includes/class/HtmlTemplate.class");
	require_once("includes/php/db.php");
	require_once("admin/includes/php/admin-general-ajax.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	if($_POST['techid'] != "")
	{
		$tids = array();
		$p_tids = array();
		foreach($_POST as $post_key => $post_value)
		{
			if($post_key != "techid" && $post_key != "newcomputer" && $post_value != "")
			{
				$tids[] = "tid = '".$post_value."'";
				$p_tids[] = $post_value;
			}
		}
		if(count($tids) == 0)
		{
			$page = "form.php";
		}
		else
		{
			$where_clause = implode(" or ", $tids);
			$print_clause = "tid=".implode(",", $p_tids);
			$status_query = mysql_query("select status,tid,nuid from ticket where ".$where_clause);
			while($status_row = mysql_fetch_array($status_query))
			{
				if($status_row['status'] != "done")
				{
					$note_result = mysql_query("insert into notes (nType,note,techid) values ('User','This computer was checked out prior to completion.',0)");
					$nid = mysql_insert_id();
					$ntt_result = mysql_query("insert into ntt (nid, tid, nuid) values ('".$nid."','".$status_row['tid']."','".$status_row['nuid']."')");
				}
			}
			$post_query = mysql_query("update ticket set status='done', outdate = '".date("Y-m-d H:i:s")."', checkouttech='".$_POST['techid']."' where ".$where_clause);
			foreach($p_tids as $tid)
			{
				create_note_cmd("log","This ticket was checked out on ".date("Y-m-d H:i:s"),$_POST['techid'],$tid,$connect);
			}
			$page = "print_pdf.php?type=out&".$print_clause."&newcomputer=".$_POST['newcomputer'];
			//echo $page;
		}
	}
	else
	{
		$page = "entry.php";
	}

	mysql_close($connect);
	header("Location: ".$page);
?>