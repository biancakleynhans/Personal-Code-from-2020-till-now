/** @format */

import React from 'react';
import { IonHeader, IonItem, IonLabel, IonMenu, IonMenuToggle, IonTitle, IonToolbar, IonList, IonSplitPane } from '@ionic/react';
import { appPagesAuthed, appPagesNotAuthed } from './AppPages';
import RoutesListComp, { getAuthed } from './Routes';
import { LablesList } from '../../components/titleLists/Titles';
import { IonReactRouter } from '@ionic/react-router';

class Menu extends React.Component {
	AuthedorNot(trigger: boolean) {
		// console.log('trigger',trigger)
		if (trigger) {
			return this.authedDisp();
		}
		return this.notAuthedDisp();
	}

	authedDisp() {
		var arr: any[] = [];
		appPagesAuthed.map((appPage: any, index: any) => {
			arr.push(
				<IonMenuToggle key={index} autoHide={false}>
					<IonItem routerLink={appPage.url} routerDirection='none'>
						{appPage.icon} {appPage.title}
					</IonItem>
				</IonMenuToggle>
			);
			return arr;
		});
		return arr;
	}

	notAuthedDisp() {
		var arr: any[] = [];
		appPagesNotAuthed.map((appPage: any, index: any) => {
			arr.push(
				<IonMenuToggle key={index} autoHide={false}>
					<IonItem routerLink={appPage.url} routerDirection='none'>
						<IonLabel>
							{appPage.icon} {appPage.title}
						</IonLabel>
					</IonItem>
				</IonMenuToggle>
			);
			return arr;
		});
		return arr;
	}

	render() {
		return (
			
			<IonReactRouter>
			<IonSplitPane contentId='main'>
				<IonMenu contentId='main' type='overlay'>
					<IonHeader>
						<IonToolbar>
							<IonTitle>{LablesList.Page_Header_Names.Menu.af}</IonTitle>
						</IonToolbar>
					</IonHeader>
					<IonList>{this.AuthedorNot(getAuthed())}</IonList>
				</IonMenu>
				<RoutesListComp />
			</IonSplitPane>
			</IonReactRouter>
		);
	}
}
// export default withRouter(Menu);

export default Menu;
