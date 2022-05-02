import React from 'react';
import { IonSlide, IonCard, IonCardTitle, IonButton } from '@ionic/react';
import stand from './002home.png';

import c1 from './003home.png';
import c2 from './004home.png';
import c3 from './005home.png';
import c4 from './006home.png';
import c5 from './007home.png';
import c6 from './008home.jpg';

import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

export const SlideInside1: React.FC = () => (
	<IonSlide>
		<IonCard style={{ width: '350px', height: '500px' }} color='medium'>
			<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.title1)}</IonCardTitle>
			<img src={stand} alt='vetnooi prent'></img>

			{/* <iframe
				width='300'
				height='250'
				src='https://www.youtube.com/embed/2x_CxZfNXIA'
				// frameborder='0'
				allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
				// allowfullscreen
			></iframe> */}
		</IonCard>
	</IonSlide>
);

export const SlideInside4: React.FC = () => (
	<IonSlide>
		<IonCard style={{ color: 'var(--ion-text-color)', height: window.innerWidth > 400 ? '500px' : 'unset' }} color='medium'>
			<img style={{ height: window.innerWidth > 400 ? '450px' : 'unset' }} src={c1} alt='vetnooi prent'></img> <br />
			<IonButton routerLink={`/story/marie`}>{Translate(lsInj.transDict.readMyStroy)}</IonButton>
		</IonCard>
	</IonSlide>
);

export const SlideInside5: React.FC = () => (
	<IonSlide>
		<IonCard style={{ color: 'var(--ion-text-color)', height: window.innerWidth > 400 ? '500px' : 'unset' }} color='medium'>
			<img style={{ height: window.innerWidth > 400 ? '450px' : 'unset' }} src={c2} alt='vetnooi prent'></img>
			<br />
			<IonButton routerLink={`/story/anita`}>{Translate(lsInj.transDict.readMyStroy)}</IonButton>
		</IonCard>
	</IonSlide>
);

export const SlideInside6: React.FC = () => (
	<IonSlide>
		<IonCard style={{ color: 'var(--ion-text-color)', height: window.innerWidth > 400 ? '500px' : 'unset' }} color='medium'>
			<img style={{ height: window.innerWidth > 400 ? '450px' : 'unset' }} src={c3} alt='vetnooi prent'></img>
			<br />
			<IonButton routerLink={`/story/daphne`}>{Translate(lsInj.transDict.readMyStroy)}</IonButton>
		</IonCard>
	</IonSlide>
);

export const SlideInside7: React.FC = () => (
	<IonSlide>
		<IonCard style={{ color: 'var(--ion-text-color)', height: window.innerWidth > 400 ? '500px' : 'unset' }} color='medium'>
			<img style={{ height: window.innerWidth > 400 ? '450px' : 'unset' }} src={c4} alt='vetnooi prent'></img>
			<br />
			<IonButton routerLink={`/story/marche`}>{Translate(lsInj.transDict.readMyStroy)}</IonButton>
		</IonCard>
	</IonSlide>
);

export const SlideInside8: React.FC = () => (
	<IonSlide>
		<IonCard style={{ color: 'var(--ion-text-color)', height: window.innerWidth > 400 ? '500px' : 'unset' }} color='medium'>
			<img style={{ height: window.innerWidth > 400 ? '450px' : 'unset' }} src={c5} alt='vetnooi prent'></img>
			<br />
			<IonButton routerLink={`/story/talita`}>{Translate(lsInj.transDict.readMyStroy)}</IonButton>
		</IonCard>
	</IonSlide>
);

export const SlideInside9: React.FC = () => (
	<IonSlide>
		<IonCard style={{ color: 'var(--ion-text-color)', height: window.innerWidth > 400 ? '500px' : 'unset' }} color='medium'>
			<img style={{ height: window.innerWidth > 400 ? '450px' : 'unset' }} src={c6} alt='vetnooi prent'></img>
			<br />
			<IonButton routerLink={`/story/thea`}>{Translate(lsInj.transDict.readMyStroy)}</IonButton>
		</IonCard>
	</IonSlide>
);
