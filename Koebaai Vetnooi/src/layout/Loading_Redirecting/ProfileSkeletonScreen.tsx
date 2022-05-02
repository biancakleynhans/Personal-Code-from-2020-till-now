import React, { Component } from 'react';
import { IonToolbar, IonSkeletonText, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { ellipse } from 'ionicons/icons';

export class ProfileSkeletonScreen extends Component {
	render() {
		return (
			<>
				<IonSkeletonText animated style={{ width: '500px', height: '200px' }} />
				<IonToolbar color='primary' className='profileBar'>
					<IonTitle>
						<IonSkeletonText animated style={{ width: '250px' }} />
					</IonTitle>
				</IonToolbar>
				<br />
				<br />
				<IonCard style={{ color: 'var(--ion-text-color)' }}>
					<IonCardContent style={{ color: 'var(--ion-text-color)' }}>
						<IonSkeletonText animated style={{ width: '300px', height: '50px' }} />
					</IonCardContent>
				</IonCard>
				<br />
				<br />
				<IonCard style={{ color: 'var(--ion-text-color)' }}>
					<IonCardHeader style={{ color: 'var(--ion-text-color)' }}>
						<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>
							<IonSkeletonText animated style={{ width: '300px' }} />
						</IonCardTitle>
					</IonCardHeader>
					<IonCardContent style={{ color: 'var(--ion-text-color)' }}>
						<IonList lines='none'>
							<IonItem>
								<IonLabel>
									<IonSkeletonText animated style={{ width: '150px' }} />
								</IonLabel>
								<IonIcon slot='end' size='large' style={{ color: '#D3D3D3' }} icon={ellipse} />
							</IonItem>
							<IonItem>
								<IonLabel>
									<IonSkeletonText animated style={{ width: '150px' }} />
								</IonLabel>
								<IonIcon
									slot='end'
									size='large'
									style={{
										color: '#d3d3d3'
									}}
									icon={ellipse}
								/>
							</IonItem>
							<IonItem>
								<IonLabel>
									<IonSkeletonText animated style={{ width: '150px' }} />
								</IonLabel>
								<IonIcon
									slot='end'
									size='large'
									style={{
										color: '#d3d3d3'
									}}
									icon={ellipse}
								/>
							</IonItem>
							<IonItem>
								<IonLabel>
									<IonSkeletonText animated style={{ width: '150px' }} />
								</IonLabel>
								<IonIcon
									slot='end'
									size='large'
									style={{
										color: '#d3d3d3'
									}}
									icon={ellipse}
								/>
							</IonItem>
							<IonItem>
								<IonLabel>
									<IonSkeletonText animated style={{ width: '150px' }} />
								</IonLabel>
								<IonIcon slot='end' size='large' style={{ color: '#3d008078' }} icon={ellipse} />
							</IonItem>
							<IonItem>
								<IonLabel>
									<IonSkeletonText animated style={{ width: '150px' }} />
								</IonLabel>
								<IonIcon slot='end' size='large' style={{ color: '#3d008078' }} icon={ellipse} />
							</IonItem>
							<IonItem>
								<IonLabel>
									<IonSkeletonText animated style={{ width: '150px' }} />
								</IonLabel>
								<IonIcon slot='end' size='large' style={{ color: '#3d008078' }} icon={ellipse} />
							</IonItem>
							<IonItem>
								<IonLabel>
									<IonSkeletonText animated style={{ width: '150px' }} />
								</IonLabel>
								<IonIcon slot='end' size='large' style={{ color: '#3d008078' }} icon={ellipse} />
							</IonItem>
						</IonList>
					</IonCardContent>
				</IonCard>
			</>
		);
	}
}

export default ProfileSkeletonScreen;
