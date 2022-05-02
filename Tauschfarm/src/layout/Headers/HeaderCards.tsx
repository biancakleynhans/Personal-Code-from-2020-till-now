import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

export function HeaderCard(titleString: string, url: string, showBtn: boolean) {
	return (
		<IonHeader>
			<IonToolbar>
				{showBtn && (
					<IonButtons slot='end'>
						<IonButton fill='clear' color='secondary' routerLink={url}>
							{Translate(lsInj.transDict.SeeAll)}
						</IonButton>
					</IonButtons>
				)}
				<IonTitle style={{ textAlign: 'left' }}>{titleString}</IonTitle>
			</IonToolbar>
		</IonHeader>
	);
}
