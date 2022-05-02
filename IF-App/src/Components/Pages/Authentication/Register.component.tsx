import React from 'react'
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { Register } from '../../../Services/ConectToServerServices';
import { OtherProps, newUser, newUserFormProps } from './userModels&&FormProps';


const InnerForm = (props: OtherProps & FormikProps<newUser>) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    title = 'Register Form'
  } = props;

  return (
    <div className="form-style">
    <h1>{title}</h1>
    <form onSubmit={handleSubmit}>
    <div>
        <label>Name</label>
        <input
          width={50}
          type="text"
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
        />
      </div>
      {errors.firstName && <div className="invalidCheck">{errors.firstName}</div>}

       <div>
        <label>Surname</label>
        <input
          width={50}
          type="text"
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
        />
      </div>
      {errors.lastName && <div className="invalidCheck">{errors.lastName}</div>}

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
      {errors.username && <div className="invalidCheck">{errors.username}</div>}

      <div>
        <label>Email</label>
        <input
          width={50}
          type="text"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
      </div>
      {errors.email && <div className="invalidCheck">{errors.email}</div>}
      
      <div>
        <label>Adress</label>
        <input
          width={50}
          type="text"
          name="adress"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.adress}
        />
      </div>
      {errors.adress && <div className="invalidCheck">{errors.adress}</div>}
      
      <div>
        <label>Contact Number</label>
        <input
          width={50}
          type="text"
          name="celNum"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.celNum}
        />
      </div>
      {errors.celNum && <div className="invalidCheck">{errors.celNum}</div>}

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
      {errors.password && <div className="invalidCheck">{errors.password}</div>}

       {/* <div>
        <label>Confirm Password</label>
        <input
          width={50}
          type="password"
          name="password2"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password2}
        />
      </div>
      {errors.password2 && <div className="invalidCheck">{errors.password2}</div>} */}

      <button
        type="submit"
        disabled={
            isSubmitting ||
            !!(errors.firstName && touched.firstName)||
            !!(errors.lastName && touched.lastName)||
            !!(errors.username && touched.username) ||
            !!(errors.email && touched.email)||
            !!(errors.adress && touched.adress)||
            !!(errors.celNum && touched.celNum)||
            !!(errors.password && touched.password) ||
            !!(errors.password2 && touched.password2)
        }>
      Sign In
      </button>
      </form>
    </div>
  );
};

export const RegisterForm = withFormik<newUserFormProps, newUser>({
  mapPropsToValues: props => ({
    firstName: props.initialFirstName || "",
    lastName: props.initialLastName || "",
    username: props.initialUsername || "",
    password: props.initialPassword2 || "",
    // password2: props.initialPassword || "",
    email: props.initialEmail || "",
    celNum: props.initialcelNum || "",
    adress: props.initialAdress || "",
  }),

  validationSchema: Yup.object().shape({
    firstName:      Yup.string().required("firstName is required"),
    lastName:       Yup.string().required("lastName is required"),
    username:       Yup.string().required("username is required").max(15, "Only 15 characters allowed"),
    password:       Yup.string().required("Password is required"),
    // password2:      Yup.string().required("Password2 is required"),
    email:          Yup.string().required("email is required"),
    // celNum:         Yup.number().required("contact Number is required").max(10, "Only 10 digits allowed "),
    adress:         Yup.string().required("adress is required").max(100, "To long for an adress"),
  }),

  handleSubmit({ firstName, lastName, username,password,password2,email ,celNum,adress }: newUser,{setSubmitting,resetForm }) {
    //console.log(firstName, lastName, username,password,password2,email ,celNum,adress, "FormValues");
    var newUser: newUser = {
      firstName:firstName,
      lastName: lastName,
      username: username,
      email: email,
      celNum: celNum,
      adress: adress,
      password: password,
      role: 'User'
    }
    // console.log(newUser,"newUser");
    //Add send to server request here to check info 
    Register(newUser)
    setSubmitting(false)
    resetForm()
  }
})(InnerForm);


class RegisterPage extends React.Component {
  render() {
    return (
      <div>
        <RegisterForm></RegisterForm>
      </div>
    )
  }
}

export default RegisterPage
