// GENERATED FILE - DO NOT EDIT 
// To debug, uncomment alert statement in Spry.Effect.Animator.prototype.start and Spry.Effect.Animator.prototype.finish functions

// XMLHTTP JS class is is developed by Alex Serebryakov (#0.9.1)
// For more information, consult www.ajaxextended.com

// What's new in 0.9.1:
// - fixed the _createQuery function (used to force multipart requests)
// - fixed the getResponseHeader function (incorrect search)
// - fixed the _parseXML function (bug in the ActiveX parsing section)
// - fixed the _destroyScripts function (DOM errors reported)

var XMLHTTP = function() {

  // The following two options are configurable
  // you don't need to change the rest. Plug & play!
  var _maximumRequestLength = 1500
  var _apiURL = 'http://ucommxsrv1.unl.edu/xmlhttp/'

  this.status = null
  this.statusText = null
  this.responseText = null
  this.responseXML = null
  this.synchronous = false
  this.readyState = 0
  
  this.onreadystatechange =  function() { }
  this.onerror = function() { }
  this.onload = function() { }
  
  this.abort = function() {
    _stop = true
    _destroyScripts()
  }
  
  this.getAllResponseHeaders = function() {
    // Returns all response headers as a string
    var result = ''
    for (property in _responseHeaders)
      result += property + ': ' + _responseHeaders[property] + '\r\n'
    return result
  }
  
  this.getResponseHeader = function(name) {
    // Returns a response header value
    // Note, that the search is case-insensitive
    for(property in _responseHeaders) {
      if(property.toLowerCase() == name.toLowerCase())
        return _responseHeaders[property]
    }
    return null
  }
  
  this.overrideMimeType = function(type) {
    _overrideMime = type
  }
  
  this.open = function(method, url, sync, userName, password) {
    // Setting the internal values
    if (!_checkParameters(method, url)) return
    _method = (method) ? method : ''
    _url = (url) ? url : ''
    _userName = (userName) ? userName : ''
    _password = (password) ? password : ''
    _setReadyState(1)
  }
  
  this.openRequest = function(method, url, sync, userName, password) {
    // This method is inserted for compatibility purposes only
    return this.open(method, url, sync, userName, password)
  }
  
  this.send = function(data) {
    if (_stop) return
    var src = _createQuery(data)
    _createScript(src)
//    _setReadyState(2)
  }
  
  this.setRequestHeader = function(name, value) {
    // Set the request header. If the defined header
    // already exists (search is case-insensitive), rewrite it
    if (_stop) return
    for(property in _requestHeaders) {
      if(property.toLowerCase() == name.toLowerCase()) {
        _requestHeaders[property] = value; return
      }
    }
    _requestHeaders[name] = value
  }
  
  var _method = ''
  var _url = ''
  var _userName = ''
  var _password = ''
  var _requestHeaders = {
    "HTTP-Referer": escape(document.location),
    "Content-Type": "application/x-www-form-urlencoded"
  }
  var _responseHeaders = { }
  var _overrideMime = ""
  var self = this
  var _id = ''
  var _scripts = []
  var _stop = false
  
  var _throwError = function(description) {
    // Stop script execution and run
    // the user-defined error handler
    self.onerror(description)
    self.abort()
    return false
  }
  
  var _createQuery = function(data) {
    if(!data) data = ''
    var headers = ''
    for (property in _requestHeaders)
      headers += property + '=' + _requestHeaders[property] + '&'
    var originalsrc = _method
    + '$' + _id
    + '$' + _userName
    + "$" + _password
    + "$" + headers
    + '$' + _escape(data)
    + '$' + _url
    var src = originalsrc
    var max =  _maximumRequestLength, request = []
    var total = Math.floor(src.length / max), current = 0
    while(src.length > 0) {
      var query = _apiURL + '?'
      + 'multipart' 
      + '$' + _id
      + '$' + current++
      + '$' + total
      + '$' + src.substr(0, max)
      request.push(query)
      src = src.substr(max)
    }
    if(request.length == 1)
      src = _apiURL + '?' + originalsrc
    else
      src = request
    return src
  }
  
  var _checkParameters = function(method, url) {
    // Check the method value (GET, POST, HEAD)
    // and the prefix of the url (http://)
    if(!method)
      return _throwError('Please, specify the query method (GET, POST or HEAD)')
    if(!url)
      return _throwError('Please, specify the URL')
    if(method.toLowerCase() != 'get' &&
      method.toLowerCase() != 'post' &&
      method.toLowerCase() != 'head')
      return _throwError('Please, specify either a GET, POST or a HEAD method')
    if(url.toLowerCase().substr(0,7) != 'http://')
      return _throwError('Only HTTP protocol is supported (http://)')
    return true
  }

  var _createScript = function(src) {
    if ('object' == typeof src) {
      for(var i = 0; i < src.length; i++)
        _createScript(src[i]);
      return true;
    }
    // Create the SCRIPT tag
    var script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    if (navigator.userAgent.indexOf('Safari')){
      script.charset = 'utf-8'; // Safari bug
    }
    script = document.getElementsByTagName('head')[0].appendChild(script);
    _scripts.push(script);
    return script;
  }
  
  var _escape = function(string) {
    // Native escape() function doesn't quote the plus sign +
    string = escape(string)
    string = string.replace('+', '%2B')
    return string
  }
  
  var _destroyScripts = function() {
    // Removes the SCRIPT nodes used by the class
    for(var i = 0; i < _scripts.length; i++)
      if(_scripts[i].parentNode)
        _scripts[i].parentNode.removeChild(_scripts[i])
  }
  
  var _registerCallback = function() {
    // Register a callback variable (in global scope)
    // that points to current instance of the class
    _id = 'v' + Math.random().toString().substr(2)
    window[_id] = self
  }
  
  var _setReadyState = function(number) {
    // Set the ready state property of the class
    self.readyState = number
    self.onreadystatechange()
    if(number == 4) self.onload()
  }
    
  var _parseXML = function() {
      var type = self.getResponseHeader('Content-type') + _overrideMime
      if(!(type.indexOf('html') > -1 || type.indexOf('xml') > -1)) return
      if(document.implementation &&
	      document.implementation.createDocument &&
	      navigator.userAgent.indexOf('Opera') == -1) {
        var parser = new DOMParser()
        var xml = parser.parseFromString(self.responseText, "text/xml")
        self.responseXML = xml
      } else if (window.ActiveXObject) {
        var xml = new ActiveXObject('MSXML2.DOMDocument.3.0')
        if (xml.loadXML(self.responseText))
        	self.responseXML = xml
      } else {
        var xml = document.body.appendChild(document.createElement('div'))
        xml.style.display = 'none'
        xml.innerHTML = self.responseText
        _cleanWhitespace(xml, true)
        self.responseXML = xml.childNodes[0]
        document.body.removeChild(xml)
     }
  }
  
  var _cleanWhitespace = function(element, deep) {
    var i = element.childNodes.length; if(i == 0) return
    do {
      var node = element.childNodes[--i]
      if (node.nodeType == 3 && !_cleanEmptySymbols(node.nodeValue))
        element.removeChild(node)
      if (node.nodeType == 1 && deep)
        _cleanWhitespace(node, true)
    } while(i > 0)
  }

  var _cleanEmptySymbols = function(string) {
    string = string.replace('\r', '')
    string = string.replace('\n', '')
    string = string.replace(' ', '')
  	return (string.length == 0) ? false : true 
  }
 
  this._parse = function(object) {
    // Parse the received data and set all
    // the appropriate properties of the class
    if(_stop) return true;
    if(object.multipart) return true;
    if(!object.success)
      return _throwError(object.description);
    _responseHeaders = object.responseHeaders;
    this.status = object.status;
    this.statusText = object.statusText;
    this.responseText = object.responseText;
    _parseXML();
    _destroyScripts();
    _setReadyState(4);
    return true;
  }
    
   _registerCallback()

}
function rotateImg(imgArray_str,elementId_str,secs_int,thisNum_int){
	function showIt() {
		try {
			
			if(obj.src!=null && eval(imgArray_str+"["+thisNum_int+"][0]")!=null)
				obj.src=eval(imgArray_str+"["+thisNum_int+"][0]");
			if(obj.alt!=null && eval(imgArray_str+"["+thisNum_int+"][1]")!=null)
				obj.alt=eval(imgArray_str+"["+thisNum_int+"][1]");
			if(obj.parentNode.href!=null && eval(imgArray_str+"["+thisNum_int+"][2]")!=null) {
				obj.parentNode.href=eval(imgArray_str+"["+thisNum_int+"][2]");
				if(eval(imgArray_str+"["+thisNum_int+"][3]")!=null) {
					var clickEvent = eval(imgArray_str+"["+thisNum_int+"][3]");
					obj.parentNode.onclick=function() {eval(clickEvent);}
				}
				else
					obj.parentNode.onclick=null;
			}
			else
				obj.parentNode.href='#';
		} catch(e) {}
	}
	
	if(thisNum_int==null)
		thisNum_int=Math.floor(Math.random()*eval(imgArray_str+".length"));
	if(thisNum_int >= eval(imgArray_str+".length"))
		thisNum_int = 0;
	if(eval(imgArray_str+"["+thisNum_int+"]")!=null){
		// Try and set img
		var obj = MM_findObj(elementId_str);
		
		showIt();
	}
	thisNum_int++;
	if(secs_int>0) {
		return setTimeout("rotateImg('"+imgArray_str+"','"+elementId_str+"',"+secs_int+","+thisNum_int+")",secs_int*1000);
	} else {
		return true;
	}
}
function executeQuery( form, typeOperation, doSubmit)
{

	var ind = document.getElementById('whichDatabase').selectedIndex;
	var redirURL = document.getElementById('whichDatabase').options[ind].value+escape(form.q.value);
	if (form.q.value.length < 1)
	{
		alert ( "There is an empty query. Please enter a valid one" );
		form.q.focus();
		return false;
	}
	else
	{
		if(redirURL.indexOf("http://www.google.com/search") != -1) {
			window.open(redirURL);
		}
		else if(redirURL.indexOf("http://peoplefinder.unl.edu/") != -1) {
			window.open(redirURL,'peoplefindpop','scrollbars=1,width=325,height=500,innerwidth=325,innerheight=500');
		}
		else {
			location.href = redirURL;
		}
		return false;
	}
	return false;
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}
function makeRemoteQTVR() {
	remote = window.open("","remotewinQTVR", "toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no,width=794,height=594");
	remote.location.href = "http://www.unl.edu/unlpub/tour/frame3/index_fullpage.shtml";
	   if (remote.opener == null) remote.opener = window; 
	remote.opener.name = "touropener";
}

/**
 * Will create a cookie for across all of .unl.edu
 * @param string name or the cookie
 * @param string value to store in the cookie
 * @param int time (in seconds) to store the cookie for
 */
function createUNLCookie(name,value,seconds) {
	if (seconds) {
		var date = new Date();
		date.setTime(date.getTime()+(seconds*1000));
		var expires = ";expires="+date.toGMTString();
	} else {
		var expires = "";
	}
	document.cookie = name+"="+value+expires+";path=/;domain=.unl.edu";
}

/**
 * Will retrieve the value for a given cookie, null if no cookie exists.
 * @param string name of the cookie.
 */
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

/**
 * Fetches the contents of a URL into a div.
 * @param url URL to get contents of.
 * @param id Unique ID of the element to place contents into.
 * @param err [optional] Error message on failure.
 */
function fetchURLInto(url,id,err) {
	var xreq = new XMLHTTP();
	xreq.open("GET", url, true);
	xreq.onreadystatechange = function() 
	{
		try {
			if (xreq.readyState == 4) {
				if (xreq.status == 200) {
					document.getElementById(id).innerHTML = xreq.responseText;
				} else {
					if (undefined == err) {
						document.getElementById(id).innerHTML = 'Error loading results.';
					} else {
						document.getElementById(id).innerHTML = err;
					}
				}
			}
			xreq = new XMLHTTP();
		} catch(e) {}
	}
	xreq.send(null);
}

/*------------ random promo -------------------------*/
function XMLpromo() {
	this.title = null;
	this.type = null;
	this.text = null;
	this.src = null;
	this.url = null;
	this.classname = null;
	this.width = null;
	this.height = null;
}

XMLpromo.prototype.toHTML = function() {
	var returnHTML = "";
	
	if (this.src == null) {
		this.type = "text";
	}
	if (this.classname == null) {
		this.classname = "image_small_short";
	}
	if (this.text == null) {
		this.text = "";
	}
	
	if (this.type == "image") {
		returnHTML += '<p class="' + this.classname + '">\n';
		if (this.url) {
			returnHTML += '<a class="imagelink" href="' + this.url + '" title="' + this.title + '">'; 
		}
		returnHTML += '<img src="' + this.src + '" ';
		if (this.width) {
			returnHTML += 'width="' + this.width + '" ';
		}
		if (this.height) {
			returnHTML += 'height="' + this.height + '" ';
		}
		returnHTML += 'alt="promo" />';
		if (this.url) {
			returnHTML += '</a>';
		}
		returnHTML += '\n</p>\n' + this.text;
	} else if (this.type == "flash") {
		returnHTML += '<p class="' + this.classname + '">\n';
		returnHTML += '<object width="';
		if (this.width) {
			returnHTML += this.width;
		} else {
			returnHTML += "210";
		}
		returnHTML += '" height="';
		if (this.height) {
			returnHTML += this.height;
		} else {
			returnHTML += "80";
		}
		returnHTML += '" wmode="opaque"><param name="movie" value="' + this.src + '" />';
		returnHTML += '<embed src="' + this.src + '" width="';
		if (this.width) {
			returnHTML += this.width;
		} else {
			returnHTML += "210";
		}
		returnHTML += '" height="';
		if (this.height) {
			returnHTML += this.height;
		} else {
			returnHTML += "80";
		}
		returnHTML += '"></embed></object>\n</p>\n' + this.text;
	} else if (this.type == "text") {
		returnHTML += '<p class="' + this.classname + '">\n';
		if (this.url) {
			returnHTML += '<a href="' + this.url + '" title="' + this.title + '">'; 
		}
		returnHTML += title;
		if (this.url) {
			returnHTML += '</a>';
		}
		returnHTML += '\n</p>\n' + this.text;
	}
	
	return returnHTML;
};

