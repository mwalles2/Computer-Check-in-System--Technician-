	function hideShow(button)
	{
		var log=document.getElementById("log");
		hideDiv=document.getElementById(button.name);
		if(button.value=="Hide")
		{
			hideDiv.style.display="none";
			button.value="Show";
		}
		else
		{
			hideDiv.style.display="inline";
			button.value="Hide";
		}
	}

	function doNothing()
	{
		/*if(xmlInitAuth())
		{
			return false;
		}*/
		return true;
	}

	function addText(string, itemId)
	{
		item=document.getElementById(itemId);
		if (document.selection)
		{
			item.focus();
			selection = document.selection.createRange();
			selection.text = string;
		}
		else if (item.selectionStart)
		{
			var startPos = item.selectionStart;
			var endPos = item.selectionEnd;
			item.value = item.value.substring(0, startPos)+ string+ item.value.substring(endPos, item.value.length);
			item.focus();
		}
		else
		{
			item.value += string;
			item.focus();
		}
	}
