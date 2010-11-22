	selected=new Array();
	selected["username"]=false;
	selected["password"]=false;
	selected["submit"]=false;

	function xmlInit()
	{
		//alert("xmlinit")
		log = document.getElementById("log");	//log.innerHTML+="xmlInit()<br>\n";

		person=req.responseXML.getElementsByTagName("person");

		if(getElementTextNS("","error",person[0],0)=="failed")
		{
			error("Login failed.  Username, password, or NUID incorrect.");
			//alert ("Failed Login");
		}
		else if (getElementTextNS("","error",person[0],0)=="ldap")
		{
			error("Please login using your LDAP (My.UNL) account information.");
			//alert ("LDAP ERROR");
		}
		else if (getElementTextNS("","uid",person[0],0)!="n/a")
		{
			//alert(getElementTextNS("","computerin",person[0],0));
			if(getElementTextNS("","computerin",person[0],0)=="true")
			{
				window.location="user_list.php";
			}
			else
			{
				window.location="form.php";
			}
		}
		else if (getElementTextNS("","createuser",person[0],0)=="true")
		{
			if(getElementTextNS("","nuid",person[0],0)!="n/a")
			{
				$create_string = "LDAP=true&nuid="+getElementTextNS("","nuid",person[0],0);
			}
			else
			{
				$create_string = "notes=true&username="+getElementTextNS("","username",person[0],0)+"&password="+getElementTextNS("","password",person[0],0);
			}
			window.location="create_user.php?"+$create_string;
		}
		else if (getElementTextNS("","newaccount",person[0],0)=="true")
		{
			window.location="new_account.php";
		}
		else if (getElementTextNS("","reset",person[0],0)=="true")
		{
			window.location="password_reset.php";
		}
	}

	function selectLogin(item)
	{
		//alert(item.name);
		selected[item.name]=true;
		window.onkeyup = null;
		window.releaseEvents(Event.KEYUP);
		document.getElementById("card").innerHTML="";
		isov="";
	}

	function deselectLogin(item)
	{
		selected[item.name]=false;
		//alert(item.name);
		setTimeout("deselectLoginWait()",100);
	}
	
	function deselectLoginWait()
	{
		if(!selected["username"]&&!selected["password"]&&!selected["submit"])
		{
			selected["submit"]=false;
			getKeys();
			document.login.username.value="";
			document.login.password.value="";
		}
	}

	function toggleLogin(toggle)
	{
		loginDiv=document.getElementById("loginDiv");
		if(toggle=="on")
		{
			window.onkeyup = null;
			window.releaseEvents(Event.KEYUP);
			loginDiv.style.display="inline";
		}
		else
		{
			getKeys();
			document.login.username.value="";
			document.login.password.value="";
			loginDiv.style.display="none";
		}
		toggleShadow(toggle);
	}

	function error($msg)
	{
		//alert("error");
		errorDiv=document.getElementById("error");
		errorDiv.innerHTML=$msg;
		errorDiv.style.display="block";
		document.getElementById("card").innerHTML="";
		isov="";
		getKeys();
		document.login.username.value="";
		document.login.password.value="";
		document.login.username.blur();
		document.login.password.blur();
	}

	function toggleShadow(toggle)
	{
		shadow=document.getElementById("shadow");
		(toggle=="on")?shadow.style.display="inline":shadow.style.display="none";
	}
