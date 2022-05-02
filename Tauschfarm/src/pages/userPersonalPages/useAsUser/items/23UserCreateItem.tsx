import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonItem,
	IonInput,
	IonLabel,
	IonGrid,
	IonRow,
	IonTitle,
	IonSelect,
	IonSelectOption,
	IonButton,
	IonHeader,
	IonCard,
	IonTextarea,
	IonCol,
	IonSpinner,
	IonIcon,
	IonFab,
	IonFabButton,
	IonPopover,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
	IonSearchbar,
	IonRadio,
	IonList,
	IonRadioGroup,
	IonListHeader,
	IonReorderGroup,
	IonRouterLink,
	IonReorder
} from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { IAppState } from '../../../../services/redux/reduxModels';
import { connect } from 'react-redux';
import { SizesArray } from '../../../../services/translate/OptionsDict/SizesToChoseFrom';
import { BrandArray } from '../../../../services/translate/OptionsDict/BrandsToChoseFrom';
import { User_Item_Set_onNav, User_Item_Save } from '../../../../services/redux/actions/userActions/003ItemAction';
import { i_Redux_ActionFunc_Interface_Item_SetOnNav, i_BaseInterface_Item } from '../../../../models/006ItemModels';
import { Group_Item_Save } from '../../../../services/redux/actions/GroupActions/103Group_ItemAction';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { i_BaseInterface_Group } from '../../../../models/004GroupModels';
import { NamedDict } from '../../../../services/helpers/Tools';
import { informationOutline, pencil } from 'ionicons/icons';
import { AppStartGloabalBase_Categories } from '../../../../models/AppStartGlobal_CatSetUp';

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
	id: string;
	size: { en: string; de: string };
	cat: string[];
	brand: { en: string; de: string };
	color: string;
	name: string;
	desc: string;
	length: string;
	groups: string[];
	addToMulti: NamedDict<{
		groudId: string;
		cats: string[];
	}>;
	user: { id: string; name: string; avatar: string };
	itemStart: { id: string; name: string };
	itemImgDisp: string[];

	worth: number;
	shipping: number;
	showmodal: boolean;
	searchText: string;
	selectedBrandDone: boolean;
}

