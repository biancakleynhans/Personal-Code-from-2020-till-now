import React, { Component, Dispatch } from 'react';
import { i_BaseInterface_Category } from '../../models/002CatagoryModels';
import { User_Category_Delete } from '../../services/redux/actions/userActions/002CatagoryActions';
import { connect } from 'react-redux';
import { IonButton, IonTitle, IonGrid, IonRow, IonCol, IonCard, IonCardHeader } from '@ionic/react';
import { NamedDict } from '../../services/helpers/Tools';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import { TypesToFirebaseGlobals } from '../../services/firebase/TypesToServer';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { RedirectTo } from '../Loading_Redirecting/CommonUIServices';
import { CombinedString } from '../../services/translate/CombinedStrings';
import { i_BaseInterface_Item } from '../../models/006ItemModels';
import { IAppState } from '../../services/redux/reduxModels';
import { Group_DeleteCats } from '../../services/redux/actions/userActions/006GroupsActions';

interface iState {
	catToEdit: string;
	showModal: boolean;
	showItems: boolean;
	currentCatToDelete: i_BaseInterface_Category;
	allCatsForThisUser: NamedDict<i_BaseInterface_Category>;
	userId: string;
	uOg: 'user' | 'group';
	redirectLink: string;
	amountOfItemsInCat: number;
}

