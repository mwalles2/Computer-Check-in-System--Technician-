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
