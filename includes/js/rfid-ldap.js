		var isov = "";

		function runCard()
		{
			log=document.getElementById("log");
//log.innerHTML+=document.card.card.value+"<br>\n";
			if(isov.length > 8)
			{
				loadXMLDoc(protocol+server+"/includes/php/ldap.php?iso="+isov);
			}
			else
			{
				loadXMLDoc(protocol+server+"/includes/php/ldap.php?nuid="+isov);
			}
		}

		function getKeys()
		{
			window.captureEvents(Event.KEYUP);
			window.onkeyup = readKeys;
		}

		function readKeys(e)
		{
			//alert("data");
			var code;
			if (!e) var e = window.event;
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			if(code>95 && code<106)
			{
				var character=code-96;
			}
			else
			{
				var character = String.fromCharCode(code);
			}

			if(code==8)
			{
//				alert("delete")
				isov = isov.substring(0,isov.length-1);
				isov.length=isov.length-1;
				document.getElementById("card").innerHTML=isov;
			}
			//debug code
			log=document.getElementById("log");
//			obj=document.card.card.value;
//			obj+=character;
			document.getElementById("card").innerHTML+=character;
			//end debug code
/*			if (!e.ctrlKey)
			{ */
				if (code == 13)
				{
					log.innerHTML+=isov+"<br>";
					window.onkeyup = null;
					window.releaseEvents(Event.KEYUP);
					isov = isov.replace(/2508556/g,627139);
					log.innerHTML+=isov+"<br>";
					runCard();
				} 
			 	isov += character;
//			}
			return false;
		}
