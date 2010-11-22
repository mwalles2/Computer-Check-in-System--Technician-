	<!--
		//Charge Tab functions/variables
		function chargeUpdateLabor()
		{
			var outTotal
			if(!document.mainForm.chargeIsExpressRate.checked)
			{
				outTotal=document.mainForm.chargeLaborHours.value*document.mainForm.chargeLaborRate.value;
			}
			else
			{
				outTotal=document.mainForm.chargeLaborHours.value*document.mainForm.chargeExpressRate.value;
			}
			chargeUpdateLaborAjax();
			document.mainForm.chargeLaborTotal.value=outTotal;
			document.getElementById('chargeLaborTotalDiv').innerHTML="$"+number_format(outTotal,2,".",",")
			chargeUpdateTotal();
		}

		function chargeUpdateTotal()
		{
			var chargeTabPredefinedTotal=0;
			var chargeTabPartsTotal=0;
			for(var i=0; i < chargeTabPredefined.length; i++)
			{
				if(eval("document.mainForm.charge"+chargeTabPredefined[i]+"Check.checked"))
				{
//					window.console.log(i+": is true");
					eval("chargeTabPredefinedTotal+=(document.mainForm.charge"+chargeTabPredefined[i]+"Rate.value)*1");
				}
			}
			for(var i=0; i < chargeTabParts.length; i++)
			{
//				eval("alert (document.mainForm.chargePart"+chargeTabParts[i]+"Rate.value)");
				eval("chargeTabPartsTotal+=(document.mainForm.chargePart"+chargeTabParts[i]+"Rate.value)*(document.mainForm.chargePart"+chargeTabParts[i]+"Qty.value)*1");
			}
			chargeSubTotal = (document.mainForm.chargeLaborTotal.value*1)+(chargeTabPredefinedTotal*1)+(chargeTabPartsTotal*1);
			document.getElementById('chargeSubTotal').innerHTML="$"+number_format(chargeSubTotal,2,'.',',');
			if(document.mainForm.chargeTaxable.checked)
			{
				document.getElementById('chargeTaxTotal').innerHTML="$"+number_format(0,2,'.',',');
				document.getElementById('chargeTotal').innerHTML="$"+number_format(chargeSubTotal,2,'.',',');
			}
			else
			{
				document.getElementById('chargeTaxTotal').innerHTML="$"+number_format(chargeSubTotal*(document.mainForm.chargeTax.value*1),2,'.',',');
				document.getElementById('chargeTotal').innerHTML="$"+number_format(chargeSubTotal*(1+(document.mainForm.chargeTax.value*1)),2,'.',',');
			}
		}

		/* Made by Mathias Bynens <http://mathiasbynens.be/> */
		/* retrived form http://krijnhoetmer.nl/stuff/javascript/number-format/script.js */
		function number_format(a, b, c, d)
		{
			a = Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
			e = a + '';
			f = e.split('.');
			if (!f[0])
			{
				f[0] = '0';
			}
			if (!f[1])
			{
				f[1] = '';
			}
			if (f[1].length < b)
			{
				g = f[1];
				for (i=f[1].length + 1; i <= b; i++)
				{
					g += '0';
				}
				f[1] = g;
			}
			if(d != '' && f[0].length > 3)
			{
				h = f[0];
				f[0] = '';
				for(j = 3; j < h.length; j+=3)
				{
					i = h.slice(h.length - j, h.length - j + 3);
					f[0] = d + i +  f[0] + '';
				}
				j = h.substr(0, (h.length % 3 == 0) ? 3 : (h.length % 3));
				f[0] = j + f[0];
			}
			c = (b <= 0) ? '' : c;
			return f[0] + c + f[1];
		}
	//-->