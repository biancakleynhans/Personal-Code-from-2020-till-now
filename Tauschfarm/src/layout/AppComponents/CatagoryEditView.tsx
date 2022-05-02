import React, { Component, Dispatch } from 'react';
import { IonGrid, IonRow, IonItem, IonLabel, IonSelect, IonSelectOption, IonCol, IonTitle, IonButton, IonCard, IonCardHeader } from '@ionic/react';
import { NamedDict } from '../../services/helpers/Tools';
import { i_BaseInterface_Item } from '../../models/006ItemModels';
import { i_BaseInterface_Category } from '../../models/002CatagoryModels';
import { CombinedString } from '../../services/translate/CombinedStrings';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import { AppStartGloabalBase_Categories } from '../../models/AppStartGlobal_CatSetUp';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { User_Category_Edit } from '../../services/redux/actions/userActions/002CatagoryActions';
import { Group_EditCats } from '../../services/redux/actions/userActions/006GroupsActions';
import { IAppState } from '../../services/redux/reduxModels';
import { RedirectTo } from '../Loading_Redirecting/CommonUIServices';

interface iState {
	catToEdit: string;
	amountOfItemsInCat: number;
	showItems: boolean;
	currentCatToEdit: i_BaseInterface_Category;
	allCatsForThisUser: NamedDict<i_BaseInterface_Category>;
	userId: string;
	uOg: 'user' | 'group';
	redirectLink: string;
	newCat: i_BaseInterface_Category;
}