class CatagoryDeleteView extends Component<any, iState> {
	constructor(props: any) {
		super(props);

		const { currentCat, allCatsForUser, userId, uOg, redirectLink, itemsTotal } = this.props;

		this.state = {
			catToEdit: currentCat.checkMatch,
			currentCatToDelete: currentCat,
			allCatsForThisUser: allCatsForUser,
			userId: userId,
			uOg: uOg,
			showModal: false,
			showItems: false,
			redirectLink: redirectLink,
			amountOfItemsInCat: itemsTotal
		};
		this.DeleteCategory = this.DeleteCategory.bind(this);
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.currentCat !== this.props.currentCat) {
			this.setState({
				catToEdit: this.props.currentCat.checkMatch,
				currentCatToDelete: this.props.currentCat,
				allCatsForThisUser: this.props.allCatsForUser,
				userId: this.props.userId,
				uOg: this.props.uOg,
				showModal: false,
				showItems: false,
				redirectLink: this.props.redirectLink,
				amountOfItemsInCat: this.props.itemsTotal
			});
		}
	}

	DeleteCategory() {
		const ArrayFromState = convertObjectToArray(this.state.allCatsForThisUser);
		const deleter = this.state.currentCatToDelete.checkMatch;
		var chagedCats: NamedDict<i_BaseInterface_Category> = {};
		var newChangedUnCatItems: NamedDict<i_BaseInterface_Item> = {};
		var clientSideCatIndexer: NamedDict<any> = {};

		if (window.confirm(Translate(lsInj.transDict.delCat))) {
			// console.log('user agreed to delete ', this.state.currentCatToDelete);
			//Uncategorized cat cannot be removed
			if (this.state.currentCatToDelete.name === 'Uncategorized') {
				alert(Translate(lsInj.transDict.deleteDefCat));
				this.setState({ catToEdit: '' });
				RedirectTo(this.props.redirectLink);
			}
			//Not Uncategorized can proceed
			else {
				// console.log('Not Uncategorized can proceed', this.state);

				//need to run the following checks
				//1 if the current cat is used for any other items and remove it
				//2 if the current cat has any items that need their cat changed
				//3 if it is not used or has its own items it can simply be removed
				//4 set up the cat indexer for saving to db
				//5 save changes to db and redux

				ArrayFromState.forEach((catMap: i_BaseInterface_Category) => {
					if (catMap.checkMatch !== deleter) {
						chagedCats = {
							...chagedCats,
							[catMap.checkMatch]: catMap
						};
					}
					convertObjectToArray(catMap.items).forEach((itemMap: i_BaseInterface_Item) => {
						if (catMap.checkMatch !== deleter) {
							chagedCats = {
								...chagedCats,
								[catMap.checkMatch]: {
									...catMap,
									items: {
										...chagedCats[catMap.checkMatch]?.items,
										[itemMap.id]: {
											...itemMap,
											categories: itemMap.categories.filter((e) => e !== deleter)
										}
									}
								}
							};
						} else {
							newChangedUnCatItems = {
								...newChangedUnCatItems,
								[`${itemMap.id}-Uncategorized`]: {
									...itemMap,
									id: `${itemMap.id}-Uncategorized`,
									categories: ['Uncategorized']
								}
							};

							chagedCats = {
								...chagedCats,
								// eslint-disable-next-line
								['Uncategorized']: {
									name: 'Uncategorized',
									avatar: TypesToFirebaseGlobals.placeholderImg,
									checkMatch: 'Uncategorized',
									items: newChangedUnCatItems
								}
							};
						}
					});
				});

				convertObjectToArray(chagedCats).map((cat: i_BaseInterface_Category) => {
					if (cat.checkMatch !== deleter) {
						clientSideCatIndexer = {
							...clientSideCatIndexer,
							[cat.checkMatch]: cat
						};
					}
					convertObjectToArray(cat.items).map((item: i_BaseInterface_Item) => {
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

				// console.log('chagedCats', chagedCats, newChangedUnCatItems);
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
					this.props.User_Delete_Cat(sendCatDelUser);
					RedirectTo(this.state.redirectLink);
					this.setState({
						catToEdit: '',
						currentCatToDelete: {
							name: '',
							avatar: '',
							checkMatch: '',
							items: {}
						},
						allCatsForThisUser: {},
						userId: '',
						uOg: 'user',
						showItems: false,
						redirectLink: '',
						amountOfItemsInCat: 0
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
					this.props.Group_Delete_Cat(sendCatDelGroup);
					RedirectTo(this.state.redirectLink);
					this.setState({
						catToEdit: '',
						currentCatToDelete: {
							name: '',
							avatar: '',
							checkMatch: '',
							items: {}
						},
						allCatsForThisUser: {},
						userId: '',
						uOg: 'user',
						showItems: false,
						redirectLink: '',
						amountOfItemsInCat: 0
					});
				}
			}
		}
		//USER DID NOT CONFIRM DELETE
		else {
			// console.log('user did not agree to delete ');
			this.setState({ catToEdit: '' });
			RedirectTo(this.state.redirectLink);
		}
	}

	disp() {
		var returnArr: any[] = [];
		if (this.state.currentCatToDelete.items !== undefined) {
			convertObjectToArray(this.state.currentCatToDelete.items).map((item, index: number) => {
				returnArr.push(
					<IonCol size='6' key={index}>
						<IonCard>
							<img src={item.avatar} alt='broken'></img>
							<IonCardHeader>{item.name}</IonCardHeader>
						</IonCard>
					</IonCol>
				);
				return returnArr;
			});
			return returnArr;
		} else {
			return <>{CombinedString.profileSettingsCatNoItems}</>;
		}
	}

	render() {
		return (
			<>
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonTitle>
								{CombinedString.profileSettingsCatToDel} : <br />
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
						<IonCol>
							{this.state.amountOfItemsInCat > 0 && (
								<IonButton onClick={() => this.setState({ showItems: !this.state.showItems })}>
									{Translate(lsInj.transDict.SeeAll) + ' ' + Translate(lsInj.transDict.items)}
								</IonButton>
							)}
						</IonCol>

						<IonCol>
							<IonButton onClick={() => this.DeleteCategory()}>{Translate(lsInj.transDict.Delete)}</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>{this.state.showItems && this.disp()}</IonRow>
				</IonGrid>

				{/* {this.state.showModal && (
					<ConfirmDoneModal rl={this.props.redirectLink} />
				)} */}
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
		User_Delete_Cat: (cat: any) => dispatch(User_Category_Delete(cat)),
		Group_Delete_Cat: (data: any) => dispatch(Group_DeleteCats(data))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(CatagoryDeleteView);
