define(function (require) {
	var SETTINGS = {
		timePeriod:5000, //milliseconds between refreshes of map
		busIDArray:['bus1','bus2'],
	};
	
	var mapFuncsMain = require('./mapFuncsMain');
	
	// this might not be the cleanest way, but I'm still learning here.
	var doOtherStuffNowThatDeviceIsReady = function() {
		mapFuncsMain.doMapStuff(SETTINGS);
	};
	
    return {
		getButtonsReady: function () {
			var myEl = document.getElementById('readybutton');

			myEl.addEventListener('click', function() {
				doOtherStuffNowThatDeviceIsReady();
			}, false);
        },        

		doOtherStuffNowThatDeviceIsReady:doOtherStuffNowThatDeviceIsReady, 
		
    };
});
