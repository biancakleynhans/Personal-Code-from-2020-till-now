/** @format */

// src/DisplayMapClass.js
import * as React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

export class HERE_MAP_PLAIN extends React.Component {
	// componentDidMount() {
	// 	const H = window.H;
	// 	console.log('?????? H', H);
	// 	var platform = new H.service.Platform({
	// 		apikey: '5RrixL9OWykQ6lw9ZYmCRUG2XZ1QvBWosA4pL2ilH08',
	// 	});

	// 	// Obtain the default map types from the platform
	// 	var layer = platform.createDefaultLayers();
	// 	var container = document.getElementById('mapdiv');
	// 	// var tiles = platform.getMapTileService({ type: 'base' });

	// 	console.log('?????? layer', layer);
	// 	// Instantiate and display a map
	// 	var map = new H.Map(container, layer.vector.normal.map, {
	// 		center: { lat: 52.5, lng: 13.4 },
	// 		zoom: 10,
	// 	});

	// 	// layer = tiles.createTileLayer('maptile', 'normal.day', 256, 'png');
	// 	// map.setBaseLayer(layer);

	// 	// var events = new window.H.mapevents.MapEvents(map);
	// 	// // eslint-disable-next-line
	// 	// var behavior = new window.H.mapevents.Behavior(events);
	// 	// // eslint-disable-next-line
	// 	// var ui = new window.H.ui.UI.createDefault(map, layer);
	// }
	//return <div id='mapdiv' style={{ width: '100%', height: '300px' }}></div>;
	render() {
		const center = [22.355, 100.5];
		const zoom = 2;
		const HERE = `https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest
		/reduced.day/
		{z}/{x}/{y}/
		256/png8
		?apiKey=5RrixL9OWykQ6lw9ZYmCRUG2XZ1QvBWosA4pL2ilH08`;
		return (
			<Map
				ref={(r) => {
					if (r) {
						setTimeout(() => {
							// console.log('setting doner');
							this.doner = true;
							const map = r.leafletElement;
							map.invalidateSize();
						}, 10);
					}
				}}
				center={center}
				zoom={zoom}>
				<TileLayer url={HERE} attribution='&copy;HERE.com 2020' />
				{/* <Marker position={center} /> */}
			</Map>
		);
	}
}
