	sortFirst = new Array();
	sortLast = new Array();

	function advShowHide (parent, child, button)
	{
		log = document.getElementById("log");
		//log.innerHTML+="advShowHide()<br>";
		//log.innerHTML+="-- parent = "+parent+"<br>";
		//log.innerHTML+="-- child = "+child+"<br>";
		//log.innerHTML+="-- button.onclick = "+button.onclick+"<br>";
		parentObj = document.getElementById(parent);
		childObj = document.getElementById(child);
		if (childObj.style.display=="none")
		{
			parentObj.className = "cell bottom_border";
			childObj.style.display="inline";
			button.value="hide";
		}
		else
		{
			parentObj.className = "cell";
			childObj.style.display="none";
			button.value="show";
		}
	}

	function xmlInit()
	{
		startTime=new Date();
		document.getElementById("updating").style.display="none";
		if(xmlInitAuth())
		{
			return false;
		}
		log = document.getElementById("log");
		//log.innerHTML+="xmlInit()<br>";
		data=req.responseXML.getElementsByTagName("data");
		searchResults=document.getElementById("searchResults");
		person=req.responseXML.getElementsByTagName("person");
		sortFirstList=req.responseXML.getElementsByTagName("sort_first");
		sortLastList=req.responseXML.getElementsByTagName("sort_last");
		if(person.length<1)
		{
			//alert("test");
			searchResults.innerHTML="No results found";
		}
		else
		{
			for (var i = 0; i < person.length; i++)
			{
				//log.innerHTML+="-- person -> "+i+"<br>";
				personDiv = newPerson(person[i]);
				//log.innerHTML+="-- personDiv = "+personDiv;
				searchResults.appendChild(personDiv);
			}
			for (var i = 0; i < sortFirstList.length; i++)
			{
				//log.innerHTML+="-- sortFirstList -> "+i;
				sortFirst[i]=getElementTextNS("", "sort_first", data[0],i);
				//log.innerHTML+=" -> "+getElementTextNS("", "sort_first", data[0],i)+"<br>";
			}
			for (var i = 0; i < sortLastList.length; i++)
			{
				//log.innerHTML+="-- sortLastList -> "+i;
				sortLast[i]=getElementTextNS("", "sort_last", data[0],i);
				//log.innerHTML+=" -> "+getElementTextNS("", "sort_last", data[0],i)+"<br>";
			}
		}
		sortSearch('last');
		endTime=new Date();
	}

	function ticketSearch()
	{
		clearSearch();
		document.getElementById("updating").style.display="inline";
		//alert(protocol+server+"/admin/includes/php/computer_search_xml.php?search_items="+encodeURI(document.searchForm.search.value));
		loadXMLDoc(protocol+server+"/admin/includes/php/computer_search_xml.php?search_items="+encodeURI(document.searchForm.search.value));
	}

	function clearSearch()
	{
		searchResults=document.getElementById("searchResults");
		if (sortLast.length>0)
		{
			for (var i=0; i<sortLast.length; i++)
			{
				searchResults.removeChild(document.getElementById(sortLast[i]+"Item"));
			}
			sortFirst = new Array();
			sortLast = new Array();
		}
		searchResults.innerHTML="";
	}

	function newPerson(person)
	{
		newPersonStart = new Date();
		log = document.getElementById("log");
		log.style.display="inline";
		//log.innerHTML+="newPerson()<br>";
		phoneArray = person.getElementsByTagName("phone");
		emailArray = person.getElementsByTagName("email");
		//log.innerHTML+="-- config<br>";

		nuid = getElementTextNS("", "nuid", person,0);
		///log.innerHTML+="-- nuid = "+nuid+"<br>";

		personItem = document.createElement("DIV");
		personItem.id = nuid+"Item";
		personItem.className = "row";
		//log.innerHTML+="-- row<br>";

		personRow = document.createElement("DIV");
		personRow.id = nuid;
		personRow.className="cell";
		personRow.style.width="100%";
		//log.innerHTML+="-- personRow<br>";

		personName = document.createElement("DIV");
		personName.id = nuid+"Name";
		personName.className="cell";
		personName.style.width="20%";
		//log.innerHTML+="-- nameCell<br>";

		personNameLast = document.createElement("DIV");
		personNameLast.id = nuid+"Last";
		personNameLast.className="cell";
		personNameLast.innerHTML = getElementTextNS("", "surname", person,0);
		//log.innerHTML+="-- lastname"+getElementTextNS("", "surname", person,0)+"<br>";

		personNameFirst = document.createElement("DIV");
		personNameFirst.id = nuid+"First";
		personNameFirst.className="cell";
		personNameFirst.style.margin="0 0 0 5px";
		personNameFirst.innerHTML = getElementTextNS("", "given", person,0);
		//log.innerHTML+="-- firstname"+getElementTextNS("", "given", person,0)+"<br>";

		personNUID = document.createElement("DIV");
		personNUID.className = "cell";
		personNUID.style.width="20%";
		personNUID.innerHTML = nuid;
		//log.innerHTML+="-- nuidCell<br>";

		personPhone = document.createElement("DIV");
		personPhone.className = "cell";
		personPhone.style.width="20%";
		personPhone.innerHTML = "";
		for(var j = 0; j < phoneArray.length; j++)
		{
			if(j > 0)
			{
				personPhone.innerHTML += "<br>";
			}
			personPhone.innerHTML += getElementTextNS("", "phone", person,j)
		}
		if(personPhone.innerHTML == "")
		{
			personPhone.innerHTML = "&nbsp;";
		}
		//log.innerHTML+="-- phone<br>";

		personEmail = document.createElement("DIV");
		personEmail.className = "cell";
		personEmail.style.width="20%";
		for(var j = 0; j < emailArray.length; j++)
		{
			if(j > 0)
			{
				personEmail.innerHTML += "<br>";
			}
			personEmail.innerHTML += getElementTextNS("", "email", person,j)
		}
		if(personEmail.innerHTML == "")
		{
			personEmail.innerHTML = "&nbsp;";
		}
		//log.innerHTML+="-- email<br>";

		presonButtonDiv = document.createElement("DIV");
		presonButtonDiv.className = "cell";
		presonButtonDiv.style.width="20%";
		presonButtonDiv.style.textAlign="right";
		//log.innerHTML+="-- buttonDiv<br>";

		personButton = document.createElement("INPUT");
		//log.innerHTML+="-- button<br>";
		personButton.type = "button";
		//log.innerHTML+="-- button type<br>";
		personButton.value = "show";
		//log.innerHTML+="-- button value<br>";
		eval("personButton.onclick = function() { advShowHide(\""+nuid+"\",\""+nuid+"more\",this); }");
		//log.innerHTML += "-- onclick = function() { advShowHide("+nuid+","+nuid+"more,this); }<br>";
		//log.innerHTML+="-- 1st append<br>";

		personTickets = document.createElement("DIV");
		personTickets.id = nuid+"more";
		personTickets.style.display = "none";
		//log.innerHTML+="-- 2nd append<br>";

		personName.appendChild(personNameLast);
		personName.appendChild(personNameFirst);
		//log.innerHTML+="-- 3rd append<br>";

		presonButtonDiv.appendChild(personButton);
		//log.innerHTML+="-- 4th append<br>";

		personRow.appendChild(personName);
		personRow.appendChild(personNUID);
		personRow.appendChild(personPhone);
		personRow.appendChild(personEmail);
		personRow.appendChild(presonButtonDiv);
		//log.innerHTML+="-- 5th append<br>";

		personItem.appendChild(personRow);
		personItem.appendChild(personTickets);
		//log.innerHTML+="-- lastAppend<br>";

		newTicket(person, personTickets);
		newPersonEnd = new Date();
		//log.innerHTML+=timer(newPersonStart,newPersonEnd,"newPerson");
		return personItem;
	}

	function newTicket(person, personTickets)
	{
		log = document.getElementById("log");
		//log.innerHTML+="newTicket()<br>";
		tickets = person.getElementsByTagName("ticket");
		
		for(var k =0; k < tickets.length; k++)
		{
			tid = getElementTextNS("", "tid", tickets[k],0);
			lDate = getElementTextNS("", "date", tickets[k],0);
			date = lDate.substring(0,10);
			lDate = lDate.substring(0,16);
			sDate = lDate.replace(/ /g,"").replace(/:/g,"").replace(/-/g,"");

			ticketRow = document.createElement("DIV");
			ticketRow.className = "row";
			ticketRow.id = tid+"row";
			ticketRow.style.width = "98%";
			ticketRow.style.marginTop = "0";
			ticketRow.style.marginRight = "1%";
			ticketRow.style.marginBottom = "0";
			ticketRow.style.marginLeft = "1%";
			
			ticketCell = document.createElement("DIV");
			ticketCell.className = "cell";
			ticketCell.style.width = "100%";
			ticketCell.style.borderColor = "#000";
			ticketCell.style.borderStyle = "solid";
			ticketCell.style.borderRightWidth="1px";
			ticketCell.style.borderLeftWidth="1px";
			ticketCell.style.borderTopWidth="0";

			if(k != tickets.length-1)
			{
				ticketCell.style.borderBottomWidth="0";
			}
			else
			{
				ticketCell.style.borderBottomWidth="1px";
			}
			
			ticketCell.style.background = "#ccc";

			ticketNum = document.createElement("DIV");
			ticketNum.className = "cell";
			ticketNum.style.width = "20%";
			ticketNum.innerHTML = "<a href=\"ticket_detail.php?tid="+tid+"\">"+sDate+tid+"</a>";

			ticketDate = document.createElement("DIV");
			ticketDate.className = "cell";
			ticketDate.style.width = "20%";
			ticketDate.innerHTML = date;

			ticketBrand = document.createElement("DIV");
			ticketBrand.className = "cell";
			ticketBrand.style.width = "20%";
			ticketBrand.innerHTML = getElementTextNS("", "brand", tickets[k],0);

			ticketType = document.createElement("DIV");
			ticketType.className = "cell";
			ticketType.style.width = "20%";
			ticketType.innerHTML = getElementTextNS("", "type", tickets[k],0);

			ticketStatus = document.createElement("DIV");
			ticketStatus.className = "cell";
			ticketStatus.style.width = "20%";
			ticketStatus.innerHTML = getElementTextNS("", "status", tickets[k],0);

			ticketCell.appendChild(ticketNum);
			ticketCell.appendChild(ticketDate);
			ticketCell.appendChild(ticketBrand);
			ticketCell.appendChild(ticketType);
			ticketCell.appendChild(ticketStatus);

			ticketRow.appendChild(ticketCell);
			
			personTickets.appendChild(ticketRow);
		}
	}

	function sortSearch(on)
	{
		log=document.getElementById("log");
		//log.innerHTML+="sortSearch()<br>";
		searchResults=document.getElementById("searchResults");
		if(on=="first")
		{
			for(var i=0; i<sortFirst.length;i++)
			{
				//log.innerHTML+="-- sortFirst -> "+sortFirst[i]+"<br>";
				searchResults.appendChild(document.getElementById(sortFirst[i]+"Item"));
			}
		}
		else if(on=="last")
		{
			//log.innerHTML+="-- sortLast.length = "+sortLast.length+"<br>";
			for(var i=0; i<sortLast.length;i++)
			{
				//log.innerHTML+="-- sortLast -> "+i+" -> "+sortLast[i]+"<br>";
				searchResults.appendChild(document.getElementById(sortLast[i]+"Item"));
			}
		}
	}