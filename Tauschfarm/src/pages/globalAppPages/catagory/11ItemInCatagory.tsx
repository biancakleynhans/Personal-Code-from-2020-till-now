import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonButton, IonHeader, IonModal, IonLabel, IonItem } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import ItemView from '../../../layout/AppComponents/ItemView';
import { IAppState } from '../../../services/redux/reduxModels';
import { iSendMsgModel } from '../../../models/008ChatModels';
import { User_SendMessageFromChatApp } from '../../../services/redux/actions/userActions/007UserChats';

interface iState {
	openModal: boolean;
}

class ItemInCategory extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			openModal: false
		};
	}
	sendMsgForItem() {
		const { item, currentUser, peerToken } = this.props;

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
			noticationSetttings: peerToken,
			id: idString,
			itemPost: true
		};

		// console.log('msg', msg);
		this.props.sendMsg(msg);
	}
	render() {
		const { item, currentUser } = this.props;
		// console.log('ITEM IN CAT ', 'USER MANUAL ENTER');
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					{item !== undefined && <ItemView item={item} uOg={'user'} catN={''} showDonFab={false} showFab={false} currentUser={currentUser} groupID={''} />}
					<br />
					<br />
					<IonButton onClick={() => this.sendMsgForItem()}>{Translate(lsInj.transDict.IWantThis)} !</IonButton>
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
	// console.log('ownProps', ownProps, 'state', state);
	const stateCat = state.globalUsers.GlobalUsers[ownProps.match.params.userId].categories;
	const type = ownProps.match.params.catname;
	const itemId = ownProps.match.params.itemId;

	// console.log('current', stateCat, stateCat[type]);
	const search = stateCat[type].items[itemId].userWhoAddedItem.id;
	const peer_user = state.globalUsers.GlobalUsers[search].notifyToken !== undefined ? state.globalUsers.GlobalUsers[search].notifyToken : '';

	return {
		item: stateCat[type].items[itemId],
		cat: type,
		currentUser: state.user,
		peerToken: peer_user
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		sendMsg: (msgContent: iSendMsgModel) => dispatch(User_SendMessageFromChatApp(msgContent))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInCategory);
