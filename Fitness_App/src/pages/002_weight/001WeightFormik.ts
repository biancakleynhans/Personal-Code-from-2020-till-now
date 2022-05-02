/** @format */

import { withFormik } from 'formik';
import * as Yup from 'yup';
import { WeightInnerForm } from './000WeightInnerForm';
import { FormPropsWeight, iWeightEntry } from '../../models/WeightModels';
import { Add } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { LablesList } from '../../components/titleLists/Titles';

export const AddWeightForm = withFormik<FormPropsWeight, iWeightEntry>({
	mapPropsToValues: props => ({
		weight: props.weight,
		bodyFat: props.bodyFat,
		muscleMass: props.muscleMass,
		waterDensity: props.waterDensity,
		boneDensity: props.boneDensity,
		notes: props.notes || ''
	}),
	validationSchema: Yup.object().shape({
		weight: Yup.number().required(LablesList.WeightPages.BioWeight.errors.c_weight.af),
		bodyFat: Yup.number().required(LablesList.WeightPages.BioWeight.errors.bfat.af),
		muscleMass: Yup.number().required(LablesList.WeightPages.BioWeight.errors.muscle.af),
		waterDensity: Yup.number().required(LablesList.WeightPages.BioWeight.errors.water.af),
		boneDensity: Yup.number().required(LablesList.WeightPages.BioWeight.errors.bone.af),
		notes: Yup.string()
			.notRequired()
			.max(100, LablesList.WeightPages.BioWeight.errors.notes.af)
	}),
	handleSubmit({ weight, bodyFat, muscleMass, waterDensity, boneDensity, notes }: iWeightEntry) {
		console.log(weight, bodyFat, muscleMass, waterDensity, boneDensity, notes, 'FormValues');

		// Add send to server request here to check info
		var dateNow = new Date().toLocaleString();
		const obj = {
			date: dateNow,
			weight: weight,
			bodyFat: bodyFat,
			muscleMass: muscleMass,
			waterDensity: waterDensity,
			boneDensity: boneDensity,
			notes: notes
		};
		console.log(obj, 'obj');
		Add(TypesToServer.WeightBio, obj);
	}
})(WeightInnerForm);
