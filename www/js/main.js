define(function (require) {
	
	var SETTINGS = {
		timePeriod:5000, //milliseconds between refreshes of map
		busIDArray:['bus1','bus2'],
	};
	
	var mapFuncsMain = require('./mapFuncsMain');
	
	// this might not be the cleanest way, but I'm still learning here.
	var doOtherStuffNowThatDeviceIsReady = function() {
				
		mapFuncsMain.doMapStuff(SETTINGS);
		
		
		
		// console.log("navigator.geolocation works well");
		// alert("V2 navigator.geolocation works well");
		
		//do a request for http://jamesda4th.pythonanywhere.com/busloconly
	};
	
    return {
		getButtonsReady: function () {
			var myEl = document.getElementById('readybutton');

			myEl.addEventListener('click', function() {
				doOtherStuffNowThatDeviceIsReady();
			}, false);
        },        

		doOtherStuffNowThatDeviceIsReady, //already defined
		
    };
});
