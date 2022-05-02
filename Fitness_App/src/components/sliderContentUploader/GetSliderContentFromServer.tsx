/** @format */

import React, { Component } from 'react';
import { firebaseStorageBucket } from '../../services/firebase/firebase';
import { IonSlide, IonCard, IonImg } from '@ionic/react';

export function getSliderCards() {
	// Since you mentioned your images are in a folder,
	// we'll create a Reference to that folder:
	var storageRef = firebaseStorageBucket.ref('test');
	var imageObj = { name: '', image: '' };
	var imageArray: any[] = [];
	// Now we get the references of these images
	storageRef
		.listAll()
		.then(result => {
			result.items.forEach(imageRef => {
				// And finally display them
				// console.log('imgae ref', imageRef);
				imageRef
					.getDownloadURL()
					.then((url: any) => {
						// TODO: Display the image on the UI
						// console.log('img name', imageRef.name);
						// console.log('img url', url);
						imageObj = { name: imageRef.name, image: url };
						imageArray.push(imageObj);
						return imageArray;
					})
					.catch((error: any) => {
						// Handle any errors
					});
				// console.log('img arr', imageArray);
				return imageObj;
			});
		})
		.catch(error => {
			// Handle any errors
		});
	// console.log('Must return an array at this point ????', imageArray);
	return imageArray;
}

// function displayImage(imageRef: any) {
// 	var imageObj = { name: '', image: '' };
// 	var imageArray: any[] = [];

// 	imageRef
// 		.getDownloadURL()
// 		.then((url: any) => {
// 			// TODO: Display the image on the UI
// 			console.log('img name', imageRef.name);
// 			console.log('img url', url);
// 			imageObj = { name: imageRef.name, image: url };
// 			imageArray.push(imageObj);
// 			return imageArray;
// 		})
// 		.catch((error: any) => {
// 			// Handle any errors
// 		});
// 	console.log('img arr', imageArray);
// 	return imageArray;
// }





// export const ResepteSlideInside: React.FC = () => {
// 	return <>{CreateSlides()}</>;
// };

// export function GetSlider() {
	
// 	var returnArray: JSX.Element[] = [];
// 	console.log("imgArray_Recipes", getSliderCards())
	
// 	getSliderCards().map((entryObj, index) => {
		
// 		console.log('entryObj', entryObj);
		
// 		returnArray.push(
// 			<IonSlide key={index}>
// 				<IonCard color='medium'>
// 					<IonImg src={entryObj.image} alt={entryObj.name} style={{ width: '100%', height: '10%' }} />
// 				</IonCard>
// 			</IonSlide>
// 		);

// 		return returnArray;
// 	});
// 	return returnArray;
// }

// export class GetSliderContentFromServer extends Component {
// 	render() {
// 		return <div></div>;
// 	}
// }

// export default GetSliderContentFromServer;
