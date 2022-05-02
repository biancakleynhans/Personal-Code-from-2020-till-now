/** @format */

import React from 'react';
import { FormikProps } from 'formik';
import { IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonListHeader, IonCard, IonTitle } from '@ionic/react';
import { LablesList } from '../../components/titleLists/Titles';

export const ActiveLevelsOptions = ['None', 'Little', 'Light', 'Moderate', 'Very', 'Extra'];

export interface iUserInfo {
	date: Date;
	height: string;
	age: string;
	weight: string;
	sex: string;
	bmi: string;
	bmr: string;
	calReq: string;
	activeLevel: string;

	goalWeight: string;
	macros: {
		carb: string;
		fat: string;
		protein: string;
	};
	dietType: string;
	goalToAchieve: string;
}

export interface FormPropsUserInfo {
	date?: Date;
	height?: string;
	age?: string;
	weight?: string;
	sex?: string;
	bmi?: string;
	bmr?: string;
	calReq?: string;
	activeLevel?: string;
	goalWeight?: string;
	macros?: {
		carb: string;
		fat: string;
		protein: string;
	};
	dietType?: string;
	goalToAchieve?: string;
}

export function BMI(weight: number, height: number) {
	//  weight/(height/100*height/100)
	console.log(weight, height, 'got this info for bmi');
	if (weight !== undefined && height !== undefined) {
		var bmi = weight / (((height / 100) * height) / 100);
		console.log(bmi, 'BMI');
		return +bmi.toFixed(2);
	} else {
		return 0;
	}
}

export function BMR(age: number, weight: number, height: number, gender: string) {
	// BMR for Men = 66.47 + (13.7 * weight [kg]) + (5 * height [cm]) − (6.8 * age [years])
	// BMR for Women = 655.1 + (9.6 * weight [kg]) + (1.8 * height [cm]) − (4.7 * age [years])
	//console.log(age, weight, height, gender, "got this info for bmr")

	if (weight !== undefined && height !== undefined && age !== undefined && gender !== undefined) {
		if (gender === 'female') {
			var bmi = 655.1 + 9.6 * weight + 1.8 * height - 4.7 * age;
			//console.log("female", bmi)
			return +bmi.toFixed(2);
		}
		if (gender === 'male') {
			var bmiM = 66.47 + 13.7 * weight + 5 * height - 6.8 * age;
			//console.log("male", bmiM)
			return +bmiM.toFixed(2);
		} else {
			return 0;
		}
	} else {
		return 0;
	}
}

export function CALORIES_REQUIRED(activeLevel: string, bmr: number) {
	var calReq = 0;
	if (activeLevel === 'None') {
		var cal = +bmr * 1.2;
		console.log(cal, 'cal');
		return (calReq = +cal.toFixed(2));
	}
	if (activeLevel === 'Light') {
		var cal1 = +bmr * 1.375;
		console.log(cal1, 'cal');
		return (calReq = +cal1.toFixed(2));
	}
	if (activeLevel === 'Moderate') {
		var cal2 = +bmr * 1.55;
		console.log(cal2, 'cal');
		return (calReq = +cal2.toFixed(2));
	}
	if (activeLevel === 'Very') {
		var cal3 = +bmr * 1.725;
		console.log(cal3, 'cal');
		return (calReq = +cal3.toFixed(2));
	}
	if (activeLevel === 'Extra') {
		var cal4 = +bmr * 1.9;
		console.log(cal4, 'cal');
		return (calReq = +cal4.toFixed(2));
	}

	console.log('calReq', calReq);
	return calReq;
}

