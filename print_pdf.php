<?php
	require_once("includes/class/pdf/fpdi.php");
	require_once("includes/php/db.php");
	require_once("includes/php/general.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	
	$print_row = "";

	class PDF extends FPDI
	{
		var $tid;
		var $type;

		function SetTid($tid)
		{
			$this->tid = $tid;
		}
		
		function SetType($type)
		{
			$this->type = $type;
		}
		
		function Footer()
		{
//echo "footer<br>";
			global $print_row;
			global $date;
			global $date_s;

//echo "error 1<br>";
			$this->SetY(-.8);
			$this->SetFont('Times','',12);
			$this->Cell((7.9),.20,$date_s.$this->tid,0,0,'C');
			//$this->Cell((7.9 * .34),.20,"20080131164423307",0,0,'C');

			$this->SetY(-.6);
			$this->SetFont('Times','',12);
//echo "error 2<br>";
			$this->Cell((7.9 * .33),.20,$print_row['Name'],0,0,'L'); //
			$this->SetFont('Free3of9Extended','',16);
//echo "error 3<br>";
			$this->Cell((7.9 * .34),.20,"*".$date_s.$this->tid."*",0,0,'C');
			//$this->Cell((7.9 * .34),.20,"20080131164423307",0,0,'C');
			$this->SetFont('Times','',12);
//			$this->ln();
//			$this->Cell((7.9 * .34),.20,$date_s.$this->tid,0,0,'C');
//echo "error 4<br>";
			$this->Cell((7.9 * .33),.20,$date,0,0,'R'); //
		}

		function NewPage()
		{
			global $print_row;
			global $date;

			$contact_results = mysql_query("select contact.type, contact.data from contact,contacttoticket where contacttoticket.tid=".$this->tid." and contacttoticket.cid = contact.cid");
			while($contacts_row = mysql_fetch_array($contact_results))
			{
				if($contacts_row['type']=="email")
				{
					$email = $contacts_row['data'];
				}
				if($contacts_row['type']=="phone")
				{
					$phone = $contacts_row['data'];
				}
			}

			$computer = $print_row["Brand"] . " ";
			$computer .= typeOut($print_row["Type"]);
			if($this->type=="new")
			{
				if($_GET['pages']!="")
				{
					$count = $_GET['pages'];
				}
				else
				{
					$count = 1;
				}
			}
			elseif($this->type == "out")
			{
				$count = 2;
			}

			for($i = 0; $i < $count; $i++)
			{
				$this->AddPage();
				if($this->type == "out")
				{
					$this->SetFont('Times','U',12);
					if($i==0)
					{
						$this->Cell(7.9,.2,"Customer Receipt",0,0,"C");
					}
					else
					{
						$this->Cell(7.9,.2,"Sales Receipt",0,0,"C");
					}
					$this->Ln(.3);
				}

				/* First Row */
				$this->SetFont('Times','B',12);
				$this->Cell(1.8,.2,"Name:");
				$this->SetFont('','',12);
				$this->Cell(2,.2,$print_row['Name'],"B",0,"C");
				$this->SetFont('','B',12);
				$this->Cell(.1,.2);
				if($this->type=="new")
				{
					$this->Cell(1.8,.2,"Date:");
				}
				elseif($this->type == "out")
				{
					$this->Cell(1.8,.2,"In Date:");
				}
				$this->SetFont('','',12);
				$this->Cell(2,.2,$date,"B",0,"C");
				$this->Ln(.3);
	
				/* Second Row */
				$this->SetFont('','B',12);
				$this->Cell(1.8,.2,"Phone:");
				$this->SetFont('','',12);
				$this->Cell(2,.2,$phone,"B",0,"C");
				$this->SetFont('','B',12);
				$this->Cell(.1,.2);
				if($this->type=="new")
				{
					$this->Cell(1.8,.2,"Email:");
					$this->SetFont('','',12);
					$this->Cell(2,.2,$email,"B",0,"C");
				}
				elseif($this->type == "out")
				{
					$this->Cell(1.8,.2,"Out Date:");
					$this->SetFont('','',12);
					$this->Cell(2,.2,$print_row["outdate"],"B",0,"C");
				}
				$this->Ln(.3);

				if($this->type=="new")
				{
					/* Third Row */
					$this->SetFont('','B',12);
					$this->Cell(1.8,.2,"NUID#:");
					$this->SetFont('','',12);
					$this->Cell(2,.2,$print_row["nuid"],"B",0,"C");
					$this->SetFont('','B',12);
					$this->Cell(.1,.2);
					$this->Cell(1.8,.2,"Status:");
					$this->SetFont('','',12);
					$this->Cell(2,.2,$print_row['status'],"B",0,"C");
					$this->Ln(.3);
				}

				/* Fourth Row */
				$this->SetFont('','B',12);
				$this->Cell(1.8,.2,"Computer:");
				$this->SetFont('','',12);
				$this->Cell(2,.2,$computer,"B",0,"C");
				$this->SetFont('','B',12);
				$this->Cell(.1,.2);
				$this->Cell(1.8,.2,"Serial #:");
				$this->SetFont('','',12);
				$this->Cell(2,.2,$print_row['serialnum'],"B",0,"C");
				$this->Ln(.3);

				if($this->type=="new")
				{
					/* Fifth Row */
					$this->SetFont('','B',12);
					$this->Cell(1.8,.2,"Laptop Power Supply:");
					$this->SetFont('','',12);
					$this->Cell(2,.2,($print_row["laptoppower"])?"yes":"NONE","B",0,"C");
					$this->SetFont('','B',12);
					$this->Cell(.1,.2);
					$this->Cell(1.8,.2,"Laptop Case:");
					$this->SetFont('','',12);
					$this->Cell(2,.2,$print_row['laptopcase'],"B",0,"C");
					$this->Ln(.3);
				}

				if($this->type=="new")
				{
					/* Sixth Row */
					$this->SetFont('','B',12);
					$this->Cell(1.8,.2,"External Ethernet Card:");
					$this->SetFont('','',12);
					$this->Cell(2,.2,($print_row["Ethernet"])?"yes":"no","B",0,"C");
					$this->SetFont('','B',12);
					$this->Cell(.1,.2);
					$this->Cell(1.8,.2,"External Wireless Card:");
					$this->SetFont('','',12);
					$this->Cell(2,.2,($print_row["wireless"])?"yes":"no","B",0,"C");
					$this->Ln(.6);

					/* CD info*/
					$this->SetFont('','B',12);
					$this->Cell(7.7,.2,"CDs left with the computer:","B");
					$this->Ln(.3);
					$this->SetFont('','',12);
					$this->Write(.2,$print_row["CDs"]);
					$this->Ln(.3);

					/* Accounts */
					$this->SetFont('','B',12);
					$this->Cell(3.95,.2,"Username:","B");
					$this->Cell(3.95,.2,"Password:","B");
					$this->Ln(.3);
					$accounts_results = mysql_query("select * from accounts where tid=".$this->tid);
					while($accounts_row = mysql_fetch_array($accounts_results))
					{
						$this->Cell(3.95,.2,$accounts_row['username']);
						$this->Cell(3.95,.2,$accounts_row['password']);
						$this->Ln(.3);
					}
				}

				/* Problems */
				$this->SetFont('','B',12);
				$this->Cell(7.7,.2,"Problems","B");
				$this->Ln(.3);
				$this->SetFont('','',12);
				$this->Write(.2,$print_row["problems"]);
				$this->Ln(.6);

				if($this->type=="out")
				{
					$this->SetFont('','B',12);
					$this->Cell(7.7,.2,"Actions","B");
					$this->SetFont('','',12);
					$this->Ln(.3);
					$this->Write(.2,"This computer has been checked out.");

					$notes_query = mysql_query("select notes.* from notes, ntt where ntt.tid = ".$this->tid." and ntt.nid=notes.nid and notes.nType = 'User'");
					while($notes_row = mysql_fetch_array($notes_query))
					{
						$this->Ln(.3);
						$this->Write(.2,html_entity_decode(str_replace("<br>","\r",stripslashes($notes_row['note']))));
					}
					$this->Ln(.6);

					$rates_query = mysql_query("select * from charges, rates where charges.tid= ".$this->tid." and charges.quantity > 0 and charges.chargetable='rates' and charges.tableid=rates.rid");
					$parts_query = mysql_query("select * from charges, parts where charges.tid= ".$this->tid." and charges.quantity > 0 and charges.chargetable='parts' and charges.tableid=parts.pid");
					$tax_query = mysql_query("select rates.*,ticket.taxable from ticket, rrs, rates where ticket.tid=".$this->tid." and ticket.rsid = rrs.rsid and rrs.rid = rates.rid and rates.title='tax'");

					if(mysql_num_rows($rates_query)>0 || mysql_num_rows($parts_query)>0)
					{
						$tax_row = mysql_fetch_array($tax_query);
						$tax=($tax_row['taxable']==1)?$tax_row['rate']:0;
						$bgBack = 255;
						$bgH = 204;
						$bgV = 187;
						$bgCross = 170;
						$subTotal = 0;

						$this->SetFont('','B',12);
						$this->Cell(7.7,.2,"Charges","B");
						$this->Ln(.3);
						$counter = 0;
						$this->SetX(.5);
						$this->SetFillColor($bgBack);
						$this->Cell(.8,.2,"Part #","B",0,"C",1);
						$this->SetFillColor($bgV);
						$this->Cell(4,.2,"Description","B",0,"C",1);
						$this->SetFillColor($bgBack);
						$this->Cell(.5,.2,"Qty","B",0,"C",1);
						$this->SetFillColor($bgV);
						$this->Cell(1,.2,"Price","B",0,"C",1);
						$this->SetFillColor($bgBack);
						$this->Cell(1,.2,"Total","B",0,"C",1);
						$this->Ln();
						$this->SetFont('','',12);
						while($rates_row = mysql_fetch_array($rates_query))
						{
							$this->SetX(.5);
							if($counter==0)
							{
								$thisRow = $bgBack;
								$thisAlt = $bgV;
								$counter++;
							}
							else
							{
								$thisRow = $bgH;
								$thisAlt = $bgCross;
								$counter=0;
							}
							$this->SetFont('','',12);
							$this->SetFillColor($thisRow);
							$this->Cell(.8,.2,"",0,0,"L",1);
							$this->SetFillColor($thisAlt);
							$this->Cell(4,.2,$rates_row['title'],0,0,"L",1);
							$this->SetFillColor($thisRow);
							$this->Cell(.5,.2,$rates_row['quantity'],0,0,"C",1);
							$this->SetFillColor($thisAlt);
							$this->Cell(1,.2,"$".number_format($rates_row['rate'],2),0,0,"R",1);
							$this->SetFont('','B',12);
							$this->SetFillColor($thisRow);
							$this->Cell(1,.2,"$".number_format($rates_row['rate']*$rates_row['quantity'],2),0,0,"R",1);
							$this->Ln();
							$subTotal+=$rates_row['rate']*$rates_row['quantity'];
						}
						while($parts_row = mysql_fetch_array($parts_query))
						{
							$this->SetX(.5);
							if($counter==0)
							{
								$thisRow = $bgBack;
								$thisAlt = $bgV;
								$counter++;
							}
							else
							{
								$thisRow = $bgH;
								$thisAlt = $bgCross;
								$counter=0;
							}
							$this->SetFont('','',12);
							$this->SetFillColor($thisRow);
							$this->Cell(.8,.2,$parts_row['partnum'],0,0,"L",1);
							$this->SetFillColor($thisAlt);
							$this->Cell(4,.2,$parts_row['description'],0,0,"L",1);
							$this->SetFillColor($thisRow);
							$this->Cell(.5,.2,$parts_row['quantity'],0,0,"C",1);
							$this->SetFillColor($thisAlt);
							$this->Cell(1,.2,"$".number_format($parts_row['price'],2),0,0,"R",1);
							$this->SetFont('','B',12);
							$this->SetFillColor($thisRow);
							$this->Cell(1,.2,"$".number_format($parts_row['price']*$parts_row['quantity'],2),0,0,"R",1);
							$this->Ln();
							$subTotal+=$parts_row['price']*$parts_row['quantity'];
						}
						$this->SetFillColor(255);
						$this->SetX(.5);
						$this->cell(6.3,.2,"Subtotal","T",0,R);
						$this->cell(1,.2,"$".number_format($subTotal,2),"T",0,R);
						$this->Ln();
						$this->SetX(.5);
						$this->cell(6.3,.2,"Tax",0,0,R);
						$this->cell(1,.2,"$".number_format($subTotal*$tax,2),0,0,R);
						$this->Ln();
						$this->SetX(.5);
						$this->cell(6.3,.2,"Total",0,0,R);
						$this->cell(1,.2,"$".number_format($subTotal+($tax*$subTotal),2),0,0,R);
					}
				}
			}
		}		
	} 

	$tids = explode(",",$_GET['tid']);
	foreach($tids as $tid)
	{
		$print_results = mysql_query("select ticket.CDs, ticket.problems, ticket.INDATE, ticket.Accounts, ticket.laptopcase, ticket.laptoppower, ticket.Ethernet, ticket.wireless, user.nuid, user.Name, user.status, computer.Brand, computer.Type, computer.serialnum, ticket.outdate from ticket,user,computer,ttc where ticket.tid=".$tid." and ticket.nuid=user.nuid and ticket.tid=ttc.tid and ttc.compid = computer.compid");
		$print_row = mysql_fetch_array($print_results);

		$date = substr($print_row["INDATE"],0,10);
		$date_s = str_replace(array("-"," ",":"),"",substr($print_row["INDATE"],0,16));

		$pdf = new PDF("P","in","Letter");
		$pdf->AddFont('Free3of9Extended','','3of9.php');
		$pdf->SetTid($tid);
		$pdf->SetType($_GET['type']);
		$pdf->SetMargins(.3,.3);
		$pdf->SetAutoPageBreak(false,.3);
		$base_pdf_path = $_SERVER["DOCUMENT_ROOT"]."/pdf/";
		$date_pdf_path = date("Y/m/",strtotime($print_row["INDATE"]));
		$type_path = $pdf->type."/";
		$pdf_name = ($pdf->type=="out")?"Ticket - ".$date_s.$tid." - out.pdf":"Ticket - ".$date_s.$tid.".pdf";
		$pdf->SetTitle("Ticket - ".$date_s.$tid);
		$pdf->NewPage();
	
		if($pdf->type=="new")
		{
			$pdf->AddPage();
			$pdf->setSourceFile($base_pdf_path.'static/'.'pricelist.pdf');
			$tplIdx = $pdf->importPage(1);
			$pdf->useTemplate($tplIdx,0,0);
			$first_print_options = "-o duplex=DuplexNoTumble ";
		}
		else
		{
			$first_print_options = "-o page-ranges=1 ";
		}

		$full_path = $base_pdf_path.$date_pdf_path.$type_path;

		if(!file_exists($full_path))
		{
			mkdir($full_path,0777,true);
		}

		$pdf->Output($full_path.$pdf_name,"F");
		system("lpr -P ischc_counter_unl_edu ".$first_print_options."'".$full_path.$pdf_name."'");
//echo "lpr -P ishd_counter_unl_edu ".$first_print_options."'".$base_pdf_path.$pdf_name."'<br>";
		if($pdf->type=="new")
		{
			system("lpr -P ischc_counter_unl_edu -o page-ranges=1 '".$full_path.$pdf_name."'");
//echo "lpr -P ishd_counter_unl_edu -o page-ranges=1 '".$base_pdf_path.$pdf_name."'";
		}
	}

	if($_GET['newcomputer']=="true")
	{
		$out_page = "form.php";
	}
	else
	{
		$out_page = "out_page.php?type=".$_GET['type'];
	}

	mysql_close($connect);
	header("Location: ".$out_page);
?>
