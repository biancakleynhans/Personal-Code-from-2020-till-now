import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonCard, IonCardHeader } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';

export class ClassroomLandingPage extends Component {
	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.classroomLanding)} />
					</IonHeader>
					<br />
					<br />
					<br />

					<IonCard>
						<IonCardHeader style={{ color: 'var(--ion-text-color)' }}>Groot dinge aan die kom hou dop....</IonCardHeader>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

export default ClassroomLandingPage;
