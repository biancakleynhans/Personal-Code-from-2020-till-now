import React, { Component } from 'react';
import {
	IonPage,
	IonContent,
	IonToolbar,
	IonTitle,
	IonImg,
	IonHeader,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonList,
	IonItem,
	IonLabel,
	IonIcon
} from '@ionic/react';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/ReduxModels';
import PageHeader from '../../../../layout/Headers/PageHeader';
import ProfileSkeletonScreen from '../../../../layout/Loading_Redirecting/ProfileSkeletonScreen';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { ellipse } from 'ionicons/icons';
import {
	ActiveLevelPopOver,
	BmiPopOver,
	BmrPopOver,
	DietGoalPopOver,
	DietTypePopOver,
	GWeightPopOver,
	CWeightPopOver,
	MacrosPopOver
} from '../../../../layout/PopOvers/UserFitnessLevelPopOvers';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';

function set_ActiveLeve_lColor(stringMatch: 'None' | 'Light' | 'Moderate' | 'Very' | 'Extra') {
	// None Light Moderate Very Extra
	if (stringMatch === 'None') {
		return '#e70f0f';
	} else if (stringMatch === 'Light') {
		return '#e7910f';
	} else if (stringMatch === 'Moderate') {
		return '#dae70f';
	} else if (stringMatch === 'Very') {
		return '#26e70f';
	} else if (stringMatch === 'Extra') {
		return '#17720d';
	} else {
		return 'black';
	}
}

function set_BMI_Color(numberMatch: number) {
	// Below 18.5	Underweight
	if (numberMatch === 0) {
		return 'black';
	} else if (numberMatch > 3 && numberMatch < 18.5) {
		return '#e70fd6';
	}
	// 18.5 – 24.9	Normal or Healthy Weight
	else if (numberMatch >= 18.5 && numberMatch <= 24.9) {
		return '#26e70f';
	}
	// 25.0 – 29.9	Overweight
	else if (numberMatch >= 25 && numberMatch <= 29.9) {
		return '#f1ab0e';
	}
	// 30.0 and Above	Obese
	else if (numberMatch > 30) {
		return '#f10e0e';
	}
	//Not set
	else {
		return 'black';
	}
}

function set_GoalWeight_Color(current: number, goal: number) {
	const diff = current - goal;

	// start at biggest need to loose more than 50kg to hit goal weight
	if (diff > 50) {
		return '#800000';
	}
	// need to loose 45 - 50 kg to hit goal weight
	else if (diff >= 45 && diff <= 50) {
		return '#DC143C';
	}
	// need to loose 40 - 45 kg to hit goal weight
	else if (diff >= 40 && diff <= 45) {
		return '#CD5C5C';
	}
	// need to loose 40 - 35 kg to hit goal weight
	else if (diff >= 35 && diff <= 40) {
		return '#FF4500';
	}
	// need to loose 35 - 30 kg to hit goal weight
	else if (diff >= 30 && diff <= 35) {
		return '#FFD700';
	}
	// need to loose 30 - 25 kg to hit goal weight
	else if (diff >= 25 && diff <= 30) {
		return '#f1ab0e';
	}
	// need to loose 25 - 20 kg to hit goal weight
	if (diff >= 20 && diff <= 25) {
		return '#BDB76B';
	}
	// need to loose 20 - 15 kg to hit goal weight
	else if (diff >= 15 && diff <= 20) {
		return '#FFFF00';
	}
	// need to loose 15 - 10 kg to hit goal weight
	else if (diff >= 10 && diff <= 15) {
		return '#9ACD32';
	}
	// need to loose 10 - 5 kg to hit goal weight
	else if (diff >= 5 && diff <= 10) {
		return '#6B8E23';
	}
	// need to loose 5 - 3  kg to hit goal weight
	else if (diff >= 3 && diff <= 5) {
		return '#1E90FF';
	}
	// need to loose 0-3 to hit goal weight
	else if (diff >= 3 && diff <= 0) {
		return '#0000FF';
	}
	//
	else if (diff >= 0.9) {
		return '#9400D3';
	} else if (diff === 0) {
		return 'black';
	}
	//Not set
	else {
		return 'black';
	}
}

