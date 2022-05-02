/** @format */

import React, { Component } from 'react';
import { IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import { pencil, ellipsisVertical, trashBin } from 'ionicons/icons';

class UserItemFabButton extends Component<any> {
	render() {
		// console.log(' UserItemFabButton props', this.props);
		const { catname, itemId, groupID, uOrG, userWhoAdded, currentUser } = this.props;

		const checkUnI = itemId !== undefined ? itemId : 'wwwwwhaaat';
		const checkUnii = userWhoAdded !== undefined ? userWhoAdded.id : 'Whhhhhhhhyyyyyy';

		const EditItem = `/dashboard/categories/selectedCategory/${catname}/selectedItem/${checkUnI}/editItem/${checkUnI}/${groupID}`;
		const DeleteItm = `/item/delete/${checkUnI}/${currentUser.id}/${checkUnii}/${uOrG}/${catname}/${groupID}`;

		return (
			<IonFab color='light' vertical='bottom' horizontal='end' slot='fixed'>
				<IonFabButton color='light'>
					<IonIcon icon={ellipsisVertical}></IonIcon>
				</IonFabButton>

				<IonFabList side='top'>
					<IonFabButton size='small' color='light' routerLink={EditItem}>
						<IonIcon icon={pencil} />
					</IonFabButton>

					<IonFabButton size='small' color='light' routerLink={DeleteItm}>
						<IonIcon icon={trashBin} />
					</IonFabButton>
				</IonFabList>
			</IonFab>
		);
	}
}

export default UserItemFabButton;

// catname: "Miscellaneous"
// itemId: "CKpwdCEHdkTylKof1EWUtM9KcE92-1589463847870"
// userWhoAdded: "CKpwdCEHdkTylKof1EWUtM9KcE92"
//div style={{ position: 'relative', overflow: 'visible' }} //outside fabbutton to make a bade show outside
