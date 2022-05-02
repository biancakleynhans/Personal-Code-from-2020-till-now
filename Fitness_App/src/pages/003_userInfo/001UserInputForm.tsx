/** @format */

import { FormPropsUserInfo, iUserInfo, UserInfoInnerForm, BMI, BMR, CALORIES_REQUIRED, MacroMaker } from './000UserInputInnerForm';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Add } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { LablesList } from '../../components/titleLists/Titles';

export const UserInputForm = withFormik<FormPropsUserInfo, iUserInfo>({
	mapPropsToValues: props => ({
		date: new Date(),
		weight: props.weight || '',
		height: props.height || '',
		age: props.age || '',
		sex: props.sex || '',
		bmi: props.bmi || '',
		bmr: props.bmr || '',
		calReq: props.calReq || '',
		activeLevel: props.activeLevel || '',
		goalWeight: props.goalWeight || '',
		dietType: props.dietType || '',
		goalToAchieve: props.goalToAchieve || '',
		macros: props.macros || { carb: '', fat: '', protein: '' }
	}),
	validationSchema: Yup.object().shape({
		weight: Yup.number().required(LablesList.UserInputPages.errors.c_weight.af),
		goalWeight: Yup.number().required(LablesList.UserInputPages.errors.g_weight.af),
		height: Yup.number().required(LablesList.UserInputPages.errors.height.af),
		age: Yup.number().required(LablesList.UserInputPages.errors.age.af),
		sex: Yup.string().required(LablesList.UserInputPages.errors.sex.af),
		activeLevel: Yup.string().required(LablesList.UserInputPages.errors.active.af),
		dietType: Yup.string().required(LablesList.UserInputPages.errors.diet.af),
		goalToAchieve: Yup.string().required(LablesList.UserInputPages.errors.goal.af)
	}),
	handleSubmit({ goalWeight, weight, height, age, sex, activeLevel, goalToAchieve, dietType }: iUserInfo) {
		var bmi = BMI(+weight, +height);
		var bmr = BMR(+age, +weight, +height, sex);
		var calReq = CALORIES_REQUIRED(activeLevel, bmr);
		var macros = MacroMaker(dietType);

		console.log(weight, height, age, sex, activeLevel, goalToAchieve, dietType, 'FormValues');
		console.log(bmi, bmr, calReq, 'FormValues 2');

		const obj = {
			date: new Date(),
			goalWeight: goalWeight,
			weight: weight,
			height: height,
			activeLevel: activeLevel,
			age: age,
			sex: sex,
			bmi: bmi,
			bmr: bmr,
			calReq: calReq,
			macros: macros,
			dietType: dietType,
			goalToAchieve: goalToAchieve
		};

		Add(TypesToServer.UserInfo, obj);
	}
})(UserInfoInnerForm);
