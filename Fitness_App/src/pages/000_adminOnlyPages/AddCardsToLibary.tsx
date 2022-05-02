/** @format */

import React, { Component } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';
import UploadSliderContentToServer from '../../components/sliderContentUploader/UploadSliderContentToServer ';

export class AddCardsToLibary extends Component {
	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.AddCards.af} />
				<IonContent>
					<UploadSliderContentToServer />
				</IonContent>
			</IonPage>
		);
	}
}

export default AddCardsToLibary;