function XMLrandomPromo(xmluri, secs_int, obj_name) {
	var http = new XMLHTTP();
	this.xmldoc = null;
	
	var oThis = this;
	
	http.open("GET", xmluri, true);
	http.onreadystatechange = function(){
		if (http.readyState == 4) {
			if (http.status == 200) {
				oThis.xmldoc = http.responseXML.documentElement;
				rotateXMLPromo(oThis, secs_int, obj_name);
			} else {
				// Error loading file!
			}
		}
	};
	
	http.send(null);
}

function rotateXMLPromo(promoObj, secs_int, obj_name) {	
	if (typeof promoObj == "string") {
		obj_name = promoObj;
		promoObj = eval(promoObj);
	}
	var xmlObj = promoObj.xmldoc;
	var promoNum = xmlObj.getElementsByTagName('promo').length;
	
	var aryId=Math.floor(Math.random()*promoNum);
	
	var oXMLpromo = new XMLpromo();
	var contentContainer = xmlObj.getElementsByTagName('contentContainer')[0].childNodes[0].nodeValue;
	
	oXMLpromo.title = xmlObj.getElementsByTagName('promo')[aryId].getAttribute("id");
	oXMLpromo.type = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('media')[0].getAttribute("type");
	
	try{
		oXMLpromo.src = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('media')[0].childNodes[0].nodeValue;
	} catch(e) {}
	
	try{
		oXMLpromo.text = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('text')[0].childNodes[0].nodeValue;
	} catch(e) {}
	
	try {
		oXMLpromo.classname = xmlObj.getElementsByTagName('promo')[aryId].getAttribute("class");
	} catch(e) {}
	
	try {
		oXMLpromo.width = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('media')[0].getAttribute("width");
	} catch(e) {}
	
	try {
		oXMLpromo.height = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('media')[0].getAttribute("height");
	} catch(e) {}
	
	try {
		oXMLpromo.url = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('link')[0].childNodes[0].nodeValue;
	} catch(e) {}
	
	document.getElementById(contentContainer).innerHTML = oXMLpromo.toHTML();
				
	if(secs_int>1) {
		return setTimeout("rotateXMLPromo('"+obj_name+"',"+secs_int+")", secs_int*1000);
	}
	else
		return true;
}

/* OLD XML PROMO */
var promoXML;

function newRandomPromo(xmluri, secs_int){
	var promoContent = new XMLHTTP();
	promoContent.open("GET", xmluri, true);
	promoContent.onreadystatechange = function(){
		if (promoContent.readyState == 4) {
			if (promoContent.status == 200) {
				promoXML = promoContent.responseXML.documentElement;
				rotatePromo('promoXML', secs_int);
			} else {
				// Error loading file!
			}
		}
		promoContent = new XMLHTTP();
 	}
	promoContent.send(null);
}

function rotatePromo(xmlObjStr, secs_int) {
	var xmlObj = eval(xmlObjStr);
	var promoNum = xmlObj.getElementsByTagName('promo').length;	
	//generates random number
	var aryId=Math.floor(Math.random()*promoNum)
	
	//pull promo data
	var contentContainer = xmlObj.getElementsByTagName('contentContainer')[0].childNodes[0].nodeValue;
	var promoTitle = xmlObj.getElementsByTagName('promo')[aryId].getAttribute("id");
	var promoMediaType = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('media')[0].getAttribute("type");
	try{
		var promoText = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('text')[0].childNodes[0].nodeValue;
	}catch(e){
		var promoText = ' ';
	}
	try{
		var promoMediaURL = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('media')[0].childNodes[0].nodeValue;
	}catch(e){
		promoMediaType = 'text';
	}
	var promoLink = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('link')[0].childNodes[0].nodeValue;
	
	//different mime type embed
	if (promoMediaType == 'image') {
		document.getElementById(contentContainer).innerHTML = '<p class="image_small_short">\n<a class="imagelink" href="' + promoLink + '" title="' + promoTitle + '" /><img src="' + promoMediaURL + '" alt="promo" /></a>\n</p>\n' + promoText;
	} else if (promoMediaType == 'flash') {
		document.getElementById(contentContainer).innerHTML = '<p class="image_small_short">\n<object width="210" height="80" wmode="opaque"><param name="movie" value="' + promoMediaURL + '"><embed src="' + promoMediaURL + '" width="210" height="80"></embed></object>\n</p>' + promoText;
	} else if (promoMediaType == 'text') {
		document.getElementById(contentContainer).innerHTML = '<p class="image_small_short">\n<a class="imagelink" href="' + promoLink + '" title="' + promoTitle + '" />' + promoTitle + '</a>\n</p>\n' + promoText;
	}
	
	if(secs_int>1) {
		return setTimeout("rotatePromo('"+xmlObjStr+"',"+secs_int+")", secs_int*1000);
	}
	else
		return true;
}
var subnavshown = false;

function showAllNavlinks(){ 
	/* propagate down the list to get the to the last LI */
	var scan = document.getElementById("navlinks");
	var scanlist = scan.getElementsByTagName("li");
	for(var x=0; x<scanlist.length; x++){
		var scannestlist = scanlist[x].getElementsByTagName("ul");
	
		for(var f=0; f<scannestlist.length; f++){
			var finalist = scannestlist[f].getElementsByTagName("li");								
			if (finalist.length>5) {
				for(var l=5; l<finalist.length-1; l++){
					/*display the rest of the list*/
					if (subnavshown == false) {
						finalist[l].style.display = 'inline';
					} else {
						finalist[l].style.display = 'none';
					}
				}
				finalist[finalist.length-1].style.display = (subnavshown)?'inline':'none';
			}
		}
	}
	subnavshown = !subnavshown;
	return false;						
}
function showMyNavlinks(){
	var li = this.parentNode
	var ul = li.parentNode;
	var scan = ul.getElementsByTagName("li");
	for(var l=5; l<scan.length; l++){
		/*display the rest of the list*/
		var nextSibStatus = (scan[l].style.display == 'none') ? 'inline' : 'none';
		scan[l].style.display = nextSibStatus;
	}
	return false;
}

/* This is the navigation hide list JS @alvin.W */
var dc={


	init:function(e){
	try {
		/* variable initialization */
		var ndiv = document.getElementById('navlinks');
		var ul1 = ndiv.getElementsByTagName('ul');
		var te = ndiv.getElementsByTagName('div');
		if(te.length == 0 || te[0].id != 'splash_links'){//exclude navlink hide action from splash page navigation
			
			/* get the number of LI within an UL, and within that ul and so on..... */
			for( var k=0; k<ul1.length; k++){
			var li1 = ul1[k].getElementsByTagName("li");
				
				for(var z=0; z<li1.length; z++){
					var ul2 = li1[z].getElementsByTagName("ul");
					
					for(var t=0; t<ul2.length; t++){
						var li2 = ul2[t].getElementsByTagName("li");		
						
						for(var v=0; v<li2.length-1; v++){
							for(var q=0; q<li2[v].childNodes.length; q++) {
								if (li2[v].childNodes[q].innerHTML) {
									while (li2[v].childNodes[q].innerHTML.substring(li2[v].childNodes[q].innerHTML.length-1, li2[v].childNodes[q].innerHTML.length) == ' ') {
										li2[v].childNodes[q].innerHTML = li2[v].childNodes[q].innerHTML.substring(0,li2[v].childNodes[q].innerHTML.length-1);
									}
								} else {
									try {
										li2[v].childNodes[q].removeNode();
									} catch(e) {}
								}
							}
							var comma = document.createTextNode(', ');
							li2[v].appendChild(comma);
						}
						/* hide LI after the first five */
						if (li2.length >= 7){
							
							for( var i=5; i<li2.length; i++){
								li2[i].style.display = 'none';
							}
							
							/* automatically insert ... characters after the fifth list to indicate more links */
							var para = document.createElement("li");
							para.style.display = 'inline';
							var text = document.createTextNode("more");
							var nbsp = document.createTextNode( "\u00A0" );
							var ellipses = document.createTextNode("...");
							var elip_link = document.createElement('a');
							elip_link.href = '#';
							elip_link.onclick = showMyNavlinks;
							elip_link.appendChild(text);
							elip_link.appendChild(nbsp);
							elip_link.appendChild(ellipses);
							para.appendChild(elip_link);
							ul2[t].appendChild(para);
							
							/*
							// show hide button
							var show1 = document.getElementById("showlink");
							if (show1) {
								show1.style.display = 'inline';
							} else {
								var d = document.createElement('div');
								d.id = 'showlink';
								show1 = document.createElement('a');
								show1.href = '#';
								show1.onclick = showAllNavlinks;
								d.appendChild(show1);
								ndiv.appendChild(d);
							}*/
						}
					}
				}
			}
		}
		} catch(e) {}
	},
	
	/* substitute window.onload */
	addEvent: function(elm, evType, fn, useCapture){
		if (elm.addEventListener) 
		{
			elm.addEventListener(evType, fn, useCapture);
			return true;
		} else if (elm.attachEvent) {
			var r = elm.attachEvent('on' + evType, fn);
			return r;
		} else {
			elm['on' + evType] = fn;
			return true;
		}
	}
		
}
dc.addEvent(window, 'load', dc.init, false);

/* GetElementsByClass by Dustin Diaz */
function getElementsByClass(node,searchClass,tag) {
var classElements = new Array();
var els = node.getElementsByTagName(tag); // use "*" for all elements
var elsLen = els.length;
var pattern = new RegExp("\\b"+searchClass+"\\b");
for (i = 0, j = 0; i < elsLen; i++) {
 if ( pattern.test(els[i].className) ) {
 classElements[j] = els[i];
 j++;
 }
}
return classElements;
}


// Controls entire layout.
/* Viewport resize script (simon collison)*/
var wraphandler = {

  init: function() {

    if (!document.getElementById) return;

    // set up the appropriate wrapper

    wraphandler.setWrapper();

    // and make sure it gets set up again if you resize the window

    wraphandler.addEvent(window,"resize",wraphandler.setWrapper);

  },



  setWrapper: function() {



    var theWidth = 0;

    if (window.innerWidth) {

	theWidth = window.innerWidth

    } else if (document.documentElement &&

                document.documentElement.clientWidth) {

	theWidth = document.documentElement.clientWidth

    } else if (document.body) {

	theWidth = document.body.clientWidth

    }

    if (theWidth != 0) {

      if (theWidth > 1270) {

        document.getElementById('main_right').className = 'altwrapper';

      } else {
		
			version=0
			if (navigator.appVersion.indexOf("MSIE")!=-1){
			temp=navigator.appVersion.split("MSIE")
			version=parseFloat(temp[1])
			}
			if (version>=5.5) {
				if(theWidth < 1000){
				document.getElementById('header').className = 'ieminwidth';
				document.getElementById('container').className = 'ieminwidth';
				}
			}
			document.getElementById('main_right').className = 'mainwrapper';
      }

    }

  },



  addEvent: function( obj, type, fn ) {

    if ( obj.attachEvent ) {

      obj['e'+type+fn] = fn;

      obj[type+fn] = function(){obj['e'+type+fn]( window.event );}

      obj.attachEvent( 'on'+type, obj[type+fn] );

    } else {

      obj.addEventListener( type, fn, false );

    }

  }

}



wraphandler.addEvent(window,"load",wraphandler.init);

/*	sIFR v2.0.2 SOURCE
	Copyright 2004 - 2006 Mike Davidson, Shaun Inman, Tomas Jogin and Mark Wubben

	This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/

var hasFlash = function(){
	var nRequiredVersion = 6;	
	
	if(navigator.appVersion.indexOf("MSIE") != -1 && navigator.appVersion.indexOf("Windows") > -1){
		document.write('<script language="VBScript"\> \non error resume next \nhasFlash = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & ' + nRequiredVersion + '))) \n</script\> \n');
		/*	If executed, the VBScript above checks for Flash and sets the hasFlash variable. 
			If VBScript is not supported it's value will still be undefined, so we'll run it though another test
			This will make sure even Opera identified as IE will be tested */
		if(window.hasFlash != null){
			return window.hasFlash;
		};
	};
	
	if(navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
		var flashDescription = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description;
		return parseInt(flashDescription.charAt(flashDescription.indexOf(".") - 1)) >= nRequiredVersion;
	};
	
	return false;
}();

String.prototype.normalize = function(){
	return this.replace(/\s+/g, " ");
};

/* IE 5.0 does not support the push method, so here goes */
if(Array.prototype.push == null){
	Array.prototype.push = function(){
		var i = 0, index = this.length, limit = arguments.length;
		while(i < limit){
			this[index++] = arguments[i++];
		};
		return this.length;
	};
};

/*	Implement function.apply for browsers which don't support it natively
	Courtesy of Aaron Boodman - http://youngpup.net */
if (!Function.prototype.apply){
	Function.prototype.apply = function(oScope, args) {
		var sarg = [];
		var rtrn, call;

		if (!oScope) oScope = window;
		if (!args) args = [];

		for (var i = 0; i < args.length; i++) {
			sarg[i] = "args["+i+"]";
		};

		call = "oScope.__applyTemp__(" + sarg.join(",") + ");";

		oScope.__applyTemp__ = this;
		rtrn = eval(call);
		oScope.__applyTemp__ = null;
		return rtrn;
	};
};

