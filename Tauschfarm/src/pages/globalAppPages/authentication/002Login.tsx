import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonAvatar, IonItem, IonInput, IonButton, IonFooter, IonToolbar, IonRouterLink, IonTitle } from '@ionic/react';
import { Translate, SetLanguage } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { signInUser, changeChoice } from '../../../services/redux/actions/userActions/000AuthActions';
import { iCred } from '../../../models/000AuthModels';
import { TypesToFirebaseGlobals } from '../../../services/firebase/TypesToServer';
import { IAppState } from '../../../services/redux/reduxModels';

const Main = TypesToFirebaseGlobals.Main;

export class Login extends Component<any, iCred> {
	constructor(props: any) {
		super(props);
		this.state = {
			password: this.props.pasw,
			email: this.props.email
		};

		SetLanguage('de');
	}

	handlePWChange(e: any) {
		e.preventDefault();
		this.setState({ password: e.detail.value });
	}

	handleEMAILChange(e: any) {
		e.preventDefault();
		this.setState({ email: e.detail.value });
	}

	handleSubmit(e: any) {
		e.preventDefault();
		this.props.login(this.state);
	}

	render() {
		const { error } = this.props;
		return (
			<IonPage>
				<IonContent fullscreen>
					<IonAvatar className='avatarSmall' style={{ width: '150px', height: '150px', marginTop: '50px' }}>
						<img src={Main} alt='img' />
					</IonAvatar>

					<IonItem className='roundedInput'>
						<IonInput
							placeholder={Translate(lsInj.transDict.Email)}
							inputmode='text'
							name='email'
							type='text'
							value={this.state.email}
							onIonChange={(e) => this.handleEMAILChange(e)}
						/>
					</IonItem>

					<IonItem className='roundedInput'>
						<IonInput
							placeholder={Translate(lsInj.transDict.Passw)}
							inputmode='text'
							name='password'
							type='password'
							value={this.state.password}
							onIonChange={(e) => this.handlePWChange(e)}
						/>
					</IonItem>

					<IonButton shape='round' type='submit' onClick={(e: any) => this.handleSubmit(e)}>
						{Translate(lsInj.transDict.SignIn)}
					</IonButton>

					<br />

					{error ? <IonTitle color='danger'>{error}</IonTitle> : <></>}

					<br />
					<br />

					<IonRouterLink routerLink='/reset' routerDirection='forward'>
						{Translate(lsInj.transDict.Forgot)}
					</IonRouterLink>
					<br />
					<br />
					<br />

					<IonFooter className='ion-no-border' translucent={true} style={{ position: 'fixed', bottom: '0' }}>
						<IonToolbar>
							{Translate(lsInj.transDict.NewAcc)}{' '}
							<IonButton
								fill='clear'
								onClick={() => {
									this.props.changeChoice(this.state);
								}}
								routerLink='/'>
								{Translate(lsInj.transDict.SignUp)}
							</IonButton>
						</IonToolbar>
					</IonFooter>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('state', state);
	return {
		error: state.auth.authError,
		suscess: state.auth,
		email: state.auth.email,
		pasw: state.auth.passw
	};
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		login: (user: any) => dispatch(signInUser(user)),
		changeChoice: (user: any) => dispatch(changeChoice(user))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
