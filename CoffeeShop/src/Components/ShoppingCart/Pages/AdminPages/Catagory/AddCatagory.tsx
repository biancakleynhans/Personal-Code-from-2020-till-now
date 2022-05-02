import React from 'react'
import { withFormik} from "formik";
import * as Yup from "yup";
import { FormPropsCatagory } from '../../../Models/PropsForForms';
import { iCatagory} from '../../../Models/AdminModels';
import { InnerFormCatagory } from './InnerformCatagory';
import {AddCatagoryItem} from '../../../../../Services/ConectToServerServices'

export const AddCatagoryForm = withFormik<FormPropsCatagory, iCatagory>({
    mapPropsToValues: props => ({
        Name: props.initialName || "",
        Products: props.initialProducts || [],
       
    }),
    validationSchema: Yup.object().shape({
        Name: Yup.string().required("Name is required").max(16, 'Please input 16 characters or less').min(2, 'Too Short!'),
        Products: Yup.string().required("Content is required"),
    }),
    handleSubmit({ Name,Products }: iCatagory,{ setSubmitting, resetForm }) {
      console.log( Name,Products , "FormValues");
    
      // Add send to server request here to check info 
      const obj = {Name,Products }
      AddCatagoryItem(obj)
      setSubmitting(false)
      resetForm(undefined)
    }
})(InnerFormCatagory);

class AddCatagoryPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Add</h1>
        <AddCatagoryForm></AddCatagoryForm>
      </div>
    )
  }
}

export default AddCatagoryPage


