// Initialise all the variables that are used
var map, icon,geojsonLayer,EsriWorldStreetMap,EsriWorldTopoMap,
	EsriWorldImagery,clusters,basemapsGroup,layerGroup,locationOptions	,second,
	geolocationCondition = false,geolocationGroup, geojsonArray, userPos,client,
    json,n,infoDepartments,infoCoords;

//#######################################################################################################################33
// Geolocation Options
geolocationGroup = L.featureGroup();

// gets the coordinates of a mouse event
getCoordsFun = function(e)
{
	infoCoords.update(e.latlng);
}

// ###########################################################################################################

// Assignment
// create a map object
map = L.map('map')
		.setMinZoom(14);  // specifies a minimum zoom 

// icon that is used to represent the departments' locations
departmentIcon = L.AwesomeMarkers.icon(
{
	icon : 'glyphicon glyphicon-education',
	markerColor: 'green'	
});
// icon that is used to show the users' locations
userLocationIcon = L.AwesomeMarkers.icon(
{
	icon : 'glyphicon glyphicon-user',
	markerColor: 'red'
});

// BaseMaps Link (http://leaflet-extras.github.io/leaflet-providers/preview/)
// OSM basemaps
EsriWorldStreetMap = L.tileLayer.provider('Esri.WorldStreetMap');
EsriWorldTopoMap = L.tileLayer.provider('Esri.WorldTopoMap');
EsriWorldImagery = L.tileLayer.provider('Esri.WorldImagery');

// create a basemap group that will contain all the basemaps and will permit to exchange the 
// basemaps visibility
basemapsGroup = L.featureGroup();
// default basemap that is loaded
basemapsGroup.addLayer(EsriWorldStreetMap);

// (https://github.com/Leaflet/Leaflet.markercluster)
// instantiate a markerCLusterGroup object
clusters = L.markerClusterGroup(
{
	showCoverageOnHover : false, // When you mouse over a cluster it shows the bounds of its markers
	zoomToBoundsOnClick : true, // When you click a cluster we zoom to its bounds
	spiderfyOnMaxZoom: true, // When you click a cluster at the bottom zoom level we spiderfy it so you can see all of its markers
	removeOutsideVisibleBounds : true, // Clusters and markers too far from the viewport are removed from the map for performance
	disableClusteringAtZoom: 20, // If set, at this zoom level and below, markers will not be clustered
	maxCLusterRadius : 80,  // The maximum radius that a cluster will cover from the central marker (in pixels)
	spiderLegPolylineOptions : {color : '#DE3B30', opacity : 0.9, weight : 1.5}, // polyline style options
	polygonOptions : {color : '#DE3B30',opacity: 0.2,fillColor : '#DE3B30', fillopacity : 0.2, } // polygone style options
});


second = 1000; // 1000 miliseconds = 1 second
// define the geolocation options
locationOptions = 
{
	watch : true, // continuous watching of location changes
	setView: true, // set the View of the Map based on the user location
	maxZoom : Infinity, // the maximum zoom for automatic view settings
	timeOut : 120 * second, // 2 minutes 
	enableHighAccuracy: false, // low accuracy geolocation
	maximumAge : 60*second // 1 mimnut // maximum age of detected location
}


// start geolocation
//map.locate(locationOptions); // enable the geolocation service
// add the basemaps group to the map
map.addLayer(basemapsGroup);



// ######################################################################################################################
// BUTTONS
// Custom Control Button
infoDepartments = L.control({position : 'bottomleft'}); // label that will give information about the departments when the
// mouse is moved

// when the infoDeprtment button is added to the map, the following operations are performed
infoDepartments.onAdd = function(map)
{
	this._div = L.DomUtil.create('div', 'info') // create a div with a class info
	this.update(); // update the div
	return this._div; // return the div
};

