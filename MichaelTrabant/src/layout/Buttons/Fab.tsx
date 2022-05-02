/** @format */

import React, { Component } from 'react';
import { IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

interface iProps {
	userOrGroup: 'user' | 'group';
	idOfUserOrGroup: string;
	reqNum: any;
}

function renderUserOrGroup(
	userOrGroup: 'user' | 'group',
	id: string,
	reqNum: number
) {
	if (userOrGroup === 'user') {
		return (
			<IonFab color='primary' vertical='bottom' horizontal='end' slot='fixed'>
				<IonFabButton color='primary'>
					<IonIcon icon={addOutline}></IonIcon>
				</IonFabButton>

				<IonFabList side='start'></IonFabList>
			</IonFab>
		);
	} else {
		console.log('req', reqNum);
		return (
			<IonFab color='primary' vertical='bottom' horizontal='end' slot='fixed'>
				<IonFabButton color='primary'>
					<IonIcon icon={addOutline}></IonIcon>
				</IonFabButton>

				<IonFabList side='top'></IonFabList>
			</IonFab>
		);
	}
}

class FabButtonSelection extends Component<iProps> {
	render() {
		return (
			<>
				{renderUserOrGroup(
					this.props.userOrGroup,
					this.props.idOfUserOrGroup,
					this.props.reqNum
				)}
			</>
		);
	}
}

export default FabButtonSelection;
