	function ticketSearch(filter, filterType, filterTable, filterCol, computerIn)
	{
		document.getElementById("updating").style.display="inline";
		//alert("http://ishd-gateway.unl.edu/admin/includes/php/computer_search_xml.php?search_items="+encodeURI(document.searchForm.search.value));
		xmlInit = xmlInitTicketSearch;
		loadXMLDoc(protocol+server+"/includes/php/computer_search_xml.php?search_items="+encodeURI(document.searchForm.search.value)+"&filterType="+filterType+"&filter="+filter+"&filterTable="+filterTable+"&filterCol="+filterCol+"&computerIn="+computerIn);
		//alert("includes/php/computer_search_xml.php?search_items="+encodeURI(document.searchForm.search.value)+"&filterType="+filterType+"&filter="+filter+"&filterTable="+filterTable+"&filterCol="+filterCol+"&computerIn="+computerIn);
	}

	function auth(nuid)
	{
		var log=document.getElementById("log");
		log.innerHTML+="auth()<br>";
		xmlInit=xmlInitAuth;
		log.innerHTML+=protocol+server+"/includes/php/checkout-auth.php?nuid="+nuid+"<br>";
		loadXMLDoc(protocol+server+"/includes/php/checkout_auth.php?nuid="+nuid);
	}

	function newPerson(person, nuidBool)
	{
		if(nuidBool)
		{
			cellWidth="20%"
		}
		else
		{
			cellWidth="25%"
		}

		log = document.getElementById("log");
log.innerHTML+="newPerson()<br>";
		phoneArray = person.getElementsByTagName("phone");
		emailArray = person.getElementsByTagName("email");
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
log.innerHTML+="-- lastname"+getElementTextNS("", "surname", person,0)+"<br>";

		personNameFirst = document.createElement("DIV");
		personNameFirst.id = nuid+"First";
		personNameFirst.className="cell";
		personNameFirst.style.margin="0 0 0 5px";
		personNameFirst.innerHTML = getElementTextNS("", "given", person,0);
log.innerHTML+="-- firstname"+getElementTextNS("", "given", person,0)+"<br>";

		personNUID = document.createElement("DIV");
		personNUID.className = "cell";
		personNUID.style.width=cellWidth;
		personNUID.innerHTML = nuid;
log.innerHTML+="-- nuidCell<br>";

		personPhone = document.createElement("DIV");
		personPhone.className = "cell";
		personPhone.style.width=cellWidth;
		personPhone.innerHTML = "";
		for(var j = 0; j < phoneArray.length; j++)
		{
			if(j > 0)
			{
				personPhone.innerHTML += "<br>";
			}
			personPhone.innerHTML += getElementTextNS("", "phone", person,j)
		}
log.innerHTML+="-- phone<br>";

		personEmail = document.createElement("DIV");
		personEmail.className = "cell";
		personEmail.style.width=cellWidth;
		for(var j = 0; j < emailArray.length; j++)
		{
			if(j > 0)
			{
				personEmail.innerHTML += "<br>";
			}
			personEmail.innerHTML += getElementTextNS("", "email", person,j)
		}
		//log.innerHTML+="-- email<br>";

		presonButtonDiv = document.createElement("DIV");
		presonButtonDiv.className = "cell";
		presonButtonDiv.style.width=cellWidth;
		presonButtonDiv.style.textAlign="right";
log.innerHTML+="-- buttonDiv<br>";

		checkoutButton = document.createElement("INPUT");
log.innerHTML+="-- checkoutButton<br>";
		checkoutButton.type = "button";
log.innerHTML+="-- checkoutButton.type<br>";
		checkoutButton.value = "checkout";
log.innerHTML+="-- checkoutButton.value<br>";
		eval("checkoutButton.onclick = function() { document.location=\"checkout.php?nuid="+nuid+"&status=all\";}");
log.innerHTML+="-- checkoutButton.onclick<br>";

		personButton = document.createElement("INPUT");
log.innerHTML+="-- button<br>";
		personButton.type = "button";
log.innerHTML+="-- button type<br>";
		personButton.value = "show";
log.innerHTML+="-- button value<br>";
		eval("personButton.onclick = function() { advShowHide(\""+nuid+"\",\""+nuid+"more\",this); }"); //alert('test')
log.innerHTML += "-- onclick = function() { advShowHide("+nuid+","+nuid+"more,this); }<br>";
log.innerHTML+="-- 1st append<br>";

		personTickets = document.createElement("DIV");
		personTickets.id = nuid+"more";
		personTickets.style.display = "none";
log.innerHTML+="-- 2nd append<br>";

		personName.appendChild(personNameLast);
		personName.appendChild(personNameFirst);
log.innerHTML+="-- 3rd append<br>";

		presonButtonDiv.appendChild(checkoutButton);
		presonButtonDiv.appendChild(personButton);
log.innerHTML+="-- 4th append<br>";

		personRow.appendChild(personName);
		if(nuidBool)
		{
			personRow.appendChild(personNUID);
		}
		personRow.appendChild(personPhone);
		personRow.appendChild(personEmail);
		personRow.appendChild(presonButtonDiv);
log.innerHTML+="-- 5th append<br>";

		personItem.appendChild(personRow);
		personItem.appendChild(personTickets);
log.innerHTML+="-- lastAppend<br>";

		newTicket(person, personTickets);
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
			ticketNum.innerHTML = sDate+tid;

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

	/* Made by Mathias Bynens <http://mathiasbynens.be/> */
	/* retrived form http://krijnhoetmer.nl/stuff/javascript/number-format/script.js */
	function number_format(a, b, c, d)
	{
		a = Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
		e = a + '';
		f = e.split('.');
		if (!f[0])
		{
			f[0] = '0';
		}
		if (!f[1])
		{
			f[1] = '';
		}
		if (f[1].length < b)
		{
			g = f[1];
			for (i=f[1].length + 1; i <= b; i++)
			{
				g += '0';
			}
			f[1] = g;
		}
		if(d != '' && f[0].length > 3)
		{
			h = f[0];
			f[0] = '';
			for(j = 3; j < h.length; j+=3)
			{
				i = h.slice(h.length - j, h.length - j + 3);
				f[0] = d + i +  f[0] + '';
			}
			j = h.substr(0, (h.length % 3 == 0) ? 3 : (h.length % 3));
			f[0] = j + f[0];
		}
		c = (b <= 0) ? '' : c;
		return f[0] + c + f[1];
	}

	Array.prototype.inArray = function (value)
	{
		var i;
		for (i=0; i < this.length; i++)
		{
			if (this[i] === value)
			{
				return true;
			}
		}
		return false;
	};

	function cancelAction()
	{
		window.location="entry.php";
	}