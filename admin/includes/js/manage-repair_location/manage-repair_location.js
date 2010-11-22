	editTabNameActive=false;
	editIpRangeActive=false;

	function editTabName(tabId)
	{
		editTabNameActive = true;
		document.getElementById(tabId+"Label").className="active";
		document.getElementById(tabId+"LabelName").style.display="none";
		document.getElementById(tabId+"LabelNameEdit").style.display="inline";
		eval("document.mainForm."+tabId+"LabelNameEditTextbox.focus()");
	}

	function saveTabName(tabId)
	{
		eval("tabName=document.mainForm."+tabId+"LabelNameEditTextbox.value");

		xmlInit=saveTabNameAjax;
		//alert(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-tab-ajax.php?action=saveTabName&tabId="+tabId+"&name="+tabName);
		loadXMLDoc(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-tab-ajax.php?action=saveTabName&tabId="+tabId+"&name="+tabName);
	}

	function editTabOptions(tabId)
	{
		if(!editTabNameActive)
		{
			tabOptions = document.getElementById(tabId+"Options")
			if(tabOptions.style.display=="none")
			{
				tabOptions.style.display="block";
			}
			else
			{
				tabOptions.style.display="none";
			}
		}
		else
		{
			editTabNameActive = false;
		}
	}

	function saveDefaultTab(tabId)
	{
		xmlInit=saveDefaultTabAjax;
		//alert(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-tab-ajax.php?action=SaveDefaultTab&tabId="+tabId+"&oldDefault="+currentDefaultTab);
		if(tabId != "tab"+currentDefaultTab)
		{
			loadXMLDoc(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-tab-ajax.php?action=SaveDefaultTab&tabId="+tabId+"&oldDefault="+currentDefaultTab);
		}
	}

	function editIpRange(rangeId)
	{
		if(!editIpRangeActive)
		{
			document.getElementById(rangeId+"Span").className="ipRange cell active";
			document.getElementById(rangeId+"StartIp").style.display="none";
			document.getElementById(rangeId+"StartIpEdit").style.display="inline";
			document.getElementById(rangeId+"EndIp").style.display="none";
			document.getElementById(rangeId+"EndIpEdit").style.display="inline";
			document.getElementById(rangeId+"Save").style.display="inline";
		}
		else
		{
			editIpRangeActive=false;
		}
	}

	function saveIpRange(rangeId)
	{
		editIpRangeActive=true;

		eval("startIpValue=document.mainForm."+rangeId+"StartIpEditTextbox.value");
		eval("endIpValue=document.mainForm."+rangeId+"EndIpEditTextbox.value");

		if(checkIpRange(startIpValue,endIpValue))
		{
			xmlInit=saveIpRangeAjax;
			//alert(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-iprange-ajax.php?action=saveIpRange&ipRangeId="+rangeId+"&startIp="+startIpValue+"&endIp="+endIpValue);
			loadXMLDoc(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-iprange-ajax.php?action=saveIpRange&ipRangeId="+rangeId+"&startIp="+startIpValue+"&endIp="+endIpValue);
		}
	}

	function removeIpRange(rangeId)
	{
		xmlInit=removeIpRangeAjax;
		//alert(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-iprange-ajax.php?action=removeIpRange&ipRangeId="+rangeId);
		loadXMLDoc(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-iprange-ajax.php?action=removeIpRange&ipRangeId="+rangeId);
	}

	function checkIpRange(startIp,endIp)
	{
		startIpArray=startIp.split(".");
		endIpArray=endIp.split(".");
		if(startIpArray[0]<=endIpArray[0]&&startIpArray[1]<=endIpArray[1]&&startIpArray[2]<=endIpArray[2]&&startIpArray[3]<=endIpArray[3])
		{
			return true;
		}
		//alert("checkIpRange: false");
		return false;
	}

	function addTab()
	{
		//alert("addTab");
		xmlInit=addTabAjax;
		//alert(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-tab-ajax.php?action=addTab");
		loadXMLDoc(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-tab-ajax.php?action=addTab");
	}

	function removeTab(tabId)
	{
		xmlInit=removeTabAjax;
		alert(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-tab-ajax.php?action=removeTab&tabId="+tabId);
		loadXMLDoc(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-tab-ajax.php?action=removeTab&tabId="+tabId);
	}

	function addIpRange(tabId)
	{
		xmlInit=addIpRangeAjax;
		//alert(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-tab-ajax.php?action=addIpRange&tabId="+tabId);
		loadXMLDoc(protocol+server+"/admin/includes/php/manage-repair_location/manage-repair_location-tab-ajax.php?action=addIpRange&tabId="+tabId);
	}