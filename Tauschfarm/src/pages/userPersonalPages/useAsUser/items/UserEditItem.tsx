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
	IonListHeader,
	IonHeader,
	IonTextarea,
	IonCol,
	IonSpinner,
	IonCard,
	IonCardContent,
	IonFab,
	IonRouterLink,
	IonFabButton,
	IonIcon,
	IonList,
	IonRadioGroup,
	IonSearchbar,
	IonRadio,
	IonReorderGroup,
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
import { User_Item_Set_onNav, User_Item_Change } from '../../../../services/redux/actions/userActions/003ItemAction';
import { i_Redux_ActionFunc_Interface_Item_SetOnNav, i_BaseInterface_Item, iSendUpdate } from '../../../../models/006ItemModels';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import { Group_Item_Change } from '../../../../services/redux/actions/GroupActions/103Group_ItemAction';
import { i_BaseInterface_Member } from '../../../../models/001UserModels';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { i_BaseInterface_Category } from '../../../../models/002CatagoryModels';
import { i_BaseInterface_Group } from '../../../../models/004GroupModels';
import { pencil } from 'ionicons/icons';
import { iTimeLineEntry } from '../../../../models/TimelineModels';

interface iState {
	id: string;
	name: string;
	brand: { en: string; de: string };
	size: { en: string; de: string };
	color: string;
	length: string;
	desc: string;
	imgArray: string[];
	avatar: string;
	cat: string[];
	userWhoAddedItem: i_BaseInterface_Member;
	dateCreated: Date;
	dateEdited: Date | string | number;
	dateMovedToDons: Date | string;
	dateDeleted: Date | string;
	worth: string;
	shipping: string;
	searchText: string;
	selectedBrandDone: boolean;
}

