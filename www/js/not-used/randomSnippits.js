refreshMapOLDusingIFRAME: function (){
			var piece1 = "https://www.google.com/maps/embed/v1/place?q=";
			//33.474497
			var piece2 = "%2C%20";
			//-82.022683
			var piece3 = "&key=AIzaSyAgqF0QYWaQXDsGva0za_XCDJ7nfbf5d7c";
			toWrite = piece1 + randomCounterThingy.toString() + piece2 + "-82.1" + piece3;
			document.getElementById('googlemap').src = toWrite;
		},
		
		
		
		
		
var alertCurrentPosition = function() {
		alert("about to get position");
		// onSuccess Callback
		// This method accepts a Position object, which contains the
		// current GPS coordinates
		//
		var onSuccess = function(position) {
			function alertDismissed() {
						// do something
					}

					navigator.notification.alert(
						'You are the winner!',  // message
						alertDismissed,         // callback
						'Game Over',            // title
						'Done'                  // buttonName
					);
			alert('Latitude: '          + position.coords.latitude          + '\n' +
				  'Longitude: '         + position.coords.longitude         + '\n' +
				  'Altitude: '          + position.coords.altitude          + '\n' +
				  'Accuracy: '          + position.coords.accuracy          + '\n' +
				  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
				  'Heading: '           + position.coords.heading           + '\n' +
				  'Speed: '             + position.coords.speed             + '\n' +
				  'Timestamp: '         + position.timestamp                + '\n');
				  
				  
				  
					
		};

		// onError Callback receives a PositionError object
		//
		function onError(error) {
			alert('code: '    + error.code    + '\n' +
				  'message: ' + error.message + '\n');
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError);
		
		
		


	};
