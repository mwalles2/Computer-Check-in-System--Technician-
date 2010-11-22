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

		function updateOutBox(item)
		{
			outItem=document.getElementById(item.name+"-box");
			(item.checked)?outItem.style.display="inline":outItem.style.display="none";
			(item.checked)?outCount++:outCount--;
			eval("("+item.checked+")?document.outForm."+item.name+".value=document.mainForm."+item.name+".value:document.outForm."+item.name+".value=''");
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
				document.outForm.techid.value=techid;
				document.outForm.submit();
				log.innerHTML+="-- -- Done<br>";
			}
			else
			{
				log.innerHTML+="-- else<br>";
				error("auth");
			}
		}

		function updateNewBox(item)
		{
			(item.checked)?document.outForm.newcomputer.value="true":document.outForm.newcomputer.value="false";
		}

		function checkout()
		{
			document.getElementById("errorMessage").style.display="none";
			if(outCount > 0)
			{
				toggleOut('on');
			}
			else if(document.mainForm.newcomputer.checked)
			{
				window.location="form.php";
			}
			else
			{
				document.getElementById("errorMessage").innerHTML="Please select a computer to check-out and/or select the box for dropping off a new computer."
				document.getElementById("errorMessage").style.display="block";
			}
		}