/** @format */

import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import AddressForm from '../../../components/HERE maps/adressGetAndValidate/000AdressForm';

export class ChangeLocationOfUser extends Component {
	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>
					<br /> <br />
					<br />
					<AddressForm type={'userUpdate'} />
				</IonContent>
			</IonPage>
		);
	}
}

export default ChangeLocationOfUser;
