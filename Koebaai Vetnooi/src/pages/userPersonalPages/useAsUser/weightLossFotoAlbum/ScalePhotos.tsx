import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { PhotoTaker } from '../../../../components/cameraAcess/TakePhoto';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';

export class ScalePhotos extends Component {
	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.ScaleGalery)} />
					</IonHeader>
					<br />
					<br />
					<br />
					<PhotoTaker />
				</IonContent>
			</IonPage>
		);
	}
}

export default ScalePhotos;
