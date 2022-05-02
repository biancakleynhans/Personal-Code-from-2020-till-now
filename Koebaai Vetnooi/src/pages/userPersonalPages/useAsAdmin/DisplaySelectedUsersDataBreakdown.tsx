import React, { Component } from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonCard,
	IonCardHeader,
	IonAvatar,
	IonItem,
	IonLabel,
	IonCardContent,
	IonCardTitle,
	IonSlides,
	IonSlide,
	IonCardSubtitle
} from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/ReduxModels';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import moment from 'moment';

function displayGoal(type: string) {
	if (type === 'looseWeight') {
		return Translate(lsInj.transDict.lose);
	} else if (type === 'gainWeight') {
		return Translate(lsInj.transDict.gain);
	} else if (type === 'gainMuscle') {
		return Translate(lsInj.transDict.muscle);
	} else {
		return Translate(lsInj.transDict.noData);
	}
}

function displayFitness(type: string) {
	if (type === 'None') {
		return Translate(lsInj.transDict.none);
	} else if (type === 'Light') {
		return Translate(lsInj.transDict.light);
	} else if (type === 'Moderate') {
		return Translate(lsInj.transDict.mod);
	}
	if (type === 'Very') {
		return Translate(lsInj.transDict.heavy);
	} else if (type === 'Extra') {
		return Translate(lsInj.transDict.extreme);
	} else {
		return Translate(lsInj.transDict.noData);
	}
}
function createCardColor(type: string) {
	//"primary", "secondary", "tertiary", "light"
	if (type === 'Breakfast') {
		return 'primary';
	} else if (type === 'Lunch') {
		return 'secondary';
	} else if (type === 'Dinner') {
		return 'tertiary';
	} else if (type === 'Snacks') {
		return 'medium';
	} else {
		return 'medium';
	}
}

function displayMealType(type: string) {
	//"primary", "secondary", "tertiary", "light"
	if (type === 'Breakfast') {
		return Translate(lsInj.transDict.BreakFast);
	} else if (type === 'Lunch') {
		return Translate(lsInj.transDict.Lunch);
	} else if (type === 'Dinner') {
		return Translate(lsInj.transDict.Dinner);
	} else if (type === 'Snacks') {
		return Translate(lsInj.transDict.Snack);
	} else {
		return Translate(lsInj.transDict.noData);
	}
}
const slideOpts = {
	initialSlide: 0,
	speed: 400
};

