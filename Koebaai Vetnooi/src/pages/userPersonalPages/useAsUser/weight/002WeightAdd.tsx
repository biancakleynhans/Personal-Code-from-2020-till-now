import React, { Dispatch } from 'react';
import { IonContent, IonPage, IonCard, IonHeader, IonItem, IonLabel, IonInput, IonButton, IonSelectOption, IonSelect, IonCardTitle } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { connect } from 'react-redux';
import { SaveWeight } from '../../../../services/redux/actions/003WeightActions';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';
import { BMI, BMR, CALORIES_REQUIRED, MacroMaker } from '../../../../services/helpers/Tools';

function genderOpts() {
	return (
		<>
			<IonSelectOption value='female'>{Translate(lsInj.transDict.female)}</IonSelectOption>
			<IonSelectOption value='male'>{Translate(lsInj.transDict.male)}</IonSelectOption>
		</>
	);
}
function activeOpts() {
	return (
		<>
			<IonSelectOption value='None'>{Translate(lsInj.transDict.none)}</IonSelectOption>
			<IonSelectOption value='Light'>{Translate(lsInj.transDict.light)}</IonSelectOption>
			<IonSelectOption value='Moderate'>{Translate(lsInj.transDict.mod)}</IonSelectOption>
			<IonSelectOption value='Very'>{Translate(lsInj.transDict.heavy)}</IonSelectOption>
			<IonSelectOption value='Extra'>{Translate(lsInj.transDict.extreme)}</IonSelectOption>
		</>
	);
}
function listOpts() {
	return (
		<>
			<IonSelectOption value='looseWeight'>{Translate(lsInj.transDict.lose)}</IonSelectOption>
			<IonSelectOption value='gainWeight'>{Translate(lsInj.transDict.gain)}</IonSelectOption>
			<IonSelectOption value='gainMuscle'>{Translate(lsInj.transDict.muscle)}</IonSelectOption>
		</>
	);
}

interface iState {
	bust: number;
	waist: number;
	hip: number;
	butt: number;
	thigh: number;
	uperArm: number;
	weight: number;
	//from other one combined here
	height: number;
	gender: 'male' | 'female';
	age: number;
	fitness: string;
	goalWeight: number;
	diet: 'koebaaiVetnoi' | 'other';
	goal: string;
}

class WeightPage extends React.Component<any, iState> {
	constructor(props: any) {
		super(props);
		const { oldData } = this.props;
		this.state = {
			bust: oldData ? oldData.bust : 0,
			waist: oldData ? oldData.waist : 0,
			hip: oldData ? oldData.hip : 0,
			butt: oldData ? oldData.butt : 0,
			thigh: oldData ? oldData.thigh : 0,
			uperArm: oldData ? oldData.uperArm : 0,
			weight: oldData ? oldData.weight : 0,
			//from other one combined here
			height: oldData ? oldData.height : 0,
			gender: 'female',
			age: oldData ? oldData.age : 0,
			fitness: oldData ? oldData.activeLevel : '',
			goalWeight: oldData ? oldData.goalWeight : 0,
			diet: 'koebaaiVetnoi',
			goal: oldData ? oldData.goalToAchieve : ''
		};
	}

	componentDidUpdate(prevProps: any) {
		// console.log('prevProps', prevProps);
		// console.log('props', this.props);
		if (prevProps.oldData !== this.props.oldData) {
			console.log('not matched ');
			this.setState({
				bust: this.props.oldData.bust,
				waist: this.props.oldData.waist,
				hip: this.props.oldData.hip,
				butt: this.props.oldData.butt,
				thigh: this.props.oldData.thigh,
				uperArm: this.props.oldData.uperArm,
				weight: this.props.oldData.weight,
				//from other one combined here
				height: this.props.oldData.height,
				gender: this.props.oldData.sex,
				age: this.props.oldData.age,
				fitness: this.props.oldData.activeLevel,
				goalWeight: this.props.oldData.goalWeight,
				diet: 'koebaaiVetnoi',
				goal: this.props.oldData.goalToAchieve
			});
		}
	}

