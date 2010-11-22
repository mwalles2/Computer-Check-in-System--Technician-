	<script type="text/javascript" language="javascript">
	<!--
		var laptopArray=new Array();
{LAPTOPARRAY}

		var desktopArray=new Array();
{DESKTOPARRAY}

		function highlightRow(selectObj)
		{
//alert(document.getElementById("{FIRSTDESKTOP}").id);
			if(selectObj[selectObj.selectedIndex].value=="desk")
			{
				document.getElementById("{FIRSTDESKTOP}").className="cell highlight";
				document.getElementById("{FIRSTLAPTOP}").className="cell";
			}
			else if(selectObj[selectObj.selectedIndex].value=="lap")
			{
				document.getElementById("{FIRSTLAPTOP}").className="cell highlight";
				document.getElementById("{FIRSTDESKTOP}").className="cell";
			}
			else
			{
				document.getElementById("{FIRSTDESKTOP}").className="cell";
				document.getElementById("{FIRSTLAPTOP}").className="cell";
			}
		}

		function hideType(selectObj)
		{
			if(selectObj[selectObj.selectedIndex].value=="desk")
			{
				for (var i=0; i<desktopArray.length;i++)
				{
					document.getElementById(desktopArray[i]).style.display="inline";
				}
				for (var i=0; i<laptopArray.length;i++)
				{
					document.getElementById(laptopArray[i]).style.display="none";
				}
			}
			else if(selectObj[selectObj.selectedIndex].value=="lap")
			{
				for (var i=0; i<desktopArray.length;i++)
				{
					document.getElementById(desktopArray[i]).style.display="none";
				}
				for (var i=0; i<laptopArray.length;i++)
				{
					document.getElementById(laptopArray[i]).style.display="inline";
				}
			}
			else
			{
				for (var i=0; i<desktopArray.length;i++)
				{
					document.getElementById(desktopArray[i]).style.display="inline";
				}
				for (var i=0; i<laptopArray.length;i++)
				{
					document.getElementById(laptopArray[i]).style.display="inline";
				}
			}
		}
	//-->
	</script>
