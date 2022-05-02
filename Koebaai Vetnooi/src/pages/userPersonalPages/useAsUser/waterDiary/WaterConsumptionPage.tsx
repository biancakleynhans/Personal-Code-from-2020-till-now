import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonHeader, IonCard, IonButton } from '@ionic/react';
import Water from './water vetnoi.png';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/ReduxModels';
import PushNotify from '../../../../components/pushNotify/PushNotifications';
import { User_Update_NotifyToken, AddNotifToRedux } from '../../../../services/redux/actions/001UserActions';

import LogSvg from '../../../../components/waterDisplay/log/LogSvg';
import SliderMonthsDisplay from '../../../../components/waterDisplay/months/SliderMonthsDisplay';
import { SaveWaterEntry } from '../../../../services/redux/actions/004WaterDiaryActions';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import WaterdisplayData from '../../../../components/waterDisplay/months/WaterdisplayData';

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

export class WaterDiaryPage extends Component<any, iState> {
	// constructor(props: any) {
	// 	super(props);
	// 	const { useCurrent } = this.props;
	// 	this.state = useCurrent;
	// 	// console.log('state', this.state);
	// }

	// componentDidUpdate(prevProps: any) {
	// 	if (prevProps.useCurrent !== this.props.useCurrent) {
	// 		this.setState(this.props.useCurrent);
	// 	}
	// }

	// componentWillUnmount() {
	// 	localStorage.setItem('waterKeeper', JSON.stringify(this.state));
	// 	var month = new Date(this.state.date).getMonth();
	// 	console.log('MONTH', month);
	// }

	// addGlass() {
	// 	console.log('clicked', this.state.isHovered);
	// 	this.setState({
	// 		isHovered: !this.state.isHovered,
	// 		color1: 'blue',
	// 		color5: 'white',
	// 		waterConsumed: this.state.waterConsumed + 250,
	// 		waterRemaining: 3000 - this.state.waterConsumed - 250
	// 	});
	// 	localStorage.setItem('waterKeeper', JSON.stringify(this.state));

	// 	if (this.state.color1 === 'blue') {
	// 		this.setState({ isHovered: !this.state.isHovered, color2: 'blue' });
	// 		localStorage.setItem('waterKeeper', JSON.stringify(this.state));
	// 	}
	// 	if (this.state.color1 === 'blue' && this.state.color2 === 'blue') {
	// 		this.setState({ isHovered: !this.state.isHovered, color3: 'blue' });
	// 		localStorage.setItem('waterKeeper', JSON.stringify(this.state));
	// 	}
	// 	if (this.state.color1 === 'blue' && this.state.color2 === 'blue' && this.state.color3 === 'blue') {
	// 		this.setState({ isHovered: !this.state.isHovered, color4: 'blue' });
	// 		localStorage.setItem('waterKeeper', JSON.stringify(this.state));
	// 	}
	// 	if (this.state.color1 === 'blue' && this.state.color2 === 'blue' && this.state.color3 === 'blue' && this.state.color4 === 'blue') {
	// 		this.setState({
	// 			isHovered: !this.state.isHovered,
	// 			color1: 'white',
	// 			color2: 'white',
	// 			color3: 'white',
	// 			color4: 'white',
	// 			color5: 'blue'
	// 		});
	// 		localStorage.setItem('waterKeeper', JSON.stringify(this.state));
	// 	}

	// 	if (this.state.waterRemaining === 0) {
	// 		this.setState({ waterRemaining: 0 });
	// 		localStorage.setItem('waterKeeper', JSON.stringify(this.state));
	// 	}
	// }

	// saveWaterConsumed() {
	// 	const { user } = this.props;
	// 	var obj = {
	// 		userId: user.id,
	// 		water: {
	// 			id: new Date().getTime(),
	// 			waterConsumed: this.state.waterConsumed,
	// 			date: new Date(this.state.date).getTime()
	// 		}
	// 	};

	// 	console.log('boj', obj);
	// 	// Add server Call
	// 	this.props.saveWater(obj);
	// 	this.setState({
	// 		date: new Date(),
	// 		waterConsumed: 0,
	// 		waterGoal: 3000,
	// 		waterRemaining: 3000,
	// 		isHovered: false,
	// 		color1: 'white',
	// 		color2: 'white',
	// 		color3: 'white',
	// 		color4: 'white',
	// 		color5: 'white'
	// 	});
	// 	window.localStorage.removeItem('waterKeeper');
	// }

