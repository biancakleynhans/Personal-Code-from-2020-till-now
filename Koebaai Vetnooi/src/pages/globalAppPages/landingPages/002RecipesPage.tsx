import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonCard, IonCardHeader } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';

export class RecipesPage extends Component {
	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={'Koebaai Vetnoi resepte Boeke'} />
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

export default RecipesPage;
