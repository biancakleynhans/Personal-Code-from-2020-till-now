import React from 'react';
import { IonCard, IonCardTitle, IonCol, IonCardSubtitle, IonCardContent } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';

//user profile
export function UserCategoryCard(Category: any, index: number, userId?: string) {
	// console.log('Category', Category);

	return (
		<IonCol key={index}>
			<IonCard style={{ width: '145px', height: '210px' }} button={true} routerLink={`/dashboard/categories/selectedCategory/${Category.checkMatch}/${userId}`}>
				<img style={{ width: '100%', height: '150px' }} src={Category.avatar} alt='broken'></img>

				<IonCardContent>
					<IonCardTitle style={{ fontSize: '1em' }}>{Category?.name}</IonCardTitle>
					<IonCardSubtitle style={{ fontSize: '0.9em' }}>
						{convertObjectToArray(Category.items).length} {Translate(lsInj.transDict.itemMultiple)}
					</IonCardSubtitle>
				</IonCardContent>
			</IonCard>
		</IonCol>
	);
}
