	function fadeRowBackground(item, color, level)
	{
		hexNumber = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
		itemDiv=document.getElementById(item);
		if(color == "red")
		{
			cssColor="#F"+hexNumber[level]+hexNumber[level];
		}
		else
		{
			cssColor="#"+hexNumber[level]+"F"+hexNumber[level];
		}
		//alert(cssColor);
		itemDiv.style.backgroundColor=cssColor;
		if(level<15)
		{
			level++;
			setTimeout("fadeRowBackground('"+item+"', '"+color+"', "+level+")",50);
		}
		else
		{
			itemDiv.style.backgroundColor="transparent";
		}
	}