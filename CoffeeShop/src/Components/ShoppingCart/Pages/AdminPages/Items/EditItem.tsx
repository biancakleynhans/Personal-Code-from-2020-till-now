import React from 'react'
import { withFormik} from "formik";
import * as Yup from "yup";
import {FormPropsItem } from './../../../Models/PropsForForms';
import { iItem } from '../../../Models/AdminModels';
import { appInj } from '../../../../../Services/tools';
import { InnerFormItem } from './InnerformItem';
import { UpdateInvItem } from '../../../../../Services/ConectToServerServices';
import {RouteComponentProps} from 'react-router-dom'


class EditItemPage extends React.Component<IProps, IStates>  {
  constructor(props:any)
  {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      name: this.props.match.params.name,
      cost: parseInt(this.props.match.params.cost),
      ps: parseFloat(this.props.match.params.ps),
      pv:this.props.match.params.pv,
      PrepMethod: JSON.parse(this.props.match.params.PrepMethod)
    }
    
    console.log(this.state.id, "what do i get")
  }

  EditItemForm = withFormik<FormPropsItem, iItem>({
    mapPropsToValues: props => ({
        _id : this.props.match.params.id,
        Name: this.props.match.params.name,
        ItemCost: parseInt(this.props.match.params.cost) || 0,
        PortionSize: parseFloat(this.props.match.params.ps) || 0,
        PortionValue:this.props.match.params.pv,
        PrepMethod: JSON.parse(this.props.match.params.PrepMethod)
    }),
    validationSchema: Yup.object().shape({
      Name: Yup.string().required("Name is required").max(16, 'Please input 16 characters or less'),
      ItemCost: Yup.string().required("Item cost is required"),
      PortionSize:Yup.string().required("Portion Size is required"),
      PortionValue: Yup.string().required("Portion Value is required"),
    }),
    handleSubmit({ _id, Name,ItemCost, PortionSize, PortionValue , PrepMethod}: iItem,{ props, setSubmitting, setErrors, resetForm }) {
      
      console.log( _id, Name,ItemCost, PortionSize, PortionValue,PrepMethod, "FormValues");
      //console.log(props,"props", setSubmitting,"setSubmitting", setErrors,"setErrors", "OtherInfo");
      // Add send to server request here to check info 
        appInj.setLoading('Loading')
        const obj={_id, Name,ItemCost, PortionSize, PortionValue, PrepMethod}
        UpdateInvItem(_id,obj)
        setSubmitting(false)
        resetForm(undefined)
        window.location.replace("/viewItem")
    }
})(InnerFormItem);


  render() {
    return (
      <div>
        <h1>Update</h1>
        <this.EditItemForm></this.EditItemForm>
      </div>
    )
  }
}

export default EditItemPage

interface IProps extends RouteComponentProps<{id:string,name:string, cost: string, ps:string, pv:string, PrepMethod: string}>{}
interface IStates{id:string,name:string, cost: number, ps:number, pv:string, PrepMethod: any}