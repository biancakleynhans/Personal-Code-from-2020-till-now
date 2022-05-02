import React, { lazy } from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/react';
import { Route, Switch } from 'react-router';
import { homeOutline, locationOutline, peopleOutline, personOutline, chatbubblesOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import { IAppState } from '../services/redux/reduxModels';
import { Translate } from '../services/translate/TranslateServices';
import { lsInj } from '../services/translate/LocalLangDict';
import { AllRoutesListed } from './AllRoutesListed';

import Register from '../pages/globalAppPages/authentication/001Register';
import Login from '../pages/globalAppPages/authentication/002Login';
import ForgotPassword from '../pages/globalAppPages/authentication/003ForgotPassword';
import UserPrivacy from '../pages/userPersonalPages/accountSettings/29UserPrivacy';
import HomePage from '../pages/globalAppPages/landingPages/001HomePage';

const About = lazy(() => import('../pages/globalAppPages/landingPages/14About'));
const Dashboard = lazy(() => import('../pages/userPersonalPages/useAsUser/profile/5UserProfile'));
const UserProfileSettings = lazy(() => import('../pages/userPersonalPages/useAsUser/profile/20UserProfileSettings'));
const AddNewProfileImage = lazy(() => import('../pages/userPersonalPages/useAsUser/profile/21UserAddNewProfileImage'));
const EditProfileImage = lazy(() => import('../pages/userPersonalPages/useAsUser/profile/22UserEditProfileImage'));
const UserEditCategory = lazy(() => import('../pages/userPersonalPages/useAsUser/profile/UserEditCatagory'));
const UserDeleteCategory = lazy(() => import('../pages/userPersonalPages/useAsUser/profile/UserDeleteCatagory'));
const UserCreateItem = lazy(() => import('../pages/userPersonalPages/useAsUser/items/23UserCreateItem'));
const AddItemImg = lazy(() => import('../pages/userPersonalPages/useAsUser/items/UserAddItemImg'));
const UserItem = lazy(() => import('../pages/userPersonalPages/useAsUser/items/16UserItem'));
const UserEditItemImg = lazy(() => import('../pages/userPersonalPages/useAsUser/items/UserEditItemImg'));
const UserEditItemPage = lazy(() => import('../pages/userPersonalPages/useAsUser/items/UserEditItem'));
const UserDonateItem = lazy(() => import('../pages/userPersonalPages/useAsUser/donations/19UserDontateItem'));
const UserDonations = lazy(() => import('../pages/userPersonalPages/useAsUser/donations/15UserDonations'));
const CreateNewEvent = lazy(() => import('../pages/userPersonalPages/useAsUser/events/6UserCreateEvent'));
const EventLandingPage = lazy(() => import('../pages/globalAppPages/event/2EventLandingPage'));
const EventDetails = lazy(() => import('../pages/globalAppPages/event/8EventDetails'));
const AddImgToEvent = lazy(() => import('../pages/userPersonalPages/useAsUser/events/UserAddEventImg'));
const UserEditEventPage = lazy(() => import('../pages/userPersonalPages/useAsUser/events/UserEditEvent'));
const UserEditEventImg = lazy(() => import('../pages/userPersonalPages/useAsUser/events/UserEditEventImg'));
const CreateNewGroup = lazy(() => import('../pages/userPersonalPages/useAsUser/groups/7CreateNewGroup'));
const GroupLandingPage = lazy(() => import('../pages/globalAppPages/groups/4GroupLandingPage'));
const UserGroupLandingPage = lazy(() => import('../pages/userPersonalPages/useAsUser/groups/25UserGroupLandingPage'));
const UserGroupEdit = lazy(() => import('../pages/userPersonalPages/useAsUser/groups/26GroupProfileSettings'));
const GroupDetails = lazy(() => import('../pages/globalAppPages/groups/9GroupDetails'));
const AddImgToGroup = lazy(() => import('../pages/userPersonalPages/useAsUser/groups/AddGroupImg'));
const GroupDeleteCategory = lazy(() => import('../pages/userPersonalPages/useAsUser/groups/DeleteGroupCatagory'));
const GroupEditCategory = lazy(() => import('../pages/userPersonalPages/useAsUser/groups/EditGroupCatagory'));
const GroupEditImage = lazy(() => import('../pages/userPersonalPages/useAsUser/groups/EditGroupImg'));
const AccountSettingsLandingPage = lazy(() => import('../pages/userPersonalPages/accountSettings/27AccountSettingsLandingPage'));
const ItemInCategory = lazy(() => import('../pages/globalAppPages/catagory/11ItemInCatagory'));
const UserNotificationPermissions = lazy(() => import('../pages/userPersonalPages/accountSettings/28UserNotificationPermissions'));
// const UserSupscriptions = lazy(() => import('../pages/userPersonalPages/accountSettings/30UserSupscriptions'));
const GroupProfilePage = lazy(() => import('../pages/userPersonalPages/useAsGroupAdmin/000GroupProfilePage'));
const GroupItemInCat = lazy(() => import('../pages/userPersonalPages/useAsGroupAdmin/003GroupItemInCat'));
const ChangeLocationOfUser = lazy(() => import('../pages/userPersonalPages/accountSettings/ChangeLocationOfUser'));
const RequestToJoinGroup = lazy(() => import('../pages/userPersonalPages/useAsGroupAdmin/004RequestToJoinGroup'));
const UserWhoUploadedItem = lazy(() => import('../pages/globalAppPages/catagory/24UserWhoUploadedItem'));
const GroupMembersList = lazy(() => import('../pages/userPersonalPages/useAsGroupAdmin/005GroupMembersList'));
const EventSeeGoing = lazy(() => import('../pages/globalAppPages/event/000EventSeeGoing'));
const EventSeeIntrested = lazy(() => import('../pages/globalAppPages/event/000EventSeeIntrested'));
const ChatContainerPage = lazy(() => import('../pages/chatSide/ChatContainerPage'));
const ChatBox = lazy(() => import('../pages/chatSide/ChatBox'));
const UserDeleteItemFrom = lazy(() => import('../pages/userPersonalPages/useAsUser/items/UserDeleteItemFrom'));
const GlobalDontationsLandingPage = lazy(() => import('../pages/globalAppPages/donations/000GlobalDontationsLandingPage'));
const UserDonationEdit = lazy(() => import('../pages/userPersonalPages/useAsUser/donations/UserDonationEdit'));
const UserDonationDelete = lazy(() => import('../pages/userPersonalPages/useAsUser/donations/UserDonationDelete'));
const UserDonatimgEdit = lazy(() => import('../pages/userPersonalPages/useAsUser/donations/UserDonationImgEdit'));
const CreateAGroupPost = lazy(() => import('../pages/userPersonalPages/useAsGroupAdmin/006CreateAGroupPost'));
const GlobalDonsItem = lazy(() => import('../pages/globalAppPages/donations/001GlobalDonsItem'));
const SupportPage = lazy(() => import('../pages/globalAppPages/support/SupportPage'));
const GlobalUserProfilePage = lazy(() => import('../pages/globalAppPages/followers/GlobalUserProfilePage'));
const SeeFollowers = lazy(() => import('../pages/userPersonalPages/useAsUser/profile/SeeFollowers'));
const AllMembers = lazy(() => import('../pages/globalAppPages/followers/AllMembers'));
const LandingPage = lazy(() => import('../pages/globalAppPages/landingPages/000LandingPage'));
const TimelinePage = lazy(() => import('../pages/globalAppPages/landingPages/002Timeline'));
const UserDeleteGroup = lazy(() => import('../pages/userPersonalPages/useAsUser/groups/UserDeleteGroup'));
const UserDeleteEvent = lazy(() => import('../pages/userPersonalPages/useAsUser/events/UserDeleteEvent'));
const UserDonationImgAdd = lazy(() => import('../pages/userPersonalPages/useAsUser/donations/UserDonationImgAdd'));
const UserCategoryPage = lazy(() => import('../pages/userPersonalPages/useAsUser/catagories/UserCatagoryPage'));
const UserSingleCategoryContent = lazy(() => import('../pages/userPersonalPages/useAsUser/catagories/17UserSingleCatagoryContent'));
const CategoryLandinPage = lazy(() => import('../pages/globalAppPages/catagory/31CatagoryLandinPage'));
const GroupSingleCatagoryContent = lazy(() => import('../pages/userPersonalPages/useAsGroupAdmin/002GroupSingleCatagoryContent'));
const GroupCatagoryPage = lazy(() => import('../pages/userPersonalPages/useAsGroupAdmin/001GroupCatagoryPage'));
const MiddlePageFromCatsFromHomeScreen = lazy(() => import('../pages/globalAppPages/catagory/MiddlePageFromCatsFromHomeScreen'));

const MainTabs = (props: any) => {
	const { authed, newMsg } = props;
	// console.log('newMsg', newMsg);
	const verifiedUser = authed.uid ? true : false;
	return (
		<IonTabs>
			<IonRouterOutlet id='main'>
				<Switch>
					{/* Base Routes */}
					<Route exact path={AllRoutesListed.authRoutes.login} render={() => <Login />} />
					<Route exact path={AllRoutesListed.authRoutes.forgotPassword} render={() => <ForgotPassword />} />
					<Route exact path={AllRoutesListed.otherRoutes.about} render={() => <About />} />
					<Route exact path={AllRoutesListed.otherRoutes.tc} render={() => <LandingPage />} />
					<Route
						exact
						path={AllRoutesListed.otherRoutes.tl}
						render={(props) => {
							return verifiedUser ? <TimelinePage {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.otherRoutes.midleWarePageCats}
						render={(props) => {
							return verifiedUser ? <MiddlePageFromCatsFromHomeScreen {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Landing}
						render={() => {
							return verifiedUser ? <Dashboard /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.groupRoutes.dash_Groups_ProfilePage}
						render={(props) => {
							return verifiedUser ? <GroupProfilePage {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Settings_Profile_Img_Add}
						render={() => {
							return verifiedUser ? <AddNewProfileImage /> : <Login />;
						}}
					/>
					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Settings_Profile_Img_Edit}
						render={(props) => {
							return verifiedUser ? <EditProfileImage {...props} /> : <Login />;
						}}
					/>
					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Settings}
						render={(props) => {
							return verifiedUser ? <UserProfileSettings {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Settings_Cat_Edit}
						render={(props) => {
							return verifiedUser ? <UserEditCategory {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Settings_Cat_Delete}
						render={(props) => {
							return verifiedUser ? <UserDeleteCategory {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_CatsAll}
						render={(props) => {
							return verifiedUser ? <UserCategoryPage {...props} /> : <Login />;
						}}
					/>
					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Cats_Select}
						render={(props) => {
							return verifiedUser ? <UserSingleCategoryContent {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Cats_Item}
						render={(props) => {
							return verifiedUser ? <UserItem {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Cats_ItemImg_Edit}
						render={(props) => {
							return verifiedUser ? <UserEditItemImg {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.create_ItemImgEdit}
						render={(props) => {
							return verifiedUser ? <UserEditItemImg {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Cats_Item_Edit}
						render={(props) => {
							return verifiedUser ? <UserEditItemPage {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.catagoryRoutes.cats_Landing}
						render={(props) => {
							return verifiedUser ? <CategoryLandinPage {...props} /> : <Login />;
						}}
					/>

					<Route
						path={AllRoutesListed.catagoryRoutes.cats_Item1}
						render={(props) => {
							return verifiedUser ? <ItemInCategory {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.catagoryRoutes.cats_Item}
						render={(props) => {
							return verifiedUser ? <ItemInCategory {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.dontationRoutes.User_Dons_Landing}
						render={(props) => {
							return verifiedUser ? <UserDonations {...props} /> : <Login />;
						}}
					/>
					<Route
						exact
						path={AllRoutesListed.dontationRoutes.User_Dons_Item}
						render={(props) => {
							return verifiedUser ? <UserDonateItem {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.dontationRoutes.User_Dons_Item_Img_Edit}
						render={(props) => {
							return verifiedUser ? <UserDonatimgEdit {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.dontationRoutes.User_Dons_Item_Img_Add}
						render={(props) => {
							return verifiedUser ? <UserDonationImgAdd {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.dontationRoutes.User_Dons_Item_Edit}
						render={(props) => {
							return verifiedUser ? <UserDonationEdit {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.dontationRoutes.User_Dons_Item_Delete}
						render={(props) => {
							return verifiedUser ? <UserDonationDelete {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.dontationRoutes.Global_Dons_Landing_fromHomeScreen}
						render={(props) => {
							return verifiedUser ? <GlobalDontationsLandingPage {...props} /> : <Register />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.dontationRoutes.Global_Dons_Item_fromHomeScreen}
						render={(props) => {
							return verifiedUser ? <GlobalDonsItem {...props} /> : <Register />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.eventRoutes.events_Landing}
						render={(props) => {
							return verifiedUser ? <EventLandingPage {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.eventRoutes.events_Selected}
						render={(props) => {
							return verifiedUser ? <EventDetails {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.eventRoutes.events_HomePage_Selected}
						render={(props) => {
							return verifiedUser ? <EventDetails {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.eventRoutes.events_Selected_Delete}
						render={(props) => {
							return verifiedUser ? <UserDeleteEvent {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.eventRoutes.events_Selected_Edit}
						render={(props) => {
							return verifiedUser ? <UserEditEventPage {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.eventRoutes.events_SelectedImg_Edit}
						render={(props) => {
							return verifiedUser ? <UserEditEventImg {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.eventRoutes.event_SeeGoing}
						render={(props) => {
							return verifiedUser ? <EventSeeGoing {...props} /> : <Login />;
						}}
					/>
					<Route
						exact
						path={AllRoutesListed.eventRoutes.event_SeeIntrested}
						render={(props) => {
							return verifiedUser ? <EventSeeIntrested {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.groupRoutes.groups_Landing}
						render={(props) => {
							return verifiedUser ? <GroupLandingPage {...props} /> : <Login />;
						}}
					/>
					<Route
						exact
						path={AllRoutesListed.groupRoutes.groups_Selected}
						render={(props) => {
							return verifiedUser ? <GroupDetails {...props} /> : <Login />;
						}}
					/>
					<Route
						exact
						path={AllRoutesListed.groupRoutes.dash_Groups_Landing}
						render={(props) => {
							return verifiedUser ? <UserGroupLandingPage {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.groupRoutes.dash_Groups_Selected}
						render={(props) => {
							return verifiedUser ? <UserGroupEdit {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.groupRoutes.dash_Groups_Selected_Cat_Delete}
						render={(props) => {
							return verifiedUser ? <GroupDeleteCategory {...props} /> : <Login />;
						}}
					/>
					<Route
						exact
						path={AllRoutesListed.groupRoutes.dash_Groups_Selected_Cat_Edit}
						render={(props) => {
							return verifiedUser ? <GroupEditCategory {...props} /> : <Login />;
						}}
					/>
					<Route
						exact
						path={AllRoutesListed.groupRoutes.dash_Groups_Selected_Img_Edit}
						render={(props) => {
							return verifiedUser ? <GroupEditImage {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.groupRoutes.groups_Selected_allCats}
						render={(props) => {
							return verifiedUser ? <GroupCatagoryPage {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.groupRoutes.groups_Selected_Cat}
						render={(props) => {
							return verifiedUser ? <GroupSingleCatagoryContent {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.groupRoutes.groups_Item}
						render={(props) => {
							return verifiedUser ? <GroupItemInCat {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.groupRoutes.group_joinReqs}
						render={(props) => {
							return verifiedUser ? <RequestToJoinGroup {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.groupRoutes.group_add_post}
						render={(props) => {
							return verifiedUser ? <CreateAGroupPost {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Cats_ItemDelete}
						render={(props) => {
							return verifiedUser ? <UserDeleteItemFrom {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.groupRoutes.dash_Groups_Delete}
						render={(props) => {
							return verifiedUser ? <UserDeleteGroup {...props} /> : <Login />;
						}}
					/>

					{/* other */}
					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Acc_Landing}
						render={(props) => {
							return verifiedUser ? <AccountSettingsLandingPage {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Acc_Notify}
						render={(props) => {
							return verifiedUser ? <UserNotificationPermissions {...props} /> : <Login />;
						}}
					/>
					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Acc_Privacy}
						render={(props) => {
							return verifiedUser ? <UserPrivacy {...props} /> : <Login />;
						}}
					/>
					{/* <Route
						exact
						path={AllRoutesListed.userRoutes.dash_Acc_Subs}
						render={(props) => {
							return verifiedUser ? <UserSupscriptions {...props} /> : <Login />;
						}}
					/> */}

					{/* User add pages  */}
					<Route
						exact
						path={AllRoutesListed.userRoutes.create_Item}
						render={(props) => {
							return verifiedUser ? <UserCreateItem {...props} /> : <Login />;
						}}
					/>
					<Route
						exact
						path={AllRoutesListed.userRoutes.create_Item_Img}
						render={(props) => {
							return verifiedUser ? <AddItemImg {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.create_Event}
						render={(props) => {
							return verifiedUser ? <CreateNewEvent {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.create_Event_Img}
						render={(props) => {
							return verifiedUser ? <AddImgToEvent {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.create_Group}
						render={(props) => {
							return verifiedUser ? <CreateNewGroup {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.create_Group_Img}
						render={(props) => {
							return verifiedUser ? <AddImgToGroup {...props} /> : <Login />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.otherRoutes.changeLoc}
						render={() => {
							return verifiedUser ? <ChangeLocationOfUser /> : <Register />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.members.homePage}
						render={(props) => {
							return verifiedUser ? <AllMembers {...props} /> : <Register />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.members.landing}
						render={(props) => {
							return verifiedUser ? <GlobalUserProfilePage {...props} /> : <Register />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.members.seeCurrentUsersFollowers}
						render={(props) => {
							return verifiedUser ? <SeeFollowers {...props} /> : <Register />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.globaRoutes.userProfileView}
						render={(props) => {
							return verifiedUser ? <UserWhoUploadedItem {...props} /> : <Register />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.groupRoutes.group_members}
						render={(props) => {
							return verifiedUser ? <GroupMembersList {...props} /> : <Register />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.chatSide.chatOn}
						render={(props) => {
							return verifiedUser ? <ChatBox {...props} /> : <Register />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.chatSide.root}
						render={(props) => {
							return verifiedUser ? <ChatContainerPage {...props} /> : <Register />;
						}}
					/>

					<Route
						exact
						path={AllRoutesListed.userRoutes.dash_Acc_Support}
						render={(props) => {
							return verifiedUser ? <SupportPage {...props} /> : <Register />;
						}}
					/>

					{/* Tabs Routes */}

					<Route exact path='/:tab(tab1)' component={HomePage} />
					<Route exact path='/:tab(tab2)' component={EventLandingPage} />
					<Route exact path='/:tab(tab3)' component={GroupLandingPage} />
					<Route exact path='/:tab(tab4)' component={Dashboard} />
					<Route exact path='/:tab(tab5)' component={ChatContainerPage} />

					{/* Default Root */}
					<Route
						path='/'
						render={() => {
							return verifiedUser ? <HomePage /> : <Register />;
						}}
					/>
				</Switch>
			</IonRouterOutlet>

			{verifiedUser ? (
				<IonTabBar slot='bottom' color='primary'>
					<IonTabButton tab='tab1' href='/tab1'>
						<IonIcon size='large' color='light' icon={homeOutline} />
						<IonLabel class='ion-text-wrap' color='light'>
							Home
						</IonLabel>
					</IonTabButton>

					<IonTabButton tab='tab2' href='/tab2'>
						<IonIcon size='large' color='light' icon={locationOutline} />
						<IonLabel class='ion-text-wrap' color='light'>
							Events
						</IonLabel>
					</IonTabButton>

					<IonTabButton tab='tab3' href='/tab3'>
						<IonIcon size='large' color='light' icon={peopleOutline} />
						<IonLabel class='ion-text-wrap' color='light'>
							{Translate(lsInj.transDict.Group)}
						</IonLabel>
					</IonTabButton>

					<IonTabButton tab='tab4' href='/tab4'>
						<IonIcon size='large' color='light' icon={personOutline} />
						<IonLabel class='ion-text-wrap' color='light'>
							{Translate(lsInj.transDict.Profile)}
						</IonLabel>
					</IonTabButton>

					<IonTabButton tab='tab5' href='/tab5'>
						<IonIcon size='large' color={newMsg > 0 ? 'dark' : 'light'} icon={chatbubblesOutline} />
						{newMsg > 0 && (
							<IonBadge color='tertiary' style={{ position: 'absolute', top: '15px', right: '25' }}>
								1
							</IonBadge>
						)}
						<IonLabel class='ion-text-wrap' color={newMsg > 0 ? 'dark' : 'light'}>
							Chats
						</IonLabel>
					</IonTabButton>
				</IonTabBar>
			) : (
				<IonTabBar></IonTabBar>
			)}
		</IonTabs>
	);
};

const mapStateToProps = (state: IAppState) => {
	// console.log('STATE MAINTABS', state);
	return {
		authed: state.firebase.auth,
		newMsg: state.user.newMsgs
	};
};

export default connect(mapStateToProps)(MainTabs);
