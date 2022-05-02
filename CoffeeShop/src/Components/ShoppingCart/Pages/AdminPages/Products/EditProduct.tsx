import React from 'react'
import { withFormik} from "formik";
import * as Yup from "yup";
import {FormPropsProduct } from './../../../Models/PropsForForms';
import { iProduct } from '../../../Models/AdminModels';
import { InnerFormProduct } from './InnerformProduct';
import { UpdateProdItem } from '../../../../../Services/ConectToServerServices';
import {RouteComponentProps} from 'react-router-dom'



class EditProductPage extends React.Component<IProps, IStates> {

  constructor(props:any)
  {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      name: this.props.match.params.name,
      price: parseInt(this.props.match.params.price),
      des:this.props.match.params.des,
      content: JSON.parse(this.props.match.params.content)
    }
    console.log(this.state, "what do i get")
  }


  EditProductForm = withFormik<FormPropsProduct, iProduct>({
    mapPropsToValues: props => ({
      _id: this.props.match.params.id,
      Name: this.props.match.params.name || "",
      Price: parseInt(this.props.match.params.price) || 0,
      Description:this.props.match.params.des || "",
      Content: JSON.parse(this.props.match.params.content),
     
  }),
  validationSchema: Yup.object().shape({
      Name: Yup.string().required("Name is required").max(60, 'Please input 60 characters or less').min(5, 'Too Short!'),
      Price: Yup.string().required("Price is required"),
      Description:Yup.string().required("Description is required"),
      Content: Yup.string().required("Content is required"),
  }),
  handleSubmit({ _id, Name,Price, Description, Content}: iProduct,{ props, setSubmitting, setErrors, resetForm }) {
    console.log( _id, Name,Price, Description, Content , "FormValues");
    //console.log(props,"props", setSubmitting,"setSubmitting", setErrors,"setErrors", "OtherInfo");
    // Add send to server request here to check info 
    const obj = {_id, Name,Price, Description, Content}
    UpdateProdItem(_id, obj)
    setSubmitting(false)
    resetForm()
    window.location.replace("/viewProducts")
    }
  })(InnerFormProduct)
  
  render() {
    return (
      <div>
        <h1>Update</h1>
        <this.EditProductForm></this.EditProductForm>
      </div>
    )
  }
}

export default EditProductPage


interface IProps extends RouteComponentProps<{id:string,name:string, price: string, des:string, content:string}>{}
interface IStates{id:string,name:string, price: number, des:string, content:any}