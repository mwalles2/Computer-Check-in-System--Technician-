/* Constructor */
var unlAlerts = new function() {
	this.url = 'http://alert1.unl.edu/json/unlcap.js';
	};


/* import new external javascript and delete the old one */
unlAlerts.client = {

	checkIfCallNeeded: function() {
		if (unlAlerts.client._dataHasExpired()) {
			unlAlerts.client._callServer();
		}
	},
	
	dataReceived: function() {
	    /* Set cookie to indicate time the data was aquired */
    	createUNLCookie('unlAlertsData','y', 15);
	},
	
	/*------ Check if the data has expired ------*/
	_dataHasExpired: function() {
		var c = readCookie('unlAlertsData');
		if (c) {
			return false;
		} else {
			return true;
		}
	},

	_callServer: function() {
		var head = document.getElementsByTagName('head').item(0);
		var old  = document.getElementById('lastLoadedCmds');
		if (old) head.removeChild(old);
		//alert(url);
		var currdate = new Date();
		script = document.createElement('script');
		script.src = unlAlerts.url+'?'+currdate.getTime();
		script.type = 'text/javascript';
		script.defer = true;
		script.id = 'lastLoadedCmds';
		//alert(unlAlerts.check);
		void(head.appendChild(script));
		
		/* check if alert1 server is up*/
		var time = setTimeout(function(){
			if (unlAlerts.client._dataHasExpired()) {
				// Data still has not loaded successfully, change to alert 2 server and try again.
				unlAlerts.url = 'http://alert2.unl.edu/json/unlcap.js';
				unlAlerts.client._callServer();
				clearTimeout(time);
			} else {
				//only need to run this once, if alert 2 is also down, we're screwed
				clearTimeout(time);
			}
		}, 10000);

	},
	
	/*------ check if alert was acknowledged ------*/
	alertWasAcknowledged: function(id) {
		var c = readCookie('unlAlertIdClosed_'+id);
		if (c) {
			return true;
		} else {
			return false;
		}
	},
	
	/*------ acknowledge alert, and don't show again ------*/
	_acknowledgeAlert: function(id) {
		createUNLCookie('unlAlertIdClosed_'+id,id,3600);
	},
	
	/*------ building alert message ------*/
	alertUser: function(root, uniqueID) {
		if (unlAlerts.client.alertWasAcknowledged(uniqueID)) {
			// Ignore this alert... the user has already acknowledged it.
		} else {
			var LatestAlert = root;
			var alertTitle = LatestAlert.headline;
			var alertDescription = LatestAlert.description;
			var alertID = uniqueID;	
			var alertbox = document.createElement('div');
			alertbox.id = 'alertbox';
			alertbox.innerHTML = '<a href="#" id="closeAlert" onclick="unlAlerts.client.closeAlert('+uniqueID+'); return false;">(close)</a><div id="alertboxContent"><h1>' + alertTitle + '</h1><p>'+ alertDescription +'<!-- Number '+uniqueID+' --></p></div>';
			var mc = document.getElementById('calendar');
			mc.appendChild(alertbox);
			
			var shelf = document.getElementById('sitetools');
			if(shelf.style.display == 'none'){
				//pull down shelf
				tabExpand();
			}
			// I don't know why we need this but there's a reason why i coded in long time ago. Need to be tested.
			var sifr1 = document.getElementById('titlegraphic').getElementsByTagName('h1');
			var sifr2 = document.getElementById('titlegraphic').getElementsByTagName('h2');
			sifr1[0].style.display='block';
			sifr2[0].style.display='block';
		}
	},
	
	/*------ close alert box ------*/
 	closeAlert: function(id) {
 		//create alert box
		var alertbox = document.getElementById('alertbox');
		var mc = alertbox.parentNode;
		mc.removeChild(alertbox);
		unlAlerts.client._acknowledgeAlert(id);
		//pull shelf backup
		tabExpand();
	}
}

/* server side scripts for UNL Alert System */
unlAlerts.server = {

    /*------ initiate alert message if message is critical ------*/
    init: function() {
    	/* We have received the data */
    	unlAlerts.client.dataReceived();
		
		/* get the root of the alert data tree*/
		var alertInfo = unlAlerts.data.alert.info;

		/* get unique ID */
		var alertUniqueID = alertInfo.parameter.value;
		
		// If alert file has a info element with severity == extreme
		if (alertInfo.severity == 'Extreme') {
			return unlAlerts.client.alertUser(alertInfo, alertUniqueID);
		} else {
			return false;
		}
	},
	
	haveRecentData: function() {
		var c = readCookie('unlAlertsData');
		if (c) {
			return true;
		} else {
			return false;
		}
	}
	
};

/* calling external alert javascript every 30 seconds */	
wraphandler.addEvent(window,"load",	function(){
	unlAlerts.client.checkIfCallNeeded();
	setInterval(unlAlerts.client.checkIfCallNeeded, 30000);
});