export class UserEditItemPage extends Component<any, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			id: this.props.itemFromPreview.id,
			userWhoAddedItem: this.props.itemFromPreview.userWhoAddedItem,
			size: this.props.itemFromPreview.size,
			brand: this.props.itemFromPreview.brand,
			cat: this.props.itemFromPreview.categories,
			color: this.props.itemFromPreview.color,
			name: this.props.itemFromPreview.name,
			desc: this.props.itemFromPreview.description,
			length: this.props.itemFromPreview.length,
			imgArray: this.props.itemFromPreview.imgArray,
			avatar: this.props.itemFromPreview.avatar,
			dateCreated: this.props.itemFromPreview.dateCreated,
			dateMovedToDons: this.props.itemFromPreview.dateMovedToDons,
			dateDeleted: this.props.itemFromPreview.dateDeleted,
			dateEdited: new Date().getTime(),
			worth: this.props.itemFromPreview.worth,
			shipping: this.props.itemFromPreview.shipping,
			searchText: this.props.itemFromPreview.brand.en,
			selectedBrandDone: false
		};

		this.getName = this.getName.bind(this);
		this.getSize = this.getSize.bind(this);
		this.getCategory = this.getCategory.bind(this);
		this.getBrand = this.getBrand.bind(this);
		this.getColor = this.getColor.bind(this);
		this.setStateWhenAddImg = this.setStateWhenAddImg.bind(this);
	}

	componentDidUpdate(prevProps: any) {
		console.log('STATE UPDATE', this.props.itemFromState, this.props.itemFromPreview);
		if (prevProps.itemFromPreview !== this.props.itemFromPreview) {
			// console.log('prev', prevProps, 'now', this.props);
			this.setState({
				id: this.props.itemFromPreview.id,
				userWhoAddedItem: this.props.itemFromPreview.userWhoAddedItem,
				size: this.props.itemFromPreview.size,
				brand: this.props.itemFromPreview.brand,
				cat: this.props.itemFromPreview.categories,
				color: this.props.itemFromPreview.color,
				name: this.props.itemFromPreview.name,
				desc: this.props.itemFromPreview.description,
				length: this.props.itemFromPreview.length,
				dateCreated: this.props.itemFromPreview.dateCreated,
				dateEdited: new Date().getTime(),
				dateMovedToDons: this.props.itemFromPreview.dateMovedToDons,
				dateDeleted: this.props.itemFromPreview.dateDeleted
			});
		} else if (prevProps.itemFromState !== this.props.itemFromState) {
			this.setState({
				imgArray: this.props.itemFromState.pendingImgUrl,
				avatar: this.props.itemFromState.pendingImgUrl[0]
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
		var obj: i_Redux_ActionFunc_Interface_Item_SetOnNav = {
			id: this.state.id,
			name: this.state.name,
			categories: this.state.cat,
			brand: this.state.brand,
			size: this.state.size,
			color: this.state.color,
			length: this.state.length,
			description: this.state.desc,
			userWhoAddedItem: this.state.userWhoAddedItem,
			worth: this.state.worth,
			shipping: this.state.shipping,
			location: this.props.itemFromPreview.location,
			imgArray: this.state.imgArray
		};
		// console.log('Item on nav away', obj);
		this.props.setItemOnNavAdd(obj);
	}

	setSearchText(e: any) {
		e.preventDefault();
		// console.log('desc e', e.detail.value);
		this.setState({ searchText: e.detail.value.toLowerCase(), selectedBrandDone: false });
	}

	doReorder(event: any) {
		const newArr: string[] = [...this.state.imgArray];

		// The `from` and `to` properties contain the index of the item
		console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
		// when the drag started and ended, respectively

		// Finish the reorder and position the item in the DOM based on
		// where the gesture ended. This method can also be called directly
		// by the reorder group
		// event.detail.complete();

		event.detail.complete(newArr);
		console.log('oldArr', this.state.imgArray);
		console.log('newArr', newArr);
		this.setState({ imgArray: newArr });
	}

	onSubmit() {
		// console.log('state at submit point', this.state);

		if (this.props.groupID === 'NotGroup') {
			var objToSave: iSendUpdate = {
				item: {
					id: this.props.itemFromPreview.id,
					name: this.state.name,
					brand: this.state.brand,
					categories: this.state.cat,
					size: this.state.size,
					color: this.state.color,
					length: this.state.length,
					description: this.state.desc,
					imgArray: this.state.imgArray,
					avatar: this.state.imgArray[0],
					dateEdited: new Date().getTime(),
					location: this.props.itemFromPreview.location,
					worth: this.state.worth,
					shipping: this.state.shipping
				},
				everywhere: this.props.everywhere,
				timelineId: this.props.delteTl
			};
			// console.log('Obj to save', objToSave);
			this.props.editItem(objToSave);
			// RedirectTo('/dashboard');
		} else {
			console.log('this is a group !!!!!', this.props, this.state);
			var objToSaveGroup = {
				item: {
					id: this.props.itemFromPreview.id,
					name: this.state.name,
					brand: this.state.brand,
					categories: this.state.cat,
					size: this.state.size,
					color: this.state.color,
					length: this.state.length,
					description: this.state.desc,
					imgArray: this.state.imgArray,
					avatar: this.state.imgArray[0],
					dateEdited: new Date().getTime(),
					location: this.props.itemFromPreview.location,
					worth: this.state.worth,
					shipping: this.state.shipping
				},
				groupId: this.props.groupID,
				timelineId: this.props.delteTl
			};
			console.log('Obj to save Group', objToSaveGroup);
			this.props.editItemGroup(objToSaveGroup);
			// RedirectTo(`/groups/dashboard/${this.props.groupID}`);
		}
	}

	render() {
		const { CatName, categories, itemId, groupID, lang, spinner, userId } = this.props;
		// console.log('????', this.state.size);
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.ItemEdit} />
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
					<IonListHeader>
						<IonLabel class='ion-text-wrap'>
							{CombinedString.ItemsAddPhotos}'s
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>

						<IonButton
							style={{ marginRight: '15px' }}
							size='small'
							fill='solid'
							routerLink={`/createItem/imgDesc/${this.props.itemFromPreview.id}/${userId}`}
							onClick={() => this.setStateWhenAddImg()}>
							{Translate(lsInj.transDict.Add)}
						</IonButton>
					</IonListHeader>
					<IonGrid>
						<IonRow>
							<IonCol></IonCol>
							<IonCol>{spinner === 'start' && <IonSpinner name='circles'></IonSpinner>}</IonCol>
							<IonCol></IonCol>
						</IonRow>

						<IonReorderGroup disabled={false} onIonItemReorder={(e: any) => this.doReorder(e)}>
							{this.state.imgArray.length > 0 &&
								this.state.imgArray.slice(0, 4).map((url: any, index) => {
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
													<IonRouterLink routerLink={`/dashboard/categories/selectedCategory/${CatName}/selectedItem/${itemId}/editImg/${itemId}/${groupID}/${index}`}>
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
							{Translate(lsInj.transDict.Size)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
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
							{Translate(lsInj.transDict.Color)}
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonInput value={this.state.color} onIonChange={(e) => this.getColor(e)} clearInput />
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Length)}
						</IonLabel>
						<IonInput value={this.state.length} onIonChange={(e) => this.getLength(e)} clearInput />
					</IonItem>
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
												onChange={(e) => {
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
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Worth)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>

						<IonInput value={this.state.worth} onIonChange={(e) => this.getWorth(e)} clearInput>
							{/* <span style={{ opacity: 0.5, fontSize: '1em', paddingRight: '5px' }}>&euro; </span> */}
						</IonInput>
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Shipping)} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonInput value={this.state.shipping} onIonChange={(e) => this.getShipping(e)} clearInput>
							{/* <span style={{ opacity: 0.5, fontSize: '1em', paddingRight: '5px' }}>&euro; </span> */}
						</IonInput>
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap'>
							{Translate(lsInj.transDict.CatSingle)}
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonSelect
							value={this.state.cat}
							multiple
							onIonChange={(e) => {
								this.getCategory(e);
							}}
							cancelText={Translate(lsInj.transDict.Cancel)}
							okText={Translate(lsInj.transDict.Done)}>
							{categories.map((entry: any) => {
								return (
									<IonSelectOption key={entry} value={entry}>
										{entry}
									</IonSelectOption>
								);
							})}
						</IonSelect>
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Descript)}
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>
						<IonTextarea value={this.state.desc} onIonChange={(e) => this.getDesc(e)} autoGrow />
					</IonItem>
					<IonButton
						onClick={() => this.onSubmit()}
						disabled={
							!this.state.brand || !this.state.size || this.state.name?.length < 3 || this.state.color?.length < 3 || this.state.desc?.length < 3 || this.state.cat?.length < 1
						}>
						{Translate(lsInj.transDict.Publish)}
					</IonButton>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('UserEditItemPage', ownProps, state);

	const Cname = ownProps.match.params.catname;
	const Iid = ownProps.match.params.itemId;

	const groupId = ownProps.match.params.groupId === 'undefined' ? 'NotGroup' : ownProps.match.params.groupId;
	// console.log('groupId', groupId);

	const userItemsInCat = groupId === 'NotGroup' ? state.user.categories[Cname].items : undefined;
	// console.log('userItemsInCat', userItemsInCat);

	const groupItemsInCat = groupId !== 'NotGroup' ? state.groups?.UserGroups[groupId]?.categories[Cname].items : undefined;
	// console.log('groupItemsInCat', groupItemsInCat);

	const currentItems = userItemsInCat !== undefined ? userItemsInCat : groupItemsInCat !== undefined ? groupItemsInCat : undefined;
	// console.log('currentItems', currentItems);

	const Item = currentItems ? currentItems[Iid] : undefined;
	// console.log('Item', Item);

	const userCats = groupId === 'NotGroup' || groupId === undefined ? state.user.categories : undefined;
	// console.log('userCats', userCats);

	const groupCats = groupId !== 'NotGroup' ? state.groups.UserGroups[groupId].categories : undefined;
	// console.log('groupCats', groupCats);

	const catsUserToUse = userCats !== undefined ? Object.keys(userCats) : groupCats !== undefined ? Object.keys(groupCats) : undefined;
	// console.log('catsUserToUse', catsUserToUse);

	// console.log('pending Img url', state.item.pendingImgUrl);

	//where is this item saved everywhere??
	var everywhere: any[] = [];
	convertObjectToArray(state.user.categories).forEach((c: i_BaseInterface_Category) => {
		convertObjectToArray(c.items).forEach((i: i_BaseInterface_Item) => {
			if (i.id === Item?.id) {
				everywhere.push({ where: 'user', cat: c.checkMatch, uid: state.user.id });
			}
		});
	});

	convertObjectToArray(state.groups.GlobalGroups).forEach((u: i_BaseInterface_Group) => {
		convertObjectToArray(u.categories).forEach((c: i_BaseInterface_Category) => {
			convertObjectToArray(c.items).forEach((i: i_BaseInterface_Item) => {
				everywhere.push({ where: 'group', cat: c.checkMatch, uid: state.user.id });
			});
		});
	});
	var delteTl = '';

	convertObjectToArray(state.timeline.tl, true).forEach((tl: iTimeLineEntry) => {
		// console.log('tl', tl);
		if (tl.content?.item?.id === Iid) {
			console.log('delete this tl', tl);

			delteTl = tl.id;
		}
	});
	return {
		itemFromState: state.item,
		itemFromPreview: Item,
		itemId: Iid,
		CatName: Cname,
		categories: catsUserToUse,
		groupID: groupId,
		everywhere,
		lang: state.user.lang,
		spinner: state.item.loader,
		userId: state.user.id,
		delteTl
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		setItemOnNavAdd: (data: i_Redux_ActionFunc_Interface_Item_SetOnNav) => dispatch(User_Item_Set_onNav(data)),
		editItem: (data: iSendUpdate) => dispatch(User_Item_Change(data)),
		editItemGroup: (data: any) => dispatch(Group_Item_Change(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditItemPage);
