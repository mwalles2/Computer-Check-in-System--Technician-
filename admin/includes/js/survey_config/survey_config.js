	function startEdit(item)
	{
		item.className="cell editbox active";
		item.onclick="";
		for(var i=0;i<item.childNodes.length;i++)
		{
			if(item.childNodes[i].nodeType==1)
			{
				if((item.childNodes[i].tagName=="INPUT" && item.childNodes[i].type=="text") || item.childNodes[i].tagName=="TEXTAREA")
				item.childNodes[i].focus();
			}
		}
	}

	function saveEdit(itemId,content)
	{
		item=document.getElementById(itemId);

		//display glitch sometimes with multiple returns
		data=document.getElementById(content+"Input").value.replace(/(\n|\r)/g,"<br>");
		document.getElementById(content+"Div").innerHTML=data.replace("<","&lt;").replace(">","&gt;");
		var urlPattern=/([^;\w])/g;
		urlItemsToReplace=data.match(urlPattern);

		for(i in urlItemsToReplace)
		{
			code=urlItemsToReplace[i].charCodeAt(0).toString(16).toUpperCase();
			data=data.replace(urlItemsToReplace[i],"%"+code)
		}

		xmlInit=doNothing;
		//alert(protocol+server+"/admin/includes/php/survey_config-ajax.php?itemId="+content+"&content="+data);
		loadXMLDoc(protocol+server+"/admin/includes/php/survey_config-ajax.php?itemId="+content+"&content="+data);
		endEdit(item);
	}

	function cancelEdit(itemId,content)
	{
		item=document.getElementById(itemId);
		document.getElementById(content+"Input").value=document.getElementById(content+"Div").innerHTML.replace("<br>","\n").replace("&lt;","<").replace("&gt;",">").replace("&amp;","&");
		endEdit(item);
	}

	function endEdit(item)
	{
		item.className="cell editbox";
		setTimeout("item.onclick=function(){startEdit(this)}",10);
	}