// method that updates the control based on feature's properties that are given
infoDepartments.update = function(props,layer)
{	
	// if the mouse is over a POI, then its coordinates are gained	`	
	try
	{
		var lat = layer.getLatLng().lat; // latitude
		var lng = layer.getLatLng().lng; // longitude
	}catch(e){} // exceptions are not shown

	// the div's content is updated with the below information
	this._div.innerHTML = '<h4>UCL Departments</h4>' + 
	(props ? '<b>Name: </b>' + props.depname+ '<br><b>Question: </b>' +props.question + '<br><b>Answer:</b> ' +  props.correct + '<br><b>Latitude: </b>' + lat.toFixed(4)+ '\t<b>Longitude: </b>' + lng.toFixed(4) : 'Hover over the POI');

};

// Custom control Button
infoCoords = L.control({position : 'bottomleft'});

infoCoords.onAdd = function(map)
{
	this._div = L.DomUtil.create('div', 'info') // create a div with a class info
	this.update();
	return this._div;
};
// method that will use to update the control based on feature properties passed
infoCoords.update = function(coords)
{	
	// if the mouse is over a POI, then its coordinates are gained	`	
	this._div.innerHTML = '<h4>Coordinates</h4>' + 
	(coords ? '<b>Latitude: </b>' + coords.lat.toFixed(4)+ '\t<b>Longitude: </b>' + coords.lng.toFixed(4) : 'Hover over the map');

};

// More buttons are created
// Full Zoom button - when the user clicks on the button, the map's extent is changed to cover the whole POI's bounding box 
leafletTopLeft = document.querySelector('.leaflet-top'); // get the .leaflet-top HTML element
var divZoom = document.createElement('div'); // create a div element
divZoom.classList.add('custom'); // set a custom class 
divZoom.id = 'full-zoom';	// set an id
var a = document.createElement('a') // create a link
divZoom.appendChild(a); // the link is added in the div
leafletTopLeft.appendChild(divZoom); // the div is added as a last the last element of leafletTopLeft element


// Clean Map button - this button removes any redundant POIs that may remain, either when an name 
//of a department is searched or the user's position is taken 
var divClean = document.createElement('div'); // create a div element
divClean.classList.add('custom'); // add the custom class on it
divClean.id = 'clean-map'; // set its name as clean-map
var a = document.createElement('a') // create a link
divClean.appendChild(a); // the link is added to the div
leafletTopLeft.appendChild(divClean);  // the div is added as a last the last element of leafletTopLeft element



infoCoords.addTo(map); // the infoCoords Button is added to the map
infoDepartments.addTo(map); // the infoDepartments button is added to the map
L.control.scale({maxWidth: 200, position: 'bottomright'}).addTo(map); // a control scale is added to the map - position : bottom right
map.on('mousemove', getCoordsFun);



//####################################################################################################################3
// EVENTS
// when the cluster is clicked the layer's bounds set to its bounding box
clusters.on('clusterclick', function (a) 
{
			a.layer.zoomToBounds();
});
// when the full zoom button is clicked the zoom scale is changed to that of POI's extent
document.querySelector('#full-zoom').onclick = function()
{	
	console.log('zoom')
	// fit the display on UCL's POI buildings
	map.fitBounds(geojsonLayer.getBounds());
}

// when the clean map button is clicked, markers that may remain when a user searches for a department or
// the user's location is taken are removed
document.querySelector('#clean-map').onclick = function()
{
	controlSearch._markerSearch.removeFrom(map); // search markers are removed
	console.log('clean');	
}



// initialise all the variables that are used
var mapObject,menuBars,mySidenav,basemapLists,layerLists,basemapObj,
	quizOption,geolocationContent,counter,n,indexDiff,time,distance,quiz,dbPost; 

var formClient, formContent;

mapObj = document.querySelector('.fleft'); // map object
formObj = document.querySelector('#formContent'); // form object - the form is used to store data

// initial counter
counter = 1;
// indicate the index of difficulty level that is actived when the app starts
indexDiff = 2; // initial level of difficulty		
// difficulty levels (in seconds -> eg. every 60 seconds a question is asked)
time = [300,120,60]; // seconds time interval
distance = [50,100,500]; // proximity
threshold = 2000; // initial threshold of geolocation

