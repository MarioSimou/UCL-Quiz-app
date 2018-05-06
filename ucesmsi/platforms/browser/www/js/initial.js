/*
	This function performs a GET request on the developer.cege.ucl.ac.uk server in order
	to retrieve the UCL poi locations. 
*/
// create the code to get the Earthquakes data using an XMLHttpRequest
function getData() 
{
	client = new XMLHttpRequest(); // initialise an xmlhttp object

	client.open('GET','http://developer.cege.ucl.ac.uk:30277/postgis'); // define a GET request method and define the server's http directory
	// the server's state is observer and each time the dataResponse function is executed
	client.onreadystatechange = dataResponse; 
	client.send();  
}

/*
	This function defines what it should be done when the server's state changes.
	When the server has a response, which is shown returning an integer value of 4, the repsonse (plain text)
	is assigned to a variable and used for the loaddata function
*/
	// create the code to wait for the response from the data server, and process the response once it is
function dataResponse() 
{
	 // this function listens out for the server to say that the data is ready - i.e. has state 4
	 if (client.readyState == 4) 
	 {
	 // once the data is ready, process the data
	 var data = client.responseText;
	 loaddata(data);
	 }
}
/*
	This function declares the initial process that should be done in order the map to be loaded
	correctly. The first step is to convert the response of the server, which is plain text in a
	JSON format
*/
function loaddata(data) 
{
	 // convert the text to JSON
	 json = JSON.parse(data);

	/*
	This function defines how GEOJSON points spawn leaflet layers
	Output:
	marker: returns how the geojson layer will be shown
	*/
	pointToLayerFun = function(geoJsonLayer,latlng)
	{
			// returns a marker that has the specified icon that was created above
			return L.marker(latlng, {icon : departmentIcon});
	}
	/*
	Based on a user mouse movements (mouse over), this function update the information that is shown in the 
	bottom left corner of the up
	Inputs:
	e: the mouse event

	Output:
	none
	*/
	showInfo = function(e)
	{
		var layer  = e.target;
		infoDepartments.update(layer.feature.properties, layer);
	}
	/*
	Based on a user mouse movements (mouse out), this function update the informationrmation that is shown in the 
	bottom left corner of the up
	Inputs:
	e: the mouse event

	Output:
	none
	*/
	removeInfo = function(e)
	{
		infoDepartments.update();
	}
	/*
	A function that will be called once for each created Feature, after it has been created and styled
	Input:
	feature: by default is loaded in leaflet
	layer: by default is loaded in leaflet

	Output:
	none
	*/
	onEachFeatureFun = function(feature,layer)
	{
			// bind pop up on the ucl poi
			var coords = layer.getLatLng();
			layer.bindPopup('<h4 style= "border-bottom: solid 1px black" >Information</h4><i><b>Name:</b> </i>' + feature.properties.depname + '<br><b>Question: </b>' + feature.properties.question + '<br><b>Answer: </b>' + feature.properties.correct + '<br><b>Latitude: </b>' + coords.lat.toFixed(4) + '&#176'+ '<br><b>Longitude: </b>' + coords.lng.toFixed(4)+ '&#176');
			layer.on(
			{	
				// events
				mouseover : showInfo,
				mouseout : removeInfo
			});
	}

	//geojsonArray = json.features;
	n = json.features.length; // number of observation
	// initialise a geojson layer and define some basic operations that should be done
	geojsonLayer = L.geoJson(json ,
		{
			pointToLayer : pointToLayerFun,
			onEachFeature : onEachFeatureFun
		});

	// create a layerGroup that will contain all the layers
	layerGroup = L.featureGroup();
	// add the markers to the layerGroup
	layerGroup.addLayer(clusters.addLayer(geojsonLayer))

	// create a search control that permits on the users to search locations based on a given
	// attribute. IN this case, the POIs of UCL can be searched using the departments name
	controlSearch = new L.Control.Search(
	{
		layer: geojsonLayer, // the layer that is used to search a point
		propertyName: 'question', // the attribute that is used to search a point
		position: 'topleft', // the control's location
		marker: {								//custom L.Marker or false for hide
					icon: departmentIcon,		//custom L.Icon for maker location or false for hide
					animate: true,				//animate a circle over location found
					circle: {					//draw a circle in location found
						radius: 10,
						color: '#E21616', 
						dashArray: '3',
						fillColor: '#D03E3E'
					}
				}
	});
	// add the control on the map and removes the geojsonLayer, which is by default loaded
	map.addControl(controlSearch).removeLayer(geojsonLayer) 	

	 // change the map zoom so that all the data is show
	 map.addLayer(layerGroup);
	 map.fitBounds(layerGroup.getBounds()); // fit he display
	 //map.setMaxBounds(layerGroup.getBounds()); // restricts the map display on the layerGroup's extent

}

window.addEventListener('DOMContentLoaded', function() 
{
	console.log('get Data loading');
	getData();
}, false);

