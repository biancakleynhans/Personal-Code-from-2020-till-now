import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route } from 'react-router';
import { ellipse } from 'ionicons/icons';
import { connect } from 'react-redux';
import { IAppState } from '../services/redux/ReduxModels';
import { AllRoutesListed } from './AllRoutesListed';
import Register from '../pages/globalAppPages/authentication/001Register';
import Login from '../pages/globalAppPages/authentication/002Login';
import ForgotPassword from '../pages/globalAppPages/authentication/003ForgotPassword';
import HomePage from '../pages/globalAppPages/landingPages/001HomePage';

import Dashboard from '../pages/userPersonalPages/useAsUser/UserProfile';
import ChangeLocationOfUser from '../pages/userPersonalPages/useAsUser/ChangeLocationOfUser';
import ChatWithMichael from '../pages/userPersonalPages/useAsUser/ChatWithMichael';
import MichaelLandingPageForChat from '../pages/userPersonalPages/useAsAdmin/MichaelLandingPageForChat';
import UserCalendarLandingPage from '../pages/userPersonalPages/useAsUser/UserCalendarLandingPage';
import MichealCalendarLandingPage from '../pages/userPersonalPages/useAsAdmin/MichealCalendarLandingPage';
import MichealProfile from '../pages/userPersonalPages/useAsAdmin/MichealProfile';
import SelectDays from '../pages/userPersonalPages/useAsAdmin/profileTimeSettings/SelectDays';
import SelectWorkingHours from '../pages/userPersonalPages/useAsAdmin/profileTimeSettings/SelectWorkingHours';
import SelectNonWorkingHours from '../pages/userPersonalPages/useAsAdmin/profileTimeSettings/SelectNonWorkingHours';
import SelectExpetionTimes from '../pages/userPersonalPages/useAsAdmin/profileTimeSettings/SelectExpetionTimes';
import ImgAddView from '../layout/AppComponents/ImgAddView';

const MainTabs = (props: any) => {
	const { authed, isOwner } = props;
	// console.log('Auth status', authed);
	const verifiedUser = authed.uid ? true : false;
	// console.log('isOwner???', isOwner);
	return (
		<IonTabs>
			<IonRouterOutlet id='main'>
				<Route exact path={AllRoutesListed.authRoutes.login} render={() => <Login />} />
				<Route exact path={AllRoutesListed.authRoutes.forgotPassword} render={() => <ForgotPassword />} />

				<Route
					exact
					path={AllRoutesListed.userRoutes.dashLanding}
					render={(props) => {
						return verifiedUser ? <Dashboard {...props} /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.ownerRoutes.dashLanding}
					render={(props) => {
						return verifiedUser ? <MichealProfile {...props} /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.ownerRoutes.addProfileImg}
					render={(props) => {
						return verifiedUser ? <ImgAddView {...props} /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.ownerRoutes.changeDay}
					render={(props) => {
						return verifiedUser ? <SelectDays {...props} /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.ownerRoutes.changeWorkTime}
					render={(props) => {
						return verifiedUser ? <SelectWorkingHours {...props} /> : <Login />;
					}}
				/>
				<Route
					exact
					path={AllRoutesListed.ownerRoutes.changeNonWorkTime}
					render={(props) => {
						return verifiedUser ? <SelectNonWorkingHours {...props} /> : <Login />;
					}}
				/>
				<Route
					exact
					path={AllRoutesListed.ownerRoutes.changeExeption}
					render={(props) => {
						return verifiedUser ? <SelectExpetionTimes {...props} /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.userRoutes.dashChatWithMichael}
					render={(props) => {
						return verifiedUser ? <ChatWithMichael {...props} /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.ownerRoutes.chatLanding}
					render={(props) => {
						return verifiedUser ? <MichaelLandingPageForChat {...props} /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.userRoutes.dashcalendarlandingPage}
					render={(props) => {
						return verifiedUser ? <UserCalendarLandingPage {...props} /> : <Register />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.ownerRoutes.calendarLanding}
					render={(props) => {
						return verifiedUser ? <MichealCalendarLandingPage {...props} /> : <Register />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.otherRoutes.changeLoc}
					render={() => {
						return verifiedUser ? <ChangeLocationOfUser /> : <Register />;
					}}
				/>

				{/* Tabs Routes */}

				<Route exact path='/:tab(tab1)' component={!isOwner ? HomePage : MichaelLandingPageForChat} />
				<Route exact path='/:tab(tab2)' component={isOwner ? MichaelLandingPageForChat : ChatWithMichael} />
				<Route exact path='/:tab(tab3)' component={isOwner ? MichealCalendarLandingPage : UserCalendarLandingPage} />
				<Route exact path='/:tab(tab4)' component={isOwner ? MichealProfile : Dashboard} />

				{/* Default Root */}
				<Route
					path='/'
					render={() => {
						return verifiedUser ? <HomePage /> : <Register />;
					}}
				/>
			</IonRouterOutlet>

			{verifiedUser ? (
				<IonTabBar slot='bottom' color='medium'>
					{!isOwner && (
						<IonTabButton tab='tab1' href='/tab1'>
							<IonIcon icon={ellipse} />
							<IonLabel>Home</IonLabel>
						</IonTabButton>
					)}
					<IonTabButton tab='tab2' href='/tab2'>
						<IonIcon icon={ellipse} />
						<IonLabel>Chat</IonLabel>
					</IonTabButton>

					<IonTabButton tab='tab3' href='/tab3'>
						<IonIcon icon={ellipse} />
						<IonLabel>Schedule</IonLabel>
					</IonTabButton>

					<IonTabButton tab='tab4' href='/tab4'>
						<IonIcon icon={ellipse} />
						<IonLabel>Profile</IonLabel>
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
	};
};

export default connect(mapStateToProps)(MainTabs);
