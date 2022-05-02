/** @format */

import React, { Component } from 'react';
import { IonPage, IonContent, IonCard, IonGrid, IonRow, IonCol, IonRouterLink } from '@ionic/react';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';
import { GetAllBooksFromServer } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';

export class MainContainerPage extends Component{
	constructor(props: any) {
		super(props);
		
	}

	
	render() {
		
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.Libary.container.af} />
				<IonContent>
					
				</IonContent>
			</IonPage>
		);
	}
}

export default MainContainerPage;
