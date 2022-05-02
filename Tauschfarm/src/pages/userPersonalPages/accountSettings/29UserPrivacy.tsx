import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonItem, IonLabel, IonButton } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { AllRoutesListed } from '../../../routes/AllRoutesListed';

class UserPrivacy extends Component {
	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.Privacy)} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<IonItem>
						<IonLabel class='ion-text-wrap'>
							{Translate(lsInj.transDict.TC)} <br />
							<IonButton fill='clear' routerLink={AllRoutesListed.otherRoutes.tc}>
								{Translate(lsInj.transDict.tc)}
							</IonButton>
						</IonLabel>

						{/* <IonCheckbox slot='start' onIonChange={(e) => this.acceptTC(e)} /> */}
					</IonItem>
					{/* <IonList>
						<IonItem>
							<IonLabel class='ion-text-wrap' position='floating'>Email</IonLabel>
							<IonInput />
						</IonItem>

						<IonItem lines='none'></IonItem>

						<IonTitle>Change password</IonTitle>

						<IonItem>
							<IonLabel class='ion-text-wrap' position='floating'>Old password</IonLabel>
							<IonInput />
						</IonItem>
						<IonItem>
							<IonLabel class='ion-text-wrap' position='floating'>New password</IonLabel>
							<IonInput />
						</IonItem>
						<IonItem>
							<IonLabel class='ion-text-wrap' position='floating'>Confirm new password</IonLabel>
							<IonInput />
						</IonItem>
					</IonList> */}
				</IonContent>
			</IonPage>
		);
	}
}

export default UserPrivacy;
