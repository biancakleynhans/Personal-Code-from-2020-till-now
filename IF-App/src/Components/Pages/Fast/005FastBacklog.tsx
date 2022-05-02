import React from 'react'
import { getType } from '../../Cache/FastCache';
import { iTimePeriod } from '../../Models/FastModels';
import { AddMultiFast, AddFast } from '../../../Services/ConectToServerServices';
import { FormikProps, withFormik } from 'formik';
import { iEditTimePeriod, FormPropsFast } from './004FastEdit';
import * as Yup from "yup";

export default class FastBackLogs extends React.Component {

  type:any
  Fast: iTimePeriod = {startTime:new Date()}

  componentWillMount()
  {
    this.type = getType()
    if(this.type !== undefined){console.log(this.type,"HERE type of fast");return this.type}
    else{console.log(this.type,"not HERE type of fast");return}
  }

  
  handleForce = (data:any) => {
    //console.log(data); 
    // eslint-disable-next-line
    data.map((entry:any)=>{
      //console.log(new Date(entry[1]), "single")
      
      var start:Date = new Date(entry[0]) //2019-08-01T22:30:00.000+00:00  2015-03-25T12:00:00Z
      var end:Date  = new Date(entry[1])
      var dur:Number = entry[2]
       //console.log(start,end, dur,  "single") //start, end, dur,this.type

      var obj = {
        startTime: start,
        endTime: end,
        duration:dur,
        typeofFast: this.type
      }
     // console.log(obj, "single")

      
      AddMultiFast(obj)
     
    })
  };
   
  render() {
    return (
      <div>
        <h1>Fast BackLogs</h1>
        <h2>
          Please select the csv file you would like to capture <br/> <strong className="imp"> please keep in following format</strong> <br/>
          "startTime", "endTime", "duration" ie: <br/>
          "2019-08-19T17:00:00Z", "2019-08-19T10:23:00Z", "17",<br/>
        </h2><br/><br/>
        <input type="file" onChange={e=>{
          var f=e.target.files && e.target.files[0];
          if(f)
          {
            var fr=new FileReader();
            fr.onloadend=() => {
              if (typeof (fr.result) == 'string') {
                var str: string = fr.result || '';
                var byline = str.split("\r").join("").split("\n").reduce((s, c) => {
                  s.push(c.split('"').join("").split(",").map(o => o.trim()));
                  return s;
                }, [] as string[][]);
                if (byline !== undefined) {
                  this.handleForce(byline);
                }
                if (byline === undefined) {
                  window.alert("Seems to have a problem please check file again");
                }
              }
            }
            fr.readAsText(f);
          }
        }} />
        <br/><br/>
        <hr/><hr/>
        <h2>Or Manulally Add a Day</h2>
        <AddFastForm/>
        
      </div>
    )
  }
}


const InnerFormFast = (props: FormikProps<iEditTimePeriod>) => {
  const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      errors,
      touched,
      isSubmitting
  } = props;

  function startChange(e:any) {
    var d = new Date(e.target.value)
    values.startTime = d
    //console.log('Select end onChange',values.startTime);
    handleChange(e)
    handleBlur(e)
  }
  function endChange(e:any) {
      
    var d = new Date(e.target.value)
    values.endTime = d
    //console.log('Select end onChange',values.endTime);
    handleChange(e)
    handleBlur(e)
  }


  return (
      <div className="form-style">
      
          <form onSubmit={handleSubmit}>
          <h3>Start Date and Time</h3><br/>
          <input type="datetime-local" name="startTime" width={50} onChange={startChange} onBlur={handleBlur}/>
          {errors.startTime && <div className="invalidCheck">{errors.startTime}</div>}

          <h3>End Date and Time</h3><br/>
          <input type="datetime-local" name="endTime" width={50} onChange={endChange}onBlur={handleBlur}/>
          {errors.endTime && <div className="invalidCheck">{errors.endTime}</div>}


          <button 
            type="submit" 
            disabled={
              isSubmitting ||
              !!(errors.startTime && touched.startTime) ||
              !!(errors.endTime && touched.endTime)
          }
          >Done</button>

          </form>
      </div> 
  );
};

const AddFastForm = withFormik<FormPropsFast, iEditTimePeriod>({
  mapPropsToValues: () => ({
    startTime: new Date(),
    endTime: new Date(),
    duration:0,
    typeofFast: {name: "18:6", lengthofFast: 18,nonFastingTime: 6} 
  }),

  validationSchema: Yup.object().shape({
    startTime:  Yup.date().required("Start Time is required"),
    endTime:    Yup.date().required("End Time is required")
  }),
  
  handleSubmit({startTime,endTime,duration, typeofFast}: iEditTimePeriod,{ setSubmitting, resetForm }) {
    //dur
    duration = ( new Date(endTime).getTime() -new Date(startTime).getTime() )/3600000
    
    const obj={startTime,endTime,duration, typeofFast}
    // console.log( obj , "obj");
    
    AddFast(obj)
    setSubmitting(false)
    resetForm()
    window.alert("Done adding ")
  }
})(InnerFormFast);
