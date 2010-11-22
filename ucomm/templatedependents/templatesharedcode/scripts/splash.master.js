


/* do not change anything below this */
/* onload function */
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

//load XML file
function randomSplashContent(){
	var splashContent = new XMLHTTP();
	splashContent.open("GET", xmlURL, true);
	splashContent.onreadystatechange =function(){
										if (splashContent.readyState == 4) {
											if (splashContent.status == 200) {
												selectFive(splashContent.responseXML.documentElement);
											} else {
												// Error loading alert file!
											}
										}
										splashContent = new XMLHTTP();
									 }
	splashContent.send(null);	
}

//returns unique random number given a token interval
var ary = new Array();
function picks(pick,tot) {
	for (var i = 0; i < tot; i++){ 
	ary[i] = i+1;
		function randOrd(){
			return (Math.round(Math.random())-0.5); 
		}	
	ary.sort(randOrd);
	}	
	return ary.slice(0,pick);
}

function selectFive(data)
{
	
	var xmlObj = data;
	//var alertUniqueID = alertInfo.getElementsByTagName('parameter')[0].getElementsByTagName('value')[0].childNodes[0].nodeValue;
	var storyNum = xmlObj.getElementsByTagName('story').length;	
	var listArea = document.getElementById('splashtab');
	
	//pick 5 unique random numbers out of N. N being the number of stories
	//picks(displayNum,storyNum-1);
	picks(displayNum,storyNum-1);
	for(var i=0; i<displayNum; i++){
		var aryId = ary[i];
		//pull name and story link from xml
		var storyPerson = xmlObj.getElementsByTagName('story')[aryId].getElementsByTagName('name')[0].childNodes[0].nodeValue;
		var storyLink = xmlObj.getElementsByTagName('story')[aryId].getElementsByTagName('permalink')[0].childNodes[0].nodeValue;
		//start constructing each list item
		var liHTML = '<li><a href="'+ storyLink +'" title="'+ storyPerson +'"><span>' + storyPerson + '</span></a></li>'
		listArea.innerHTML += ''+liHTML+'\n';
	}
	getStoryLinks(listArea);
}

function getStoryLinks(id){
	var listArea = document.getElementById('splashtab');
	var listLink = id.getElementsByTagName('a');
	//load whichever the first tab is
	listLink[0].parentNode.className = 'selected';
	loadStory(listLink[0].getAttribute("href", 2))
	for(var j = 0; j < listLink.length; j++){
		listLink[j].onclick = function(){
		getElementsByClass(listArea,'selected','li')[0].className = 'none';
		var linkA = this.getAttribute("href", 2);		
		this.parentNode.className = 'selected';
		loadStory(linkA);
		return false;
		}
	}
}


function loadStory(alink){
	var storyContent = new XMLHTTP();
	storyContent.open("GET", alink, true);
	storyContent.onreadystatechange =function(){
										if (storyContent.readyState == 4) {
											if (storyContent.status == 200) {
												displayStory(storyContent.responseText);
											} else {
												// Error loading alert file!
											}
										}
										storyContent = new XMLHTTP();
									 }
	storyContent.send(null);	
}

function displayStory(content){
	var storyBox = document.getElementById('splash_top');
	storyBox.innerHTML = content;
}

