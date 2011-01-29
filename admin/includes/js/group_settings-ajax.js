	function updateCheckbox(item)
	{
		xmlInit = doNothing;
		var itemArray=item.name.split("_");
		//alert(protocol+server+"/admin/includes/php/group_settings-ajax.php?action=update&item="+itemArray[0]+"&value="+item.checked+"&gsid="+itemArray[1])
		loadXMLDoc(protocol+server+"/admin/includes/php/group_settings-ajax.php?action=update&item="+itemArray[0]+"&value="+item.checked+"&gsid="+itemArray[1]);
	}