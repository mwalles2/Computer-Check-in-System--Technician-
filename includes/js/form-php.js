	formLength="l";
	newForm=true;

	chosenExistingEmail="";
	chosenExistingEmailBool=false;

	chosenExistingPhone="";
	chosenExistingPhoneBool=false;
	
	function formInit()
	{
		document.mainForm.probTextL.value=defaultProblemText;
		buildProbs("mainForm");
		buildProbs("check");
		loadXMLDoc(protocol+server+"/includes/php/form_xml.php?uid="+uid);
	}

	function xmlInit()
	{
		log = document.getElementById("log");

		person=req.responseXML.getElementsByTagName("person");
		existComps=req.responseXML.getElementsByTagName("computer");
		existPhone=req.responseXML.getElementsByTagName("telephoneNumber");
		existMail=req.responseXML.getElementsByTagName("mail");

		compsOut="";
		if(existComps.length>0)
		{
			(existComps.length>1)?computers=existComps.length+" comptuers":computers="computer";
			compsOut+="We have the following "+computers+" on record for you.<br>Please select the computer you are droping off today or select new.\n<div style=\"max-height: 200px; overflow:auto;\">";
			for(i=0;i<existComps.length;i++)
			{
				compsOut+="<div><input type='radio' name='existComp' value='"+getElementTextNS("", "compid",existComps[i],0)+"-"+getElementTextNS("", "brand",existComps[i],0)+"-"+getElementTextNS("", "type",existComps[i],0)+"'>"+getElementTextNS("", "brand",existComps[i],0)+" ";
				compsOut+=getElementTextNS("", "type",existComps[i],0);
				compsOut+=" - Serial Number: "+getElementTextNS("", "serialnum",existComps[i],0)+"</div>\n";
			}
			compsOut+="</div>\n<input type='radio' name='existComp' value='other' checked>New Computer";
			document.getElementById("existingCompList").innerHTML=compsOut;
			existingComputerBool=true;
		}

		if(existPhone.length>1)
		{
			phoneOut="We have the following phone numbers on record for you.<br>Please select the phone number that you would like us to contact you at";
			for(i=0;i<existPhone.length;i++)
			{
				phoneOut+="<br><input type='radio' name='existPhone' value='"+i+"'";
				existingPhoneIDArray[i]=getElementTextNS("","cid",existPhone[i],0);
				existingPhoneDataArray[i]=getElementTextNS("","data",existPhone[i],0);
				if(i==0)
				{
					phoneOut+=" checked";
				}
				phoneOut+=">"+getElementTextNS("","data",existPhone[i],0);
			}
			phoneOut+="<br><input type='radio' name='existPhone' value='other'>Other<input type='text' onfocus='setOtherPhone()' name='existPhoneOther'><br><input type='radio' name='existPhone' value='none'>None";
			document.getElementById("existingPhoneList").innerHTML=phoneOut;
			existingPhoneBool=true;
		}
		else if(existPhone.length==1)
		{
			document.mainForm.phone.value=getElementTextNS("","data",existPhone[0],0);
			chosenExistingPhone=getElementTextNS("","data",existPhone[0],0);
			chosenExistingPhoneBool=true;
			document.outForm.phone.value="cid:"+getElementTextNS("","cid",existPhone[0],0);
			existingPhoneBool=true;
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
				mailOut+="<br><input type='radio' name='existMail' value='"+i+"'";
				existingMailIDArray[i]=getElementTextNS("","cid",existMail[i],0);
				existingMailDataArray[i]=getElementTextNS("","data",existMail[i],0);
				if(i==0)
				{
					mailOut+=" checked";
				}
				mailOut+=">"+getElementTextNS("","data",existMail[i],0);
			}
			mailOut+="<br><input type='radio' name='existMail' value='other'>Other<input type='text' name='existMailOther'><br><input type='radio' name='existMail' value='none'>None";
			document.getElementById("existingMailList").innerHTML=mailOut;
			existingMailBool=true;
log.innerHTML+="- existMail.length>1<br>";
		}
		else if(existMail.length==1)
		{
			document.mainForm.email.value=getElementTextNS("","data",existMail[0],0);
			chosenExistingEmail=getElementTextNS("","data",existMail[0],0);
			chosenExistingEmailBool=true;
			document.outForm.email.value="cid:"+getElementTextNS("","cid",existMail[0],0);
			existingMailBool=true;
		}
		else
		{
			document.mainForm.email.value="";
		}
		toggleFee("on");
	}