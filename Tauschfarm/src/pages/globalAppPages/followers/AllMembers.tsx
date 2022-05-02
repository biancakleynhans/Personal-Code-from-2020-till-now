import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonHeader, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButton, IonIcon, IonCardSubtitle, IonRouterLink } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { IAppState } from '../../../services/redux/reduxModels';
import { connect } from 'react-redux';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { i_BaseInterface_User, i_BaseInterface_Member, followingData } from '../../../models/001UserModels';
import { TypesToFirebaseGlobals } from '../../../services/firebase/TypesToServer';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { Global_GetAllData_AtStartUp } from '../../../services/redux/actions/GlobalAction';
import { heart, heartOutline } from 'ionicons/icons';
import { User_AddFollowing, User_RemoveFollowing } from '../../../services/redux/actions/userActions/001UserActions';

interface iState {
	sortAtrr: boolean;
}

function sortByTextAsc(a: any, b: any) {
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * diff;
	} else return 1;
}

function sortByTextDsc(a: any, b: any) {
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * -diff;
	} else return 1;
}

export class AllMembers extends Component<any, iState> {
	refresherRef: HTMLIonRefresherElement | undefined;
	constructor(props: any) {
		super(props);
		this.state = {
			sortAtrr: false
		};
	}

	doRefresh() {
		// console.log('Begin async operation', event);
		// setTimeout(() => {
		const { currentUserLoggendIn, getAlldata } = this.props;
		// console.log('Async operation has ended');
		// console.log('Doing the update call');
		getAlldata(currentUserLoggendIn, true);
		// event.detail.complete();
		if (this.refresherRef) {
			// this.refresherRef.current!.complete();
			this.refresherRef.complete();
		}
		// }, 2000);
		// clearTimeout();
	}

	follow(userToFollow: i_BaseInterface_Member, isFollow: boolean) {
		// var confirm = Translate(lsInj.transDict.follow);
		// if (window.confirm(confirm)) {
		// console.log('confirmed to follow user with name ', userToFollow.name);
		// const send: followingData = {
		// 	currentUser: this.props.currentMemUser,
		// 	follow: userToFollow
		// };
		// console.log('send', send);
		// this.props.addFollowing(send);
		// alert(`You are now following ${send.follow.name}`);
		// }

		// const { currentUser, user } = this.props;
		// // console.log(memId, currentUser);
		const send: followingData = {
			currentUser: this.props.currentMemUser,
			follow: userToFollow
		};
		console.log('send', send);

		// var isFollow = convertObjectToArray(user?.UsersFollowingMe).find((u) => u.id === this.props.currentUser.id);

		if (isFollow) {
			console.log('already following so unfollow');
			this.props.removeFollowing(send);
		} else {
			console.log('not following so follow');
			this.props.addFollowing(send);
			// alert(`You are now following ${send.follow.name}`);
		}
	}

	render() {
		const { globalUsers, currentUserLoggendIn } = this.props;
		var windowSize = window.innerWidth;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader
							backBtn={true}
							titleString={Translate(lsInj.transDict.Members)}
							filter_Sort_Btn={true}
							sort_buttonBoolean={() => {
								this.setState({ sortAtrr: !this.state.sortAtrr });
							}}
							refreshBtn={true}
							refreshFunc={() => {
								this.doRefresh();
							}}
						/>
					</IonHeader>
					<br />
					<br />
					<br />
					<IonGrid>
						<IonRow>
							{globalUsers.length > 0 &&
								globalUsers.sort(this.state.sortAtrr ? sortByTextAsc : sortByTextDsc).map((mem: i_BaseInterface_User) => {
									var isFollow = convertObjectToArray(mem?.UsersFollowingMe).find((u) => u.id === currentUserLoggendIn);

									return (
										<IonCol size={windowSize < 400 ? '6' : '2'} key={mem.id}>
											<IonCard style={{ width: '145px', height: '250px' }}>
												<IonRouterLink routerLink={`/members/${mem?.id}/${this.props.currentUserLoggendIn}`}>
													<img style={{ width: '100%', height: '150px' }} src={mem && mem.avatar === undefined ? TypesToFirebaseGlobals.placeholderImg : mem.avatar} alt='broken' />
												</IonRouterLink>
												<IonCardContent style={{ padding: '0px', margin: '0px' }}>
													<IonButton
														style={{ padding: '0px', margin: '0px' }}
														fill='clear'
														onClick={() => {
															this.follow({ name: mem?.name, avatar: mem?.avatar, id: mem?.id }, isFollow);
														}}>
														<IonIcon size='large' color='secondary' icon={isFollow ? heart : heartOutline} />
													</IonButton>

													<IonCardSubtitle style={{ fontSize: '0.9em' }} class='ion-text-wrap'>
														{convertObjectToArray(mem?.UsersFollowingMe).length} {Translate(lsInj.transDict.Followers)}
													</IonCardSubtitle>

													<IonButton
														class='ion-text-wrap'
														style={{ fontSize: '0.9em' }}
														color='medium'
														fill='clear'
														routerLink={`/members/${mem?.id}/${this.props.currentUserLoggendIn}`}>
														{mem?.name}
													</IonButton>
												</IonCardContent>
											</IonCard>
										</IonCol>
									);
								})}
						</IonRow>
					</IonGrid>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('home state:', state);
	// console.log('isEmpty', state.user.isEmpty);

	return {
		globalUsers: convertObjectToArray(state.globalUsers.GlobalUsers),
		currentUserLoggendIn: state.user.id,
		currentMemUser: { name: state.user.name, avatar: state.user.avatar, id: state.user.id }
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty)),
		addFollowing: (followingData: followingData) => dispatch(User_AddFollowing(followingData)),
		removeFollowing: (followingData: followingData) => dispatch(User_RemoveFollowing(followingData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMembers);