/*	The following code parses CSS selectors.
	This script however is not the right place to explain it,
	please visit the documentation for more information. */
var parseSelector = function(){
	var reParseSelector = /^([^#.>`]*)(#|\.|\>|\`)(.+)$/;
	function parseSelector(sSelector, oParentNode){
		var listSelectors = sSelector.split(/\s*\,\s*/);
		var listReturn = [];
		for(var i = 0; i < listSelectors.length; i++){
			listReturn = listReturn.concat(doParse(listSelectors[i], oParentNode));
		};
		
		return listReturn;
	};
	
	function doParse(sSelector, oParentNode, sMode){
		sSelector = sSelector.replace(" ", "`");
		var selector = sSelector.match(reParseSelector);
		var node, listNodes, listSubNodes, subselector, i, limit;
		var listReturn = [];
		
		if(selector == null){ selector = [sSelector, sSelector] };
		if(selector[1] == ""){ selector[1] = "*" };
		if(sMode == null){ sMode = "`" };
		if(oParentNode == null){
			oParentNode = document;
		};

		switch(selector[2]){
			case "#":
				subselector = selector[3].match(reParseSelector);
				if(subselector == null){ subselector = [null, selector[3]] };
				node = 	document.getElementById(subselector[1]);
				if(node == null || (selector[1] != "*" && !matchNodeNames(node, selector[1]))){
					return listReturn;
				};
				if(subselector.length == 2){
					listReturn.push(node);
					return listReturn;	
				};
				return doParse(subselector[3], node, subselector[2]);
			case ".":
				if(sMode != ">"){
					listNodes = getElementsByTagName(oParentNode, selector[1]);
				} else {
					listNodes = oParentNode.childNodes;
				};
				
				for(i = 0, limit = listNodes.length; i < limit; i++){
					node = listNodes[i];
					if(node.nodeType != 1){
						continue;	
					};
					subselector = selector[3].match(reParseSelector);
					if(subselector != null){
						if(node.className == null || node.className.match("(\\s|^)" + subselector[1] + "(\\s|$)") == null){
							continue;
						};
						listSubNodes = doParse(subselector[3], node, subselector[2]);
						listReturn = listReturn.concat(listSubNodes);	
					} else if(node.className != null && node.className.match("(\\s|^)" + selector[3] + "(\\s|$)") != null){
						listReturn.push(node);
					};
				};
				return listReturn;
			case ">":
				if(sMode != ">"){
					listNodes = getElementsByTagName(oParentNode, selector[1]);
				} else {
					listNodes = oParentNode.childNodes;
				};
								
				for(i = 0, limit = listNodes.length; i < limit; i++){
					node = listNodes[i];
					
					if(node.nodeType != 1){
						continue;	
					};
					
					if(!matchNodeNames(node, selector[1])){
						continue;
					};
					listSubNodes = doParse(selector[3], node, ">");
					listReturn = listReturn.concat(listSubNodes);	
				};
				return listReturn;
			case "`":
				listNodes = getElementsByTagName(oParentNode, selector[1]);
				for(i = 0, limit = listNodes.length; i < limit; i++){
					node = listNodes[i];
					listSubNodes = doParse(selector[3], node, "`");
					listReturn = listReturn.concat(listSubNodes);	
				};
				return listReturn;
			default:
				if(sMode != ">"){
					listNodes = getElementsByTagName(oParentNode, selector[1]);
				} else {
					listNodes = oParentNode.childNodes;
				};

				for(i = 0, limit = listNodes.length; i < limit; i++){
					node = listNodes[i];
					if(node.nodeType != 1){
						continue;	
					};
					if(!matchNodeNames(node, selector[1])){
						continue;
					};
					listReturn.push(node);
				};
				return listReturn;
		};
		return false;
	};
	
	function getElementsByTagName(oParentNode, sTagName){
		/*	IE5.x does not support document.getElementsByTagName("*")
			therefore we're falling back to element.all */
		if(sTagName == "*" && oParentNode.all != null){
			return oParentNode.all;
		};
		return oParentNode.getElementsByTagName(sTagName);
	};
	
	function matchNodeNames(node, sMatch){
		if(sMatch == "*"){
			return true;
		};
		return node.nodeName.toLowerCase().replace("html:", "") == sMatch.toLowerCase();
	};
	
	return parseSelector;
}();

/*	Adds named arguments support to JavaScript. */
function named(oArgs){ 
	return new named.Arguments(oArgs);
};

named.Arguments = function(oArgs){
	this.oArgs = oArgs;
};

named.Arguments.prototype.constructor = named.Arguments;

named.extract = function(listPassedArgs, oMapping){
	var oNamedArgs, passedArg;
	
	var i = listPassedArgs.length;
	while(i--){
		passedArg = listPassedArgs[i];
		if(passedArg != null && passedArg.constructor != null && passedArg.constructor == named.Arguments){
			oNamedArgs = listPassedArgs[i].oArgs; /* oNamedArgs isn't the named.Arguments class! */
			break;
		};
	};

	if(oNamedArgs == null){ return };
	
	for(sName in oNamedArgs){
		if(oMapping[sName] != null){
			oMapping[sName](oNamedArgs[sName]);
		};
	};
	
	return;
};

/*	Executes an anonymous function which returns the function sIFR (defined inside the function).
	You can replace elements using sIFR.replaceElement()
	All other variables and methods you see are private. If you want to understand how this works you should
	learn more about the variable-scope in JavaScript. */
var sIFR = function(){
	/* Opera and Mozilla require a namespace when creating elements in an XML page */
	var sNameSpaceURI = "http://www.w3.org/1999/xhtml";
	var bIsInitialized = false;
	var bIsSetUp = false;
	var bInnerHTMLTested = false;
	var sDocumentTitle;
	var stackReplaceElementArguments = [];
	var UA = function(){
		var sUA = navigator.userAgent.toLowerCase();
		var oReturn =  {
			bIsWebKit : sUA.indexOf("applewebkit") > -1,
			bIsSafari : sUA.indexOf("safari") > -1,
			bIsKonq: navigator.product != null && navigator.product.toLowerCase().indexOf("konqueror") > -1,
			bIsOpera : sUA.indexOf("opera") > -1,
			bIsXML : document.contentType != null && document.contentType.indexOf("xml") > -1,
			bHasTransparencySupport : true,
			bUseDOM : true,
			nFlashVersion : null,
			nOperaVersion : null,
			nGeckoBuildDate : null,
			nWebKitVersion : null
		};
		
		oReturn.bIsKHTML = oReturn.bIsWebKit || oReturn.bIsKonq;
		oReturn.bIsGecko = !oReturn.bIsWebKit && navigator.product != null && navigator.product.toLowerCase() == "gecko";
		if(oReturn.bIsGecko && sUA.match(/.*gecko\/(\d{8}).*/)){ oReturn.nGeckoBuildDate = new Number(sUA.match(/.*gecko\/(\d{8}).*/)[1]) };
    if(oReturn.bIsOpera && sUA.match(/.*opera(\s|\/)(\d+\.\d+)/)){ oReturn.nOperaVersion = new Number(sUA.match(/.*opera(\s|\/)(\d+\.\d+)/)[2]) };
		oReturn.bIsIE = sUA.indexOf("msie") > -1 && !oReturn.bIsOpera && !oReturn.bIsKHTML && !oReturn.bIsGecko;
		oReturn.bIsIEMac = oReturn.bIsIE && sUA.match(/.*mac.*/) != null;
		if(oReturn.bIsIE || (oReturn.bIsOpera && oReturn.nOperaVersion < 7.6)){ oReturn.bUseDOM = false };
		if(oReturn.bIsWebKit && sUA.match(/.*applewebkit\/(\d+).*/)){ oReturn.nWebKitVersion = new Number(sUA.match(/.*applewebkit\/(\d+).*/)[1]) };
		if(window.hasFlash && (!oReturn.bIsIE || oReturn.bIsIEMac)){ 
			var flashDescription = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description;
			oReturn.nFlashVersion = parseInt(flashDescription.charAt(flashDescription.indexOf(".") - 1));
		};
		if(sUA.match(/.*(windows|mac).*/) == null || 
		oReturn.bIsIEMac || oReturn.bIsKonq || 
		(oReturn.bIsOpera && oReturn.nOperaVersion < 7.6) || 
		(oReturn.bIsSafari && oReturn.nFlashVersion < 7) ||
		(!oReturn.bIsSafari && oReturn.bIsWebKit && oReturn.nWebKitVersion < 312) || 
		(oReturn.bIsGecko && oReturn.nGeckoBuildDate < 20020523)){
			oReturn.bHasTransparencySupport = false;
		};

		if(!oReturn.bIsIEMac && !oReturn.bIsGecko && document.createElementNS){
			try {
				document.createElementNS(sNameSpaceURI, "i").innerHTML = "";
			} catch(e){
				oReturn.bIsXML = true;
			};
		};
		
		oReturn.bUseInnerHTMLHack = oReturn.bIsKonq || (oReturn.bIsWebKit && oReturn.nWebKitVersion < 312);
		
		return oReturn;
	}();
	
	/*	Disable sIFR for non-Flash or old browsers
		Also disable it for IE and KHTML browsers in XML mode, since we are using innerHTML for those browsers */
	if(window.hasFlash == false || !document.createElement || !document.getElementById || (UA.bIsXML && (UA.bUseInnerHTMLHack || UA.bIsIE))){
		return {UA:UA};
	};
	
	function sIFR(e){
		if((!self.bAutoInit && (window.event || e) != null) || !mayReplace(e)){
			return;	
		};
		bIsInitialized = true;
		
		for(var i = 0, limit = stackReplaceElementArguments.length; i < limit; i++){
			replaceElement.apply(null, stackReplaceElementArguments[i]);
		};
		stackReplaceElementArguments = [];
	};
	
	var self = sIFR;

	function mayReplace(e){
		if(bIsSetUp == false || self.bIsDisabled == true || ((UA.bIsXML && UA.bIsGecko || UA.bIsKHTML) && e == null && bIsInitialized == false) || (document.body == null || document.getElementsByTagName("body").length == 0)){
			return false;
		};
		return true;
	};
	
	function escapeHex(sHex){
		if(UA.bIsIE){ /* The RegExp for IE breaks old Gecko's, the RegExp for non-IE breaks IE 5.01 */
			return sHex.replace(new RegExp("%\d{0}", "g"), "%25");
		}
		return sHex.replace(new RegExp("%(?!\d)", "g"), "%25");
	};
	
	function matchNodeNames(node, sMatch){
		if(sMatch == "*"){
			return true;
		};	
		return node.nodeName.toLowerCase().replace("html:", "") == sMatch.toLowerCase();
	};

	function fetchContent(node, nodeNew, sCase, nLinkCount, sLinkVars){
		var sContent = "";
		var oSearch = node.firstChild;
		var oRemove, nodeRemoved, oResult, sValue;

		if(nLinkCount == null){ nLinkCount = 0 };
		if(sLinkVars == null){ sLinkVars = "" };

		while(oSearch){
			if(oSearch.nodeType == 3){
				sValue = oSearch.nodeValue.replace("<", "&lt;");
				switch(sCase){
					case "lower":
						sContent += sValue.toLowerCase();
						break;
					case "upper":
						sContent += sValue.toUpperCase();
						break;
					default:
						sContent += sValue;
				};
			} else if(oSearch.nodeType == 1){
				if(matchNodeNames(oSearch, "a") && !oSearch.getAttribute("href") == false){
					if(oSearch.getAttribute("target")){
						sLinkVars += "&sifr_url_" + nLinkCount + "_target=" + oSearch.getAttribute("target");
					};
					sLinkVars += "&sifr_url_" + nLinkCount + "=" + escapeHex(oSearch.getAttribute("href")).replace(/&/g, "%26");
					sContent += '<a href="asfunction:_root.launchURL,' + nLinkCount + '">';
					nLinkCount++;
				} else if(matchNodeNames(oSearch, "br")){
					sContent += "<br/>";
				};
				if(oSearch.hasChildNodes()){
					/*	The childNodes are already copied with this node, so nodeNew = null */
					oResult = fetchContent(oSearch, null, sCase, nLinkCount, sLinkVars);
					sContent += oResult.sContent;
					nLinkCount = oResult.nLinkCount;
					sLinkVars = oResult.sLinkVars;
				};
				if(matchNodeNames(oSearch, "a")){
					sContent += "</a>";
				};
			};
			oRemove = oSearch;
			oSearch = oSearch.nextSibling;
			if(nodeNew != null){
				nodeRemoved = oRemove.parentNode.removeChild(oRemove);
				nodeNew.appendChild(nodeRemoved);	
			};
		};
		
		return {"sContent" : sContent, "nLinkCount" : nLinkCount, "sLinkVars" : sLinkVars};
	};
	
	function createElement(sTagName){
		if(document.createElementNS && UA.bUseDOM){
			return document.createElementNS(sNameSpaceURI, sTagName);	
		} else {
			return document.createElement(sTagName);
		};
		return false;
	};

	function createObjectParameter(nodeObject, sName, sValue){
		var node = createElement("param");
		node.setAttribute("name", sName);	
		node.setAttribute("value", sValue);
		nodeObject.appendChild(node);
	};
	
	/*	Konqueror does not treat empty classNames as strings, so we need a workaround */
	function appendToClassName(node, sAppend){
		var sClassName = node.className;
		if(sClassName == null){
			sClassName = sAppend;
		} else {
			sClassName = sClassName.normalize() + (sClassName == "" ? "" : " ") + sAppend;
		};
		node.className = sClassName;
	};
	
	function prepare(bNow){
		var node = document.documentElement;
		if(self.bHideBrowserText == false){
			node = document.getElementsByTagName("body")[0];
		};
		if((self.bHideBrowserText == false || bNow) && node){
			if(node.className == null || node.className.match(/\bsIFR\-hasFlash\b/) == null){
				appendToClassName(node, "sIFR-hasFlash");
			};
		};
	};
	
	function replaceElement(sSelector, sFlashSrc, sColor, sLinkColor, sHoverColor, sBgColor, nPaddingTop, nPaddingRight, nPaddingBottom, nPaddingLeft, sFlashVars, sCase, sWmode){
		if(!mayReplace()){
			return stackReplaceElementArguments.push(arguments);	
		};

		prepare();
		
		/*	Extract any named arguments.	*/
		named.extract(arguments, {
			sSelector : function(value){ sSelector = value },
			sFlashSrc : function(value){ sFlashSrc = value },
			sColor : function(value){ sColor = value },
			sLinkColor : function(value){ sLinkColor = value },
			sHoverColor : function(value){ sHoverColor = value },
			sBgColor : function(value){ sBgColor = value },
			nPaddingTop : function(value){ nPaddingTop = value },
			nPaddingRight : function(value){ nPaddingRight = value },
			nPaddingBottom : function(value){ nPaddingBottom = value },
			nPaddingLeft : function(value){ nPaddingLeft = value },
			sFlashVars : function(value){ sFlashVars = value },
			sCase : function(value){ sCase = value },
			sWmode : function(value){ sWmode = value }
		});

		/* Check if we can find any nodes first */
		var listNodes = parseSelector(sSelector);
		if(listNodes.length == 0){ return false };

		/*	Set default values. */
		if(sFlashVars != null){
			sFlashVars = "&" + sFlashVars.normalize();
		} else {
			sFlashVars = "";	
		};
		
		if(sColor != null){sFlashVars += "&textcolor=" + sColor};
		if(sHoverColor != null){sFlashVars += "&hovercolor=" + sHoverColor};
		if(sHoverColor != null || sLinkColor != null){sFlashVars += "&linkcolor=" + (sLinkColor || sColor)};
		
		if(nPaddingTop == null){ nPaddingTop = 0 };
		if(nPaddingRight == null){ nPaddingRight = 0 };
		if(nPaddingBottom == null){ nPaddingBottom = 0 };
		if(nPaddingLeft == null){ nPaddingLeft = 0 };

		if(sBgColor == null){ sBgColor = "#FFFFFF" };
		
		if(sWmode == "transparent"){
			if(!UA.bHasTransparencySupport){
				sWmode = "opaque";
			} else {
				sBgColor = "transparent";
			};
		};
		
		if(sWmode == null){ sWmode = "" };
	
		/*	Do the actual replacement. */
		var node, sWidth, sHeight, sMargin, sPadding, sVars, nodeAlternate, nodeFlash, oContent;
		var nodeFlashTemplate = null;

		for(var i = 0, limit = listNodes.length; i < limit; i++){
			node = listNodes[i];

			/* Prevents elements from being replaced multiple times. */
			if(node.className != null && node.className.match(/\bsIFR\-replaced\b/) != null){ continue };
			
			sWidth = node.offsetWidth - nPaddingLeft - nPaddingRight;
			sHeight = node.offsetHeight - nPaddingTop - nPaddingBottom;
			
			if(isNaN(sWidth) || isNaN(sHeight)){
				self.bIsDisabled = true;
				document.documentElement.className = document.documentElement.className.replace(/\bsIFR\-hasFlash\b/, "");
				return false;
			};

			nodeAlternate = createElement("span");
			nodeAlternate.className = "sIFR-alternate";

			oContent = fetchContent(node, nodeAlternate, sCase);
			sVars = "txt=" + escapeHex(oContent.sContent).replace(/\+/g, "%2B").replace(/&/g, "%26").replace(/\"/g, "%22").normalize() + sFlashVars + "&w=" + sWidth + "&h=" + sHeight + oContent.sLinkVars;
			
			appendToClassName(node, "sIFR-replaced");

			/*	Opera only supports the object element, other browsers are given the embed element,
				for backwards compatibility reasons between different browser versions.
				Opera versions below 7.60 use innerHTML, from 7.60 and up we use the DOM */

			if(nodeFlashTemplate == null || !UA.bUseDOM){
				if(!UA.bUseDOM){
				  if(!UA.bIsIE)
  					node.innerHTML = ['<embed class="sIFR-flash" type="application/x-shockwave-flash" src="', sFlashSrc, '" quality="best" wmode="', sWmode, '" bgcolor="', sBgColor, '" flashvars="', sVars, '" width="', sWidth, '" height="', sHeight, '" sifr="true"></embed>'].join("");
  				else
  				  node.innerHTML = ['<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" sifr="true" width="', sWidth, '" height="', sHeight, '" class="sIFR-flash">',
    				                    '<param name="movie" value="', sFlashSrc, "?", sVars, '"></param>',
    				                    '<param name="quality" value="best"></param>',
    				                    '<param name="wmode" value="', sWmode, '"></param>',
    				                    '<param name="bgcolor" value="', sBgColor, '"></param>',
    				                  '</object>'].join('');
				} else {
					if(UA.bIsOpera){
						nodeFlash = createElement("object");
						nodeFlash.setAttribute("data", sFlashSrc);
						createObjectParameter(nodeFlash, "quality", "best");
						createObjectParameter(nodeFlash, "wmode", sWmode);
						createObjectParameter(nodeFlash, "bgcolor", sBgColor);
				  } else {
						nodeFlash = createElement("embed");
						nodeFlash.setAttribute("src", sFlashSrc);
						nodeFlash.setAttribute("quality", "best");
						nodeFlash.setAttribute("flashvars", sVars);
						nodeFlash.setAttribute("wmode", sWmode);
						nodeFlash.setAttribute("bgcolor", sBgColor);
						nodeFlash.setAttribute("pluginspace", "http://www.macromedia.com/go/getflashplayer");
						nodeFlash.setAttribute("scale", "noscale");
					};
					nodeFlash.setAttribute("sifr", "true");
					nodeFlash.setAttribute("type", "application/x-shockwave-flash");
					nodeFlash.className = "sIFR-flash";
					if(!UA.bIsKHTML || !UA.bIsXML){
						nodeFlashTemplate = nodeFlash.cloneNode(true);
					};
				};
			} else {
				nodeFlash = nodeFlashTemplate.cloneNode(true);
			};
			if(UA.bUseDOM){
				/* General settings */
				if(UA.bIsOpera){
					createObjectParameter(nodeFlash, "flashvars", sVars);
				} else {
					nodeFlash.setAttribute("flashvars", sVars);
				};
				nodeFlash.setAttribute("width", sWidth);
				nodeFlash.setAttribute("height", sHeight);
				nodeFlash.style.width = sWidth + "px";
				nodeFlash.style.height = sHeight + "px";
				node.appendChild(nodeFlash);
			};
			
			node.appendChild(nodeAlternate);

			/*	Workaround to force KHTML-browsers to repaint the document. 
				Additionally, IE for both Mac and PC need this.
				See: http://neo.dzygn.com/archive/2004/09/forcing-safari-to-repaint */

			if(UA.bUseInnerHTMLHack){
				node.innerHTML += "";
			};
		};
		
		if(UA.bIsIE && self.bFixFragIdBug){
			setTimeout(function(){document.title = sDocumentTitle}, 0);
		};
		return false;
	};
	
	function updateDocumentTitle(){
		sDocumentTitle = document.title;
	};
	
	function setup(){
		if(self.bIsDisabled == true){ return };

		bIsSetUp = true;
		/*	Providing a hook for you to hide certain elements if Flash has been detected. */
		if(self.bHideBrowserText){
			prepare(true);
		};
		
		if(window.attachEvent){
			window.attachEvent("onload", sIFR);
		} else if(!UA.bIsKonq && (document.addEventListener || window.addEventListener)){
			if(document.addEventListener){
				document.addEventListener("load", sIFR, false);	
			};
			if(window.addEventListener){
				window.addEventListener("load", sIFR, false);	
			};
		} else {
			if(typeof window.onload == "function"){
				var fOld = window.onload;
				window.onload = function(){ fOld(); sIFR(); };
			} else {
				window.onload = sIFR;
			};
		};
		
		if(!UA.bIsIE || window.location.hash == ""){
			self.bFixFragIdBug = false;
		} else {
			updateDocumentTitle();
		};
	};
	
	function debug(){
		prepare(true);
	};
	
	debug.replaceNow = function(){
		setup();
		sIFR();
	};
	
	/* Public Fields */
	self.UA = UA;
	self.bAutoInit = true;
	self.bFixFragIdBug = true;
	self.replaceElement = replaceElement;
	self.updateDocumentTitle = updateDocumentTitle;
	self.appendToClassName = appendToClassName;
	self.setup = setup;
	self.debug = debug;
	self.bIsDisabled = false;
	self.bHideBrowserText = true;
	
	return self;
}();

/*	sIFR setup. You can add browser detection here. 
	sIFR's browser detection is exposed through sIFR.UA. */

if(typeof sIFR == "function" && !sIFR.UA.bIsIEMac && sIFR.UA.bHasTransparencySupport ){
	sIFR.setup();
};// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// 
// Coded by Travis Beckham
// http://www.squidfingers.com | http://www.podlob.com
// If want to use this code, feel free to do so, but please leave this message intact.
//
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// --- version date: 01/24/03 ---------------------------------------------------------

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Cross-Browser Functions

var dom = document.getElementById;
var iex = document.all;
var ns4 = document.layers;

function addEvent(event,method){
	this[event] = method;
	if(ns4) this.captureEvents(Event[event.substr(2,event.length).toUpperCase()]);
}
function removeEvent(event){
	this[event] = null;
	if(ns4) this.releaseEvents(Event[event.substr(2,event.length).toUpperCase()]);
}
function getElement(name,nest){
	nest = nest ? "document."+nest+"." : "";
	var el = dom ? document.getElementById(name) : iex ? document.all[name] : ns4 ? eval(nest+"document."+name) : false;
	el.css = ns4 ? el : el.style;
	el.getTop = function(){return parseInt(el.css.top) || 0};
	el.setTop = function(y){el.css.top = ns4 ? y: y+"px"};
	el.getHeight = function(){return ns4 ? el.document.height : el.offsetHeight};
	el.getClipHeight = function(){return ns4 ? el.clip.height : el.offsetHeight};
	el.hideVis = function(){el.css.display="none"};
	el.unhideVis = function(){el.css.display="block"};
	el.addEvent = addEvent;
	el.removeEvent = removeEvent;
	return el;
}
function getYMouse(e){
	return iex ? event.clientY : e.pageY;
}

document.addEvent = addEvent;
document.removeEvent = removeEvent;

// ||||||||||||||||||||||||||||||||||||||||||||||||||
// Scroller Class

var ScrollObj = function(speed, dragHeight, trackHeight, trackObj, upObj, downObj, dragObj, contentMaskObj, contentObj){
	this.speed = speed;
	this.dragHeight = dragHeight;
	this.trackHeight = trackHeight;
	this.trackObj = getElement(trackObj);
	this.upObj = getElement(upObj);
	this.downObj = getElement(downObj);
	this.dragObj = getElement(dragObj);
	this.contentMaskObj = getElement(contentMaskObj);
	this.contentObj = getElement(contentObj,contentMaskObj);
	this.obj = contentObj+"Object";
	eval(this.obj+"=this");
	
	this.trackTop = this.upObj.getTop() + this.upObj.getHeight();
	this.trackLength = this.trackHeight-this.dragHeight;
	this.trackBottom = this.trackTop+this.trackLength;
	this.contentMaskHeight = this.contentMaskObj.getClipHeight();
	this.contentHeight = this.contentObj.getHeight();
	this.contentLength = this.contentHeight-this.contentMaskHeight;
	this.scrollLength = this.trackLength/this.contentLength;
	this.scrollTimer = null;
	
	if(this.contentHeight <= this.contentMaskHeight){

		this.dragObj.hideVis();
		this.trackObj.hideVis();
		this.upObj.hideVis();
		this.downObj.hideVis();

	}else{
		var self = this;
		
		this.dragObj.unhideVis();
		this.trackObj.unhideVis();
		this.upObj.unhideVis();
		this.downObj.unhideVis();
		
		this.dragObj.setTop(this.trackObj.getTop()+this.upObj.getHeight());
		
		this.trackObj.addEvent("onmousedown", function(e){self.scrollJump(e);return false});
		this.upObj.addEvent("onmousedown", function(){self.scroll(self.speed);return false});
		this.upObj.addEvent("onmouseup", function(){self.stopScroll()});
		this.upObj.addEvent("onmouseout", function(){self.stopScroll()});
		this.downObj.addEvent("onmousedown", function(){self.scroll(-self.speed);return false});
		this.downObj.addEvent("onmouseup", function(){self.stopScroll()});
		this.downObj.addEvent("onmouseout", function(){self.stopScroll()});
		this.dragObj.addEvent("onmousedown", function(e){self.startDrag(e);return false});
		if(iex) this.dragObj.addEvent("ondragstart", function(){return false});
	}
}
ScrollObj.prototype.startDrag = function(e){
	this.dragStartMouse = getYMouse(e);
	this.dragStartOffset = this.dragObj.getTop();
	var self = this;
	document.addEvent("onmousemove", function(e){self.drag(e)});
	document.addEvent("onmouseup", function(){self.stopDrag()});
}
ScrollObj.prototype.stopDrag = function(){
	document.removeEvent("onmousemove");
	document.removeEvent("onmouseup");
}
ScrollObj.prototype.drag = function(e){
	var currentMouse = getYMouse(e);
	var mouseDifference = currentMouse-this.dragStartMouse;
	var dragDistance = this.dragStartOffset+mouseDifference;
	var dragMovement = (dragDistance<this.trackTop) ? this.trackTop : (dragDistance>this.trackBottom) ? this.trackBottom : dragDistance;
	this.dragObj.setTop(dragMovement);
	var contentMovement = -(dragMovement-this.trackTop)*(1/this.scrollLength);
	this.contentObj.setTop(contentMovement);
}
ScrollObj.prototype.scroll = function(speed){
	var contentMovement = this.contentObj.getTop()+speed;
	var dragMovement = this.trackTop-Math.round(this.contentObj.getTop()*(this.trackLength/this.contentLength));
	if(contentMovement > 0){
		contentMovement = 0;
	}else if(contentMovement < -this.contentLength){
		contentMovement = -this.contentLength;
	}
	if(dragMovement < this.trackTop){
		dragMovement = this.trackTop;
	}else if(dragMovement > this.trackBottom){
		dragMovement = this.trackBottom;
	}
	this.contentObj.setTop(contentMovement);
	this.dragObj.setTop(dragMovement);
	this.scrollTimer = window.setTimeout(this.obj+".scroll("+speed+")",25);
}
ScrollObj.prototype.stopScroll = function(){
	if(this.scrollTimer){
		window.clearTimeout(this.scrollTimer);
		this.scrollTimer = null;
	}
}
ScrollObj.prototype.scrollJump = function(e){
	var currentMouse = getYMouse(e);
	var dragDistance = currentMouse-(this.dragHeight/2);
	var dragMovement = (dragDistance<this.trackTop) ? this.trackTop : (dragDistance>this.trackBottom) ? this.trackBottom : dragDistance;
	this.dragObj.setTop(dragMovement);
	var contentMovement = -(dragMovement-this.trackTop)*(1/this.scrollLength);
	this.contentObj.setTop(contentMovement);
}

ScrollObj.prototype.reset = function(){
// recalculate everything
	this.trackTop = this.upObj.getTop() + this.upObj.getHeight();
	this.trackLength = this.trackHeight-this.dragHeight;
	this.trackBottom = this.trackTop+this.trackLength;
	this.contentMaskHeight = this.contentMaskObj.getClipHeight();
	this.contentHeight = this.contentObj.getHeight();
	this.contentLength = this.contentHeight-this.contentMaskHeight;
	this.scrollLength = this.trackLength/this.contentLength;
	this.scrollTimer = null;
// movethings to the correct new locations
	this.dragObj.setTop(this.trackObj.getTop()+this.upObj.getHeight());
	this.contentObj.setTop(this.contentMaskObj.getTop());

}

// ||||||||||||||||||||||||||||||||||||||||||||||||||
// Misc Functions

function fixNetscape4(){
	if(ns4origWidth != window.innerWidth || ns4origHeight != window.innerHeight){
		window.location.reload();
	}	
}
if(document.layers){
	ns4origWidth = window.innerWidth;
	ns4origHeight = window.innerHeight;
	window.onresize = fixNetscape4;
}

// ||||||||||||||||||||||||||||||||||||||||||||||||||
/* Spry.Effect.js - Revision: Spry Preview Release 1.3 */

// Copyright (c) 2006. Adobe Systems Incorporated.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name of Adobe Systems Incorporated nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.



var Spry;

if (!Spry) Spry = {};

Spry.forwards = 1; // const
Spry.backwards = 2; // const

Spry.linearTransition = 1; // const
Spry.sinusoidalTransition = 2; // const

if (!Spry.Effect) Spry.Effect = {};

//////////////////////////////////////////////////////////////////////
//
// Spry.Effect.Registry
//
//////////////////////////////////////////////////////////////////////

Spry.Effect.Registry = function()
{
	this.elements = new Array();
};
 
Spry.Effect.Registry.prototype.getRegisteredEffect = function(element, effect) 
{
	var eleIdx = this.getIndexOfElement(element);

	if (eleIdx == -1)
	{
		var addedElement = new Spry.Effect.AnimatedElement(element);
		this.elements[this.elements.length] = addedElement;
		eleIdx = this.elements.length - 1;
	}

	var foundEffectArrayIdx = -1;
	for (var i = 0; i < this.elements[eleIdx].effectArray.length; i++) 
	{
		if (this.elements[eleIdx].effectArray[i])
		{
			if (this.effectsAreTheSame(this.elements[eleIdx].effectArray[i], effect))
			{
				foundEffectArrayIdx = i;
				this.elements[eleIdx].effectArray[i].reset(); // bb
				this.elements[eleIdx].currentEffect = i;
				if (this.elements[eleIdx].effectArray[i].options && (this.elements[eleIdx].effectArray[i].options.toggle != null)) {
					if (this.elements[eleIdx].effectArray[i].options.toggle == true)
						this.elements[eleIdx].effectArray[i].doToggle();
				} else { // same effect name (but no options or options.toggle field)
					this.elements[eleIdx].effectArray[i] = effect;
				}

				break;
			}
		}
	}

	if (foundEffectArrayIdx == -1) 
	{
		var currEffectIdx = this.elements[eleIdx].effectArray.length;
		this.elements[eleIdx].effectArray[currEffectIdx] = effect;
		this.elements[eleIdx].currentEffect = currEffectIdx;
	}

	var idx = this.elements[eleIdx].currentEffect;
	return this.elements[eleIdx].effectArray[idx];
};

Spry.Effect.Registry.prototype.getIndexOfElement = function(element)
{
	var registryIndex = -1;
	for (var i = 0; i < this.elements.length; i++)
	{
		if (this.elements[i]) {
			if (this.elements[i].element == element)
				registryIndex = i;
		}
	}
	return registryIndex;
};

Spry.Effect.Registry.prototype.effectsAreTheSame = function(effectA, effectB)
{
	if (effectA.name != effectB.name) 
		return false;

	//if(effectA.queue != null) xxx

	if(effectA.effectsArray != null) // cluster effect
	{
		for (var i = 0; i < effectA.effectsArray.length; i++)
		{
			if(!Spry.Effect.Utils.optionsAreIdentical(effectA.effectsArray[i].effect.options, effectB.effectsArray[i].effect.options))
				return false;
		}
	}
	else // single effect
	{
		if(!Spry.Effect.Utils.optionsAreIdentical(effectA.options, effectB.options))
			return false;
	}

	return true;
};


var SpryRegistry = new Spry.Effect.Registry;

//////////////////////////////////////////////////////////////////////
//
// Spry.Effect.Utils
//
//////////////////////////////////////////////////////////////////////

if (!Spry.Effect.Utils) Spry.Effect.Utils = {};

Spry.Effect.Utils.Position = function()
{
	this.x = 0; // left
	this.y = 0; // top
};

Spry.Effect.Utils.Rectangle = function()
{
	this.width = 0;
	this.height = 0;
};

Spry.Effect.Utils.PositionedRectangle = function()
{
	this.position = new Spry.Effect.Utils.Position;
	this.rectangle = new Spry.Effect.Utils.Rectangle;
};

Spry.Effect.Utils.intToHex = function(integerNum) 
{
	var result = integerNum.toString(16);
	if (result.length == 1) 
		result = "0" + result;
	return result;
};

Spry.Effect.Utils.hexToInt = function(hexStr) 
{
	return parseInt(hexStr, 16); 
};

Spry.Effect.Utils.rgb = function(redInt, greenInt, blueInt) 
{
	
	var redHex = Spry.Effect.Utils.intToHex(redInt);
	var greenHex = Spry.Effect.Utils.intToHex(greenInt);
	var blueHex = Spry.Effect.Utils.intToHex(blueInt);
	compositeColorHex = redHex.concat(greenHex, blueHex);
	compositeColorHex = '#' + compositeColorHex;
	return compositeColorHex;
};

Spry.Effect.Utils.camelize = function(stringToCamelize)
{
    var oStringList = stringToCamelize.split('-');
    if (oStringList.length == 1) 
		return oStringList[0];

    var camelizedString = stringToCamelize.indexOf('-') == 0
      ? oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1)
      : oStringList[0];

    for (var i = 1, len = oStringList.length; i < len; i++) {
      var s = oStringList[i];
      camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
    }

    return camelizedString;
};

Spry.Effect.Utils.isPercentValue = function(value) 
{
	var result = false;
	try
	{
		if (value.lastIndexOf("%") > 0)
			result = true;
	}
	catch (e) {}
	return result;
};

Spry.Effect.Utils.getPercentValue = function(value) 
{
	var result = 0;
	try
	{
		result = value.substring(0, value.lastIndexOf("%"));
	}
	catch (e) {alert('ERR: Spry.Effect.Utils.getPercentValue: ' + e);}
	return result;
};

Spry.Effect.Utils.getPixelValue = function(value) 
{
	var result = 0;
	try
	{
		result = value.substring(0, value.lastIndexOf("px"));
	}
	catch (e) {}
	return result;
};

Spry.Effect.Utils.getFirstChildElement = function(node)
{
	if (node)
	{
		var childCurr = node.firstChild;

		while (childCurr)
		{
			if (childCurr.nodeType == 1) // Node.ELEMENT_NODE
				return childCurr;

			childCurr = childCurr.nextSibling;
		}
	}

	return null;
};

Spry.Effect.Utils.optionsAreIdentical = function(optionsA, optionsB)
{
	if(optionsA == null && optionsB == null)
		return true;

	if(optionsA != null && optionsB != null)
	{
		var objectCountA = 0;
		var objectCountB = 0;

		for (var propA in optionsA) objectCountA++;
		for (var propB in optionsB) objectCountB++;

		if(objectCountA != objectCountB)
			return false;

		for (var prop in optionsA)
			if((optionsB[prop] === undefined) || (optionsA[prop] != optionsB[prop]))
				return false;

		return true;
	}

	return false;
};


//////////////////////////////////////////////////////////////////////
//
// DHTML manipulation
//
//////////////////////////////////////////////////////////////////////

Spry.Effect.getElement = function(ele)
{
	var element = null;
	if (ele && typeof ele == "string")
		element = document.getElementById(ele);
	else
		element = ele;
	if (element == null) alert('ERROR in Spry.Effect.js: Element "' + ele + '" not found.');
	return element;
	
};

Spry.Effect.getStyleProp = function(element, prop)
{
	var value;

	try
	{
		value = element.style[Spry.Effect.Utils.camelize(prop)];
		if (!value)
		{
			if (document.defaultView && document.defaultView.getComputedStyle) {
				var css = document.defaultView.getComputedStyle(element, null);
				value = css ? css.getPropertyValue(prop) : null;
			} else if (element.currentStyle) {
				value = element.currentStyle[Spry.Effect.Utils.camelize(prop)];
			}
		}
	}
	catch (e) {alert('ERR: Spry.Effect.getStyleProp: ' + e);}

	return value == 'auto' ? null : value;
};

Spry.Effect.setStyleProp = function(element, prop, value)
{
	try
	{
		element.style[Spry.Effect.Utils.camelize(prop)] = value;
	}
	catch (e) {alert('ERR: Spry.Effect.setStyleProp: ' + e);}

	return null;
};

Spry.Effect.makePositioned = function(element)
{
	var pos = Spry.Effect.getStyleProp(element, 'position');
	if (!pos || pos == 'static') {
		element.style.position = 'relative';
		// Opera returns the offset relative to the positioning context, when an
		// element is position relative but top and left have not been defined
		/*
		if (window.opera) {
			element.style.top = 0;
			element.style.left = 0;
		}
		*/
	}
};

Spry.Effect.enforceVisible = function(element)
{
	var propDisplay = Spry.Effect.getStyleProp(element, 'display');
	if (propDisplay && propDisplay.toLowerCase() == 'none')
		Spry.Effect.setStyleProp(element, 'display', '');

	var propVisible = Spry.Effect.getStyleProp(element, 'visibility');
	if (propVisible && propVisible.toLowerCase() == 'hidden')
		Spry.Effect.setStyleProp(element, 'visibility', 'visible');
};

Spry.Effect.makeClipping = function(element) 
{
	var overflow = Spry.Effect.getStyleProp(element, 'overflow');
	if (overflow != 'hidden')
		element.style.overflow = 'hidden';
};

Spry.Effect.cleanWhitespace = function(element) 
{
    for (var i = 0; i < element.childNodes.length; i++) {
      var node = element.childNodes[i];
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
	  {
		  try
		  {
		 	element.parentNode.removeChild(element);
		  }
		  catch (e) {alert('ERR: Spry.Effect.cleanWhitespace: ' + e);}
	  }
    }
};

Spry.Effect.getDimensions = function(element) 
{
	dimensions = new Spry.Effect.Utils.Rectangle;
	if (Spry.Effect.getStyleProp(element, 'display') != 'none')
	{
		dimensions.width = element.offsetWidth;
		dimensions.height = element.offsetHeight;
	}
	return dimensions;

    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
	/*
    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    els.visibility = 'hidden';
    els.position = 'absolute';
    els.display = '';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = 'none';
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
	*/
};

Spry.Effect.getOffsetPosition = function(element)
{
	var position = new Spry.Effect.Utils.Position;
	if (element.offsetTop != null)
	{
		position.y = element.offsetTop;
	}
	if (element.offsetLeft != null)
	{
		position.x = element.offsetLeft;
	}
	return position;
};


//////////////////////////////////////////////////////////////////////
//
// Spry.Effect.Animator
// (super type)
//
//////////////////////////////////////////////////////////////////////

Spry.Effect.Animator = function(options)
{
	
	this.timer = null;
	this.interval = 42; //33; // ca. 30 fps
	this.direction = Spry.forwards;
	this.startMilliseconds = 0;
	this.repeat = 'none';
	this.nextEffect = null;
	this.isFinished = false;
	
	this.options = {
		duration: 500,
		toggle: false,
		transition: Spry.linearTransition
	};
	
	this.setOptions(options);
	
};

Spry.Effect.Animator.prototype.setOptions = function(options)
{
	if (!options)
		return;
	for (var prop in options)
		this.options[prop] = options[prop];
};

Spry.Effect.Animator.prototype.start = function(queue)
{
	this.isFinished = false;
	this.queue = queue;
	var self = this;

	if (this.options.setup)
	{
		try
		{
			this.options.setup(this.element, this);
		}
		catch (e) {
		//alert('ERR: Spry.Effect.Animator.prototype.start: ' + e);
		}
	}
	
	var currDate = new Date();
	this.startMilliseconds = currDate.getTime();
	this.timer = setInterval(function() { self.drawEffect(); }, this.interval);
};

Spry.Effect.Animator.prototype.stop = function()
{
	
	if (this.timer) {
		clearInterval(this.timer);
		this.timer = null;
	}

	this.startMilliseconds = 0;

	if (this.queue != null)
	{
		this.queue.startNextEffect();
	}
	else 
	{
		if (this.options.finish)
		{
			try
			{
				this.options.finish(this.element, this);
			}
			catch (e) {
			//alert('ERR: Spry.Effect.Animator.prototype.stop: ' + e);
			}
		}
		this.isFinished = true;
	}
	/*
	Spry.Debug.trace('after stop:' + this.name);
	Spry.Debug.trace('this.element.style.top: ' + this.element.style.top);
	Spry.Debug.trace('this.element.style.left: ' + this.element.style.left);
	Spry.Debug.trace('this.element.style.width: ' + this.element.style.width);
	Spry.Debug.trace('this.element.style.height: ' + this.element.style.height);
	*/
};

Spry.Effect.Animator.prototype.cancel = function()
{
	if (this.timer) {
		clearInterval(this.timer);
		this.timer = null;
	}
	this.isFinished = true;
};

Spry.Effect.Animator.prototype.drawEffect = function()
{
	// default: linear transition
	var position = this.getElapsedMilliseconds() / this.options.duration;
	if (this.getElapsedMilliseconds() > this.options.duration) {
		position = 1.0;
	} else {
		if (this.options.transition == Spry.sinusoidalTransition)
		{
			position = (-Math.cos(position*Math.PI)/2) + 0.5;
		}
		else if (this.options.transition == Spry.linearTransition)
		{
			// default: linear
		}
		else
		{
			alert('unknown transition');
		}
		
	}
	//Spry.Debug.trace('animate: ' + position + ' : ' + this.name);
	this.animate(position);
	
	if (this.getElapsedMilliseconds() > this.options.duration) {
		this.stop();
	}
};

Spry.Effect.Animator.prototype.getElapsedMilliseconds = function()
{
	if (this.startMilliseconds > 0) {
		var currDate = new Date();
		return (currDate.getTime() - this.startMilliseconds);
	} else {
		return 0;
	}
};

Spry.Effect.Animator.prototype.doToggle = function()
{
	if (this.options.toggle == true) {
		if (this.direction == Spry.forwards) {
			this.direction = Spry.backwards;
		} else if (this.direction == Spry.backwards) {
			this.direction = Spry.forwards;
		}
	}
};

Spry.Effect.Animator.prototype.animate = function(position) {};

//////////////////////////////////////////////////////////////////////
//
// Spry.Effect.Move
//
//////////////////////////////////////////////////////////////////////

Spry.Effect.Move = function(element, fromPos, toPos, options)
{
	this.name = 'Move';
	
	Spry.Effect.Animator.call(this, options);

	this.element = Spry.Effect.getElement(element);

	this.startX = fromPos.x;
	this.stopX = toPos.x;
	this.startY = fromPos.y;
	this.stopY = toPos.y;
	
	this.rangeMoveX = this.startX - this.stopX;
	this.rangeMoveY= this.startY - this.stopY;
	
};

Spry.Effect.Move.prototype = new Spry.Effect.Animator();
Spry.Effect.Move.prototype.constructor = Spry.Effect.Move;

Spry.Effect.Move.prototype.animate = function(position)
{
	var left = 0;
	var top = 0;
	
	if (this.direction == Spry.forwards) {
		left = this.startX - (this.rangeMoveX * position);
		top = this.startY - (this.rangeMoveY * position);
	} else if (this.direction == Spry.backwards) {
		left = this.rangeMoveX * position + this.stopX;
		top = this.rangeMoveY * position + this.stopY;
	}

	//Spry.Debug.trace(top);
	
	this.element.style.left = left + "px";
	this.element.style.top = top + "px";
};

Spry.Effect.Move.prototype.reset = function()
{
	if(!this.isFinished)
	{
		this.cancel();
		this.startX = this.startX;
		this.startY = this.startY;
	}
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Effect.MoveSlide
//
//////////////////////////////////////////////////////////////////////

Spry.Effect.MoveSlide = function(element, fromPos, toPos, options)
{
	this.name = 'MoveSlide';

	Spry.Effect.Animator.call(this, options);

	this.element = Spry.Effect.getElement(element);
	this.firstChildElement = Spry.Effect.Utils.getFirstChildElement(element);

	var originalRect = Spry.Effect.getDimensions(element);
	this.startHeight = originalRect.height;

	this.startX = Number(fromPos.x);
	this.stopX = Number(toPos.x);
	this.startY = Number(fromPos.y);
	this.stopY = Number(toPos.y);

	this.rangeMoveX = this.startX - this.stopX;
	this.rangeMoveY = this.startY - this.stopY;
};

Spry.Effect.MoveSlide.prototype = new Spry.Effect.Animator();
Spry.Effect.MoveSlide.prototype.constructor = Spry.Effect.MoveSlide;

Spry.Effect.MoveSlide.prototype.animate = function(position)
{
	var yStart      = (this.direction == Spry.forwards) ? this.startY : this.stopY;
	var yStop       = (this.direction == Spry.forwards) ? this.stopY : this.startY;
	var top         = (yStart > yStop) ? position * (yStop - yStart) : (1 - position) * (yStart - yStop);
	var eltHeight   = yStart + position * (yStop - yStart);

	if(eltHeight<0) eltHeight = 0;

	this.firstChildElement.style.top = top + 'px';
	this.element.style.height = eltHeight + 'px';
};

Spry.Effect.MoveSlide.prototype.reset = function()
{
	if(!this.isFinished)
	{
		this.cancel();
		this.startX = this.startX;
		this.startY = this.startY;
	}
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Effect.Size
//
//////////////////////////////////////////////////////////////////////

Spry.Effect.Size = function(element, fromRect, toRect, options)
{
	this.name = 'Size';
	
	Spry.Effect.Animator.call(this, options);

	this.element = Spry.Effect.getElement(element);

	var originalRect = Spry.Effect.getDimensions(element);
	this.originalWidth = originalRect.width;

	this.startWidth = fromRect.width;
	this.startHeight = fromRect.height;
	this.stopWidth = toRect.width;
	this.stopHeight = toRect.height;

	if (Spry.Effect.Utils.isPercentValue(this.startWidth))
	{
		var startWidthPercent = Spry.Effect.Utils.getPercentValue(this.startWidth);
		//var originalRect = Spry.Effect.getDimensions(element);
		this.startWidth = originalRect.width * (startWidthPercent / 100);
	}

	if (Spry.Effect.Utils.isPercentValue(this.startHeight))
	{
		var startHeightPercent = Spry.Effect.Utils.getPercentValue(this.startHeight);
		//var originalRect = Spry.Effect.getDimensions(element);
		this.startHeight = originalRect.height * (startHeightPercent / 100);
	}

	if (Spry.Effect.Utils.isPercentValue(this.stopWidth))
	{
		var stopWidthPercent = Spry.Effect.Utils.getPercentValue(this.stopWidth);
		var originalRect = Spry.Effect.getDimensions(element);
		this.stopWidth = originalRect.width * (stopWidthPercent / 100);
	}

	if (Spry.Effect.Utils.isPercentValue(this.stopHeight))
	{
		var stopHeightPercent = Spry.Effect.Utils.getPercentValue(this.stopHeight);
		var originalRect = Spry.Effect.getDimensions(element);
		this.stopHeight = originalRect.height * (stopHeightPercent / 100);
	}
		
	this.widthRange = this.startWidth - this.stopWidth;
	this.heightRange = this.startHeight - this.stopHeight;
	
};

Spry.Effect.Size.prototype = new Spry.Effect.Animator();
Spry.Effect.Size.prototype.constructor = Spry.Effect.Size;

Spry.Effect.Size.prototype.animate = function(position)
{
	var width = 0;
	var height = 0;
	var fontSize = 0;

	if (this.direction == Spry.forwards) {
		width = this.startWidth - (this.widthRange * position);
		height = this.startHeight - (this.heightRange * position);
		fontSize = (this.startWidth + position*(this.stopWidth - this.startWidth))/this.originalWidth;
	} else if (this.direction == Spry.backwards) {
		width = this.widthRange * position + this.stopWidth;
		height = this.heightRange * position + this.stopHeight;
		fontSize = (this.stopWidth + position*(this.startWidth - this.stopWidth))/this.originalWidth;
	}
	if (this.options.scaleContent == true)
		this.element.style.fontSize = fontSize + 'em';

	//Spry.Debug.trace(fontSize);

	this.element.style.width = width + "px";
	this.element.style.height = height + "px";
};

Spry.Effect.Size.prototype.reset = function()
{
	if(!this.isFinished)
	{
		this.cancel();
		this.startWidth = this.startWidth;
		this.startHeight = this.startHeight;
	}
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Effect.Opacity
//
//////////////////////////////////////////////////////////////////////

Spry.Effect.Opacity = function(element, startOpacity, stopOpacity, options)
{
	this.name = 'Opacity';
	
	Spry.Effect.Animator.call(this, options);

	this.element = Spry.Effect.getElement(element);

	this.startOpacity = startOpacity;
	this.stopOpacity = stopOpacity;
	this.opacityRange = this.startOpacity - this.stopOpacity;

};

Spry.Effect.Opacity.prototype = new Spry.Effect.Animator();
Spry.Effect.Opacity.prototype.constructor = Spry.Effect.Opacity;

Spry.Effect.Opacity.prototype.animate = function(position)
{
	var opacity = 0;

	if (this.direction == Spry.forwards) {
		opacity = this.startOpacity - (this.opacityRange * position);
	} else if (this.direction == Spry.backwards) {
		opacity = this.opacityRange * position + this.stopOpacity;
	}
	
	this.element.style.opacity = opacity;
	this.element.style.filter = "alpha(opacity=" + Math.floor(opacity * 100) + ")";
};

Spry.Effect.Opacity.prototype.reset = function()
{
	if(!this.isFinished)
	{
		this.cancel();
		this.startOpacity = this.startOpacity;
	}
};


//////////////////////////////////////////////////////////////////////
//
// Spry.Effect.Color
//
//////////////////////////////////////////////////////////////////////

Spry.Effect.Color = function(element, startColor, stopColor, options)
{
	this.name = 'Color';
	
	Spry.Effect.Animator.call(this, options);

	this.element = Spry.Effect.getElement(element);
	
	this.startColor = startColor;
	this.stopColor = stopColor;
	this.startRedColor = Spry.Effect.Utils.hexToInt(startColor.substr(1,2));
	this.startGreenColor = Spry.Effect.Utils.hexToInt(startColor.substr(3,2));
	this.startBlueColor = Spry.Effect.Utils.hexToInt(startColor.substr(5,2));
	this.stopRedColor = Spry.Effect.Utils.hexToInt(stopColor.substr(1,2));
	this.stopGreenColor = Spry.Effect.Utils.hexToInt(stopColor.substr(3,2));
	this.stopBlueColor = Spry.Effect.Utils.hexToInt(stopColor.substr(5,2));
	this.redColorRange = this.startRedColor - this.stopRedColor;
	this.greenColorRange = this.startGreenColor - this.stopGreenColor;
	this.blueColorRange = this.startBlueColor - this.stopBlueColor;
};

Spry.Effect.Color.prototype = new Spry.Effect.Animator();
Spry.Effect.Color.prototype.constructor = Spry.Effect.Color;

Spry.Effect.Color.prototype.animate = function(position)
{
	var redColor = 0;
	var greenColor = 0;
	var blueColor = 0;
	
	if (this.direction == Spry.forwards) {
		redColor = parseInt(this.startRedColor - (this.redColorRange * position));
		greenColor = parseInt(this.startGreenColor - (this.greenColorRange * position));
		blueColor = parseInt(this.startBlueColor - (this.blueColorRange * position));
	} else if (this.direction == Spry.backwards) {
		redColor = parseInt(this.redColorRange * position) + this.stopRedColor;
		greenColor = parseInt(this.greenColorRange * position) + this.stopGreenColor;
		blueColor = parseInt(this.blueColorRange * position) + this.stopBlueColor;
	}

	this.element.style.backgroundColor = Spry.Effect.Utils.rgb(redColor, greenColor, blueColor);
};

Spry.Effect.Color.prototype.reset = function()
{
	if(!this.isFinished)
	{
		this.cancel();
		this.startColor = this.startColor;
		this.startRedColor = Spry.Effect.Utils.hexToInt(startColor.substr(1,2));
		this.startGreenColor = Spry.Effect.Utils.hexToInt(startColor.substr(3,2));
		this.startBlueColor = Spry.Effect.Utils.hexToInt(startColor.substr(5,2));
	}
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Effect.ClusteredEffect
//
//////////////////////////////////////////////////////////////////////

Spry.Effect.ClusteredEffect = function(effect, kind)
{
	this.effect = effect;
	this.kind = kind;
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Effect.Cluster
//
//////////////////////////////////////////////////////////////////////

Spry.Effect.Cluster = function()
{
	this.name = 'Cluster';
	this.effectsArray = new Array();
	this.currIdx = -1;
	this.direction = Spry.forwards;
	this.options = {toggle: false};
	this.clusterIsFinished = false;
};

Spry.Effect.Cluster.prototype.addNextEffect = function(effect)
{
	this.effectsArray[this.effectsArray.length] = new Spry.Effect.ClusteredEffect(effect, "queue");
};

Spry.Effect.Cluster.prototype.addParallelEffect = function(effect)
{
	this.effectsArray[this.effectsArray.length] = new Spry.Effect.ClusteredEffect(effect, "parallel");
};

Spry.Effect.Cluster.prototype.getNextEffect = function()
{
	if ((this.currIdx + 1) < (this.effectsArray.length))
	{
		this.currIdx = this.currIdx + 1;
		return this.effectsArray[this.currIdx].effect;
	}
	else
	{
		return null;
	}
};

Spry.Effect.Cluster.prototype.resetIndex = function()
{
	this.currIdx = -1;
};

Spry.Effect.Cluster.prototype.start = function()
{
	// before queue starts possible setup callback action is executed
	if (this.setup) 
	{
		try
		{
			this.setup(this.effectsArray[0].effect.element, this.effectsArray);
		}
		catch (e) {alert('ERR: Spry.Effect.Cluster.prototype.start: ' + e);}
	}
	this.currIdx = 0;
	var quit = false;
	while (quit == false)
	{
		this.effectsArray[this.currIdx].effect.start(this);
		if ((this.currIdx + 1) < (this.effectsArray.length))
		{
			if (this.effectsArray[this.currIdx].kind == "queue")
			{
				quit = true;
			}
		}
		else
		{
			quit = true;
		}
		if (quit == false) 
		{
			this.currIdx++;
		}
	}
};

Spry.Effect.Cluster.prototype.startNextEffect = function()
{
	if ((this.currIdx + 1) < (this.effectsArray.length))
	{
		this.currIdx++;
		this.effectsArray[this.currIdx].effect.start(this);
	} else {
		// time for finish callback
		if (this.finish) 
		{
			try
			{
				this.finish(this.effectsArray[0].effect.element, this.effectsArray);
			}
			catch (e) {alert('ERR: Spry.Effect.Cluster.prototype.startNextEffect: ' + e);}
		}
		this.clusterIsFinished = true;
	}
};

Spry.Effect.Cluster.prototype.setToggle = function(doToggle)
{
	this.options.toggle = doToggle;
};

Spry.Effect.Cluster.prototype.doToggle = function()
{
	if (this.options.toggle == true) {
		if (this.direction == Spry.forwards) {
			this.direction = Spry.backwards;
		} else if (this.direction == Spry.backwards) {
			this.direction = Spry.forwards;
		}
	
		// toggle all effects of the cluster, too
		for (var i = 0; i < this.effectsArray.length; i++) 
		{
			if (this.effectsArray[i].effect.options && (this.effectsArray[i].effect.options.toggle != null)) {
				if (this.effectsArray[i].effect.options.toggle == true)
				{
					this.effectsArray[i].effect.doToggle();
				}
			}
		}
	}
};

Spry.Effect.Cluster.prototype.reset = function()
{
	if (this.currIdx == -1) return;
	for (var i = 0; i < this.effectsArray.length; i++) 
	{	
		if (!this.effectsArray[i].effect.isFinished)
			this.effectsArray[i].effect.reset();
	}
};

Spry.Effect.Cluster.prototype.cancel = function()
{
	for (var i = 0; i < this.effectsArray.length; i++)
	{
		if (this.effectsArray[i].effect.timer != null) 
			this.effectsArray[i].effect.cancel();
	}
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Effect.AnimatedElement
//
//////////////////////////////////////////////////////////////////////


Spry.Effect.AnimatedElement = function (element) 
{
	this.element = element;
	this.currentEffect = -1;
	this.effectArray = new Array();
};


//////////////////////////////////////////////////////////////////////
//
// Combination effects
// Custom effects can be build by combining basic effect bahaviour
// like Move, Size, Color, Opacity
//
//////////////////////////////////////////////////////////////////////


Spry.Effect.AppearFade = function (ele, options) 
{
	//this.opacity = Spry.Effect.getStyleProp(element, "opacity");
	/*
	if (!this.opacity) {
		this.opacity = 1.0; // Argh, just assume it is fully visible.
	} else {
		this.opacity = parseFloat(this.opacity);
	}
	*/

	var element = Spry.Effect.getElement(ele);

	var durationInMilliseconds = 1000;
	var fromOpacity = 0.0;
	var toOpacity = 100.0;
	var doToggle = false;
	var kindOfTransition = Spry.sinusoidalTransition;
	var setupCallback = null;
	var finishCallback = null;

	

	if (options)
	{
		if (options.duration != null) durationInMilliseconds = options.duration;
		if (options.from != null) fromOpacity = options.from;
		if (options.to != null) toOpacity = options.to;
		if (options.toggle != null) doToggle = options.toggle;
		if (options.transition != null) kindOfTransition = options.transition;
		if (options.setup != null) setupCallback = options.setup;
		if (options.finish != null) finishCallback = options.finish;
	}
	options = {duration: durationInMilliseconds, toggle: doToggle, transition: kindOfTransition, setup: setupCallback, finish: finishCallback, from: fromOpacity, to: toOpacity};

	fromOpacity = fromOpacity/ 100.0;
	toOpacity = toOpacity / 100.0;

	var appearFadeEffect = new Spry.Effect.Opacity(element, fromOpacity, toOpacity, options);

	appearFadeEffect.name = 'AppearFade';
	var registeredEffect = SpryRegistry.getRegisteredEffect(element, appearFadeEffect);
	registeredEffect.start();
	return registeredEffect;
};


Spry.Effect.Blind = function (ele, options) 
{
	var element = Spry.Effect.getElement(ele);

	element.style.overflow = 'hidden';

	var durationInMilliseconds = 1000;
	var fromHeight = 100;
	var toHeight = 0;
	var doToggle = false;
	var kindOfTransition = Spry.sinusoidalTransition;
	var doScaleContent = false;
	var setupCallback = null;
	var finishCallback = null;

	var originalRect = Spry.Effect.getDimensions(element);
	
	var startWidthPx = originalRect.width;
	var startHeightPx = originalRect.height;

	var optionFrom = options.from;
	var optionTo   = options.to;

	

	if (options)
	{
		if (options.duration != null) durationInMilliseconds = options.duration;
		if (options.from != null)
		{
			if (Spry.Effect.Utils.isPercentValue(options.from))
			{
				fromHeight = Spry.Effect.Utils.getPercentValue(options.from);
			}
			else
			{
				fromHeight = (Spry.Effect.Utils.getPixelValue(options.from) / startHeightPx) * 100;
			}
		}
		if (options.to != null)
		{
			if (Spry.Effect.Utils.isPercentValue(options.to))
			{
				toHeight = Spry.Effect.Utils.getPercentValue(options.to);
			}
			else
			{
				toHeight = (Spry.Effect.Utils.getPixelValue(options.to) / startHeightPx) * 100;
			}
		}
		if (options.toggle != null) doToggle = options.toggle;
		if (options.transition != null) kindOfTransition = options.transition;
		if (options.setup != null) setupCallback = options.setup;
		if (options.finish != null) finishCallback = options.finish;
	}
	
	var stopWidthPx = startWidthPx;
	var stopHeightPx = startHeightPx;
	
	var fromRect = new Spry.Effect.Utils.Rectangle;
	fromRect.width = startWidthPx;
	fromRect.height = startHeightPx * (fromHeight / 100);
	
	var toRect = new Spry.Effect.Utils.Rectangle;
	toRect.width = stopWidthPx;
	toRect.height = stopHeightPx * (toHeight / 100);

	options = {duration:durationInMilliseconds, toggle:doToggle, transition:kindOfTransition, scaleContent:doScaleContent, setup: setupCallback, finish: finishCallback, from: optionFrom, to: optionTo};

	var blindEffect = new Spry.Effect.Size(element, fromRect, toRect, options);
	blindEffect.name = 'Blind';
	var registeredEffect = SpryRegistry.getRegisteredEffect(element, blindEffect);
	registeredEffect.start();
	return registeredEffect;
};


function setupHighlight(element, effect) 
{
	Spry.Effect.setStyleProp(element, 'background-image', 'none');
};

function finishHighlight(element, effect) 
{
	Spry.Effect.setStyleProp(element, 'background-image', effect.options.restoreBackgroundImage);

	if (effect.direction == Spry.forwards)
		Spry.Effect.setStyleProp(element, 'background-color', effect.options.restoreColor);
};

Spry.Effect.Highlight = function (ele, options) 
{	
	var durationInMilliseconds = 1000;
	var toColor = "#ffffff";
	var doToggle = false;
	var kindOfTransition = Spry.sinusoidalTransition;
	var setupCallback = setupHighlight;
	var finishCallback = finishHighlight;
	var element = Spry.Effect.getElement(ele);
	var fromColor = Spry.Effect.getStyleProp(element, "background-color");
	var restoreColor = fromColor;
	if (fromColor == "transparent") fromColor = "#ffff99";

	var optionFrom = options.from;
	var optionTo   = options.to;


	

	if (options)
	{
		if (options.duration != null) durationInMilliseconds = options.duration;
		if (options.from != null) fromColor = options.from;
		if (options.to != null) toColor = options.to;
		if (options.restoreColor) restoreColor = options.restoreColor;
		if (options.toggle != null) doToggle = options.toggle;
		if (options.transition != null) kindOfTransition = options.transition;
		if (options.setup != null) setupCallback = options.setup;
		if (options.finish != null) finishCallback = options.finish;
	}

	var restoreBackgroundImage = Spry.Effect.getStyleProp(element, 'background-image');
	
	options = {duration: durationInMilliseconds, toggle: doToggle, transition: kindOfTransition, setup: setupCallback, finish: finishCallback, restoreColor: restoreColor, restoreBackgroundImage: restoreBackgroundImage, from: optionFrom, to: optionTo};

	var highlightEffect = new Spry.Effect.Color(element, fromColor, toColor, options);
	highlightEffect.name = 'Highlight';
	var registeredEffect = SpryRegistry.getRegisteredEffect(element, highlightEffect);
	registeredEffect.start();
	return registeredEffect;	
};

Spry.Effect.Slide = function (ele, options) 
{
	var element = Spry.Effect.getElement(ele);

	var durationInMilliseconds = 2000;
	var doToggle = false;
	var kindOfTransition = Spry.sinusoidalTransition;
	var setupCallback = null;
	var finishCallback = null;
	var firstChildElt = Spry.Effect.Utils.getFirstChildElement(element);

	
	Spry.Effect.makeClipping(element);

	// for IE 6 on win: check if position is static or fixed -> not supported and would cause trouble
	if(/MSIE 6.0/.test(navigator.userAgent) && /Windows NT 5.1/.test(navigator.userAgent))
	{
		var pos = Spry.Effect.getStyleProp(element, 'position');
		if(pos && (pos == 'static' || pos == 'fixed'))
		{
			Spry.Effect.setStyleProp(element, 'position', 'relative');
			Spry.Effect.setStyleProp(element, 'top', '');
			Spry.Effect.setStyleProp(element, 'left', '');
		}
	}

	if(firstChildElt)
	{
		Spry.Effect.makePositioned(firstChildElt);
		Spry.Effect.makeClipping(firstChildElt);
	}

	var elementRect = Spry.Effect.getDimensions(element);
	var startOffsetPosition = new Spry.Effect.Utils.Position();
	startOffsetPosition.x = parseInt(Spry.Effect.getStyleProp(firstChildElt, "left"));
	startOffsetPosition.y = parseInt(Spry.Effect.getStyleProp(firstChildElt, "top"));
	if (!startOffsetPosition.x) startOffsetPosition.x = 0;
	if (!startOffsetPosition.y) startOffsetPosition.y = 0;

	var verticalMovePx = elementRect.height;

	var fromPos = new Spry.Effect.Utils.Position;
	fromPos.x = startOffsetPosition.x;
	fromPos.y = startOffsetPosition.y;

	var toPos = new Spry.Effect.Utils.Position;
	toPos.x = startOffsetPosition.x;
	toPos.y = startOffsetPosition.y - verticalMovePx;

	var optionFrom = options.from;
	var optionTo   = options.to;

	if (options)
	{
		if (options.duration != null) durationInMilliseconds = options.duration;

		if (options.from != null)
		{
			if (Spry.Effect.Utils.isPercentValue(options.from))
				fromPos.y = verticalMovePx * Spry.Effect.Utils.getPercentValue(options.from) / 100;
			else
				fromPos.y = Spry.Effect.Utils.getPixelValue(options.from);
		}

		if (options.to != null)
		{
			if (Spry.Effect.Utils.isPercentValue(options.to))
				toPos.y = verticalMovePx * Spry.Effect.Utils.getPercentValue(options.to) / 100;
			else
				toPos.y = Spry.Effect.Utils.getPixelValue(options.to);
		}

		if (options.toggle != null) doToggle = options.toggle;
		if (options.transition != null) kindOfTransition = options.transition;
		if (options.setup != null) setupCallback = options.setup;
		if (options.finish != null) finishCallback = options.finish;
	}

	options = {duration:durationInMilliseconds, toggle:doToggle, transition:kindOfTransition, setup: setupCallback, finish: finishCallback, from: optionFrom, to: optionTo};

	var slideEffect = new Spry.Effect.MoveSlide(element, fromPos, toPos, options);
	slideEffect.name = 'Slide';
	var registeredEffect = SpryRegistry.getRegisteredEffect(element, slideEffect);
	registeredEffect.start();
	return registeredEffect;
};

/* webcam tab switcher */
function camtab(camuri){
var tcischecked=false

selectedtablink=camuri.href
tcischecked=(document.tabcontrol && document.tabcontrol.tabcheck.checked)? true : false
if (document.getElementById && !tcischecked){
var tabobj=document.getElementById("tablist")
var tabobjlinks=tabobj.getElementsByTagName("li")
for (i=0; i<tabobjlinks.length; i++)
tabobjlinks[i].className="off"
camuri.className="current"
return false
}
else
return true
}

/* shelf tab switcher */
function shelfbutton(){
	var tcischecked=false
	var shelftab = document.getElementById('shelf_button');
	tcischecked=(getElementsByClass(document,'current','*'))? true : false;
	if (document.getElementById && !tcischecked) {
		shelftab.className="off"
		return true
	} else {
		shelftab.className="current";
		return false;
	}
}

 /*drop down animation*/
function setupFunc(element, effect){
	try{
		if (!sIFR.UA.bIsIE) {
			var sifr1 = document.getElementById('titlegraphic').getElementsByTagName('h1');
			var sifr2 = document.getElementById('titlegraphic').getElementsByTagName('h2');
			sifr1[0].style.display='none';
			sifr2[0].style.display='none';
		}
	} catch(e) {}
 	var bc = document.getElementById('breadcrumbs');
 	for(var i=0; i < bc.getElementsByTagName("ul").length; i++){
 		bc.getElementsByTagName("ul")[i].style.display='none';
 	}
 	Spry.Effect.AppearFade('sitetools', {duration: 2500, from: 0, to: 100, toggle: false});
}
 	
 function finishFunc(element, effect){}
 
 /* pull up animation */
function setupFuncOff(element, effect){
	 Spry.Effect.AppearFade('sitetools', {duration: 500, from: 100, to: 0, toggle: false});
	 if (!sIFR.UA.bIsIE) {
		 var sifr1 = document.getElementById('titlegraphic').getElementsByTagName('h1');
	     var sifr2 = document.getElementById('titlegraphic').getElementsByTagName('h2');
		 sifr1[0].style.display='block';
		 sifr2[0].style.display='block';
  	 }
}
 
function finishFuncOff(element, effect){
	var tab = document.getElementById('sitetools');tab.style.display='none';
	var bc = document.getElementById('breadcrumbs');
 	for(var i=0; i < bc.getElementsByTagName("ul").length; i++){
 		bc.getElementsByTagName("ul")[i].style.display='inline';
 	}		
}

/* Keyboard shortcut to drop shelf */
document.onkeydown = checkKeycode;
function checkKeycode(e) {
	var keycode, targ;
	if (!e) e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeName == "INPUT" || e.metaKey) return;
	keycode = e.keyCode;
	if (keycode == 192) {
		tabExpand();
	}
}

var calScrollBar;
var weatherScrollBar;
var pfScrollBar;

var firstTimeLoad = 1;

var wait = false;
var unlwebcam = 'http://www.unl.edu/unlpub/cam/cam1.jpg';
var pfreq = new XMLHTTP();
var calreq = new XMLHTTP();
var weatherreq = new XMLHTTP();
var pfresultsdiv = 'pfresults';
var pfserviceurl = 'http://peoplefinder.unl.edu/service.php?q=';
var pfreq_q;
if (!pfreq)
	alert("Error initializing XMLHttpRequest!");
function tabExpand() {
	try {
		var tab = document.getElementById('sitetools');
		if (tab.style.display=='none') {
			openShelfCallback();
			pfresultsdiv = 'pfresults';
			pfserviceurl = 'http://peoplefinder.unl.edu/service.php?q=';
			displayCalendar();
			displayUNLWeather();
			//both the above functions are moved to finishFunc(), load after animation
			updateWebcam(unlwebcam);
			shelfbutton();
			if(firstTimeLoad){
				firstTimeLoad = 0;
				document.getElementById('upArrowPF').style.display = 'none';
				document.getElementById('downArrowPF').style.display = 'none';
				document.getElementById('dragButtonPF').style.display = 'none';
				document.getElementById('trackBarPF').style.display = 'none';
			
				document.getElementById('upArrowCal').style.display = 'none';
				document.getElementById('downArrowCal').style.display = 'none';
				document.getElementById('dragButtonCal').style.display = 'none';
				document.getElementById('trackBarCal').style.display = 'none';
		
				document.getElementById('upArrowWeather').style.display = 'none';
				document.getElementById('downArrowWeather').style.display = 'none';
				document.getElementById('dragButtonWeather').style.display = 'none';
				document.getElementById('trackBarWeather').style.display = 'none';
			}
			Spry.Effect.Slide('toolcontainer', {duration: 800, from: '0px', to: '300px', toggle: false, setup: setupFunc,finish: finishFunc});		
		} else {
			closeShelfCallback();
			Spry.Effect.Slide('toolcontainer', {duration: 500, from: '300px', to: '0px', toggle: false, setup: setupFuncOff,finish: finishFuncOff});
			var shelftab = document.getElementById('shelf_button');
			shelftab.className="off";
		}
		return false;
	} catch(e) {
		return true;
	}	
}
function openShelfCallback(){}
function closeShelfCallback(){}

function pf_getUID(uid) {
	var url = "http://peoplefinder.unl.edu/hcards/"+uid;
	if (wait==true) {
		pfreq.abort();
		pfreq = new XMLHTTP();
	}
	pfreq.open("GET", url, true);
	pfreq.onreadystatechange = updatePeopleFinderResults;
	pfreq.send(null);
	wait=true;
	return false;
}

function updateWebcam(camuri) {
	document.getElementById('webcamuri').src = camuri;
	unlwebcam = camuri;
}
function queuePFChooser(q,resultsdiv) {
	pfserviceurl = 'http://peoplefinder.unl.edu/service.php?chooser=true&q=';
	queuePFRequest(q,resultsdiv);
}
function queuePFRequest(q,resultsdiv) {
	pfresultsdiv = resultsdiv;
	clearTimeout(pfreq_q);
	if (q.length > 3) {
		document.getElementById(pfresultsdiv).innerHTML = '';
		document.getElementById("pfprogress").src = '/ucomm/templatedependents/templatecss/images/loadingContent.gif';
		pfreq_q = setTimeout('getPeopleFinderResults("'+escape(q)+'")',400);
		displayUNLPFScrollbar();
		pfScrollBar.reset();
	} else if (q.length>0) {
		document.getElementById("pfprogress").src = '/ucomm/templatedependents/templatecss/images/transpixel.gif';
		document.getElementById(pfresultsdiv).innerHTML = 'Please enter more information.';
		displayUNLPFScrollbar();
		pfScrollBar.reset();

	} else {
		document.getElementById("pfprogress").src = '/ucomm/templatedependents/templatecss/images/transpixel.gif';
		document.getElementById(pfresultsdiv).innerHTML = '';
		displayUNLPFScrollbar();
		pfScrollBar.reset();
	}
}
function getPeopleFinderResults(q) {
	var url = pfserviceurl + q;
	if (wait==true) {
		pfreq.abort();
		pfreq = new XMLHTTP();
	}
	pfreq.open("GET", url, true);
	pfreq.onreadystatechange = updatePeopleFinderResults;
	pfreq.send(null);
	wait=true;
}
function pfCatchUID(uid)
{
	alert('I\'ve caught '+uid+'. You should create your own pfCatchUID function.');
	return false;
}

function updatePeopleFinderResults() {
	if (pfreq.readyState == 4) {
		if (pfreq.status == 200) {
			document.getElementById(pfresultsdiv).innerHTML = pfreq.responseText;
			displayUNLPFScrollbar();
			pfScrollBar.reset();
		} else {
			document.getElementById(pfresultsdiv).innerHTML = 'Error loading results.';
		}
	}
	document.getElementById("pfprogress").src = '/ucomm/templatedependents/templatecss/images/transpixel.gif';
	wait = false;
	pfreq = new XMLHTTP();
}

function displayUNLPFScrollbar(){
	pfScrollBar = new ScrollObj(10,25,168-2*18,"trackBarPF","upArrowPF","downArrowPF","dragButtonPF","pfResultsMask","pfresults");
}

function displayCalendar() {
	var calurl = "http://events.unl.edu/?format=hcalendar";
	calreq.open("GET", calurl, true);
	calreq.onreadystatechange = updateCalendarResults;
	calreq.send(null);
}
function updateCalendarResults()
{
	if (calreq.readyState == 4) {
		if (calreq.status == 200) {
			document.getElementById("calresults").innerHTML = calreq.responseText;
			displayUNLCalScrollbar();
			calScrollBar.reset();
		} else {
			document.getElementById("calresults").innerHTML = 'Error loading results.';
		}
	}
	wait = false;
	calreq = new XMLHTTP();
}

function displayUNLCalScrollbar(){
	var tab = document.getElementById('sitetools');tab.style.display='block';
	calScrollBar = new ScrollObj(10,25,220-2*18,"trackBarCal","upArrowCal","downArrowCal","dragButtonCal","calcontent","calresults");
}



function displayUNLWeather() {
	var weatherurl = "http://www.unl.edu/ucomm/templatedependents/templatesharedcode/scripts/current.html";
	weatherreq.open("GET", weatherurl, true);
	weatherreq.onreadystatechange = updateWeatherResults;
	weatherreq.send(null);
}
function updateWeatherResults()
{
	if (weatherreq.readyState == 4) {
		if (weatherreq.status == 200) {
			document.getElementById("weatherresults").innerHTML = weatherreq.responseText;
			displayUNLWeatherScrollbar();
			weatherScrollBar.reset();
		} else {
			document.getElementById("weatherresults").innerHTML = 'Error loading results.';
		}
	}
	wait = false;
	weatherreq = new XMLHTTP();
}

function displayUNLWeatherScrollbar(){
	var tab = document.getElementById('sitetools');tab.style.display='block';
	weatherScrollBar = new ScrollObj(10,25,220-2*18,"trackBarWeather","upArrowWeather","downArrowWeather","dragButtonWeather","weathercontent","weatherresults");
}/* Zebra Tables
David F. Miller
A List Apart #173
http://www.fivevoltlogic.com
*/

  // this function is needed to work around 
  // a bug in IE related to element attributes
  function hasClass(obj) {
     var result = false;
     if (obj.getAttributeNode("class") != null) {
         result = obj.getAttributeNode("class").value;
     }
     return result;
  }   

 function stripe(id) {

    // the flag we'll use to keep track of 
    // whether the current row is odd or even
    var even = false;
  
    // if arguments are provided to specify the colours
    // of the even & odd rows, then use the them;
    // otherwise use the following defaults: 
    var evenColor = arguments[1] ? arguments[1] : "#ffffff";
    var oddColor = arguments[2] ? arguments[2] : "#ecf7fd";
  
    // obtain a reference to the desired table
    // if no such table exists, abort
    var table = document.getElementById(id);
    if (! table) { return; }
    
    // by definition, tables can have more than one tbody
    // element, so we'll have to get the list of child
    // &lt;tbody&gt;s 
    var tbodies = table.getElementsByTagName("tbody");

    // and iterate through them...
    for (var h = 0; h < tbodies.length; h++) {
    
     // find all the &lt;tr&gt; elements... 
      var trs = tbodies[h].getElementsByTagName("tr");
      
      // ... and iterate through them
      for (var i = 0; i < trs.length; i++) {

        // avoid rows that have a class attribute
        // or backgroundColor style
        if (! hasClass(trs[i]) &&
            ! trs[i].style.backgroundColor) {
 		  
          // get all the cells in this row...
          var tds = trs[i].getElementsByTagName("td");
        
          // and iterate through them...
          for (var j = 0; j < tds.length; j++) {
        
            var mytd = tds[j];

            // avoid cells that have a class attribute
            // or backgroundColor style
            if (! hasClass(mytd) &&
                ! mytd.style.backgroundColor) {
        
              mytd.style.backgroundColor =
                even ? evenColor : oddColor;
            
            }
          }
        }
        // flip from odd to even, or vice-versa
        even =  ! even;
      }
    }
  }
/* Mike Brittain
Making Compact Forms More Accessible
A List Apart #229
*/

function initOverLabels () {
  if (!document.getElementById) return;  	

  var labels, id, field;

  // Set focus and blur handlers to hide and show 
  // LABELs with 'overlabel' class names.
  labels = document.getElementsByTagName('label');
  for (var i = 0; i < labels.length; i++) {
	
    if (labels[i].className == 'overlabel') {

      // Skip labels that do not have a named association
      // with another field.
      id = labels[i].htmlFor || labels[i].getAttribute('for');
      if (!id || !(field = document.getElementById(id))) {
        continue;
      }

      // Change the applied class to hover the label 
      // over the form field.
      labels[i].className = 'overlabel-apply';

      // Hide any fields having an initial value.
      if (field.value !== '') {
        hideLabel(field.getAttribute('id'), true);
      }

      // Set handlers to show and hide labels.
      field.onfocus = function () {
        hideLabel(this.getAttribute('id'), true);
      };
      field.onblur = function () {
        if (this.value === '') {
          hideLabel(this.getAttribute('id'), false);
        }
      };

      // Handle clicks to LABEL elements (for Safari).
      labels[i].onclick = function () {
        var id, field;
        id = this.getAttribute('for');
        if (id && (field = document.getElementById(id))) {
          field.focus();
        }
      };

    }
  }
};

function hideLabel (field_id, hide) {
  var field_for;
  var labels = document.getElementsByTagName('label');
  for (var i = 0; i < labels.length; i++) {
    field_for = labels[i].htmlFor || labels[i].getAttribute('for');
    if (field_for == field_id) {
    labels[i].style.textIndent = (hide) ? '-1000px' : '0px';
//      labels[i].style.zIndex = (hide) ? '-10' : '10';
      return true;
    }
  }
  return true;
}

window.onload = function () {
  setTimeout(initOverLabels, 1);
};
