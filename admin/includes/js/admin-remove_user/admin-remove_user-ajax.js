	function updateTechDelete(uid)
	{
		xmlInit=updateTechDeleteAjax;
		loadXMLDoc(protocol+server+"includes/php/admin-remove_user.php?uid="+uid);
		//alert("includes/php/admin-remove_user.php?uid="+uid);
	}

	function updateTechDeleteAjax()
	{
		tech=req.responseXML.getElementsByTagName("tech");
		if(getElementTextNS("", "insert", tech[0],0)=="false")
		{
			backgroundColor="red";
		}
		else
		{
			backgroundColor="green";
			document.getElementById("name"+getElementTextNS("", "uid", tech[0],0)).style.textDecoration=line-through;
			document.getElementById("username"+getElementTextNS("", "uid", tech[0],0)).style.textDecoration=line-through;
			document.getElementById("nuid"+getElementTextNS("", "uid", tech[0],0)).style.textDecoration=line-through;
			document.getElementById("remove"+getElementTextNS("", "uid", tech[0],0)).disabled=true;
		}
		setTimeout("fadeRowBackground('fade"+getElementTextNS("", "uid", tech[0],0)+"', '"+backgroundColor+"', "+0+")",100);
	}