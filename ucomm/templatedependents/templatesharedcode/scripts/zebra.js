
function hasClass(obj){var result=false;if(obj.getAttributeNode("class")!=null){result=obj.getAttributeNode("class").value;}
return result;}
function stripe(id){var even=false;var evenColor=arguments[1]?arguments[1]:"#ffffff";var oddColor=arguments[2]?arguments[2]:"#ecf7fd";var table=document.getElementById(id);if(!table){return;}
var tbodies=table.getElementsByTagName("tbody");for(var h=0;h<tbodies.length;h++){var trs=tbodies[h].getElementsByTagName("tr");for(var i=0;i<trs.length;i++){if(!hasClass(trs[i])&&!trs[i].style.backgroundColor){var tds=trs[i].getElementsByTagName("td");for(var j=0;j<tds.length;j++){var mytd=tds[j];if(!hasClass(mytd)&&!mytd.style.backgroundColor){mytd.style.backgroundColor=even?evenColor:oddColor;}}}
even=!even;}}}
/* Spry.Effect.js, Adobe, http://labs.adobe.com/technologies/spry/ Spry is available under the BSD license */
/* scrollbar.js Travis Beckham http://www.squidfingers.com/code/dhtml/?id=divscroller No license mentioned on website. We modifided the code added to it to fix things. */
/* slight.js, Aaron Boodman, http://boring.youngpup.net/2001/sleight Creative Commons Attribution 2.0  license. */
/* AjaxExtended, Alex Serebryakov, http://ajaxextended.com/, distributable under MIT license  */
/* zebra.js, David F. Miller, "Zebra Tables" A List Apart #173, http://www.alistapart.com/copyright/  */
/* overLabels.js, Mike Brittain, "Making Compact Forms More Accessible" A List Apart # 229, http://www.alistapart.com/copyright/ */
/* Icons, http://tango.freedesktop.org/, Creative Commons Attribution Share-Alike license.  */
/* Icons, http://www.famfamfam.com/lab/icons/silk/, Creative Commons Attribution 2.5 License  */
/* Icons, http://www.feedicons.com/ */
