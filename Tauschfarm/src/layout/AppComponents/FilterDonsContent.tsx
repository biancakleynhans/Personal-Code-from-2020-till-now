import React, { Component } from 'react';
import { IonGrid, IonRow, IonPopover, IonList, IonButton, IonCol, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { i_BaseInterface_Item } from '../../models/006ItemModels';
import { renderBrandsSelection, renderColorSelection, renderSizeSelection, getResults, renderDistance } from './FilterCatContent';
import { i_BaseInterface_User } from '../../models/001UserModels';

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

interface iState {
	filterRes: boolean;
	results: any[];
	showRes: boolean;
	searchstringBrands: string[];
	searchstringColors: string[];
	searchstringSizes: string[];
	strictness: 'None' | 'Moderately' | 'Very';
	distance: { lower: number; upper: number };
}

interface iProps {
	sort: boolean;
	filter: boolean;
	orginalCatContent: any[];
	lang: 'en' | 'de';
	userOrGlobal: 'user' | 'global';
	currentUser: i_BaseInterface_User;
}

export class FilterDonsContent extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			filterRes: this.props.filter,
			results: [],
			showRes: false,
			searchstringBrands: [],
			searchstringColors: [],
			searchstringSizes: [],
			strictness: 'None',
			distance: { lower: 0, upper: 0 }
		};
		this.setBrands = this.setBrands.bind(this);
		this.setColor = this.setColor.bind(this);
		this.setSize = this.setSize.bind(this);
		// this.setStrict = this.setStrict.bind(this);
		this.setDistance = this.setDistance.bind(this);
	}

	componentDidUpdate(prevProps: iProps) {
		if (prevProps.filter !== this.props.filter) {
			this.setState({ filterRes: this.props.filter });
		}
	}

	setBrands(e: any) {
		// console.log('setBrands', e.detail.value);
		const res = e.detail.value;
		var searchstrings: string[] = [];

		res.map((r: any) => {
			searchstrings.push(r.en);
			return searchstrings;
		});
		this.setState({ searchstringBrands: searchstrings });
		this.getRes();
	}

	setColor(e: any) {
		// console.log('setBrands', e.detail.value);
		const res = e.detail.value;
		var searchstrings: string[] = [];

		res.map((r: any) => {
			searchstrings.push(r.en.toLowerCase());
			return searchstrings;
		});
		this.setState({ searchstringColors: searchstrings });
		this.getRes();
	}

	setSize(e: any) {
		// console.log('setBrands', e.detail.value);
		const res = e.detail.value;
		var searchstrings: string[] = [];

		res.map((r: any) => {
			searchstrings.push(r.en);
			return searchstrings;
		});
		this.setState({ searchstringSizes: searchstrings });
		this.getRes();
	}

	// setStrict(e: any) {
	// 	// console.log('setStrict', e.detail.value);
	// 	this.setState({ strictness: e.detail.value });
	// 	this.getRes();
	// }

	setDistance(e: any) {
		//.detail.value as any
		// console.log('distance ', e.detail.value);
		this.setState({ distance: e.detail.value });
		this.getRes();
	}

	getRes() {
		const { orginalCatContent } = this.props;
		var res: any[] = [];
		res = getResults(
			orginalCatContent,
			this.state.searchstringBrands,
			this.state.searchstringColors,
			this.state.searchstringSizes,
			this.state.strictness,
			this.state.distance,
			this.props.currentUser
		);
		this.setState({ results: res });
		// console.log('this.state', this.state);
	}

	render() {
		const { orginalCatContent, sort, lang } = this.props;
		return (
			<>
				<IonGrid>
					{!this.state.showRes && (
						<IonRow>
							{orginalCatContent.length > 0
								? orginalCatContent.sort(sort ? sortByTextAsc : sortByTextDsc).map((item: i_BaseInterface_Item, index: number) => {
										return (
											//for web change this to no size : IonCol size='6'
											<IonCol size='6' key={index}>
												<IonCard
													style={{ width: '145px', height: '300px' }}
													button
													routerLink={this.props.userOrGlobal === 'user' ? `userDonations/selectedItem/${item.id}` : `/donations/selectedItem/${item.id}`}>
													<img style={{ width: '100%', height: '150px' }} src={item.avatar} alt='broken' />
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
								  })
								: Translate(lsInj.transDict.noContent)}
						</IonRow>
					)}

					{this.state.showRes && (
						<IonRow>
							{this.state.results.length > 0
								? this.state.results.sort(sort ? sortByTextAsc : sortByTextDsc).map((item: i_BaseInterface_Item, index: number) => {
										return (
											//for web change this to no size : IonCol size='6'
											<IonCol size='6' key={index}>
												<IonCard
													style={{ width: '145px', height: '300px' }}
													button
													routerLink={this.props.userOrGlobal === 'user' ? `userDonations/selectedItem/${item.id}` : `/donations/selectedItem/${item.id}`}>
													<img style={{ width: '100%', height: '150px' }} src={item.avatar} alt='broken' />
													{/* <IonCardHeader>{item.name}</IonCardHeader> */}
													<IonCardContent>
														<IonCardTitle>{item?.name}</IonCardTitle>
														{this.props.lang === 'de' && (
															<IonCardSubtitle>
																G: {item?.size.de} <br />
																F: {item?.color} <br />
																M: {item?.length} <br />
															</IonCardSubtitle>
														)}

														{this.props.lang === 'en' && (
															<IonCardSubtitle>
																S: {item?.size.de} <br />
																C: {item?.color} <br />
																L: {item?.length} <br />
															</IonCardSubtitle>
														)}
													</IonCardContent>
												</IonCard>
											</IonCol>
										);
								  })
								: Translate(lsInj.transDict.noContent)}
						</IonRow>
					)}
				</IonGrid>

				{this.state.filterRes && (
					<IonPopover
						isOpen={this.state.filterRes}
						onDidDismiss={(e) => {
							this.setState({ filterRes: false });
						}}>
						<IonList>
							{/* items diffrent props */}
							{renderBrandsSelection(this.setBrands)}
							{renderColorSelection(this.setColor, lang)}
							{renderSizeSelection(this.setSize, lang)}
							{renderDistance(this.setDistance)}
						</IonList>

						{/* Done buttons  */}
						<IonButton
							onClick={() => {
								this.setState({ filterRes: false });
							}}>
							{Translate(lsInj.transDict.Cancel)}
						</IonButton>
						<IonButton
							onClick={() => {
								this.setState({ filterRes: false, showRes: true });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>
				)}
			</>
		);
	}
}

export default FilterDonsContent;
