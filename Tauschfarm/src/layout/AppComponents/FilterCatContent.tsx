import React, { Component } from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonGrid, IonRow, IonPopover, IonList, IonButton, IonRange, IonIcon } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { BrandArray } from '../../services/translate/OptionsDict/BrandsToChoseFrom';
import { ColorArr } from '../../services/translate/OptionsDict/ColorArray';
import { SizesArray } from '../../services/translate/OptionsDict/SizesToChoseFrom';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import { i_BaseInterface_Item } from '../../models/006ItemModels';
import { NamedDict } from '../../services/helpers/Tools';
import CatagoryContentView from './CatagoryContentView';
import { getDistance, convertDistance } from 'geolib';
import { i_BaseInterface_User } from '../../models/001UserModels';
import { locationOutline } from 'ionicons/icons';

export function renderBrandsSelection(func: any) {
	return (
		<IonItem>
			<IonLabel>{Translate(lsInj.transDict.Brand)}</IonLabel>
			<IonSelect
				multiple
				onIonChange={(e) => {
					func(e);
				}}
				cancelText={Translate(lsInj.transDict.Cancel)}
				okText={Translate(lsInj.transDict.Done)}>
				{BrandArray.map((entry: any) => {
					return (
						<IonSelectOption key={entry.en} value={entry}>
							{entry.en}
						</IonSelectOption>
					);
				})}
			</IonSelect>
		</IonItem>
	);
}

export function renderColorSelection(func: any, lang: 'en' | 'de') {
	return (
		<IonItem>
			<IonLabel>{Translate(lsInj.transDict.Color)}</IonLabel>
			<IonSelect
				multiple
				onIonChange={(e) => {
					func(e);
				}}
				cancelText={Translate(lsInj.transDict.Cancel)}
				okText={Translate(lsInj.transDict.Done)}>
				{ColorArr.map((entry: any) => {
					return (
						<IonSelectOption key={entry.en} value={entry}>
							{lang === 'en' ? entry.en : entry.de}
						</IonSelectOption>
					);
				})}
			</IonSelect>
		</IonItem>
	);
}

export function renderSizeSelection(func: any, lang: 'en' | 'de') {
	return (
		<IonItem>
			<IonLabel>{Translate(lsInj.transDict.Size)}</IonLabel>
			<IonSelect
				multiple
				onIonChange={(e) => {
					func(e);
				}}
				cancelText={Translate(lsInj.transDict.Cancel)}
				okText={Translate(lsInj.transDict.Done)}>
				{SizesArray.map((entry: any) => {
					return (
						<IonSelectOption key={entry.en} value={entry}>
							{lang === 'en' ? entry.en : entry.de}
						</IonSelectOption>
					);
				})}
			</IonSelect>
		</IonItem>
	);
}

export function renderDistance(func: any) {
	return (
		<IonItem>
			{/* {Translate(lsInj.transDict.distanceFromYou)} */}
			<IonIcon size='large' slot='start' color='dark' icon={locationOutline}></IonIcon> Km
			<IonRange slot='end' dualKnobs={true} debounce={200} min={0} max={1000} step={10} pin={true} snaps={true} onIonChange={(e) => func(e)} />
		</IonItem>
	);
}

export function getResults(
	catContent: any[],
	stringArrBrand: string[],
	stringArrColor: string[],
	stringArrSize: string[],
	strictness: string,
	distanceUser: { upper: number; lower: number },
	currentUser: any
) {
	var iRes: NamedDict<i_BaseInterface_Item>;
	var res: any[] = [];

	if (stringArrBrand.length > 0 && stringArrColor.length === 0 && stringArrSize.length === 0) {
		catContent.map((item: i_BaseInterface_Item) => {
			stringArrBrand.map((stringB: string) => {
				if (stringB === item.brand.en || item.brand.de) {
					iRes = {
						...iRes,
						[item.id]: item
					};
				}
				return iRes;
			});
			res = convertObjectToArray(iRes);
			return res;
		});
		return res;
	}

	if (stringArrBrand.length > 0 && stringArrColor.length > 0 && stringArrSize.length === 0) {
		catContent.map((item: i_BaseInterface_Item) => {
			stringArrBrand.map((stringB: string) => {
				stringArrColor.map((stringC: string) => {
					if (stringB === item.brand.en || item.brand.de || stringC === item.color.toLowerCase()) {
						iRes = {
							...iRes,
							[item.id]: item
						};
					}
					return iRes;
				});
				return iRes;
			});
			res = convertObjectToArray(iRes);
			return res;
		});
		return res;
	}

	if (stringArrBrand.length > 0 && stringArrColor.length > 0 && stringArrSize.length > 0) {
		catContent.map((item: i_BaseInterface_Item) => {
			stringArrBrand.map((stringB: string) => {
				stringArrColor.map((stringC: string) => {
					stringArrSize.map((stringS: string) => {
						if (stringB === item.brand.en || item.brand.de || stringC === item.color.toLowerCase() || stringS === item.size.en) {
							iRes = {
								...iRes,
								[item.id]: item
							};
						}
						return iRes;
					});
					return iRes;
				});
				return iRes;
			});
			res = convertObjectToArray(iRes);
			return res;
		});
		return res;
	}

	if (stringArrBrand.length > 0 && stringArrColor.length > 0 && stringArrSize.length > 0 && distanceUser) {
		catContent.map((item: i_BaseInterface_Item) => {
			var dist = howFar(currentUser.location, item.location);
			// console.log('??? in get res ', dist, distanceUser);
			stringArrBrand.map((stringB: string) => {
				stringArrColor.map((stringC: string) => {
					stringArrSize.map((stringS: string) => {
						if (stringB === item.brand.en || item.brand.de || stringC === item.color.toLowerCase() || stringS === item.size.en || dist < distanceUser.upper) {
							iRes = {
								...iRes,
								[item.id]: item
							};
						}
						return iRes;
					});
					return iRes;
				});
				return iRes;
			});
			res = convertObjectToArray(iRes);
			return res;
		});
		return res;
	}

	return res;
}

