		function toggleShadow(toggle)
		{
			shadow=document.getElementById("shadow");
			(toggle=="on")?shadow.style.display="inline":shadow.style.display="none";
		}

		function toggleOut(toggle)
		{
			outDiv=document.getElementById("checkout");
			if(toggle=="on")
			{
				isov="";
				document.getElementById("card").innerHTML="";
				getKeys();
				xmlInit=xmlInit1;
				outDiv.style.display="inline";
			}
			else
			{
				outDiv.style.display="none";
			}
			toggleShadow(toggle);
		}

		function toggleError(toggle)
		{
			errorBox=document.getElementById("errorBox");
			(toggle=="on")?errorBox.style.display="inline":errorBox.style.display="none";
			toggleShadow(toggle);
		}

		function updateOutBox(item)
		{
			outItem=document.getElementById(item.name+"-box");
			(item.checked)?outItem.style.display="inline":outItem.style.display="none";
		}

		function xmlInit1()
		{
			var log=document.getElementById("log");
			log.innerHTML+="xmlInit1()<br>";
			person=req.responseXML.getElementsByTagName("person");
			nuid=getElementTextNS("", "unlUNCWID", person[0], 0);
			log.innerHTML+="--"+nuid+"<br>";
			if(nuid!="n/a")
			{
				log.innerHTML+="-- if<br>";
				auth(nuid);
			}
			else
			{
				log.innerHTML+="-- else<br>";
				error("nuid");
			}
		}

		function xmlInitAuth()
		{
			var log=document.getElementById("log");
			log.innerHTML+="xmlInit2()<br>";
			tech=req.responseXML.getElementsByTagName("tech");
			auth=getElementTextNS("", "active", tech[0], 0);
			techid=getElementTextNS("", "techid", tech[0], 0);
			if(auth==1)
			{
				log.innerHTML+="-- if<br>";
				document.mainForm.techid.value=techid;
				document.mainForm.submit();
				log.innerHTML+="-- -- Done<br>";
			}
			else
			{
				log.innerHTML+="-- else<br>";
				error("auth");
			}
		}

		function error(message)
		{
			var log=document.getElementById("log");
			log.innerHTML+="error()<br>";
			log.innerHTML+="-- message="+message+"<br>";
			if(message=="clear")
			{
				toggleError("off");
				toggleOut("on");
			}
			else
			{
				errorMessage=document.getElementById("errorMessage");
				if(message=="nuid")
				{
					errorMessage.innerHTML="That is an invalid NCard.";
				}
				else if(message=="auth")
				{
					errorMessage.innerHTML="That NCard is not associate with any of our technicans.  Please wait for one of our technicans to check-out your computer.";
				}
				else
				{
					errorMessage.innerHTML=message;
				}
				toggleOut("off");
				toggleError("on");
			}
		}

		function chargeNcard(nuid, tid, button)
		{
			toggleShadow("on");
			document.getElementById("chargeBox").style.display="inline";
			document.chargeForm.tid.value=tid;
			document.chargeForm.nuid.value=nuid
			document.chargeForm.buttonName.value=button.name;
			document.chargeForm.chargeAmount.focus();
			document.chargeForm.action="javascript:openNpinBox()";
		}

		function closeChargeBox()
		{
			toggleShadow("off");
			document.getElementById("chargeBox").style.display="none";
		}

		function openNpinBox()
		{
			document.getElementById("chargeAmountText").innerHTML=number_format(document.chargeForm.chargeAmount.value,2,".",",");
			document.getElementById("chargeBox").style.display="none";
			setTimeout("document.getElementById('npinBox').style.display='inline'",70);
			setTimeout("document.chargeForm.chargeNpin.focus()",70);
			document.chargeForm.action="javascript:checkCharge()";
		}

		function checkCharge()
		{
			document.getElementById('npinBox').style.display='none';
			xmlInit=chargeCard;
			loadXMLDoc(protocol+server+"/includes/php/ncard.php?nuid="+document.chargeForm.nuid.value+"&npin="+document.chargeForm.chargeNpin.value+"&amount="+document.chargeForm.chargeAmount.value+"&tid="+document.chargeForm.tid.value);
		}

		function chargeCard()
		{
			//alert("chargeCard()");
			if(req.responseXML.getElementsByTagName("error").length>0)
			{
				//alert("error");
				var data=req.responseXML.getElementsByTagName("data");
				if(getElementTextNS("", "error", data[0], 0) == "PIN does not match.")
				{
					//alert("if");
					document.getElementById("npinError").style.display="inline";
					document.chargeForm.chargeNpin.value="";
					openNpinBox();
				}
				else
				{
					//alert("else");
					error("There is currently not sufficant credit on your NCard for this charge.");
				}
				//alert("done");
			}
			else
			{
				document.getElementById("npinError").style.display="none";
				document.getElementById("chargeMessage").style.display="inline";
				setTimeout("toggleOut('on')",70);
			}
		}

		function closeNpinBox()
		{
			toggleShadow("off");
			document.getElementById('npinBox').style.display='none';
			
		}