	<!--
		/*This is a temporary hack for the multi-edit.  In the future all of the edit options will effectivly 
		  be multi-edit and this will be a auto gened array that will be added to the top the the ticket detail page*/
		  
			var databaseItems=new Object();
			databaseItems["serialnum"]=new Array("general","administration");

			function editMultiTab(feild, tab, button)
			{
				var editFeild=document.getElementById(feild+"-"+tab);
				if(button.value=="E")
				{
					var editFeildValue=editFeild.innerHTML.replace(/^\s+|\s+$/g, '');
					editFeild.innerHTML="";
					editFeild.innerHTML="<input type=\"text\" name=\""+tab+feild+"\" value=\""+editFeildValue+"\">";
					button.value="D";
				}
				else
				{
					eval("itemForm = document.mainForm."+tab+feild);
					itemData = itemForm.value;
					editMultiple(feild, itemData, tab)
				}
			}

	-->