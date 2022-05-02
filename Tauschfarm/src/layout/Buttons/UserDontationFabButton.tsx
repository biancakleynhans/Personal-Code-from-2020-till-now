import React, { Component } from 'react';
import { IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import { pencil, ellipsisVertical, trashBin } from 'ionicons/icons';

export class UserDontationFabButton extends Component<any> {
	render() {
		return (
			<IonFab color='primary' vertical='bottom' horizontal='end' slot='fixed'>
				<IonFabButton color='light'>
					<IonIcon icon={ellipsisVertical}></IonIcon>
				</IonFabButton>

				<IonFabList side='top'>
					<IonFabButton size='small' color='light' routerLink={`/userDonations/selectedItem/${this.props.itemId}/edit`}>
						<IonIcon icon={pencil} />
					</IonFabButton>

					<IonFabButton size='small' color='light' routerLink={`/userDonations/selectedItem/${this.props.itemId}/delete`}>
						<IonIcon icon={trashBin} />
					</IonFabButton>
				</IonFabList>
			</IonFab>
		);
	}
}

export default UserDontationFabButton;
