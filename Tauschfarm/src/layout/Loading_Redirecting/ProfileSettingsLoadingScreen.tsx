import React, { Component } from 'react';
import {
	IonList,
	IonItem,
	IonSkeletonText,
	IonListHeader,
	IonLabel,
	IonButton,
	IonGrid,
	IonRow,
	IonTitle,
	IonIcon
} from '@ionic/react';
import { trashBin, pencil } from 'ionicons/icons';

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

					<IonListHeader>
						<IonLabel class='ion-text-wrap'>
							<IonSkeletonText animated style={{ width: '250px' }} />
						</IonLabel>
						<IonButton
							style={{ marginRight: '15px' }}
							size='small'
							fill='solid'
							routerLink='/dashboard/settings/imgBio'>
							<IonSkeletonText animated style={{ width: '250px' }} />
						</IonButton>
					</IonListHeader>

					<IonItem lines='none'>
						<IonGrid>
							<IonRow>
								<IonSkeletonText animated style={{ width: '250px' }} />
							</IonRow>
						</IonGrid>
					</IonItem>

					<br />
					<br />
					<IonTitle>
						<IonSkeletonText animated style={{ width: '250px' }} />
					</IonTitle>
					<br />
					<br />
					{/* Use predefined List of cats  */}

					<IonItem lines='none' style={{ width: '100%' }}>
						<IonLabel class='ion-text-wrap'>
							<IonSkeletonText animated style={{ width: '250px' }} />
						</IonLabel>
						<IonSkeletonText animated style={{ width: '250px' }} />
					</IonItem>
				</IonList>
				<IonItem key={1}>
					<IonLabel class='ion-text-wrap'>
						<IonSkeletonText animated style={{ width: '250px' }} />
					</IonLabel>

					<IonLabel class='ion-text-wrap'>
						<IonSkeletonText animated style={{ width: '250px' }} />
					</IonLabel>

					<IonButton fill='clear'>
						<IonIcon color='secondary' slot='end' icon={trashBin} />
					</IonButton>
					<IonButton fill='clear'>
						<IonIcon color='secondary' slot='end' icon={pencil} />
					</IonButton>
				</IonItem>
				<IonItem key={2}>
					<IonLabel class='ion-text-wrap'>
						<IonSkeletonText animated style={{ width: '250px' }} />
					</IonLabel>

					<IonLabel class='ion-text-wrap'>
						<IonSkeletonText animated style={{ width: '250px' }} />
					</IonLabel>

					<IonButton fill='clear'>
						<IonIcon color='secondary' slot='end' icon={trashBin} />
					</IonButton>
					<IonButton fill='clear'>
						<IonIcon color='secondary' slot='end' icon={pencil} />
					</IonButton>
				</IonItem>
				<IonItem key={3}>
					<IonLabel class='ion-text-wrap'>
						<IonSkeletonText animated style={{ width: '250px' }} />
					</IonLabel>

					<IonLabel class='ion-text-wrap'>
						<IonSkeletonText animated style={{ width: '250px' }} />
					</IonLabel>

					<IonButton fill='clear'>
						<IonIcon color='secondary' slot='end' icon={trashBin} />
					</IonButton>
					<IonButton fill='clear'>
						<IonIcon color='secondary' slot='end' icon={pencil} />
					</IonButton>
				</IonItem>
				<IonButton>
					<IonSkeletonText animated style={{ width: '250px' }} />
				</IonButton>
			</>
		);
	}
}

export default ProfileSettingsLoadingScreen;
