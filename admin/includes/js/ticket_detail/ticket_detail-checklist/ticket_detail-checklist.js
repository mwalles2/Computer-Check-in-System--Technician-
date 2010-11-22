		<!--
			//Checklist Tab functions/variables

			function addNote(button,action)
			{
				if(action=="show")
				{ 
					addBox=document.getElementById(button.name.substring(0,button.name.indexOf("AddButton"))+"AddBox");
					noteDiv=document.getElementById(button.name.substring(0,button.name.indexOf("AddButton"))+"Note");
					addDiv=document.getElementById(button.name.substring(0,button.name.indexOf("AddButton"))+"Add");
					if (noteDiv.innerHTML!="")
					{
						noteDiv.className="checklist_note";
					}
					addDiv.className="add_box";
					addBox.focus();
				}
				else if(action=="cancel")
				{
					noteDiv=document.getElementById(button.name.substring(0,button.name.indexOf("AddCancel"))+"Note");
					addDiv=document.getElementById(button.name.substring(0,button.name.indexOf("AddCancel"))+"Add");
					noteDiv.className="hidden";
					addDiv.className="hidden";
				}
				else if(action=="add")
				{
					addBox=document.getElementById(button.name.substring(0,button.name.indexOf("AddAdd"))+"AddBox");
					noteDiv=document.getElementById(button.name.substring(0,button.name.indexOf("AddAdd"))+"Note");
					addDiv=document.getElementById(button.name.substring(0,button.name.indexOf("AddAdd"))+"Add");
					if (noteDiv.innerHTML!="")
					{
						noteDiv.innerHTML+="<br>";
					}
					else
					{
						noteStatus=document.getElementById(button.name.substring(0,button.name.indexOf("AddAdd"))+"NoteStatus");
						noteStatus.innerHTML="X";
					}
					noteDiv.innerHTML+=addBox.value;
					addDiv.className="hidden";
					checklistTabAddNote(button.name.replace(/\D*(\d+)\D*/,"$1"),addBox.value);
				}
			}

			function checklistStatus(select)
			{
				var itemNum=select.name.replace(/\D*(\d+)\D*/,"$1");
				var noteRow=document.getElementById(select.name.substring(0,select.name.indexOf("Select"))+"Row");
				noteRow.className=select[select.selectedIndex].value;
				checklistTabStatus(itemNum,select[select.selectedIndex].value)
			}
			
			function checlistNoteHideShow(item,hideShow)
			{
				var log=document.getElementById("log");
				var checklistItem=document.getElementById(item);
				if(checklistItem.innerHTML!="")
				{
					(hideShow=="s")?checklistItem.className="checklist_note":checklistItem.className="hidden";
				}
			//log.innerHTML+="checlistNoteHideShow -> checklistItem.className ="+checklistItem.className+"<br>";
			}
		//-->