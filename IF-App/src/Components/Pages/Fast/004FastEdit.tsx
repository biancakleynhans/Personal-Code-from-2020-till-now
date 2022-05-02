import React from 'react'
import { RouteComponentProps } from 'react-router';
import moment  from 'moment'
import { FormikProps, withFormik } from 'formik';
import { UpdateFast } from '../../../Services/ConectToServerServices';


export default  class FastEditPage extends React.Component<IProps, IStates> {

  constructor(props:any)
  {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      fast: JSON.parse(this.props.match.params.fast)
    }
    //console.log(this.state, "what do i get")
  }

  InnerFormFast = (props: FormikProps<iEditTimePeriod>) => {
    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
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

    function Dur ()
    {
      values.duration = ( new Date(values.endTime).getTime() - new Date(values.startTime).getTime() )/3600000
      //console.log( values.duration, "times")
    }

    return (
        <div className="form-style">
            <h1>Fast Edit Page</h1>

            <form onSubmit={handleSubmit}>
            
            <h2>Started At: {moment(this.state.fast.startTime).format('lll')}</h2><br/>
            <input type="datetime-local" name="startTime" width={50} onChange={startChange}
              onBlur={handleBlur}/>
  
            <h2>Ended At: {moment(this.state.fast.endTime).format('lll')}</h2>
            <input type="datetime-local" name="endTime" width={50} onChange={endChange}
              onBlur={handleBlur}/>

            <h2>Duration {(this.state.fast.duration)} Hours</h2>
            {Dur()}
            <h2>Type of Fast {this.state.fast.typeofFast.name}</h2>
  
            <button 
              type="submit" //disabled={isSubmitting}
            >Done</button>
  
            </form>
        </div> 
    );
  };

  EditItemForm = withFormik<FormPropsFast, iEditTimePeriod>({
    mapPropsToValues: () => ({
      id: this.state.id,
      startTime: this.state.fast.startTime,
      endTime: this.state.fast.endTime,
      duration: this.state.fast.duration,
      typeofFast: this.state.fast.typeofFast
    }),

    
    
    handleSubmit({id,startTime,endTime,duration, typeofFast}: iEditTimePeriod,{ setSubmitting, resetForm }) {
      //console.log( id,startTime,endTime,duration, typeofFast, "FormValues");
      const obj={startTime,endTime,duration, typeofFast}
      UpdateFast(id, obj)
      setSubmitting(false)
      resetForm(undefined)
      window.location.replace("/fastHistory")
    }
  })(this.InnerFormFast);

  render() {
    return (
      <div>
        <this.EditItemForm></this.EditItemForm>
      </div>
    )
  }
}


interface IProps extends RouteComponentProps<{id:string, fast: string}>{}
interface IStates{id: string, fast:any}

export interface iEditTimePeriod
{
  id? : string,
    startTime:Date,
    endTime:Date ,
    duration?: Number,
    typeofFast?: { name:String,lengthofFast:Number,nonFastingTime:Number}
}

export interface FormPropsFast
{
  initialstartTime?:Date ,
  initialendTime?:Date ,
  initialduration?: Number,
  initialtypeofFast?: { name:String,lengthofFast:Number,nonFastingTime:Number}
}




