WDN.tabs = function() {
	var jq = function(id) {
		return '#' + id.replace(/(:|\.)/g, '\\$1');
	};
	
	return {
		useHashChange : true,
		
		initialize : function() {
			var ie7 = document.all && navigator.appVersion.indexOf("MSIE 7.") != -1;	
			WDN.log ("tabs JS loaded");
			//Detect if the <span> is present. If not, add it
			WDN.jQuery('ul.wdn_tabs > li > a:not(:has(span))').each(function(){
				theHTML = WDN.jQuery(this).html();
				WDN.jQuery(this).html("<span>"+theHTML+"</span>");
			});
			
			// Add yesprint class to list items, to act as a table of contents when printed
			WDN.jQuery('ul.wdn_tabs:not(.disableSwitching) li').each(function(){
				var content    = WDN.jQuery(this).children('a').text();
				var hash_check = WDN.jQuery(this).children('a').attr('href').split('#');
				if (hash_check.length == 2 && hash_check[1] !== "") {
					WDN.jQuery('div#'+hash_check[1]).prepend("<h5 class='yesprint'>"+content+"</h5>");
				}
				return true;
			});
			
			// Set up the event for when a tab is clicked
			var hashFromTabClick = false;
			WDN.jQuery('ul.wdn_tabs:not(.disableSwitching) a').click(function() { //do something when a tab is clicked
				var trig = WDN.jQuery(this);
				var href = (!ie7) ? trig.attr('href') : trig.get(0).getAttribute('href', 2);
				
				WDN.tabs.updateInterface(trig);
				hashFromTabClick = true;
				if (window.location.hash != href) {
					window.location.hash = href;
				}
				if (!WDN.tabs.useHashChange) {
					WDN.tabs.displayFromHash(href.replace('#', ''));
				}
				
				return false;
			});
			
			// Adds spacing if subtabs are present
			if (WDN.jQuery('#maincontent ul.wdn_tabs li ul').length) {
				WDN.jQuery('#maincontent ul.wdn_tabs').css({'margin-bottom':'70px'});
			}
			
			// Allows for CSS correction of last tab
			if (WDN.jQuery.browser.msie) {
				WDN.jQuery('ul.wdn_tabs > li:last-child').addClass('last');
			}
			
			// If we have some tabs setup the hash stuff
			if (WDN.jQuery('ul.wdn_tabs:not(.disableSwitching)').length) {
				var isValidTabHash = function(hash) {
					var validRE = /^[a-z][\w:\-\.]*$/i;
					return validRE.test(hash);
				};
				var setupFirstHash = function(hash) {
					if (hash) {
						var ignoreTabs = WDN.jQuery(jq(hash)).closest('.wdn_tabs_content').prev('ul.wdn_tabs');
					} else {
						var ignoreTabs = WDN.jQuery();
					}
					
					var tabs = WDN.jQuery('ul.wdn_tabs:not(.disableSwitching)').not(ignoreTabs);
					
					if (WDN.jQuery('li.selected', tabs).length) {
						var trig = WDN.jQuery('li.selected:first a:first', tabs);
					} else {
						var trig = WDN.jQuery('> li:first a:first', tabs);
					}
					
					trig.each(function() {
						var innerTrig = WDN.jQuery(this);
						var hash = (!ie7) ? innerTrig.attr('href') : innerTrig.get(0).getAttribute('href', 2);
						hash = hash.replace('#', '');
						if (!isValidTabHash(hash)) {
							return;
						}
						WDN.tabs.updateInterface(innerTrig);
						WDN.tabs.displayFromHash(hash);
					});
				};
				
				if (WDN.tabs.useHashChange) {
					var setupHashChange = function() {
						WDN.jQuery(function($) {
							var firstRun = true;
							$(window).unbind('.wdn_tabs').bind('hashchange.wdn_tabs', function(e) {
								var hash = location.hash.replace('#', '');
								if (hash && !isValidTabHash(hash)) {
									return true;
								}
								if (hash != '' && $('.wdn_tabs_content ' + jq(hash)).length) {
									WDN.tabs.displayFromHash(hash, firstRun || !hashFromTabClick);
									if (firstRun) {
										setupFirstHash(hash);
										firstRun = false;
									}
									if (hashFromTabClick) {
										hashFromTabClick = false;
									}
									return false; //consume this hash event
								} else if (firstRun) {
									setupFirstHash();
									firstRun = false;
									return true; //we simulated a hash event (allow others to consume);
								}
							});
							$(window).hashchange();
						});
					};
					if (!WDN.jQuery.fn.hashchange) {
						WDN.loadJS('wdn/templates_3.0/scripts/plugins/hashchange/jQuery.hashchange.1-3.min.js', setupHashChange);
					} else {
						setupHashChange();
					}
				} else {
					// No hashchange listener, so simulate first run
					var hash = location.hash.replace('#', '');
					if (isValidTabHash(hash) && WDN.jQuery('.wdn_tabs_content ' + jq(hash)).length) {
							WDN.tabs.displayFromHash(hash, true);
					} else {
						hash = '';
					}
					setupFirstHash(hash);
				}
			}
			
			return true;
		},
		
		updateInterface: function(trig) {
			var tabs = trig.closest('ul.wdn_tabs');
			var curr = trig.closest('li').siblings('.selected');
						
			// Remove any selected tab class
			WDN.jQuery('li.selected', tabs).removeClass('selected');
			
			// Hide any subtabs
			WDN.jQuery('ul', tabs).hide();
			
			// Add the selected class to the tab (and sub-tab)
			trig.parents('li').addClass('selected');
			
			// Show any relevant sub-tabs
			trig.siblings().show();
			trig.closest('ul').show();
			
			var nsel = trig.closest('li').siblings('.selected');
			trig.trigger('tabchanged', [curr, nsel, tabs]);
		},
		
		displayFromHash: function(hash, forceUpdate) {
			var sel = WDN.jQuery(jq(hash));
			var tabContents = sel.closest('.wdn_tabs_content');
			tabContents.children().hide();
			sel.show();
			
			if (forceUpdate) {
				var trig = WDN.jQuery('ul.wdn_tabs li a[href='+jq(hash)+']');
				if (trig.length) {
					WDN.tabs.updateInterface(trig);
				}
			}
		}
	};
}();
	