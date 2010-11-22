		<!--
			var tabs=new Array();
			tabs[0]="generalTab";
			tabs[1]="checklistTab";
			tabs[2]="chargesTab";
			tabs[3]="administrationTab";

			function changeTab(tab)
			{
				var log=document.getElementById("log");
			log.innerHTML+="changeTab -> <br>";
			log.innerHTML+="changeTab -> tab.innerHTML = "+tab.innerHTML+"<br>"
				for(i=0; i< tabs.length;i++)
				{
					tempTab=document.getElementById(tabs[i]);
					tempTab.className="cell tab_inactive";
					tempTabData=document.getElementById("tab"+tempTab.innerHTML);
					tempTabData.style.display="none";
				}
				tab.className="cell tab_active";
				tabData=document.getElementById("tab"+tab.innerHTML);
				tabData.style.display="inline";
			}
		-->