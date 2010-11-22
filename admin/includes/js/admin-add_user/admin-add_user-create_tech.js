	var uidArray = new Array();

	function updateAddUser(uid)
	{
		eval("uidRowBool = document.techForm."+uid+"CheckBox.checked;");
		if(uidRowBool)
		{
			uidArray[uidArray.length]=uid;
		}
		else
		{
			uidArray.splice(uidArray.indexOf(uid),1);
		}
	}
  
	function clearSearch()
	{
		document.getElementById("addTechRow").style.display="none";
		techs=document.getElementById("techs");
		uidArray = new Array();

		nextSib=techs.firstChild;
		while(nextSib)
		{
			thisSib=nextSib
			nextSib=thisSib.nextSibling;
			techs.removeChild(thisSib);
		}
	}

	function techSearchPerson(person)
 	{
		uid = getElementTextNS("", "uidMod", person,0);
		nuid = getElementTextNS("", "unluncwid", person,0);

		personItem = document.createElement("DIV");
		personItem.id = uid+"Item";
		personItem.className = "row cell";

		personRow = document.createElement("DIV");
		personRow.id = nuid;
		personRow.className="cell";
		personRow.style.width="100%";

		personCheckboxDiv = document.createElement("DIV");
		personCheckboxDiv.id = uid+"CheckBoxDiv";
		personCheckboxDiv.className="cell";
		personCheckboxDiv.style.width="5%";

		personCheckbox = document.createElement("INPUT");
		personCheckbox.type = "checkbox";
		personCheckbox.name = uid+"CheckBox";
		personCheckbox.id = uid+"CheckBox";
		eval("personCheckbox.onclick = function() { updateAddUser('"+uid+"'); }");

		personName = document.createElement("DIV");
		personName.id = uid+"Name";
		personName.className="cell";
		personName.style.width="25%";
		personName.innerHTML = getElementTextNS("", "cn", person,0);

		personUID = document.createElement("DIV");
		personUID.id = uid+"UID";
		personUID.className="cell";
		personUID.style.width="25%";
		personUID.innerHTML = getElementTextNS("", "uid", person,0);

		personNUID = document.createElement("DIV");
		personNUID.className = "cell";
		personNUID.style.width="25%";
		personNUID.innerHTML = nuid;

		presonSelectDiv = document.createElement("DIV");
		presonSelectDiv.className = "cell";
		presonSelectDiv.style.width="20%";
		presonSelectDiv.style.textAlign="right";

		personSelect = document.createElement("SELECT");
		personSelect.name = uid+"Status";
		personSelect.id = uid+"Status";

		personSelectOptionNone = document.createElement("OPTION");
		personSelectOptionNone.text = "None";
		personSelectOptionNone.value = "none";

		personSelectOptionViewer = document.createElement("OPTION");
		personSelectOptionViewer.text = "Viewer";
		personSelectOptionViewer.value = "view";

		personSelectOptionManage = document.createElement("OPTION");
		personSelectOptionManage.text = "Manager";
		personSelectOptionManage.value = "manage";

		personSelectOptionTech = document.createElement("OPTION");
		personSelectOptionTech.text = "Tech";
		personSelectOptionTech.value = "tech";

		personSelectOptionAll = document.createElement("OPTION");
		personSelectOptionAll.text = "All";
		personSelectOptionAll.value = "all";

		personSelect.appendChild(personSelectOptionNone);
		personSelect.appendChild(personSelectOptionViewer);
		personSelect.appendChild(personSelectOptionTech);
		personSelect.appendChild(personSelectOptionManage);
		personSelect.appendChild(personSelectOptionAll);

		presonSelectDiv.appendChild(personSelect);
		personCheckboxDiv.appendChild(personCheckbox);

		personRow.appendChild(personCheckboxDiv);
		personRow.appendChild(personName);
		personRow.appendChild(personUID);
		personRow.appendChild(personNUID);
		personRow.appendChild(presonSelectDiv);

		personItem.appendChild(personRow);

		return personItem;
	}

	function fadeRowBackground(item, color, level)
	{
		hexNumber = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
		itemDiv=document.getElementById(item);
		if(color == "red")
		{
			cssColor="#F"+hexNumber[level]+hexNumber[level];
		}
		else
		{
			cssColor="#"+hexNumber[level]+"F"+hexNumber[level];
		}
		//alert(cssColor);
		itemDiv.style.backgroundColor=cssColor;
		if(level<15)
		{
			level++;
			setTimeout("fadeRowBackground('"+item+"', '"+color+"', "+level+")",50);
		}
	}