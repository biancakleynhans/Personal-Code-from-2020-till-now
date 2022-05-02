import { FormPropsUserInfo, iUserInfo, UserInfoInnerForm } from "./000UserInputInnerForm";
import { withFormik } from "formik";
import * as Yup from "yup";
import { AddUii } from "../../../Services/ConectToServerServices";

export const UserInputForm = withFormik<FormPropsUserInfo, iUserInfo>({
    mapPropsToValues: props => ({
        date:         props.date || new Date(),
        weight:       props.weight || 0,
        height:       props.height  || 0, 
        age:          props.age  || 0, 
        sex:          props.sex || "", 
        bmi:          props.bmi  || 0, 
        bmr:          props.bmr  || 0, 
        calReq:       props.calReq || 0,
        activeLevel:  props.activeLevel || ""
      
    }),
    validationSchema: Yup.object().shape({
      date: Yup.date().required("Date is required"), 
      weight:  Yup.number().required("Weight is required"),    
      height:  Yup.number().required("Height is required"),   
      age: Yup.number().required("Age is required"), 
      sex:Yup.string().required("Gender is required"),
      activeLevel:Yup.string().required("Active Level is required"),
    }),
    handleSubmit({date, weight, height, age,sex,activeLevel, bmi,bmr, calReq}: iUserInfo,
      { props, setSubmitting,resetForm }) {
      console.log(date, weight, height, age,sex,activeLevel, bmi,bmr,calReq,"FormValues");
      
      // Add send to server request here to check info 
      const obj = {
        weight: weight,  
        height: height, 
        activeLevel: activeLevel, 
        calReq: calReq,
        date:   date,    
        age:    age,     
        sex:    sex,     
        bmi:    bmi,         
        bmr:    bmr,     
      }

      AddUii(obj)
      setSubmitting(false)
      resetForm()
    }
})(UserInfoInnerForm);

