/** @format */

import React, { Component } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';
import { PhotoTaker } from '../../capAddOns/cameraAcess/TakePhoto';

export class ScalePhotos extends Component {
	render() {
		return (
			<IonPage>
				<IonContent>
					<PageHeader titleString={LablesList.Page_Header_Names.ScaleGalery.af} />
					<PhotoTaker />
				</IonContent>
			</IonPage>
		);
	}
}

export default ScalePhotos;
