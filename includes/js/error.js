	var errorMessageArray = new Array();
	errorMessageArray["nuid"] = "That is an invalid NCard.";
	errorMessageArray["auth"] = "That NCard is not associate with any of our technicans.  Please wait for one of our technicans to check-out your computer.";

	function toggleError(toggle)
	{
		errorBox=document.getElementById("errorBox");
		(toggle=="on")?errorBox.style.display="inline":errorBox.style.display="none";
		toggleShadow(toggle);
	}

	function error(message)
	{
		var log=document.getElementById("log");
		log.innerHTML+="error()<br>";
		log.innerHTML+="-- message="+message+"<br>";
		if(message=="clear")
		{
			log.innerHTML+="-- toggleError(off)<br>";
			toggleError("off");
		}
		else
		{
			document.check.action="javascript:invalidCard()";
			log.innerHTML+="-- toggleError(on)<br>";
			errorMessage=document.getElementById("errorMessage");
			errorMessage.innerHTML=errorMessageArray[message];
			if (message=="nuid")
			{
				document.check.cardErrorNuid.focus()
			}
			toggleError("on");
		}
	}
	
	function toggleShadow(toggle)
	{
		shadow=document.getElementById("shadow");
		(toggle=="on")?shadow.style.display="block":shadow.style.display="none";
	}