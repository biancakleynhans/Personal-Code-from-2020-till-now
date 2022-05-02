import React from 'react'
import { withFormik} from "formik";
import * as Yup from "yup";
import { iWeightEntry, FormPropsWeight } from '../../Models/WeightModels';
import { WeightInnerForm } from './000WeightInnerForm';
import { AddWeight } from '../../../Services/ConectToServerServices';

export const AddWeightForm = withFormik<FormPropsWeight, iWeightEntry>({
    mapPropsToValues: props => ({
      date:         props.date || new Date(),
      weight:       props.weight,
      bodyFat:      props.bodyFat, 
      muscleMass:   props.muscleMass,  
      waterDensity: props.waterDensity, 
      boneDensity:  props.boneDensity, 
      notes:        props.notes|| ""
    }),
    validationSchema: Yup.object().shape({
      date: Yup.date().required("Date is required"), 
      weight:  Yup.number().required("Weight is required"),    
      bodyFat:  Yup.number().required("Body Fat is required"),   
      muscleMass: Yup.number().required("Muscle Mass is required"), 
      waterDensity:Yup.number().required("Water Density is required"),
      boneDensity: Yup.number().required("Bone Density is required"),
      notes: Yup.string().notRequired().max(100, 'Please input 100 characters or less')
    }),
    handleSubmit({date, weight, bodyFat, muscleMass, waterDensity, boneDensity, notes}: iWeightEntry,
      { setSubmitting, resetForm }) {
      //console.log(date, weight, bodyFat, muscleMass, waterDensity, boneDensity, notes,"FormValues");
      
      // Add send to server request here to check info 
      const obj = {
        date: date, 
        weight: weight, 
        bodyFat: bodyFat, 
        muscleMass: muscleMass, 
        waterDensity: waterDensity, 
        boneDensity: boneDensity, 
        notes: notes
      }
      console.log(obj,"obj");
      AddWeight(obj)
      setSubmitting(false)
      resetForm(undefined)
    }
})(WeightInnerForm);


export default class WeightAdd extends React.Component {
  render() {
    return (
      <div>
        <AddWeightForm></AddWeightForm>
      </div>
    )
  }
}
