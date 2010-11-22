/* data island */
unlAlerts.data = {
	info:[
         {
           category:'Env',
           event:'Universit of Nebraska-Lincoln Alert',
    	   urgency:'Immediate',
           severity:'Extreme',
           certainty:'Very Likely',
           headline:'Snow Advisory',
           description:'\n\nSnow Advisory remains in effect until Thursday, 6 AM.',
           web:'http://ucommxsrv1.unl.edu/uptodate/',
           parameter:{
                valuename:'id',
                value:71
           },
           area:{
                areadesc:'Lincoln (Nebraska)',
                geocode:12873
           }
        },
	]
};
/* dont have to run server side script everytime, only when there's data */
if(unlAlerts.data.info){
	unlAlerts.server.init();
	unlAlerts.check = 'yes';
}