import React, { Component } from 'react';
import { IonList, IonItem, IonSkeletonText, IonButton, IonCard } from '@ionic/react';

export class ProfileSettingsLoadingScreen extends Component {
	render() {
		return (
			<>
				<IonList>
					<IonItem lines='none' className='eventInput'>
						<IonSkeletonText animated style={{ width: '250px' }} />
					</IonItem>

					<IonItem lines='none' className='eventInput'>
						<IonSkeletonText animated style={{ width: '250px' }} />
					</IonItem>
				</IonList>

				<IonCard style={{ color: 'var(--ion-text-color)', width: '150px', height: '150px', margin: 'auto' }}>
					<IonSkeletonText animated style={{ width: '100%', height: '100%' }} />
				</IonCard>
				<br />
				<br />

				<IonButton disabled>
					<IonSkeletonText animated style={{ width: '250px' }} />
				</IonButton>

				<br />
				<br />

				<IonButton disabled>
					<IonSkeletonText animated style={{ width: '50px' }} />
				</IonButton>
			</>
		);
	}
}

export default ProfileSettingsLoadingScreen;
