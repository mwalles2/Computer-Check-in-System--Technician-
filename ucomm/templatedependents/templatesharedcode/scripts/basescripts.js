
function rotateImg(imgArray_str,elementId_str,secs_int,thisNum_int){function showIt(){try{if(obj.src!=null&&eval(imgArray_str+"["+thisNum_int+"][0]")!=null)
obj.src=eval(imgArray_str+"["+thisNum_int+"][0]");if(obj.alt!=null&&eval(imgArray_str+"["+thisNum_int+"][1]")!=null)
obj.alt=eval(imgArray_str+"["+thisNum_int+"][1]");if(obj.parentNode.href!=null&&eval(imgArray_str+"["+thisNum_int+"][2]")!=null){obj.parentNode.href=eval(imgArray_str+"["+thisNum_int+"][2]");if(eval(imgArray_str+"["+thisNum_int+"][3]")!=null){var clickEvent=eval(imgArray_str+"["+thisNum_int+"][3]");obj.parentNode.onclick=function(){eval(clickEvent);}}
else
obj.parentNode.onclick=null;}
else
obj.parentNode.href='#';}catch(e){}}
if(thisNum_int==null)
thisNum_int=Math.floor(Math.random()*eval(imgArray_str+".length"));if(thisNum_int>=eval(imgArray_str+".length"))
thisNum_int=0;if(eval(imgArray_str+"["+thisNum_int+"]")!=null){var obj=MM_findObj(elementId_str);showIt();}
thisNum_int++;if(secs_int>0){return setTimeout("rotateImg('"+imgArray_str+"','"+elementId_str+"',"+secs_int+","+thisNum_int+")",secs_int*1000);}else{return true;}}
function executeQuery(form,typeOperation,doSubmit)
{var ind=document.getElementById('whichDatabase').selectedIndex;var redirURL=document.getElementById('whichDatabase').options[ind].value+escape(form.q.value);if(form.q.value.length<1)
{alert("There is an empty query. Please enter a valid one");form.q.focus();return false;}
else
{if(redirURL.indexOf("http://www.google.com/search")!=-1){window.open(redirURL);}
else if(redirURL.indexOf("http://peoplefinder.unl.edu/")!=-1){window.open(redirURL,'peoplefindpop','scrollbars=1,width=325,height=500,innerwidth=325,innerheight=500');}
else{location.href=redirURL;}
return false;}
return false;}
function MM_findObj(n,d){var p,i,x;if(!d)d=document;if((p=n.indexOf("?"))>0&&parent.frames.length){d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);}
if(!(x=d[n])&&d.all)x=d.all[n];for(i=0;!x&&i<d.forms.length;i++)x=d.forms[i][n];for(i=0;!x&&d.layers&&i<d.layers.length;i++)x=MM_findObj(n,d.layers[i].document);if(!x&&d.getElementById)x=d.getElementById(n);return x;}
function MM_jumpMenu(targ,selObj,restore){eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");if(restore)selObj.selectedIndex=0;}
function makeRemoteQTVR(){remote=window.open("","remotewinQTVR","toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no,width=794,height=594");remote.location.href="http://www.unl.edu/unlpub/tour/frame3/index_fullpage.shtml";if(remote.opener==null)remote.opener=window;remote.opener.name="touropener";}
function createUNLCookie(name,value,seconds){if(seconds){var date=new Date();date.setTime(date.getTime()+(seconds*1000));var expires=";expires="+date.toGMTString();}else{var expires="";}
document.cookie=name+"="+value+expires+";path=/;domain=.unl.edu";}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
function fetchURLInto(url,id,err){var xreq=new XMLHTTP();xreq.open("GET",url,true);xreq.onreadystatechange=function()
{try{if(xreq.readyState==4){if(xreq.status==200){document.getElementById(id).innerHTML=xreq.responseText;}else{if(undefined==err){document.getElementById(id).innerHTML='Error loading results.';}else{document.getElementById(id).innerHTML=err;}}}
xreq=new XMLHTTP();}catch(e){}}
xreq.send(null);}
/* Spry.Effect.js, Adobe, http://labs.adobe.com/technologies/spry/ Spry is available under the BSD license */
/* scrollbar.js Travis Beckham http://www.squidfingers.com/code/dhtml/?id=divscroller No license mentioned on website. We modifided the code added to it to fix things. */
/* slight.js, Aaron Boodman, http://boring.youngpup.net/2001/sleight Creative Commons Attribution 2.0  license. */
/* AjaxExtended, Alex Serebryakov, http://ajaxextended.com/, distributable under MIT license  */
/* zebra.js, David F. Miller, "Zebra Tables" A List Apart #173, http://www.alistapart.com/copyright/  */
/* overLabels.js, Mike Brittain, "Making Compact Forms More Accessible" A List Apart # 229, http://www.alistapart.com/copyright/ */
/* Icons, http://tango.freedesktop.org/, Creative Commons Attribution Share-Alike license.  */
/* Icons, http://www.famfamfam.com/lab/icons/silk/, Creative Commons Attribution 2.5 License  */
/* Icons, http://www.feedicons.com/ */
