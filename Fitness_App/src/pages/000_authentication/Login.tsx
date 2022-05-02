/** @format */

import React from 'react';
import { IonContent, IonPage, IonCard, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { LoginUser, LoginUserFormProps } from '../../models/Authentication';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';
import firebaseApp, { firebaseDatabase } from '../../services/firebase/firebase';
import { TypesToServer } from '../../services/firebase/TypesToServer';

const InnerForm = (props: FormikProps<LoginUser>) => {
	const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = props;

	return (
		<form noValidate onSubmit={handleSubmit}>
			<IonItem>
				<IonLabel position='floating'>{LablesList.LoginPage.LoginList.email.af}</IonLabel>
				<IonInput autofocus={true} inputmode='text' name='email' type='text' value={values.email} onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.email && <div>{errors.email}</div>}

			<IonItem>
				<IonLabel position='floating'>{LablesList.LoginPage.LoginList.passw.af}</IonLabel>
				<IonInput autofocus={true} inputmode='text' name='password' type='text' value={values.password} onIonChange={handleChange} onIonBlur={handleBlur} />
			</IonItem>
			{errors.password && <div>{errors.password}</div>}

			<IonButton color='primary' type='submit' disabled={isSubmitting || !!(errors.email && touched.email) || !!(errors.password && touched.password)}>
				{LablesList.LoginPage.LoginList.button.af}
			</IonButton>
		</form>
	);
};

export const LogInForm = withFormik<LoginUserFormProps, LoginUser>({
	mapPropsToValues: props => ({
		email: props.initialemail || '',
		password: props.initialPassword || ''
	}),

	validationSchema: Yup.object().shape({
		email: Yup.string().required(LablesList.LoginPage.errors.email.af),
		password: Yup.string().required(LablesList.LoginPage.errors.passw.af)
	}),

	handleSubmit({ password, email }: LoginUser, { setSubmitting }) {
		console.log(password, email, 'FormValues');

		firebaseApp
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {})
			.then(u => {
				console.log('u', u);
				window.location.reload();
				window.location.replace('/dashboard');
			})
			.catch(error => {
				console.log('wtf', error);
				if (error.message === 'EMAIL_NOT_FOUND') {
					console.log('400 msg');
					alert(LablesList.LoginPage.errors.emailNope.af);
				} else if (error.code === 'auth/wrong-password') {
					console.log('auth/wrong-password');
					alert(LablesList.LoginPage.errors.passwNope.af);
				} else if (error.code === 'auth/user-not-found') {
					console.log('auth/user-not-found');
					alert(LablesList.LoginPage.errors.Nope.af);
				} else {
					console.log('Nope', error);
					alert(LablesList.LoginPage.errors.err.af);
				}
			});

		setSubmitting(false);
	}
})(InnerForm);

class LoginPage extends React.Component {
	signInAnon() {
		firebaseApp
			.auth()
			.signInAnonymously()
			.then(data => {
				if (data.user !== null) {
					console.log('data.user', data.user);

					var userCrendentials = {
						username: data.user.uid,
						email: '',
						createdAt: new Date().toISOString(),
						imageUrl: TypesToServer.Img,
						userId: data.user.uid
					};
					return firebaseDatabase.doc(`/${TypesToServer.User}/${data.user.uid}`).set(userCrendentials);
				}
			})
			.then(u => {
				console.log('u', u);
				window.location.reload();
				window.location.replace('/dashboard');
			})
			.catch(error => {
				console.log('Nope', error);
			});
	}

	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.Login.af} />
				<IonContent>
					<IonCard>
						<IonButton onClick={() => this.signInAnon()}>{LablesList.LoginPage.button.af}</IonButton>
						<LogInForm />
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

export default LoginPage;
