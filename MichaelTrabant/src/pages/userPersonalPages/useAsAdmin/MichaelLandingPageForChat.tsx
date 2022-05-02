import React, { Component } from 'react';
import { IonContent, IonPage, IonHeader, IonItem, IonList, IonLabel, IonToolbar, IonSearchbar } from '@ionic/react';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/ReduxModels';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { i_BaseInterface_User } from '../../../models/001UserModels';
import ChatHeader from '../../../layout/Headers/ChatHeader';

interface iState {
	chatsOrContacts: boolean;
	searchText: string;
	searching: boolean;
	resultFromSearch: any[];
}

class MichaelLandingPageForChat extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			chatsOrContacts: false,
			searchText: '',
			searching: false,
			resultFromSearch: [],
		};
	}

	renderChats() {
		const { userChats } = this.props;
		var returnArr: JSX.Element[] = [];
		// console.log('userChats', userChats);
		userChats.forEach((user: any) => {
			// console.log('selectedChat', user.msgHistory);
			const l1 = convertObjectToArray(user.msgHistory);
			const l2 = convertObjectToArray(l1);
			const l3 = l2.slice(l2.length - 1, l2.length)[0];
			// console.log('???', l3.content);
			if (l3 !== undefined) {
				returnArr.push(
					<IonItem key={user.id} routerLink={`/dashboard/chat/${user.id}`}>
						<IonLabel>
							{user.name} <br />
							{l3 !== undefined ? l3.content.msgString : ''}
							{/* last available chat with this user */}
						</IonLabel>
					</IonItem>,
				);
				return returnArr;
			} else {
				returnArr.push(<React.Fragment key={user.id}></React.Fragment>);
			}
		});
		return <IonList>{returnArr}</IonList>;
	}

	renderContacts() {
		const { GlobalAppUsersAsContacts } = this.props;
		var returnArr: JSX.Element[] = [];
		var arr: JSX.Element[] = [];
		if (this.state.searching && this.state.searchText.length > 0) {
			// console.log('searching...');
			// console.log('search res ', this.state.resultFromSearch);
			if (this.state.resultFromSearch.length > 0) {
				// console.log('res is here');
				// console.log('result', this.state.resultFromSearch);
				this.state.resultFromSearch.map((user: any) => {
					arr.push(
						<IonItem key={user.id} routerLink={`/dashboard/chat/${user.id}`}>
							{/* <IonAvatar slot='start'> */}
							{/* <img src={user.avatar} alt='broken' /> */}
							{/* </IonAvatar> */}
							<IonLabel>{user.name}</IonLabel>
						</IonItem>,
					);
					return arr;
				});
				return <IonList>{arr}</IonList>;
			} else {
				return <>No user Found...</>;
			}
		} else {
			// console.log('not searching...');
			convertObjectToArray(GlobalAppUsersAsContacts).map((user) => {
				console.log('usr', user);
				returnArr.push(
					<IonItem lines='full' key={user.id} routerLink={`/dashboard/chat/${user.id}`}>
						<IonLabel style={{ color: 'white' }}>{user.name}</IonLabel>
					</IonItem>,
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
							<IonSearchbar color='secondary' value={this.state.searchText} onIonChange={(e) => this.setSearchText(e)}></IonSearchbar>
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

const mapStateToProps = (state: IAppState, OwnProps: any) => {
	// console.log('OwnProps', OwnProps.match.params.userId);
	// console.log('msg history Owner side', state.owner.globalUsers);

	var currentChats: any[] = [];

	const keys = state.user.msgHistory !== undefined ? Object.keys(state.user.msgHistory) : [];
	// console.log('keys', keys);

	keys.forEach((key: string) => {
		// const slitKey = key.split('-');
		convertObjectToArray(state.owner.globalUsers).forEach((user: i_BaseInterface_User) => {
			if (key === user.id) {
				console.log('matched', user);
				currentChats.push({
					name: user.name,
					id: user.id,
					msgHistory: user.msgHistory[state.owner.owner.id],
				});
			}
		});
	});
	// console.log('currentChats', currentChats);

	return {
		currentUser: state.user,
		GlobalAppUsersAsContacts: state.owner.globalUsers,
		userChats: currentChats,
	};
};

export default connect(mapStateToProps)(MichaelLandingPageForChat);
