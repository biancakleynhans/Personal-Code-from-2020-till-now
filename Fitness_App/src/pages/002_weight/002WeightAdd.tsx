/** @format */

import React from 'react';
import { IonContent, IonPage, IonCard } from '@ionic/react';
import { AddWeightMesureForm } from './001WeightMesureFormik';
import PageHeader from '../../components/layout/PageHeader';
import { AddWeightForm } from './001WeightFormik';
import { LablesList } from '../../components/titleLists/Titles';

export default class WeightPage extends React.Component {
	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.WeightAdd.af} />
				<IonContent>
					<IonCard>
						<AddWeightMesureForm />
					</IonCard>
					<IonCard>
						<AddWeightForm />
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}