// Variables - DOM (Documne Object Model)
mapObject = document.querySelector('#map'); // get the map object
menuBars = document.querySelector('#menu-bar'); // get the menu-bar icon control
mySidenav = document.querySelector('#mySidenav'); // control of the side nav bar element
quizOption = document.querySelectorAll('#collapse3 a'); // quiz options - Time or Proximity Quiz
quizOptionContent = [quizOption[0].innerText.split(' ')[1], quizOption[1].innerText];
quizCurrentOption = quizOption[1];
var activeOption = 1;

// get all the DOM links (a) that are contained in the #collapse1 element 
basemapLists = document.querySelectorAll('#collapse1 a');
// get all the DOM links (a) that are contained in the #collapse2 element
layerLists = document.querySelectorAll('#collapse2 a');
// takes all the hyperlinks elements that are within the #collapse4 element
quizLevelOption = document.querySelectorAll('#collapse4 a');


// the geolocation service starts
// execute the quiz 
// a threshold of 2000 meters and an interval of 30 seconds is set	
//quiz = setInterval(function(){makeQuestion(userPos,n,threshold)},time[indexDiff] * second);

function getForm(questionObj)
{	
	console.log('form starts to be loaded...');
	formClient = new XMLHttpRequest(); // create an xmlhttp object
	formClient.open('GET', './form/questionForm.html', true); // 

	formClient.onreadystatechange = function ()
	{	
		retrieveForm(questionObj); // the form is retrieved from the relative directory
	}
	try
	{
		formClient.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	}catch(e)
	{
		// this only works in internet explorer
	}

	formClient.send()
}

/*
	Through an AJAX request, the form that each user fills is loaded. While the form is loaded, its values are also updated.
*/
function retrieveForm(questionObj)
{ 	
	// readyState = hold the status of the server
	// if the status of the server is less than 4 (data processing) just show a message
	if (formClient.readyState < 4){
	}else if (formClient.readyState === 4) // indicates that the process is finished and the response is ready
	{
		if(formClient.status == 200 && formClient.status < 300) // a status between 200 and 300 indicates that the request is OK
		{
			formObj.innerHTML = formClient.responseText; // the form is loaded  in the screen
			mapObj.classList.toggle('displayNone'); // the map's display has changed to none
			menuBars.classList.toggle('displayNone'); // the menu bar display has also changed to none
			mySidenav.classList.toggle('displayNone'); // the side bar disaply is changed to none

			(mySidenav.classList.contains('active') ? mySidenav.classList.toggle('active') : null); // the menu bar it closes if its open
			// THE FORM IS UPDATED
			formObj.querySelector('#question').innerHTML = questionObj.question; // the question label of the form  is updated
			// the forms elements are gained
			var inputs = formObj.querySelectorAll('input.checkmark');
			
			document.querySelector('#a').innerHTML += questionObj[inputs[0].name]; // option A is updated
			document.querySelector('#b').innerHTML += questionObj[inputs[1].name]; // option B is updated
			document.querySelector('#c').innerHTML += questionObj[inputs[2].name]; // option C is updated
			document.querySelector('#d').innerHTML += questionObj[inputs[3].name]; // option D is updated
			

		      	document.querySelector('#submitBtn').onclick = dbImport; // when the submit button is pressed, the dbImport function is executed		
		}else{console.log('unknown server status...')}
	}
}

