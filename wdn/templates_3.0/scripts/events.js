/**
 * This plugin is intended to format calendar for pages. It takes the upcoming events feed found in the link rel=events
 * 
 */
WDN.events = function() {
	return {
		limit : 10,
		
		calURL : false,
		
		calTitle : false,
		
		container : '#wdn_calendarDisplay',
		
		initialize : function() {
			if (!this.calURL) {
				this.calURL = WDN.jQuery('link[rel=events]').attr('href');
			}
			
			if (!this.calTitle) {
				this.calTitle = WDN.jQuery('link[rel=events]').attr('title') || '';
			}
			
			if (WDN.jQuery(this.container).length != 0) {
				WDN.jQuery(this.container).addClass('wdn_calendarDisplay');
				WDN.loadCSS('wdn/templates_3.0/css/content/events.css');
				WDN.events.display();
			}
		},
		display : function() {
			var container = this.container;
			var calURL    = this.calURL;
			var calTitle  = this.calTitle;
			WDN.get(this.calURL+'upcoming/?format=hcalendar&limit='+this.limit, null, function(content) {
				WDN.jQuery(container).hide().html(content);
				WDN.jQuery(container+' h4,'+container+' h3').after('<span class="subhead"><a href="'+calURL+'upcoming/">See all '+calTitle+' events</a></span>');
				WDN.jQuery(container+' abbr').each(
						function() {
							// Convert the date and time into something we want.
							var eventdate = WDN.jQuery(this).html();
							var month,day,time = '';
							var xp = new RegExp(/[A-Za-z]{3,3}/);
							if (xp.test(eventdate)) {
								month = '<span class="month">'+xp.exec(eventdate)+'</span>';
							}
							eventdate.replace(xp.exec(eventdate),'');
							xp = new RegExp(/[\d]+:[\d]+\s?[a,p]m/);
							if (xp.test(eventdate)) {
								time = '<span class="time">'+xp.exec(eventdate)+'</span>';
							}
							time = time.replace('0 ','0');
							xp = new RegExp(/([\d]{1,2})[a-z]{2}/);
							if (xp.test(eventdate)) {
								day = '<span class="day">'+xp.exec(eventdate)[1]+'</span>';
							}
							WDN.jQuery(this).replaceWith('<div>'+month+' '+day+' '+time+'</div>');
						}
				);
				WDN.jQuery(container).show();
				if (WDN.jQuery(container).hasClass('zenbox')) { //if we're using a zenbox, change to H3
					WDN.jQuery(container+' h4').before('<h3>'+(WDN.jQuery(container+' h4').html()).replace(":", "")+'</h3>').remove();
				}
			});
		}
	};
}();