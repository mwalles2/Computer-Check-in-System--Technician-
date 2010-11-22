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
		if(xmlInitAuth())
		{
			return false;
		}
		return true;
	}
