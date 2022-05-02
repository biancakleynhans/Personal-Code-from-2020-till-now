/** @format */

import React from 'react';
import { IonSlide, IonCard, IonCardContent, IonTitle, IonText, IonButton } from '@ionic/react';
import { BROWSER_handleOpen } from '../../../capAddOns/browser/useBrowser';
import { LablesList } from '../../../components/titleLists/Titles';

import stand from './002home.png';
import strectch from './000home.png';
import dance from './001home.png';

export const SlideInside1: React.FC = () => (
	<IonSlide>
		<IonCard color='medium'>
			<IonTitle>{LablesList.HomeSlider.title1.af}</IonTitle>
			<IonCardContent>
				<img style={{ width: '100%', height: '50%' }} src={stand} alt='vetnooi prent'></img>
				<IonButton expand='full' shape='round' size='large' onClick={() => BROWSER_handleOpen('https://www.facebook.com/groups/koebaaivetnoitalita/')}>
					{LablesList.HomeSlider.button.af}
				</IonButton>
			</IonCardContent>
		</IonCard>
	</IonSlide>
);

export const SlideInside2: React.FC = () => (
	<IonSlide>
		<IonCard color='medium'>
			<IonTitle>{LablesList.HomeSlider.title2.af}</IonTitle>
			<IonCardContent>
				<IonText></IonText>
				<img style={{ width: '100%', height: '50%' }} src={strectch} alt='vetnooi prent'></img>
			</IonCardContent>
		</IonCard>
	</IonSlide>
);

export const SlideInside3: React.FC = () => (
	<IonSlide>
		<IonCard color='medium'>
			<IonTitle>{LablesList.HomeSlider.title3.af}</IonTitle>
			<IonCardContent>
				<IonText></IonText>
				<img style={{ width: '100%', height: '50%' }} src={dance} alt='vetnooi prent'></img>
			</IonCardContent>
		</IonCard>
	</IonSlide>
);
