	function showLocation()
	{
		newLocation=document.mainForm.locationSelect[document.mainForm.locationSelect.selectedIndex].value;
		if(newLocation=="All")
		{
			computerTypeColWidth="15%";
			locationColDisplay="inline";
		}
		else
		{
			computerTypeColWidth="20%";
			locationColDisplay="none";
		}
		for(i=0; i<document.styleSheets.length; i++)
		{
			if(document.styleSheets[i].href.indexOf("list_computer_css.php") != -1)
			{
				for(j=0; j<document.styleSheets[i].cssRules.length; j++)
				{
					if(document.styleSheets[i].cssRules[j].selectorText==".computer_type_col")
					{
						document.styleSheets[i].cssRules[j].style.width=computerTypeColWidth;
					}
					else if(document.styleSheets[i].cssRules[j].selectorText==".location_col")
					{
						document.styleSheets[i].cssRules[j].style.display=locationColDisplay;
					}
					else if(document.styleSheets[i].cssRules[j].selectorText.indexOf("locid") != -1)
					{
						if(document.styleSheets[i].cssRules[j].selectorText==".locid"+newLocation)
						{
							document.styleSheets[i].cssRules[j].style.display="inline";
						}
						else
						{
							document.styleSheets[i].cssRules[j].style.display="none";
						}
					}
				}
			}
		}
	}