/**
usage (events calendar month widget)
place this within the head of your doc.

<link rel="stylesheet" type="text/css" media="screen" href="/ucomm/templatedependents/templatecss/components/monthwidget.css" />
<script type="text/javascript" src="/ucomm/templatedependents/templatesharedcode/scripts/UNLevent_monthWidget.js"></script>

<div id="monthwidget">   
	<script type="text/javascript">
    	//<![CDATA[
			UNLevent_monthWidget.init('http://events.unl.edu/');
		//]]>
	</script>
</div>
*/
var UNLevent_monthWidget = {
		
		widgetID: 'monthwidget',
		
		init:function(url, widgetID){
			this._ajaxTunnel('GET',url+'/?monthwidget&format=hcalendar','UNLevent_monthWidget._loadWidget');
			this.latestID = '';
			if (widgetID===undefined) {
			UNLevent_monthWidget.widgetID = 'monthwidget';
			} else {
			UNLevent_monthWidget.widgetID = widgetID;
			}
		},
		
		//load the monthly widget
		_loadWidget: function(){		
			var widget_container = document.getElementById(UNLevent_monthWidget.widgetID);
			if (this.readyState == 4) {
				if (this.status == 200) {
					widget_container.innerHTML = this.responseText;
					//yay success! now build the hover tool tip event
					UNLevent_monthWidget._attachHoverEvent(widget_container);
				} else {
					widget_container.innerHTML = 'Error loading results.';
				}
			}
		},
    	
		//grab hovered events and populate them into widget box.
		_loadTodayEvent: function(){			
			var eventBox = document.getElementById(UNLevent_monthWidget.latestID);
			if (this.readyState == 4) {
				if (this.status == 200) {
					var content = this.responseXML.documentElement;
					var eventTitle = content.getElementsByTagName('EventTitle');
					var eventWebPageTitle = content.getElementsByTagName('Title');
					var eventURL = new Array(), eventUrlType, validURL;
					var startDate = content.getElementsByTagName('StartDate')[0].childNodes[0].nodeValue;
				
					eventBox.innerHTML = '<h1>'+startDate+'</h1>';					
					for(var i=0, j=eventWebPageTitle.length; i<j; i++){
						eventUrlType = eventWebPageTitle[i].childNodes[0].nodeValue;
						if(eventUrlType === 'Event Instance URL'){
							/*@cc_on
							   /*@if (@_win32)
								 validURL = eventWebPageTitle[i].parentNode.childNodes[1].childNodes[0].nodeValue;
							   @else @*/
      							 validURL = eventWebPageTitle[i].parentNode.childNodes[3].childNodes[0].nodeValue;
							   /*@end
							@*/							
							eventURL.push(validURL);
						}						
					}
					for(var co=0, arr=eventURL.length; co<arr; co++){
						eventBox.innerHTML += '<a href="'+eventURL[co]+'">'+eventTitle[co].childNodes[0].nodeValue+'</a>';
					}
				} else {
					widget_container.innerHTML = 'Error loading results.';
				}
			}
		},
		
		_getCalendarDate: function(t)
		{
		   var months = new Array(13);
		   months[0]  = "January";
		   months[1]  = "February";
		   months[2]  = "March";
		   months[3]  = "April";
		   months[4]  = "May";
		   months[5]  = "June";
		   months[6]  = "July";
		   months[7]  = "August";
		   months[8]  = "September";
		   months[9]  = "October";
		   months[10] = "November";
		   months[11] = "December";
		   if(t){
			  var monthname   = months[t];
			  return monthname;
		   }
		   else{
			   var now         = new Date();
			   var monthnumber = now.getMonth();
			   var monthname   = months[monthnumber];
			   var dateString = monthname;
			   return dateString;
		   }
		},
	
		
		//generate xmlhttp request
		_ajaxTunnel: function(ajaxType,url,callback){
			var my_calurl = url;			
			var handleReq = new Function('return '+callback);			
			var my_calreq = new XMLHTTP();
			my_calreq.open(ajaxType, my_calurl, true);
			my_calreq.onreadystatechange = handleReq();
			my_calreq.send(null);
		},
		
		//stop event bubbling/propagation
		_stopEvent: function(e){
			if (!e) e = window.event;
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		},
		
		//when a date in the widget is hover, display events title in a box
		_attachHoverEvent: function(el){
			var verify1 = getElementsByClass(el, "monthvalue", "span");
			var x = new Date();
			var y = x.getDate();
			var el = el, previousTimeOut, hoverTime, timeOut;
			var link_container = el.getElementsByTagName('tbody');
			var alink = link_container[0].getElementsByTagName('td');
			var flaggedToday = false;
			for (var i = 0, j = alink.length; i<j; i++){
				var hasEvent = alink[i].getElementsByTagName('a');
				
				//indicates today icon
				if (flaggedToday == false &&
				 verify1[0].id === UNLevent_monthWidget._getCalendarDate() &&
				 alink[i].className.indexOf('prev') < 0 &&
				 alink[i].className.indexOf('next') < 0) {							
					if (alink[i].innerHTML.indexOf(y) == 0
					    || (hasEvent[0] && hasEvent[0].innerHTML.indexOf(y) == 0) ) {									
						alink[i].className += ' today'
						var imageToday = document.createElement("div");
						imageToday.setAttribute("id","today_image");
						alink[i].appendChild(imageToday);
						flaggedToday = true;
					}
				}
				
				//got milk? (got events?)
				if(hasEvent[0]){
					alink[i].onmouseover = function(e){
						var t = this;
						var infoBox = (this.childNodes[1]&&this.childNodes[1].className === 'eventContainer')?this.childNodes[1]:this.childNodes[2];
						//only initiate ajax request on first mouseover.
						//bring up previous requested information
						if (infoBox){
							infoBox.style.display = 'block';
						} else {									
							//throttle ajax call to prevent unecessary request when hovering over other TDs
							timeOut = setTimeout(function(){
							UNLevent_monthWidget._hoverAction(t);
							UNLevent_monthWidget._ajaxTunnel('GET',
							t.childNodes[0].href+'?format=xml','UNLevent_monthWidget._loadTodayEvent')},300);
							previousTimeOut = timeOut;
						}					
						return false;
					}
					alink[i].onmouseout = function(e){						
						UNLevent_monthWidget._stopEvent(e);
						clearTimeout(previousTimeOut);
						var infoBox = (this.childNodes[1]&&this.childNodes[1].className === 'eventContainer')?this.childNodes[1]:this.childNodes[2];
						if(infoBox){	
							infoBox.style.display = 'none';
						}
						
					}
				}
			}
			//stupid IE 6 png hack
			if(!window.XMLHttpRequest){
  				fnLoadPngs();
  			}
		},
		
		//create box markup
		_hoverAction: function(el){
			var eventContainer = document.createElement('div');
			eventContainer.className = 'eventContainer';			
			var eventInfo = document.createElement('div');			
			eventInfo.className = 'eventBox';
			eventInfo.id = 'eventInfo'+el.childNodes[0].childNodes[0].nodeValue;
			UNLevent_monthWidget.latestID = eventInfo.id;
			eventInfo.innerHTML = 'Loading...';			
			eventContainer.appendChild(eventInfo);
			el.appendChild(eventContainer);
		}
		
	}
	