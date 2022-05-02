import React, { Component } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonHeader, IonCol } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { IAppState } from '../../../services/redux/reduxModels';

import ProfilePage from '../../../layout/AppComponents/ProfilePage';

class UserWhoUploadedItem extends Component<any> {
	render() {
		const { user, arr, currentUser } = this.props;
		var windowSize = window.innerWidth;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} rl={`/chats/${currentUser.id}/withUser/${user.id}`} contactBtn={true} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					{windowSize < 400 && <ProfilePage user={user} arr={arr} type='global' currentUser={currentUser} />}
					{windowSize > 800 && (
						<IonGrid>
							<IonRow>
								<IonCol size='4'></IonCol>
								<IonCol size='4'>
									<ProfilePage user={user} arr={arr} type='global' currentUser={currentUser} />
								</IonCol>
								<IonCol size='4'></IonCol>
							</IonRow>
						</IonGrid>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('Who', ownProps.match.params.userId);
	const parmId = ownProps.match.params.userId;
	const userRequesting = state.globalUsers.GlobalUsers[parmId] !== undefined ? state.globalUsers.GlobalUsers[parmId] : state.user;
	var arr = userRequesting.categories ? convertObjectToArray(userRequesting.categories) : [];

	// console.log('userRequesting', userRequesting);
	// console.log('arr', arr);
	return {
		user: userRequesting,
		arr: arr,
		currentUser: state.user
	};
};

// const mapDispatchToProps = (dispatch: Dispatch<any>) => {
// 	return {
// 		addFollowing: (followingData: followingData) => dispatch(User_AddFollowing(followingData))
// 	};
// };
export default connect(mapStateToProps)(UserWhoUploadedItem);

// addToMyfollowList() {
// 		const { currentUser, user } = this.props;
// 		// console.log(memId, currentUser);

// 		const send: followingData = {
// 			currentUser: {
// 				name: currentUser.name,
// 				avatar: currentUser.avatar,
// 				id: currentUser.id
// 			},
// 			follow: {
// 				name: user.name,
// 				avatar: user.avatar,
// 				id: user.id
// 			}
// 		};
// 		// console.log('send', send);
// 		this.props.addFollowing(send);
// 		alert(`You are now following ${send.follow.name}`);
// 	}

// <img style={{ width: '100%', height: '300px' }} src={user.avatar} alt='broken' />
// 					<IonToolbar color='primary' className='profileBar'>
// 						<IonTitle>{user.name}</IonTitle>
// 					</IonToolbar>
// 					<br />
// 					<IonCard>
// 						<IonCardContent>{user.bio}</IonCardContent>
// 					</IonCard>
// 					<br />
// 					<IonCard color='primary' button class='ion-text-wrap' onClick={() => this.addToMyfollowList()}>
// 						<IonCardContent>{Translate(lsInj.transDict.followMe)}</IonCardContent>
// 					</IonCard>
// 					<br />
// 					<IonGrid>
// 						<IonRow>
// 							<IonCol>
// 								<IonButton fill='clear' routerLink={`/dashboard/members/following/${user.id}`}>
// 									{Translate(lsInj.transDict.seePeopleFollowingMe)}
// 								</IonButton>
// 							</IonCol>

// 							<IonCol>
// 								<IonButton fill='clear' routerLink={`/dashboard/members/follow/${user.id}`}>
// 									{Translate(lsInj.transDict.seePeopleIFollow)}
// 								</IonButton>
// 							</IonCol>
// 						</IonRow>
// 						<IonRow>
// 							{arr.length > 0 &&
// 								arr.map((cat: any, index: number) => {
// 									// console.log(cat);
// 									return UserCategoryCard(cat, index, user.id);
// 								})}
// 						</IonRow>
// 					</IonGrid>
