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
		//document.getElementById("searchBox").style.display="none";
		searchResults=document.getElementById("searchOut");
		person=req.responseXML.getElementsByTagName("person");
		for (var i = 0; i < person.length; i++)
		{
			personDiv = passwordResetNewPerson(person[i],false);
			searchResults.appendChild(personDiv);
		}
	}

	function xmlInitAuth()
	{
		tech=req.responseXML.getElementsByTagName("tech");
		auth=getElementTextNS("", "active", tech[0], 0);
		if(auth==1)
		{
			document.getElementById("mainSection").style.display="none";
			document.getElementById("searchSection").style.display="inline";
			document.searchForm.search.focus();
		}
		else
		{
			error("auth");
		}
	}

	function passwordResetNewPerson(person, nuidBool)
	{
		if(nuidBool)
		{
			cellWidth="33%"
		}
		else
		{
			cellWidth="25%"
		}

		log = document.getElementById("log");
log.innerHTML+="newPerson()<br>";
log.innerHTML+="-- config<br>";

		nuid = getElementTextNS("", "nuid", person,0);
log.innerHTML+="-- nuid = "+nuid+"<br>";

		personItem = document.createElement("DIV");
		personItem.id = nuid+"Item";
		personItem.className = "row";
log.innerHTML+="-- row<br>";

		personRow = document.createElement("DIV");
		personRow.id = nuid;
		personRow.className="cell";
		personRow.style.width="100%";
log.innerHTML+="-- personRow<br>";

		personName = document.createElement("DIV");
		personName.id = nuid+"Name";
		personName.className="cell";
		personName.style.width=cellWidth;
log.innerHTML+="-- nameCell<br>";

		personNameLast = document.createElement("DIV");
		personNameLast.id = nuid+"Last";
		personNameLast.className="cell";
		personNameLast.innerHTML = getElementTextNS("", "surname", person,0);
log.innerHTML+="-- lastname = "+getElementTextNS("", "surname", person,0)+"<br>";

		personNameFirst = document.createElement("DIV");
		personNameFirst.id = nuid+"First";
		personNameFirst.className="cell";
		personNameFirst.style.margin="0 0 0 5px";
		personNameFirst.innerHTML = getElementTextNS("", "given", person,0);
log.innerHTML+="-- firstname = "+getElementTextNS("", "given", person,0)+"<br>";

		personNUID = document.createElement("DIV");
		personNUID.className = "cell";
		personNUID.style.width=cellWidth;
		personNUID.innerHTML = nuid;
log.innerHTML+="-- nuidCell<br>";

		personUsername = document.createElement("DIV");
		personUsername.className = "cell";
		personUsername.id = nuid+"Username";
		personUsername.style.width=cellWidth;
		personUsername.innerHTML = getElementTextNS("", "username", person,0);

		presonButtonDiv = document.createElement("DIV");
		presonButtonDiv.className = "cell";
		presonButtonDiv.style.width=cellWidth;
		presonButtonDiv.style.textAlign="right";
log.innerHTML+="-- buttonDiv<br>";

		resetButton = document.createElement("INPUT");
log.innerHTML+="-- checkoutButton<br>";
		resetButton.type = "button";
log.innerHTML+="-- checkoutButton.type<br>";
		resetButton.value = "Reset";
log.innerHTML+="-- checkoutButton.value<br>";
		eval("resetButton.onclick = function() { passwordResetShowReset('"+getElementTextNS("", "nuid", person,0)+"','"+getElementTextNS("", "name", person,0).replace(/'/,"\\'")+"');}");
log.innerHTML+="-- checkoutButton.onclick<br>";

log.innerHTML+="-- 2nd append<br>";

		personName.appendChild(personNameLast);
		personName.appendChild(personNameFirst);
log.innerHTML+="-- 3rd append<br>";

		presonButtonDiv.appendChild(resetButton);
log.innerHTML+="-- 4th append<br>";

		personRow.appendChild(personName);
		if(nuidBool)
		{
			personRow.appendChild(personNUID);
		}
		personRow.appendChild(personUsername);
		personRow.appendChild(presonButtonDiv);
log.innerHTML+="-- 5th append<br>";

		personItem.appendChild(personRow);
log.innerHTML+="-- lastAppend<br>";

		return personItem;
	}

	function passwordResetShowReset(nuid, name)
	{
		//alert(nuid);
		document.getElementById("searchSection").style.display="none";
		document.getElementById("resetSection").style.display="inline";
		document.getElementById("resetFormName").innerHTML=name;
		document.resetForm.password.focus();
		document.resetForm.resetFormNuid.value=nuid;
	}

	function resetPasword()
	{
		if(document.resetForm.password.value == document.resetForm.repassword.value)
		{
			//alert("includes/php/password_reset.php?nuid="+document.resetForm.resetFormNuid.value+"&password="+document.resetForm.password.value);
			xmlInit = xmlInitReset;
			//alert(protocol+server+"/includes/php/password_reset.php?nuid="+document.resetForm.resetFormNuid.value+"&password="+document.resetForm.password.value)
			loadXMLDoc(protocol+server+"/includes/php/password_reset.php?nuid="+document.resetForm.resetFormNuid.value+"&password="+document.resetForm.password.value);
		}
		else
		{
			document.getElementById("errorMessageReset").innerHTML="Passwords did not match. Please reenter them.";
			document.getElementById("errorMessageReset").style.display="block"
		}
	}

	function xmlInitReset()
	{
		data=req.responseXML.getElementsByTagName("data");
		if(getElementTextNS("", "computer", data[0],0) == "true")
		{
			window.location="user_list.php"
		}
		else
		{
			//alert("form");
			window.location="form.php"
		}
	}

	xmlInit = xmlInitGetNUID;