import React, { Component } from 'react';
import { IonFab, IonFabButton, IonIcon, IonFabList, IonBadge } from '@ionic/react';
import { addOutline, locationOutline, peopleOutline, pricetagOutline, settingsOutline, personAddOutline, trashBin } from 'ionicons/icons';
interface iProps {
	userOrGroup: 'user' | 'group';
	idOfUserOrGroup: string;
	reqNum: any;
}

function renderUserOrGroup(userOrGroup: 'user' | 'group', id: string, reqNum: number) {
	if (userOrGroup === 'user') {
		return (
			<IonFab color='primary' vertical='bottom' horizontal='end' slot='fixed'>
				<IonFabButton color='primary'>
					<IonIcon icon={addOutline}></IonIcon>
				</IonFabButton>

				<IonFabList side='start'>
					<IonFabButton color='primary' routerLink={`/dashboard/settings/:isFirst`}>
						<IonIcon icon={settingsOutline}></IonIcon>
					</IonFabButton>
					<IonFabButton color='primary' routerLink={`/createEvent/${id}/${userOrGroup}`}>
						<IonIcon icon={locationOutline}></IonIcon>
					</IonFabButton>
					<IonFabButton color='primary' routerLink={`/createGroup/${id}/${userOrGroup}`}>
						<IonIcon icon={peopleOutline}></IonIcon>
					</IonFabButton>
					<IonFabButton color='primary' routerLink={`/createItem/${id}/${userOrGroup}`}>
						<IonIcon icon={pricetagOutline}></IonIcon>
					</IonFabButton>
				</IonFabList>
			</IonFab>
		);
	} else {
		// console.log('req', reqNum);
		return (
			<IonFab color='primary' vertical='bottom' horizontal='end' slot='fixed'>
				<IonFabButton color='primary'>
					<IonIcon icon={addOutline}></IonIcon>
				</IonFabButton>

				<IonFabList side='top'>
					<div style={{ position: 'relative', overflow: 'visible' }}>
						<IonFabButton size='small' color='primary' routerLink={`/groups/selectedGroup/requests/${id}`}>
							<IonIcon icon={personAddOutline}></IonIcon>
						</IonFabButton>
						<IonBadge color='danger' style={{ position: 'absolute', top: 0, right: 0 }}>
							{reqNum ? reqNum : 0}
						</IonBadge>
					</div>

					<IonFabButton color='primary' routerLink={`/dashboard/groups/selectedGroup/${id}/:isfirst`}>
						<IonIcon icon={settingsOutline}></IonIcon>
					</IonFabButton>

					<IonFabButton color='primary' routerLink={`/dashboard/groups/delete/selectedGroup/${id}`}>
						<IonIcon icon={trashBin}></IonIcon>
					</IonFabButton>

					<IonFabButton color='primary' routerLink={`/createItem/${id}/${userOrGroup}`}>
						<IonIcon icon={pricetagOutline}></IonIcon>
					</IonFabButton>
				</IonFabList>
			</IonFab>
		);
	}
}

class FabButtonSelection extends Component<iProps> {
	render() {
		return <>{renderUserOrGroup(this.props.userOrGroup, this.props.idOfUserOrGroup, this.props.reqNum)}</>;
	}
}

export default FabButtonSelection;
