import axios from 'axios';
const APP_ID_HERE = '5RrixL9OWykQ6lw9ZYmCRUG2XZ1QvBWosA4pL2ilH08';

export const getReverseGeoCodeRegion = async function (latLongQuery: any) {
	// console.log('onQuery', latLongQuery);
	var obj = {
		address: {
			district: '',
			houseNumber: '',
			street: '',
			city: '',
			state: '',
			postalCode: '',
			country: '',
			county: '',
			label: ''
		},
		distance: 0,
		locationId: '',
		locationType: '',
		coords: {
			lat: '',
			long: ''
		}
	};

	return axios
		.get('https://revgeocode.search.hereapi.com/v1/revgeocode', {
			params: {
				languages: 'en-US',
				at: latLongQuery,
				apiKey: APP_ID_HERE,
				headers: {
					Authorization: `Bearer ${APP_ID_HERE}`
				}
			}
		})
		.then((response: any) => {
			// console.log('response from api', response.data.items[0]);
			var res = response.data.items[0];
			obj = {
				address: {
					district: res.address.district ? res.address.district : '',
					houseNumber: res.address.houseNumber ? res.address.houseNumber : '',
					street: res.address.street ? res.address.street : '',
					city: res.address.city ? res.address.city : '',
					state: res.address.state ? res.address.state : '',
					postalCode: res.address.postalCode ? res.address.postalCode : '',
					country: res.address.countryName ? res.address.countryName : '',
					county: res.address.county ? res.address.county : '',
					label: res.address.label ? res.address.label : ''
				},

				locationId: '',
				locationType: res.resultType,
				distance: res.distance,
				coords: {
					lat: res.position.lat,
					long: res.position.lng
				}
			};

			// console.log('obj', obj);
			return obj;
		})
		.catch((error) => {
			// console.log('error', error);
			// dispatch({
			// 	type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
			// 	payload: error,
			// });
		});
};

// address:{
// city: "Jeffreys Bay"
// countryCode: "ZAF"
// countryName: "South Africa"
// county: "Kouga"
// district: "Noorskloofpunt"
// houseNumber: "75"
// label: "75 Leadwood Rd, Jeffreys Bay, 6330, South Africa"
// postalCode: "6330"
// state: "Eastern Cape"
// street: "Leadwood Rd"
//}

// distance: 12
// houseNumberType: "PA"
// mapView:{
// east: 24.91858
// north: -34.03169
// south: -34.03393
// west: 24.9213
//}
// position:{
// lat: -34.03281
// lng: 24.91994
//}
// resultType: "houseNumber"
// title: "75 Leadwood Rd, Jeffreys Bay, 6330, South Africa"
