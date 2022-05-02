import React from 'react'
import { withFormik} from "formik";
import * as Yup from "yup";
import { FormPropsItem } from '../../../Models/PropsForForms';
import { iItem } from '../../../Models/AdminModels';
import { InnerFormItem } from './InnerformItem';
import { AddInvItem } from '../../../../../Services/ConectToServerServices';


export const AddItemForm = withFormik<FormPropsItem, iItem>({
    mapPropsToValues: props => ({
        Name: props.initialName || "",
        ItemCost: props.initialItemCost || 0,
        PortionSize:props.initialPortionSize || 0,
        PortionValue: props.initialPortionValue || "",
        PrepMethod: props.initialPrepMethod || []
    }),
    validationSchema: Yup.object().shape({
        Name: Yup.string().required("Name is required").max(16, 'Please input 16 characters or less').min(2, 'Too Short!'),
        ItemCost: Yup.string().required("Item cost is required"),
        PortionSize:Yup.string().required("Portion Size is required"),
        PortionValue: Yup.string().required("Portion Value is required"),
    }),
    handleSubmit({  Name,ItemCost, PortionSize, PortionValue, PrepMethod }: iItem,{ props, setSubmitting, setErrors, resetForm }) {
      console.log( Name,ItemCost, PortionSize, PortionValue,PrepMethod,  "FormValues");
      //console.log(props,"props", setSubmitting,"setSubmitting", setErrors,"setErrors", "OtherInfo");
      // Add send to server request here to check info 
      const obj = {Name,ItemCost, PortionSize, PortionValue, PrepMethod}
      AddInvItem(obj)
      setSubmitting(false)
      resetForm(undefined)
    }
})(InnerFormItem);

class AddItemPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Add</h1>
        <AddItemForm></AddItemForm>
      </div>
    )
  }
}

export default AddItemPage


