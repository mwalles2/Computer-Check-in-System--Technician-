	function loadXMLDocAuth(url,parameters)
	{
//alert("loadXMLDocAuth");
		// branch for native XMLHttpRequest object
		if (window.XMLHttpRequest)
		{
			req = new XMLHttpRequest();
			// branch for IE/Windows ActiveX version
		}
		else if (window.ActiveXObject)
		{
			isIE = true;
			try
			{
				req = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e)
			{
				try
				{
					req = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e) {}
			}
		}
		if (!req)
		{
			alert('Cannot create XMLHTTP instance');
			return false;
		}

		req.onreadystatechange = processReqChangeAuth;
		req.open("POST", url, true);
		req.send(parameters);
	}

	function processReqChangeAuth()
	{
		// only if req shows "loaded"
		if (req.readyState == 4)
		{
			// only if "OK"
			if (req.status == 200)
			{
				xmlInitAuth();
			}
		}
	}

	function xmlInitAuth()
	{
		if(req.responseXML.getElementsByTagName("auth").length == 0)
		{
//			alert("no auth returned");
			return false;
		}
		if(getElementTextNS("","current",req.responseXML.getElementsByTagName("auth")[0],0)==0)
		{
//			alert("auth = 0");
//			alert(getElementTextNS("","uri",req.responseXML.getElementsByTagName("auth")[0],0));
			document.loginForm.uri.value=getElementTextNS("","uri",req.responseXML.getElementsByTagName("auth")[0],0);
			toggleLogin("on");
		}
		else
		{
//			alert("auth other");
//			alert(getElementTextNS("","uri",req.responseXML.getElementsByTagName("auth")[0],0))
			loadXMLDoc(getElementTextNS("","uri",req.responseXML.getElementsByTagName("auth")[0],0));
		}
	}

	function toggleLogin(toggle)
	{
		document.loginForm.action="javascript:loginAuth()";
		login=document.getElementById("authLogin");
		toggleShadow(toggle);
		(toggle=="on")?login.style.display="inline":login.style.display="none";
	}

	function toggleShadow(toggle)
	{
		shadow=document.getElementById("shadow");
		(toggle=="on")?shadow.style.display="inline":shadow.style.display="none";
	}

	function loginAuth()
	{
		toggleLogin("off");
//		alert("loginForm.uri="+document.loginForm.uri.value);
		uri=document.loginForm.uri.value;
		uri=uri.replace(/&/g,"*AMP*");
//		alert("uri="+uri);
		paramaters = "username="+encodeURI(document.loginForm.username.value)+"&password="+encodeURI(document.loginForm.password.value)+"&uri="+encodeURI(uri);
//alert(paramaters);
		setTimeout("loadXMLDocAuth(\"https://chc-gateway.unl.edu/admin/includes/php/auth.php\",paramaters)",70);
	}
