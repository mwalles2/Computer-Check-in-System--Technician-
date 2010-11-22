WDN.toolbar_weather = function() {
    var weatherreq = new WDN.proxy_xmlhttp();
    var forecastreq = new WDN.proxy_xmlhttp();
    return {
        initialize : function() {
            
        },
        setupToolContent : function() {
            return '<div class="col left"><h3>Local Weather</h3><div id="currentcond" class="toolbarMask"></div></div><div class="col middle"><h3>Lincoln Forecast</h3><div id="weatherforecast" class="toolbarMask"></div></div><div class="two_col right"><h3>Local Radar</h3><div id="showradar"><a href="http://radar.weather.gov/radar_lite.php?rid=oax&product=N0R&overlay=11101111&loop=yes"><img src="'+WDN.template_path+'wdn/templates_3.0/css/images/transpixel.gif" /></a></div></div>';
        },
        display : function() {
            var weatherurl = "http://www.unl.edu/wdn/templates_3.0/scripts/weatherCurrent.html";
            var forecasturl = "http://www.unl.edu/wdn/templates_3.0/scripts/weatherForecast.html";

            WDN.jQuery('#showradar img').css({background:'url(http://radar.weather.gov/lite/N0R/OAX_loop.gif)  -5px -140px no-repeat'});

            weatherreq.open("GET", weatherurl, true);
            weatherreq.onreadystatechange = WDN.toolbar_weather.updateWeatherResults;
            weatherreq.send(null);

            forecastreq.open("GET", forecasturl, true);
            forecastreq.onreadystatechange = WDN.toolbar_weather.updateForecast;
            forecastreq.send(null);
        },
        updateWeatherResults : function() {
            if (weatherreq.readyState == 4) {
                if (weatherreq.status == 200) {
                    document.getElementById("currentcond").innerHTML = weatherreq.responseText;
                } else {
                    document.getElementById("currentcond").innerHTML = 'Error loading results.';
                }
            }
            weatherreq = new WDN.proxy_xmlhttp();
        },
        updateForecast : function() {
            if (forecastreq.readyState == 4) {
                if (forecastreq.status == 200) {
                    document.getElementById("weatherforecast").innerHTML = forecastreq.responseText;
                } else {
                    document.getElementById("weatherforecast").innerHTML = 'Error loading results.';
                }
            }
            forecastreq = new WDN.proxy_xmlhttp();
        }
    };
}();
