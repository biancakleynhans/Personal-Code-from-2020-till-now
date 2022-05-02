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
	IonCardHeader,
	IonCardContent,
	IonCardTitle,
	IonItem,
	IonIcon,
	IonLabel,
	IonAvatar,
	IonCardSubtitle
} from '@ionic/react';
import { timeOutline, calendar, map } from 'ionicons/icons';

export class HomeSkeletonScreen extends Component {
	render() {
		return (
			<>
				{/* Cats */}
				<IonGrid>
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
						<IonCol size='6'>
							<IonCard color='tertiary'>
								<IonSkeletonText animated style={{ width: '100%', height: '120px' }} />

								<IonCardHeader>
									<IonSkeletonText animated style={{ width: '100px' }} />
								</IonCardHeader>
							</IonCard>
						</IonCol>
						<IonCol size='6'>
							<IonCard color='tertiary'>
								<IonSkeletonText animated style={{ width: '100%', height: '120px' }} />

								<IonCardHeader>
									<IonSkeletonText animated style={{ width: '100px' }} />
								</IonCardHeader>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
				{/* Events */}
				<IonGrid>
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
						<IonCard color='tertiary'>
							<IonSkeletonText animated style={{ width: '100%', height: '90px' }} />

							<IonCardContent>
								<IonCardTitle color='light' style={{ textAlign: 'center' }}>
									<IonSkeletonText animated style={{ width: '60px' }} />
								</IonCardTitle>

								<IonGrid className='eventCard'>
									<IonRow>
										<IonCol size='4'>
											<IonItem color='tertiary'>
												<IonIcon color='light' icon={timeOutline}></IonIcon>
												<IonLabel class='ion-text-wrap' color='dark' style={{ fontSize: 'small' }}>
													<IonSkeletonText animated style={{ width: '100px' }} />
												</IonLabel>
											</IonItem>
										</IonCol>

										<IonCol size='4'>
											<IonItem color='tertiary'>
												<IonIcon color='light' icon={calendar}></IonIcon>
												<IonLabel class='ion-text-wrap' color='dark' style={{ fontSize: 'small' }}>
													<IonSkeletonText animated style={{ width: '100px' }} />
												</IonLabel>
											</IonItem>
										</IonCol>

										<IonCol size='4'>
											<IonItem color='tertiary'>
												<IonIcon color='light' icon={map}></IonIcon>
												<IonLabel class='ion-text-wrap' color='dark' style={{ fontSize: 'small' }}>
													<IonSkeletonText animated style={{ width: '100px' }} />
												</IonLabel>
											</IonItem>
										</IonCol>
									</IonRow>
								</IonGrid>
							</IonCardContent>
						</IonCard>
					</IonRow>
				</IonGrid>
				{/* Groups */}
				<IonGrid>
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
							<IonAvatar className='avatarSmall' style={{ width: '100px', height: '100px', marginTop: '10px' }}>
								<IonSkeletonText animated />
							</IonAvatar>
							<IonCardTitle>
								<IonSkeletonText animated style={{ width: '50px' }} />
							</IonCardTitle>
							<IonCardSubtitle>
								<IonSkeletonText animated style={{ width: '50px' }} />
							</IonCardSubtitle>
						</IonCol>
						<IonCol>
							<IonAvatar className='avatarSmall' style={{ width: '100px', height: '100px', marginTop: '10px' }}>
								<IonSkeletonText animated />
							</IonAvatar>
							<IonCardTitle>
								<IonSkeletonText animated style={{ width: '50px' }} />
							</IonCardTitle>
							<IonCardSubtitle>
								<IonSkeletonText animated style={{ width: '50px' }} />
							</IonCardSubtitle>
						</IonCol>
						<IonCol>
							<IonAvatar className='avatarSmall' style={{ width: '100px', height: '100px', marginTop: '10px' }}>
								<IonSkeletonText animated />
							</IonAvatar>
							<IonCardTitle>
								<IonSkeletonText animated style={{ width: '50px' }} />
							</IonCardTitle>
							<IonCardSubtitle>
								<IonSkeletonText animated style={{ width: '50px' }} />
							</IonCardSubtitle>
						</IonCol>
					</IonRow>
				</IonGrid>
				{/* Maps */}
				<IonGrid>
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
							<IonCard color='light' style={{ width: '80%', height: '200px', margin: 'auto' }}>
								<IonSkeletonText animated style={{ width: '100%', height: '100%' }} />
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</>
		);
	}
}

export default HomeSkeletonScreen;
