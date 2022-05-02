import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonCard,
	IonItem,
	IonLabel,
	IonDatetime,
	IonList,
	IonSelect,
	IonSelectOption,
	IonTextarea,
	IonButton,
	IonCardHeader,
	IonTitle,
	IonCardSubtitle,
	IonCardContent,
	IonCardTitle,
	IonSlide,
	IonSlides
} from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { SaveFoodEntry } from '../../../../services/redux/actions/005FoodDiaryActions';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import moment from 'moment';

interface iState {
	date: any;
	mealChoice: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Notset';
	mealContent: string;
}

function MealOpts() {
	return (
		<>
			<IonSelectOption value='Breakfast'>{Translate(lsInj.transDict.BreakFast)}</IonSelectOption>
			<IonSelectOption value='Lunch'>{Translate(lsInj.transDict.Lunch)}</IonSelectOption>
			<IonSelectOption value='Dinner'>{Translate(lsInj.transDict.Dinner)}</IonSelectOption>
			<IonSelectOption value='Snack'>{Translate(lsInj.transDict.Snack)}</IonSelectOption>
		</>
	);
}

function TranslateMealTypeStringUi(type: string) {
	//mealChoice: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Notset';

	if (type === 'Breakfast') {
		return Translate(lsInj.transDict.BreakFast);
	} else if (type === 'Lunch') {
		return Translate(lsInj.transDict.Lunch);
	} else if (type === 'Dinner') {
		return Translate(lsInj.transDict.Dinner);
	} else if (type === 'Snacks') {
		return Translate(lsInj.transDict.Snack);
	} else {
		return '';
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
		return 'light';
	}
}

class AddFoodEntry extends Component<any, iState> {
	slideOpts = {
		initialSlide: 0,
		speed: 300,
		effect: 'flip', // "slide", "fade", "cube", "coverflow" or "flip"
		centeredSlides: true,
		grabCursor: true
	};
	constructor(props: any) {
		super(props);
		this.state = {
			date: new Date(),
			mealChoice: 'Notset',
			mealContent: ''
		};
	}

	changeDate(e: any) {
		// console.log('changeDate', e.detail.value);
		this.setState({ date: new Date(e.detail.value) });
	}
	changMealChoice(e: any) {
		// console.log('e => changMealChoice', e);
		this.setState({ mealChoice: e.detail.value });
	}
	changeMealContent(e: any) {
		console.log('e => changeMealContent', e);
		this.setState({ mealContent: e.detail.value });
	}
	submitMeal() {
		const { user } = this.props;
		const sendMealData = {
			userId: user.id,
			meal: {
				id: this.state.date.getTime(),
				date: this.state.date.getTime(),
				mealType: this.state.mealChoice,
				mealContent: this.state.mealContent
			}
		};

		this.props.addFoodEntry(sendMealData);
		this.setState({ mealChoice: 'Notset', mealContent: '' });
	}

	getContent() {
		return document.querySelector('ion-content');
	}

	scrollToBottom() {
		// console.log('???', this.getContent());
		return this.getContent()?.scrollToBottom(500);
	}

	scrollToTop() {
		// console.log('???', this.getContent());
		return this.getContent()?.scrollToTop(0);
	}

	render() {
		const { loading, meals } = this.props;
		return (
			<IonPage>
				<IonContent scrollEvents={true}>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.addFoodEntry)} />
					</IonHeader>
					<br /> <br />
					<br />
					<IonCard style={{ color: 'var(--ion-text-color)' }}>
						<IonList>
							<IonItem>
								<IonLabel>{Translate(lsInj.transDict.Date)}</IonLabel>
								<IonDatetime displayFormat='D MMM' value={this.state.date.toISOString()} onIonChange={(e) => this.changeDate(e)} />
							</IonItem>
							<IonItem>
								<IonLabel>{Translate(lsInj.transDict.mealType)}</IonLabel>
								<IonSelect cancelText={Translate(lsInj.transDict.Cancel)} okText={Translate(lsInj.transDict.Done)} onIonChange={(e) => this.changMealChoice(e)}>
									{MealOpts()}
								</IonSelect>
							</IonItem>
							<IonItem>
								<IonLabel>{Translate(lsInj.transDict.mealContent)}</IonLabel>
								<IonTextarea
									placeholder={Translate(lsInj.transDict.mealContentPlaceholder)}
									value={this.state.mealContent}
									onIonChange={(e) => this.changeMealContent(e)}
									autoGrow
								/>
							</IonItem>
						</IonList>
						<IonButton color='primary' onClick={() => this.submitMeal()} disabled={this.state.mealChoice === 'Notset' || this.state.mealContent.length < 10}>
							{Translate(lsInj.transDict.Publish)}
						</IonButton>
					</IonCard>
					<br />
					<br />
					<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.FoodHist)}</IonCardTitle>
					{!loading && (
						<IonSlides pager={true} options={this.slideOpts}>
							{convertObjectToArray(meals).map((meal, index) => {
								return (
									<IonSlide key={index}>
										<IonCard color={createCardColor(meal.mealType)} key={meal.id}>
											<IonCardHeader style={{ color: 'var(--ion-text-color)' }}>
												<IonTitle>{TranslateMealTypeStringUi(meal.mealType)}</IonTitle>
												<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{moment(meal.date).format('Do MMMM, h:mm a')}</IonCardSubtitle>
												<IonCardContent style={{ color: 'var(--ion-text-color)' }}>{meal.mealContent}</IonCardContent>
											</IonCardHeader>
										</IonCard>
									</IonSlide>
								);
							})}
						</IonSlides>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	var sorted = convertObjectToArray(state.foodDiary.FoodDiary).sort((a, b) => Number(b.date) - Number(a.date));

	return {
		user: state.user,
		meals: sorted,
		loading: state.user.isEmpty
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		addFoodEntry: (data: any) => dispatch(SaveFoodEntry(data))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(AddFoodEntry);
