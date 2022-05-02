import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonToolbar, IonAvatar, IonCardTitle, IonButton } from '@ionic/react';
import React from 'react';
import { MainMenuContent } from './MainMenuContent';
import { Translate } from '../services/translate/TranslateServices';
import { lsInj } from '../services/translate/LocalLangDict';

const MainMenu: React.FC = (props: any) => {
	// console.log('props', props);
	const reg = props.location !== undefined ? props.location : '';
	const reg2 = reg.address !== undefined ? reg.address : '';
	const reg3 = reg2.city !== undefined ? reg2.city : Translate(lsInj.transDict.Region);
	return (
		<IonMenu type='overlay' contentId='main'>
			<IonHeader>
				<IonToolbar>
					<IonAvatar className='avatarSmall' style={{ width: '100px', height: '100px', marginTop: '10px' }}>
						<img src={props.avatar} alt='img' />
					</IonAvatar>
					<IonCardTitle>{props.name ? props.name : Translate(lsInj.transDict.Username)}</IonCardTitle>
					<IonCardTitle>{reg3}</IonCardTitle>
					<IonButton fill='clear' color='primary' routerLink='/dashboard/acc'>
						{Translate(lsInj.transDict.changeLang)}
					</IonButton>
					<IonButton fill='clear' color='primary' routerLink='/changeLoc'>
						{Translate(lsInj.transDict.changeRegion)}
					</IonButton>
				</IonToolbar>
			</IonHeader>
			<IonContent class='outer-content'>
				<IonList>
					{MainMenuContent.appPagesLoggedIn
						.filter((route) => !!route.path)
						.map((p) => (
							<IonMenuToggle key={p.title} auto-hide='true'>
								<IonItem button routerLink={p.path} routerDirection='forward'>
									<IonLabel class='ion-text-wrap'>{p.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						))}
				</IonList>
			</IonContent>
		</IonMenu>
	);
};

export default MainMenu;
