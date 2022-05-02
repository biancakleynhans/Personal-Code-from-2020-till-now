import React, { Component } from 'react';
import { i_BaseInterface_Category } from '../../models/002CatagoryModels';
import { IonCol, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

function sortByTextAsc(a: any, b: any) {
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * diff;
	} else return 1;
}

function sortByTextDsc(a: any, b: any) {
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * -diff;
	} else return 1;
}

class CatagoryView extends Component<any> {
	render() {
		// console.log('CatagoryView props', this.props);
		// console.log('split', this.props.redirectLink.split('/'));
		const isGroup = this.props.redirectLink.split('/')[1] === 'groups' ? true : false;
		this.props.order ? this.props.cats.sort(sortByTextAsc) : this.props.cats.sort(sortByTextDsc);
		return (
			<>
				{this.props.cats.map((Category: i_BaseInterface_Category, index: number) => {
					const rl = isGroup ? `${this.props.redirectLink}/${Category.checkMatch}` : `${this.props.redirectLink}/${Category.checkMatch}/${this.props.userId}`;

					return (
						<React.Fragment key={index}>
							{Category.checkMatch !== 'Uncategorized' && (
								<IonCol key={index}>
									<IonCard style={{ width: '145px', height: '210px' }} button={true} routerLink={rl}>
										<img style={{ width: '100%', height: '150px' }} src={Category.avatar} alt='broken' />

										<IonCardContent>
											<IonCardTitle style={{ fontSize: '1em' }}>{Category.name}</IonCardTitle>
											<IonCardSubtitle style={{ fontSize: '0.9em' }}>
												{convertObjectToArray(Category.items).length} {Translate(lsInj.transDict.itemMultiple)}
											</IonCardSubtitle>
										</IonCardContent>
									</IonCard>
								</IonCol>
							)}
						</React.Fragment>
					);
				})}
			</>
		);
	}
}

export default CatagoryView;
