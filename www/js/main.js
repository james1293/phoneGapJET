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
			document.getElementById('scheduleButton').addEventListener('click', function() {
				document.getElementById('schedule').style.display = 'block';				
				document.getElementById('help').style.display = 'none';
			}, false);
			
			document.getElementById('scheduleCloseButton').addEventListener('click', function() {
				document.getElementById('schedule').style.display = 'none';
				document.getElementById('help').style.display = 'none';
			}, false);
			
			document.getElementById('helpButton').addEventListener('click', function() {
				document.getElementById('help').style.display = 'block';				
				document.getElementById('schedule').style.display = 'none';
			}, false);
			
			document.getElementById('helpCloseButton').addEventListener('click', function() {
				document.getElementById('schedule').style.display = 'none';
				document.getElementById('help').style.display = 'none';
			}, false);
        },        

		doOtherStuffNowThatDeviceIsReady:doOtherStuffNowThatDeviceIsReady, 
		
    };
});
