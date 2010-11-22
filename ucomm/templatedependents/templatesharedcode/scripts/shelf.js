
function camtab(camuri){var tcischecked=false
selectedtablink=camuri.href
tcischecked=(document.tabcontrol&&document.tabcontrol.tabcheck.checked)?true:false
if(document.getElementById&&!tcischecked){var tabobj=document.getElementById("tablist")
var tabobjlinks=tabobj.getElementsByTagName("li")
for(i=0;i<tabobjlinks.length;i++)
tabobjlinks[i].className="off"
camuri.className="current"
return false}
else
return true}
function shelfbutton(){var tcischecked=false
var shelftab=document.getElementById('shelf_button');tcischecked=(getElementsByClass(document,'current','*'))?true:false;if(document.getElementById&&!tcischecked){shelftab.className="off"
return true}else{shelftab.className="current";return false;}}
function setupFunc(element,effect){try{if(!sIFR.UA.bIsIE){var sifr1=document.getElementById('titlegraphic').getElementsByTagName('h1');var sifr2=document.getElementById('titlegraphic').getElementsByTagName('h2');sifr1[0].style.display='none';sifr2[0].style.display='none';}}catch(e){}
var bc=document.getElementById('breadcrumbs');for(var i=0;i<bc.getElementsByTagName("ul").length;i++){bc.getElementsByTagName("ul")[i].style.display='none';}
Spry.Effect.AppearFade('sitetools',{duration:2500,from:0,to:100,toggle:false});}
function finishFunc(element,effect){}
function setupFuncOff(element,effect){Spry.Effect.AppearFade('sitetools',{duration:500,from:100,to:0,toggle:false});if(!sIFR.UA.bIsIE){var sifr1=document.getElementById('titlegraphic').getElementsByTagName('h1');var sifr2=document.getElementById('titlegraphic').getElementsByTagName('h2');sifr1[0].style.display='block';sifr2[0].style.display='block';}}
function finishFuncOff(element,effect){var tab=document.getElementById('sitetools');tab.style.display='none';var bc=document.getElementById('breadcrumbs');for(var i=0;i<bc.getElementsByTagName("ul").length;i++){bc.getElementsByTagName("ul")[i].style.display='inline';}}
document.onkeydown=checkKeycode;function checkKeycode(e){var keycode,targ;if(!e)e=window.event;if(e.target)targ=e.target;else if(e.srcElement)targ=e.srcElement;if(targ.nodeName=="INPUT"||e.metaKey)return;keycode=e.keyCode;if(keycode==192){tabExpand();}}
var calScrollBar;var weatherScrollBar;var pfScrollBar;var firstTimeLoad=1;var wait=false;var unlwebcam='http://www.unl.edu/unlpub/cam/cam1.jpg';var pfreq=new XMLHTTP();var calreq=new XMLHTTP();var weatherreq=new XMLHTTP();var pfresultsdiv='pfresults';var pfserviceurl='http://peoplefinder.unl.edu/service.php?q=';var pfreq_q;if(!pfreq)
alert("Error initializing XMLHttpRequest!");function tabExpand(){try{var tab=document.getElementById('sitetools');if(tab.style.display=='none'){openShelfCallback();pfresultsdiv='pfresults';pfserviceurl='http://peoplefinder.unl.edu/service.php?q=';displayCalendar();displayUNLWeather();updateWebcam(unlwebcam);shelfbutton();if(firstTimeLoad){firstTimeLoad=0;document.getElementById('upArrowPF').style.display='none';document.getElementById('downArrowPF').style.display='none';document.getElementById('dragButtonPF').style.display='none';document.getElementById('trackBarPF').style.display='none';document.getElementById('upArrowCal').style.display='none';document.getElementById('downArrowCal').style.display='none';document.getElementById('dragButtonCal').style.display='none';document.getElementById('trackBarCal').style.display='none';document.getElementById('upArrowWeather').style.display='none';document.getElementById('downArrowWeather').style.display='none';document.getElementById('dragButtonWeather').style.display='none';document.getElementById('trackBarWeather').style.display='none';}
Spry.Effect.Slide('toolcontainer',{duration:800,from:'0px',to:'300px',toggle:false,setup:setupFunc,finish:finishFunc});}else{closeShelfCallback();Spry.Effect.Slide('toolcontainer',{duration:500,from:'300px',to:'0px',toggle:false,setup:setupFuncOff,finish:finishFuncOff});var shelftab=document.getElementById('shelf_button');shelftab.className="off";}
return false;}catch(e){return true;}}
function openShelfCallback(){}
function closeShelfCallback(){}
function pf_getUID(uid){var url="http://peoplefinder.unl.edu/hcards/"+uid;if(wait==true){pfreq.abort();pfreq=new XMLHTTP();}
pfreq.open("GET",url,true);pfreq.onreadystatechange=updatePeopleFinderResults;pfreq.send(null);wait=true;return false;}
function updateWebcam(camuri){document.getElementById('webcamuri').src=camuri;unlwebcam=camuri;}
function queuePFChooser(q,resultsdiv){pfserviceurl='http://peoplefinder.unl.edu/service.php?chooser=true&q=';queuePFRequest(q,resultsdiv);}
function queuePFRequest(q,resultsdiv){pfresultsdiv=resultsdiv;clearTimeout(pfreq_q);if(q.length>3){document.getElementById(pfresultsdiv).innerHTML='';document.getElementById("pfprogress").src='/ucomm/templatedependents/templatecss/images/loadingContent.gif';pfreq_q=setTimeout('getPeopleFinderResults("'+escape(q)+'")',400);displayUNLPFScrollbar();pfScrollBar.reset();}else if(q.length>0){document.getElementById("pfprogress").src='/ucomm/templatedependents/templatecss/images/transpixel.gif';document.getElementById(pfresultsdiv).innerHTML='Please enter more information.';displayUNLPFScrollbar();pfScrollBar.reset();}else{document.getElementById("pfprogress").src='/ucomm/templatedependents/templatecss/images/transpixel.gif';document.getElementById(pfresultsdiv).innerHTML='';displayUNLPFScrollbar();pfScrollBar.reset();}}
function getPeopleFinderResults(q){var url=pfserviceurl+q;if(wait==true){pfreq.abort();pfreq=new XMLHTTP();}
pfreq.open("GET",url,true);pfreq.onreadystatechange=updatePeopleFinderResults;pfreq.send(null);wait=true;}
function pfCatchUID(uid)
{alert('I\'ve caught '+uid+'. You should create your own pfCatchUID function.');return false;}
function updatePeopleFinderResults(){if(pfreq.readyState==4){if(pfreq.status==200){document.getElementById(pfresultsdiv).innerHTML=pfreq.responseText;displayUNLPFScrollbar();pfScrollBar.reset();}else{document.getElementById(pfresultsdiv).innerHTML='Error loading results.';}}
document.getElementById("pfprogress").src='/ucomm/templatedependents/templatecss/images/transpixel.gif';wait=false;pfreq=new XMLHTTP();}
function displayUNLPFScrollbar(){pfScrollBar=new ScrollObj(10,25,168-2*18,"trackBarPF","upArrowPF","downArrowPF","dragButtonPF","pfResultsMask","pfresults");}
function displayCalendar(){var calurl="http://events.unl.edu/?format=hcalendar";calreq.open("GET",calurl,true);calreq.onreadystatechange=updateCalendarResults;calreq.send(null);}
function updateCalendarResults()
{if(calreq.readyState==4){if(calreq.status==200){document.getElementById("calresults").innerHTML=calreq.responseText;displayUNLCalScrollbar();calScrollBar.reset();}else{document.getElementById("calresults").innerHTML='Error loading results.';}}
wait=false;calreq=new XMLHTTP();}
function displayUNLCalScrollbar(){var tab=document.getElementById('sitetools');tab.style.display='block';calScrollBar=new ScrollObj(10,25,220-2*18,"trackBarCal","upArrowCal","downArrowCal","dragButtonCal","calcontent","calresults");}
function displayUNLWeather(){var weatherurl="http://www.unl.edu/ucomm/templatedependents/templatesharedcode/scripts/current.html";weatherreq.open("GET",weatherurl,true);weatherreq.onreadystatechange=updateWeatherResults;weatherreq.send(null);}
function updateWeatherResults()
{if(weatherreq.readyState==4){if(weatherreq.status==200){document.getElementById("weatherresults").innerHTML=weatherreq.responseText;displayUNLWeatherScrollbar();weatherScrollBar.reset();}else{document.getElementById("weatherresults").innerHTML='Error loading results.';}}
wait=false;weatherreq=new XMLHTTP();}
function displayUNLWeatherScrollbar(){var tab=document.getElementById('sitetools');tab.style.display='block';weatherScrollBar=new ScrollObj(10,25,220-2*18,"trackBarWeather","upArrowWeather","downArrowWeather","dragButtonWeather","weathercontent","weatherresults");}
/* Spry.Effect.js, Adobe, http://labs.adobe.com/technologies/spry/ Spry is available under the BSD license */
/* scrollbar.js Travis Beckham http://www.squidfingers.com/code/dhtml/?id=divscroller No license mentioned on website. We modifided the code added to it to fix things. */
/* slight.js, Aaron Boodman, http://boring.youngpup.net/2001/sleight Creative Commons Attribution 2.0  license. */
/* AjaxExtended, Alex Serebryakov, http://ajaxextended.com/, distributable under MIT license  */
/* zebra.js, David F. Miller, "Zebra Tables" A List Apart #173, http://www.alistapart.com/copyright/  */
/* overLabels.js, Mike Brittain, "Making Compact Forms More Accessible" A List Apart # 229, http://www.alistapart.com/copyright/ */
/* Icons, http://tango.freedesktop.org/, Creative Commons Attribution Share-Alike license.  */
/* Icons, http://www.famfamfam.com/lab/icons/silk/, Creative Commons Attribution 2.5 License  */
/* Icons, http://www.feedicons.com/ */
