
function initOverLabels(){if(!document.getElementById)return;var labels,id,field;labels=document.getElementsByTagName('label');for(var i=0;i<labels.length;i++){if(labels[i].className=='overlabel'){id=labels[i].htmlFor||labels[i].getAttribute('for');if(!id||!(field=document.getElementById(id))){continue;}
labels[i].className='overlabel-apply';if(field.value!==''){hideLabel(field.getAttribute('id'),true);}
field.onfocus=function(){hideLabel(this.getAttribute('id'),true);};field.onblur=function(){if(this.value===''){hideLabel(this.getAttribute('id'),false);}};labels[i].onclick=function(){var id,field;id=this.getAttribute('for');if(id&&(field=document.getElementById(id))){field.focus();}};}}};function hideLabel(field_id,hide){var field_for;var labels=document.getElementsByTagName('label');for(var i=0;i<labels.length;i++){field_for=labels[i].htmlFor||labels[i].getAttribute('for');if(field_for==field_id){labels[i].style.textIndent=(hide)?'-1000px':'0px';return true;}}
return true;}
window.onload=function(){setTimeout(initOverLabels,1);};
/* Spry.Effect.js, Adobe, http://labs.adobe.com/technologies/spry/ Spry is available under the BSD license */
/* scrollbar.js Travis Beckham http://www.squidfingers.com/code/dhtml/?id=divscroller No license mentioned on website. We modifided the code added to it to fix things. */
/* slight.js, Aaron Boodman, http://boring.youngpup.net/2001/sleight Creative Commons Attribution 2.0  license. */
/* AjaxExtended, Alex Serebryakov, http://ajaxextended.com/, distributable under MIT license  */
/* zebra.js, David F. Miller, "Zebra Tables" A List Apart #173, http://www.alistapart.com/copyright/  */
/* overLabels.js, Mike Brittain, "Making Compact Forms More Accessible" A List Apart # 229, http://www.alistapart.com/copyright/ */
/* Icons, http://tango.freedesktop.org/, Creative Commons Attribution Share-Alike license.  */
/* Icons, http://www.famfamfam.com/lab/icons/silk/, Creative Commons Attribution 2.5 License  */
/* Icons, http://www.feedicons.com/ */
