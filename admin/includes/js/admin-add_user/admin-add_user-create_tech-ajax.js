	function addTeach()
	{
		req.responseXML="";
		uidsOut=new Array();
		for(var i=0;i<uidArray.length;i++)
		{
			eval ("uidsOut["+uidsOut.length+"]='"+uidArray[i]+",'+document.techForm."+uidArray[i]+"Status[document.techForm."+uidArray[i]+"Status.selectedIndex].value");
		}
		xmlInit = addTechUpdateAjax;
		//alert("includes/php/management_add_user/management_add_user-insert-ajax.php?uids="+uidsOut.join(";"));
		loadXMLDoc(protocol+server+"/admin/includes/php/admin-add_user/admin-add_user-insert-ajax.php?uids="+uidsOut.join(";"));//uidArray.join(",")
	}

	function addTechUpdateAjax()
	{
		techs=req.responseXML.getElementsByTagName("tech");
		for(var i=0;i<techs.length;i++)
		{
			uid=getElementTextNS("", "uid", techs[i],0);
			if(getElementTextNS("", "insert", techs[i],0)=="false")
			{	
				backgroundColor="red";
			}
			else
			{	
				backgroundColor="green";
				document.getElementById(uid+"CheckBox").disabled=true;
				document.getElementById(uid+"Status").disabled=true;
			}
			setTimeout("fadeRowBackground('"+uid+"Item', '"+backgroundColor+"', "+0+")",100);
		}
	}