export function MacroMaker(diettype: string) {
	console.log('diettype', diettype);
	//"keto" "banting""highCarb""vegan""vegetarian""highProtein"
	var macros = { carb: 0, fat: 0, protein: 0 };

	if (diettype === 'keto') {
		return (macros = { carb: 5, fat: 70, protein: 25 });
	}
	if (diettype === 'banting') {
		return (macros = { carb: 10, fat: 60, protein: 30 });
	}
	if (diettype === 'highCarb') {
		return (macros = { carb: 55, fat: 15, protein: 30 });
	}
	if (diettype === 'vegan') {
		return (macros = { carb: 50, fat: 30, protein: 20 });
	}
	if (diettype === 'vegetarian') {
		return (macros = { carb: 50, fat: 30, protein: 20 });
	}
	if (diettype === 'highProtein') {
		return (macros = { carb: 10, fat: 40, protein: 50 });
	}
	if (diettype === 'koebaaiVetnoi') {
		return (macros = { carb: 15, fat: 35, protein: 50 });
	}

	return macros;
}

export const UserInfoInnerForm = (props: FormikProps<iUserInfo>) => {
	const { values, errors, handleChange, handleBlur, handleSubmit } = props;

	function CustomhandleChange(e: any) {
		console.log('Select onChange', e.detail.value, values.bmr);
		values.activeLevel = e.detail.value;
		handleChange(e.detail.value);
		handleBlur(e.detail.value);
	}

	function GenderChange(e: any) {
		console.log('Select onChange', e.detail.value, values.sex);
		values.sex = e.detail.value;
		handleChange(e.detail.value);
		handleBlur(e.detail.value);
	}

	function DietChange(e: any) {
		console.log('Select onChange', e.detail.value, values.dietType);
		values.dietType = e.detail.value;
		handleChange(e.detail.value);
		handleBlur(e.detail.value);
	}

	function GoalChange(e: any) {
		console.log('Select onChange', e.detail.value, values.goalToAchieve);
		values.goalToAchieve = e.detail.value;
		handleChange(e.detail.value);
		handleBlur(e.detail.value);
	}

	return (
		<IonCard color='secondary'>
			<IonTitle>{LablesList.UserInputPages.cardTitle.af}</IonTitle>
			<form noValidate onSubmit={handleSubmit}>
				<IonItem>
					<IonLabel position='floating'>{LablesList.UserInputPages.Labels.c_weight.af}</IonLabel>
					<IonInput autofocus={true} inputmode='numeric' name='weight' type='number' value={values.weight} onIonChange={handleChange} onIonBlur={handleBlur} />
				</IonItem>
				{errors.weight && <div>{errors.weight}</div>}

				<IonItem>
					<IonLabel position='floating'>{LablesList.UserInputPages.Labels.length.af}</IonLabel>
					<IonInput autofocus={true} inputmode='numeric' name='height' type='number' value={values.height} onIonChange={handleChange} onIonBlur={handleBlur} />
				</IonItem>
				{errors.height && <div>{errors.height}</div>}

				<IonItem>
					<IonLabel>{LablesList.UserInputPages.Labels.sex.af}</IonLabel>
					<IonSelect
						placeholder={LablesList.OptionsBtn.placeHolder.af}
						onIonChange={e => {
							GenderChange(e);
						}}
						onIonBlur={handleBlur}
						cancelText={LablesList.OptionsBtn.cancel.af}
						okText={LablesList.OptionsBtn.ok.af}>
						<IonSelectOption value='female'>{LablesList.UserInputPages.Labels.sex.female.af}</IonSelectOption>
						<IonSelectOption value='male'>{LablesList.UserInputPages.Labels.sex.male.af}</IonSelectOption>
					</IonSelect>
				</IonItem>
				{errors.sex && <div>{errors.sex}</div>}

				<IonItem>
					<IonLabel position='floating'>{LablesList.UserInputPages.Labels.age.af}</IonLabel>
					<IonInput autofocus={true} inputmode='numeric' name='age' type='number' value={values.age} onIonChange={handleChange} onIonBlur={handleBlur} />
				</IonItem>
				{errors.age && <div>{errors.age}</div>}

				<IonItem>
					<IonLabel>{LablesList.UserInputPages.Labels.fitness.af}</IonLabel>
					<IonSelect
						placeholder={LablesList.OptionsBtn.placeHolder.af}
						onIonChange={e => CustomhandleChange(e)}
						onIonBlur={handleBlur}
						cancelText={LablesList.OptionsBtn.cancel.af}
						okText={LablesList.OptionsBtn.ok.af}>
						{/* "None","Little", "Light", "Moderate", "Very", "Extra" */}
						<IonSelectOption value='None'> {LablesList.UserInputPages.Labels.fitness.none.af}</IonSelectOption>
						<IonSelectOption value='Light'>{LablesList.UserInputPages.Labels.fitness.light.af} </IonSelectOption>
						<IonSelectOption value='Moderate'>{LablesList.UserInputPages.Labels.fitness.mod.af}</IonSelectOption>
						<IonSelectOption value='Very'> {LablesList.UserInputPages.Labels.fitness.heavy.af}</IonSelectOption>
						<IonSelectOption value='Extra'>{LablesList.UserInputPages.Labels.fitness.extreme.af}</IonSelectOption>
					</IonSelect>
				</IonItem>

				<IonListHeader>{LablesList.UserInputPages.Labels.goals.af}</IonListHeader>

				<IonItem>
					<IonLabel position='floating'>{LablesList.UserInputPages.Labels.goals.weight.af}</IonLabel>
					<IonInput autofocus={true} inputmode='numeric' name='goalWeight' type='number' value={values.goalWeight} onIonChange={handleChange} onIonBlur={handleBlur} />
				</IonItem>
				{errors.goalWeight && <div>{errors.goalWeight}</div>}

				<IonItem>
					<IonLabel>{LablesList.UserInputPages.Labels.goals.dietType.af}</IonLabel>
					<IonSelect
						placeholder={LablesList.OptionsBtn.placeHolder.af}
						onIonChange={e => {
							DietChange(e);
						}}
						onIonBlur={handleBlur}
						cancelText={LablesList.OptionsBtn.cancel.af}
						okText={LablesList.OptionsBtn.ok.af}>
						<IonSelectOption value='koebaaiVetnoi'>{LablesList.UserInputPages.Labels.goals.dietType.Koebaai.af} </IonSelectOption>
						<IonSelectOption value='keto'> {LablesList.UserInputPages.Labels.goals.dietType.keto.af} </IonSelectOption>
						<IonSelectOption value='banting'> {LablesList.UserInputPages.Labels.goals.dietType.banting.af} </IonSelectOption>
						<IonSelectOption value='highCarb'> {LablesList.UserInputPages.Labels.goals.dietType.highCarb.af}</IonSelectOption>
						<IonSelectOption value='vegan'> {LablesList.UserInputPages.Labels.goals.dietType.Vegan.af} </IonSelectOption>
						<IonSelectOption value='vegetarian'> {LablesList.UserInputPages.Labels.goals.dietType.vegitarian.af} </IonSelectOption>
						<IonSelectOption value='highProtein'> {LablesList.UserInputPages.Labels.goals.dietType.highProtein.af} </IonSelectOption>
					</IonSelect>
				</IonItem>
				{errors.dietType && <div>{errors.dietType}</div>}

				<IonItem>
					<IonLabel>{LablesList.UserInputPages.Labels.goals.list.af}</IonLabel>
					<IonSelect
						placeholder={LablesList.OptionsBtn.placeHolder.af}
						onIonChange={e => {
							GoalChange(e);
						}}
						onIonBlur={handleBlur}
						cancelText={LablesList.OptionsBtn.cancel.af}
						okText={LablesList.OptionsBtn.ok.af}>
						<IonSelectOption value='looseWeight'>{LablesList.UserInputPages.Labels.goals.list.lose.af} </IonSelectOption>
						<IonSelectOption value='gainWeight'> {LablesList.UserInputPages.Labels.goals.list.gain.af}</IonSelectOption>
						<IonSelectOption value='gainMuscle'> {LablesList.UserInputPages.Labels.goals.list.muscle.af}</IonSelectOption>
					</IonSelect>
				</IonItem>
				{errors.goalToAchieve && <div>{errors.goalToAchieve}</div>}

				<IonButton color='primary' type='submit'>
					{LablesList.OptionsBtn.submitBtn.af}
				</IonButton>
			</form>
		</IonCard>
	);
};
