/** @format */

import React from 'react';
import { FormikProps } from 'formik';
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { iWeightMesureEntry } from '../../models/WeightModels';
import { LablesList } from '../../components/titleLists/Titles';

export const WeightMesureInnerForm = (props: FormikProps<iWeightMesureEntry>) => {
	const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = props;

	return (
		<form noValidate onSubmit={handleSubmit}>
			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.MesureWeight.Labels.c_weight.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='weight' type='number' value={values.weight} placeholder='kg' onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.weight && <div>{errors.weight}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.MesureWeight.Labels.bust.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='bust' type='number' value={values.bust} placeholder='cm' onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.bust && <div>{errors.bust}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.MesureWeight.Labels.middle.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='waist' type='number' value={values.waist} placeholder='cm' onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.waist && <div>{errors.waist}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.MesureWeight.Labels.hips.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='hip' type='number' value={values.hip} placeholder='cm' onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.hip && <div>{errors.hip}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.MesureWeight.Labels.ass.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='butt' type='number' value={values.butt} placeholder='cm' onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.butt && <div>{errors.butt}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.MesureWeight.Labels.thigh.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='thigh' type='number' value={values.thigh} placeholder='cm' onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.thigh && <div>{errors.thigh}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.WeightPages.MesureWeight.Labels.arm.af}</IonLabel>
				<IonInput autofocus={true} inputmode='numeric' name='uperArm' type='number' value={values.uperArm} placeholder='cm' onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.uperArm && <div>{errors.uperArm}</div>}

			<IonButton
				color='primary'
				type='submit'
				disabled={
					isSubmitting ||
					!!(errors.bust && touched.bust) ||
					!!(errors.waist && touched.waist) ||
					!!(errors.hip && touched.hip) ||
					!!(errors.butt && touched.butt) ||
					!!(errors.uperArm && touched.uperArm) ||
					!!(errors.thigh && touched.thigh)
				}>
				{LablesList.OptionsBtn.submitBtn.af}
			</IonButton>
		</form>
	);
};
