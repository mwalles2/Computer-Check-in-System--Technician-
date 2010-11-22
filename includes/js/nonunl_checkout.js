	function xmlInitGetNUID()
	{
		var log=document.getElementById("log");
		person=req.responseXML.getElementsByTagName("person");
		nuid=getElementTextNS("", "unlUNCWID", person[0], 0);
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

	function xmlInitTicketSearch()
	{
		document.getElementById("updating").style.display="none";
		document.getElementById("searchBox").style.display="none";
		searchResults=document.getElementById("searchOut");
		person=req.responseXML.getElementsByTagName("person");
		for (var i = 0; i < person.length; i++)
		{
			personDiv = newPerson(person[i],false);
			searchResults.appendChild(personDiv);
		}
	}

	function xmlInitAuth()
	{
		tech=req.responseXML.getElementsByTagName("tech");
		auth=getElementTextNS("", "active", tech[0], 0);
		if(auth==1)
		{
			document.getElementById("scan").style.display="none";
			document.getElementById("searchBox").style.display="inline";
		}
		else
		{
			error("auth");
		}
	}

	xmlInit = xmlInitGetNUID;