
var XMLHTTP=function(){var _maximumRequestLength=1500
var _apiURL='http://ucommxsrv1.unl.edu/xmlhttp/'
this.status=null
this.statusText=null
this.responseText=null
this.responseXML=null
this.synchronous=false
this.readyState=0
this.onreadystatechange=function(){}
this.onerror=function(){}
this.onload=function(){}
this.abort=function(){_stop=true
_destroyScripts()}
this.getAllResponseHeaders=function(){var result=''
for(property in _responseHeaders)
result+=property+': '+_responseHeaders[property]+'\r\n'
return result}
this.getResponseHeader=function(name){for(property in _responseHeaders){if(property.toLowerCase()==name.toLowerCase())
return _responseHeaders[property]}
return null}
this.overrideMimeType=function(type){_overrideMime=type}
this.open=function(method,url,sync,userName,password){if(!_checkParameters(method,url))return
_method=(method)?method:''
_url=(url)?url:''
_userName=(userName)?userName:''
_password=(password)?password:''
_setReadyState(1)}
this.openRequest=function(method,url,sync,userName,password){return this.open(method,url,sync,userName,password)}
this.send=function(data){if(_stop)return
var src=_createQuery(data)
_createScript(src)}
this.setRequestHeader=function(name,value){if(_stop)return
for(property in _requestHeaders){if(property.toLowerCase()==name.toLowerCase()){_requestHeaders[property]=value;return}}
_requestHeaders[name]=value}
var _method=''
var _url=''
var _userName=''
var _password=''
var _requestHeaders={"HTTP-Referer":escape(document.location),"Content-Type":"application/x-www-form-urlencoded"}
var _responseHeaders={}
var _overrideMime=""
var self=this
var _id=''
var _scripts=[]
var _stop=false
var _throwError=function(description){self.onerror(description)
self.abort()
return false}
var _createQuery=function(data){if(!data)data=''
var headers=''
for(property in _requestHeaders)
headers+=property+'='+_requestHeaders[property]+'&'
var originalsrc=_method
+'$'+_id
+'$'+_userName
+"$"+_password
+"$"+headers
+'$'+_escape(data)
+'$'+_url
var src=originalsrc
var max=_maximumRequestLength,request=[]
var total=Math.floor(src.length/max),current=0
while(src.length>0){var query=_apiURL+'?'
+'multipart'
+'$'+_id
+'$'+current++
+'$'+total
+'$'+src.substr(0,max)
request.push(query)
src=src.substr(max)}
if(request.length==1)
src=_apiURL+'?'+originalsrc
else
src=request
return src}
var _checkParameters=function(method,url){if(!method)
return _throwError('Please, specify the query method (GET, POST or HEAD)')
if(!url)
return _throwError('Please, specify the URL')
if(method.toLowerCase()!='get'&&method.toLowerCase()!='post'&&method.toLowerCase()!='head')
return _throwError('Please, specify either a GET, POST or a HEAD method')
if(url.toLowerCase().substr(0,7)!='http://')
return _throwError('Only HTTP protocol is supported (http://)')
return true}
var _createScript=function(src){if('object'==typeof src){for(var i=0;i<src.length;i++)
_createScript(src[i]);return true;}
var script=document.createElement('script');script.src=src;script.type='text/javascript';if(navigator.userAgent.indexOf('Safari')){script.charset='utf-8';}
script=document.getElementsByTagName('head')[0].appendChild(script);_scripts.push(script);return script;}
var _escape=function(string){string=escape(string)
string=string.replace('+','%2B')
return string}
var _destroyScripts=function(){for(var i=0;i<_scripts.length;i++)
if(_scripts[i].parentNode)
_scripts[i].parentNode.removeChild(_scripts[i])}
var _registerCallback=function(){_id='v'+Math.random().toString().substr(2)
window[_id]=self}
var _setReadyState=function(number){self.readyState=number
self.onreadystatechange()
if(number==4)self.onload()}
var _parseXML=function(){var type=self.getResponseHeader('Content-type')+_overrideMime
if(!(type.indexOf('html')>-1||type.indexOf('xml')>-1))return
if(document.implementation&&document.implementation.createDocument&&navigator.userAgent.indexOf('Opera')==-1){var parser=new DOMParser()
var xml=parser.parseFromString(self.responseText,"text/xml")
self.responseXML=xml}else if(window.ActiveXObject){var xml=new ActiveXObject('MSXML2.DOMDocument.3.0')
if(xml.loadXML(self.responseText))
self.responseXML=xml}else{var xml=document.body.appendChild(document.createElement('div'))
xml.style.display='none'
xml.innerHTML=self.responseText
_cleanWhitespace(xml,true)
self.responseXML=xml.childNodes[0]
document.body.removeChild(xml)}}
var _cleanWhitespace=function(element,deep){var i=element.childNodes.length;if(i==0)return
do{var node=element.childNodes[--i]
if(node.nodeType==3&&!_cleanEmptySymbols(node.nodeValue))
element.removeChild(node)
if(node.nodeType==1&&deep)
_cleanWhitespace(node,true)}while(i>0)}
var _cleanEmptySymbols=function(string){string=string.replace('\r','')
string=string.replace('\n','')
string=string.replace(' ','')
return(string.length==0)?false:true}
this._parse=function(object){if(_stop)return true;if(object.multipart)return true;if(!object.success)
return _throwError(object.description);_responseHeaders=object.responseHeaders;this.status=object.status;this.statusText=object.statusText;this.responseText=object.responseText;_parseXML();_destroyScripts();_setReadyState(4);return true;}
_registerCallback()}
/* Spry.Effect.js, Adobe, http://labs.adobe.com/technologies/spry/ Spry is available under the BSD license */
/* scrollbar.js Travis Beckham http://www.squidfingers.com/code/dhtml/?id=divscroller No license mentioned on website. We modifided the code added to it to fix things. */
/* slight.js, Aaron Boodman, http://boring.youngpup.net/2001/sleight Creative Commons Attribution 2.0  license. */
/* AjaxExtended, Alex Serebryakov, http://ajaxextended.com/, distributable under MIT license  */
/* zebra.js, David F. Miller, "Zebra Tables" A List Apart #173, http://www.alistapart.com/copyright/  */
/* overLabels.js, Mike Brittain, "Making Compact Forms More Accessible" A List Apart # 229, http://www.alistapart.com/copyright/ */
/* Icons, http://tango.freedesktop.org/, Creative Commons Attribution Share-Alike license.  */
/* Icons, http://www.famfamfam.com/lab/icons/silk/, Creative Commons Attribution 2.5 License  */
/* Icons, http://www.feedicons.com/ */
