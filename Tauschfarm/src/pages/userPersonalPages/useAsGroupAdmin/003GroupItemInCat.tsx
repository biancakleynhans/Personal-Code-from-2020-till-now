import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent, IonHeader, IonButton, IonModal, IonLabel, IonItem, IonCard } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import ItemView from '../../../layout/AppComponents/ItemView';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { IAppState } from '../../../services/redux/reduxModels';
import { iSendMsgModel } from '../../../models/008ChatModels';
import { User_SendMessageFromChatApp } from '../../../services/redux/actions/userActions/007UserChats';
import CategoriesToChosefrom from '../../../services/translate/OptionsDict/CatagoriesToChoseFrom';
import { User_Move_Item_To_Donations } from '../../../services/redux/actions/userActions/004DonationsActions';
import { i_Redux_ActionFunc_Interface_Item_MoveTo_Donations } from '../../../models/006ItemModels';
import { CombinedString } from '../../../services/translate/CombinedStrings';
import { DonsFunctionBeforeMoveitemtoDons } from '../../../services/helpers/DonsFunctionBeforeMoveitemtoDons';

class GroupItemInCat extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			donated: false,
			openModal: false
		};
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
		window.location.replace('/userDonations');
	}

	sendMsgForItem() {
		const { item, currentUser, peer_user } = this.props;

		const from = currentUser.id;
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
		const { item, catName, type, showFab } = this.props;
		// const fab = type === 'user' ? true : false;
		// console.log('fab', fab);
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(CategoriesToChosefrom.transDict[catName])} />
					</IonHeader>
					<br />
					<br />
					<br />
					{item !== undefined && (
						<ItemView item={item} catN={catName} showDonFab={false} showFab={showFab} uOg={'group'} currentUser={this.props.currentUser} groupID={this.props.group} />
					)}

					<br />
					<br />

					{type === 'global' && item !== undefined && <IonButton onClick={() => this.sendMsgForItem()}>{Translate(lsInj.transDict.IWantThis)} !</IonButton>}

					{type === 'user' && item !== undefined && <IonButton onClick={() => this.donatateItem()}>{CombinedString.ItemDonate} !</IonButton>}

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

					{this.state.donated && <IonCard>{Translate(lsInj.transDict.checkdon)}</IonCard>}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('Group_ItemInCat', ownProps);

	// console.log('State from item', state, ownProps);
	const groupname = ownProps.match.params.groupname;
	const catname = ownProps.match.params.catname;
	const itemname = ownProps.match.params.itemId;

	// console.log('PROPS', groupname, catname, itemname);

	const showFab = ownProps.match.params.groupname.split('-')[0] === state.user.id ? true : false;

	const user = state.groups.UserGroups[groupname] !== undefined ? state.groups.UserGroups[groupname] : undefined;
	const global = state.groups.GlobalGroups[groupname] !== undefined ? state.groups.GlobalGroups[groupname] : undefined;

	// console.log('user', user);
	// console.log('global', global);

	const checkG = global?.categories !== undefined ? global.categories[catname]?.items : {};
	const checkU = user?.categories !== undefined ? user.categories[catname]?.items : {};

	const type = global !== undefined ? 'global' : 'user';

	// console.log('checkU', checkU);
	// console.log('checkG', checkG);
	// console.log('type', type);

	const checkGI = checkG[itemname] !== undefined ? checkG[itemname] : checkU[itemname] !== undefined ? checkU[itemname] : undefined;

	// console.log('checkGI', checkGI);

	//here is logic that is done for only the dons part but is verry needed do not ever remove
	const sendThis = DonsFunctionBeforeMoveitemtoDons(state.user.categories, state.groups.UserGroups, state.user.id);

	const search = checkGI !== undefined ? checkGI.userWhoAddedItem.id : state.user.id;
	const peer_user = state.globalUsers.GlobalUsers[search] !== undefined ? state.globalUsers.GlobalUsers[search].notifyToken : '';

	return {
		type: type,
		item: checkGI,
		catName: catname,
		group: groupname,
		currentUser: state.user,
		itemIidToMove: itemname,
		donsCats: sendThis,
		user: state.user,
		peer_user,
		showFab
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		DonatateItem: (itemData: i_Redux_ActionFunc_Interface_Item_MoveTo_Donations) => dispatch(User_Move_Item_To_Donations(itemData)),
		sendMsg: (msgContent: iSendMsgModel) => dispatch(User_SendMessageFromChatApp(msgContent))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupItemInCat);
