import React from 'react'
import { withFormik} from "formik";
import * as Yup from "yup";
import {FormPropsCatagory } from './../../../Models/PropsForForms';
import { iCatagory } from '../../../Models/AdminModels';
import { InnerFormCatagory } from './InnerformCatagory';

import {RouteComponentProps} from 'react-router-dom'
import { UpdateCatItem } from '../../../../../Services/ConectToServerServices';



class EditCatagoryPage extends React.Component<IProps, IStates> {

  constructor(props:any)
  {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      name: this.props.match.params.name,
      prods: JSON.parse(this.props.match.params.prods)
    }
    console.log(this.state.id, "what do i get")
  }


  EditCatagoryForm = withFormik<FormPropsCatagory, iCatagory>({
    mapPropsToValues: props => ({
      _id: this.props.match.params.id,
      Name: this.props.match.params.name,
      Products: JSON.parse(this.props.match.params.prods)
  }),
  validationSchema: Yup.object().shape({
      Name: Yup.string().required("Name is required").max(16, 'Please input 16 characters or less').min(2, 'Too Short!'),
      Products: Yup.string().required("Content is required"),
  }),
  handleSubmit({ _id, Name,Products}: iCatagory,{ props, setSubmitting, setErrors, resetForm }) {
    console.log( _id, Name, Products , "FormValues");
    //console.log(props,"props", setSubmitting,"setSubmitting", setErrors,"setErrors", "OtherInfo");
    // Add send to server request here to check info 
    const obj = {_id, Name,Products}
    UpdateCatItem(_id, obj)
    setSubmitting(false)
    resetForm()
    window.location.replace("/viewCatagory")
    }
  })(InnerFormCatagory)
  
  render() {
    return (
      <div>
        <h1>Update</h1>
        <this.EditCatagoryForm></this.EditCatagoryForm>
      </div>
    )
  }
}

export default EditCatagoryPage


interface IProps extends RouteComponentProps<{id:string,name:string, prods:string}>{}
interface IStates{id:string,name:string, prods: any}