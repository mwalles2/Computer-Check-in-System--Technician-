	function updateTechStatus(uid, status)
	{
		xmlInit=updateTechStatusAjax;
		loadXMLDoc(protocol+server+"includes/php/admin-edit_user.php?uid="+uid+"&status="+status[status.selectedIndex].value);
		//alert("includes/php/admin-edit_user.php?uid="+uid+"&status="+status[status.selectedIndex].value);
	}

	function updateTechStatusAjax()
	{
		tech=req.responseXML.getElementsByTagName("tech");
		if(getElementTextNS("", "insert", tech[0],0)=="false")
		{
			backgroundColor="red";
		}
		else
		{
			backgroundColor="green";
		}
		setTimeout("fadeRowBackground('fade"+getElementTextNS("", "uid", tech[0],0)+"', '"+backgroundColor+"', "+0+")",100);
	}