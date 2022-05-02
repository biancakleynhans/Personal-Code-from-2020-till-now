import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonItem, IonInput, IonButton, IonFooter, IonToolbar, IonLabel, IonText, IonGrid, IonRow, IonCol, IonAvatar } from '@ionic/react';
import { SetLanguage, Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { signInUser, changeChoice } from '../../../services/redux/actions/000AuthActions';
import { iCred } from '../../../models/000AuthModels';
import { TypesToFirebaseGlobals } from '../../../services/firebase/TypesToServer';
import { IAppState } from '../../../services/redux/ReduxModels';

const Main = TypesToFirebaseGlobals.Main;

export class Login extends Component<any, iCred> {
	constructor(props: any) {
		super(props);
		this.state = {
			password: this.props.pasw,
			email: this.props.email,
		};

		SetLanguage('en');
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

	RENDERFORM() {
		return (
			<>
				<IonAvatar style={{ width: '200px', height: '200px', margin: 'auto' }}>
					<img src={Main} alt='img' />
				</IonAvatar>

				<IonItem className='roundedInput'>
					<IonInput
						style={{ textAlign: 'center' }}
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
						style={{ textAlign: 'center' }}
						placeholder={Translate(lsInj.transDict.Passw)}
						inputmode='text'
						name='password'
						type='password'
						value={this.state.password}
						onIonChange={(e) => this.handlePWChange(e)}
					/>
				</IonItem>

				<IonButton shape='round' style={{ margin: '35px' }} expand='full' type='submit' onClick={(e: any) => this.handleSubmit(e)}>
					{Translate(lsInj.transDict.SignIn)}
				</IonButton>
			</>
		);
	}

	render() {
		const { error } = this.props;
		return (
			<IonPage>
				<IonContent>
					{window.innerWidth > 400 ? (
						<IonGrid>
							<IonRow>
								<IonCol></IonCol>
								<IonCol>{this.RENDERFORM()}</IonCol>
								<IonCol></IonCol>
							</IonRow>
						</IonGrid>
					) : (
						this.RENDERFORM()
					)}

					{error && (
						<IonItem>
							<IonLabel class='ion-text-wrap' color='danger'>
								{error}
							</IonLabel>
						</IonItem>
					)}

					{/*-- Footer without a border --*/}
					<IonFooter className='ion-no-border' translucent={true} style={{ position: 'fixed', bottom: '0' }}>
						<IonToolbar>
							<IonButton
								color='light'
								// fill='clear'
								onClick={() => {
									this.props.changeChoice(this.state);
								}}
								routerLink='/'>
								<IonText style={{ color: 'white' }}>
									{Translate(lsInj.transDict.NewAcc)} {Translate(lsInj.transDict.SignUp)}
								</IonText>
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
		pasw: state.auth.passw,
	};
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		login: (user: any) => dispatch(signInUser(user)),
		changeChoice: (user: any) => dispatch(changeChoice(user)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
