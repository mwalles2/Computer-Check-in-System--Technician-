#! /usr/bin/php
<?php
	//require_once("/usr/lib/php/cmdl-maw/error.php");

	//CMDL_log_error(__FILE__ . ": started");

	require_once(__DIR__ . "/../../includes/class/pdf/fpdf.php");
	require_once(__DIR__ . "/../../includes/php/db.php");
	require_once(__DIR__ . "/../../includes/php/general.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$update_wait_until = mysql_query("update ticket set untildate='0000-00-00' where untildate = '".date("Y-m-d")."'");

	class PDF extends FPDF
	{
		var $current_header;
		function Footer()
		{
			global $date_s;
			$this->SetY(-.6);
			$this->SetFont('Times','',12);
			$this->Cell(0,.20,'Stale Computer Report - '.date("Y-m-d H:i:s").' Page '.$this->PageNo().' of {nb}',0,0,'C');
		}

		function Header()
		{
			$this->SetFont('Times','B',12);
			$this->cell(7.9,.2,$this->current_header,"B");
			$this->Ln(.3);
		}

		function GenSection($section)
		{
			global $tickets;
			if(!isset($tickets[$section]))
			{
				return false;
			}
			switch ($section)
			{
				case "bnew":
					$this->current_header = "Brand New";
					break;
				case "new":
					$this->current_header = "New";
					break;
				case "work":
					$this->current_header = "Work in Progress";
					break;
				case "user":
					$this->current_header = "Waiting on User";
					break;
				case "tech":
					$this->current_header = "Waiting on Tech";
					break;
				case "part":
					$this->current_header = "Waiting on Part";
					break;
				case "price":
					$this->current_header = "Waiting on Quote";
					break;
				case "missing":
					$this->current_header = "Missing Users";
					break;
				case "repair":
					$this->current_header = "At Repair Center";
					break;
				case "done":
					$this->current_header = "Done";
					break;
				default:
					return false;
			}
			$this->AddPage();
			foreach($tickets[$section] as $key => $value)
			{
				(($key%2) == 0)?$this->SetFillColor(255):$this->SetFillColor(204);
				$this->cell(1.58,.2,$value["TICKETNUM"],0,0,"L",1);
				$this->cell(2,.2,$value["NAME"],0,0,"L",1);
				$this->cell(1.58,.2,$value["DATE"],0,0,"L",1);
				$this->cell(1.37,.2,$value["BRAND"],0,0,"L",1);
				$this->cell(1.37,.2,typeOut($value["TYPE"]),0,0,"L",1);
				$this->ln(.3);
			}
		}
	}


	$pages = false;
	$tickets = array();

	$brand_new_result = mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status from ticket, user, ttc, computer where ticket.untildate = '0000-00-00' and ticket.outdate = '0000-00-00' and ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.nuid=user.nuid and ticket.status = 'new' order by ticket.INDATE");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): brand new mysql_query");

	while($brand_new_row=mysql_fetch_array($brand_new_result,MYSQL_ASSOC))
	{
		$pages = true;
//		$tickets["bnew"] = array();
		$brand_new_notes_results = mysql_query("select * from notes, ntt where ntt.tid = ".$brand_new_row["tid"]." and ntt.nid = notes.nid");
		if(mysql_num_rows($brand_new_notes_results) < 2)
		{
			$ticketNum = str_replace(array("-"," ",":"),"",substr($brand_new_row["indate"],0,16)).$brand_new_row["tid"];
			$date = substr($brand_new_row["indate"],0,10);
			$type = typeOut($brand_new_row["type"]);
			$tickets["bnew"][] = array("TID"		=> $brand_new_row["tid"],
									   "TICKETNUM"	=> $ticketNum,
									   "NAME"		=> $brand_new_row["name"],
									   "DATE"		=> $date,
									   "BRAND"		=> $brand_new_row["brand"],
									   "TYPE"		=> $type);
		}
	}

	$result = mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, MAX(notes.cDate) as cDate from ticket, user, ttc, computer, notes, ntt where ticket.untildate = '0000-00-00' and notes.nid = ntt.nid and ntt.tid = ticket.tid and ticket.outdate = '0000-00-00' and ticket.status != 'repair' and notes.nType != 'system' and ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.nuid=user.nuid group by ticket.tid HAVING cDate < '".date("Y-m-d H:i:s",time() - (4 * 24 * 60 * 60))."' order by ticket.INDATE");
