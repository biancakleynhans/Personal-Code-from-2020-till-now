/** @format */

import React from 'react';
import { FormikProps } from 'formik';
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { iWeightEntry } from '../../models/WeightModels';
import { LablesList } from '../../components/titleLists/Titles';

export const WeightInnerForm = (props: FormikProps<iWeightEntry>) => {
	const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = props;

	return (
		<form noValidate onSubmit={handleSubmit}>
			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.BioWeight.Labels.c_weight.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='weight' type='number' value={values.weight} onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.weight && <div>{errors.weight}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.BioWeight.Labels.bfat.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='bodyFat' type='number' value={values.bodyFat} onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.bodyFat && <div>{errors.bodyFat}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.BioWeight.Labels.muscle.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='muscleMass' type='number' value={values.muscleMass} onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.muscleMass && <div>{errors.muscleMass}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.BioWeight.Labels.water.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='waterDensity' type='number' value={values.waterDensity} onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.waterDensity && <div>{errors.waterDensity}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.BioWeight.Labels.bone.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='boneDensity' type='number' value={values.boneDensity} onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.boneDensity && <div>{errors.boneDensity}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.BioWeight.Labels.notes.af}</IonLabel>
				<IonInput autofocus={true} inputmode='text' name='notes' type='text' value={values.notes} onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.notes && <div>{errors.notes}</div>}

			<IonButton
				color='primary'
				type='submit'
				disabled={
					isSubmitting ||
					!!(errors.weight && touched.weight) ||
					!!(errors.muscleMass && touched.muscleMass) ||
					!!(errors.bodyFat && touched.bodyFat) ||
					!!(errors.waterDensity && touched.waterDensity) ||
					!!(errors.boneDensity && touched.boneDensity) ||
					!!(errors.notes && touched.notes)
				}>
				{LablesList.OptionsBtn.submitBtn.af}
			</IonButton>
		</form>
	);
};
