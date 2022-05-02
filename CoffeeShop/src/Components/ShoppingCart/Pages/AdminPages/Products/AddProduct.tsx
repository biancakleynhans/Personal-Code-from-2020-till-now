import React from 'react'
import { withFormik} from "formik";
import * as Yup from "yup";
import { FormPropsProduct } from '../../../Models/PropsForForms';
import { iProduct } from '../../../Models/AdminModels';
import { InnerFormProduct } from './InnerformProduct';
import {AddProdItem}from '../../../../../Services/ConectToServerServices'



export const AddProductForm = withFormik<FormPropsProduct, iProduct>({
    mapPropsToValues: props => ({
        Name: props.initialName || "",
        Price: props.initialPrice || 0,
        Description:props.initialDescription || "",
        Content: props.initialContent || [],
    }),
    validationSchema: Yup.object().shape({
        Name: Yup.string().required("Name is required").max(60, 'Please input 60 characters or less').min(5, 'Too Short!'),
        Price: Yup.string().required("Price is required"),
        Description:Yup.string().required("Description is required"),
        Content: Yup.string().required("Content is required"),
    }),
    handleSubmit({ Name,Price, Description, Content }: iProduct,{ setSubmitting, resetForm }) {
      console.log( Name,Price, Description, Content , "FormValues");
      
      
      // Add send to server request here to check info 
      const obj = {Name,Price, Description, Content }
      AddProdItem(obj)
      setSubmitting(false)
      resetForm(undefined)
    }
})(InnerFormProduct);

class AddProductPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Add</h1>
        <AddProductForm></AddProductForm>
      </div>
    )
  }
}

export default AddProductPage


