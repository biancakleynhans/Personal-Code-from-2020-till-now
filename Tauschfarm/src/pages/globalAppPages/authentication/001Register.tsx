import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonAvatar, IonItem, IonInput, IonButton, IonFooter, IonToolbar, IonCheckbox, IonLabel } from '@ionic/react';
import { Translate, SetLanguage } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { signUpUser, changeChoice } from '../../../services/redux/actions/userActions/000AuthActions';
import { iCred } from '../../../models/000AuthModels';
import { TypesToFirebaseGlobals } from '../../../services/firebase/TypesToServer';
import { IAppState } from '../../../services/redux/reduxModels';
import CookieConsent from 'react-cookie-consent';
import { AllRoutesListed } from '../../../routes/AllRoutesListed';

const Main = TypesToFirebaseGlobals.Main;

export class Register extends Component<any, iCred> {
	constructor(props: any) {
		super(props);
		this.state = {
			password: this.props.pasw,
			email: this.props.email,
			firstName: '',
			lastName: '',
			accept: true
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

	handleFirstNameChange(e: any) {
		e.preventDefault();
		this.setState({ firstName: e.detail.value });
	}

	handleLastNameChange(e: any) {
		e.preventDefault();
		this.setState({ lastName: e.detail.value });
	}

	acceptTC(e: any) {
		//  console.log(e.detail.checked);

		if (e.detail.checked === true) {
			this.setState({ accept: false });
		} else {
			this.setState({ accept: true });
		}
	}

	acceptCookie(e: any) {
		// console.log('cookie accepted ', e);
	}

	declineCookies() {
		// console.log('cookie declied ');
	}

	handleSubmit(e: any) {
		this.props.register(this.state);
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
							placeholder={Translate(lsInj.transDict.firstName)}
							inputmode='text'
							name='firstName'
							type='text'
							value={this.state.firstName}
							onIonChange={(e) => this.handleFirstNameChange(e)}
						/>
					</IonItem>

					<IonItem className='roundedInput'>
						<IonInput
							placeholder={Translate(lsInj.transDict.lastName)}
							inputmode='text'
							name='lastName'
							type='text'
							value={this.state.lastName}
							onIonChange={(e) => this.handleLastNameChange(e)}
						/>
					</IonItem>

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
							placeholder={Translate(lsInj.transDict.Passw2)}
							inputmode='text'
							name='password'
							type='password'
							value={this.state.password}
							onIonChange={(e) => this.handlePWChange(e)}
						/>
					</IonItem>

					<IonItem className='roundedInput'>
						<IonLabel class='ion-text-wrap'>
							{Translate(lsInj.transDict.accpetTC)} <br />
							<IonButton color='dark' routerLink={AllRoutesListed.otherRoutes.tc}>
								{Translate(lsInj.transDict.tc)}
							</IonButton>
						</IonLabel>

						<IonCheckbox slot='start' onIonChange={(e) => this.acceptTC(e)} />
					</IonItem>

					<IonButton
						shape='round'
						type='submit'
						disabled={this.state.accept || this.state.password.length < 7 || this.state.email.length < 5}
						onClick={(e: any) => this.handleSubmit(e)}>
						{Translate(lsInj.transDict.SignUp)}
					</IonButton>

					<br />

					{error ? (
						<IonLabel class='ion-text-wrap' color='danger'>
							{error}
						</IonLabel>
					) : (
						<></>
					)}

					<br />
					<br />
					<br />
					<br />
					<CookieConsent
						// debug={true}
						location='top'
						buttonText={Translate(lsInj.transDict.Accept)}
						declineButtonText={Translate(lsInj.transDict.Decline)}
						onAccept={(e) => {
							this.acceptCookie(e);
						}}
						onDecline={() => {
							this.declineCookies();
						}}
						cookieName='CookieConsent'
						declineCookieValue={false}
						enableDeclineButton={true}
						style={{ background: '#bc8f8f', fontSize: '1.3em' }}
						declineButtonStyle={{ background: '#d0c3ba', color: 'white', fontSize: '1.3em' }}
						buttonStyle={{ background: '#d8bdb6', color: 'white', fontSize: '1.3em' }}
						expires={365}
						cookieSecurity={true}
						sameSite='lax'>
						{Translate(lsInj.transDict.cookies)}
					</CookieConsent>
				</IonContent>
				{/*-- Footer without a border --*/}
				<IonFooter className='ion-no-border' translucent={true} style={{ position: 'fixed', bottom: '0' }}>
					<IonToolbar>
						{Translate(lsInj.transDict.AllreadyAcc)}{' '}
						<IonButton
							fill='clear'
							onClick={() => {
								this.props.changeChoice(this.state);
							}}
							routerLink='/login'>
							{Translate(lsInj.transDict.SignIn)}
						</IonButton>
					</IonToolbar>
				</IonFooter>
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
		register: (user: any) => dispatch(signUpUser(user)),
		changeChoice: (user: any) => dispatch(changeChoice(user))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
