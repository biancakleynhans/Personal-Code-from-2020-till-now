/** @format */

import React, { Component } from 'react';
import { IonContent, IonPage, IonSlides, IonCard } from '@ionic/react';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';
import { firebaseStorageBucket } from '../../services/firebase/firebase';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { i, iState, CreateSlides, slideOpts } from './Home';

export class ReseptePage extends Component<i, iState> {
	private _slidesRef = React.createRef<any>();

	constructor(props: any) {
		super(props);
		this.state = {
			imagesArray: []
		};
		var imageObj = { name: '', image: '' };
		var imageArray: any[] = [];

		firebaseStorageBucket
			.ref(TypesToServer.Cards.Recipes)
			.listAll()
			.then(result => {
				result.items.forEach(imageRef => {
					console.log('img ref', imageRef);
					imageRef
						.getDownloadURL()
						.then((url: any) => {
							// TODO: Display the image on the UI
							console.log('img name', imageRef.name);
							console.log('img url', url);
							imageObj = { name: imageRef.name, image: url };
							imageArray.push(imageObj);
							this.setState({ imagesArray: imageArray }, async () => {
								await this._slidesRef.current.update();
								console.log('IonSlides updated, but issue persists');
							});
						})
						.catch(() => {
							// Handle any errors
						});
				});
			});
	}

	render() {
		console.log('state', this.state);
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.Recipes.af} />

				<IonContent>
					{this.state.imagesArray.length > 0 && (
						<IonSlides ref={this._slidesRef} pager={true} options={slideOpts}>
							{CreateSlides(this.state.imagesArray)}
						</IonSlides>
					)}
					{this.state.imagesArray.length === 0 && <IonCard>No images</IonCard>}
				</IonContent>
			</IonPage>
		);
	}
}

export default ReseptePage;