export function howFar(currentUser: any, item: any) {
	var userCoords = {
		latitude: currentUser.location ? +currentUser.location.coords.lat : 0,
		longitude: currentUser.location ? +currentUser.location.coords.long : 0
	};
	var itemCoord = {
		latitude: item.location ? +item.location.coords.lat : 0,
		longitude: item.location ? +item.location.coords.long : 0
	};

	var meters = getDistance(userCoords, itemCoord, 1);
	var km = convertDistance(meters, 'km');

	return km;
}

interface iState {
	filterRes: boolean;
	results: any[];
	showRes: boolean;
	searchstringBrands: string[];
	searchstringColors: string[];
	searchstringSizes: string[];
	strictness: 'None' | 'Moderately' | 'Very';
	catContent: any[];
	distance: { lower: number; upper: number };
}

interface iProps {
	sort: boolean;
	filter: boolean;
	orginalCatContent: any[];
	lang: 'en' | 'de';
	routerLink: string;
	isDons?: boolean;
	currentUser: i_BaseInterface_User;
}

export class FilterCatContent extends Component<iProps, iState> {
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
			catContent: this.props.orginalCatContent,
			distance: { lower: 0, upper: 0 }
		};
		this.setBrands = this.setBrands.bind(this);
		this.setColor = this.setColor.bind(this);
		this.setSize = this.setSize.bind(this);
		this.setStrict = this.setStrict.bind(this);
		this.setDistance = this.setDistance.bind(this);
	}

	componentDidUpdate(prevProps: iProps) {
		console.log('????  Missing something FilterCatContent', prevProps, this.props);
		if (prevProps.filter !== this.props.filter) {
			this.setState({ filterRes: this.props.filter });
		}
		if (prevProps.orginalCatContent !== this.props.orginalCatContent) {
			this.setState({ catContent: this.props.orginalCatContent });
			// console.log('the cat contenttent updated ', this.state.catContent, this.props.orginalCatContent);
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

	setStrict(e: any) {
		// console.log('setStrict', e.detail.value);
		this.setState({ strictness: e.detail.value });
		this.getRes();
	}

	setDistance(e: any) {
		//.detail.value as any
		// console.log('distance ', e.detail.value);
		this.setState({ distance: e.detail.value });
		this.getRes();
	}

	getRes() {
		// const { orginalCatContent } = this.props;
		var res: any[] = [];
		res = getResults(
			this.state.catContent,
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

	renderDisp() {
		const { sort } = this.props;
		return (
			<IonGrid>
				{!this.state.showRes && (
					<IonRow>
						{this.props.orginalCatContent.length > 0 ? (
							<CatagoryContentView lang={this.props.currentUser.lang} uOg={'user'} order={sort} content={this.props.orginalCatContent} routerLink={this.props.routerLink} />
						) : (
							Translate(lsInj.transDict.noContent)
						)}
					</IonRow>
				)}

				{this.state.showRes && (
					<IonRow>
						{this.state.results.length > 0 ? (
							<CatagoryContentView lang={this.props.currentUser.lang} uOg={'user'} order={sort} content={this.state.results} routerLink={this.props.routerLink} />
						) : (
							Translate(lsInj.transDict.noContent)
						)}
					</IonRow>
				)}
			</IonGrid>
		);
	}

	render() {
		const { lang } = this.props; //orginalCatContent,
		return (
			<>
				{this.renderDisp()}

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

export default FilterCatContent;
