	function addTabAjax()
	{
		data=req.responseXML.getElementsByTagName("data");
		tabId="tab"+getElementTextNS("", "tabId", data[0], 0);
		//tabId="tab"+"X";

		tabsDiv=document.getElementById("tabs");

		tabContainer=document.createElement("DIV");
		tabContainer.className="row";
		tabContainer.id=tabId;

		tabItem=document.createElement("DIV");
		tabItem.className="cell round_top_tab darkBlueBackground";
		tabItem.style.width="25%";
		tabItem.style.textAlign="center";
		tabItem.id=tabId+"Tab";
		eval("tabItem.onclick=function(){editTabOptions('"+tabId+"')}");

		tabItemLabel=document.createElement("SPAN");
		tabItemLabel.id=tabId+"Label";
		eval("tabItemLabel.onclick=function(){editTabName('"+tabId+"')}");

		tabItemLabelName=document.createElement("SPAN");
		tabItemLabelName.id=tabId+"LabelName";
		tabItemLabelName.innerHTML="New Tab";

		tabItemLabelNameEdit=document.createElement("SPAN");
		tabItemLabelNameEdit.id=tabId+"LabelNameEdit";
		tabItemLabelNameEdit.style.display="none";

		tabItemLableNameEditTextbox=document.createElement("INPUT");
		tabItemLableNameEditTextbox.type="text";
		tabItemLableNameEditTextbox.name=tabId+"LabelNameEditTextbox";
		tabItemLableNameEditTextbox.value="New Tab"
		eval("tabItemLableNameEditTextbox.onblur=function(){saveTabName('"+tabId+"')}");

		tabItemLabelNameEdit.appendChild(tabItemLableNameEditTextbox);

		tabItemLabelDefault=document.createElement("SPAN");
		tabItemLabelDefault.id=tabId+"LabelDefault";
		tabItemLabelDefault.innerHTML="*";
		tabItemLabelDefault.style.display="none";

		tabItemLabel.appendChild(tabItemLabelName);
		tabItemLabel.appendChild(tabItemLabelNameEdit);
		tabItemLabel.appendChild(tabItemLabelDefault);

		tabItem.appendChild(tabItemLabel);

		tabContainer.appendChild(tabItem);

		optionsRow=document.createElement("DIV");
		optionsRow.className="row cell side_borders darkBlueBackground";
		optionsRow.style.padding="0";
		optionsRow.style.display="none";
		optionsRow.id=tabId+"Options"

		optionsCell=document.createElement("DIV");
		optionsCell.className="cell";
		optionsCell.style.width="98%";
		optionsCell.style.margin="0 auto";

		optionsDefaultCell=document.createElement("DIV");
		optionsDefaultCell.className="cell";
		optionsDefaultCell.id=tabId+"OptionsDefault";
		eval("optionsDefaultCell.onclick=function(){saveDefaultTab('"+tabId+"')}");
		
		optionsDefaultCellCheckbox=document.createElement("INPUT");
		optionsDefaultCellCheckbox.type="checkbox";
		optionsDefaultCellCheckbox.name=tabId+"OptionsDefaultCheckbox";
		optionsDefaultCellCheckbox.id=tabId+"OptionsDefaultCheckbox";

		optionsDefaultCell.appendChild(optionsDefaultCellCheckbox);
		optionsDefaultCell.innerHTML+="Default";

		optionsRemoveCell=document.createElement("DIV");
		optionsRemoveCell.className="remove";
		optionsRemoveCell.id=tabId+"OptionsRemove";
		eval("optionsRemoveCell.onclick=function(){removeTab('"+tabId+"')}");
		optionsRemoveCell.innerHTML="Remove";

		optionsAddCell=document.createElement("DIV");
		optionsAddCell.className="add";
		optionsAddCell.id=tabId+"OptionsRemove";
		eval("optionsAddCell.onclick=function(){addIpRange('"+tabId+"')}");
		optionsAddCell.innerHTML="Add IP Range";

		optionsCell.appendChild(optionsDefaultCell);
		optionsCell.appendChild(optionsRemoveCell);
		optionsCell.appendChild(optionsAddCell);

		optionsRow.appendChild(optionsCell);

		ipRangeDiv=document.createElement("DIV");
		ipRangeDiv.className="row cell top_border bottom_space";
		ipRangeDiv.id=tabId+"IpRanges";

		ipRangeCell=document.createElement("DIV");
		ipRangeCell.className="cell greyBg bottom_side_borders";
		ipRangeCell.id=tabId+"IpRangesCell";

		ipRangeDiv.appendChild(ipRangeCell);

		tabsDiv.appendChild(tabContainer);
		tabsDiv.appendChild(optionsRow);
		tabsDiv.appendChild(ipRangeDiv);

		noTabsDiv=document.getElementById("noTabs");
		noTabsDiv.style.display="none";

		if(currentDefaultTab=='')
		{
			
			setTimeout("saveDefaultTab('"+tabId+"')",50);
		}
		addIpRange(tabId);
	}

	function addIpRangeAjax()
	{
		data=req.responseXML.getElementsByTagName("data");
		tabId="tab"+getElementTextNS("", "tabId", data[0], 0);
		ipRangeId="IpRange"+getElementTextNS("", "ipRangeId", data[0], 0);

		ipRangeContainer=document.getElementById(tabId+"IpRangesCell");

		ipRangeRowDiv=document.createElement("DIV");
		ipRangeRowDiv.className="row";
		ipRangeRowDiv.style.width="98%";
		ipRangeRowDiv.style.margin="0 auto";
		ipRangeRowDiv.id=tabId+ipRangeId;

		ipRangeSpan=document.createElement("SPAN");
		ipRangeSpan.className="ipRange cell active";
		ipRangeSpan.id=tabId+ipRangeId+"Span";
		eval("ipRangeSpan.onclick=function(){editIpRange('"+tabId+ipRangeId+"')}");

		ipRangeStartIpDiv=document.createElement("DIV");
		ipRangeStartIpDiv.className="cell";
		ipRangeStartIpDiv.id=tabId+ipRangeId+"StartIp";
		ipRangeStartIpDiv.innerHTML="0.0.0.0";
		ipRangeStartIpDiv.style.display="none";

		ipRangeStartIpEdit=document.createElement("DIV");
		ipRangeStartIpEdit.className="cell";
		ipRangeStartIpEdit.id=tabId+ipRangeId+"StartIpEdit";

		ipRangeStartIpEditTextbox=document.createElement("INPUT");
		ipRangeStartIpEditTextbox.type="text";
		ipRangeStartIpEditTextbox.size=15;
		ipRangeStartIpEditTextbox.name=tabId+ipRangeId+"StartIpEditTextbox";
		ipRangeStartIpEditTextbox.value="0.0.0.0";

		ipRangeStartIpEdit.appendChild(ipRangeStartIpEditTextbox);

		ipRangeDash=document.createElement("DIV");
		ipRangeDash.className="cell";
		ipRangeDash.style.width="3em";
		ipRangeDash.style.textAlign="center";
		ipRangeDash.id=tabId+ipRangeId+"Dash";
		ipRangeDash.innerHTML="-";

		ipRangeEndIpDiv=document.createElement("DIV");
		ipRangeEndIpDiv.className="cell";
		ipRangeEndIpDiv.id=tabId+ipRangeId+"EndIp";
		ipRangeEndIpDiv.innerHTML="0.0.0.0";
		ipRangeEndIpDiv.style.display="none";

		ipRangeEndIpEdit=document.createElement("DIV");
		ipRangeEndIpEdit.className="cell";
		ipRangeEndIpEdit.id=tabId+ipRangeId+"EndIpEdit";

		ipRangeEndIpEditTextbox=document.createElement("INPUT");
		ipRangeEndIpEditTextbox.type="text";
		ipRangeEndIpEditTextbox.size=15;
		ipRangeEndIpEditTextbox.name=tabId+ipRangeId+"EndIpEditTextbox";
		ipRangeEndIpEditTextbox.value="0.0.0.0";

		ipRangeEndIpEdit.appendChild(ipRangeEndIpEditTextbox);

		ipRangeSave=document.createElement("DIV");
		ipRangeSave.className="cell save";
		ipRangeSave.id=tabId+ipRangeId+"Save";
		eval("ipRangeSave.onclick=function(){saveIpRange('"+tabId+ipRangeId+"')}");
		ipRangeSave.innerHTML="Save";

		ipRangeSpan.appendChild(ipRangeStartIpDiv);
		ipRangeSpan.appendChild(ipRangeStartIpEdit);
		ipRangeSpan.appendChild(ipRangeDash);
		ipRangeSpan.appendChild(ipRangeEndIpDiv);
		ipRangeSpan.appendChild(ipRangeEndIpEdit);
		ipRangeSpan.appendChild(ipRangeSave);

		ipRangeRemove=document.createElement("DIV");
		ipRangeRemove.className="remove";
		ipRangeRemove.id=tabId+ipRangeId+"Remove";
		ipRangeRemove.innerHTML="Remove";
		eval("ipRangeRemove.onclick=function(){removeIpRange('"+tabId+ipRangeId+"')}");

		ipRangeRowDiv.appendChild(ipRangeSpan);
		ipRangeRowDiv.appendChild(ipRangeRemove);

		ipRangeContainer.appendChild(ipRangeRowDiv);
		ipRangeStartIpEditTextbox.focus();
	}
	
	function removeTabAjax()
	{
		data=req.responseXML.getElementsByTagName("data");
		tabNumber=getElementTextNS("", "tabId", data[0], 0);
		tabId="tab"+tabNumber;

		if(tabNumber==currentDefaultTab)
		{
			findNewDefault=true;
		}
		else
		{
			findNewDefault=false;
		}

		tabIdDiv=document.getElementById(tabId);
		tabIdOptions=document.getElementById(tabId+"Options");
		tabIdIpRanges=document.getElementById(tabId+"IpRanges");
		parent=tabIdDiv.parentNode;

		parent.removeChild(tabIdDiv);
		parent.removeChild(tabIdOptions);
		parent.removeChild(tabIdIpRanges);
		children=0;

		for(var i=0; i<parent.childNodes.length;i++)
		{
			if(parent.childNodes[i].nodeType!=3)
			{
				children++;
				if(findNewDefault && parent.childNodes[i].id!="noTabs")
				{
					findNewDefault=false;
					currentDefaultTab="";
					saveDefaultTab(parent.childNodes[i].id);
				}
			}
		}
		if(children==1)
		{
			noTabs=document.getElementById("noTabs");
			noTabs.style.display="inline";
			currentDefaultTab="";
		}
	}

	function saveTabNameAjax()
	{
		data=req.responseXML.getElementsByTagName("data");
		tabId="tab"+getElementTextNS("", "tabId", data[0], 0);
		tabLabelName=document.getElementById(tabId+"LabelName");
		tabLabelName.innerHTML=getElementTextNS("", "tabName", data[0], 0);
		tabLabelName.style.display="inline";
		document.getElementById(tabId+"Label").className="";
		document.getElementById(tabId+"LabelNameEdit").style.display="none";
	}

	function saveIpRangeAjax()
	{
		data=req.responseXML.getElementsByTagName("data");
		tabId="tab"+getElementTextNS("", "tabId", data[0], 0);
		rangeId=tabId+"IpRange"+getElementTextNS("", "ipRangeId", data[0], 0);
		startIpValue=getElementTextNS("", "startIp", data[0], 0);
		endIpValue=getElementTextNS("", "endIp", data[0], 0);

		document.getElementById(rangeId+"Span").className="ipRange cell";
		startIpDiv=document.getElementById(rangeId+"StartIp");
		endIpDiv=document.getElementById(rangeId+"EndIp");
		startIpDiv.innerHTML=startIpValue;
		endIpDiv.innerHTML=endIpValue;
		startIpDiv.style.display="inline";
		endIpDiv.style.display="inline";
		document.getElementById(rangeId+"StartIpEdit").style.display="none";
		document.getElementById(rangeId+"EndIpEdit").style.display="none";
		document.getElementById(rangeId+"Save").style.display="none";
	}

	function removeIpRangeAjax()
	{
		data=req.responseXML.getElementsByTagName("data");
		tabId="tab"+getElementTextNS("", "tabId", data[0], 0);
		rangeId=tabId+"IpRange"+getElementTextNS("", "ipRangeId", data[0], 0);

		rangeIdDiv=document.getElementById(rangeId);
		parent=rangeIdDiv.parentNode;
		parent.removeChild(rangeIdDiv);
		children=0;
		for(var i=0; i<parent.childNodes.length;i++)
		{
			if(parent.childNodes[i].nodeType!=3)
			{
				children++;
			}
		}
		if(children==0)
		{
			tabIdArray=rangeId.split("I");
			addIpRange(tabIdArray[0]);
		}
	}

	function saveDefaultTabAjax()
	{
		data=req.responseXML.getElementsByTagName("data");
		tabNumber=getElementTextNS("", "tabId", data[0], 0);
		tabId="tab"+tabNumber;

		document.getElementById(tabId+"LabelDefault").style.display="inline";
		eval("document.mainForm."+tabId+"OptionsDefaultCheckbox.disabled=true;");
		eval("document.mainForm."+tabId+"OptionsDefaultCheckbox.checked=true;");
		if(currentDefaultTab!='')
		{
			document.getElementById("tab"+currentDefaultTab+"LabelDefault").style.display="none";
			eval("document.mainForm.tab"+currentDefaultTab+"OptionsDefaultCheckbox.disabled=false;");
			eval("document.mainForm.tab"+currentDefaultTab+"OptionsDefaultCheckbox.checked=false;");
		}
		currentDefaultTab=tabNumber;
	}