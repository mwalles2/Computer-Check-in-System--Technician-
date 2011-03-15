	function startEdit(item)
	{
		item.className="cell editbox active";
		item.onclick="";
	}

	function saveEdit(itemId,content)
	{
		item=document.getElementById(itemId);
		document.getElementById(content+"Div").innerHTML=document.getElementById(content+"Input").value.replace(/(\n|\r)/g,"<br>");
		endEdit(item);
	}

	function cancelEdit(itemId,content)
	{
		item=document.getElementById(itemId);
		document.getElementById(content+"Input").value=document.getElementById(content+"Div").innerHTML.replace("<br>","\n");			
		endEdit(item);
	}

	function endEdit(item)
	{
		item.className="cell editbox";
		setTimeout("item.onclick=function(){startEdit(this)}",10);
	}
