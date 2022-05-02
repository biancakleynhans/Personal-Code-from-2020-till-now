import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonAvatar, IonItem, IonInput, IonButton, IonFooter, IonToolbar, IonLabel } from '@ionic/react';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { iCred } from '../../../models/000AuthModels';
import { forgotPasswUser } from '../../../services/redux/actions/userActions/000AuthActions';
import { TypesToFirebaseGlobals } from '../../../services/firebase/TypesToServer';
import { IAppState } from '../../../services/redux/reduxModels';

const Main = TypesToFirebaseGlobals.Main;

export class ForgotPassword extends Component<any, iCred> {
	constructor(props: any) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleEMAILChange(e: any) {
		e.preventDefault();
		this.setState({ email: e.detail.value });
	}

	handleSubmit() {
		// e.preventDefault();
		alert(Translate(lsInj.transDict.checkMail));
		this.props.forgot(this.state);
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

					<IonButton shape='round' onClick={() => this.handleSubmit()}>
						{Translate(lsInj.transDict.Reset) + ' ' + Translate(lsInj.transDict.Passw)}
					</IonButton>

					<br />
					<br />
					{error ? <IonLabel color='danger'>{error}</IonLabel> : <></>}
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
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('state', state);
	return {
		error: state.auth.authError,
		suscess: state.auth
	};
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		forgot: (user: any) => dispatch(forgotPasswUser(user))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
