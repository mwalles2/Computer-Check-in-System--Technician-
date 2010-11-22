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