//	$result = mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, MAX(notes.cDate) as cDate from ticket, user, ttc, computer, notes, ntt where notes.nid = ntt.nid and ntt.tid = ticket.tid and ticket.outdate = '0000-00-00' and ticket.status = 'repair' and notes.nType = 'system' and ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.nuid=user.nuid group by ticket.tid HAVING cDate < '".date("Y-m-d H:i:s",time() - (8 * 24 * 60 * 60))."' order by ticket.INDATE");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): default mysql_query");

	while($row=mysql_fetch_array($result,MYSQL_ASSOC))
	{
		$pages = true;
		$ticketNum = str_replace(array("-"," ",":"),"",substr($row["indate"],0,16)).$row["tid"];
		$area = strtoupper(str_replace(" ","",$row["status"]));
		$date = substr($row["indate"],0,10);
		$type = typeOut($row["type"]);
		$tickets[$row["status"]][] = array("TID"		=> $row["tid"],
										   "TICKETNUM"	=> $ticketNum,
										   "NAME"		=> $row["name"],
										   "DATE"		=> $date,
										   "BRAND"		=> $row["brand"],
										   "TYPE"		=> $type);
	}

	$result = mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, MAX(notes.cDate) as cDate from ticket, user, ttc, computer, notes, ntt where ticket.untildate = '0000-00-00' and notes.nid = ntt.nid and ntt.tid = ticket.tid and ticket.outdate = '0000-00-00' and ticket.status = 'repair' and notes.nType != 'system' and ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.nuid=user.nuid group by ticket.tid HAVING cDate < '".date("Y-m-d H:i:s",time() - (8 * 24 * 60 * 60))."' order by ticket.INDATE");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): repair mysql_query");

	while($row=mysql_fetch_array($result,MYSQL_ASSOC))
	{
		$pages = true;
		$ticketNum = str_replace(array("-"," ",":"),"",substr($row["indate"],0,16)).$row["tid"];
		$date = substr($row["indate"],0,10);
		$type = typeOut($row["type"]);
		$tickets["repair"][] = array("TID"			=> $row["tid"],
								   	 "TICKETNUM"	=> $ticketNum,
								     "NAME"			=> $row["name"],
								   	 "DATE"			=> $date,
								   	 "BRAND"		=> $row["brand"],
								   	 "TYPE"			=> $type);
	}

	$result = mysql_query("select ticket.tid, user.name, ticket.indate from ticket, user, ttc where ticket.tid=ttc.tid and ttc.compid=0 and ticket.nuid=user.nuid order by ticket.INDATE");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): missing mysql_query");

	while($row=mysql_fetch_array($result,MYSQL_ASSOC))
	{
		$pages = true;
		$ticketNum = str_replace(array("-"," ",":"),"",substr($row["indate"],0,16)).$row["tid"];
		$date = substr($row["indate"],0,10);
		$tickets["missing"][] = array("TID"			=> $row["tid"],
								   	 "TICKETNUM"	=> $ticketNum,
								     "NAME"			=> $row["name"],
								   	 "DATE"			=> $date,
								   	 "BRAND"		=> "",
								   	 "TYPE"			=> "");
	}

	mysql_close($connect);
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): mysql_close");

	$out_file = __DIR__ . "/pdf/Stale Computer Report - ".date("Y-m-d H-i-s").".pdf";
	$pdf = new PDF("P","in","Letter");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): new PDF");
	$pdf->AliasNbPages();
	$pdf->SetMargins(.3,.3);
	$pdf->SetTitle("Stale Computer Report - ".date("Y-m-d H:i:s"));
//	$pdf->SetAutoPageBreak(true,.3);
	$pdf->GenSection("bnew");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): GenSection('bnew')");
	$pdf->GenSection("new");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): GenSection('new')");
	$pdf->GenSection("work");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): GenSection('work')");
	$pdf->GenSection("user");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): GenSection('user')");
	$pdf->GenSection("tech");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): GenSection('tech')");
	$pdf->GenSection("part");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): GenSection('part')");
	$pdf->GenSection("price");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): GenSection('price')");
	$pdf->GenSection("missing");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): GenSection('missing')");
	$pdf->GenSection("repair");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): GenSection('repair')");
	$pdf->GenSection("done");
	//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): GenSection('done')");
	if($pages)
	{
		$pdf->Output($out_file,"F");
		//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): pdf->Output");
		system("lpr -P ischc_counter_unl_edu -o duplex=DuplexNoTumble '".$out_file."'");
		//CMDL_log_error(__FILE__ . " (" . __LINE__ . "): print pdf");
	}
?>
