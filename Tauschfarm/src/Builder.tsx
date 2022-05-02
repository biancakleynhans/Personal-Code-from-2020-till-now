import { IonApp, IonContent, IonPage, IonText } from '@ionic/react';
import React, { Component } from 'react';
import { CatImages } from './components/catImages/CatImagesToUse';

export class Builder extends Component {
	render() {
		return (
			<IonApp>
				<IonPage>
					<IonContent color='secondary'>
						{/* <div
							style={{
								backgroundImage: `url(${CatImages.Main.internal})`,
								width: window.innerWidth < 400 ? 360 : 1200,
								height: window.innerHeight < 800 ? 640 : 1000,
								backgroundRepeat: 'no-repeat',
								backgroundAttachment: 'fixed',
								backgroundSize: 'fill',
							}}>
							<h1>This is red car</h1>
						</div> */}
						<img
							style={{ width: window.innerWidth < 400 ? window.innerWidth : 600, height: window.innerHeight < 800 ? window.innerHeight : 300, objectFit: 'fill' }}
							src={CatImages.Main.internal}
							alt='Main image'
						/>
						<br />
						<IonText color='light' style={{ zIndex: 100000, fontSize: 'xxx-large', fontWeight: 'bolder' }}>
							Etwas Erstaunliches kommt
						</IonText>
					</IonContent>
				</IonPage>
			</IonApp>
		);
	}
}

export default Builder;
