import React, { Component } from 'react';
import {
	IonGrid,
	IonRow,
	IonCol,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonSkeletonText,
	IonTitle,
	IonCard,
	IonCardContent
} from '@ionic/react';

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
				<IonCard>
					<IonCardContent>
						<IonSkeletonText animated style={{ width: '100px' }} />
					</IonCardContent>
				</IonCard>
				<br />
				<br />
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonTitle>
								<IonSkeletonText animated style={{ width: '100px' }} />
							</IonTitle>
						</IonCol>
						<IonCol>
							<IonSkeletonText animated style={{ width: '100px' }} />
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol>
							<IonHeader translucent={true}>
								<IonToolbar>
									<IonButtons slot='end'>
										<IonButton fill='clear' color='secondary'>
											<IonSkeletonText animated style={{ width: '100px' }} />
										</IonButton>
									</IonButtons>
									<IonTitle>
										<IonSkeletonText animated style={{ width: '100px' }} />
									</IonTitle>
								</IonToolbar>
							</IonHeader>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonHeader translucent={true}>
								<IonToolbar>
									<IonButtons slot='end'>
										<IonButton fill='clear' color='secondary'>
											<IonSkeletonText animated style={{ width: '100px' }} />
										</IonButton>
									</IonButtons>
									<IonTitle>
										<IonSkeletonText animated style={{ width: '100px' }} />
									</IonTitle>
								</IonToolbar>
							</IonHeader>
						</IonCol>
					</IonRow>
				</IonGrid>
			</>
		);
	}
}

export default ProfileSkeletonScreen;
