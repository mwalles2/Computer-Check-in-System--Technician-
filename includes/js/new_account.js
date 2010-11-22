	var siteDomains = new Array();
	siteDomains[siteDomains.length] = "unl.edu";
	siteDomains[siteDomains.length] = "unlserve.unl.edu";
	siteDomains[siteDomains.length] = "unlnotes.unl.edu";
	siteDomains[siteDomains.length] = "bigred.unl.edu";
	siteDomains[siteDomains.length] = "huskers.unl.edu";
	siteDomains[siteDomains.length] = "et.unl.edu";
	siteDomains[siteDomains.length] = "nebraska.edu";
	siteDomains[siteDomains.length] = "mail.unomaha.edu";
	siteDomains[siteDomains.length] = "unk.edu";
	siteDomains[siteDomains.length] = "unmc.edu";

	function newAccountCheckForm()
	{
		document.getElementById("errorMessage").style.display="none";
		blankError = false;
		emailError = false;
		passwordError = false;
		siteEmailError = false;
		inSystemEmailError = false;

		if(document.mainForm.first.value == "")
		{
			document.getElementById("first").style.color="red";
			blankError = true;
		}
		else
		{
			document.getElementById("first").style.color="";
		}

		if(document.mainForm.last.value == "")
		{
			document.getElementById("last").style.color="red";
			blankError = true;
		}
		else
		{
			document.getElementById("last").style.color="";
		}

		if(document.mainForm.email.value == "")
		{
			document.getElementById("email").style.color="red";
			blankError = true;
		}
		else
		{
			document.getElementById("email").style.color="";
		}

		if(document.mainForm.reemail.value == "")
		{
			document.getElementById("reemail").style.color="red";
			blankError = true;
		}
		else
		{
			document.getElementById("reemail").style.color="";
		}

		if(document.mainForm.password.value == "")
		{
			document.getElementById("password").style.color="red";
			blankError = true;
		}
		else
		{
			document.getElementById("password").style.color="";
		}

		if(document.mainForm.repassword.value == "")
		{
			document.getElementById("repassword").style.color="red";
			blankError = true;
		}
		else
		{
			document.getElementById("repassword").style.color="";
		}

		if(!blankError&&(document.mainForm.email.value!=document.mainForm.reemail.value))
		{
			emailError=true;
		}

		if(!emailError&&!blankError&&(document.mainForm.password.value!=document.mainForm.repassword.value))
		{
			passwordError=true;
		}

		if(!blankError&&!emailError&&!passwordError)
		{
			splitEmail = document.mainForm.email.value.split("@");
			if(siteDomains.inArray(splitEmail[1]))
			{
				siteEmailError = true;
			}
		}

		if(!blankError&&!emailError&&!passwordError&&!siteEmailError)
		{
			//alert("in system check");
			//alert("includes/php/new_account_xml.php?email="+encodeURI(document.mainForm.password.value));
			loadXMLDoc(protocol+server+"/includes/php/new_account_xml.php?email="+encodeURI(document.mainForm.password.value));
			inSystemEmailError = true;
		}

		if(blankError||emailError||passwordError||siteEmailError||inSystemEmailError)
		{
			errorMessage=document.getElementById("errorMessage");
			if(blankError)
			{
				errorMessage.innerHTML="Please fill in all feilds on the form."
			}
			else if(emailError)
			{
				document.getElementById("email").style.color="red";
				document.getElementById("reemail").style.color="red";
				document.mainForm.email.focus();
				errorMessage.innerHTML="Your Email addresses did not match."
			}
			else if(passwordError)
			{
				document.getElementById("password").style.color="red";
				document.getElementById("repassword").style.color="red";
				document.mainForm.password.focus();
				errorMessage.innerHTML="Your Passwords did not match."
			}
			else if(siteEmailError)
			{
				document.mainForm.password.focus();
				errorMessage.innerHTML="That is an University email address.  Please go back and <a href='entry.php'>login</a>."
			}
			if(!inSystemEmailError)
			{
				errorMessage.style.display="block";
			}
		}
		else
		{
			createUser();
		}
	}

	function createUser()
	{
		document.mainForm.action="create_user.php";
		document.mainForm.submit();
		//alert("form submited");
	}

	function xmlInit()
	{
//		alert("xmlinit");
		data = req.responseXML.getElementsByTagName("data");
		exists=getElementTextNS("","exists",data[0],0);
//		alert(exists);
		if(exists == "true")
		{
			document.mainForm.password.focus();
			errorMessage.innerHTML="That email address is already in our system.  Please go back and <a href='entry.php'>login</a> or if you need to have your password reset please <a href=\"#\">click here</a>."
			errorMessage.style.display="block";
		}
		else
		{
			createUser();
		}
	}