import React from 'react'
import { Formik, Form, Field, FieldArray } from 'formik';
import { IProps, IStates } from './004_UserRenameDesc';
import {RouteComponentProps} from 'react-router-dom' 

export class MyForm extends React.Component<IProps & RouteComponentProps, IStates> {

  DataArrayRecieved =[]
  RenameArrayToSendBack = []
  

  constructor(props){
    super(props)
    this.state = {
      desc: this.props,
      redirect: false
    }
    console.log("InnerForm","props", this.props, "state", this.state)
  }
  
  handleSubmit = (values, {setSubmitting }) => {
    // console.log("values: ", values)
    this.RenameArrayToSendBack.push(values)
    this.props.callbackFromParent[1](this.RenameArrayToSendBack);
    setSubmitting(false);
    return 
  }


  render() {
    let vehicles = this.props.callbackFromParent[0]
    return(
      <Formik
          initialValues={{vehicles: vehicles}}
          onSubmit={this.handleSubmit}
      >
      {props => (
      <Form>
      <FieldArray
        name='vehicles'
        render={
            arrayHelpers => (
          <div>         
                {props.values.vehicles.map((vehicle, index) => (           
                <div key={index}>
              
                    {/* Edit the value here */}
                    <Field name={`vehicles.${index}`} />     
                
                    <button type="button"onClick={() => arrayHelpers.replace(index, vehicle)}>replace</button>
                </div>
                ))}
            </div>
        )}
      />
        <button type="submit">done</button>  
      </Form>   
      )}
    </Formik>
    );
  }
}


