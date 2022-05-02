import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonSlides, IonSlide, IonCard } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { EmoRehabImagesArray } from '../../../components/media/emosionalRehab/ExportEmosionalRehab';

const slideOpts = {
	initialSlide: 0,
	speed: 400,
	slidesPerView: window.innerWidth > 900 ? 4 : 1,
};
export class EmosionalRehabPage extends Component {
	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />

					<IonSlides pager={true} options={slideOpts}>
						{EmoRehabImagesArray.map((entry) => {
							return (
								<IonSlide key={entry}>
									<IonCard style={{ color: 'var(--ion-text-color)' }}>
										<img style={{ width: window.innerWidth > 400 ? '325px' : '100%', height: '50%' }} src={entry} alt='vetnooi prent' />
									</IonCard>
								</IonSlide>
							);
						})}
					</IonSlides>
				</IonContent>
			</IonPage>
		);
	}
}

export default EmosionalRehabPage;