class CatagoryEditView extends Component<any, iState> {
	constructor(props: any) {
		super(props);

		const { currentCat, allCatsForUser, userId, uOg, redirectLink, itemsTotal } = this.props;

		this.state = {
			catToEdit: currentCat.checkMatch,
			currentCatToEdit: currentCat,
			allCatsForThisUser: allCatsForUser,
			userId: userId,
			uOg: uOg,
			showItems: false,
			redirectLink: redirectLink,
			amountOfItemsInCat: itemsTotal,
			newCat: currentCat
		};
		this.setCatStringChange = this.setCatStringChange.bind(this);
		this.changeCatName = this.changeCatName.bind(this);

		// console.log('CatagoryEditView');
		// console.log('state', this.state);
		// console.log('props', this.props);
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.currentCat !== this.props.currentCat) {
			this.setState({
				catToEdit: this.props.currentCat.checkMatch,
				currentCatToEdit: this.props.currentCat,
				allCatsForThisUser: this.props.allCatsForUser,
				userId: this.props.userId,
				uOg: this.props.uOg,
				showItems: false,
				redirectLink: this.props.redirectLink,
				amountOfItemsInCat: this.props.itemsTotal,
				newCat: this.props.currentCat
			});
		}
	}

	setCatStringChange(e: any) {
		// console.log('setStringChange', e.detail.value);
		this.setState({ newCat: e.detail.value });
	}

	changeCatName() {
		// console.log('submit and name has been changed state', this.state);
		// console.log('props', this.props);

		const ArrayFromState = convertObjectToArray(this.state.allCatsForThisUser);
		var chagedCats: NamedDict<i_BaseInterface_Category> = {};
		var newChangedUnCatItems: NamedDict<i_BaseInterface_Item> = {};
		var clientSideCatIndexer: NamedDict<any> = {};

		const isIt = ArrayFromState.find((e) => e.checkMatch === this.state.newCat.checkMatch);
		// console.log('????', isIt);
		const confirm = isIt !== undefined ? window.confirm(`${Translate(lsInj.transDict.allreadyThere)}: ${this.state.newCat.name} `) : false;

		//name changed to same name
		if (confirm) {
			// console.log('same name chosen');
			//need to run the following checks
			//1 if the current cat is used for any other items and remove it
			//2 if the current cat has any items that need their cat changed
			//3 if it is not used or has its own items it can simply be removed
			//4 set up the cat indexer for saving to db
			//5 save changes to db and redux

			ArrayFromState.forEach((catMap: i_BaseInterface_Category) => {
				if (catMap.checkMatch !== this.state.newCat.checkMatch) {
					chagedCats = {
						...chagedCats,
						[catMap.checkMatch]: catMap
					};
				}
				if (catMap.checkMatch !== this.state.currentCatToEdit.checkMatch) {
					chagedCats = {
						...chagedCats,
						[catMap.checkMatch]: catMap
					};
				}
				if (catMap.checkMatch === this.state.newCat.checkMatch) {
					chagedCats = {
						...chagedCats,
						[this.state.newCat.checkMatch]: {
							...this.state.newCat,
							items: {
								...chagedCats[this.state.newCat.checkMatch]?.items,
								...this.state.allCatsForThisUser[this.state.newCat.checkMatch]?.items,
								...this.state.allCatsForThisUser[this.state.currentCatToEdit.checkMatch]?.items
							}
						}
					};

					// console.log('first if', chagedCats);
				}
				if (catMap.checkMatch === this.state.currentCatToEdit.checkMatch) {
					chagedCats = {
						...chagedCats,
						[this.state.newCat.checkMatch]: {
							...this.state.newCat,
							items: {
								...chagedCats[this.state.newCat.checkMatch]?.items,
								...this.state.allCatsForThisUser[this.state.newCat.checkMatch]?.items,
								...this.state.allCatsForThisUser[this.state.currentCatToEdit.checkMatch]?.items
							}
						}
					};
					// console.log('second if', chagedCats);
				}

				convertObjectToArray(catMap.items).forEach((itemMap: i_BaseInterface_Item) => {
					if (catMap.checkMatch !== this.state.currentCatToEdit.checkMatch) {
						chagedCats = {
							...chagedCats,
							[catMap.checkMatch]: {
								...catMap,
								items: {
									...chagedCats[catMap.checkMatch]?.items,
									[itemMap.id]: {
										...itemMap,
										categories: itemMap.categories.filter((e) => e !== this.state.currentCatToEdit.checkMatch)
									}
								}
							}
						};
						// console.log('filter edit if ', chagedCats);
					} else {
						var old: string[] = itemMap.categories.filter((e) => e !== this.state.catToEdit);

						old.push(this.state.newCat.checkMatch);
						newChangedUnCatItems = {
							...newChangedUnCatItems,
							[itemMap.id]: {
								...itemMap,
								id: itemMap.id,
								categories: old
							}
						};

						chagedCats = {
							...chagedCats,
							[this.state.newCat.checkMatch]: {
								name: this.state.newCat.name,
								avatar: this.state.newCat.avatar,
								checkMatch: this.state.newCat.checkMatch,
								items: {
									...chagedCats[this.state.newCat.checkMatch].items,
									...newChangedUnCatItems
								}
							}
						};

						// console.log('filter edit else ', chagedCats);
					}
				});
			});

			convertObjectToArray(chagedCats).forEach((cat: i_BaseInterface_Category) => {
				if (cat.checkMatch !== this.state.catToEdit) {
					clientSideCatIndexer = {
						...clientSideCatIndexer,
						[cat.checkMatch]: cat
					};
				}
				convertObjectToArray(cat.items).forEach((item: i_BaseInterface_Item) => {
					clientSideCatIndexer = {
						...clientSideCatIndexer,
						[cat.checkMatch]: {
							...cat,
							items: cat.items !== undefined && {
								...clientSideCatIndexer[cat.checkMatch]?.items,
								[item.id]: {
									id: item.id,
									categories: item.categories
								}
							}
						}
					};
					return clientSideCatIndexer;
				});
				return clientSideCatIndexer;
			});

			if (this.state.currentCatToEdit.checkMatch !== this.state.newCat.checkMatch) {
				delete chagedCats[this.state.catToEdit];
				delete clientSideCatIndexer[this.state.catToEdit];
			}

			// console.log('newChangedUnCatItems', newChangedUnCatItems);
			// console.log('chagedCats', chagedCats);
			// console.log('clientSideCatIndexer', clientSideCatIndexer);

			if (this.state.uOg === 'user') {
				// console.log('deleting user catagory');

				var sendCatDelUser = {
					userId: this.state.userId,
					newCats: chagedCats,
					newItemsToSave: newChangedUnCatItems,
					userCatsIndexed: clientSideCatIndexer
				};
				// console.log('sendCatDelUser', sendCatDelUser);
				this.props.User_Edit_Cat(sendCatDelUser);
				RedirectTo(this.state.redirectLink);
				this.setState({
					catToEdit: '',
					currentCatToEdit: { name: '', avatar: '', checkMatch: '', items: {} },
					allCatsForThisUser: {},
					userId: '',
					uOg: 'user',
					showItems: false,
					redirectLink: '',
					amountOfItemsInCat: 0,
					newCat: { name: '', avatar: '', checkMatch: '', items: {} }
				});
			} else {
				// console.log('deleting group catagory');

				var sendCatDelGroup = {
					userId: this.state.userId,
					newCats: chagedCats,
					newItemsToSave: newChangedUnCatItems,
					userCatsIndexed: clientSideCatIndexer
				};
				// console.log('sendCatDelUser', sendCatDelGroup);
				this.props.editCat(sendCatDelGroup);
				RedirectTo(this.state.redirectLink);
				this.setState({
					catToEdit: '',
					currentCatToEdit: { name: '', avatar: '', checkMatch: '', items: {} },
					allCatsForThisUser: {},
					userId: '',
					uOg: 'user',
					showItems: false,
					redirectLink: '',
					amountOfItemsInCat: 0,
					newCat: { name: '', avatar: '', checkMatch: '', items: {} }
				});
			}
		}
		//name changed
		else {
			//need to run the following checks
			//1 if the current cat is used for any other items and remove it
			//2 if the current cat has any items that need their cat changed
			//3 if it is not used or has its own items it can simply be removed
			//4 set up the cat indexer for saving to db
			//5 save changes to db and redux
			ArrayFromState.forEach((catMap: i_BaseInterface_Category) => {
				if (catMap.checkMatch !== this.state.catToEdit) {
					chagedCats = {
						...chagedCats,
						[catMap.checkMatch]: catMap
					};
				}
				if (catMap.checkMatch === this.state.catToEdit) {
					chagedCats = {
						...chagedCats,
						[this.state.newCat.checkMatch]: {
							...this.state.newCat,
							items: catMap.checkMatch === this.state.catToEdit ? catMap.items : {}
						}
					};
				}
				convertObjectToArray(catMap.items).forEach((itemMap: i_BaseInterface_Item) => {
					if (catMap.checkMatch !== this.state.catToEdit) {
						chagedCats = {
							...chagedCats,
							[catMap.checkMatch]: {
								...catMap,
								items: {
									...chagedCats[catMap.checkMatch]?.items,
									[itemMap.id]: {
										...itemMap,
										categories: itemMap.categories.filter((e) => e !== this.state.catToEdit)
									}
								}
							}
						};
					} else {
						var old: string[] = itemMap.categories.filter((e) => e !== this.state.catToEdit);
						old.push(this.state.newCat.checkMatch);
						newChangedUnCatItems = {
							...newChangedUnCatItems,
							[itemMap.id]: {
								...itemMap,
								id: itemMap.id,
								categories: old
							}
						};
						chagedCats = {
							...chagedCats,
							[this.state.newCat.checkMatch]: {
								name: this.state.newCat.name,
								avatar: this.state.newCat.avatar,
								checkMatch: this.state.newCat.checkMatch,
								items: newChangedUnCatItems
							}
						};
					}
				});
			});
			convertObjectToArray(chagedCats).forEach((cat: i_BaseInterface_Category) => {
				if (cat.checkMatch !== this.state.catToEdit) {
					clientSideCatIndexer = {
						...clientSideCatIndexer,
						[cat.checkMatch]: cat
					};
				}
				convertObjectToArray(cat.items).forEach((item: i_BaseInterface_Item) => {
					clientSideCatIndexer = {
						...clientSideCatIndexer,
						[cat.checkMatch]: {
							...cat,
							items: cat.items !== undefined && {
								...clientSideCatIndexer[cat.checkMatch]?.items,
								[item.id]: {
									id: item.id,
									categories: item.categories
								}
							}
						}
					};
					return clientSideCatIndexer;
				});
				return clientSideCatIndexer;
			});
			// console.log('newChangedUnCatItems', newChangedUnCatItems);
			// console.log('chagedCats', chagedCats);
			// console.log('clientSideCatIndexer', clientSideCatIndexer);

			if (this.state.uOg === 'user') {
				// console.log('deleting user catagory');
				var sendCatDelUser1 = {
					userId: this.state.userId,
					newCats: chagedCats,
					newItemsToSave: newChangedUnCatItems,
					userCatsIndexed: clientSideCatIndexer
				};
				// console.log('sendCatDelUser1', sendCatDelUser1);
				this.props.User_Edit_Cat(sendCatDelUser1);
				RedirectTo(this.state.redirectLink);
				this.setState({ catToEdit: '' });
			} else {
				// console.log('deleting group catagory');
				var sendCatDelGroup1 = {
					userId: this.state.userId,
					newCats: chagedCats,
					newItemsToSave: newChangedUnCatItems,
					userCatsIndexed: clientSideCatIndexer
				};
				// console.log('sendCatDelUser', sendCatDelGroup1);
				this.props.editCat(sendCatDelGroup1);
				RedirectTo(this.state.redirectLink);
				this.setState({
					catToEdit: '',
					currentCatToEdit: { name: '', avatar: '', checkMatch: '', items: {} },
					allCatsForThisUser: {},
					userId: '',
					uOg: 'user',
					showItems: false,
					redirectLink: '',
					amountOfItemsInCat: 0,
					newCat: { name: '', avatar: '', checkMatch: '', items: {} }
				});
			}
		}
	}

	render() {
		return (
			<>
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonTitle>
								{CombinedString.profileSettingsChangeCat} : <br />
								<b>{this.state.catToEdit}</b>
							</IonTitle>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonTitle>
								{CombinedString.profileSettingsCatContains} {this.state.amountOfItemsInCat} {Translate(lsInj.transDict.ItemMultiple)}
							</IonTitle>
						</IonCol>
					</IonRow>

					<IonRow>
						<IonItem lines='none' style={{ width: '100%' }}>
							<IonLabel class='ion-text-wrap'>{CombinedString.profileSettingsChangeCat}</IonLabel>
							<IonSelect
								value={this.state.newCat}
								placeholder={this.state.newCat.name}
								onIonChange={(e) => this.setCatStringChange(e)}
								cancelText={Translate(lsInj.transDict.Cancel)}
								okText={Translate(lsInj.transDict.Done)}>
								{convertObjectToArray(AppStartGloabalBase_Categories(this.props.userLang)).map((i, index) => {
									return (
										<IonSelectOption key={index} value={i}>
											{i.name}
										</IonSelectOption>
									);
								})}
							</IonSelect>
						</IonItem>
					</IonRow>

					<IonRow>
						{this.state.showItems &&
							convertObjectToArray(this.state.currentCatToEdit.items).map((item, index) => {
								return (
									<IonCol size='6' key={index}>
										<IonCard>
											<img src={item.avatar} alt='broken'></img>
											<IonCardHeader>{item.name}</IonCardHeader>
										</IonCard>
									</IonCol>
								);
							})}
					</IonRow>

					<IonRow>
						<IonCol>
							{this.state.amountOfItemsInCat > 0 && (
								<IonButton onClick={() => this.setState({ showItems: !this.state.showItems })}>
									{Translate(lsInj.transDict.SeeAll) + ' ' + Translate(lsInj.transDict.items)}
								</IonButton>
							)}
						</IonCol>

						<IonCol>
							<IonButton onClick={() => this.changeCatName()}>{Translate(lsInj.transDict.Edit)}</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
			</>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('ownProps', ownProps);

	var total = ownProps.currentCat !== undefined ? convertObjectToArray(ownProps.currentCat.items).length : 0;

	return {
		allCatsForUser: ownProps.allCats !== undefined ? ownProps.allCats : {},
		currentCat: ownProps.currentCat !== undefined ? ownProps.currentCat : {},
		redirectLink: ownProps.redirectLink !== undefined ? ownProps.redirectLink : '',
		userId: ownProps.userId !== undefined ? ownProps.userId : '',
		uOg: ownProps.userOrGroup !== undefined ? ownProps.userOrGroup : 'user',
		itemsTotal: total
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		User_Edit_Cat: (cat: NamedDict<i_BaseInterface_Category>) => dispatch(User_Category_Edit(cat)),
		editCat: (cat: any) => dispatch(Group_EditCats(cat))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(CatagoryEditView);