	handleChangeHeight(e: any) {
		// console.log('e => height', e);
		this.setState({ height: e.detail.value });
	}
	GenderChange(e: any) {
		// console.log('e => gender', e);
		this.setState({ gender: e.detail.value });
	}
	handleChangeAge(e: any) {
		// console.log('e => age', e);
		this.setState({ age: e.detail.value });
	}
	handleChangeFitness(e: any) {
		// console.log('e => fitness', e);
		this.setState({ fitness: e.detail.value });
	}
	handleChangeGoalWeight(e: any) {
		// console.log('e => goal weight', e);
		this.setState({ goalWeight: e.detail.value });
	}
	GoalChange(e: any) {
		// console.log('e => goal', e);
		this.setState({ goal: e.detail.value });
	}

	setBust(e: any) {
		// console.log('set Bust', e, e.detail.value);
		this.setState({ bust: e.detail.value });
	}
	setWaist(e: any) {
		// console.log('set Waist', e, e.detail.value);
		this.setState({ waist: e.detail.value });
	}
	setHip(e: any) {
		// console.log('set Hip', e, e.detail.value);
		this.setState({ hip: e.detail.value });
	}
	setButt(e: any) {
		// console.log('set Butt', e, e.detail.value);
		this.setState({ butt: e.detail.value });
	}
	setThigh(e: any) {
		// console.log('set Thigh', e, e.detail.value);
		this.setState({ thigh: e.detail.value });
	}
	setArm(e: any) {
		// console.log('set Arm', e, e.detail.value);
		this.setState({ uperArm: e.detail.value });
	}
	setWeight(e: any) {
		// console.log('set Weight', e, e.target.value);
		this.setState({ weight: e.detail.value });
	}

