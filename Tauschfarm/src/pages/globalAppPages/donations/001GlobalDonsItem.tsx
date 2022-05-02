import React, { Component, Dispatch } from 'react';
import { IonPage, IonHeader, IonContent, IonButton, IonModal, IonLabel, IonItem } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/reduxModels';
import ItemView from '../../../layout/AppComponents/ItemView';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { iSendMsgModel } from '../../../models/008ChatModels';
import { User_SendMessageFromChatApp } from '../../../services/redux/actions/userActions/007UserChats';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { i_BaseInterface_User } from '../../../models/001UserModels';
import { i_BaseInterface_Donation } from '../../../models/0003DonationModels';
import { NamedDict } from '../../../services/helpers/Tools';

export class GlobalDonsItem extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			openModal: false
		};
	}
	sendMsgForItem() {
		const { donItem, currentUser, peer_user } = this.props;

		const from = currentUser.id;
		const to = donItem.userWhoAddedItem.id.split('-')[0];

		const idString = `${from}-${to}`;
		// console.log('idString', idString);

		var msg: iSendMsgModel = {
			ts: new Date().getTime(),
			idFrom: from,
			idTo: to,
			content: {
				msgString: Translate(lsInj.transDict.WantItemMsg),
				image: donItem.avatar,
				id: donItem.id,
				name: donItem.name,
				brand: donItem.brand,
				size: donItem.size,
				color: donItem.color,
				length: donItem.length,
				avatar: donItem.avatar
			},
			noticationSetttings: peer_user,
			id: idString,
			itemPost: true
		};

		// console.log('msg', msg);

		this.props.sendMsg(msg);
	}

	render() {
		const { donItem, global } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>

					<br />
					<br />
					<br />
					{donItem !== undefined && <ItemView item={donItem} catN={''} showDonFab={false} showFab={false} uOg={'user'} currentUser={this.props.currentUser} groupID={''} />}
					{global && <IonButton onClick={() => this.sendMsgForItem()}>{Translate(lsInj.transDict.IWantThis)}</IonButton>}

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
	const uDons = state.user.donations;
	var gDons: NamedDict<i_BaseInterface_Donation> = {};

	convertObjectToArray(state.globalUsers.GlobalUsers).map((user: i_BaseInterface_User) => {
		convertObjectToArray(user.donations).map((don: i_BaseInterface_Donation) => {
			gDons = {
				...gDons,
				[don.id]: don
			};
			return gDons;
		});
		return gDons;
	});

	const uuDons = state.user.donations;
	const dons = { ...uDons, ...gDons, ...uuDons };

	const itemId = ownProps.match.params.itemname;

	const idToUseForCheck = itemId.split('-');

	const global = idToUseForCheck[0] !== state.user.id ? true : false;

	// console.log('dons', dons, itemId, dons[itemId]);

	const search = dons[itemId].userWhoAddedItem.id;
	const peer_user = state.globalUsers.GlobalUsers[search] !== undefined ? state.globalUsers.GlobalUsers[search].notifyToken : '';

	return {
		donItem: dons[itemId],
		currentUser: state.user,
		global,
		peer_user
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		sendMsg: (msgContent: iSendMsgModel) => dispatch(User_SendMessageFromChatApp(msgContent))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalDonsItem);
