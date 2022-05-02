import React, { Component, Dispatch } from 'react';
import { IonContent, IonPage, IonHeader, IonItem, IonAvatar, IonList, IonLabel, IonToolbar, IonSearchbar, IonButton, IonIcon } from '@ionic/react';
import { connect } from 'react-redux';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import ChatHeader from '../../layout/Headers/ChatHeader';
import { IAppState } from '../../services/redux/reduxModels';
import { NamedDict } from '../../services/helpers/Tools';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { iDeleteChatMsg } from './ChatBox';
import { User_DeleteChatFromChatApp } from '../../services/redux/actions/userActions/007UserChats';
import { trashBin } from 'ionicons/icons';
import { i_BaseInterface_Chat } from '../../models/008ChatModels';
import { RedirectTo } from '../../layout/Loading_Redirecting/CommonUIServices';
import { AllRoutesListed } from '../../routes/AllRoutesListed';

interface iState {
	chatsOrContacts: boolean;
	searchText: string;
	searching: boolean;
	resultFromSearch: any[];
}

class ChatContainerPage extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			chatsOrContacts: false,
			searchText: '',
			searching: false,
			resultFromSearch: []
		};
	}

	deleteMsg(msg: i_BaseInterface_Chat) {
		// console.log('msg id', msg);

		if (window.confirm('Delete chat')) {
			console.log('path', `${msg.idFrom}/msgHistory/${msg.idTo}`);
			console.log('path2', `${msg.idTo}/msgHistory/${msg.idFrom}`);
			var send: iDeleteChatMsg = {
				path1: {
					userId: msg.idFrom,
					chatwith: msg.idTo,
					chat: undefined
				},
				path2: {
					userId: msg.idTo,
					chatwith: msg.idFrom,
					chat: undefined
				}
			};
			this.props.deleteMsg(send);
			RedirectTo(AllRoutesListed.chatSide.root);
		} else {
			console.log('user did not accept delete of chat');
			RedirectTo(AllRoutesListed.chatSide.root);
		}
	}

	renderChats() {
		const { currentUser, GlobalAppUsersAsContacts } = this.props;
		var returnArr: JSX.Element[] = [];
		const keys = Object.keys(currentUser.msgHistory);
		// console.log('keys', keys);
		// console.log('GlobalAppUsersAsContacts', GlobalAppUsersAsContacts);

		keys.map((key: string, index: number) => {
			const l1 = convertObjectToArray(currentUser.msgHistory[key], true);
			const l2 = l1.slice(l1.length - 1, l1.length)[0];
			// console.log('????', currentUser.msgHistory[key]);
			// console.log('l1', l1);
			// console.log('l2', l2);
			// console.log('get relevant global user', GlobalAppUsersAsContacts[key]);

			if (l2 !== undefined && GlobalAppUsersAsContacts !== undefined && GlobalAppUsersAsContacts[key] !== undefined) {
				returnArr.push(
					//
					<IonItem key={index} routerLink={`/chats/${currentUser.id}/withUser/${GlobalAppUsersAsContacts[key].id}`}>
						<IonAvatar slot='start'>
							<img src={GlobalAppUsersAsContacts[key].avatar} alt='broken' />
						</IonAvatar>
						<IonLabel class='ion-text-wrap'>
							{GlobalAppUsersAsContacts[key].name} <br />
							{/* last available chat with this user */}
							{l2 !== undefined ? l2.content.msgString : 'image'}
						</IonLabel>
						<IonButton
							// class='message-timestamp'
							fill='clear'
							onClick={() => {
								this.deleteMsg(l2);
							}}>
							<IonIcon style={{ opacity: 0.5 }} color='dark' icon={trashBin} />
						</IonButton>
					</IonItem>
				);
				return returnArr;
			}
			return returnArr;
		});
		return <IonList>{returnArr}</IonList>;
	}

	renderContacts() {
		const { GlobalAppUsersAsContacts, currentUser } = this.props;
		var returnArr: JSX.Element[] = [];
		var arr: JSX.Element[] = [];

		if (this.state.searching && this.state.searchText.length > 0) {
			// console.log('searching...');
			// console.log('search res ', this.state.resultFromSearch);

			if (this.state.resultFromSearch.length > 0) {
				// console.log('res is here');
				// console.log('result', this.state.resultFromSearch);
				this.state.resultFromSearch.map((user: any, index: number) => {
					arr.push(
						<IonItem key={index} routerLink={`/chats/${currentUser.id}/withUser/${user.id}`}>
							<IonAvatar slot='start'>
								<img src={user.avatar} alt='broken' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap'>{user.name}</IonLabel>
						</IonItem>
					);
					return arr;
				});
				return <IonList>{arr}</IonList>;
			} else {
				return <>No user Found...</>;
			}
		} else {
			// console.log('not searching...');
			convertObjectToArray(GlobalAppUsersAsContacts).map((user, index: number) => {
				returnArr.push(
					<IonItem key={index} routerLink={`/chats/${currentUser.id}/withUser/${user.id}`}>
						<IonAvatar slot='start'>
							<img src={user.avatar} alt='broken' />
						</IonAvatar>
						<IonLabel class='ion-text-wrap'>{user.name}</IonLabel>
					</IonItem>
				);
				return returnArr;
			});
			return <IonList>{returnArr}</IonList>;
		}
	}

	setSearchText(e: any) {
		const { GlobalAppUsersAsContacts } = this.props;
		const searchString = e.detail.value;
		var arr: any[] = [];

		if (searchString.length > 0) {
			// console.log('searchUser', searchString, searchString.length);

			convertObjectToArray(GlobalAppUsersAsContacts).map((user) => {
				// console.log('user', user);
				if (user.name.includes(searchString)) {
					// console.log('res user', user);
					arr.push(user);
					return arr;
				}
				if (user.name.includes(searchString.toUpperCase())) {
					// console.log('res user', user);
					arr.push(user);
					return arr;
				}
				if (user.name.includes(searchString.toLowerCase())) {
					// console.log('res user', user);
					arr.push(user);
					return arr;
				} else {
					// console.log('not found user');
					return arr;
				}
			});
			this.setState({ searching: true, searchText: searchString });

			return this.setState({ resultFromSearch: arr });
		} else {
			this.setState({ searching: false, searchText: searchString });
		}
	}

	render() {
		return (
			<IonPage>
				{/*  className='chatRoot' style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'row' }} */}
				{/* style={{ flex: '0 0 30%' }} */}
				<IonContent>
					<IonHeader>
						<ChatHeader
							ChatsFunc={() => this.setState({ chatsOrContacts: !this.state.chatsOrContacts })}
							ContactsFunc={() => this.setState({ chatsOrContacts: !this.state.chatsOrContacts })}
							selectedOne={this.state.chatsOrContacts}
							userUnreadMsg={10}
						/>
					</IonHeader>

					{this.state.chatsOrContacts ? (
						<IonToolbar>
							<IonSearchbar placeholder={Translate(lsInj.transDict.Search)} value={this.state.searchText} onIonChange={(e) => this.setSearchText(e)}></IonSearchbar>
						</IonToolbar>
					) : (
						<></>
					)}

					{this.state.chatsOrContacts ? this.renderContacts() : this.renderChats()}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	const globalUsers = state.globalUsers.GlobalUsers;
	var globalcontacts: NamedDict<any> = {};
	// console.log('msg history', state.user.msgHistory);

	convertObjectToArray(globalUsers).forEach((user) => {
		// console.log('user', user);
		if (user.id) {
			globalcontacts = {
				...globalcontacts,
				[user.id]: {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				}
			};
			return globalcontacts;
		}
		return globalcontacts;
	});

	return {
		currentUser: state.user,
		GlobalAppUsersAsContacts: globalcontacts
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		deleteMsg: (msgDel: iDeleteChatMsg) => dispatch(User_DeleteChatFromChatApp(msgDel))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainerPage);
