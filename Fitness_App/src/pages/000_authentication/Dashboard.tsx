/** @format */

import React from 'react';
import { IonContent, IonPage, IonCard, IonGrid, IonRow, IonCol, IonRouterLink } from '@ionic/react';
import { GetUserFromServer, Get } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { convertObjectToArray } from '../../helpers/Tools';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';
import ProfileImagepicker from '../../components/profileImage/chooseImg/ProfileImagepicker';
import { UserInputForm } from '../003_userInfo/001UserInputForm';

interface iProps {}

interface iState {
	username: string;
	imageUrl: string;
	age: number;
	cWeight: number;
	gWeight: number;
	height: number;
	bmi: number;
	bmr: number;
	actLevel: string;
	cal: number;
	fast: string;
	dietType: string;
	macros: {};
	goal: string;
}

class DashboardPage extends React.Component<iProps, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			username: '',
			imageUrl: 'https://firebasestorage.googleapis.com/v0/b/koebaaivetnoiserver.appspot.com/o/no-img.png?alt=media',
			age: 0,
			cWeight: 0,
			gWeight: 0,
			height: 0,
			bmi: 0,
			bmr: 0,
			actLevel: '',
			cal: 0,
			fast: '',
			dietType: '',
			macros: {},
			goal: ''
		};
	}

	componentDidMount() {
		this.getUD();
		this.getUII();
	}

	getUD() {
		GetUserFromServer()
			.then(doc => {
				if (doc.exists) {
					console.log('userdata', doc.data());
					var userData = doc.data();

					if (userData !== undefined) {
						const newUser = {
							username: userData.email,
							imageUrl: userData.imageUrl
						};

						this.setState(newUser);
					} else {
						console.log('no data', doc.data());
						const newUser = {
							username: '',
							imageUrl: TypesToServer.Img
						};

						this.setState(newUser);
					}
				} else {
					console.error('User not found');
				}
			})
			.catch(err => {
				console.error('User not found', err);
			});
	}

	getUII() {
		var user = { age: 0, cWeight: 0, gWeight: 0, height: 0, bmi: 0, bmr: 0, actLevel: '', cal: 0, fast: '', dietType: '', macros: {}, goal: '' };

		Get(TypesToServer.UserInfo)
			.then(function(snapshot) {
				console.log('UserInfo => snapshot.val()', snapshot.val());
				var data = snapshot.val();

				if (data !== null) {
					console.log('GetUii', data);
					// activeLevel: "None"  age: 26 bmi: 36.73 bmr: 1789.9 calReq: 2147.88 height: 165 sex: "female" weight: 100 goalWeight: 80 date: "2020-01-10T12:08:13.387Z"
					var ArrFromServer = convertObjectToArray(data);

					const newUser = {
						actLevel: ArrFromServer[0].activeLevel,
						age: ArrFromServer[0].age,
						bmi: ArrFromServer[0].bmi,
						bmr: ArrFromServer[0].bmr,
						cal: ArrFromServer[0].calReq,
						height: ArrFromServer[0].height,
						cWeight: ArrFromServer[0].weight,
						gWeight: ArrFromServer[0].goalWeight,
						dietType: ArrFromServer[0].dietType,
						macros: ArrFromServer[0].macros,
						goal: ArrFromServer[0].goalToAchievel,
						fast: ''
					};

					user = newUser;
					localStorage.setItem('User', JSON.stringify(newUser));
					console.log('user after second call', user);
				} else {
					const newUser = {
						actLevel: '',
						age: 0,
						bmi: 0,
						bmr: 0,
						cal: 0,
						height: 0,
						cWeight: 0,
						gWeight: 0,
						dietType: '',
						macros: { carbs: 50, protein: 30, fat: 20 },
						goal: '',
						fast: ''
					};
					user = newUser;
				}
			})
			.catch(error => {
				console.log('error get', error);
			});

		this.setState(user);
		return user;
	}

	render() {
		// console.log("render state",this.state)
		return (
			<IonPage>
				<PageHeader titleString={LablesList.Page_Header_Names.Dashboard.af} />
				<IonContent>
					<IonCard color='tertiary'>
						<IonGrid>
							<IonRow>
								<IonCol>
									<IonCard></IonCard>
								</IonCol>
							</IonRow>

							<IonRow>
								<IonCol align-self-start>
									<ProfileImagepicker />
									<br />
									<br />
									<b>{LablesList.DashboardPage.name.af} :</b>
									{this.state.username}
									<br />
									<b>{LablesList.DashboardPage.age.af} :</b>
									{this.state.age}
									<br />
									<b>{LablesList.DashboardPage.C_weight.af} :</b>
									{this.state.cWeight} Kg
									<br />
									<b>{LablesList.DashboardPage.G_weight.af} :</b>
									{this.state.gWeight} Kg
									<br />
									<b>{LablesList.DashboardPage.height.af} :</b>
									{this.state.height}
									<br />
									<b>Bmi :</b>
									{this.state.bmi}
									<br />
									<b>Bmr :</b>
									{this.state.bmr}
									<br />
									<b>{LablesList.DashboardPage.fitness.af} :</b>
									{this.state.actLevel}
									<br />
									<b>{LablesList.DashboardPage.cal.af} :</b>
									{this.state.cal} cal
									<br />
									<b>{LablesList.DashboardPage.fastType.af} :</b>
									{this.state.fast}
									<br />
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonCard>
					<UserInputForm />

					<IonRouterLink href='/pdfAdmin'>{LablesList.DashboardPage.adminButton.af}</IonRouterLink>
					<IonRouterLink href='/imgAdmin'>{LablesList.DashboardPage.adminButton.af}</IonRouterLink>
				</IonContent>
			</IonPage>
		);
	}
}

export default DashboardPage;
