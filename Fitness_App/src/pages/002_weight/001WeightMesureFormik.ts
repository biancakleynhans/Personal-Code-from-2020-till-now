/** @format */

// eslint-disable-next-line
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { FormPropsWeightMesure, iWeightMesureEntry } from '../../models/WeightModels';
import { WeightMesureInnerForm } from './000WeightMesureInnerForm';
import { Add } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { LablesList } from '../../components/titleLists/Titles';

export const AddWeightMesureForm = withFormik<FormPropsWeightMesure, iWeightMesureEntry>({
	mapPropsToValues: props => ({
		bust: props.bust,
		waist: props.waist,
		hip: props.hip,
		butt: props.butt,
		thigh: props.thigh,
		uperArm: props.uperArm,
		weight: props.weight
	}),
	validationSchema: Yup.object().shape({
		weight: Yup.number().required(LablesList.WeightPages.MesureWeight.errors.c_weight.af),
		bust: Yup.number().required(LablesList.WeightPages.MesureWeight.errors.bust.af),
		waist: Yup.number().required(LablesList.WeightPages.MesureWeight.errors.middle.af),
		hip: Yup.number().required(LablesList.WeightPages.MesureWeight.errors.hips.af),
		butt: Yup.number().required(LablesList.WeightPages.MesureWeight.errors.ass.af),
		thigh: Yup.number().required(LablesList.WeightPages.MesureWeight.errors.thigh.af),
		uperArm: Yup.number().required(LablesList.WeightPages.MesureWeight.errors.arm.af)
	}),
	handleSubmit({ bust, waist, hip, butt, thigh, uperArm, weight }: iWeightMesureEntry) {
		console.log(bust, waist, hip, butt, thigh, uperArm, weight, 'FormValues');

		// Add send to server request here to check info
		var dateNow = new Date().toLocaleString();

		const obj = {
			date: dateNow,
			bust: bust,
			waist: waist,
			hip: hip,
			butt: butt,
			thigh: thigh,
			uperArm: uperArm,
			weight: weight
		};
		console.log(obj, 'obj');
		Add(TypesToServer.WeightMesssure, obj);
	}
})(WeightMesureInnerForm);
