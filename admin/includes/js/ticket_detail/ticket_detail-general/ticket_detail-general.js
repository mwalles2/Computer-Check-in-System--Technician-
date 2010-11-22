		<!--
			//functions/varablies for general tab

			var multiple=false;
			var newItems = new Array();
			newItems["mac"]=0;
			newItems["account"]=0;
			newItems["note"]=0;
			newItems["email"]=0;
			newItems["phone"]=0;

			var items=new Array();
			items["phone"]="text";
			items["email"]="text";
			items["serialnum"]="text";
			items["cardEth"]=new Array("yes","no");
			items["cardWireless"]=new Array("yes","no");
			items["laptopPower"]=new Array("yes","no");
			items["laptopCase"]=new Array("yes","no");

			items["mac"]=new Array("Address","Type","Form");
			items["macAddress"]="text";
			items["macType"]=new Array("Wired","Wireless");
			items["macForm"]=new Array("External","Internal");

			items["account"]=new Array("Username","Password");
			items["accountUsername"]="text";
			items["accountPassword"]="text";

			function edit(item, button)
			{
				var log=document.getElementById("log");

				var itemName=item.replace(/(\D+)\d*(New)?/,"$1");
				var itemNum=item.replace(/\D*(\d+)(New)?/,"$1");
				(item.replace(/\D*\d*(New)?/,"$1")=="New")?newItem=true:newItem=false;

				if(item!=itemName && !multiple)
				{
					var outData="";
					var className = itemName;
					var classNum = itemNum;
					multiple=true;
					for(i=0;i<items[className].length;i++)
					{
						if(button.value=="D")
						{
							var outItem;
							var outDiv;

							(newItem)?outItem=className+items[className][i]+classNum+"New":outItem=className+items[className][i]+classNum;
							//alert(className+items[className][i]);
							if(items[className+items[className][i]]=="text")
							{
								eval("outDiv=document.mainForm."+outItem);
								outData += outDiv.value+";";
							}
							else
							{
								outDiv=document.getElementById(outItem+"Select");
								outData += outDiv[outDiv.selectedIndex].value+";";
							}
						}
						if(newItem)
						{
							edit(className+items[className][i]+classNum+"New",button);
						}
						else
						{
							edit(className+items[className][i]+classNum,button);
						}
					}
					if(button.value=="E")
					{
						button.value="D";
					}
					else
					{
						outData = outData.substring(0,outData.length-1);
						generalTabEditAjax(className, outData, newItem, classNum);
						button.value="E";
					}
					multiple=false;
					return true;
				}
				else if(item==itemName)
				{
					multiple=false;
				}
				itemDiv = document.getElementById(item);
				if (button.value=="E")
				{
					itemData=itemDiv.innerHTML;
					if (items[itemName]=="text")
					{
						if(item=="phone" || item=="email")
						{
							if(item=="phone")
							{
								generalTabContactArray=generalTabPhoneId;
							}
							else
							{
								generalTabContactArray=generalTabEmailId;
							}
							itemDiv.innerHTML="";
							for(var i=0; i<generalTabContactArray.length;i++)
							{
								if(generalTabContactArray[i]!=undefined)
								{
									itemDiv.innerHTML+="<input type=\"button\" value=\"-\" onclick=\"document.mainForm."+item+i+".disabled=true; document.mainForm."+item+i+".value='DELETE';\"><input type=\"test\" value=\""+generalTabContactArray[i]+"\" name=\""+item+i+"\"><br>";
								}
							}
							itemDiv.innerHTML+="<input type=\"button\" value=\"+\" onclick=\"\">";
						}
						else
						{
							itemDiv.innerHTML="<input type=\"test\" value=\""+itemData+"\" name=\""+item+"\">";
						}
						
					}
					else
					{
						itemDiv.innerHTML="";
						selectItem=document.createElement("select");
						selectItem.id=item+"Select";

						for(j=0;j<items[itemName].length;j++)
						{
							optionItem=document.createElement("option");
							optionItem.text=items[itemName][j];
							if(items[itemName][j]==itemData)
							{
								optionItem.selected=true;
							}
							selectItem.appendChild(optionItem);
						}
						itemDiv.appendChild(selectItem);
					}
					if(!multiple)
					{
						button.value="D";
					}
				}
				else
				{
					if(items[itemName]!="text")
					{
						selectItem=document.getElementById(item+"Select");
						itemData=selectItem[selectItem.selectedIndex].value;
					}
					else
					{
						if(item=="phone")
						{
						}
						else if(item=="email")
						{
						}
						else
						{
							eval("itemForm = document.mainForm."+item);
							itemData = itemForm.value;
						}
					}
					itemDiv.innerHTML = itemData;
					if(!multiple)
					{
						generalTabEditAjax(item, itemData, newItem, multiple);
						button.value = "E";
					}
				}
			}

			function addRow(button)
			{
				var log=document.getElementById("log");
			//log.innerHTML+=button.onClick+"<br>";
			//log.innerHTML="start<br>";
			//log.innerHTML+="add() -> button.name = "+button.name+"<br>";
				var className=button.name.replace(/(\D+)Add/,"$1");
				var classDiv=document.getElementById(className+"s");
			//log.innerHTML+="add() -> className = "+className+"<br>";
				var cellNum=items[className].length;
				var cellSize=Math.floor(100/(cellNum+1));
				var cellExtra=100-((cellNum+1)*cellSize);
				var cellSizeLast=cellSize-(5-cellExtra);
			//log.innerHTML+="+newRow<br>";
				var newRow=document.createElement("div");
				newRow.id=className+newItems[className]+"RowNew";
			//log.innerHTML+="addRow -> newRow.id = "+newRow.id+"<br>";
				newRow.className="row";
			//log.innerHTML+="-newRow<br>";
			//log.innerHTML+="+deleteDiv<br>";
				var deleteDiv=document.createElement("div");
				deleteDiv.className="cell";
				deleteDiv.style.width=cellSize+"%";
			//log.innerHTML+="-deleteDiv<br>";
			//log.innerHTML+="+deleteButton<br>";
				var deleteButton=document.createElement("input");
				deleteButton.name=className+newItems[className]+"DeleteNew";
				deleteButton.type="button";
				deleteButton.value="-";
				deleteButton.onclick=function(){deleteRow(this)};
			//log.innerHTML+="-deleteButton<br>";
				deleteDiv.appendChild(deleteButton);
				newRow.appendChild(deleteDiv);
				for(i=0;i<cellNum;i++)
				{
			//log.innerHTML+="+newCell "+i+"<br>";
					var newCell=document.createElement("div");
					newCell.id=className+items[className][i]+newItems[className]+"New";
					newCell.className="cell";
					newCell.innerHTML="";
					(i+1==cellNum)?newCell.style.width=cellSizeLast+"%":newCell.style.width=cellSize+"%";
			//log.innerHTML+="-newCell "+i+"<br>";
					newRow.appendChild(newCell);
				}
			//log.innerHTML+="+editCell<br>";
				var editCell=document.createElement("div");
				editCell.id=className+"Edit"+newItems[className]+"New";
			//log.innerHTML+="--editCell.id="+editCell.id+"<br>";
				editCell.className="cell float_right";
				//editCell.style.float="right";
			//log.innerHTML+="-editCell<br>";
			//log.innerHTML+="+editButton<br>";
				var editButton=document.createElement("input");
				editButton.name=className+newItems[className]+"New";
				editButton.type="button";
				editButton.value="E";
				var itemName=className+newItems[className]+"New";
				editButton.onclick=function() {edit(itemName,this)};
				editButton.id=className+"EditButton"+newItems[className]+"New";
				//editButton.onclick=function() {alert('beep')};
			//log.innerHTML+="--"+itemName+"<br>";
			//log.innerHTML+="-editButton<br>";
				editCell.appendChild(editButton);
				newRow.appendChild(editCell);
				classDiv.appendChild(newRow);
				newItems[className]++;
			//log.innerHTML+=editButton.onclick+"<br>";
				editButton.click();
			}

			function deleteRow(button)
			{
				var newBool;
				var log=document.getElementById("log");
			//log.innerHTML+="deleteRow -> button.name = "+button.name+"<br>";
				var rowName=button.name.replace(/(\D+)\d+Delete(New)?/,"$1");
				var rowNum=button.name.replace(/\D*(\d+)Delete(New)?/,"$1");
				(button.name.replace(/\D*\d+Delete(New)?/,"$1")=="New")?newBool=true:newBool=false;
			//log.innerHTML+="deleteRow -> rowName = "+rowName+"<br>";
			//log.innerHTML+="deleteRow -> rowNum = "+rowNum+"<br>";
			//log.innerHTML+="deleteRow -> newBool = "+newBool+"<br>";
				var rowDivName=rowName+rowNum+"Row";
				(newBool)?rowDivName+="New":rowDivName=rowDivName;
				var rowDiv=document.getElementById(rowDivName);
				var parentDiv=document.getElementById(rowName+"s");
				parentDiv.removeChild(rowDiv);
				if(!newBool)
				{
					generalTabDeleteRowAjax(rowName,rowNum);
				}
			}

			function moveNote(button)
			{
				var newBool;
				var noteItem;
				var log=document.getElementById("log");
			//log.innerHTML+="moveNote -> button.name = "+button.name+"<br>";
				var noteType=button.name.replace(/(\D+)\d+Button(New)?/,"$1");
				var noteNum=button.name.replace(/\D+(\d+)Button(New)?/,"$1");
				(button.name.replace(/\D+\d+Button(New)/,"$1")=="New")?newBool=true:newBool=false;
				(newBool)?noteItem=noteType+noteNum+"New":noteItem=noteType+noteNum;
			//log.innerHTML+="moveNote -> noteItem = "+noteItem+"<br>";
				var noteDiv=document.getElementById(noteItem);
				var noteTypeDiv=document.getElementById(noteType+"s");
			//log.innerHTML+="moveNote -> noteTypeDiv.firstChild.nodeType = "+noteTypeDiv.firstChild.nodeType+"<br>";
			//log.innerHTML+="moveNote -> noteType = "+noteType+"<br>";
			//log.innerHTML+="moveNote -> noteItem = "+noteItem+"<br>";
				(noteType=="userNote")?moveTo="techNote":moveTo="userNote";
				var moveToDiv=document.getElementById(moveTo+"s");
				moveToDiv.appendChild(noteDiv);
				if (moveToDiv.childNodes.length==1)
				{
					document.getElementById(moveTo+"sHeader").className="cell";
				}
				(newBool)?noteDiv.id=moveTo+noteNum+"New":noteDiv.id=moveTo+noteNum;
				(newBool)?button.name=moveTo+noteNum+"ButtonNew":button.name=moveTo+noteNum+"Button";
				button.checked=false;
				noteTypeHeader=document.getElementById(noteType+"sHeader");
				(noteTypeDiv.childNodes.length==0)?noteTypeHeader.className="cell bottom_border":noteTypeHeader.className="cell";
				generalTabMoveNoteAjax(noteNum,moveTo);
			//log.innerHTML+="moveNote -> noteType+sHeader = "+noteType+"sHeader<br>";
			}

			function hideShow(button)
			{
				var log=document.getElementById("log");
			//log.innerHTML+="hideShow -> button.name = "+button.name+"<br>";
			//log.innerHTML+="hideShow -> button.name.replace = "+button.name.substring(0,button.name.indexOf("Hide"))+"<br>";
				hideDiv=document.getElementById(button.name.substring(0,button.name.indexOf("Hide")));
				headerDiv=document.getElementById(button.name.substring(0,button.name.indexOf("Hide"))+"Header");
				if(button.value=="Hide")
				{
					hideDiv.style.display="none";
					headerDiv.className="cell bottom_border";
					button.value="Show";
				}
				else
				{
					hideDiv.style.display="inline";
					headerDiv.className="cell";
					button.value="Hide";
				}
			}

			function removeTextNodes()
			{
				var log=document.getElementById("log");
				var i;
			//log.innerHTML="removeTextNodes -> arguments.length = "+arguments.length+"<br>";
				for(i=0; i<arguments.length; i++)
				{
			//log.innerHTML+="removeTextNodes -> arguments[i] = "+arguments[i]+"<br>";
					parentDiv=document.getElementById(arguments[i]);
					nextSib=parentDiv.firstChild;
			//log.innerHTML+="removeTextNodes -> parentDiv.childNodes.length = "+parentDiv.childNodes.length+"<br>";
					while(nextSib)
					{
						thisSib=nextSib
						nextSib=thisSib.nextSibling;
						if(thisSib.nodeType==3)
						{
							parentDiv.removeChild(thisSib);
						}
			//log.innerHTML+="removeTextNodes -> parentDiv.childNodes.length = "+parentDiv.childNodes.length+"<br>";
					}
				}
			}

			function saveNote()
			{
				var log=document.getElementById("log");
				var myDate = new Date();
				var year = myDate.getYear()+1900;
				var month = myDate.getMonth()+1;
				var day = myDate.getDate();
				var hour = myDate.getHours();
				var minute = myDate.getMinutes();
				var second = myDate.getSeconds();

				if(month < 10)
				{
					month = "0"+month;
				}

				if(day < 10)
				{
					day = "0"+day;
				}

				if(hour < 10)
				{
					hour = "0"+hour;
				}

				if(minute < 10)
				{
					minute = "0"+minute;
				}

				if(second < 10)
				{
					second = "0"+second;
				}

				var noteType = document.mainForm.commentType[document.mainForm.commentType.selectedIndex].value.toLowerCase()+"Note";
				var noteTypeDiv = document.getElementById(noteType+"s");
				var noteTypeHeaderDiv = document.getElementById(noteType+"sHeader")
				var newRow=document.createElement("div");
				var newInfo=document.createElement("div");
				var newDate=document.createElement("div");
				var newNote=document.createElement("div");
				var newMove=document.createElement("div");
				var newMoveButton=document.createElement("input");

				newRow.id=noteType+newItems["note"]+"New";
//alert (noteType+newItems["note"]+"New");
				newRow.className="row";

				newInfo.id=noteType+newItems["note"]+"InfoNew";
				newInfo.className="cell top_border";
				newInfo.style.width="25%";
				newInfo.innerHTML=readCookie("TECHNAME").replace(/\+/g," ");

				newDate.id=noteType+newItems["note"]+"DateNew";
				newDate.innerHTML=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
				newInfo.appendChild(newDate);
				newRow.appendChild(newInfo);

				newNote.id=noteType+newItems["note"]+"NoteNew";
				newNote.className="cell top_border";
				newNote.style.width="70%";
				newNote.innerHTML=document.mainForm.comment.value.replace(/\n/g,"<br>").replace(/\r/g,"<br>");
				newRow.appendChild(newNote);

				newMove.id=noteType+newItems["note"]+"MoveNew";
				newMove.className="cell top_border";
				newMove.style.width="5%";
				newMove.style.textAlign="right";

				newMoveButton.id=noteType+newItems["note"]+"ButtonNew";
				newMoveButton.name=noteType+newItems["note"]+"ButtonNew";
				newMoveButton.type="checkbox";
				newMoveButton.onclick=function() {moveNote(this)};
				newMove.appendChild(newMoveButton);

				newRow.appendChild(newMove);
				noteTypeDiv.appendChild(newRow);
				noteTypeHeaderDiv.className="cell";
				generalTabSaveNoteAjax(noteType,newItems["note"],newNote.innerHTML,newDate.innerHTML);

				newItems["note"]++;
			}

			function readCookie(name)
			{
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++)
				{
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			}

			function toggleAddress(toggle)
			{
				addressDiv=document.getElementById("streetAddress");
				toggleShadow(toggle);
				(toggle=="on")?addressDiv.style.display="inline":addressDiv.style.display="none";
			}

			function toggleUntil(toggle)
			{
				untilDiv=document.getElementById("waitUntil");
				toggleShadow(toggle);
				(toggle=="on")?untilDiv.style.display="inline":untilDiv.style.display="none";
			}

			function updateStatus(when)
			{
				if(when == 1)
				{
					if(document.mainForm.statusSelect[document.mainForm.statusSelect.selectedIndex].value != "until")
					{
						generalTabStatusAjax();
					}
					else
					{
						toggleUntil("on");
						document.mainForm.waitUntilDate.focus();
					}
				}
				else
				{
					toggleUntil("off");
					if(when == 2)
					{
						generalTabStatusAjax();
					}
					else
					{
						for(i=0;i<document.mainForm.statusSelect.length;i++)
						{
							if(document.mainForm.statusSelect[i].value==document.mainForm.currentStatus.value)
							{
								document.mainForm.statusSelect[i].selected=true;
							}
						}
						document.mainForm.waitUntilDate.value=document.mainForm.waitUntilDateDefault.value;
					}
				}
			}

			function toggleLocation(toggle)
			{
				locationDiv=document.getElementById("selectLocation");
				toggleShadow(toggle);
				(toggle=="on")?locationDiv.style.display="inline":locationDiv.style.display="none";
			}

			function updateLocation()
			{
				//alert(document.mainForm.locationSelectError.selectedIndex);
				document.mainForm.locationSelect[document.mainForm.locationSelectError.selectedIndex].selected=true;
				generalTabChangeLocationAjax();
				toggleLocation("off");
			}
			//need to add update to all divs
		//-->