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
	IonCardContent,
	IonCard,
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
import { i_Redux_ActionFunc_Interface_Item_SetOnNav } from '../../../../models/006ItemModels';
import { connect } from 'react-redux';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { SizesArray } from '../../../../services/translate/OptionsDict/SizesToChoseFrom';
import { BrandArray } from '../../../../services/translate/OptionsDict/BrandsToChoseFrom';
import { User_Donations_SetOnNavAway, User_Donations_Edit } from '../../../../services/redux/actions/userActions/004DonationsActions';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import { IAppState } from '../../../../services/redux/reduxModels';
import { i_BaseInterface_Member } from '../../../../models/001UserModels';
import { pencil } from 'ionicons/icons';

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
	dateEdited: Date | string;
	dateMovedToDons: Date | string;
	dateDeleted: Date | string;
	worth: string;
	shipping: string;
	searchText: string;
	selectedBrandDone: boolean;
}

export class UserDonationEdit extends Component<any, iState> {
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
			dateCreated: this.props.itemFromPreview.dateCreated !== undefined ? this.props.itemFromPreview.dateCreated : new Date(),
			dateMovedToDons: this.props.itemFromPreview.dateMovedToDons !== undefined ? this.props.itemFromPreview.dateMovedToDons : new Date(),
			dateDeleted: this.props.itemFromPreview.dateDeleted !== undefined ? this.props.itemFromPreview.dateDeleted : new Date(),
			dateEdited: new Date(),
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
		if (prevProps.itemFromPreview.id !== this.props.itemFromPreview.id) {
			// console.log('prev', prevProps, 'now', this.props);
			this.setState({
				id: this.props.itemFromPreview.id,
				userWhoAddedItem: this.props.itemFromPreview.userWhoAddedItem,
				size: this.props.itemFromPreview.size,
				brand: this.props.itemFromPreview.brand,
				cat: this.props.itemFromPreview.cat,
				color: this.props.itemFromPreview.color,
				name: this.props.itemFromPreview.name,
				desc: this.props.itemFromPreview.description,
				length: this.props.itemFromPreview.length,
				imgArray: this.props.itemFromPreview.imgArray,
				avatar: this.props.itemFromPreview.avatar,
				dateCreated: this.props.itemFromPreview.dateCreated,
				dateEdited: new Date(),
				dateMovedToDons: this.props.itemFromPreview.dateMovedToDons,
				dateDeleted: this.props.itemFromPreview.dateDeleted
			});
		}

