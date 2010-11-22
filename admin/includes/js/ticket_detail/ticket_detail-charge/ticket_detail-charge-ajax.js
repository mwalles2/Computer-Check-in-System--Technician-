	<!--
		function chargeGetPartNum()
		{
			xmlInit = chargeUpdatePartNum;
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=getpart&partnum="+document.mainForm.chargeNewPartNum.value);
//			alert(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=getpart&partnum="+document.mainForm.chargeNewPartNum.value);
		}

		function chargeUpdatePartNum()
		{
			data=req.responseXML.getElementsByTagName("data");
			document.getElementById("chargeNewDescriptionDiv").innerHTML=document.mainForm.chargeNewDescription.value=getElementTextNS("", "description", data[0], 0);
			document.mainForm.chargeNewManPartNum.value=getElementTextNS("", "manpartnum", data[0], 0);
			document.mainForm.chargeNewCost.value=getElementTextNS("", "cost", data[0]);
			document.getElementById("chargeNewPriceDiv").innerHTML="$"+getElementTextNS("", "price", data[0], 0);
			document.mainForm.chargeNewPrice.value=getElementTextNS("", "price", data[0], 0);
			document.mainForm.chargeNewQty.focus();
		}

		function chargeUpdatePredefinedRateAjax(item,chid)
		{
			xmlInit = chargeUpdatePredefinedRateAddCHIDAjax;
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=updatePredefined&tid="+tid+"&chid="+chid+"&item="+item.name+"&value="+item.checked);
//alert (protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=updatePredefined&tid="+tid+"&chid="+chid+"&item="+item.name+"&value="+item.checked);
			chargeUpdateTotal();
		}

		function chargeUpdatePredefinedRateAddCHIDAjax()
		{
			if(req.responseXML.getElementsByTagName("rownum").length>0)
			{
				var data=req.responseXML.getElementsByTagName("data");
				var chargeId=getElementTextNS("", "id", data[0], 0);
				var chargeRowNum=getElementTextNS("", "rownum", data[0], 0);
				var chargeCheckBox=document.getElementById("charge"+chargeId+"Check");
				eval("chargeCheckBox.onclick=function() { chargeUpdatePredefinedRateAjax(this,'"+chargeRowNum+"'); }");
			}
		}

		function chargeAddPartAjax()
		{
			xmlInit=chargeUpdatePartAjax;
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=addpart&partnum="+document.mainForm.chargeNewPartNum.value+"&tid="+tid+"&qty="+document.mainForm.chargeNewQty.value);
		}
		
		function chargeUpdatePartAjax()
		{
			var data=req.responseXML.getElementsByTagName("data");
			var chargePartRowNum=getElementTextNS("","rownum",data[0],0);

			chargeTabParts[chargeTabParts.length]=chargePartRowNum;

			var newPart=document.createElement("div");
			newPart.className="row_narrow";
			newPart.id="chargePart"+chargePartRowNum+"Row";
			
			var newPartNum=document.createElement("div");
			newPartNum.className="cell";
			newPartNum.style.width="10%";
			newPartNum.innerHTML=document.mainForm.chargeNewPartNum.value;

			var newPartInputPrice=document.createElement("input");
			newPartInputPrice.type="hidden";
			newPartInputPrice.name="chargePart"+chargePartRowNum+"Rate";
			newPartInputPrice.value=document.mainForm.chargeNewPrice.value;

			var newPartInputQty=document.createElement("input");
			newPartInputQty.type="hidden";
			newPartInputQty.name="chargePart"+chargePartRowNum+"Qty";
			newPartInputQty.value=document.mainForm.chargeNewQty.value;

			var newPartDescription=document.createElement("div");
			newPartDescription.className="cell";
			newPartDescription.style.width="60%";
			newPartDescription.innerHTML=document.getElementById("chargeNewDescriptionDiv").innerHTML;
			
			var newPartPrice=document.createElement("div");
			newPartPrice.className="cell";
			newPartPrice.style.width="10%";
			newPartPrice.innerHTML="$"+number_format(document.mainForm.chargeNewPrice.value,2,".",",");
			
			var newPartQty=document.createElement("div");
			newPartQty.className="cell";
			newPartQty.style.width="5%";
			newPartQty.innerHTML=document.mainForm.chargeNewQty.value;
			
			var newPartTotal=document.createElement("div");
			newPartTotal.className="cell";
			newPartTotal.style.width="10%";
			newPartTotal.innerHTML="$"+number_format(document.mainForm.chargeNewPrice.value*document.mainForm.chargeNewQty.value,2,".",",");

			var newPartButtonDiv=document.createElement("div");
			newPartButtonDiv.className="cell";
			newPartButtonDiv.style.width="5%";

			var newPartButton=document.createElement("input");
			newPartButton.type="button";
			newPartButton.value="-";
			eval("newPartButton.onclick=function() { chargeRemovePartAjax('"+chargePartRowNum+"') }");
			alert(newPartButton.onclick);

			newPartButtonDiv.appendChild(newPartButton);
			newPartNum.appendChild(newPartInputPrice);
			newPartNum.appendChild(newPartInputQty);
			newPart.appendChild(newPartNum);
			newPart.appendChild(newPartDescription);
			newPart.appendChild(newPartPrice);
			newPart.appendChild(newPartQty);
			newPart.appendChild(newPartTotal);
			newPart.appendChild(newPartButtonDiv);

			document.getElementById("chargeParts").appendChild(newPart);
			
			document.getElementById("chargeNewDescriptionDiv").innerHTML="&nbsp;";
			document.mainForm.chargeNewManPartNum.value="";
			document.mainForm.chargeNewCost.value="";
			document.getElementById("chargeNewPriceDiv").innerHTML="&nbsp;";
			document.mainForm.chargeNewPrice.value="";
			document.mainForm.chargeNewPartNum.value="";
			document.mainForm.chargeNewQty.value="";

			chargeUpdateTotal();
		}

		function chargeUpdateExpress()
		{
			xmlInit = doNothing;
//			alert(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=updateExpress&tid="+tid+"&express="+document.mainForm.chargeIsExpressRate.checked);
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=updateExpress&tid="+tid+"&express="+document.mainForm.chargeIsExpressRate.checked);
			chargeUpdateLabor();
		}

		function chargeUpdateLaborAjax()
		{
			xmlInit = chargeUpdateLaborIdAjax;
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=updateHours&tid="+tid+"&hours="+document.mainForm.chargeLaborHours.value+"&id="+document.mainForm.chargeLaborHoursId.value);
//			alert(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=updateHours&tid="+tid+"&hours="+document.mainForm.chargeLaborHours.value+"&id="+document.mainForm.chargeLaborHoursId.value);
			document.mainForm.chargeLaborHours.value
		}

		function chargeUpdateLaborIdAjax()
		{
			if(req.responseXML.getElementsByTagName("rownum").length>0)
			{
				var data=req.responseXML.getElementsByTagName("data");
				var chargeId=getElementTextNS("", "id", data[0], 0);
				var chargeRowNum=getElementTextNS("", "rownum", data[0], 0);
				document.mainForm.chargeLaborHoursId.value = chargeRowNum;
			}
		}

		function chargeRemovePartAjax(part)
		{
			xmlInit = doNothing;
			var chargeTabPartsID=chargeTabParts.indexOf(part);
			chargeTabParts.splice(chargeTabPartsID,1);
			document.getElementById("chargePart"+part+"Row").style.display="none";
			chargeUpdateLabor();
//			alert(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=removePart&tid="+tid+"&chid="+part);
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=removePart&tid="+tid+"&chid="+part);
		}

		function chargeUpdateTaxAjax()
		{
			xmlInit = doNothing;
			loadXMLDoc(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=updateTax&tid="+tid+"&taxExempt="+document.mainForm.chargeTaxable.checked);
			//alert(protocol+server+"/admin/includes/php/ticket_detail-charge-ajax.php?action=updateTax&tid="+tid+"&taxExempt="+document.mainForm.chargeTaxable.checked);
			chargeUpdateLabor();
		}
	//-->
