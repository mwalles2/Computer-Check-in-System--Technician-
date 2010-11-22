if (navigator.platform == "Win32" && navigator.appName == "Microsoft Internet Explorer" && window.attachEvent) {
	window.attachEvent("onload", fnLoadPngs);
}

function fnLoadPngs() {
	var rslt = navigator.appVersion.match(/MSIE (\d+\.\d+)/, '');
	var itsAllGood = (rslt != null && Number(rslt[1]) >= 5.5);

	for (var i = document.images.length - 1, img = null; (img = document.images[i]); i--) {
		if (itsAllGood && img.src.match(/\.png$/i) != null) {
			fnFixPng(img);
			img.attachEvent("onpropertychange", fnPropertyChanged);
		}
		img.style.visibility = "visible";
	}
	
	/* Detect background image */	
	for (var i = document.all.length - 1, obj = null; (obj = document.all[i]); i--) {
		if (itsAllGood && obj.currentStyle.backgroundImage.match(/\.png/i) != null) {
			this.fnFixPng_back(obj);
			obj.attachEvent("onpropertychange", this.fnPropertyChanged_back);
		}
	}

	var nl = document.getElementsByTagName("INPUT");
	for (var i = nl.length - 1, e = null; (e = nl[i]); i--) {
		if (e.className && e.className.match(/\bimage\b/i) != null) {
			if (e.src.match(/\.png$/i) != null) {
				fnFixPng(e);
				e.attachEvent("onpropertychange", fnPropertyChanged);
			}
			e.style.visibility = "visible";
		}
	}
}

function fnPropertyChanged() {
	if (window.event.propertyName == "src") {
		var el = window.event.srcElement;
		if (!el.src.match(/x\.gif$/i)) {
			el.filters.item(0).src = el.src;
			el.src = "http://www.unl.edu/ucomm/templatedependents/templatesharedcode/scripts/x.gif";
		}
	}
}

/* new background image filter function */
function fnPropertyChanged_back() {
	if (window.event.propertyName == "style.backgroundImage") {
		var el = window.event.srcElement;
		if (!el.currentStyle.backgroundImage.match(/x\.gif/i)) {
			var bg	= el.currentStyle.backgroundImage;
			var src = bg.substring(5,bg.length-2);
			el.filters.item(0).src = src;
			el.style.backgroundImage = "url(http://www.unl.edu/ucomm/templatedependents/templatesharedcode/scripts/x.gif)";
		}
	}
}

function dbg(o) {
	var s = "";
	var i = 0;
	for (var p in o) {
		s += p + ": " + o[p] + "\n";
		if (++i % 10 == 0) {
			alert(s);
			s = "";
		}
	}
	alert(s);
}

function fnFixPng(img) {
	var src = img.src;
	img.style.width = img.width + "px";
	img.style.height = img.height + "px";
	img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')"
	img.src = "http://www.unl.edu/ucomm/templatedependents/templatesharedcode/scripts/x.gif";
}

/* new background image filter function */
function fnFixPng_back(obj) {
	var bg	= obj.currentStyle.backgroundImage;
	var src = bg.substring(5,bg.length-2);
	obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')";
	obj.style.backgroundImage = "url(http://www.unl.edu/ucomm/templatedependents/templatesharedcode/scripts/x.gif)";
}