class DisplaySelectedUsersDataBreakdown extends Component<any> {
	render() {
		const { currentUser, useArrFood, useArrFast, useArrWeight } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />
					{/* Basic info */}
					<IonCard style={{ color: 'var(--ion-text-color)' }}>
						<IonCardHeader style={{ color: 'var(--ion-text-color)', margin: 'auto', padding: 0, fontSize: ' 1.5em' }}>
							<IonItem lines='none'>
								<IonAvatar style={{ width: '55px', height: '55px' }} slot='start'>
									<img src={currentUser.avatar} alt='brokjen' />
								</IonAvatar>
								<IonLabel>
									{currentUser.name} <br />
								</IonLabel>
							</IonItem>
						</IonCardHeader>
						<IonCardContent style={{ textAlign: 'left', color: 'var(--ion-text-color)' }}>
							<b>{Translate(lsInj.transDict.Email)}:</b> {currentUser.email} <br />
							<b>{Translate(lsInj.transDict.fitness)}</b>: {displayFitness(useArrWeight[0] !== undefined ? useArrWeight[0].activeLevel : '')} <br />
							<b>{Translate(lsInj.transDict.goalis)}</b> {displayGoal(useArrWeight[0] !== undefined ? useArrWeight[0].goalToAchieve : '')} <br />
							<b>{Translate(lsInj.transDict.age)}</b>: {useArrWeight[0] !== undefined ? useArrWeight[0].age : 0} <br />
							<b>{Translate(lsInj.transDict.bmiis)}</b> {useArrWeight[0] !== undefined ? useArrWeight[0].bmi : 0} <br />
							<b>{Translate(lsInj.transDict.weightis)}</b> {useArrWeight[0] !== undefined ? useArrWeight[0].weight : 0} <br />
							<b>{Translate(lsInj.transDict.gweightis)}</b> {useArrWeight[0] !== undefined ? useArrWeight[0].goalWeight : 0} <br />
						</IonCardContent>
					</IonCard>

					<IonCard style={{ color: 'var(--ion-text-color)' }}>
						<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.Fast)}</IonCardTitle>
						<IonSlides pager={true} options={slideOpts}>
							{useArrFast.map((item: any, index: number) => {
								// console.log(item.id);
								return (
									<IonSlide key={index}>
										<IonCard style={{ color: 'var(--ion-text-color)', padding: '10px' }} color='primary'>
											<IonCardContent>
												{moment(item.startTime).format('Do MMMM, h:mm a')}
												<br />
												{moment(item.endTime).format('Do MMMM, h:mm a')} <br />
												{item.duration.toFixed(2)} H <br />
												{item.typeofFast.name} <br />
												{Translate(lsInj.transDict.changefastHistory)}
											</IonCardContent>
										</IonCard>
									</IonSlide>
								);
							})}
						</IonSlides>
					</IonCard>
					<br />

					<IonCard style={{ color: 'var(--ion-text-color)' }}>
						<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>Gewig</IonCardTitle>
						<IonSlides pager={true} options={slideOpts}>
							{useArrWeight.map((item: any, index: number) => {
								return (
									<IonSlide key={index}>
										<IonCard key={item.id} style={{ color: 'var(--ion-text-color)', padding: '10px', width: '200px', height: '150px' }} color='primary'>
											{moment(item.date).format('lll')}
											<br />
											<b>{Translate(lsInj.transDict.c_weight)}: </b>
											{item.weight} Kg <br />
											<b>{Translate(lsInj.transDict.bust)}:</b>
											{item.bust} cm <br />
											<b>{Translate(lsInj.transDict.middle)}:</b>
											{item.waist} cm <br />
											<b>{Translate(lsInj.transDict.hips)}:</b>
											{item.hip} cm <br />
											<b>{Translate(lsInj.transDict.thigh)}:</b>
											{item.thigh} cm <br />
											<b>{Translate(lsInj.transDict.arm)}:</b>
											{item.uperArm} cm <br />
										</IonCard>
									</IonSlide>
								);
							})}
						</IonSlides>
					</IonCard>
					<br />

					<IonCard style={{ color: 'var(--ion-text-color)' }}>
						<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.Food)}</IonCardTitle>
						<IonSlides pager={true} options={slideOpts}>
							{useArrFood.map((food: any) => {
								return (
									<IonSlide key={food.id}>
										<IonCard color={createCardColor(food.mealType)} style={{ color: 'var(--ion-text-color)' }}>
											<IonCardHeader style={{ color: 'var(--ion-text-color)' }}>
												<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{displayMealType(food.mealType)}</IonCardTitle>
												<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{moment(new Date(food.date)).format('Do MMMM, h:mm a')}</IonCardSubtitle>
											</IonCardHeader>
											<IonCardContent style={{ color: 'var(--ion-text-color)' }}>{food.mealContent}</IonCardContent>
										</IonCard>
									</IonSlide>
								);
							})}
						</IonSlides>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	const param = ownProps.match.params.userId;
	const current = state.adminUser.AllUsers[param];
	console.log('????', param, current);

	const useArrFast = convertObjectToArray(current.fasts).sort((a, b) => Number(b.id) - Number(a.id));
	const useArrWeight = convertObjectToArray(current.weights).sort((a, b) => Number(b.date) - Number(a.date));
	const useArrFood = convertObjectToArray(current.foodDiary).sort((a, b) => Number(b.date) - Number(a.date));

	console.log('useArrFast', useArrFast);
	console.log('useArrWeight', useArrWeight);
	console.log('useArrFood', useArrFood);

	return {
		currentUser: current,
		useArrFast,
		useArrFood,
		useArrWeight
	};
};

export default connect(mapStateToProps)(DisplaySelectedUsersDataBreakdown);
