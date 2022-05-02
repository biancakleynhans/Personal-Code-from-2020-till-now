/** @format */

import React from 'react';
import {
	IonCard,
	IonCol,
	IonRouterLink,
	IonImg,
	IonIcon,
	IonCardContent,
	IonFab,
	IonFabButton
} from '@ionic/react';
import { pencil } from 'ionicons/icons';

//user profile settings
export function ImageDisplay(url: string, redirectString: string) {
	return (
		<IonCol size='6' key={url}>
			<IonCard
				color='secondary'
				style={{
					width: '100px',
					height: '100px',
					margin: '0px',
					padding: '0px'
				}}>
				<IonCardContent style={{ margin: '0px', padding: '0px' }}>
					<IonFab
						style={{ top: '0', right: '0' }}
						vertical='top'
						horizontal='end'
						slot='fixed'>
						<IonRouterLink routerLink={redirectString}>
							<IonFabButton size='small'>
								<IonIcon color='dark' size='small' icon={pencil} />
							</IonFabButton>
						</IonRouterLink>
					</IonFab>
				</IonCardContent>
				<IonImg src={url} alt='broken' />
			</IonCard>
		</IonCol>
	);
}
