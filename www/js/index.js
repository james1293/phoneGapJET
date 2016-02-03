/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 
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
	
	
	


}

var gtimePeriod = 5000;

var randomCounterThingy = 33.5;

var latLong;

var gmarker;

var gmap;

var grespFromMainSingleRequest={'lat':33.474745,'lng':-82.025845,'timee':0};

var refreshMapOLDusingIFRAME = function (){
	var piece1 = "https://www.google.com/maps/embed/v1/place?q=";
	//33.474497
	var piece2 = "%2C%20";
	//-82.022683
	var piece3 = "&key=AIzaSyAgqF0QYWaQXDsGva0za_XCDJ7nfbf5d7c";
	toWrite = piece1 + randomCounterThingy.toString() + piece2 + "-82.1" + piece3;
	document.getElementById('googlemap').src = toWrite;
}



var moveMarker = function() {
	gmarker.setPosition({'lat':randomCounterThingy,'lng':-82.01})
	randomCounterThingy = randomCounterThingy + 0.01;
}

var refreshCurrentBusLocation = function () {
	// DO AN AJAX CALL TO THE SERVER
	loadXMLDoc();
	// http://jamesda4th.pythonanywhere.com/busloconly
	
	//var cLoc = {'lat':33.5,'lng':-82.01};
	//return cLoc;
}


// http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
function loadXMLDoc() {
    var xmlhttp;

    xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if(xmlhttp.status == 200){
               //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
               tempResp=JSON.parse(xmlhttp.responseText);
               tempResp['lng']=tempResp['lon'];
               grespFromMainSingleRequest = tempResp;
               // alert(grespFromMainSingleRequest);
               refreshMarker()
               
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
}

var refreshMarker = function () {
	var cLoc = grespFromMainSingleRequest;
	//alert(cLoc.lat+","+cLoc.lng);
	gmarker.setPosition({'lat':cLoc.lat,'lng':cLoc.lng});
}


var startMap = function () {
	var cLoc = grespFromMainSingleRequest;
	
	// other way to specify lat and long
	//var latLong = new google.maps.LatLng(randomCounterThingy,-82.022683);
	
	var mapOptions = {
		center: cLoc,
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	gmarker = new google.maps.Marker({
		position: cLoc,
		title: 'Bus1'
	});
	
	gmap = new google.maps.Map(document.getElementById("geolocation"), mapOptions);
		
	gmarker.setMap(gmap);
	
	
	var ctaLayer = new google.maps.KmlLayer({
		url:'http://jamesda4th.pythonanywhere.com/blueroute.kml', //url: 'jstuff/doc.kml', //url: 'http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml',
		map: gmap
	});
	
}


    
// this might not be the cleanest way, but I'm still learning here.
var doOtherStuffNowThatDeviceIsReady = function() {
		
	startMap();
	setInterval(refreshCurrentBusLocation, gtimePeriod);
	
	
	// console.log("navigator.geolocation works well");
	// alert("V2 navigator.geolocation works well");
	
	//do a request for http://jamesda4th.pythonanywhere.com/busloconly
}
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        doOtherStuffNowThatDeviceIsReady();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
        
        
};
 


