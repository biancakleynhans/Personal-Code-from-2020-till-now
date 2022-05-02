/** @format */

import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/react';

interface iProps {
	titleString: any;
}

class PageHeader extends React.Component<iProps> {
	render() {
		return (
			<IonHeader style={{ textAlign: 'center' }}>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{this.props.titleString}</IonTitle>
				</IonToolbar>
			</IonHeader>
		);
	}
}

export default PageHeader;
