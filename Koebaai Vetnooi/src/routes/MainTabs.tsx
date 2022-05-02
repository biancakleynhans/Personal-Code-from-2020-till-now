import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon } from '@ionic/react';
import { Route } from 'react-router';
import { homeOutline, personOutline, barChartOutline, waterOutline, cameraOutline, hourglassOutline, nutritionOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import { IAppState } from '../services/redux/ReduxModels';
import { AllRoutesListed } from './AllRoutesListed';

import About from '../pages/globalAppPages/landingPages/14About';
import Register from '../pages/globalAppPages/authentication/001Register';
import Login from '../pages/globalAppPages/authentication/002Login';
import ForgotPassword from '../pages/globalAppPages/authentication/003ForgotPassword';
import HomePage from '../pages/globalAppPages/landingPages/001HomePage';

import Dashboard from '../pages/userPersonalPages/useAsUser/profile/5UserProfile';
import ChangeLocationOfUser from '../pages/userPersonalPages/accountSettings/ChangeLocationOfUser';
import UserProfileSettings from '../pages/userPersonalPages/useAsUser/profile/20UserProfileSettings';
import FastTypeSelectPage from '../pages/userPersonalPages/useAsUser/fasts/001FastType';
import FastTimerPage from '../pages/userPersonalPages/useAsUser/fasts/002FastTimer';
import FastHistoryPage from '../pages/userPersonalPages/useAsUser/fasts/003FastHistory';
import FastEditPage from '../pages/userPersonalPages/useAsUser/fasts/004FastEdit';
import WeightPage from '../pages/userPersonalPages/useAsUser/weight/002WeightAdd';
import WeightHistory from '../pages/userPersonalPages/useAsUser/weight/003WeightHistory';
import WaterDiaryPage from '../pages/userPersonalPages/useAsUser/waterDiary/WaterConsumptionPage';
import ScalePhotos from '../pages/userPersonalPages/useAsUser/weightLossFotoAlbum/ScalePhotos';
import AddFoodEntry from '../pages/userPersonalPages/useAsUser/foodDiary/AddFoodEntry';
import RecipesPage from '../pages/globalAppPages/landingPages/002RecipesPage';
import BooksPage from '../pages/globalAppPages/landingPages/003BooksPage';
import EmosionalRehabPage from '../pages/globalAppPages/landingPages/004EmosionalRehabPage';
import GroupChatLandingPage from '../pages/userPersonalPages/useAsUser/chat/GroupChatLandingPage';
import AgentsStroies from '../pages/globalAppPages/agentsStories/AgentsStroies';
import AdminLandingPage from '../pages/userPersonalPages/useAsAdmin/AdminLandingPage';
import DisplaySelectedUsersDataBreakdown from '../pages/userPersonalPages/useAsAdmin/DisplaySelectedUsersDataBreakdown';
import ExternalLinks from '../pages/globalAppPages/landingPages/ExternalLinks';
import ClassroomLandingPage from '../pages/globalAppPages/classroom/ClassroomLandingPage';
import AccountSettingsLandingPage from '../pages/userPersonalPages/accountSettings/AccountSettingsLandingPage';

const MainTabs = (props: any) => {
	const { authed } = props;
	// console.log('Auth status', authed);
	const verifiedUser = authed.uid ? true : false;
	return (
		<IonTabs>
			<IonRouterOutlet id='main'>
				<Route exact path={AllRoutesListed.authRoutes.login} render={() => <Login />} />
				<Route exact path={AllRoutesListed.authRoutes.forgotPassword} render={() => <ForgotPassword />} />

				<Route exact path={AllRoutesListed.otherRoutes.about} render={() => <About />} />

				<Route exact path={AllRoutesListed.otherRoutes.externalLinks} render={() => <ExternalLinks />} />

				<Route exact path={AllRoutesListed.otherRoutes.recipes} render={() => <RecipesPage />} />

				<Route exact path={AllRoutesListed.otherRoutes.books} render={() => <BooksPage />} />

				<Route
					exact
					path={AllRoutesListed.otherRoutes.agentStory}
					render={(props) => {
						return verifiedUser ? <AgentsStroies {...props} /> : <Login />;
					}}
				/>

				<Route exact path={AllRoutesListed.otherRoutes.emo} render={() => <EmosionalRehabPage />} />

				<Route exact path={AllRoutesListed.otherRoutes.chat} render={() => <GroupChatLandingPage />} />

				<Route
					exact
					path={AllRoutesListed.userRoutes.dash_Landing}
					render={() => {
						return verifiedUser ? <Dashboard /> : <Login />;
					}}
				/>
				<Route
					exact
					path={AllRoutesListed.userRoutes.dash_Settings}
					render={() => {
						return verifiedUser ? <UserProfileSettings /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.userRoutes.dashScale}
					render={(props) => {
						return verifiedUser ? <ScalePhotos {...props} /> : <Login />;
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
					path={AllRoutesListed.accountRoutes.dash_Acc_Landing}
					render={(props) => {
						return verifiedUser ? <AccountSettingsLandingPage {...props} /> : <Login />;
					}}
				/>

				{/* Fasts */}
				<Route
					exact
					path={AllRoutesListed.fastRoutes.fastType}
					render={(props) => {
						return verifiedUser ? <FastTypeSelectPage {...props} /> : <Login />;
					}}
				/>
				<Route
					exact
					path={AllRoutesListed.fastRoutes.fastTimer}
					render={(props) => {
						return verifiedUser ? <FastTimerPage {...props} /> : <Login />;
					}}
				/>
				<Route
					exact
					path={AllRoutesListed.fastRoutes.fastHist}
					render={(props) => {
						return verifiedUser ? <FastHistoryPage {...props} /> : <Login />;
					}}
				/>
				<Route
					exact
					path={AllRoutesListed.fastRoutes.fastEdit}
					render={(props) => {
						return verifiedUser ? <FastEditPage {...props} /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.weightRoutes.weightAdd}
					render={(props) => {
						return verifiedUser ? <WeightPage {...props} /> : <Login />;
					}}
				/>
				<Route
					exact
					path={AllRoutesListed.weightRoutes.weightHist}
					render={(props) => {
						return verifiedUser ? <WeightHistory {...props} /> : <Login />;
					}}
				/>
				{/* WaterDiary */}
				<Route
					exact
					path={AllRoutesListed.waterDiarRoutes.main}
					render={(props) => {
						return verifiedUser ? <WaterDiaryPage {...props} /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.foodDiaryRoute.add}
					render={(props) => {
						return verifiedUser ? <AddFoodEntry {...props} /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.classroom.landing}
					render={(props) => {
						return verifiedUser ? <ClassroomLandingPage {...props} /> : <Login />;
					}}
				/>

				<Route
					exact
					path={AllRoutesListed.adminRoutes.main}
					render={(props) => {
						return verifiedUser ? <AdminLandingPage {...props} /> : <Login />;
					}}
				/>
				<Route
					exact
					path={AllRoutesListed.adminRoutes.selectedUser}
					render={(props) => {
						return verifiedUser ? <DisplaySelectedUsersDataBreakdown {...props} /> : <Login />;
					}}
				/>

				{/* Tabs Routes */}

				<Route exact path='/:tab(tab1)' component={HomePage} />
				<Route exact path='/:tab(tab2)' component={Dashboard} />
				<Route exact path='/:tab(tab3)' component={FastTimerPage} />
				<Route exact path='/:tab(tab4)' component={WeightPage} />
				<Route exact path='/:tab(tab5)' component={WaterDiaryPage} />
				<Route exact path='/:tab(tab6)' component={ScalePhotos} />
				<Route exact path='/:tab(tab7)' component={AddFoodEntry} />

				{/* Default Root */}
				<Route
					path='/'
					render={() => {
						return verifiedUser ? <HomePage /> : <Register />;
					}}
				/>
			</IonRouterOutlet>

			{verifiedUser ? (
				<IonTabBar slot='bottom' color='light'>
					<IonTabButton tab='tab1' href='/tab1'>
						<IonIcon color='medium' icon={homeOutline} />
					</IonTabButton>

					<IonTabButton tab='tab3' href='/tab3'>
						<IonIcon color='medium' icon={hourglassOutline} />
					</IonTabButton>

					<IonTabButton tab='tab4' href='/tab4'>
						<IonIcon color='medium' icon={barChartOutline} />
					</IonTabButton>

					<IonTabButton tab='tab5' href='/tab5'>
						<IonIcon color='medium' icon={waterOutline} />
					</IonTabButton>

					<IonTabButton tab='tab7' href='/tab7'>
						<IonIcon color='medium' icon={nutritionOutline} />
					</IonTabButton>

					<IonTabButton tab='tab6' href='/tab6'>
						<IonIcon color='medium' icon={cameraOutline} />
					</IonTabButton>

					<IonTabButton tab='tab2' href='/tab2'>
						<IonIcon color='medium' icon={personOutline} />
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
		authed: state.firebase.auth
	};
};

export default connect(mapStateToProps)(MainTabs);
