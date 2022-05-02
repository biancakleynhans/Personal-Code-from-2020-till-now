/** @format */

import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router';
import RegisterPage from '../../pages/000_authentication/Register';
import LoginPage from '../../pages/000_authentication/Login';
import DashboardPage from '../../pages/000_authentication/Dashboard';
import FastTypeSelectPage from '../../pages/001_fasting/001FastType';
import FastEditPage from '../../pages/001_fasting/004FastEdit';
import FastHistoryPage from '../../pages/001_fasting/003FastHistory';
import FastTimerPage from '../../pages/001_fasting/002FastTimer';
import WeightPage from '../../pages/002_weight/002WeightAdd';
import WeightHistory from '../../pages/002_weight/003WeightHistory';
import HomePage from '../../pages/004_sliders/Home';
import ReseptePage from '../../pages/004_sliders/Resepte';
import VloermoerPage from '../../pages/004_sliders/Vloermoer';
import ScalePhotos from '../../pages/005_cameraPages/ScalePhotos';
import AddBookToLibary from '../../pages/000_adminOnlyPages/AddBookToLibary';
import WaterDiaryPage from '../../pages/006_waterDiary/WaterConsumptionPage';
import DayView from '../../pages/007_foodDiary/000DayView';
import AddFoodViewContainer from '../../pages/007_foodDiary/001AddFoodViewContainer';
import CreateFoodView from '../../pages/007_foodDiary/002CreateFoodView';
import VetnoiContainerPage from '../../pages/008_bookLibary/VetnoiContainerPage';
import BookOpened from '../../pages/008_bookLibary/BookOpened';
import AddCardsToLibary from '../../pages/000_adminOnlyPages/AddCardsToLibary';
import BybleBookContainerPage from '../../pages/008_bookLibary/BybleBookContainerPage';
import BybleStudyContainerPage from '../../pages/008_bookLibary/BybleStudyContainerPage';
import NewsPaperContainerPage from '../../pages/008_bookLibary/NewsPaperContainerPage';
import CourseContainerPage from '../../pages/008_bookLibary/CourseContainerPage';

export function getAuthed() {
	const user = localStorage.user;
	console.log('token', user);
	if (user) {
		return true;
	} else {
		return false;
	}
}

class RoutesListComp extends React.Component {
	render() {
		return (
			<IonRouterOutlet id='main'>
				{/* Usual Pages */}
				<Route path='/home' component={HomePage} exact={true} />

				<Route path='/register' component={RegisterPage} exact={true} />
				<Route path='/' component={LoginPage} exact={true} />

				<Route
					exact
					path='/dashboard'
					render={props => {
						return getAuthed() ? <DashboardPage {...props} /> : <LoginPage />;
					}}
				/>

				{/* Admin Pages */}
				<Route
					exact
					path='/pdfAdmin'
					render={props => {
						return getAuthed() ? <AddBookToLibary {...props} /> : <LoginPage />;
					}}
				/>

				<Route
					exact
					path='/imgAdmin'
					render={props => {
						return getAuthed() ? <AddCardsToLibary {...props} /> : <LoginPage />;
					}}
				/>

				{/* App Pages */}

				<Route
					exact
					path='/fastType'
					render={props => {
						return getAuthed() ? <FastTypeSelectPage {...props} /> : <LoginPage />;
					}}
				/>
				<Route
					exact
					path='/fastTimer'
					render={props => {
						return getAuthed() ? <FastTimerPage {...props} /> : <LoginPage />;
					}}
				/>
				<Route
					exact
					path='/fastHistory'
					render={props => {
						return getAuthed() ? <FastHistoryPage {...props} /> : <LoginPage />;
					}}
				/>
				<Route
					exact
					path='/fastEdit/:id'
					render={props => {
						return getAuthed() ? <FastEditPage {...props} /> : <LoginPage />;
					}}
				/>

				<Route
					exact
					path='/weightAdd'
					render={props => {
						return getAuthed() ? <WeightPage {...props} /> : <LoginPage />;
					}}
				/>
				<Route
					exact
					path='/weightHistory'
					render={props => {
						return getAuthed() ? <WeightHistory {...props} /> : <LoginPage />;
					}}
				/>

				<Route
					exact
					path='/waterDiary'
					render={props => {
						return getAuthed() ? <WaterDiaryPage {...props} /> : <LoginPage />;
					}}
				/>

				{/* Food Diary */}
				<Route
					exact
					path='/foodDiary'
					render={props => {
						return getAuthed() ? <DayView {...props} /> : <LoginPage />;
					}}
				/>
				<Route
					exact
					path='/add/:meal/:day'
					render={props => {
						return getAuthed() ? <AddFoodViewContainer {...props} /> : <LoginPage />;
					}}
				/>
				<Route
					exact
					path='/createfood/:meal/:day'
					render={props => {
						return getAuthed() ? <CreateFoodView {...props} /> : <LoginPage />;
					}}
				/>

				<Route
					exact
					path='/scalePhoto'
					render={props => {
						return getAuthed() ? <ScalePhotos {...props} /> : <LoginPage />;
					}}
				/>

				<Route
					exact
					path='/tantrum'
					render={props => {
						return getAuthed() ? <VloermoerPage {...props} /> : <LoginPage />;
					}}
				/>

				<Route
					exact
					path='/recipes'
					render={props => {
						return getAuthed() ? <ReseptePage {...props} /> : <LoginPage />;
					}}
				/>

				<Route
					exact
					path='/booksContainer'
					render={props => {
						return getAuthed() ? <VetnoiContainerPage {...props} /> : <LoginPage />;
					}}
				/>

				<Route
					exact
					path='/vetnoi'
					render={props => {
						return getAuthed() ? <VetnoiContainerPage {...props} /> : <LoginPage />;
					}}
				/>

				<Route
					exact
					path='/byble'
					render={props => {
						return getAuthed() ? <BybleBookContainerPage {...props} /> : <LoginPage />;
					}}
				/>
				<Route
					exact
					path='/bybleStudy'
					render={props => {
						return getAuthed() ? <BybleStudyContainerPage {...props} /> : <LoginPage />;
					}}
				/>
				<Route
					exact
					path='/news'
					render={props => {
						return getAuthed() ? <NewsPaperContainerPage {...props} /> : <LoginPage />;
					}}
				/>

				<Route
					exact
					path='/courses'
					render={props => {
						return getAuthed() ? <CourseContainerPage {...props} /> : <LoginPage />;
					}}
				/>

				<Route
					exact
					path='/book/:book'
					render={props => {
						return getAuthed() ? <BookOpened {...props} /> : <LoginPage />;
					}}
				/>
			</IonRouterOutlet>
		);
	}
}

export default RoutesListComp;