	submitForm() {
		const { user, oldData } = this.props;
		console.log('state', this.state, user.id);

		var bmi = BMI(+this.state.weight, +this.state.height);
		var bmr = BMR(+this.state.age, +this.state.weight, +this.state.height, this.state.gender);
		var calReq = CALORIES_REQUIRED(this.state.fitness, +bmr);
		var macros = MacroMaker(this.state.diet);

		console.log('???', bmi, bmr, calReq, macros);

		const sending = {
			userId: user.id,
			weight: {
				id: new Date().getTime(),
				date: new Date().getTime(),
				bust: +this.state.bust,
				waist: +this.state.waist,
				hip: +this.state.hip,
				butt: +this.state.butt,
				thigh: +this.state.thigh,
				uperArm: +this.state.uperArm,
				weight: +this.state.weight,
				//from other one combined here
				goalWeight: +this.state.goalWeight,
				height: +this.state.height,
				activeLevel: this.state.fitness.length > 0 ? this.state.fitness : oldData.activeLevel,
				age: +this.state.age,
				sex: this.state.gender.length > 0 ? this.state.gender : oldData.sex,
				bmi: +bmi,
				bmr: +bmr,
				calReq: +calReq,
				macros: macros,
				dietType: 'koebaaiVetnoi',
				goalToAchieve: this.state.goal.length > 0 ? this.state.goal : oldData.goalToAchieve
			}
		};
		console.log('sending', sending);

		this.props.saveWeight(sending);
		window.alert(Translate(lsInj.transDict.updatedUserUserdata));
	}

	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.WeightAdd)} />
					</IonHeader>
					<br /> <br /> <br />
					<IonCard style={{ color: 'var(--ion-text-color)' }}>
						<IonItem>
							<IonLabel position='floating'>{Translate(lsInj.transDict.c_weight)}</IonLabel>
							<IonInput inputmode='numeric' name='weight' type='number' value={this.state.weight} placeholder='kg' onIonChange={(e) => this.setWeight(e)} />
						</IonItem>

						<IonItem>
							<IonLabel position='floating'>{Translate(lsInj.transDict.bust)}</IonLabel>
							<IonInput inputmode='numeric' name='bust' type='number' value={this.state.bust} placeholder='cm' onIonChange={(e) => this.setBust(e)} />
						</IonItem>

						<IonItem>
							<IonLabel position='floating'>{Translate(lsInj.transDict.middle)}</IonLabel>
							<IonInput inputmode='numeric' name='waist' type='number' value={this.state.waist} placeholder='cm' onIonChange={(e) => this.setWaist(e)} />
						</IonItem>

						<IonItem>
							<IonLabel position='floating'>{Translate(lsInj.transDict.hips)}</IonLabel>
							<IonInput inputmode='numeric' name='hip' type='number' value={this.state.hip} placeholder='cm' onIonChange={(e) => this.setHip(e)} />
						</IonItem>

						<IonItem>
							<IonLabel position='floating'>{Translate(lsInj.transDict.ass)}</IonLabel>
							<IonInput inputmode='numeric' name='butt' type='number' value={this.state.butt} placeholder='cm' onIonChange={(e) => this.setButt(e)} />
						</IonItem>

						<IonItem>
							<IonLabel position='floating'>{Translate(lsInj.transDict.thigh)}</IonLabel>
							<IonInput inputmode='numeric' name='thigh' type='number' value={this.state.thigh} placeholder='cm' onIonChange={(e) => this.setThigh(e)} />
						</IonItem>

						<IonItem>
							<IonLabel position='floating'>{Translate(lsInj.transDict.arm)}</IonLabel>
							<IonInput inputmode='numeric' name='uperArm' type='number' value={this.state.uperArm} placeholder='cm' onIonChange={(e) => this.setArm(e)} />
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap' position='floating'>
								{Translate(lsInj.transDict.Length)}
							</IonLabel>
							<IonInput placeholder='165 cm' inputmode='numeric' name='height' type='number' value={this.state.height} onIonChange={(e: any) => this.handleChangeHeight(e)} />
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.sex)}</IonLabel>
							<IonSelect
								value={this.state.gender}
								cancelText={Translate(lsInj.transDict.Cancel)}
								okText={Translate(lsInj.transDict.Done)}
								onIonChange={(e) => {
									this.GenderChange(e);
								}}>
								{genderOpts()}
							</IonSelect>
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap' position='floating'>
								{Translate(lsInj.transDict.age)}
							</IonLabel>
							<IonInput placeholder='40' inputmode='numeric' name='age' type='number' value={this.state.age} onIonChange={(e: any) => this.handleChangeAge(e)} />
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.fitness)}</IonLabel>
							<IonSelect
								value={this.state.fitness}
								cancelText={Translate(lsInj.transDict.Cancel)}
								okText={Translate(lsInj.transDict.Done)}
								onIonChange={(e) => this.handleChangeFitness(e)}>
								{activeOpts()}
							</IonSelect>
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap' position='floating'>
								{Translate(lsInj.transDict.weight)}
							</IonLabel>
							<IonInput
								placeholder='80'
								inputmode='numeric'
								name='goalWeight'
								type='number'
								value={this.state.goalWeight}
								onIonChange={(e: any) => this.handleChangeGoalWeight(e)}
							/>
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.goals)}</IonLabel>
							<IonSelect
								value={this.state.goal}
								cancelText={Translate(lsInj.transDict.Cancel)}
								okText={Translate(lsInj.transDict.Done)}
								onIonChange={(e) => {
									this.GoalChange(e);
								}}>
								{listOpts()}
							</IonSelect>
						</IonItem>

						<IonButton
							color='primary'
							onClick={() => this.submitForm()}
							disabled={
								this.state.age === 0 ||
								this.state.goalWeight === 0 ||
								this.state.height === 0 ||
								this.state.weight === 0 ||
								this.state.fitness === '' ||
								this.state.goal === '' ||
								this.state.bust === 0 ||
								this.state.waist === 0 ||
								this.state.hip === 0 ||
								this.state.butt === 0 ||
								this.state.thigh === 0 ||
								this.state.uperArm === 0 ||
								this.state.weight === 0
							}>
							{Translate(lsInj.transDict.Publish)}
						</IonButton>
					</IonCard>
					<IonButton class='ion-text-wrap' routerLink={AllRoutesListed.weightRoutes.weightHist}>
						{Translate(lsInj.transDict.WeightHistory)}
					</IonButton>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('?? ', state.weight.Weights);

	var sorted = convertObjectToArray(state.weight.Weights !== undefined ? state.weight.Weights : {}).sort((a, b) => Number(b.date) - Number(a.date));
	var smallest = sorted[0];
	console.log('???', smallest);

	return {
		user: state.user,
		oldData: smallest
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		saveWeight: (weight: any) => dispatch(SaveWeight(weight))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(WeightPage);
