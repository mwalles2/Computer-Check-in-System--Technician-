	function techSearch()
	{
		document.getElementById("updating").style.display="inline";
		clearSearch();
		xmlInit = techSearchUpdateAjax;
		loadXMLDoc(protocol+server+"/admin/includes/php/admin-add_user/admin-add_user-search-ajax.php?field="+document.mainForm.searchField[document.mainForm.searchField.selectedIndex].value+"&string="+document.mainForm.seachText.value);
		//alert(protocol+server+"/admin/includes/php/admin-add_user/admin-add_user-search-ajax.php?field="+document.mainForm.searchField[document.mainForm.searchField.selectedIndex].value+"&string="+document.mainForm.seachText.value);
	}

 	function techSearchUpdateAjax()
 	{
		document.mainForm.seachText.value="";
		document.getElementById("updating").style.display="none";
		techs=document.getElementById("techs");
		person=req.responseXML.getElementsByTagName("person");
		if(person.length<1)
		{
			techs.innerHTML="<div class=\"row\">No results found</div>";
		}
		else
		{
 			for (var i=0; i<person.length; i++)
			{
				personDiv = techSearchPerson(person[i]);
				techs.appendChild(personDiv);
			}
			document.getElementById("addTechRow").style.display="block";
		}
	}