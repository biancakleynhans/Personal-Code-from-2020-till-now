import React, { Component } from 'react';
import { IonSkeletonText, IonCard, IonCardContent } from '@ionic/react';

export class HomeSkeletonScreen extends Component {
	render() {
		return (
			<IonCard color='medium'>
				<IonCardContent>
					<IonSkeletonText animated style={{ width: '300px', height: '80px' }} />

					<br />

					<IonSkeletonText animated style={{ width: '300px', height: '250px' }} />

					<br />

					<IonSkeletonText animated style={{ width: '300px', height: '80px' }} />
				</IonCardContent>
			</IonCard>
		);
	}
}

export default HomeSkeletonScreen;
