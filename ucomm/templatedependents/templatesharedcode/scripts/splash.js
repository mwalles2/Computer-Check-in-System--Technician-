
function addLoadEvent(func){var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func;}else{window.onload=function(){if(oldonload){oldonload();}
func();}}}
function randomSplashContent(){var splashContent=new XMLHTTP();splashContent.open("GET",xmlURL,true);splashContent.onreadystatechange=function(){if(splashContent.readyState==4){if(splashContent.status==200){selectFive(splashContent.responseXML.documentElement);}else{}}
splashContent=new XMLHTTP();}
splashContent.send(null);}
var ary=new Array();function picks(pick,tot){for(var i=0;i<tot;i++){ary[i]=i+1;function randOrd(){return(Math.round(Math.random())-0.5);}
ary.sort(randOrd);}
return ary.slice(0,pick);}
function selectFive(data)
{var xmlObj=data;var storyNum=xmlObj.getElementsByTagName('story').length;var listArea=document.getElementById('splashtab');picks(displayNum,storyNum-1);for(var i=0;i<displayNum;i++){var aryId=ary[i];var storyPerson=xmlObj.getElementsByTagName('story')[aryId].getElementsByTagName('name')[0].childNodes[0].nodeValue;var storyLink=xmlObj.getElementsByTagName('story')[aryId].getElementsByTagName('permalink')[0].childNodes[0].nodeValue;var liHTML='<li><a href="'+storyLink+'" title="'+storyPerson+'"><span>'+storyPerson+'</span></a></li>'
listArea.innerHTML+=''+liHTML+'\n';}
getStoryLinks(listArea);}
function getStoryLinks(id){var listArea=document.getElementById('splashtab');var listLink=id.getElementsByTagName('a');listLink[0].parentNode.className='selected';loadStory(listLink[0].getAttribute("href",2))
for(var j=0;j<listLink.length;j++){listLink[j].onclick=function(){getElementsByClass(listArea,'selected','li')[0].className='none';var linkA=this.getAttribute("href",2);this.parentNode.className='selected';loadStory(linkA);return false;}}}
function loadStory(alink){var storyContent=new XMLHTTP();storyContent.open("GET",alink,true);storyContent.onreadystatechange=function(){if(storyContent.readyState==4){if(storyContent.status==200){displayStory(storyContent.responseText);}else{}}
storyContent=new XMLHTTP();}
storyContent.send(null);}
function displayStory(content){var storyBox=document.getElementById('splash_top');storyBox.innerHTML=content;}
/* Spry.Effect.js, Adobe, http://labs.adobe.com/technologies/spry/ Spry is available under the BSD license */
/* scrollbar.js Travis Beckham http://www.squidfingers.com/code/dhtml/?id=divscroller No license mentioned on website. We modifided the code added to it to fix things. */
/* slight.js, Aaron Boodman, http://boring.youngpup.net/2001/sleight Creative Commons Attribution 2.0  license. */
/* AjaxExtended, Alex Serebryakov, http://ajaxextended.com/, distributable under MIT license  */
/* zebra.js, David F. Miller, "Zebra Tables" A List Apart #173, http://www.alistapart.com/copyright/  */
/* overLabels.js, Mike Brittain, "Making Compact Forms More Accessible" A List Apart # 229, http://www.alistapart.com/copyright/ */
/* Icons, http://tango.freedesktop.org/, Creative Commons Attribution Share-Alike license.  */
/* Icons, http://www.famfamfam.com/lab/icons/silk/, Creative Commons Attribution 2.5 License  */
/* Icons, http://www.feedicons.com/ */
