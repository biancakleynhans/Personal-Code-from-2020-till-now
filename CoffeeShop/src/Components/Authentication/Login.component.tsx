import React from 'react'
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { LogIn } from '../../Services/ConectToServerServices'
import { OtherProps, LoginUser, LoginUserFormProps } from './userModels&&FormProps';



const InnerForm = (props: OtherProps & FormikProps<LoginUser>) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    title = 'Login Form'
  } = props;

  return (
    <div className="form-style">
    <h1>{title}</h1>
    <form onSubmit={handleSubmit}>

      <div>
        <label>Username</label>
        <input
          width={50}
          type="text"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          width={50}
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
      </div>

      <button
        type="submit"
        disabled={
            isSubmitting ||
            !!(errors.username && touched.username) ||
            !!(errors.password && touched.password)
        }>
      Sign In
      </button>
      </form>
    </div>
  );
};

export const LogInForm = withFormik<LoginUserFormProps, LoginUser>({
  mapPropsToValues: props => ({
    username: props.initialUsername || "",
    password: props.initialPassword || ""
  }),

  validationSchema: Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required")
  }),

  handleSubmit({  password, username }: LoginUser,{ props, setSubmitting, setErrors }) {
    console.log(password, username, "FormValues");
    //console.log(props,"props", setSubmitting,"setSubmitting", setErrors,"setErrors", "OtherInfo");
    // Add send to server request here to check info 
    LogIn(password, username)
   
  }
})(InnerForm);


class LoginPage extends React.Component {
  render() {
   
    return (
      <div>
        <LogInForm></LogInForm>
      </div>
    )
  }
}

export default LoginPage


