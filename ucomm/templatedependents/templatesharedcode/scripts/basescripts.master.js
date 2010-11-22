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

