	function administrationSetExpressAjax()
	{
		xmlInit = administrationSetExpressUpdateAjax;
		if(document.mainForm.administrationExpressCheckBox.checked)
		{
			expressValue = 1;
		}
		else
		{
			expressValue = 0;
		}
		ajaxQuery=protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-administration/ticket_detail-administration-ajax.php?tid="+tid+"&action=express&value="+expressValue;
		//alert(ajaxQuery);
		loadXMLDoc(ajaxQuery);
	}

	function administrationSetWarrantyAjax()
	{
		xmlInit = administrationSetExpressUpdateAjax;
		if(document.mainForm.administrationWarrantyCheckBox.checked)
		{
			expressValue = 1;
		}
		else
		{
			expressValue = 0;
		}
		ajaxQuery=protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-administration/ticket_detail-administration-ajax.php?tid="+tid+"&action=warranty&value="+expressValue;
		//alert(ajaxQuery);
		loadXMLDoc(ajaxQuery);
	}

	function administrationSetRepairStatusAjax()
	{
		xmlInit = doNothing;
		ajaxQuery=protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-administration/ticket_detail-administration-ajax.php?tid="+tid+"&action=repairtype&value="+document.mainForm.administrationRepairTypeSelect[document.mainForm.administrationRepairTypeSelect.selectedIndex].value+"&text="+document.mainForm.administrationRepairTypeSelect[document.mainForm.administrationRepairTypeSelect.selectedIndex].innerHTML
		//alert(ajaxQuery);
		loadXMLDoc(ajaxQuery);
	}

	function administrationCheckInOutAjax()
	{
		xmlInit = administrationCheckInOutUpdateAjax;

		if(document.mainForm.administrationcCheckInOutButton.value == "Check-out")
		{
			action = "checkout";
		}
		else
		{
			action = "checkin";
		}
		//alert(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-administration/ticket_detail-administration-ajax.php?tid="+tid+"&action="+action);
		loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-administration/ticket_detail-administration-ajax.php?tid="+tid+"&action="+action);
	}

	function administrationCheckInOutUpdateAjax()
	{
		data=req.responseXML.getElementsByTagName("data");
		action = getElementTextNS("", "action", data[0], 0);
		if(action == "checkin")
		{
			document.mainForm.administrationcCheckInOutButton.value = "Check-out";
			document.mainForm.statusSelect.disabled = false;
			children = document.mainForm.statusSelect.childNodes;
			for(var i=0; i<children.length; i++)
			{
				if(children[i].value=="tech")
				{
					children[i].selected = true;
				}
				else if(children[i].value=="pickedup")
				{
					document.mainForm.statusSelect.removeChild(children[i]);
				}
			}
		}
		else if(action == "checkout")
		{
			document.mainForm.administrationcCheckInOutButton.value = "Check-in";
			document.mainForm.statusSelect.disabled = true;
			document.mainForm.statusSelect[document.mainForm.statusSelect.selectedIndex].selected = false;
			var pickedupOption=document.createElement("option");
			pickedupOption.value="pickedup";
			pickedupOption.innerHTML="Picked Up";
			pickedupOption.selected = true;
			document.mainForm.statusSelect.appendChild(pickedupOption);
		}
		getElementTextNS("", "", data[0], 0);
	}

	function administrationSetExpressUpdateAjax()
	{
		data=req.responseXML.getElementsByTagName("data");
		status=getElementTextNS("", "status", data[0], 0);
		if(document.mainForm.administrationExpressCheckBox.checked && status=="new")
		{
			children = document.mainForm.statusSelect.childNodes;
			for(var i=0; i<children.length; i++)
			{
				if(children[i].value=="tech")
				{
					children[i].selected = true;
				}
			}
		}
	}

	function administrationSetWarrantyUpdateAjax()
	{
		data=req.responseXML.getElementsByTagName("data");
		status=getElementTextNS("", "status", data[0], 0);
		if(document.mainForm.administrationExpressCheckBox.checked && status=="new")
		{
			children = document.mainForm.statusSelect.childNodes;
			for(var i=0; i<children.length; i++)
			{
				if(children[i].value=="tech")
				{
					children[i].selected = true;
				}
			}
		}
	}