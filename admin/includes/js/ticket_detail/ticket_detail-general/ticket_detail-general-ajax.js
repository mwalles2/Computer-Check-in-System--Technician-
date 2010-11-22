	<!--
		function generalTabStatusAjax()
		{
			xmlInit = doNothing;
			//alert("generalTabStatusAjax");
			//alert(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=status&tid="+tid+"&status="+document.mainForm.statusSelect[document.mainForm.statusSelect.selectedIndex].value+"&untildate="+document.mainForm.waitUntilDate.value);
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=status&tid="+tid+"&status="+document.mainForm.statusSelect[document.mainForm.statusSelect.selectedIndex].value+"&untildate="+document.mainForm.waitUntilDate.value);
		}

		function generalTabDeleteRowAjax(item, rowNum)
		{
			xmlInit = doNothing;
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=delete&tid="+tid+"&item="+item+"&row="+rowNum);
		}

		function generalTabMoveNoteAjax(nid, type)
		{
			xmlInit = doNothing;
			//alert(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=moveNote&nid="+nid+"&type="+type);
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=moveNote&nid="+nid+"&type="+type);
		}

		function generalTabEditAjax(item, data, newItem, multiple)
		{
			//alert(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=edit&tid="+tid+"&item="+item+"&value="+data+"&new="+newItem);
			if(newItem)
			{
				xmlInit = generalTabEditUpdateAjax;
			}
			else
			{
				xmlInit = doNothing;
			}
			//alert(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=edit&tid="+tid+"&item="+item+"&value="+data+"&item_num="+multiple+"&new_item="+newItem);
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=edit&tid="+tid+"&item="+item+"&value="+data+"&item_num="+multiple+"&new_item="+newItem);
			//alert(data);
		}

		function generalTabSaveNoteAjax(type, id, note, date)
		{
			var log=document.getElementById("log");
			log.innerHTML+="generalTabSaveNoteAjax()<br>";

			note=note.replace(/%/g,"%25");
			note=note.replace(/\+/g,"%2B");
			note=encodeURI(note);
			note=note.replace(/ /g,"%20");
			note=note.replace(/!/g,"%21");
			note=note.replace(/"/g,"%22");
			note=note.replace(/#/g,"%23");
			note=note.replace(/\$/g,"%24");
			note=note.replace(/&/g,"%26");
			note=note.replace(/'/g,"%27");
			note=note.replace(/\(/g,"%28");
			note=note.replace(/\)/g,"%29");
			note=note.replace(/\*/g,"%2A");
			note=note.replace(/,/g,"%2C");
			note=note.replace(/-/g,"%2D");
			note=note.replace(/\./g,"%2E");
			note=note.replace(/\//g,"%2F");
			note=note.replace(/:/g,"%3A");
			note=note.replace(/;/g,"%3B");
			note=note.replace(/</g,"%3C");
			note=note.replace(/=/g,"%3D");
			note=note.replace(/>/g,"%3E");
			note=note.replace(/\?/g,"%3F");
			note=note.replace(/@/g,"%40");
			note=note.replace(/\^/g,"%5E");
			note=note.replace(/_/g,"%60");
			note=note.replace(/`/g,"%61");
			note=note.replace(/\{/g,"%7B");
			note=note.replace(/\|/g,"%7C");
			note=note.replace(/\}/g,"%7D");
			note=note.replace(/~/g,"%7E");

			xmlInit = generalTabSaveNoteUpdateAjax;
			//alert(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=addNotes&tid="+encodeURI(tid)+"&type="+encodeURI(type)+"&id="+encodeURI(id)+"&note="+note+"&date="+encodeURI(date));
			//loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=addNotes&tid="+tid+"&type="+type+"&id="+id+"&note="+note+"&date="+encodeURI(date));
			log.innerHTML+="-- call loadXMLDoc<br>";
			//alert(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=addNote&tid="+tid+"&type="+type+"&id="+id+"&note="+note+"&date="+encodeURI(date));
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=addNote&tid="+tid+"&type="+type+"&id="+id+"&note="+note+"&date="+encodeURI(date));
			log.innerHTML+="-- loadXMLDoc return<br>";
		}

		function generalTabSaveNoteUpdateAjax()
		{
			var log=document.getElementById("log");
			log.innerHTML+="generalTabSaveNoteUpdateAjax()<br>";
			if(xmlInitAuth())
			{
				return false;
			}
			data=req.responseXML.getElementsByTagName("data");
			mysql=req.responseXML.getElementsByTagName("mysql");
			log.innerHTML+="-- mysql.length = "+mysql.length+"<br>";
			noteType=getElementTextNS("", "type", data[0], 0);		//what type of note is it
			noteNum=getElementTextNS("", "notenum", data[0], 0);	//what the current number of the note is
			newNum=getElementTextNS("", "newnum", data[0], 0);		//what the new number is.  This is the id number in the database

			//alert(noteType+noteNum+"New")
			noteRow=document.getElementById(noteType+noteNum+"New");
			noteRow.id=noteType+newNum;

			noteInfo=document.getElementById(noteType+noteNum+"InfoNew");
			noteInfo.id=noteType+newNum+"Info";

			noteDate=document.getElementById(noteType+noteNum+"DateNew");
			noteDate.id=noteType+newNum+"Date";

			noteNote=document.getElementById(noteType+noteNum+"NoteNew");
			noteNote.id=noteType+newNum+"Note";

			noteButton=document.getElementById(noteType+noteNum+"ButtonNew");
			noteButton.id=noteType+newNum+"Button";
			noteButton.name=noteType+newNum+"Button";

			document.mainForm.comment.value = "";

			generalTableNoteCheckStatus();
		}

		function generalTabEditUpdateAjax()
		{
			if(xmlInitAuth())
			{
				return false;
			}
			var i;
			data=req.responseXML.getElementsByTagName("data");
			classname=getElementTextNS("", "item", data[0], 0);
			classnum=getElementTextNS("", "itemnum", data[0], 0);
			newItem=getElementTextNS("", "newitem", data[0], 0);
			udateRow=document.getElementById(classname+classnum+"RowNew");
			udateRow.id=classname+newItem+"Row";
			for(i = 0; i < items[classname].length; i++)
			{
				updateItem=document.getElementById(classname+items[classname][i]+classnum+"New");
				updateItem.id=classname+items[classname][i]+newItem;
			}
			updateEdit=document.getElementById(classname+"Edit"+classnum+"New");
			updateEdit.id=classname+"Edit"+newItem;
			updateEditButton=document.getElementById(classname+"EditButton"+classnum+"New");
			updateEditButton.id=classname+"EditButton"+newItem;
			var itemName=classname+newItem;
			//alert(itemName);
			updateEditButton.onclick=function() {edit(itemName,this)};
		}

		function generalTableNoteCheckStatus()
		{
			switch (document.mainForm.statusSelect[document.mainForm.statusSelect.selectedIndex].value)
			{
				case "user":
					alert (user);
					break;
			}
		}

		function generalTabChangeLocationAjax()
		{
			//alert(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=changeLocation&tid="+tid+"&locid="+document.mainForm.locationSelect[document.mainForm.locationSelect.selectedIndex].value)
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-ajax.php?action=changeLocation&tid="+tid+"&locid="+document.mainForm.locationSelect[document.mainForm.locationSelect.selectedIndex].value);
		}
	//-->
