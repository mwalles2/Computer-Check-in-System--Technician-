function buildDate()
{
	myDate=new Date();
	month=myDate.getMonth()+1;
	out=month+"/"+myDate.getDate()+"/"+myDate.getFullYear();
	return out;
}