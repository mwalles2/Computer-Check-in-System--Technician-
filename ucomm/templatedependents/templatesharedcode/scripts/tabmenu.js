
if ( typeof(unl) === 'undefined' ) {
	var unl = {};
}
/*
Create tab menu
*/

unl.tabMenu = {
	
	init: function(){
		var arr = [];
		var el = document.getElementById('maincontent');
		
		var tabNav = document.createElement('div');
		var tabNavUL = document.createElement('ul');
		tabNav.id = 'bulletin-nav';
		tabNav.appendChild(tabNavUL);
		
		for(var i=0, j = arguments.length; i<j; i++) {
			 arr[i] = document.getElementById(arguments[i]);
			 
			 var tabNavLI = document.createElement('li');
			 var tabNavSPAN = document.createElement('span');
			 var tabNavA = document.createElement('a');	
			 var tabNavTEXT = document.createTextNode(arguments[i]);
			 
			 tabNavA.href = '#';
			 tabNavA.onclick = unl.tabMenu.hideShow;
			 tabNavA.id = 'bulletinLINK-'+arguments[i];
			 tabNavSPAN.appendChild(tabNavTEXT);
			 tabNavA.appendChild(tabNavSPAN);
			 tabNavLI.appendChild(tabNavA);
			 tabNavUL.appendChild(tabNavLI);		
		
			 if(i === 0){
				arr[0].style.display = 'block';
				tabNavA.className = 'bulletin-selected';
			 } else {
				arr[i].style.display = 'none';
			 }	
		}	
		el.insertBefore(tabNav, arr[0]);	
	},
	
	//This function handles the onclick event of the tab. 
	//Show current selection, Hide others.
	hideShow: function(){				
		var ulID = document.getElementById('bulletin-nav');
		var currentDivID = document.getElementById(this.id.substring(13));
		var resetSel = getElementsByClassName(ulID, "a", "bulletin-selected");
		
		for(var c=0, k=resetSel.length; c<k; c++){
			var otherDivID = document.getElementById(resetSel[0].id.substring(13));
			otherDivID.style.display='none';	
			resetSel[c].className = 'bulletin-non';
		}
		
		this.className = 'bulletin-selected';
		currentDivID.style.display = 'block';		
		return false;
	}
	
}
	
/* calling external alert javascript every 30 seconds */	
wraphandler.addEvent(window,"load",	function(){
	unl.tabMenu.init('bar1','bar2','bar3','alvin','b2');
});