/*
 The following function, collects the information that has been passed on the form and at a first stage,
it checks if the data is valid. If the data passes the check control, the information is stored in the database 
*/
function dbImport()
{	
	var checkboxes = document.querySelectorAll('input.checkmark'); // get all the checkboxes elements
	var tickCount = 0,evaluation=false,isMobDevice = false,  // define all the variable that are going to be used
		content,userAgent,postString;

	for(var i=0; i < checkboxes.length; i++) // iterate over the checkboxes
	{
		var item = checkboxes[i]; // define each checkbox i
		if(item.checked) // if the checkbox is checked
		{
			tickCount++; // a variable that counts the number of boxes that have been selected
			console.log(1);
			var userInput = document.querySelector('#' + item.name).innerText.split(':')[1].trim(); // the user option is extracted
			// if the user option is equal with respect the correct answer, then is evaluated a true 
			evaluation = (userInput == questionObj.correct ? true : false);
		}
	}
	try{
		// if the user has chosen only ONE answer
		if( tickCount  == 1)
		{			
			content = (evaluation ? 'Well done Correct Answer!' : 'Wrong Answer! Try Again'); // variable that contains the result
			console.log('Evaluation : ' + evaluation);
			console.log('Content : '  + content);
			// a pop up is created, which will is filled with the content vriable
			var popup = L.popup({offset : L.point(-47.5,0)}).setContent('<h><b><em>' + content + '</em></b></h5>');
			if(!popup.isPopupOpen(geolocationGroup.getLayers()[1].getLatLng())){
				geolocationGroup.getLayers()[1].bindPopup(popup).openPopup(); // the pop up is passed on the user current position
				map.fitBounds(geolocationGroup.getBounds()); // the display is fitted
			}
			// a variable that defines the type of device that the user employs 
			// true = mobile device
			// false = other device
			isMobDevice = (/Mobi/.test(navigator.userAgent) ? true : false)
			
			// a variable that defines the user's mobile device info/id
			userAgent = navigator.userAgent;
			
			// refresh the display	
			mapObj.classList.toggle('displayNone'); // the map is shown again 
			menuBars.classList.toggle('displayNone'); // the menu bar is shown again
			mySidenav.classList.toggle('displayNone'); // the mySidenav is show again


			// a string is created and passed on the server
			postString = 'userid=' + userAgent + '&isMobile=' + isMobDevice + '&question='  + questionObj.question + '&userAns=' + userInput + '&correct=' + questionObj.correct + '&lat=' + userPos.lat + '&lng=' + userPos.lng;
			// message
			console.log('Constructed Poststring:' + postString);
			// the postring is sent on the server
			postInfo(postString);
		}else
		{
			// if the user hasn't picked any answer or  he/she has chosenn more than one answer, an error is thrown and a message is shown
			document.querySelector('#response').innerHTML = '<p style=\'color: red; font-weight: bold\'>You need to pick one answer</p>'; // 
			throw 'more than one checked buttons!'; 
			// message	
		}
		}catch(err){
			console.log(err);
	}
}
/*
	This function perform an XMLhttp requesst on the developer.cege.ucl.ac.uk server
*/
function postInfo(postString)
{
	dbPost = new XMLHttpRequest(); // create an xmlhttp object
	dbPost.open('POST', 'http://developer.cege.ucl.ac.uk:30277/insertDb',true); // the method and the server directory is set
	dbPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // set the value of an http request
	dbPost.onreadystatechange = dataSubmit;  // whenever the state of the server changes, the dataSubmit function is executed
	
	dbPost.send(postString); // the request is send on the server
}

function dataSubmit(){
	if(dbPost.readyState == 4){
		console.log('succesfull post..');
	} 
}


// FUNCTIONS
/*
This function converts the decimal degrees of geographical coordinates in radians
Inputs:
pointDeg: the input geographical coordinates

Outpu: 
radDeg: the value of geographical coordiantes in radians
*/
deg2rad = function(pointDeg){
	return (pointDeg*Math.PI)/180;
}
/*
This function finds the eccentricity of an ellipsoid surface based on a given a semi-major (a) and 
semi-minor axis (b) of a surface
Inputs:
a: semi-major axis of a specified ellipsoid surface
b: semi-manir axis of a specified ellipsoid surface

Output:
e: eccentricity of an ellipsoid surface
*/
getEccentricity = function(a,b){
// caclulates datum eccentricity
	var e = Math.sqrt((Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2));
	return e;
}
/*
This function finds the radius of an ellipsoid main vertical section
a: semi-major axis of the specified ellipsoid surface
phi: latitude of the vertical section that is calculated
e: eccentricity of the ellipsoid surface

Output:
N: radius of main vertical section
*/
getRadiusOfMainVerticalSection = function(a,phi,e){
	var N = a / Math.sqrt(1 - Math.pow(e,2)*Math.pow(Math.sin(phi),2))
	return N;
}
/*
This function finds the radius of of curvature of the meridian of a specified ellipsoid surface
Inputs:
a: semi-major axis of the specified ellipsoid surface
phi: latitude of meridian's curvature that is calculated
e: eccentricity of the ellipsoid surface

Outputs:
r: radius of meridian's curvature
*/
getRardiusOfCurvatureOfTheMeridian = function(a,phi,e){
	var r = (a*(1-Math.pow(e,2)))/Math.sqrt(Math.pow(1-(Math.pow(e,2)*Math.pow(Math.sin(phi),2)),3));
	return r;
} 