interface iState {
	activeLevel: boolean;
	bmi: boolean;
	bmr: boolean;
	calReq: boolean;
	dietType: boolean;
	goalToAchieve: boolean;
	goalWeight: boolean;
	macros: boolean;
	weight: boolean;
}

class Dashboard extends Component<any, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			activeLevel: false,
			bmi: false,
			bmr: false,
			calReq: false,
			dietType: false,
			goalToAchieve: false,
			goalWeight: false,
			macros: false,
			weight: false
		};
	}

	render() {
		const { user, fitnessLevelData } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader menuBtn={true} titleString={Translate(lsInj.transDict.Profile)} />
					</IonHeader>
					<br />
					<br />
					<br />
					{!this.props.loading && (
						<>
							<IonImg src={user.avatar} alt='broken' />
							<IonToolbar color='primary' className='profileBar'>
								<IonTitle>{user.name}</IonTitle>
							</IonToolbar>
							<br />
							<IonCard style={{ color: 'var(--ion-text-color)' }}>
								<IonCardContent style={{ color: 'var(--ion-text-color)' }}>{user.bio}</IonCardContent>
							</IonCard>
							<br />

							<IonCard style={{ color: 'var(--ion-text-color)' }}>
								<IonCardHeader style={{ color: 'var(--ion-text-color)' }}>
									<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.UserDataTitle)}</IonCardTitle>
								</IonCardHeader>
								<IonCardContent style={{ color: 'var(--ion-text-color)' }}>
									<IonList lines='none'>
										<IonItem
											button
											onClick={() => {
												return this.setState({
													weight: !this.state.weight
												});
											}}>
											<IonLabel>{Translate(lsInj.transDict.c_weight)}</IonLabel>
											<IonIcon slot='end' size='large' style={{ color: fitnessLevelData.weight === 0 ? 'black' : '#D3D3D3' }} icon={ellipse} />
										</IonItem>
										<IonItem
											button
											onClick={() => {
												return this.setState({
													goalWeight: !this.state.goalWeight
												});
											}}>
											<IonLabel>{Translate(lsInj.transDict.weight)}</IonLabel>
											<IonIcon
												slot='end'
												size='large'
												style={{
													color: set_GoalWeight_Color(fitnessLevelData.weight, fitnessLevelData.goalWeight)
												}}
												icon={ellipse}
											/>
										</IonItem>
										<IonItem
											button
											onClick={() => {
												return this.setState({
													activeLevel: !this.state.activeLevel
												});
											}}>
											<IonLabel>{Translate(lsInj.transDict.fitness)}</IonLabel>
											<IonIcon
												slot='end'
												size='large'
												style={{
													color: set_ActiveLeve_lColor(fitnessLevelData.activeLevel)
												}}
												icon={ellipse}
											/>
										</IonItem>
										<IonItem
											button
											onClick={() => {
												return this.setState({
													bmi: !this.state.bmi
												});
											}}>
											<IonLabel>{Translate(lsInj.transDict.bmi)}</IonLabel>
											<IonIcon
												slot='end'
												size='large'
												style={{
													color: set_BMI_Color(fitnessLevelData.bmi)
												}}
												icon={ellipse}
											/>
										</IonItem>
										<IonItem
											button
											onClick={() => {
												return this.setState({
													bmr: !this.state.bmr
												});
											}}>
											<IonLabel>{Translate(lsInj.transDict.bmr)}</IonLabel>
											<IonIcon slot='end' size='large' style={{ color: fitnessLevelData.bmr === 0 ? 'black' : '#3d008078' }} icon={ellipse} />
										</IonItem>
										<IonItem
											button
											onClick={() => {
												return this.setState({
													dietType: !this.state.dietType
												});
											}}>
											<IonLabel>{Translate(lsInj.transDict.dietType)}</IonLabel>
											<IonIcon slot='end' size='large' style={{ color: '#3d008078' }} icon={ellipse} />
										</IonItem>
										<IonItem
											button
											onClick={() => {
												return this.setState({
													goalToAchieve: !this.state.goalToAchieve
												});
											}}>
											<IonLabel>{Translate(lsInj.transDict.goals)}</IonLabel>
											<IonIcon slot='end' size='large' style={{ color: '#3d008078' }} icon={ellipse} />
										</IonItem>
										<IonItem
											button
											onClick={() => {
												return this.setState({
													macros: !this.state.macros
												});
											}}>
											<IonLabel>{Translate(lsInj.transDict.macro)}</IonLabel>
											<IonIcon slot='end' size='large' style={{ color: '#3d008078' }} icon={ellipse} />
										</IonItem>
									</IonList>

									{/* Popover Data for each element  */}

									{this.state.activeLevel && <ActiveLevelPopOver isOpenBool={this.state.activeLevel} prog={fitnessLevelData.activeLevel} />}

									{this.state.bmi && <BmiPopOver isOpenBool={this.state.bmi} prog={fitnessLevelData.bmi} />}

									{this.state.bmr && <BmrPopOver isOpenBool={this.state.bmr} prog={fitnessLevelData.bmr} />}

									{this.state.dietType && <DietTypePopOver isOpenBool={this.state.dietType} prog={fitnessLevelData.dietType} />}

									{this.state.goalToAchieve && <DietGoalPopOver isOpenBool={this.state.goalToAchieve} prog={fitnessLevelData.goalToAchieve} />}

									{this.state.macros && <MacrosPopOver isOpenBool={this.state.macros} prog={fitnessLevelData.macros} />}

									{this.state.weight && <CWeightPopOver isOpenBool={this.state.weight} prog={fitnessLevelData.weight} />}

									{this.state.goalWeight && <GWeightPopOver isOpenBool={this.state.goalWeight} prog={fitnessLevelData.goalWeight} />}
								</IonCardContent>
							</IonCard>
						</>
					)}

					{this.props.loading && <ProfileSkeletonScreen />}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	console.log('dash props:', state.weight.Weights);
	var sorted = convertObjectToArray(state.weight.Weights).sort((a, b) => Number(b.date) - Number(a.date));
	var smallest = sorted[0];
	console.log('???', smallest);

	var use = {
		activeLevel: smallest ? smallest.activeLevel : '',
		age: smallest ? smallest.age : 0,
		bmi: smallest ? smallest.bmi : 0,
		bmr: smallest ? smallest.bmr : 0,
		bust: smallest ? smallest.bust : 0,
		butt: smallest ? smallest.butt : 0,
		calReq: smallest ? smallest.calReq : 0,
		date: smallest ? smallest.date : 1597096926976,
		dietType: smallest ? smallest.dietType : 'koebaaiVetnoi',
		goalToAchieve: smallest ? smallest.goalToAchieve : 'lo,oseWeight',
		goalWeight: smallest ? smallest.goalWeight : 0,
		height: smallest ? smallest.height : 0,
		hip: smallest ? smallest.hip : 0,
		id: smallest ? smallest.id : 0,
		macros: smallest ? smallest.macros : { carb: 15, fat: 35, protein: 50 },
		sex: smallest ? smallest.sex : 'female',
		thigh: smallest ? smallest.thigh : 0,
		uperArm: smallest ? smallest.uperArm : 0,
		waist: smallest ? smallest.waist : 0,
		weight: smallest ? smallest.weight : 0
	};

	console.log('use', use);

	return {
		user: state.user,
		loading: state.user.isEmpty,
		fitnessLevelData: use
	};
};

export default connect(mapStateToProps)(Dashboard);
