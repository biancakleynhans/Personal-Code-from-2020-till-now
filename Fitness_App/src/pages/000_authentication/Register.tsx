/** @format */

import React from 'react';
import { IonContent, IonPage, IonCard, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { LoginUser, LoginUserFormProps } from '../../models/Authentication';
import { LablesList } from '../../components/titleLists/Titles';
import firebaseApp, { firebaseDatabase } from '../../services/firebase/firebase';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import PageHeader from '../../components/layout/PageHeader';

const InnerForm = (props: FormikProps<LoginUser>) => {
	const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = props;

	return (
		<form noValidate onSubmit={handleSubmit}>
			<IonItem>
				<IonLabel position='floating'>{LablesList.RegisterPage.RegisterList.email.af}</IonLabel>
				<IonInput autofocus={true} inputmode='text' name='email' type='text' value={values.email} onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.email && <div>{errors.email}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.RegisterPage.RegisterList.passw.af}</IonLabel>
				<IonInput autofocus={true} inputmode='text' name='password' type='text' value={values.password} onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.password && <div>{errors.password}</div>}

			<IonButton color='primary' type='submit' disabled={isSubmitting || !!(errors.email && touched.email) || !!(errors.password && touched.password)}>
				{LablesList.RegisterPage.RegisterList.button.af}
			</IonButton>
		</form>
	);
};

export const RegisterForm = withFormik<LoginUserFormProps, LoginUser>({
	mapPropsToValues: props => ({
		email: props.initialemail || '',
		password: props.initialPassword || ''
	}),

	validationSchema: Yup.object().shape({
		email: Yup.string().required(LablesList.RegisterPage.errors.email.af),
		password: Yup.string().required(LablesList.RegisterPage.errors.passw.af)
	}),

	handleSubmit({ password, email }: LoginUser, { setSubmitting }) {
		console.log(password, email, 'FormValues');

		firebaseApp
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(data => {
				if (data.user !== null) {
					console.log('data.user', data.user);

					var userCrendentials = {
						username: data.user.uid,
						email: email,
						createdAt: new Date().toISOString(),
						imageUrl: TypesToServer.Img,
						userId: data.user.uid
					};
					return firebaseDatabase.doc(`/${TypesToServer.User}/${data.user.uid}`).set(userCrendentials);
				}
			})
			.then(u => {
				console.log('second then in register', u);
				window.location.replace('/login');
			})
			.catch(error => {
				console.log('Nope', error);
			});

		setSubmitting(false);
	}
})(InnerForm);

class RegisterPage extends React.Component {
	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.Register.af} />
				<IonContent>
					<IonCard>
						<RegisterForm />
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

export default RegisterPage;