/*
This function finds the ellipsoid distance between two specified points on an ellipsoid
surface.
Input:
phi1: latitude of point1
lam1: longitude of point1
phi2: latitude of point2
lam2: longtude of point 2

Output:
dist: returns the ellipsoid distance between the specified points
*/
getEllipsoidDistance = function(phi1,lam1,phi2,lam2){
	// conversion to radians
	phi1 = deg2rad(phi1);
	lam1 = deg2rad(lam1);
	phi2 = deg2rad(phi2);
	lam2 = deg2rad(lam2);

	// Define WGS84 parameters
	a =6378137.0; // major-axis
	b =6356752.314;  // minor-axis
	e = getEccentricity(a,b); // eccentricity
	// delta phi (latitude)
	mphi = (phi1 + phi2)/2.0;
	r = getRardiusOfCurvatureOfTheMeridian(a,mphi,e);
	N = getRadiusOfMainVerticalSection(a,mphi,e);

	// distance along latitude
	dphi = Math.pow(phi2-phi1,2)*Math.pow(r,2)
	// distance along longitude
	dlam = Math.pow(lam2-lam1,2) * Math.pow(N,2) * Math.pow(Math.cos(mphi),2)

	// returns tha ellipsoidal distance
	return Math.sqrt(dphi + dlam);
}

/*
This function compares the user's location with all the UCL POI locations, finds the nearest one
and make a question to the user with respect to the nearest poi.

Inputs:
userPos: the user's position, which must be given in geographical coordinates
n: the number of UCL poi
threshold: a threshold value that determines if the quiz will be started or not

*/
var questionObj; // defines a question object, which will be used to check the user's response 
makeQuestion = function(userPos, n, threshold) 
{	
	console.log('A question is triggered...');
	// if the geolocation service is enabled, then quiz it starts
	if(geolocationCondition)
	{
		// empty array that will contain the distances of UCL poi's with respect to the user's position 
		var arr = new Array();
		for (var i = 0; i < n; i++)
		{	
			// find the geographical coordinates of POI i
			var poiPos = json.features[i].geometry.coordinates;
			// calculates the ellipsoid distance between the user's location and each UCL department poi
			arr[i] = getEllipsoidDistance(parseFloat(userPos.lat),parseFloat(userPos.lng),parseFloat(poiPos[1]),parseFloat(poiPos[0]));
		}
		// find the minimum distance of the calculated distances
		var min = Math.min.apply(null,arr);   // get the minimum value of arr matrix
		var minIndex = arr.indexOf(min); // find the the index of the minimum value

		// if the minimum distance is less than a specified threshold, then the quiz starts
		if ((min < threshold) | (activeOption == 0))
		{
			var f = json.features[minIndex].properties; //  take info of the nearest POI
			questionObj = 
			{
				'depnam' : f.depname,
				'question' : f.question,
				'a' : f.answera,
				'b' : f.answerb,
				'c' : f.answerc,
				'd' : f.answerd,
				'correct' : f.correct
			};
			// make the question to the user
			getForm(questionObj);
		}
	}
}


