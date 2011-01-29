	function activeCheckbox(item)
	{
		var itemArray=item.name.split("_");
		eval("document.mainForm.admin_"+itemArray[1]+".disabled=!item.checked");
		eval("document.mainForm.checkin_"+itemArray[1]+".disabled=!item.checked");
		eval("document.mainForm.checkout_"+itemArray[1]+".disabled=!item.checked");
		eval("document.mainForm.view_"+itemArray[1]+".disabled=!item.checked");
		updateCheckbox(item);
	}
	
	function updateName(item)
	{
		if(item.className.indexOf("active")==-1)
		{
			alert("active");
			item.className=item.className+" active";
		}
		else
		{
			alert("no active");
			item.className="cell header";
		}
	}