		function xmlInit()
		{
			log = document.getElementById("log");	//log.innerHTML+="xmlInit()<br>\n";

			person=req.responseXML.getElementsByTagName("person");
			existComps=req.responseXML.getElementsByTagName("computer");
			existPhone=req.responseXML.getElementsByTagName("telephoneNumber");
			existMail=req.responseXML.getElementsByTagName("mail");
			existCheckOut=req.responseXML.getElementsByTagName("checkout");

			initDropDown(comps,document.mainForm.computer);
			initDropDown(comps,document.check.computer);

			userName=document.getElementById("name");
			date=document.getElementById("date");
			nuid=document.getElementById("nuid");
			(getElementTextNS("", "formLength",person[0],0)=="s")?formLength="s":formLength="l";	//log.innerHTML+="-init done<br>\n";
			if (formLength=="l")
			{
				//out.innerHTML+="if<br>";
				probL=document.getElementById("probL");
				probL.className="row";
				document.mainForm.probTextL.value=defaultProblemText;
			}
			buildProbs("mainForm");
			buildProbs("check");

			document.outForm.date.value=date.innerHTML=buildDate();
//alert(getElementTextNS("", "unlUNCWID", person[0], 0));
			if(getElementTextNS("", "unlUNCWID", person[0], 0)=="n/a")
			{
				error("nuid");
				return false;
			}
			else if (getElementTextNS("", "unlUNCWID", person[0], 0)=="unknown")
			{
//alert ("unknown user");
				if(existCheckOut.length>0)
				{
					window.location=protocol+server+"/nonunl_checkout.php";
				}
				document.outForm.nuid.value=nuid.innerHTML="N/A";
				document.getElementById("nameAuto").style.display="none";
				document.getElementById("nameMan").style.display="inline";

				document.getElementById("otherDiv").style.display="inline";
				document.getElementById("studentRadio").style.display="none";
				document.getElementById("facultyRadio").style.display="none";
				document.getElementById("staffRadio").style.display="none";

				document.outForm.facstaffstu.value="other";
			}
			else
			{
				(getElementTextNS("", "ldapAvailable",person[0],0)=="true")?ldapAvailable=true:ldapAvailable=false;

				document.outForm.name.value=userName.innerHTML=getElementTextNS("", "displayName",person[0],0);	//log.innerHTML+="--displayName set<br>\n"; //log.innerHTML+="---"+document.outForm.name.value+"<br>\n";
				document.outForm.nuid.value=nuid.innerHTML=getElementTextNS("", "unlUNCWID",person[0],0);
				document.outForm.iso.value=getElementTextNS("", "unlidcardiso",person[0],0);	//log.innerHTML+="--unlUNCWID set<br>\n";	//log.innerHTML+="---"+document.outForm.nuid.value+"<br>\n";
				document.outForm.given.value=getElementTextNS("", "givenName",person[0],0);
				document.outForm.sur.value=getElementTextNS("", "sn",person[0],0);	//log.innerHTML+="--buildDate set<br>\n";	//log.innerHTML+="---"+document.outForm.date.value+"<br>\n";	//log.innerHTML+="--telephoneNumber set<br>\n";		//log.innerHTML+="---"+document.mainForm.phone.value+"<br>\n";	//log.innerHTML+="--eduPersonAffiliation set<br>\n"; //log.innerHTML+="---"+getElementTextNS("", "eduPersonAffiliation",person[0],0)+"<br>\n";	//			document.mainForm.email.value=(getElementTextNS("", "eduPersonAffiliation",person[0],0)=="student")?getElementTextNS("", "mail",person[0],0):getElementTextNS("", "eduPersonPrincipalName",person[0],0);	//log.innerHTML+="-set basic<br>\n";
				document.outForm.username.value=getElementTextNS("", "username",person[0],0);

				if(ldapAvailable)
				{
					if (getElementTextNS("", "eduPersonAffiliation",person[0],0)=="staff")
					{
						text=document.getElementById("staffText");
					}
					else if (getElementTextNS("", "eduPersonAffiliation",person[0],0)=="student")
					{
						text=document.getElementById("studentText");
					}
					else if (getElementTextNS("", "eduPersonAffiliation",person[0],0)=="faculty")
					{
						text=document.getElementById("facultyText");
					}
					text.innerHTML="X";
					student=document.getElementById("studentRadio");
					faculty=document.getElementById("facultyRadio");
					staff=document.getElementById("staffRadio");
					document.outForm.facstaffstu.value=getElementTextNS("", "eduPersonAffiliation",person[0],0);
				}
				else
				{
					student=document.getElementById("studentText");
					faculty=document.getElementById("facultyText");
					staff=document.getElementById("staffText");
				}

//log.innerHTML+="-set student/fac/staff<br>\n";

				student.style.display="none";
				faculty.style.display="none";
				staff.style.display="none";

				//out.innerHTML+="out";

				compsOut="";
				if(existComps.length>0)
				{
					(existComps.length>1)?computers=existComps.length+" comptuers":computers="computer";
					compsOut+="We have the following "+computers+" on record for you.<br>Please select the computer you are droping off today or select new.";
					for(i=0;i<existComps.length;i++)
					{
						compsOut+="<br><input type='radio' name='existComp' value='"+getElementTextNS("", "compid",existComps[i],0)+"-"+getElementTextNS("", "brand",existComps[i],0)+"-"+getElementTextNS("", "type",existComps[i],0)+"'>"+getElementTextNS("", "brand",existComps[i],0)+" ";
						compsOut+=getElementTextNS("", "type",existComps[i],0);
						compsOut+=" - Serial Number: "+getElementTextNS("", "serialnum",existComps[i],0);
					}
					compsOut+="<br><input type='radio' name='existComp' value='other' checked>New Computer";
					document.getElementById("existingCompList").innerHTML=compsOut;
					existingComputerBool=true;
				}

				if(existPhone.length>1)
				{
					phoneOut="We have the following phone numbers on record for you.<br>Please select the phone number that you would like us to contact you at";
					for(i=0;i<existPhone.length;i++)
					{
						phoneOut+="<br><input type='radio' name='existPhone' value='"+getElementTextNS("", "telephoneNumber",person[0],i)+"'";
						if(i==0)
						{
							phoneOut+=" checked";
						}
						phoneOut+=">"+getElementTextNS("", "telephoneNumber",person[0],i);
					}
					phoneOut+="<br><input type='radio' name='existPhone' value='other'>Other<input type='text' name='existPhoneOther'><br><input type='radio' name='existPhone' value='none'>None";
					document.getElementById("existingPhoneList").innerHTML=phoneOut;
					existingPhoneBool=true;
				}
				else if(existPhone.length==1)
				{
					document.mainForm.phone.value=getElementTextNS("", "telephoneNumber",person[0],0);
log.innerHTML+="- existPhone.length==1<br>";
log.innerHTML+="-- existPhone[0] = "+getElementTextNS("", "telephoneNumber",person[0],0)+"<br>";
				}
				else
				{
					document.mainForm.phone.value="";
				}

				if(existMail.length>1)
				{
					mailOut="We have the following email address on record for you.<br>Please select the email address that you would like us to contact you at";
					for(i=0;i<existMail.length;i++)
					{
						mailOut+="<br><input type='radio' name='existMail' value='"+getElementTextNS("", "mail",person[0],i)+"'";
						if(i==0)
						{
							mailOut+=" checked";
						}
						mailOut+=">"+getElementTextNS("", "mail",person[0],i);
					}
					mailOut+="<br><input type='radio' name='existMail' value='other'>Other<input type='text' name='existMailOther'><br><input type='radio' name='existMail' value='none'>None";
					document.getElementById("existingMailList").innerHTML=mailOut;
					existingMailBool=true;
log.innerHTML+="- existMail.length>1<br>";
				}
				else if(existMail.length==1)
				{
					document.mainForm.email.value=getElementTextNS("", "mail",person[0],0);
log.innerHTML+="- existMail.length==1<br>";
log.innerHTML+="-- existMail[0] = "+getElementTextNS("","mail",person[0],0);
				}
				else
				{
					document.mainForm.email.value="";	//log.innerHTML+="- existMail.length<1<br>";
				}

				if(existCheckOut.length>0)
				{
//alert(existCheckOut.length);
					existingCheckOut=true;
				}

				toggleExisting();
				//toggleFee("on");
			}
			cardSwipe=document.getElementById("cardSwipe");
			formTable=document.getElementById("formTable");
			cardSwipe.style.display="none";
			formTable.style.display="inline";
		}