// EVENTS
// whenever the menuBar is clicked, a navbar is opened
menuBars.onclick = function()
{
	// a css class which shows that the navbar is opened is used
	mySidenav.classList.toggle('active');
	// initial operations that the app needs to do when it is opened for a first time 
	if(counter == 1)
	{	
		// the activeLabel class is assigned to the EsriWorldStreetMap layer
		basemapLists[0].classList.add('activeLabel');
		// if the geolocation is accepted by the user, then the following operations are executed
		if (geolocationCondition)
		{
			 // the activeLabel class is assigned to the geolocation label of the menu bar, and the content
			 // is set to Stop Geolocation
			quizOption[activeOption].innerText = 'Stop ' +quizOptionContent[activeOption];
			// activate the label of geolocation option
			quizOption[activeOption].classList.add('activeLabel');
			// activate the label of medium difficulty for the quiz
			quizLevelOption[indexDiff].classList.add('activeLabel');
		}else
		{	
			// the content of the geolocation label of the menu bar is set to Start Geolocation
			quizOption[activeOption].innerText = 'Start ' + quizOptionContent[activeOption];
		}
		counter++;	// counter increament	
	}
};

// whenever the map is clicked, the menu bar closes automatically
map.on('click', function (){mySidenav.classList.remove('active')});

// the menu bar is constantly checked and resized to fit in the whole screen
// this operation is done to permit the map element and the menu bar to be fully contained in the whole screen
setInterval(function(){(mySidenav.classList.contains('active') ? mapObject.style.width = '70%' : mapObject.style.width = '100%')},300);


// BASEMAP BUTTON

// create a basemap object and for each basemap layer, the corresponding basemap label is added
basemapObj = 
{
	'WorldStreetMap' : {
		'element' : basemapLists[0], // DOM element that represents the EsriWoldStreetMap layer
		'basemap' : EsriWorldStreetMap // EsriWoldStreetMap layer
	},
	'WorldTopoMap' : {
		'element' : basemapLists[1], // DOM element that represents the EsriWoldStreetMap layer
		'basemap' : EsriWorldTopoMap // EsriWorldTopoMap
	},
	'WorldImagery' : {
		'element' : basemapLists[2], // DOM element that represents the EsriWoldStreetMap layer
		'basemap' : EsriWorldImagery // EsriWorldImagery
	}
};

// loop over the basemapObj keys
Object.keys(basemapObj).forEach(function(key)
{
	// add an onclick event to each DOM element 
	basemapObj[key].element.onclick = function()
	{
		// checks if the basemapsGroup has the displayed basemap layer
		if (!basemapsGroup.hasLayer(basemapObj[key].basemap))
		{
			// remove the activeLabel clas from the displayed layer
			Object.keys(basemapObj).forEach(function(subkey)
			{
				basemapObj[subkey].element.classList.remove('activeLabel');
			});
			// clear the basemapsGroup
			basemapsGroup.clearLayers();
			// add the clicked layer to the basemapsGroup
			basemapsGroup.addLayer(basemapObj[key].basemap);
			// add the activeLabel class to the clicked DOM element
			this.classList.toggle('activeLabel');
		}
	}
});

// the same functionality is applied for each layer
layerLists[0].onclick = function()
{
	(layerGroup.hasLayer(clusters) ? layerGroup.clearLayers() : layerGroup.addLayer(clusters));
}

// Functions
/*
This function is called when the user's location is succesfully identified.
Inputs:
position: a position object that contains all the geolocation info
Output:
none
*/
locationSuccess = function(position)
{	
	// find the user's position and assign it to userPos variable
	userPos = position.latlng;
	// clear the geolocationGroup - global variable
	geolocationGroup.clearLayers();
	// boolean operator that shows if a user accepted the geolocation service - global variable
	geolocationCondition = true;

	// finds the accuracy of the geolocation
	var radius = position.accuracy/2;
	// create a bufferPos variable, which represents an L.circle object that defines the accuracy of the positioning
	var bufferPos = L.circle(userPos, radius, {color: '#E21616', dashArray: '3',fillColor: '#D03E3E'});
	// create a markerPos variable, which represents an L.marker object that defines the users' position   
	var markerPos = L.marker(userPos, {icon : userLocationIcon});
	// add the variables in the geolocation group
	geolocationGroup.addLayer(bufferPos);
	geolocationGroup.addLayer(markerPos);
	// add the geolocation group in the map
	map.addLayer(geolocationGroup);
	map.fitBounds(geolocationGroup.getBounds());
	console.log('Time : '  + t);	
	if(activeOption == 0) // if the active option is time quiz
	{
		if(t >=  time[indexDiff] ) // and if the timer is higher than the user's selected option
		{
			t = 0; // re-initialise the timer
			makeQuestion(userPos,n,Infinity); // perform a question based on the user location with an ifinity threshold
		}
	}else if ((activeOption == 1) && (t >= 15)) // if the active option is proximity quiz and the timer is higer than 30 seconds
	{
		t = 0; // re-initialise the timer
		makeQuestion(userPos,n,distance[indexDiff]); // make a question based on the user location and the selected user distance option
	}

}
/* Initialise a timer that counts the seconds*/
var t = 0 ; // timer global variable
initTimer = function()
{
   setInterval(function(){t++}, second); // increase the t variable very second
}


