import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRouterLink, IonRow, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { followingData, i_BaseInterface_User } from '../../models/001UserModels';
import { TypesToFirebaseGlobals } from '../../services/firebase/TypesToServer';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import { User_AddFollowing, User_RemoveFollowing } from '../../services/redux/actions/userActions/001UserActions';
import { IAppState } from '../../services/redux/reduxModels';
import { lsInj } from '../../services/translate/LocalLangDict';
import { Translate } from '../../services/translate/TranslateServices';
import ShareFab from '../Buttons/ShareFab';
import { UserCategoryCard } from '../CardContainers/CardsLayout';

interface iProps {
	user: i_BaseInterface_User;
	currentUser: i_BaseInterface_User;
	arr: any[];
	type: 'global' | 'current';
}

export class ProfilePage extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			showCats: false
		};
	}

	addToMyfollowList() {
		const { currentUser, user } = this.props;
		// // console.log(memId, currentUser);
		const send: followingData = {
			currentUser: {
				name: currentUser.name,
				avatar: currentUser.avatar,
				id: currentUser.id
			},
			follow: {
				name: user.name,
				avatar: user.avatar,
				id: user.id
			}
		};
		console.log('send', send);

		var isFollow = convertObjectToArray(user?.UsersFollowingMe).find((u) => u.id === this.props.currentUser.id);

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
		const { arr, user, type } = this.props;
		var isFollow = convertObjectToArray(user?.UsersFollowingMe).find((u) => u.id === this.props.currentUser.id);

		return (
			<>
				{/* {user.imgArray.length === 0 && <img style={{ width: '100%', height: '300px' }} src={TypesToFirebaseGlobals.placeholderImg} alt='broken' />} */}
				{/* <img style={{ width: '100%', height: '300px' }} src={user.avatar} alt='broken' /> */}
				<IonSlides
					pager={false}
					options={{
						initialSlide: 0,
						speed: 400
					}}>
					{user?.imgArray?.length > 0 &&
						user?.imgArray?.map((img: string) => {
							return (
								<IonSlide key={img}>
									{/* style={{ width: '350px', height: '350px' , overflow:'hidden'}} */}
									<div className='box'>
										<img
											className='img'
											// style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', height: 'auto', width: 'auto' }} //width: '100%', height: '300px', objectPosition: 'center', objectFit: 'fill'
											src={img !== undefined ? img : TypesToFirebaseGlobals.placeholderImg}
											alt='broken'
										/>
									</div>
								</IonSlide>
							);
						})}
				</IonSlides>

				<IonToolbar color='primary' className='profileBar'>
					<IonTitle>{user.name}</IonTitle>
				</IonToolbar>

				<IonCard>
					<IonCardContent>{user.bio}</IonCardContent>
				</IonCard>

				<ShareFab titleProp={Translate(lsInj.transDict.checkuser)} descProp={user.bio} imageProp={user.avatar} partFallback={`members/${user.id}/undefined`} />

				<IonGrid>
					<IonRow>
						<IonCol size='4'>
							<IonButton color='primary' fill='clear' routerLink={`/dashboard/members/following/${user.id}`}>
								{Translate(lsInj.transDict.IFollowers)}
							</IonButton>
						</IonCol>

						<IonCol size='4'>
							{type === 'global' && (
								<>
									{/* change old */}
									{/* <IonCard color='primary' button class='ion-text-wrap' onClick={() => this.addToMyfollowList()}>
							        <IonCardContent>{Translate(lsInj.transDict.followMe)}</IonCardContent>
						            </IonCard> */}
									{/* change new  */}
									<IonButton color='primary' fill='clear' onClick={() => this.addToMyfollowList()}>
										<IonIcon style={{ width: '45px', height: '45px' }} color='secondary' icon={isFollow ? heart : heartOutline} />
									</IonButton>
								</>
							)}
						</IonCol>

						<IonCol size='4'>
							<IonButton color='primary' fill='clear' routerLink={`/dashboard/members/follow/${user.id}`}>
								{Translate(lsInj.transDict.Followers)}
							</IonButton>
						</IonCol>
					</IonRow>

					{type === 'current' && (
						<>
							<IonRow>
								{/* <IonCol>
									<IonTitle>{Translate(lsInj.transDict.CatMultiple)}</IonTitle>
								</IonCol> */}
								<IonCol>
									<IonRouterLink color='primary' routerLink={`/dashboard/categories/all`}>{` ${Translate(lsInj.transDict.SeeAllMine)}`}</IonRouterLink>
								</IonCol>
							</IonRow>

							<IonRow>
								{arr.length > 0 &&
									arr.map((cat: any, index: number) => {
										// console.log(cat);
										return UserCategoryCard(cat, index, user.id);
									})}
							</IonRow>
						</>
					)}
					{type === 'global' && (
						<>
							<IonRow>
								{/* <IonCol>
									<IonTitle>{Translate(lsInj.transDict.CatMultiple)}</IonTitle>
								</IonCol> */}
								<IonCol>
									<IonButton
										color='dark'
										fill='clear'
										onClick={() => {
											this.setState({ showCats: !this.state.showCats });
										}}>
										{/* {Translate(lsInj.transDict.SeeAll)} */} {` ${Translate(lsInj.transDict.SeeAllMine)}`}
									</IonButton>
								</IonCol>
							</IonRow>

							{this.state.showCats && (
								<IonRow>
									{arr.length > 0 &&
										arr.map((cat: any, index: number) => {
											// console.log(cat);
											return UserCategoryCard(cat, index, user.id);
										})}
								</IonRow>
							)}
						</>
					)}
				</IonGrid>
			</>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('dash props:', state.user.imgArray);
	// var arr = state.user.categories ? convertObjectToArray(state.user.categories) : [];
	// console.log(state.user.categories, state.user.categories);
	return {
		// user: state.user,
		// arr: convertObjectToArray(arr).slice(0, 4),
		loading: state.user.isEmpty
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		addFollowing: (followingData: followingData) => dispatch(User_AddFollowing(followingData)),
		removeFollowing: (followingData: followingData) => dispatch(User_RemoveFollowing(followingData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

// export function renderUser(user: i_BaseInterface_User, arr: any[], type: 'global' | 'current') {
// 	return (
// 		<>
// 			{user.imgArray.length === 0 && <img style={{ width: '100%', height: '300px' }} src={TypesToFirebaseGlobals.placeholderImg} alt='broken' />}
// 			{/* <img style={{ width: '100%', height: '300px' }} src={user.avatar} alt='broken' /> */}
// 			<IonSlides
// 				pager={false}
// 				options={{
// 					initialSlide: 0,
// 					speed: 400
// 				}}>
// 				{user.imgArray.length > 0 &&
// 					user.imgArray.map((img: string) => {
// 						return (
// 							<IonSlide key={img}>
// 								<img style={{ width: '100%', height: '250px' }} src={img !== undefined ? img : TypesToFirebaseGlobals.placeholderImg} alt='broken' />
// 							</IonSlide>
// 						);
// 					})}
// 			</IonSlides>
// 			<IonToolbar color='primary' className='profileBar'>
// 				<IonTitle>{user.name}</IonTitle>
// 			</IonToolbar>
// 			<br />
// 			<IonCard>
// 				<IonCardContent>{user.bio}</IonCardContent>
// 			</IonCard>
// 			<br />
// 			<br />

// 			<ShareFab titleProp={Translate(lsInj.transDict.checkuser)} descProp={user.bio} imageProp={user.avatar} partFallback={`members/${user.id}/undefined`} />
// 			{type === 'global' && (
// 				<>
// 					{/* change old */}
// 					<IonCard color='primary' button class='ion-text-wrap' onClick={() => this.addToMyfollowList()}>
// 						<IonCardContent>{Translate(lsInj.transDict.followMe)}</IonCardContent>
// 					</IonCard>
// 					{/* change new  */}
// 				</>
// 			)}
// 			<br />
// 			<br />
// 			<IonGrid>
// 				<IonRow>
// 					<IonCol>
// 						<IonButton fill='clear' routerLink={`/dashboard/members/following/${user.id}`}>
// 							{Translate(lsInj.transDict.seePeopleFollowingMe)}
// 						</IonButton>
// 					</IonCol>

// 					<IonCol>
// 						<IonButton fill='clear' routerLink={`/dashboard/members/follow/${user.id}`}>
// 							{Translate(lsInj.transDict.seePeopleIFollow)}
// 						</IonButton>
// 					</IonCol>
// 				</IonRow>

// 				<IonRow>
// 					<IonCol>
// 						<IonTitle>{Translate(lsInj.transDict.CatMultiple)}</IonTitle>
// 					</IonCol>
// 					<IonCol>
// 						<IonRouterLink routerLink={`/dashboard/categories/all`}>{Translate(lsInj.transDict.SeeAllMine)}</IonRouterLink>
// 					</IonCol>
// 				</IonRow>

// 				<IonRow>
// 					{arr.length > 0 &&
// 						arr.map((cat: any, index: number) => {
// 							// console.log(cat);
// 							return UserCategoryCard(cat, index, user.id);
// 						})}
// 				</IonRow>
// 			</IonGrid>
// 			<FabButtonSelection userOrGroup={'user'} idOfUserOrGroup={user.id} reqNum={0} />
// 		</>

// 		// <>
// 		// 										{/* <img style={{ width: '100%', height: '300px' }} src={user.avatar} alt='broken' /> */}
// 		// 								<IonSlides
// 		// 									pager={false}
// 		// 									options={{
// 		// 										initialSlide: 0,
// 		// 										speed: 400
// 		// 									}}>
// 		// 									{user.imgArray.map((img: string) => {
// 		// 										return (
// 		// 											<IonSlide key={img}>
// 		// 												<img style={{ width: '400px', height: '400px' }} src={img !== undefined ? img : TypesToFirebaseGlobals.placeholderImg} alt='broken' />
// 		// 											</IonSlide>
// 		// 										);
// 		// 									})}
// 		// 								</IonSlides>
// 		// 								<IonToolbar color='primary' className='profileBar'>
// 		// 									<IonTitle>{user.name}</IonTitle>
// 		// 								</IonToolbar>
// 		// 								<br />
// 		// 								<IonCard>
// 		// 									<IonCardContent>{user.bio}</IonCardContent>
// 		// 								</IonCard>
// 		// 								<br />
// 		// 								<br />

// 		// 								<ShareFab titleProp={Translate(lsInj.transDict.checkuser)} descProp={user.bio} imageProp={user.avatar} partFallback={`members/${user.id}/undefined`} />

// 		// 								<br />
// 		// 								<br />
// 		// 								<IonGrid>
// 		// 									<IonRow>
// 		// 										<IonCol>
// 		// 											<IonButton fill='clear' routerLink={`/dashboard/members/following/${user.id}`}>
// 		// 												{Translate(lsInj.transDict.seePeopleFollowingMe)}
// 		// 											</IonButton>
// 		// 										</IonCol>

// 		// 										<IonCol>
// 		// 											<IonButton fill='clear' routerLink={`/dashboard/members/follow/${user.id}`}>
// 		// 												{Translate(lsInj.transDict.seePeopleIFollow)}
// 		// 											</IonButton>
// 		// 										</IonCol>
// 		// 									</IonRow>

// 		// 									<IonRow>
// 		// 										<IonCol>
// 		// 											<IonTitle>{Translate(lsInj.transDict.CatMultiple)}</IonTitle>
// 		// 										</IonCol>
// 		// 										<IonCol>
// 		// 											<IonRouterLink routerLink={`/dashboard/categories/all`}>{Translate(lsInj.transDict.SeeAllMine)}</IonRouterLink>
// 		// 										</IonCol>
// 		// 									</IonRow>

// 		// 									<IonRow>
// 		// 										{arr.length > 0 &&
// 		// 											arr.map((cat: any, index: number) => {
// 		// 												// console.log(cat);
// 		// 												return UserCategoryCard(cat, index, user.id);
// 		// 											})}
// 		// 									</IonRow>
// 		// 								</IonGrid>

// 		// </>
// 	);
// }
