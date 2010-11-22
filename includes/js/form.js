		newForm=false;
		existingComputerBool=false;

		existingPhoneBool=false;
		existingPhoneIDArray=new Array();
		existingPhoneDataArray=new Array();

		existingMailBool=false;
		existingMailIDArray=new Array();
		existingMailDataArray=new Array();

		existingCheckOut=false;

		userpass=new Array();
		userpass[0]=new Array("","");

		defaultProblemText="Please describe the problem in detail and/or include any additional information here.";

		function addProb(form)
		{
			eval("dForm=document."+form);
			index=dForm.probs.selectedIndex;
			value=probs[dForm.probs.options[index].value][0];
			probs[dForm.probs.options[index].value][1]=false;
			buildProbs(form);
			buildOut(form);
		}

		function subProb(item,form)
		{
			eval("dForm=document."+form);
			probs[item][1]=true;
			buildProbs(form);
			buildOut(form);
			if(probs[item][0]=="Other")
			{
				probSD=document.getElementById("probS-"+form);
				probSD.style.display="hidden";
				dForm.probTextS.value="";
			}
		}

		function buildProbs(form)
		{
			eval("dForm=document."+form);
			list=document.getElementById("probs-"+form);
			for(i=list.length-1;i>0;i--)
			{
				list.remove(i);
			}
			dForm.probs.selectedIndex=0;
			for (i=0;i<probs.length;i++)
			{
				(probs[i][0]=="Other"&&formLength=="l"&&form=="mainForm")?oth=false:oth=true;
				if(probs[i][1] && oth)
				{
					newOpt=document.createElement("option");
					newOpt.text=probs[i][0];
					newOpt.value=i;
					try 
					{
						list.add(newOpt, null); // standards compliant; doesn't work in IE
					}
					catch(ex)
					{
						list.add(newOpt); // IE only
					}
				}
			}
			if(list.length==1)
			{
				list.disabled=true;
			}
			else
			{
				list.disabled=false;
			}
		}

		function buildOut(form)
		{
			value="";
			for(i=0;i<probs.length;i++)
			{
				if(!probs[i][1])
				{
					value+=probs[i][0]+"<input type='button' value='-' onClick=\"subProb("+i+",'"+form+"')\"><br>";
					if(probs[i][0]=="Other")
					{
						probSD=document.getElementById("probS-"+form);
						probSD.style.display="inline";
					}
				}
			}
			out=document.getElementById("out-"+form);
			out.innerHTML=value;
		}

		function buildUserPass(item,form)
		{
			eval("form1=document."+form);
			if (item=="none")
			{
				form1.none.disabled=true;
				out="You have selected that you do not have any password for this computer.  If you do have a password you wish left with the computer please press the \"+\" button.<input type=\"button\" value=\"+\" onClick=\"buildUserPass('','"+form+"')\">";
				userpass=new Array();
			}
			else
			{
				x=userpass.length;
				out="";

				if((item!="asIs"&&item!='')||item===0)
				{
					userpass.splice(item,1);
					x--;
				}
				else if(item!="asIs")
				{
					x++;
					userpass[userpass.length]=new Array("","");
				}

				for (i=0;i<x;i++)
				{
					out+="Username: <input type=\"text\" name=\"user"+i+"\" value=\""+userpass[i][0]+"\" onBlur=\"addUserPass(this)\">";
					(form=="check")?out+="<br>":out+="";
					out+="Password: <input type=\"text\" name=\"pass"+i+"\" value=\""+userpass[i][1]+"\" onBlur=\"addUserPass(this)\">";
					if(form=="mainForm")
					{
						out+="<input type=\"button\" value=\"-\" name=\"sub"+i+"\" onClick=\"buildUserPass("+i+",'"+form+"')\"";
						(userpass.length==1)?out+=" disabled":out+="";
						out+=">";
						if(i==x-1)
						{
							out+="<input type=\"button\" name=\"add\" value=\"+\" onClick=\"buildUserPass('','"+form+"')\">";
						}
						out+="<br>";
					}
				}
				form1.none.disabled=false;
			}
			userPass=document.getElementById(form+"-userpass");
			userPass.innerHTML=out;
			if(form=="check")
			{
				checkAccounts(2);
			}
		}

		function addUserPass(item)
		{
			name=item.name;
			value=item.value;
			id=name.substr(0,4);
			num=name.charAt(4);
			(id=="user")?i=0:i=1;
			userpass[num][i]=value;
		}

		function laptopSH(sh)
		{
			document.outForm.compid.value="NONE";
			if (sh=="s")
			{
				notsh="h";
			}
			else
			{
				notsh="s";
			}
			for(var i=0; i<document.mainForm.compType.length;i++)
			{
				if(document.mainForm.compType[i].checked)
				{
					var compType=document.mainForm.compType[i].value;
				}
			}
			if (compType!="laptop")
			{
				sh="h";
				notsh="h";
			}
			if (document.mainForm.computer[document.mainForm.computer.selectedIndex].value=="Macintosh" || document.mainForm.computer[document.mainForm.computer.selectedIndex].value=="Apple") /* */
			{
				laptopR3(sh);
				sh=notsh;
			}
			else
			{
				laptopR3(notsh);
			}
			laptopRows=document.getElementById("laptopRows");
			if (sh=="s")
			{
				laptopRows.style.display="inline";
			}
			else
			{
				laptopRows.style.display="none";
			}
		}

		function laptopR3(sh)
		{
			laptopRow3=document.getElementById("laptopR3");
			if (sh=="s")
			{
				laptopRow3.style.display="inline";
			}
			else
			{
				laptopRow3.style.display="none";
			}	
		}

		function otherSH(sh)
		{
			usernameAndPasswords = document.getElementById("usernameAndPasswords");
			otherHide = document.getElementById("otherHide");
			otherTypeMain = document.getElementById("otherTypeMain");
			otherTypeCheck = document.getElementById("otherTypeCheck");
			otherCDs = document.getElementById("otherCDs");
			if(sh=="h")
			{
				usernameAndPasswords.style.display="block";
				usernameAndPasswords.className="row";
				otherHide.style.display="block";
				otherCDs.style.display="inline";
				otherTypeMain.style.visibility="hidden";
				otherTypeCheck.style.visibility="hidden";
				if(userpass.length==0)
				{
					buildUserPass('','mainForm')
				}
			}
			else
			{
				usernameAndPasswords.style.display="none";
				otherHide.style.display="none";
				otherCDs.style.display="none";
				initDropDown(other,document.mainForm.otherType);
				initDropDown(other,document.check.otherType);
				otherTypeMain.style.visibility="visible";
				otherTypeCheck.style.visibility="visible";
				buildUserPass('none','mainForm')
			}
		}

		function cdSH(sh)
		{
			(formLength=="l")?cdD=document.getElementById("cdL"):cdD=document.getElementById("cdS");
			if (sh=="s")
			{
				cdD.className="row";
			}
			else
			{
				cdD.className="row hidden";
			}
		}

		function caseSH(sh,form)
		{
			caseD=document.getElementById("case-"+form);
			if (sh=="s")
			{
				caseD.style.display="inline";
			}
			else
			{
				caseD.style.display="none";
			}
		}

		function initDropDown (items,menu)
		{
			menu.options.length=0;
			for (i=0;i<items.length;i++)
			{
				menu.options[i]=new Option(items[i][0],items[i][1]);
			}
		}

		function checkContact(when)
		{
			document.check.action="javascript:checkContact(2)";
			contacterror=document.getElementById("contacterror");
			if (when==1)
			{
				if(document.outForm.phone.value=="NONE"&&document.mainForm.phone.value!=document.outForm.phone.value)
				{
					document.outForm.phone.value="";
				}

				if(document.outForm.email.value=="NONE"&&document.mainForm.email.value!=document.outForm.email.value)
				{
					document.outForm.email.value="";
				}

				if((document.outForm.phone.value=="NONE"||document.mainForm.phone.value=="NONE")&&(document.outForm.email.value=="NONE"||document.mainForm.email.value=="NONE"))
				{
					if((document.check.phoneNone.checked&&document.check.emailNone.checked)||(!document.check.phoneNone.checked&&!document.check.emailNone.checked))
					{
						document.check.phoneNone.checked=false;
						document.check.phoneNone.disabled=false;
						document.check.phone.disabled=false;
						document.check.emailNone.checked=false;
						document.check.emailNone.disabled=false;
						document.check.email.disabled=false;
						document.mainForm.phone.value="";
						document.mainForm.email.value="";
					}
					else if(document.check.phoneNone.checked)
					{
						document.check.phoneNone.checked=true;
						document.check.emailNone.disabled=true;
						document.check.phone.disabled=true;
						document.mainForm.email.value="";
					}
					else if(document.check.emailNone.checked)
					{
						document.check.emailNone.checked=true;
						document.check.phoneNone.disabled=true;
						document.check.email.disabled=true;
						document.mainForm.phone.value="";
					}
				}
				if(document.mainForm.phone.value=="NONE"||document.outForm.phone.value=="NONE")
				{
					document.check.phoneNone.checked=true;
					document.check.phone.disabled=true;
					document.check.emailNone.disabled=true;
				}
				else if(document.mainForm.email.value=="NONE"||document.outForm.email.value=="NONE")
				{
					document.check.emailNone.checked=true;
					document.check.email.disabled=true;
					document.check.phoneNone.disabled=true;
				}

				if (!validatePhoneAndEmail(document.mainForm.phone,"errorNVPhone",document.mainForm.email,"errorNVEmail"))
				{
					document.check.phone.value=document.mainForm.phone.value;
					document.check.email.value=document.mainForm.email.value;
					toggleShadow("on");
					contacterror.style.display="inline";
					return false;
				}
				else
				{
					if(!chosenExistingEmailBool)
					{
						if(!(chosenExistingEmail==document.mainForm.email.value&&chosenExistingEmail!=""))
						{
							document.outForm.email.value=document.mainForm.email.value;
						}
					}

					if(!chosenExistingPhoneBool)
					{
						if(!(chosenExistingPhone==document.mainForm.phone.value&&chosenExistingPhone!=""))
						{
							document.outForm.phone.value=document.mainForm.phone.value;
						}
					}

					if(document.outForm.username.value=="")
					{
						document.outForm.username.value=document.mainForm.email.value;
					}
					return true;
				}
			}
			else
			{
				(document.check.phoneNone.checked)?document.mainForm.phone.value="NONE":document.mainForm.phone.value=document.check.phone.value;
				(document.check.emailNone.checked)?document.mainForm.email.value="NONE":document.mainForm.email.value=document.check.email.value;
				toggleShadow("off");
				contacterror.style.display="none";
				setTimeout("formCheck()",70);
			}
		}

		function checkFacStaffStu(when)
		{
			if(!newForm)
			{
				document.check.action="javascript:checkFacStaffStu(2)";
				facstaffstuerror=document.getElementById("facstaffstuerror");
				if(when==1)
				{
					if(document.outForm.facstaffstu.value=="")
					{
						toggleShadow("on");
						facstaffstuerror.style.display="inline";
						return false;
					}
					else
					{
						return true;
					}
				}
				else
				{
					toggleShadow("off");
					(document.check.facstaffstu[0].checked)?document.mainForm.facstaffstu[0].checked=true:document.mainForm.facstaffstu[0].checked=false;
					(document.check.facstaffstu[1].checked)?document.mainForm.facstaffstu[1].checked=true:document.mainForm.facstaffstu[1].checked=false;
					(document.check.facstaffstu[2].checked)?document.mainForm.facstaffstu[2].checked=true:document.mainForm.facstaffstu[2].checked=false;
					facstaffstuerror.style.display="none";
					setTimeout("formCheck()",70);
				}
			}
			else
			{
				return true;
			}
		}

		function checkCards()
		{
			if(document.mainForm.ethernet[0].checked)
			{
				document.outForm.ethernet.value="yes";
			}
			else
			{
				document.outForm.ethernet.value="no";
			}
			if(document.mainForm.wireless[0].checked)
			{
				document.outForm.wireless.value="yes";
			}
			else
			{
				document.outForm.wireless.value="no";
			}
			return true;
		}

		function checkComp(when)
		{
			document.check.action="javascript:checkComp(2)";
			computerError=document.getElementById ("computererror");
			if(when==1)
			{
				if(document.mainForm.computer.selectedIndex!=0&&(document.mainForm.compType[0].checked||document.mainForm.compType[1].checked||(document.mainForm.compType[2].checked&&document.mainForm.otherType.selectedIndex!=0)))
				{
					document.outForm.computer.value=document.mainForm.computer[document.mainForm.computer.selectedIndex].value;
					if(document.mainForm.compType[0].checked)
					{
						document.outForm.compType.value=document.mainForm.compType[0].value;
					}
					else if(document.mainForm.compType[1].checked)
					{
						document.outForm.compType.value=document.mainForm.compType[1].value;
					}
					else if(document.mainForm.compType[2].checked)
					{
						document.outForm.compType.value=document.mainForm.otherType[document.mainForm.otherType.selectedIndex].value;
					}
					return true;
				}
				else
				{
					document.check.computer.selectedIndex=document.mainForm.computer.selectedIndex;
					document.check.compType[0].checked=document.mainForm.compType[0].checked;
					document.check.compType[1].checked=document.mainForm.compType[1].checked;
					document.check.compType[2].checked=document.mainForm.compType[2].checked;
					if(document.mainForm.compType[2].checked)
					{
						document.check.otherType.selectedIndex=document.mainForm.otherType.selectedIndex;
					}
					if(document.check.compType[1].checked)
					{	
						laptopSH("s");
					}
					toggleShadow("on");
					computerError.style.display="inline";
					return false;
				}
			}
			else
			{
				document.mainForm.computer.selectedIndex=document.check.computer.selectedIndex;
				document.mainForm.compType[0].checked=document.check.compType[0].checked;
				document.mainForm.compType[1].checked=document.check.compType[1].checked;
				document.mainForm.compType[2].checked=document.check.compType[2].checked;
				if(document.mainForm.compType[2].checked)
				{
					document.mainForm.otherType.selectedIndex=document.check.otherType.selectedIndex;
				}
				toggleShadow("off");
				computerError.style.display="none";
				setTimeout("formCheck()",70);
			}
		}

		function checkLaptop(when)
		{
			document.check.action="javascript:checkLaptop(2)";
			laptopError=document.getElementById("laptoperror");
			if(when==1)
			{
				if(document.outForm.compType.value!="laptop" || document.mainForm.computer[document.mainForm.computer.selectedIndex].value=="Macintosh" || document.mainForm.computer[document.mainForm.computer.selectedIndex].value=="Apple")
				{
					document.outForm.powersupply.value="NONE";
					document.outForm.caseText.value="NONE";
					return true;
				}
				if(((document.mainForm.caseRadio[0].checked&&document.mainForm.caseText.value!="")||document.mainForm.caseRadio[1].checked)&&(document.mainForm.powersupply[0].checked||document.mainForm.powersupply[1].checked))
				{
					if(document.mainForm.caseRadio[0].checked)
					{
						document.outForm.caseText.value=document.mainForm.caseText.value;
					}
					else
					{
						document.outForm.caseText.value="NONE";
					}
					if(document.mainForm.powersupply[0].checked)
					{
						document.outForm.powersupply.value=document.mainForm.powersupply[0].value;
					}
					else
					{
						document.outForm.powersupply.value=document.mainForm.powersupply[1].value;
					}
					return true;
				}
				else
				{
					document.check.caseRadio[0].checked=document.mainForm.caseRadio[0].checked;
					document.check.caseRadio[1].checked=document.mainForm.caseRadio[1].checked;
					(document.check.caseRadio[0].checked)?document.getElementById("case-check").style.display="inline":document.getElementById("case-check").style.display="none";
					document.check.caseText=document.mainForm.caseText
					document.check.powersupply[0].checked=document.mainForm.powersupply[0].checked
					document.check.powersupply[1].checked=document.mainForm.powersupply[1].checked
					toggleShadow("on");
					laptopError.style.display="inline";
					return false;
				}
			}
			else
			{
				if(document.check.powersupply[0].checked)
				{
					document.mainForm.powersupply[0].checked=true;
					document.mainForm.powersupply[1].checked=false;
				}
				else if (document.check.powersupply[1].checked)
				{
					document.mainForm.powersupply[0].checked=false;
					document.mainForm.powersupply[1].checked=true;
				}
				if(document.check.caseRadio[0].checked)
				{					
					document.mainForm.caseRadio[0].checked=true;
					document.mainForm.caseRadio[1].checked=false;
					document.mainForm.caseText.value=document.check.caseText.value;
				}
				else if(document.check.caseRadio[1].checked)
				{
					document.mainForm.caseRadio[0].checked=false;
					document.mainForm.caseRadio[1].checked=true;
					document.mainForm.caseText.value="";
				}
				toggleShadow("off");
				laptopError.style.display="none";
				setTimeout("formCheck()",70);
			}
		}

		function checkCDs(when)
		{
			document.check.action="javascript:checkCDs(2)";
			cdError=document.getElementById("cderror");

			if (when==1)
			{
				if(document.mainForm.cds[0].checked && formLength=="l")
				{
					if(document.mainForm.cdText.value=="")
					{
						toggleShadow("on");
						cdError.style.display="inline";
						return false;
					}
					else
					{
						document.outForm.cds.value=document.mainForm.cdText.value;
						return true;
					}
				}
				else if(document.mainForm.cds[0].checked && formLength=="s")
				{
					document.outForm.cds.value="yes"
					return true;
				}
				else
				{
					document.outForm.cds.value="NONE"
					return true;
				}
			}
			else
			{
				document.mainForm.cdText.value=document.check.cdText.value;
				toggleShadow("off");
				cdError.style.display="none";
				setTimeout("formCheck()",70);
			}
		}

		function checkAccounts(when)
		{
			document.check.action="javascript:checkAccounts(2)";
			accountError=document.getElementById("accounterror");

			if (when==1)
			{
				userpassbool=true;
				for(n=0; n<userpass.length;n++)
				{
					if(userpass[n][0]!=""&&userpass[n][1]!="")
					{
						userpassbool=false;
						break;
					}
				}

				if (userpassbool&&!document.mainForm.none.disabled)
				{
					toggleShadow("on");
					accountError.style.display="inline";
					return false;
				}
				else
				{
					out="";
					if(document.mainForm.none.disabled)
					{
					out="NONE";
					}
					else
					{
						for(i=0;i<userpass.length;i++)
						{
							out+=userpass[i][0]+","+userpass[i][1];
							if(i<(userpass.length-1))
							{
								out+=";";
							}
						}
					}
					document.outForm.accounts.value=out;
					return true;
				}
			}
			else
			{
				more=false;
				if(document.check.none.disabled)
				{
					buildUserPass("none","mainForm");
				}
				else if(checkAccounts.arguments[1]=="more")
				{
					buildUserPass("","mainForm");
					more=true;
				}
				else
				{
					addUserPass(document.check.user0);
					addUserPass(document.check.pass0);
					buildUserPass("asIs","mainForm");
				}

				toggleShadow("off");
				accountError.style.display="none";
				(!more)?setTimeout("formCheck()",70):more=false;
			}
		}

		function checkProbs(when)
		{
			document.check.action="javascript:checkProbs(2)";
			problemError=document.getElementById("problemerror");
			log=document.getElementById("log");
			if(when==1)
			{
				noProbs=true;
				noShortText=false;
				noLongText=true;
				for(i=0;i<probs.length;i++)
				{
					log.innerHTML+="prob["+i+"][1]="+probs[i][1]+"<br>noProbs="+noProbs+"<br>";
					if(!probs[i][1])
					{
						noProbs=false;
						if(probs[i][0]=="Other"&&document.mainForm.probTextS.value=="")
						{
							noShortText=true;
						}
					}
				}

				if(formLength=="l"&&(document.mainForm.probTextL.value!=""&&document.mainForm.probTextL.value!=defaultProblemText))
				{
					noLongText=false;
				}
				if((noProbs&&noLongText)||noShortText)
				{
					buildProbs("check");
					buildOut("check");
					toggleShadow("on");
					problemError.style.display="inline";
					return false;
				}
				else
				{
					out="";
					j=0;
					for(i=0;i<probs.length;i++)
					{
						if(!probs[i][1]&&probs[i][0]!="Other")
						{
							if(j>0)
							{
								out+=";;";
							}
							j++;
							out+=probs[i][0];
						}
					}
					if(j>0&&(document.mainForm.probTextS.value!=""||(document.mainForm.probTextL.value!=""&&document.mainForm.probTextL.value!=defaultProblemText)))
					{
						out+=";;";
					}
					if(document.mainForm.probTextS.value!="")
					{
						out+=document.mainForm.probTextS.value;
					}
					else if(document.mainForm.probTextL.value!=""&&document.mainForm.probTextL.value!=defaultProblemText)
					{
						out+=document.mainForm.probTextL.value;
					}
					document.outForm.prob.value=out;
					return true;
				}
			}
			else
			{
				if(document.check.probTextS.value!="")
				{
					if(formLength=="l")
					{
						document.mainForm.probTextL.value=document.check.probTextS.value;
						document.check.probTextS.value="";
						for(i=0;i<probs.length;i++)
						{
							log.innerHTML+="*-probs["+i+"][0]="+probs[i][0]+"<br>";
							if(probs[i][0]=="Other")
							{
								log.innerHTML+="*--if<br>";
								probs[i][1]=true;
							}
						}
					}
					else
					{
						document.mainForm.probTextS.value=document.check.probTextS.value;
					}
				}
				toggleShadow("off");
				problemError.style.display="none";
				buildProbs("mainForm");
				buildOut("mainForm");
				setTimeout("formCheck()",70);
			}
		}

		function checkUserName(when)
		{
			document.check.action="javascript:checkUserName(2)";
			nameError=document.getElementById("nameError");

			log=document.getElementById("log");
			if(when==1)
			{
				if(document.mainForm.given.value=="" || document.mainForm.sur.value=="")
				{
					document.check.given.value=document.mainForm.given.value;
					document.check.sur.value=document.mainForm.sur.value;
					toggleShadow("on");
					nameError.style.display="inline";
					return false;
				}
				else
				{
					document.outForm.given.value=document.mainForm.given.value;
					document.outForm.sur.value=document.mainForm.sur.value;
					document.outForm.name.value=document.mainForm.given.value+" "+document.mainForm.sur.value;
					return true;
				}
			}
			else
			{
				document.mainForm.given.value=document.check.given.value;
				document.mainForm.sur.value=document.check.sur.value;
				toggleShadow("off");
				nameError.style.display="none";
				setTimeout("formCheck()",70);
			}
		}

		function updateComps()
		{
			for(i=0;i<document.check.existComp.length;i++)
			{
				if (document.check.existComp[i].checked)
				{
					checked=document.check.existComp[i].value;
				}
			}
			if(checked!="other")
			{
				items=checked.split("-");
				for(i=0;i<document.mainForm.computer.length;i++)
				{
					if(document.mainForm.computer[i].value==items[1])
					{
						document.mainForm.computer.selectedIndex=i;
					}
				}

				if(items[2]=="Desktop")
				{
					document.mainForm.compType[0].checked=true;
				}
				else if(items[2]=="Laptop")
				{
					document.mainForm.compType[1].checked=true;
					laptopSH('s');
				}
				document.outForm.compid.value=items[0];
			}
			else
			{
				document.outForm.compid.value="NONE";
			}
			toggleExistingComps("off");
		}

		function updatePhone()
		{
			existingPhoneBool=false;
			for(i=0;i<document.check.existPhone.length;i++)
			{
				if (document.check.existPhone[i].checked)
				{
					checked=document.check.existPhone[i].value;
				}
			}
			if(checked!="other" && checked!="none")
			{
				document.outForm.phone.value="cid:"+existingPhoneIDArray[checked];
				chosenExistingPhone=existingPhoneDataArray[checked];
				chosenExistingPhoneBool=true;
				document.mainForm.phone.value=existingPhoneDataArray[checked];
				existingPhoneBool=true;
			}
			else if(checked=="other")
			{
				document.mainForm.phone.value=document.check.existPhoneOther.value;
			}
			else
			{
				document.outForm.phone.value="NONE";
			}
			toggleExistingPhone("off");
		}

		function updateMail()
		{
			existingMailBool=false;
			for(i=0;i<document.check.existMail.length;i++)
			{
				if (document.check.existMail[i].checked)
				{
					checked=document.check.existMail[i].value;
				}
			}

			if(checked!="other" && checked!="none")
			{
				document.outForm.email.value="cid:"+existingMailIDArray[checked];
				chosenExistingEmail=existingMailDataArray[checked];
				chosenExistingEmailBool=true;
				document.mainForm.email.value=existingMailDataArray[checked];
				existingMailBool=true;
 			}
			else if(checked=="other")
			{
				document.mainForm.email.value=document.check.existMailOther.value;
			}
			else
			{
				document.outForm.email.value="NONE";
			}
			toggleExistingMail("off");
		}

		function formCheck()
		{
			log=document.getElementById("log");
			if (checkContact(1))
			{
				log.innerHTML+="passed checkContact<br>";
				if(checkFacStaffStu(1))
				{
					log.innerHTML+="passed checkFacStaffStu<br>";
					if(checkComp(1))
					{
						log.innerHTML+="passed checkComp<br>";
						if(checkLaptop(1))
						{
							log.innerHTML+="passed checkLaptop<br>";
							if (checkCards())
							{
								log.innerHTML+="passed checkCards<br>";
								if(checkCDs(1))
								{
									log.innerHTML+="passed checkCDs<br>";
									if(checkAccounts(1))
									{
										log.innerHTML+="passed checkAccounts<br>";
										if(checkProbs(1))
										{
											log.innerHTML+="passed checkProbs<br>";
											if(checkStreeAddress(1))
											{
												log.innerHTML+="passed checkStreeAddress<br>";
												toggleBackup("on");
											}
											else
											{
											}
										}
										else
										{
											log.innerHTML+="failed checkProbs<br>";
										}
									}
									else
									{
										log.innerHTML+="failed checkAccounts<br>";
									}
								}
								else
								{
									log.innerHTML+="failed checkCDs<br>";
								}
							}
							else
							{
								log.innerHTML+="failed checkCards<br>";
							}
						}
						else
						{
							log.innerHTML+="failed checkLaptop<br>";
						}
					}
					else
					{
						log.innerHTML+="failed checkComp<br>";
					}
				}
				else
				{
					log.innerHTML+="failed checkFacStaffStu<br>";
				}
			}
			else
			{
				log.innerHTML+="failed checkContact<br>";
			}
		}

		function toggleBackup(toggle)
		{
			log=document.getElementById("log");
			backupDiv=document.getElementById("backup");
			toggleShadow(toggle);
			(toggle=="on")?backupDiv.style.display="inline":backupDiv.style.display="none";
		} 

		function toggleCheck(toggle)
		{
			log=document.getElementById("log");
			log.innerHTML+=document.getElementById("outFormSubmit").onclick+"<br>";
			confirm=document.getElementById("confirm");
			toggleShadow(toggle);
			(toggle=="on")?confirm.style.display="inline":confirm.style.display="none";
		}

		function toggleExistingComps(toggle)
		{
			document.check.action="javascript:updateComps()";
			existingComp=document.getElementById("existingComp");
			toggleShadow(toggle);
			(toggle=="on")?existingComp.style.display="inline":existingComp.style.display="none";
			if (toggle=="off")
			{
				existingComputerBool=false;
				toggleExisting()
			}
		}

		function toggleExistingPhone(toggle)
		{
			document.check.action="javascript:updatePhone()";
			existingPhone=document.getElementById("existingPhone");
			toggleShadow(toggle);
			(toggle=="on")?existingPhone.style.display="inline":existingPhone.style.display="none";
			if (toggle=="off")
			{
				existingPhoneBool=false;
				toggleExisting()
			}
		}

		function toggleExistingMail(toggle)
		{
			document.check.action="javascript:updateMail()";
			existingMail=document.getElementById("existingMail");
			toggleShadow(toggle);
			(toggle=="on")?existingMail.style.display="inline":existingMail.style.display="none";
		}

		function toggleFee(toggle)
		{
			feeDiv=document.getElementById("feeAgreement");
			toggleShadow(toggle);
			(toggle=="on")?feeDiv.style.display="inline":feeDiv.style.display="none";
		}

		function toggleExisting()
		{
			if(existingCheckOut)
			{
				toggleCheckOut("on");
				return;
			}
			if(existingComputerBool)
			{
				toggleExistingComps("on")
				return;
			}

			if(existingPhoneBool&&document.outForm.phone.value=="")
			{
				toggleExistingPhone("on")
				return;
			}

			if(existingMailBool&&document.outForm.email.value=="")
			{
				toggleExistingMail("on")
				return;
			}
		}

		function toggleCheckOut(toggle)
		{
			document.check.action="javascript:checkOut('no')";
			checkOutDiv=document.getElementById("checkOut");
			toggleShadow(toggle);
			(toggle=="on")?checkOutDiv.style.display="inline":checkOutDiv.style.display="none";
		}

		function checkOut(which)
		{
			if(which=="yes")
			{
				document.outForm.checkout.value="yes";
				existingCheckOut=false;
				toggleCheckOut("off")
			}
			else
			{
				window.location=protocol+server+"/checkout.php?nuid="+nuid.innerHTML;
			}
			toggleExisting();
		}

		function invalidCard()
		{
			log = document.getElementById("log");
			
			isov=document.check.cardErrorNuid.value;
			runCard()
			toggleError("off");
		}

		function checkStreeAddress(when)
		{
			streetAddress=document.getElementById("streetAddress");
			if(when==1)
			{
				document.check.action="javascript:checkStreeAddress(2)";
				if(document.mainForm.computer[document.mainForm.computer.selectedIndex].value!="Macintosh" && document.mainForm.computer[document.mainForm.computer.selectedIndex].value!="Apple")
				{
					return true;
				}
				else if (document.outForm.street.value!="" && document.outForm.city.value!="" && document.outForm.state.value!="" && document.outForm.zip.value!="")
				{
					return true;
				}
				else
				{
					toggleShadow("on");
					streetAddress.style.display="inline";
					return false;
				}
			}
			else
			{
				streetAddress.style.display="none";
				document.outForm.street.value=document.check.street.value;
				document.outForm.city.value=document.check.city.value;
				document.outForm.state.value=document.check.state.value;
				document.outForm.zip.value=document.check.zip.value;
				toggleShadow("off");
				setTimeout("formCheck()",70);
			}
		}
		
		function updateBackup(what)
		{
			document.outForm.backup.value=what;
			toggleBackup("off");
			setTimeout("toggleCheck('on')",70);
		}

		function checkIn()
		{
			document.getElementById("confirm").style.display="none";
			setTimeout("document.getElementById('saveBox').style.display='inline'",70);
			//setTimeout("document.outForm.submit()",80);
		}

		function setOtherPhone()
		{
			for(var i=0; i < document.check.existPhone.length;i++)
			{
				if(document.check.existPhone[i].value=='other')
				{
					document.check.existPhone[i].checked=true;
					exit;
				}
			}
		}

		function setOtherEmail()
		{
			for(var i=0; i < document.check.existEmail.length;i++)
			{
				if(document.check.existEmail[i].value=='other')
				{
					document.check.existEmail[i].checked=true;
					exit;
				}
			}
		}

		function feeAgree()
		{
			if(document.check.feeAgreeRadio[0].checked)
			{
				toggleFee("off");
				toggleExisting("on");
			}
			else
			{
				cancelAction()
			}
		}