/*
This function is called when the user's location cannot be calculated or the user does not give
any privilages to show his/her location
Inputs:
error: an error object that contains the geolocation error message

Output:
none
*/
locationFailure = function(error)
{
	alert(error.message + ' If the geolocation is not used, the quiz App cannot operate normally.')
	window.close();
}

// GEOLOCATION MENU BUTTON
// whenever the geolocation label is clicked, the geolocation service is enabled and vice versa
for(var i=0; i < quizOption.length; i++)
{
	// assign an id to each element
	quizOption[i].setAttribute('id', 'id_'+ i);
	quizOption[i].onclick = function()
	{
		var previousActiveOption = activeOption; // record the previous selected label
		// identifies the currently selected label
		activeOption = parseInt(this.getAttribute('id').split('_')[1]);
		
		if((activeOption == previousActiveOption) || (activeOption != previousActiveOption && !geolocationCondition ))
		{
			// the geolocationCondition indicates if the user uses the geolocation service
			if(geolocationCondition)
			{
				// alter the geolocation
				geolocationCondition = !geolocationCondition; // alter the condition to false
				// alter the geolocation label content
				this.innerText =  'Start ' + quizOptionContent[activeOption]; // alter the content to Start Geolocation
				// alter the difficulty level of the label
				quizLevelOption[indexDiff].classList.remove('activeLabel');
				// stop the geolocation process
				map.stopLocate();	// stop geolocation service
			}else
			{
				// alter the geolocation label content
				this.innerText = 'Stop ' + quizOptionContent[activeOption]; 
				// alter the difficulty level label
				quizLevelOption[indexDiff].classList.add('activeLabel');
				// enable the geolocation servicei
				
				map.locate(locationOptions);
			}		
			// toggle the activeLabel on the geolocation label
			this.classList.toggle('activeLabel');
	
		}else
		{
			// if the current selected is not the same with the previous one and the geolocation is enabled:
			quizOption[previousActiveOption].classList.remove('activeLabel'); // remove any style that might the previous had
			quizOption[previousActiveOption].innerText = 'Start ' + quizOptionContent[previousActiveOption]; // update its content
			quizOption[activeOption].classList.add('activeLabel'); // set an active class on the selected label
			quizOption[activeOption].innerText = 'Stop ' + quizOptionContent[activeOption];	 // change the content of the selected label
		}
	}
}


// QUIZ LEVEL MENU BUTTON

// initial difficulty: MEDIUM

// add an  onclick event to each level of difficulty label
for(var i =0; i < quizLevelOption.length; i++)
{	
	// assign an id on each element
	quizLevelOption[i].setAttribute('id','id_'+i);

	quizLevelOption[i].onclick = function()
	{	
		// if the geolocation service is enabled	
		if(geolocationCondition)
		{	
			// remove the current label from being selected
			quizLevelOption[indexDiff].classList.remove('activeLabel');
			// update the index which indicates the label that is activated
			indexDiff = parseInt(this.getAttribute('id').split('_')[1]);
			// alter the label to active
			this.classList.add('activeLabel');
			// execute the quiz 
		}else
		{	// a message is shown is the geolocation action is disabled but the user attempts to choose a quiz's level
			alert('Activate the geolocation service first');
		}
	}
}
// geolocation events
map.on('locationfound', locationSuccess);
map.on('locationerror', locationFailure);

// start the geolocation
map.locate(locationOptions);
// start the timer
initTimer();
