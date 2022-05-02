/** @format */

import React, { Component } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { IonPage, IonContent, IonCard, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';

import SliderMonthsDisplay from '../../components/waterDisplay/months/SliderMonthsDisplay';
import { isLocalNotify_Mobile, LocalNotify_Mobile_TypeList } from '../../capAddOns/localNotifications/LocalNotify';
import { Add } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { LablesList } from '../../components/titleLists/Titles';

import Water from './water vetnoi.png';
import LogSvg from '../../components/waterDisplay/log/LogSvg';

interface iProps {}
interface iState {
	date: any;
	waterConsumed: number;
	waterGoal: number;
	waterRemaining: number;
	isHovered: boolean;
	color1: string;
	color2: string;
	color3: string;
	color4: string;
	color5: string;
}

class WaterDiaryPage extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		var ls = localStorage.getItem('waterKeeper');
		if (ls !== null) {
			var lsD = JSON.parse(ls);
			this.state = {
				date: lsD.date,
				waterConsumed: lsD.waterConsumed,
				waterGoal: lsD.waterGoal,
				waterRemaining: lsD.waterRemaining,
				isHovered: lsD.isHovered,
				color1: lsD.color1,
				color2: lsD.color2,
				color3: lsD.color3,
				color4: lsD.color4,
				color5: lsD.color5
			};
		} else {
			this.state = {
				date: new Date(),
				waterConsumed: 0,
				waterGoal: 3000,
				waterRemaining: 3000,
				isHovered: false,
				color1: 'white',
				color2: 'white',
				color3: 'white',
				color4: 'white',
				color5: 'white'
			};
		}
	}

	componentWillUnmount() {
		localStorage.setItem('waterKeeper', JSON.stringify(this.state));
		var month = new Date(this.state.date).getMonth();
		console.log('MONTH', month);
	}

	addGlass() {
		console.log('clicked', this.state.isHovered);
		localStorage.setItem('waterKeeper', JSON.stringify(this.state));

		this.setState({
			isHovered: !this.state.isHovered,
			color1: 'blue',
			color5: 'white',
			waterConsumed: this.state.waterConsumed + 250,
			waterRemaining: 3000 - this.state.waterConsumed - 250
		});

		if (this.state.color1 === 'blue') {
			this.setState({ isHovered: !this.state.isHovered, color2: 'blue' });
		}
		if (this.state.color1 === 'blue' && this.state.color2 === 'blue') {
			this.setState({ isHovered: !this.state.isHovered, color3: 'blue' });
		}
		if (this.state.color1 === 'blue' && this.state.color2 === 'blue' && this.state.color3 === 'blue') {
			this.setState({ isHovered: !this.state.isHovered, color4: 'blue' });
		}
		if (this.state.color1 === 'blue' && this.state.color2 === 'blue' && this.state.color3 === 'blue' && this.state.color4 === 'blue') {
			this.setState({ isHovered: !this.state.isHovered, color1: 'white', color2: 'white', color3: 'white', color4: 'white', color5: 'blue' });
		}

		if (this.state.waterRemaining === 0) {
			this.setState({ waterRemaining: 0 });
		}
	}

	saveWaterConsumed() {
		var obj = {
			waterConsumed: this.state.waterConsumed,
			date: new Date(this.state.date).toUTCString()
		};
		Add(TypesToServer.WaterDiary, obj);
	}

	addNotify() {
		isLocalNotify_Mobile(
			LocalNotify_Mobile_TypeList.ReOccuringNotify,
			LablesList.WaterDiaryPage.reminder.remiderText.title.af,
			LablesList.WaterDiaryPage.reminder.remiderText.body.af,
			true,
			true,
			6,
			0
		);
	}

	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.WaterDiary.af} />
				<IonContent>
					<IonCard>
						<IonGrid>
							<IonRow>
								<IonCol style={{ fontSize: 'large' }}>
									<b>{LablesList.WaterDiaryPage.Labels.goal.af} :</b>
									<br /> {this.state.waterGoal / 1000} L
								</IonCol>
								<IonCol style={{ fontSize: 'large' }}>
									<b>{LablesList.WaterDiaryPage.Labels.done.af}:</b>
									<br /> {this.state.waterConsumed / 1000} L
								</IonCol>
								<IonCol style={{ fontSize: 'large' }}>
									<b>{LablesList.WaterDiaryPage.Labels.remain.af}:</b>
									<br /> {this.state.waterRemaining / 1000} L
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonCard>

					<IonGrid>
						<IonRow>
							<IonCol>
								<IonButton onClick={() => this.addNotify()}>{LablesList.WaterDiaryPage.reminder.af}</IonButton>

								<IonButton onClick={() => this.addGlass()}>{LablesList.WaterDiaryPage.Labels.add.af}</IonButton>

								<IonButton onClick={() => this.saveWaterConsumed()}>{LablesList.WaterDiaryPage.Labels.endDay.af}</IonButton>
							</IonCol>

							<IonCol>
								<LogSvg color1={this.state.color1} color2={this.state.color2} color3={this.state.color3} color4={this.state.color4} color5={this.state.color5} />
							</IonCol>
						</IonRow>

						<IonRow>
							<IonCol>
								<SliderMonthsDisplay startAt={new Date(this.state.date).getMonth() + 1}></SliderMonthsDisplay>
							</IonCol>
						</IonRow>

						<IonRow>
							<IonCol>
								<img className='parent' src={Water} alt='waterGirl'></img>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonContent>
			</IonPage>
		);
	}
}

export default WaterDiaryPage;
