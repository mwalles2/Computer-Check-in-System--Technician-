	<!--
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++)
		{
			var pair = vars[i].split("=");
			if (pair[0] == "tid")
			{
				tid = pair[1];
			}
		}

		function doNothing()
		{
			if(xmlInitAuth())
			{
				return false;
			}
			return true;
		}

		function editMultiple(feild, itemData, tab)
		{
			xmlInit = editMultipleAjax;
			//alert(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-ajax.php?action=update&tid="+tid+"&feild="+feild+"&value="+itemData+"&tab="+tab);
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-ajax.php?action=update&tid="+tid+"&feild="+feild+"&value="+itemData+"&tab="+tab);
		}

		function editMultipleAjax()
		{
			data=req.responseXML.getElementsByTagName("data");
			tab = getElementTextNS("", "tab", data[0], 0);
			feild = getElementTextNS("", "feild", data[0], 0);
			value = getElementTextNS("", "value", data[0], 0);
			for(i=0; i<databaseItems[feild].length;i++)
			{
				tabFeild=document.getElementById(feild+"-"+databaseItems[feild][i]);
				tabFeild.innerHTML=value;
			}
		}
	//-->