	render() {
		// const { currentWaterConsumed } = this.props;
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.WaterDiary)} />
					</IonHeader>
					<br />
					<br />
					<br />

					{/* <IonCard style={{ color: 'var(--ion-text-color)' }}>
						<IonGrid>
							<IonRow>
								<IonCol style={{ fontSize: 'large', color: 'var(--ion-text-color)' }}>
									<b>{Translate(lsInj.transDict.goal)} :</b>
									<br /> {this.state.waterGoal / 1000} L
								</IonCol>
								<IonCol style={{ fontSize: 'large', color: 'var(--ion-text-color)' }}>
									<b>{Translate(lsInj.transDict.done)}:</b>
									<br /> {(this.state.waterConsumed + currentWaterConsumed) / 1000} L
								</IonCol>
								<IonCol style={{ fontSize: 'large', color: 'var(--ion-text-color)' }}>
									<b>{Translate(lsInj.transDict.remainWater)}:</b>
									<br /> {this.state.waterRemaining / 1000} L
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonCard> */}

					<IonGrid>
						<IonRow>
							{!this.props.hasNotify && (
								<PushNotify saveNotifyCode={(token: string) => this.props.saveNotifyCode(token)} addToRedux={(notifs: any[]) => this.props.addNotifToredux(notifs)} />
							)}
						</IonRow>
						{/* <IonRow>
							<IonCol>
								<IonButton onClick={() => this.addGlass()}>{Translate(lsInj.transDict.add)}</IonButton>
								<IonButton onClick={() => this.saveWaterConsumed()}>{Translate(lsInj.transDict.endDay)}</IonButton>
							</IonCol>

							<IonCol>
								<LogSvg color1={this.state.color1} color2={this.state.color2} color3={this.state.color3} color4={this.state.color4} color5={this.state.color5} />
							</IonCol>
						</IonRow>

						<IonRow>
							<IonCol>
								<SliderMonthsDisplay startAt={new Date(this.state.date).getMonth() + 1}></SliderMonthsDisplay>
							</IonCol>
						</IonRow> */}

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

const mapStateToProps = (state: IAppState) => {
	// var useCurrent = {};
	// const useArr = convertObjectToArray(state.waterDiary.WaterDiary);
	// const dataM = WaterdisplayData(useArr);
	// const checkToday = new Date().getDate();
	// const ls = localStorage.getItem('waterKeeper');
	// const consumedFromServer = dataM[0] !== undefined ? dataM[0].perday[checkToday]?.totalWater : 0;

	// if (ls !== null) {
	// 	var lsD = JSON.parse(ls);
	// 	const cons = lsD.waterConsumed + consumedFromServer;
	// 	const rem = lsD.waterGoal - cons;
	// 	useCurrent = {
	// 		date: lsD.date,
	// 		waterConsumed: cons,
	// 		waterGoal: lsD.waterGoal,
	// 		waterRemaining: rem < 0 ? 0 : rem,
	// 		isHovered: lsD.isHovered,
	// 		color1: lsD.color1,
	// 		color2: lsD.color2,
	// 		color3: lsD.color3,
	// 		color4: lsD.color4,
	// 		color5: lsD.color5
	// 	};
	// } else {
	// 	useCurrent = {
	// 		date: new Date(),
	// 		waterConsumed: 0,
	// 		waterGoal: 3000,
	// 		waterRemaining: 0,
	// 		isHovered: false,
	// 		color1: 'white',
	// 		color2: 'white',
	// 		color3: 'white',
	// 		color4: 'white',
	// 		color5: 'white'
	// 	};
	// }

	// console.log('useArr', useArr);
	// console.log('dataM', dataM);
	// console.log('checkToday', checkToday);
	// console.log('dataM[0]', dataM[0]);
	// console.log('dataM[0].perday[checkToday]', dataM[0].perday[checkToday]);
	// console.log('dataM[0].perday[checkToday].totalWater', dataM[0].perday[checkToday]?.totalWater);
	// console.log('consumedFromServer', consumedFromServer);
	// console.log('useCurrent', useCurrent);

	return {
		hasNotify: state.user.notifyToken !== undefined && state.user.notifyToken.length > 0 ? true : false,
		user: state.user
		// currentWaterConsumed: consumedFromServer,
		// useCurrent
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		saveNotifyCode: (token: string) => dispatch(User_Update_NotifyToken(token)),
		addNotifToredux: (notifs: any[]) => dispatch(AddNotifToRedux(notifs)),
		saveWater: (waterData: any) => dispatch(SaveWaterEntry(waterData))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(WaterDiaryPage);