export class UserCreateItem extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			id: `${this.props.user ? this.props.user.id : ''}-${new Date().getTime()}`,
			size: { en: '', de: '' }, //this.props.item.size,
			cat: [], //this.props.item.categories,
			brand: { en: '', de: '' }, //this.props.item.brand,
			color: '', //this.props.item.color,
			name: '', //this.props.item.name,
			desc: '', //this.props.item.description,
			length: '', //this.props.item.length,
			worth: 0, //this.props.item.worth,
			shipping: 0, //this.props.item.shipping,
			groups: [], //this.props.item.groups,
			addToMulti: {}, //this.props.item.addToMulti,
			user: {
				name: '', //this.props.user.name,
				id: '', //this.props.user.id,
				avatar: '' //this.props.user.avatar
			},

			itemStart: {
				id: '', //this.props.user ? this.props.user.id : '',
				name: 'blank'
			},
			itemImgDisp: this.props.item.pendingImgUrl.length > 0 ? this.props.item.pendingImgUrl : [],
			showmodal: false,
			searchText: '',
			selectedBrandDone: false
		};

		this.getName = this.getName.bind(this);
		this.getSize = this.getSize.bind(this);
		this.getCategory = this.getCategory.bind(this);
		// this.getBrand = this.getBrand.bind(this);
		this.getColor = this.getColor.bind(this);
		this.setStateWhenAddImg = this.setStateWhenAddImg.bind(this);
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.item !== this.props.item) {
			this.setState({
				size: this.props.item.size,
				cat: this.props.item.categories,
				brand: this.props.item.brand,
				color: this.props.item.color,
				name: this.props.item.name,
				desc: this.props.item.description,
				length: this.props.item.length,
				worth: this.props.item.worth,
				shipping: this.props.item.shipping,
				groups: this.props.item.groups,
				//addToMulti: this.props.item.addToMulti,
				user: {
					name: this.props.user.name,
					id: this.props.user.id,
					avatar: this.props.user.avatar
				},
				itemStart: {
					id: this.props.user ? this.props.user.id : '',
					name: 'blank'
				},
				itemImgDisp: this.props.item.pendingImgUrl
			});
		}
	}

	getName(e: any) {
		e.preventDefault();
		// console.log('Name e', e.detail.value);
		this.setState({ name: e.detail.value });
	}

	getColor(e: any) {
		e.preventDefault();
		// console.log('color e', e.detail.value);
		this.setState({ color: e.detail.value });
	}

	getLength(e: any) {
		e.preventDefault();
		// console.log('length e', e.detail.value);
		this.setState({ length: e.detail.value });
	}

	getSize(e: any) {
		e.preventDefault();
		// console.log('size e', e.detail.value);
		this.setState({ size: e.detail.value });
	}

	getCategory(e: any) {
		e.preventDefault();
		// console.log('cat e', e.detail.value);
		this.setState({ cat: e.detail.value });
	}

	getBrand(e: any) {
		console.log('brand e', e);
		// e.preventDefault();

		this.setState({ brand: e, searchText: e.en, selectedBrandDone: true });

		console.log('state', this.state);
	}

	getDesc(e: any) {
		e.preventDefault();
		// console.log('desc e', e.detail.value);
		this.setState({ desc: e.detail.value });
		console.log('???', this.state);
	}

	getWorth(e: any) {
		e.preventDefault();
		// console.log('desc e', e.detail.value);
		this.setState({ worth: e.detail.value });
	}

	getShipping(e: any) {
		e.preventDefault();
		// console.log('desc e', e.detail.value);
		this.setState({ shipping: e.detail.value });
	}

	setStateWhenAddImg() {
		// console.log('is it possible??');
		var obj: i_Redux_ActionFunc_Interface_Item_SetOnNav = {
			id: this.state.id,
			name: this.state.name,
			categories: this.state.cat,
			groups: this.state.groups,
			brand: this.state.brand,
			size: this.state.size,
			color: this.state.color,
			length: this.state.length,
			description: this.state.desc,
			userWhoAddedItem: this.state.user,
			worth: this.state.worth,
			shipping: this.state.shipping,
			location: this.props.user.location,
			imgArray: this.state.itemImgDisp
		};
		// console.log('Item on nav away', obj);
		this.props.setItemOnNavAdd(obj);
	}

	setSearchText(e: any) {
		e.preventDefault();
		// console.log('desc e', e.detail.value);
		this.setState({ searchText: e.detail.value.toLowerCase(), selectedBrandDone: false });
	}

	onSubmit() {
		// console.log('user', this.props.user);
		// console.log('state', this.state);
		// console.log('props', this.props.item);
		// console.log('itemStart', this.state.itemStart);

		if (this.props.uOrG === 'user') {
			var objToSave: i_BaseInterface_Item = {
				id: this.state.id,
				name: this.state.name,
				brand: this.state.brand,
				size: this.state.size,
				categories: this.state.cat,
				color: this.state.color,
				length: this.state.length,
				description: this.state.desc,
				worth: `€ ${this.state.worth}`,
				shipping: `€ ${this.state.shipping}`,
				userWhoAddedItem: this.state.user,
				groups: convertObjectToArray(this.state.addToMulti),
				imgArray: this.props.item.pendingImgUrl,
				avatar: this.props.item.pendingImgUrl[0],
				dateCreated: new Date().getTime(),
				dateEdited: '',
				dateDeleted: '',
				dateMovedToDons: '',
				location: this.props.user.location
			};
			// console.log('objToSave', objToSave);
			this.props.addItem(objToSave);
		} else {
			var objToSaveA: i_BaseInterface_Item = {
				id: this.state.id,
				name: this.state.name,
				brand: this.state.brand,
				size: this.state.size,
				categories: this.state.cat,
				color: this.state.color,
				length: this.state.length,
				description: this.state.desc,
				worth: `€ ${this.state.worth}`,
				shipping: `€ ${this.state.shipping}`,
				userWhoAddedItem: this.state.user,
				groups: convertObjectToArray(this.state.addToMulti),
				imgArray: this.props.item.pendingImgUrl,
				avatar: this.props.item.pendingImgUrl[0],
				dateCreated: new Date().getTime(),
				dateEdited: '',
				dateDeleted: '',
				dateMovedToDons: '',
				location: this.props.user.location
			};
			// console.log('objToSaveA', objToSaveA);
			this.props.Group_add_Item(objToSaveA);
			// window.location.replace(`/groups/dashboard/${this.state.user.id}`);
		}
	}

	getMultiAddLoction(entryId: string, e: any) {
		console.log('?????? addtomulti', this.state.addToMulti);
		console.log('entryId', entryId, 'e', e.detail.value);

		var newType = this.state.addToMulti;

		newType[entryId] = {
			groudId: entryId,
			cats: e.detail.value
		};

		console.log('newType', newType);
		this.setState({ addToMulti: newType });
	}

	renderAddToMultiplePlaces() {
		const { user, uOrG, userGroups } = this.props;

		var multiPlaceArr: any[] = [];
		var otherGroups: any[] = [];
		var selection: JSX.Element[] = [];

		// console.log('uOrG is ', uOrG);
		// console.log('user', user); //is current user
		// console.log('userGroups', userGroups); // all users groups he is part of

		if (uOrG === 'user') {
			convertObjectToArray(userGroups).map((group: i_BaseInterface_Group) => {
				// console.log('group Cats', group.id, group.categories);
				if (group.categories !== undefined) {
					multiPlaceArr.push({
						groupId: group.id,
						groupCatsToPlaceIn: Object.keys(group.categories),
						groupname: group.name
					});
					// console.log('multiPlaceArr', multiPlaceArr);
					return multiPlaceArr;
				}
				return multiPlaceArr;
			});
			// console.log('multiPlaceArr', multiPlaceArr);
		} else {
			convertObjectToArray(userGroups).map((group: i_BaseInterface_Group) => {
				if (user.id !== group.id) {
					otherGroups.push(group);
					return otherGroups;
				}
				return otherGroups;
			});
			otherGroups.map((group: i_BaseInterface_Group) => {
				// console.log('group Cats', group.id, group.categories);
				if (group.categories !== undefined) {
					multiPlaceArr.push({
						groupId: group.id,
						groupCatsToPlaceIn: Object.keys(group.categories),
						groupname: group.name
					});
					// console.log('multiPlaceArr', multiPlaceArr);
					return multiPlaceArr;
				} else {
					return multiPlaceArr;
				}
			});
			// console.log('multiPlaceArr', multiPlaceArr);
		}

		multiPlaceArr.sort(sortByTextAsc).map((entry: any, index: number) => {
			selection.push(
				<IonItem key={index} className='eventInput'>
					<IonLabel class='ion-text-wrap'>
						{Translate(lsInj.transDict.addItemToGroup)}: {entry.groupname}
					</IonLabel>
					<IonSelect
						multiple
						onIonChange={(e) => {
							this.getMultiAddLoction(entry.groupId, e);
						}}
						cancelText={Translate(lsInj.transDict.Cancel)}
						okText={Translate(lsInj.transDict.Done)}>
						{/* entry.groupCatsToPlaceIn */}
						{convertObjectToArray(AppStartGloabalBase_Categories('de'))
							.sort(sortByTextDsc)
							.map((entry: any) => {
								// console.log('entry', entry);
								return (
									<IonSelectOption key={`${entry.groupId}OtherList${entry.checkMatch}`} value={entry.checkMatch}>
										{entry.name}
										{/* {lang === 'en' ? entry.en : entry.de} */}
										{/* {lang === 'en' ? CategoriesToChosefrom.transDict[entry].en : CategoriesToChosefrom.transDict[entry].de} */}
									</IonSelectOption>
								);
							})}
					</IonSelect>
				</IonItem>
			);

			return selection;
		});
		return selection;
	}

	doReorder(event: any) {
		const newArr: string[] = [...this.state.itemImgDisp];

		// The `from` and `to` properties contain the index of the item
		console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
		// when the drag started and ended, respectively

		// Finish the reorder and position the item in the DOM based on
		// where the gesture ended. This method can also be called directly
		// by the reorder group
		// event.detail.complete();

		event.detail.complete(newArr);
		console.log('oldArr', this.state.itemImgDisp);
		console.log('newArr', newArr);
		this.setState({ itemImgDisp: newArr });
	}

	render() {
		const { categories, lang, spinner, user } = this.props;
		// console.log('state ', this.state);
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.ItemCreate} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{CombinedString.ItemBuildName} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req3)}</span>
						</IonLabel>
						<IonInput value={this.state.name} onIonChange={(e) => this.getName(e)} clearInput />
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' style={{ fontSize: '1em', backgroundColor: 'var(--ion-color-secondary)', color: 'black' }}>
							{`${CombinedString.ItemsAddPhotos}'s`} <br />
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonButton
							style={{ marginRight: '15px', width: '100px', height: '40px' }}
							size='small'
							fill='solid'
							routerLink={`/createItem/imgDesc/${this.props.idToUse}/${this.props.uOrG}`}
							onClick={() => this.setStateWhenAddImg()}>
							{Translate(lsInj.transDict.Add)}
						</IonButton>
					</IonItem>
					<IonGrid>
						<IonRow>
							<IonCol></IonCol>
							<IonCol>{spinner === 'start' && <IonSpinner name='circles'></IonSpinner>}</IonCol>
							<IonCol></IonCol>
						</IonRow>
						{/* <IonRow>
							{this.state.itemImgDisp &&
								this.state.itemImgDisp.map((url: any, index: number) => {
									// console.log('url', url);
									return ImageDisplay(url, `/createItem/imgDesc/${this.props.idToUse}/${this.props.uOrG}/${index}`, index, true);
								})}
						</IonRow> */}

						<IonReorderGroup disabled={false} onIonItemReorder={(e: any) => this.doReorder(e)}>
							{this.state.itemImgDisp.length > 0 &&
								this.state.itemImgDisp.slice(0, 4).map((url: any, index) => {
									return (
										<IonCard
											key={url}
											color='secondary'
											style={{
												width: '330px',
												height: '90px'
											}}
											onClick={() => this.setStateWhenAddImg()}>
											<IonCardContent style={{ margin: '0px', padding: '0px' }}>
												<IonFab style={{ top: '0', right: '0', zIndex: 'auto' }} vertical='top' horizontal='end' slot='fixed'>
													<IonRouterLink routerLink={`/createItem/imgDesc/${this.props.idToUse}/${this.props.uOrG}/${index}`}>
														<IonFabButton size='small'>
															<IonIcon color='light' size='small' icon={pencil} />
														</IonFabButton>
													</IonRouterLink>
												</IonFab>

												<IonFab vertical='top' horizontal='start' slot='fixed'>
													<IonFabButton disabled={true} style={{ '--box-shadow': 'none', '--border-radius': '0px', fontSize: '1.4em' }}>
														{/* <IonIcon color='light' size='small' icon={pencil} /> */}
														{index + 1}
													</IonFabButton>
												</IonFab>
											</IonCardContent>

											<IonReorder>
												<img style={{ width: '90px', height: '90px' }} src={url} alt='broken' />
											</IonReorder>
										</IonCard>
									);
								})}
						</IonReorderGroup>
					</IonGrid>
					<IonTitle>{Translate(lsInj.transDict.Details)}</IonTitle>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap'>
							{Translate(lsInj.transDict.Size)} <br /> <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonSelect
							onIonChange={(e) => {
								this.getSize(e);
							}}
							value={this.state.size}
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
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Color)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonInput value={this.state.color} onIonChange={(e) => this.getColor(e)} clearInput />
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Length)}
						</IonLabel>
						<IonInput value={this.state.length} onIonChange={(e) => this.getLength(e)} clearInput />
					</IonItem>
					{/* <IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap'>
							{Translate(lsInj.transDict.Brand)} <br />
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span> <br />
						</IonLabel> */}
					<IonList style={{ backgroundColor: 'var(--ion-color-secondary)', margin: '15px' }}>
						<IonRadioGroup>
							<IonListHeader>
								<IonLabel class='ion-text-wrap'>
									{Translate(lsInj.transDict.Brand)} <br />
									<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span> <br />
									<br /> <span>{Translate(lsInj.transDict.Search2)}</span>
								</IonLabel>
							</IonListHeader>
							<IonSearchbar placeholder='Addidas' value={this.state.searchText} onIonChange={(e) => this.setSearchText(e)} />

							{this.state.searchText.length > 0 &&
								this.state.selectedBrandDone === false &&
								BrandArray.filter((e) => {
									return e.en.toLowerCase().includes(this.state.searchText);
								}).map((entry: any) => {
									return (
										<IonItem key={entry.en} color='light'>
											<IonLabel>{entry.en}</IonLabel>
											<IonRadio
												value={entry}
												onChange={() => {
													this.getBrand(entry);
												}}
												onClick={() => {
													this.getBrand(entry);
												}}
											/>
										</IonItem>
									);
								})}
						</IonRadioGroup>
					</IonList>
					{/* <IonSelect
							onIonChange={(e) => {
								this.getBrand(e);
							}}
							value={this.state.brand}
							cancelText={Translate(lsInj.transDict.Cancel)}
							okText={Translate(lsInj.transDict.Done)}>
							{BrandArray.map((entry: any) => {
								return (
									<IonSelectOption key={entry.en} value={entry}>
										{entry.en}
									</IonSelectOption>
								);
							})}
						</IonSelect> */}
					{/* </IonItem> */}
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Worth)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>

						<IonInput value={this.state.worth} onIonChange={(e) => this.getWorth(e)} clearInput>
							<span style={{ opacity: 0.5, fontSize: '1em', paddingRight: '5px' }}>&euro; </span>
						</IonInput>
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Shipping)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonInput value={this.state.shipping} onIonChange={(e) => this.getShipping(e)} clearInput>
							<span style={{ opacity: 0.5, fontSize: '1em', paddingRight: '5px' }}>&euro; </span>
						</IonInput>
					</IonItem>
					{this.renderAddToMultiplePlaces()}
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap'>
							{Translate(lsInj.transDict.CatSingle)}
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>

						{/* {
							categories.length > 0 && ( */}
						<IonSelect
							key={categories}
							multiple
							onIonChange={(e) => {
								this.getCategory(e);
							}}
							value={this.state.cat}
							cancelText={Translate(lsInj.transDict.Cancel)}
							okText={Translate(lsInj.transDict.Done)}>
							{convertObjectToArray(AppStartGloabalBase_Categories('de'))
								.sort(sortByTextDsc)
								.map((entry: any) => {
									// console.log('entry', entry);
									return (
										<IonSelectOption key={`List${entry.checkMatch}`} value={entry.checkMatch}>
											{entry.name}
											{/* {lang === 'en' ? entry.en : entry.de} */}
											{/* {lang === 'en' ? CategoriesToChosefrom.transDict[entry].en : CategoriesToChosefrom.transDict[entry].de} */}
										</IonSelectOption>
									);
								})}
							{/* {categories.map((entry: any) => {
									return (
										<IonSelectOption key={entry} value={entry}>
											{lang === 'en' ? CategoriesToChosefrom.transDict[entry].en : CategoriesToChosefrom.transDict[entry].de}
										</IonSelectOption>
									);
								})} */}
						</IonSelect>
						{/* )
							 : (
							 	<IonCard
							 		color='secondary'
							 		button
							 		routerLink={this.props.uOrG === 'user' ? '/dashboard/settings/:isFirst' : `/dashboard/groups/selectedGroup/${this.props.idToUse}/:isfirst`}>
							 		{Translate(lsInj.transDict.createCat)}
							 	</IonCard>
							 )
						} */}
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Descript)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonTextarea value={this.state.desc} onIonChange={(e) => this.getDesc(e)} autoGrow />
					</IonItem>
					<IonButton
						onClick={() => this.onSubmit()}
						disabled={
							this.state.brand.en.length < 1 ||
							this.state.size.en.length < 1 ||
							this.state.name.length < 3 ||
							this.state.color.length < 3 ||
							this.state.desc.length < 3 ||
							// this.state.length.length < 1 ||
							this.state.cat.length < 1 ||
							this.props.item.pendingImgUrl[0] === undefined
						}>
						{Translate(lsInj.transDict.Publish)}
					</IonButton>
					{/* POPOVER */}
					<IonFab style={{ width: '50px', height: '50px', opacity: 0.6, marginTop: '60px', marginRight: '10px' }} color='light' vertical='center' horizontal='end' slot='fixed'>
						<IonFabButton
							style={{ width: '30px', height: '30px' }}
							onClick={() => {
								this.setState({ showmodal: true });
							}}
							color='primary'>
							<IonIcon size='small' icon={informationOutline}></IonIcon>
						</IonFabButton>
					</IonFab>
					{this.state.showmodal && (
						<IonPopover cssClass='my-custom-class3' isOpen={this.state.showmodal} backdropDismiss={true} onDidDismiss={(e) => this.setState({ showmodal: false })}>
							<IonCard style={{ padding: '0px' }}>
								{user.lang === 'de' && (
									<>
										<IonCardHeader>
											<IonCardTitle>Um einen Artikel hochzuladen .</IonCardTitle>
											<IonCardSubtitle></IonCardSubtitle>
										</IonCardHeader>
										<IonCardContent style={{ padding: '0px' }}>
											<b> Schritt 1</b>Geb den Artikelnamen an <br />
											<b> Schritt 2</b> Füg Bilder hinzu <br />
											<b> Schritt 3</b> Füll alle Felder aus (Größe, Farbe, Marke...) und wähle eine Kategorie aus <br />
											<b> Schritt 4</b> Klick auf speichern <br />
											<b> Hinweis:</b> <br />
											<b> *"Wert"</b> = ungefähre Wert des Artikels//dient der Vergleichbarkeit der Artikel <br />
											<b> *"Versand" </b>= Versandkosten nennen oder sagen, dass nur eine Abholung gewünscht ist <br />
										</IonCardContent>
									</>
								)}
								{user.lang === 'en' && (
									<>
										<IonCardHeader>
											<IonCardTitle> To upload an item .</IonCardTitle>
											<IonCardSubtitle></IonCardSubtitle>
										</IonCardHeader>
										<IonCardContent>
											<b> Step 1</b>Enter the item name <br />
											<b> Step 2</b> Add Images <br />
											<b> Step 3</b> Fill all fields (size, color, brand...) and select a category
											<br />
											<b> Step 4</b> Click on Save <br />
											<b>Note:</b> <br />
											<b>* "Value"</b>= approximate value of the item/serves the comparability of the items <br />
											<b>*"Shipping"</b> = name or say shipping costs that only one pick-up is desired
										</IonCardContent>
									</>
								)}
								<IonButton onClick={() => this.setState({ showmodal: false })}>{Translate(lsInj.transDict.Close)}</IonButton>
							</IonCard>
						</IonPopover>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	const id = ownProps.match.params.idOfUserOrGroup;
	const uOg = ownProps.match.params.userOrGroup;
	const who = state.groups.UserGroups[id];
	const whoUse = uOg === 'group' ? who : state.user;
	const userGroups = state.groups.UserGroups;
	const catsUser = convertObjectToArray(whoUse.categories).length > 0 ? Object.keys(whoUse.categories) : [];

	// console.log('ownProps', ownProps);
	// console.log('who', who);
	// console.log('whoUse', whoUse);
	// console.log('catsUser', catsUser);
	// console.log('mstp', state.item.pendingImgUrl);

	return {
		user: whoUse,
		item: state.item,
		categories: catsUser.sort(sortByTextAsc),
		idToUse: ownProps.match.params.idOfUserOrGroup,
		uOrG: ownProps.match.params.userOrGroup,
		userGroups: userGroups,
		lang: state.user.lang,
		spinner: state.item.loader
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		setItemOnNavAdd: (data: i_Redux_ActionFunc_Interface_Item_SetOnNav) => dispatch(User_Item_Set_onNav(data)),
		addItem: (data: i_BaseInterface_Item) => dispatch(User_Item_Save(data)),
		Group_add_Item: (data: i_BaseInterface_Item) => dispatch(Group_Item_Save(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreateItem);
