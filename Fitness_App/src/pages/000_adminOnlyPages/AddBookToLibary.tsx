/** @format */

import React, { Component } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { LablesList } from '../../components/titleLists/Titles';
import MamothDocReader from '../../components/documentUploader/MamothDocReader';
import PageHeader from '../../components/layout/PageHeader';

export class AddBookToLibary extends Component {
	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.AddBooks.af} />
				<IonContent>
					<MamothDocReader />
				</IonContent>
			</IonPage>
		);
	}
}

export default AddBookToLibary;
