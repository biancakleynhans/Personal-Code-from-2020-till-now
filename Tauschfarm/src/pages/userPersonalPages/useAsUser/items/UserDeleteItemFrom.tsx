import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonTitle,
	IonHeader,
	IonCard,
	IonList,
	IonItemGroup,
	IonItemDivider,
	IonLabel,
	IonCheckbox,
	IonItem,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonAvatar,
	IonButton,
	IonCardContent
} from '@ionic/react';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import { i_GloballyDelteItem } from '../../../../models/006ItemModels';
import { User_Item_Delete_Globally } from '../../../../services/redux/actions/userActions/003ItemAction';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { i_BaseInterface_Group } from '../../../../models/004GroupModels';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { i_BaseInterface_Category } from '../../../../models/002CatagoryModels';
import CategoriesToChosefrom from '../../../../services/translate/OptionsDict/CatagoriesToChoseFrom';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import { iTimeLineEntry } from '../../../../models/TimelineModels';

interface iState {
	placeWhereItemShouldbedeleted: any[];
	groups: any[];
}

export class UserDeleteItemFrom extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			placeWhereItemShouldbedeleted: [],
			groups: this.props.listofgroups
		};
	}

	mastercheckBox(index: number) {
		// console.log('Master checkbox', e.detail.checked, index, this.state.groups);
		var change = this.state.groups;
		if (this.state.groups[index].mainBox === true) {
			// console.log('change master to false as well as check for each item');
			convertObjectToArray(change[index].containItems).map((ent: any) => {
				ent.checked = false;
				return ent;
			});
			change[index].master = !change[index].master;
			change[index].mainBox = !change[index].mainBox;
			this.setState({ groups: change });
		} else {
			// console.log('change master to true as well as check for each item');
			change[index].master = !change[index].master;
			change[index].mainBox = !change[index].mainBox;
			this.setState({ groups: change });
		}
	}

	singleCheckBox(groupId: string, catName: string, e: any, index: number, entryIndex: number) {
		// console.log('single CheckBox', e.detail.checked);

		if (e.detail.checked === false) {
			// console.log('singlecheckbox  false');
			this.removeFromdeleteList(groupId, catName, index, entryIndex);
		} else {
			// console.log('singlecheckbox  true');
			this.addTodeleteList(groupId, catName, index, entryIndex);
		}
	}

	addTodeleteList(groupId: string, catName: string, index: number, entryIndex: number) {
		const { userWhoAdded, userOrGroup, itemId } = this.props;
		// console.log('add to delete list', this.state.placeWhereItemShouldbedeleted);
		// console.log('???', index, groupId, catName, itemId, userOrGroup, userWhoAdded);
		var changeChecked = this.state.groups;
		// console.log('????', this.state.groups[index].containItems[entryIndex].checked);
		changeChecked[index].containItems[entryIndex].checked = true;
		this.setState({ groups: changeChecked });

		var deleteMeAt: i_GloballyDelteItem = {
			groupId: groupId,
			catName: catName,
			itemId: itemId,
			userId: userWhoAdded,
			userOrGroup: userOrGroup,
			tlID: this.props.delteTl
		};
		var arr = this.state.placeWhereItemShouldbedeleted;
		arr.push(deleteMeAt);
		// console.log('arr', arr);
		this.setState({ placeWhereItemShouldbedeleted: arr });
		// console.log('state', this.state);
	}

	removeFromdeleteList(groupId: string, catName: string, index: number, entryIndex: number) {
		const { itemId } = this.props;
		// console.log('???', index, groupId, catName, itemId, userOrGroup, userWhoAdded);
		// console.log('remove to delete list', this.state.placeWhereItemShouldbedeleted);
		var changeCheckedRemoveIf = this.state.groups;
		var changlingRemoveIf = this.state.placeWhereItemShouldbedeleted;
		var resendRemoveIf: any[] = this.state.placeWhereItemShouldbedeleted;
		var changeChecked = this.state.groups;
		var changlingRemove = this.state.placeWhereItemShouldbedeleted;
		var resendRemove: any[] = this.state.placeWhereItemShouldbedeleted;

		if (this.state.groups[index].master === true) {
			// console.log('master is true');
			// console.log('????', this.state.groups[index].containItems[entryIndex].checked);

			changeCheckedRemoveIf[index].master = false;
			changeCheckedRemoveIf[index].containItems[entryIndex].checked = false;
			this.setState({ groups: changeCheckedRemoveIf });

			changlingRemoveIf.map((entry: any, index: number) => {
				if (entry.groupId === groupId && entry.catName === catName && entry.itemId === itemId) {
					// console.log('matched now remove', entry);
					// console.log('wish to remove this one');
					// console.log('entry', entry, index);
					resendRemoveIf.splice(index, 1);
					return resendRemoveIf;
				}
				return resendRemoveIf;
			});

			// console.log('changed  resendRemoveIf', resendRemoveIf);
			this.setState({ placeWhereItemShouldbedeleted: resendRemoveIf });
		} else {
			// console.log('master is false');
			// console.log('????', this.state.groups[index].containItems[entryIndex].checked);

			changeChecked[index].containItems[entryIndex].checked = false;
			this.setState({ groups: changeChecked });

			changlingRemove.map((entry: any, index: number) => {
				if (entry.groupId === groupId && entry.catName === catName && entry.itemId === itemId) {
					// console.log('matched now remove', entry);
					// console.log('wish to remove this one');
					// console.log('entry', entry, index);
					resendRemove.splice(index, 1);
					return resendRemove;
				}
				return resendRemove;
			});

			// console.log('changed  resendRemove', resendRemove);
			this.setState({ placeWhereItemShouldbedeleted: resendRemove });
		}
	}

	doneWithSelection() {
		var con = window.confirm(Translate(lsInj.transDict.delItemConfirm));
		if (con === true) {
			// console.log('done', this.state.placeWhereItemShouldbedeleted);
			this.props.deleteItems(this.state.placeWhereItemShouldbedeleted);
			window.location.replace('/dashboard');
		} else {
			RedirectTo('/dashboard');
		}
	}

	renderDisplay() {
		// console.log('state', this.state);
		const { lang } = this.props;
		return (
			<IonList>
				{this.state.groups.map((group: any, index: number) => {
					if (this.state.groups[index].containItems.length > 0) {
						return (
							<IonItemGroup key={index}>
								<IonItemDivider sticky key={index}>
									<IonAvatar slot='start'>
										<img src={group.avatar} alt='brokjen' />
									</IonAvatar>
									<IonLabel
										slot='start'
										style={{
											overflow: 'visible',
											fontSize: 'large',
											fontWeight: 'bold'
										}}>
										{group.groupName.toUpperCase()}
									</IonLabel>
									<IonCheckbox
										indeterminate
										style={{ marginRight: '30px' }}
										slot='end'
										color='primary'
										checked={this.state.groups[index].mainBox}
										onIonChange={(e) => this.mastercheckBox(index)}
									/>
								</IonItemDivider>

								{this.state.groups[index].containItems.length > 0 &&
									this.state.groups[index].containItems.map((entry: any, entryIndex: number) => {
										// console.log('entry', entry);
										return (
											<IonItem key={`${index}-${entryIndex}-${entry.name}`}>
												<IonLabel class='ion-text-wrap'>
													{lang === 'en' ? CategoriesToChosefrom.transDict[entry.checkMatch].en : CategoriesToChosefrom.transDict[entry.checkMatch].de}
												</IonLabel>

												<IonCheckbox
													slot='end'
													style={{ marginRight: '30px' }}
													checked={this.state.groups[index].master ? this.state.groups[index].master : this.state.groups[index].containItems[entryIndex].checked}
													onIonChange={(e) => this.singleCheckBox(group.groupId, entry.checkMatch, e, index, entryIndex)}
													color='primary'
													className='deleteCheckbox'
												/>
											</IonItem>
										);
									})}
							</IonItemGroup>
						);
					} else {
						return <></>;
					}
				})}
			</IonList>
		);
	}

	render() {
		const { isAllowed, itemName, itemDesc, itemImg, itemSize, itemBrand, itemColor, itemLength } = this.props;

		return (
			<IonPage>
				<IonContent>
					<IonHeader>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.delItem)} />
					</IonHeader>

					{isAllowed ? (
						<>
							<IonCard>
								<img style={{ width: '200px', height: '200px' }} src={itemImg} alt='broken' />
								<IonCardHeader>
									<IonCardTitle>{itemName}</IonCardTitle>
									<IonCardSubtitle>{itemDesc}</IonCardSubtitle>
								</IonCardHeader>
								<IonCardContent>
									<b>{Translate(lsInj.transDict.Brand)}</b>: {itemBrand} <br />
									<b>{Translate(lsInj.transDict.Size)}</b>: {itemSize} <br />
									<b>{Translate(lsInj.transDict.Color)}</b>: {itemColor} <br />
									<b>{Translate(lsInj.transDict.Length)}</b>: {itemLength} <br />
								</IonCardContent>
							</IonCard>

							{this.renderDisplay()}

							{this.state.placeWhereItemShouldbedeleted.length > 0 && <IonButton onClick={() => this.doneWithSelection()}>{Translate(lsInj.transDict.Done)}</IonButton>}
						</>
					) : (
						<IonCard>
							<IonTitle>{Translate(lsInj.transDict.noPermission)}</IonTitle>
						</IonCard>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('UserDeleteItemFrom ownProps', ownProps);
	var allCats = {};
	var listofgroups: any[] = [];

	const ItemId = ownProps.match.params.itemId;
	const ItemCat = ownProps.match.params.itemCat;
	const GroupId = ownProps.match.params.groupId;
	const UoG = ownProps.match.params.userOrGroup;
	const UserAddedItem = ownProps.match.params.userWhoAdded;
	const UserWantToDeleteItem = ownProps.match.params.userWhoDeleted;

	const UserGroups = state.groups.UserGroups;
	const UserCats = state.user.categories;

	const UserItem =
		UserCats[ItemCat]?.items[ItemId] !== undefined
			? UserCats[ItemCat].items[ItemId]
			: {
					name: '',
					avatar: '',
					brand: { en: '', de: '' },
					size: { en: '', de: '' },
					description: '',
					color: '',
					length: ''
			  };
	const GroupItem =
		UserGroups[GroupId]?.categories[ItemCat]?.items[ItemId] !== undefined
			? UserGroups[GroupId].categories[ItemCat].items[ItemId]
			: {
					name: '',
					avatar: '',
					brand: { en: '', de: '' },
					size: { en: '', de: '' },
					description: '',
					color: '',
					length: ''
			  };

	const isAllowed = UserAddedItem.split('-')[0] === UserWantToDeleteItem.split('-')[0] ? true : false;

	const ItemInQuestion = UoG === 'user' ? UserItem : GroupItem;

	convertObjectToArray(UserGroups).map((group: i_BaseInterface_Group) => {
		allCats = {
			...allCats,
			[group.id]: {
				cats: group.categories,
				groupName: group.name,
				groupId: group.id,
				avatar: group.avatar
			}
		};
		return allCats;
	});

	allCats = {
		...allCats,
		[state.user.id]: {
			cats: UserCats,
			groupName: state.user.name,
			groupId: state.user.id,
			avatar: state.user.avatar
		}
	};

	convertObjectToArray(allCats).map((ent, index: number) => {
		listofgroups.push({
			index: index,
			master: false,
			mainBox: false,
			containItems: [],
			avatar: ent.avatar,
			groupName: ent.groupName,
			groupId: ent.groupId
		});
		convertObjectToArray(ent.cats).map((cat: i_BaseInterface_Category) => {
			convertObjectToArray(cat.items).map((item: any) => {
				if (item.id === ItemId) {
					// console.log('matched itemId', item.id, cat);
					listofgroups[index].containItems.push({
						avatar: cat.avatar,
						name: cat.name,
						checkMatch: cat.checkMatch,
						items: cat.items,
						checked: false
					});
					return listofgroups;
				}
				return listofgroups;
			});
			return listofgroups;
		});
		return listofgroups;
	});

	// console.log('UserGroups', UserGroups);
	// console.log('UserCats', UserCats);

	// console.log('UserItem', UserItem);
	// console.log('GroupItem', GroupItem);
	// console.log('ItemInQuestion', ItemInQuestion);

	// console.log('isAllowed', isAllowed);

	// console.log('allCats', allCats);
	// console.log('listofgroups', listofgroups);

	var delteTl = '';

	convertObjectToArray(state.timeline.tl, true).forEach((tl: iTimeLineEntry) => {
		// console.log('tl', tl);
		if (tl.content?.item?.id === ItemId) {
			console.log('delete this tl', tl);

			delteTl = tl.id;
		}
	});

	return {
		userWhoDeleted: UserWantToDeleteItem, //user who wishes to delete this item globally
		userWhoAdded: UserAddedItem, // user who added this item
		userOrGroup: UoG,
		itemId: ItemId,
		allCatsGlobally: allCats,
		itemName: ItemInQuestion?.name,
		itemDesc: ItemInQuestion?.description,
		itemImg: ItemInQuestion?.avatar,
		itemSize: state.user.lang === 'en' ? ItemInQuestion?.size.en : ItemInQuestion?.size.de,
		itemBrand: state.user.lang === 'en' ? ItemInQuestion?.brand.en : ItemInQuestion?.brand.de,
		itemColor: ItemInQuestion?.color,
		itemLength: ItemInQuestion?.length,

		isAllowed,
		listofgroups,
		lang: state.user.lang,
		delteTl
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		deleteItems: (itemData: i_GloballyDelteItem[]) => dispatch(User_Item_Delete_Globally(itemData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDeleteItemFrom);
