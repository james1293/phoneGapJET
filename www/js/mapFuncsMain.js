define(function (require) {
	
	//pull in this function
	//var loadXMLDoc = require('./mapFolder/loadXMLDoc');
	
	var DEFAULT_STARTING_POSITION_DURING_DEBUG ={'lat':33.474745,'lng':-82.025845};
	
	//this is a CLASS.
	var MyBusObject = function (_busID) {
		this.googlemarker = new google.maps.Marker({
			position: DEFAULT_STARTING_POSITION_DURING_DEBUG,
			title: _busID
		});
		this.cLoc=DEFAULT_STARTING_POSITION_DURING_DEBUG;
		this.cLoc['lat']+=0.001*Math.random(); //scatter the default marker locations a bit
		this.timee=42;
	};
	
	//this is an OBJECT.
	var busses = {
		busIDArray: [],
		
		refreshMarkers: function (respFromSingleRequest) {
			//for(var i=0; i < busses.busIDArray.length; i++) {
				//var busID = this.busIDArray[i];
				//console.log(busID);
				globalThingy = respFromSingleRequest;
				console.log(respFromSingleRequest);
				for(var j=0; j < respFromSingleRequest.length; j++) {
					var respJustOneBusPart = respFromSingleRequest[j];
					var busID = respJustOneBusPart.busID;
					this[busID].googlemarker.setPosition({'lat':respJustOneBusPart.lat,'lng':respJustOneBusPart.lng}); 
				}
					
				
				//
			//}
		},
	};
	
	
	var gmap;
	

			// http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
	var loadXMLDoc = function() {
		var xmlhttp;

		xmlhttp = new XMLHttpRequest();
		
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
			   if(xmlhttp.status == 200){
				   //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
				   var tempResp=JSON.parse(xmlhttp.responseText);
				   busses.refreshMarkers(tempResp);
			   }
			   else if(xmlhttp.status == 400) {
				  alert('There was an error 400')
			   }
			   else {
				  alert('something else other than 200 was returned')
			   }
			}
		}
		
		xmlhttp.open("GET", "http://jamesda4th.pythonanywhere.com/busloconly", true); //true => Async
		xmlhttp.send();
	};
		
	
	

	

	
	//var cLoc = {
	//	'bus1':{'lat':33.474745,'lng':-82.025845,'timee':0},
	//	'bus2':{'lat':33.4,'lng':-82.025845,'timee':0},
	//}

	//var moveMarker = function() {
	//	gmarker.setPosition({'lat':randomCounterThingy,'lng':-82.01})
	//	randomCounterThingy = randomCounterThingy + 0.01;
	//};
		
	
	//var gtimePeriod = 5000;

	//var randomCounterThingy = 33.5;

	//var latLong;

	//var gmarker;


	//var grespFromMainSingleRequest={};


	var refreshCurrentBusLocation = function () {
		// DO AN AJAX CALL TO THE SERVER
		loadXMLDoc();
		// http://jamesda4th.pythonanywhere.com/busloconly
		
		//var cLoc = {'lat':33.5,'lng':-82.01};
		//return cLoc;
	};


	
	
	


    return {        
	   doMapStuff: function (SETTINGS) {
		    
			//cLoc = grespFromMainSingleRequest;
			
			// other way to specify lat and long
			//var latLong = new google.maps.LatLng(randomCounterThingy,-82.022683);
			
			var mapOptions = {
				center: DEFAULT_STARTING_POSITION_DURING_DEBUG,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			gmap = new google.maps.Map(document.getElementById("geolocation"), mapOptions);
			
			busses.busIDArray=SETTINGS.busIDArray; //just nice to have this copy available in the busses object
			
			for(var i=0; i < busses.busIDArray.length; i++) {
				var busID = busses.busIDArray[i];
				busses[busID] = new MyBusObject(busID);
				busses[busID].googlemarker.setMap(gmap);
			}
			//gmarker = new google.maps.Marker({
			//	position: cLoc,
			//	title: 'Bus1'
			//});
			
			
				
			
			var ctaLayer = new google.maps.KmlLayer({
				url:'http://jamesda4th.pythonanywhere.com/campus.kml', //url: 'jstuff/doc.kml', //url: 'http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml',
				map: gmap
			});
			
			setInterval(refreshCurrentBusLocation, SETTINGS.timePeriod);
		},
    }; //end "return" statement
});
