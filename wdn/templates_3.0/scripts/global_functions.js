/**
 * Fetches the contents of a URL into a div.
 * @param url URL to get contents of.
 * @param id Unique ID of the element to place contents into.
 * @param err [optional] Error message on failure.
 */
function fetchURLInto(url,id,err) {
	
	WDN.get(url,null,function(data, textStatus){
		
		if (textStatus=='success') {
			document.getElementById(id).innerHTML = data;
		} else {
			if (undefined === err) {
				document.getElementById(id).innerHTML = 'Error loading results.';
			} else {
				document.getElementById(id).innerHTML = err;
			}
		}
	}

	);
}

function rotateImg(imgArray_str,elementId_str,secs_int,thisNum_int){
	function showIt() {
		try {
			
			if (obj.src !== null && eval(imgArray_str+"["+thisNum_int+"][0]")!==null) {
				obj.src=eval(imgArray_str+"["+thisNum_int+"][0]");
			}
			if (obj.alt !== null && eval(imgArray_str+"["+thisNum_int+"][1]")!==null) {
				obj.alt=eval(imgArray_str+"["+thisNum_int+"][1]");
			}
			if (obj.parentNode.href!==null && eval(imgArray_str+"["+thisNum_int+"][2]")!==null) {
				obj.parentNode.href=eval(imgArray_str+"["+thisNum_int+"][2]");
				if (eval(imgArray_str+"["+thisNum_int+"][3]")!==null) {
					var clickEvent = eval(imgArray_str+"["+thisNum_int+"][3]");
					obj.parentNode.onclick=function() {eval(clickEvent);};
				} else {
					obj.parentNode.onclick=null;
				}
			} else {
				obj.parentNode.href='#';
			}
		} catch(e) {}
	}
	
	if (thisNum_int == undefined) {
		thisNum_int=Math.floor(Math.random()*eval(imgArray_str+".length"));
	}
	if (thisNum_int >= eval(imgArray_str+".length")) {
		thisNum_int = 0;
	}
	if (eval(imgArray_str+"["+thisNum_int+"]") !== null) {
		// Try and set img
		var obj = document.getElementById(elementId_str);
		
		showIt();
	}
	thisNum_int++;
	if (secs_int>0) {
		return setTimeout("rotateImg('"+imgArray_str+"','"+elementId_str+"',"+secs_int+","+thisNum_int+")",secs_int*1000);
	}
	
	return true;
}

function newRandomPromo(xmluri){
	var promoContent = new WDN.proxy_xmlhttp();
	promoContent.open("GET", xmluri, true);
	promoContent.onreadystatechange = function(){
		if (promoContent.readyState == 4) {
			if (promoContent.status == 200) {
				var xmlObj = promoContent.responseXML.documentElement;
				var promoNum = xmlObj.getElementsByTagName('promo').length;	
				//generates random number
				var aryId=Math.floor(Math.random()*promoNum);
				
				//pull promo data
				var contentContainer = xmlObj.getElementsByTagName('contentContainer')[0].childNodes[0].nodeValue;
				var promoTitle = xmlObj.getElementsByTagName('promo')[aryId].getAttribute("id");
				var promoMediaType = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('media')[0].getAttribute("type");
				var promoText = ' ';
				try {
					var promoMediaURL = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('media')[0].childNodes[0].nodeValue;
					promoText = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('text')[0].childNodes[0].nodeValue;
				} catch(e) {
					promoText = ' ';
				}
				var promoLink = xmlObj.getElementsByTagName('promo')[aryId].getElementsByTagName('link')[0].childNodes[0].nodeValue;
				
				//different mime type embed
				if (promoMediaType == 'image') {
					document.getElementById(contentContainer).innerHTML = '<a class="imagelink" href="' + promoLink + '" title="' + promoTitle + '" /><img src="' + promoMediaURL + '" alt="promo" class="frame" /></a>\n<p>' + promoText + '</p>\n';
				} else if (promoMediaType == 'flash') {
					document.getElementById(contentContainer).innerHTML = '<div class="image_small_short">\n<object width="210" height="80" wmode="opaque"><param name="movie" value="' + promoMediaURL + '"><embed src="' + promoMediaURL + '" width="210" height="80"></embed></object>\n</div>\n<p>' + promoText +'</p>\n';
				}
			} else {
				// Error loading file!
			}
		}
		promoContent = new XMLHTTP();
	};
	promoContent.send(null);
}

function addLoadEvent(func){
	WDN.jQuery(document).ready(func);
}

var wraphandler = {

	addEvent: function( obj, type, fn ) {
		if ( obj.attachEvent ) {
			obj['e'+type+fn] = fn;
			obj[type+fn] = function(){obj['e'+type+fn]( window.event );};
			obj.attachEvent( 'on'+type, obj[type+fn] );
		} else {
			obj.addEventListener( type, fn, false );
		}
	}

};

var XMLHTTP=WDN.proxy_xmlhttp;

 function stripe(id) {
	 WDN.jQuery('#'+id).addClass('zentable');
	 WDN.browserAdjustments();
  }

