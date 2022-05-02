import React, { Component } from 'react';
import { IonCol, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/react';

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

export class CatagoryContentView extends Component<any> {
	renderView() {
		// console.log('CatagoryContentView props  ', this.props.content.sort(sortByTextDsc));
	}
	render() {
		console.log('CatagoryContentView props  ', this.props.content);
		this.props.order ? this.props.content.sort(sortByTextAsc) : this.props.content.sort(sortByTextDsc);
		return (
			<>
				{this.props.content.map((item: any, index: number) => {
					// console.log('item', item);
					if (item.name !== undefined) {
						const aRL = `${item.url}/${this.props.useLine ? this.props.useLine : item.useLine}/${item.userWhoAddedItem.id}`;

						return (
							<IonCol key={index}>
								<IonCard style={{ width: '145px', height: '305px' }} button={true} routerLink={aRL}>
									<img style={{ width: '100%', height: '150px' }} src={item.avatar} alt='broken'></img>
									{/* <IonCardHeader>{item.name}</IonCardHeader> */}

									<IonCardContent>
										<IonCardTitle style={{ fontSize: '1.1em' }}>{item?.name}</IonCardTitle>
										{this.props.lang === 'de' && (
											<IonCardSubtitle style={{ fontSize: '0.9em' }}>
												G: {item?.size.de} <br />
												F: {item?.color} <br />
												M: {item?.length} <br />
											</IonCardSubtitle>
										)}

										{this.props.lang === 'en' && (
											<IonCardSubtitle style={{ fontSize: '0.9em' }}>
												S: {item?.size.de} <br />
												C: {item?.color} <br />
												L: {item?.length} <br />
											</IonCardSubtitle>
										)}
									</IonCardContent>
								</IonCard>
							</IonCol>
						);
					} else {
						return <></>;
					}
				})}
			</>
		);
	}
}

export default CatagoryContentView;
