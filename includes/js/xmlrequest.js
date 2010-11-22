var isIE = false;
var req;

// global request and XML document objects

// retrieve XML document (reusable generic function);
// parameter is URL string (relative or complete) to
// an .xml file whose Content-Type is a valid XML
// type, such as text/xml; XML source must be from
// same domain as HTML file
function loadXMLDoc(url)
{
	var log=document.getElementById("log");
	//log.innerHTML+="loadXMLDoc()<br>";
	//log.innerHTML+="-- url = "+url+"<br>";
	// branch for native XMLHttpRequest object

	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = processReqChange;
		req.open("GET", url, true);
		req.send(null);
	// branch for IE/Windows ActiveX version
	}
	else if (window.ActiveXObject)
	{
		isIE = true;
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange = processReqChange;
			req.open("GET", url, true);
			req.send();
		}
	}
}

function processReqChange()
{
	var log=document.getElementById("log");
	//log.innerHTML+="processReqChange()<br>";
	//log.innerHTML+="-- req.readyState = "+req.readyState+"<br>";
//	//log.innerHTML+="-- req.status = "+req.status+"<br>";
	// only if req shows "loaded"

	if (req.readyState == 4)
	{
		// only if "OK"
		if (req.status == 200)
		{
			fade("saved");
			xmlInit();
		}
		else
		{
			fade("failed");
		}
   }
}

function getElementTextNS(prefix, local, parentElem, index)
{
	var log=document.getElementById("log");
	//log.innerHTML+="getElementTextNS()<br>";
	//log.innerHTML+="-- prefix="+prefix+"<br>-- local="+local+"<br>-- parentElem="+parentElem+"<br>-- index="+index+"<br>";
    var result = "";
   	//log.innerHTML+= "-- result="+result+"<br>";
    if (prefix && isIE)
    {
    	//log.innerHTML+= "-- if IE<br>";
        // IE/Windows way of handling namespaces
        result = parentElem.getElementsByTagName(prefix + ":" + local)[index];
    }
    else
    {
    	//log.innerHTML+= "-- else IE<br>";
        // the namespace versions of this method 
        // (getElementsByTagNameNS()) operate
        // differently in Safari and Mozilla, but both
        // return value with just local name, provided 
        // there aren't conflicts with non-namespace element
        // names
        result = parentElem.getElementsByTagName(local)[index];
    }
    if (result)
    {
    	//log.innerHTML+= "-- if result<br>";
    	//log.innerHTML+= "-- -- result="+result+"<br>";
        // get text, accounting for possible
        // whitespace (carriage return) text nodes 
    	//log.innerHTML+= "-- -- result.childNodes.length="+result.childNodes.length+"<br>";
        if (result.childNodes.length > 1)
        {
	    	//log.innerHTML+= "-- -- if length > 1<br>";
            return result.childNodes[1].nodeValue;
        }
        else if (result.childNodes.length == 1)
        {
	    	//log.innerHTML+= "-- -- else length > 1<br>";
            return result.firstChild.nodeValue;    		
        }
    	else
	    {
    		//log.innerHTML+= "-- else result<br>";
    	    return "n/a";
	    }
    }
    else
    {
    	//log.innerHTML+= "-- else result<br>";
        return "n/a";
    }
}
