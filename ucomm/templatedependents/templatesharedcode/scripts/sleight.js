
if(navigator.platform=="Win32"&&navigator.appName=="Microsoft Internet Explorer"&&window.attachEvent){window.attachEvent("onload",fnLoadPngs);}
function fnLoadPngs(){var rslt=navigator.appVersion.match(/MSIE (\d+\.\d+)/,'');var itsAllGood=(rslt!=null&&Number(rslt[1])>=5.5);for(var i=document.images.length-1,img=null;(img=document.images[i]);i--){if(itsAllGood&&img.src.match(/\.png$/i)!=null){fnFixPng(img);img.attachEvent("onpropertychange",fnPropertyChanged);}
img.style.visibility="visible";}
for(var i=document.all.length-1,obj=null;(obj=document.all[i]);i--){if(itsAllGood&&obj.currentStyle.backgroundImage.match(/\.png/i)!=null){this.fnFixPng_back(obj);obj.attachEvent("onpropertychange",this.fnPropertyChanged_back);}}
var nl=document.getElementsByTagName("INPUT");for(var i=nl.length-1,e=null;(e=nl[i]);i--){if(e.className&&e.className.match(/\bimage\b/i)!=null){if(e.src.match(/\.png$/i)!=null){fnFixPng(e);e.attachEvent("onpropertychange",fnPropertyChanged);}
e.style.visibility="visible";}}}
function fnPropertyChanged(){if(window.event.propertyName=="src"){var el=window.event.srcElement;if(!el.src.match(/x\.gif$/i)){el.filters.item(0).src=el.src;el.src="/ucomm/templatedependents/templatesharedcode/scripts/x.gif";}}}
function fnPropertyChanged_back(){if(window.event.propertyName=="style.backgroundImage"){var el=window.event.srcElement;if(!el.currentStyle.backgroundImage.match(/x\.gif/i)){var bg=el.currentStyle.backgroundImage;var src=bg.substring(5,bg.length-2);el.filters.item(0).src=src;el.style.backgroundImage="url(/ucomm/templatedependents/templatesharedcode/scripts/x.gif)";}}}
function dbg(o){var s="";var i=0;for(var p in o){s+=p+": "+o[p]+"\n";if(++i%10==0){alert(s);s="";}}
alert(s);}
function fnFixPng(img){var src=img.src;img.style.width=img.width+"px";img.style.height=img.height+"px";img.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"', sizingMethod='scale')"
img.src="/ucomm/templatedependents/templatesharedcode/scripts/x.gif";}
function fnFixPng_back(obj){var bg=obj.currentStyle.backgroundImage;var src=bg.substring(5,bg.length-2);obj.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"', sizingMethod='scale')";obj.style.backgroundImage="url(/ucomm/templatedependents/templatesharedcode/scripts/x.gif)";}
/* Spry.Effect.js, Adobe, http://labs.adobe.com/technologies/spry/ Spry is available under the BSD license */
/* scrollbar.js Travis Beckham http://www.squidfingers.com/code/dhtml/?id=divscroller No license mentioned on website. We modifided the code added to it to fix things. */
/* slight.js, Aaron Boodman, http://boring.youngpup.net/2001/sleight Creative Commons Attribution 2.0  license. */
/* AjaxExtended, Alex Serebryakov, http://ajaxextended.com/, distributable under MIT license  */
/* zebra.js, David F. Miller, "Zebra Tables" A List Apart #173, http://www.alistapart.com/copyright/  */
/* overLabels.js, Mike Brittain, "Making Compact Forms More Accessible" A List Apart # 229, http://www.alistapart.com/copyright/ */
/* Icons, http://tango.freedesktop.org/, Creative Commons Attribution Share-Alike license.  */
/* Icons, http://www.famfamfam.com/lab/icons/silk/, Creative Commons Attribution 2.5 License  */
/* Icons, http://www.feedicons.com/ */
