import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonButton, IonHeader, IonCard, IonModal, IonItem, IonLabel } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { IAppState } from '../../../../services/redux/reduxModels';
import { connect } from 'react-redux';
import { User_Move_Item_To_Donations } from '../../../../services/redux/actions/userActions/004DonationsActions';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { i_BaseInterface_Item, i_Redux_ActionFunc_Interface_Item_MoveTo_Donations } from '../../../../models/006ItemModels';
import ItemView from '../../../../layout/AppComponents/ItemView';
import { iSendMsgModel } from '../../../../models/008ChatModels';
import { User_SendMessageFromChatApp } from '../../../../services/redux/actions/userActions/007UserChats';
import { DonsFunctionBeforeMoveitemtoDons } from '../../../../services/helpers/DonsFunctionBeforeMoveitemtoDons';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';

class UserItem extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			donated: false
		};

		this.donatateItem = this.donatateItem.bind(this);
	}

	donatateItem() {
		const { item, itemIidToMove, donsCats, user } = this.props;
		this.setState({ donated: true });
		var sendingData: i_Redux_ActionFunc_Interface_Item_MoveTo_Donations = {
			userId: user.id, //item.userWhoAddedItem.id,
			itemToMove: item,
			itemId: itemIidToMove,
			catToremoveFrom: item.categories,
			dateMoved: new Date(),
			moveObj: {
				id: itemIidToMove,
				categories: item.categories
			},
			allCatsForThisUser: donsCats
		};
		this.props.DonatateItem(sendingData);
		// window.location.replace('/userDonations');
		RedirectTo('/userDonations');
	}

	sendMsgForItem() {
		const { item, user, peer_user } = this.props;

		const from = user.id;
		const to = item.userWhoAddedItem.id.split('-')[0];

		const idString = `${from}-${to}`;
		// console.log('idString', idString);

		var msg: iSendMsgModel = {
			ts: new Date().getTime(),
			idFrom: from,
			idTo: to,
			content: {
				msgString: Translate(lsInj.transDict.WantItemMsg),
				image: item.avatar,
				id: item.id,
				name: item.name,
				brand: item.brand.en,
				size: item.size,
				color: item.color,
				length: item.length,
				avatar: item.avatar
			},
			noticationSetttings: peer_user,
			id: idString,
			itemPost: true
		};

		// console.log('msg', msg);
		this.props.sendMsg(msg);
	}

	render() {
		const { item, itemCatToRemoveFrom, globalOrCurrent, isItAGroup, showFab } = this.props;
		// console.log('USER ITEM', isItAGroup);
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />
					{item !== undefined && (
						<ItemView
							item={item}
							catN={itemCatToRemoveFrom}
							showFab={showFab}
							showDonFab={false}
							uOg={isItAGroup === 'NotGroup' ? 'user' : 'group'}
							currentUser={this.props.user}
							groupID={isItAGroup}
						/>
					)}

					{globalOrCurrent && item !== undefined && <IonButton onClick={() => this.donatateItem()}>{CombinedString.ItemDonate} !</IonButton>}

					{!globalOrCurrent && item !== undefined && <IonButton onClick={() => this.sendMsgForItem()}>{Translate(lsInj.transDict.IWantThis)} !</IonButton>}

					{this.state.donated && item === undefined && <IonCard>{Translate(lsInj.transDict.checkdon)}</IonCard>}

					{this.state.openModal && (
						<IonModal cssClass='Modal1' showBackdrop={true} isOpen={this.state.openModal}>
							<IonItem lines='none'>
								<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.thankYouModalItem)}</IonLabel>
							</IonItem>
							<IonButton
								shape='round'
								size='small'
								onClick={() => {
									return this.setState({ openModal: !this.state.openModal });
								}}>
								{Translate(lsInj.transDict.Close)}
							</IonButton>
						</IonModal>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('State from item', state, ownProps);

	//need to change this
	const Cname = ownProps.match.params.catname;
	const Iname = ownProps.match.params.itemname;
	const UserIdFromItem = ownProps.match.params.userId;
	const isItAGroup = ownProps.match.params.groupId === 'NotGroup' ? 'NotGroup' : ownProps.match.params.groupId === 'undefined' ? 'NotGroup' : 'Group'; //ownProps.match.params.groupId === 'undefined' && ownProps.match.params.groupId !== 'NotGroup' ? 'NotGroup' : 'Group';

	const showFab = ownProps.match.params.userId === state.user.id ? true : false;

	var emptyItem = {} as i_BaseInterface_Item;

	const runcheckUser =
		state.user.id === UserIdFromItem
			? state.user.categories
			: state.globalUsers.GlobalUsers[UserIdFromItem] !== undefined
			? state.globalUsers.GlobalUsers[UserIdFromItem].categories
			: undefined;

	const runcheckGroup =
		state.groups.UserGroups[UserIdFromItem]?.categories !== undefined
			? state.groups.UserGroups[UserIdFromItem].categories
			: state.groups.GlobalGroups[UserIdFromItem]?.categories !== undefined
			? state.groups.GlobalGroups[UserIdFromItem].categories
			: undefined;

	const uOg = runcheckUser !== undefined ? runcheckUser : isItAGroup === 'Group' ? runcheckGroup : undefined;

	const currentCats = uOg !== undefined ? uOg[Cname] : undefined;

	const checkItems = currentCats?.items !== undefined ? currentCats.items[Iname] : emptyItem;

	// console.log('runcheckUser', runcheckUser);
	// console.log('runcheckGroup', runcheckGroup);
	// console.log('uOg', uOg);
	// console.log('currentCats', currentCats);
	// console.log('checkItems', checkItems);

	//here is logic that is done for only the dons part but is verry needed do not ever remove
	const sendThis = DonsFunctionBeforeMoveitemtoDons(state.user.categories, state.groups.UserGroups, state.user.id);

	const search = checkItems !== undefined ? checkItems?.userWhoAddedItem?.id : '';
	const peer_user = state.globalUsers.GlobalUsers[search] !== undefined ? state.globalUsers.GlobalUsers[search].notifyToken : state.user.notifyToken;

	return {
		item: checkItems,
		itemIidToMove: Iname,
		itemCatToRemoveFrom: Cname,
		user: state.user,
		globalOrCurrent: UserIdFromItem === state.user.id ? true : false,
		isItAGroup,
		donsCats: sendThis,
		peer_user,
		showFab
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		DonatateItem: (itemData: i_Redux_ActionFunc_Interface_Item_MoveTo_Donations) => dispatch(User_Move_Item_To_Donations(itemData)),
		sendMsg: (msgContent: iSendMsgModel) => dispatch(User_SendMessageFromChatApp(msgContent))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(UserItem);
