/** @format */

import React, { Component } from 'react';
import { IonContent, IonPage, IonSlides, IonImg, IonSlide, IonCard } from '@ionic/react';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';
import { SlideInside1, SlideInside2, SlideInside3} from './home/Content_Home_Slider';



const HomeSlider: React.FC = () => (
	<IonContent>
		<IonSlides pager={true} options={slideOpts}>
			<SlideInside1 />
			<SlideInside2 />
			<SlideInside3 />
		</IonSlides>
	</IonContent>
);



export interface i {}
export interface iState {
	imagesArray: any[];
}

export const slideOpts = {
	initialSlide: 0,
	speed: 400
};

export function CreateSlides(arr: any) {
	var returnArray: JSX.Element[] = [];
	arr.map((obj: any, index: any) => {
		returnArray.push(
			<IonSlide key={index}>
				<IonCard>
					<IonImg src={obj.image} alt='Broken ??' style={{ width: '100%', height: '10' }} />
				</IonCard>
			</IonSlide>
		);
		return returnArray;
	});
	return returnArray;
}

export class HomePage extends Component<i, iState> {
	
	render() {
		console.log('state', this.state);
		return (
			<IonPage style={{ textAlign: 'center' }}>
			<PageHeader titleString={LablesList.Page_Header_Names.Home.af} />
			<IonContent>
				<HomeSlider />
			</IonContent>
		</IonPage>
		);
	}
}

export default HomePage;

