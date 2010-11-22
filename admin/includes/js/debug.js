	function timer(startTime,endTime,description)
	{
//		alert("beep");
		out="-- "+description+" elapsed time:<br>";
		out+="-- --Min: "+(endTime.getMinutes()-startTime.getMinutes())+"<br>";
		out+="-- --Sec: "+((endTime.getMinutes()*60+endTime.getSeconds())-(startTime.getMinutes()*60+startTime.getSeconds()))+"<br>";
		out+="-- --Micro: "+((((endTime.getMinutes()*60+endTime.getSeconds())*100)+endTime.getMilliseconds())-(((startTime.getMinutes()*60+startTime.getSeconds())*100)+startTime.getMilliseconds()))+"<br>";
		return out;
	}
