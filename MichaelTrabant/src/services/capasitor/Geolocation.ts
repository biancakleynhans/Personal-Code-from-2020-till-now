/** @format */

var Latitude: string = '';
var Longitude: string = '';

// Get geo coordinates
export function getMapLocation() {
	navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates
var onMapSuccess = function (position: any) {
	Latitude = position.coords.latitude;
	Longitude = position.coords.longitude;
};

// Get map by using coordinates

// function getMap(latitude: any, longitude: any) {
// 	console.log('latitude', latitude, 'longitude', longitude);

// 	// var mapOptions = {
// 	//     center: new google.maps.LatLng(0, 0),
// 	//     zoom: 1,
// 	//     mapTypeId: google.maps.MapTypeId.ROADMAP
// 	// };

// 	// map = new google.maps.Map
// 	// (document.getElementById("map"), mapOptions);

// 	// var latLong = new google.maps.LatLng(latitude, longitude);

// 	// var marker = new google.maps.Marker({
// 	//     position: latLong
// 	// });

// 	// marker.setMap(map);
// 	// map.setZoom(15);
// 	// map.setCenter(marker.getPosition());
// }

// Success callback for watching your changing position

// var onMapWatchSuccess = function (position: any) {
// 	var updatedLatitude = position.coords.latitude;
// 	var updatedLongitude = position.coords.longitude;

// 	if (updatedLatitude !== Latitude && updatedLongitude !== Longitude) {
// 		Latitude = updatedLatitude;
// 		Longitude = updatedLongitude;

// 		SaveLocLocal(updatedLatitude, updatedLongitude);
// 	}
// };

// Error callback

function onMapError(error: any) {
	// eslint-disable-next-line
	// console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

// Watch your changing position

// function watchMapPosition() {
// 	return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
// }