		if (prevProps.pendingImgArr !== this.props.pendingImgArr) {
			this.setState({
				imgArray: this.props.pendingImgArr,
				avatar: this.props.pendingImgArr[0]
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
		// e.preventDefault();
		// // console.log('brand e', e.detail.value);
		// this.setState({ brand: e.detail.value });

		console.log('brand e', e);
		// e.preventDefault();

		this.setState({ brand: e, searchText: e.en, selectedBrandDone: true });

		console.log('state', this.state);
	}

	setSearchText(e: any) {
		e.preventDefault();
		// console.log('desc e', e.detail.value);
		this.setState({ searchText: e.detail.value.toLowerCase(), selectedBrandDone: false });
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
			location: this.props.user.location,
			imgArray: this.state.imgArray
		};
		// console.log('Item on nav away', obj);
		this.props.setItemOnNavAdd(obj);
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
		this.props.editItem(this.state);
		RedirectTo(`/userDonations/selectedItem/${this.state.id}`);
	}

	renderPreview(url: string, redirectString: string, index: number, showEdit: boolean) {
		return (
			<IonCol size='6' key={index}>
				<IonCard
					color='secondary'
					style={{
						width: '100px',
						height: '100px',
						margin: '0px',
						padding: '0px'
					}}
					onClick={() => this.setStateWhenAddImg()}>
					{showEdit && (
						<IonCardContent style={{ margin: '0px', padding: '0px' }}>
							<IonFab style={{ top: '0', right: '0', zIndex: 'auto' }} vertical='top' horizontal='end' slot='fixed'>
								<IonRouterLink routerLink={redirectString}>
									<IonFabButton size='small'>
										<IonIcon color='dark' size='small' icon={pencil} />
									</IonFabButton>
								</IonRouterLink>
							</IonFab>
						</IonCardContent>
					)}
					<img src={url} alt='broken' />
				</IonCard>
			</IonCol>
		);
	}

	render() {
		const { categories, itemId, lang, spinner } = this.props;
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
							{CombinedString.ItemBuildName}
						</IonLabel>
						<IonInput value={this.state.name} onIonChange={(e) => this.getName(e)} clearInput />
					</IonItem>
					{/* <IonListHeader>
						<IonLabel class='ion-text-wrap'>{CombinedString.ItemsAddPhotos}'s</IonLabel>
						<IonButton
							style={{ marginRight: '15px' }}
							size='small'
							fill='solid'
							routerLink={`/userDonations/selectedItem/${itemId}/editImg`}
							onClick={() => this.setStateWhenAddImg()}>
							{Translate(lsInj.transDict.Edit)}
						</IonButton>
					</IonListHeader>
					<IonGrid>
						<IonRow>
							<IonCol></IonCol>
							<IonCol>{spinner === 'start' && <IonSpinner name='circles'></IonSpinner>}</IonCol>
							<IonCol></IonCol>
						</IonRow>
						<IonRow>
							{this.state.imgArray &&
								this.state.imgArray.map((url: any, index) => {
									// console.log('url', url);
									return ImageDisplay(url, `/userDonations/selectedItem/${itemId}/editImg`, index, true);
								})}
						</IonRow>
					</IonGrid> */}
					<IonListHeader>
						<IonLabel class='ion-text-wrap'>
							{CombinedString.ItemsAddPhotos}'s
							<span style={{ opacity: 0.5, fontSize: '0.7em' }}>{Translate(lsInj.transDict.req2)}</span>
						</IonLabel>

						<IonButton
							style={{ marginRight: '15px' }}
							size='small'
							fill='solid'
							routerLink={`/userDonations/selectedItem/${this.state.id}/addImg`}
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
						{/* <IonRow>
							{this.state.imgArray.length > 0 &&
								this.state.imgArray.map((url: any, index) => {
									return this.renderPreview(url, `/userDonations/selectedItem/${itemId}/${index}/editImg`, index, true);
								})}
						</IonRow> */}

						<IonReorderGroup disabled={false} onIonItemReorder={(e: any) => this.doReorder(e)}>
							{this.state.imgArray.length > 0 &&
								this.state.imgArray.slice(0, 4).map((url: any, index: number) => {
									return (
										<IonCard
											key={url}
											color='secondary'
											style={{
												width: '330px',
												height: '90px'
											}}>
											<IonCardContent style={{ margin: '0px', padding: '0px' }}>
												<IonFab style={{ top: '0', right: '0', zIndex: 'auto' }} vertical='top' horizontal='end' slot='fixed'>
													<IonRouterLink routerLink={`/userDonations/selectedItem/${itemId}/${index}/editImg`}>
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
						<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.Size)}</IonLabel>
						<IonSelect
							onIonChange={(e) => {
								this.getSize(e);
							}}
							cancelText={Translate(lsInj.transDict.Cancel)}
							okText={Translate(lsInj.transDict.Done)}>
							{SizesArray.map((entry: any, index: number) => {
								return (
									<IonSelectOption key={index} value={entry}>
										{lang === 'en' ? entry.en : entry.de}
									</IonSelectOption>
								);
							})}
						</IonSelect>
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Color)}
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
						<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.Brand)}</IonLabel>
						<IonSelect
							onIonChange={(e) => {
								this.getBrand(e);
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
					</IonItem> */}
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
							{Translate(lsInj.transDict.Worth)}
						</IonLabel>
						<IonInput value={this.state.worth} onIonChange={(e) => this.getWorth(e)} clearInput />
					</IonItem>
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Shipping)}
						</IonLabel>
						<IonInput value={this.state.shipping} onIonChange={(e) => this.getShipping(e)} clearInput />
					</IonItem>
					{this.state.cat !== undefined && (
						<IonItem className='eventInput'>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.CatSingle)}</IonLabel>
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
					)}
					<IonItem className='eventInput'>
						<IonLabel class='ion-text-wrap' position='floating'>
							{Translate(lsInj.transDict.Descript)}
						</IonLabel>
						<IonTextarea value={this.state.desc} onIonChange={(e) => this.getDesc(e)} autoGrow />
					</IonItem>
					<IonButton onClick={() => this.onSubmit()}>{Translate(lsInj.transDict.Publish)}</IonButton>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('edit don', state, ownProps);

	const Cname = ownProps.match.params.catname;
	const Iid = ownProps.match.params.itemId;
	const currentDons = state.user.donations;
	const Item = currentDons ? currentDons[Iid] : { id: 'notSet', categories: ['notSet'] };
	const catsUserToUse = Item.categories !== undefined ? Item.categories : [];

	// console.log('currentDons', currentDons);
	// console.log('Item', Item);
	// console.log('catsUserToUse', catsUserToUse);
	// console.log('redux state dons', state.donations.EditDonation);
	console.log('redux state dons', state.donations.pendingImgUrl);

	return {
		itemFromState: state.donations.EditDonation,
		itemFromPreview: Item,
		itemId: Iid,
		CatName: Cname,
		categories: catsUserToUse,
		pendingImgArr: state.donations.pendingImgUrl,
		user: state.user,
		lang: state.user.lang,
		spinner: state.donations.loader
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		setItemOnNavAdd: (data: i_Redux_ActionFunc_Interface_Item_SetOnNav) => dispatch(User_Donations_SetOnNavAway(data)),
		editItem: (data: any) => dispatch(User_Donations_Edit(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDonationEdit);
