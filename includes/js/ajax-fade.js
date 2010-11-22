		<!--
			var fadeTimeout = new Array();
			function fade(item, time)
			{
				itemDiv=document.getElementById(item);
				if (fade.arguments.length == 1)
				{
					time=7000;
					itemDiv.style.opacity=1;
					itemDiv.style.filter="alpha(opacity="+100+")";
				}
				if(time<5000)
				{
					i=time/50;
					j  = i/100;
					itemDiv.style.opacity=j;
					itemDiv.style.filter="alpha(opacity="+i+")";
				}
				if(time<=0)
				{
					item.zIndex=-1;
					return true;
				}
				newTime=time-50;
				clearTimeout(fadeTimeout[item]);
				fadeTimeout[item] = setTimeout("fade('"+item+"',"+newTime+")",50);
			}

			function fade2(item)
			{
				itemDiv=document.getElementById(item);
				itemDiv.style.opacity=1;
				itemDiv.style.filter="alpha(opacity=100)";
				fade(item);
				item.zIndex=10;
			}
		//-->