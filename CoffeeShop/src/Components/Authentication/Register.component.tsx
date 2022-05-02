import React from 'react'
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { Register } from '../../Services/ConectToServerServices';
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

       <div>
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

      <button
        type="submit"
        disabled={
            isSubmitting ||
            !!(errors.username && touched.username) ||
            !!(errors.password && touched.password) ||
            !!(errors.password2 && touched.password2)||
            !!(errors.firstName && touched.firstName)||
            !!(errors.lastName && touched.lastName)||
            !!(errors.email && touched.email)||
            !!(errors.celNum && touched.celNum)||
            !!(errors.adress && touched.adress)
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
    password2: props.initialPassword || "",
    email: props.initialEmail || "",
    celNum: props.initialcelNum || "",
    adress: props.initialAdress || "",
  }),

  validationSchema: Yup.object().shape({
    firstName:       Yup.string().required("firstName is required"),
    lastName:       Yup.string().required("lastName is required"),
    username:       Yup.string().required("username is required"),
    password:       Yup.string().required("Password is required"),
    password2:      Yup.string().required("Password2 is required"),
    email:          Yup.string().required("email is required"),
    celNum:  Yup.string().required("contactNumber is required"),
    adress:         Yup.string().required("adress is required"),
  }),

  handleSubmit({ firstName, lastName, username,password,password2,email ,celNum,adress }: newUser,{ props, setSubmitting, setErrors }) {
    console.log(firstName, lastName, username,password,password2,email ,celNum,adress, "FormValues");
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
    console.log(newUser,"newUser");
    //Add send to server request here to check info 
    Register(newUser)
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
