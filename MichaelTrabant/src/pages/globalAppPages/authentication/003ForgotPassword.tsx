import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonItem,
	IonInput,
	IonButton,
	IonFooter,
	IonToolbar,
	IonLabel
} from '@ionic/react';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { iCred } from '../../../models/000AuthModels';
import { forgotPasswUser } from '../../../services/redux/actions/000AuthActions';
import { TypesToFirebaseGlobals } from '../../../services/firebase/TypesToServer';
import { IAppState } from '../../../services/redux/ReduxModels';

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

	handleSubmit(e: any) {
		e.preventDefault();
		this.props.forgot(this.state);
	}

	render() {
		const { error } = this.props;
		return (
			<IonPage>
				<IonContent fullscreen>
					<img
						style={{ width: '200px', height: '200px', marginTop: '10px' }}
						src={Main}
						alt='img'
					/>

					<IonItem lines='inset' className='roundedInput'>
						<IonInput
							placeholder={Translate(lsInj.transDict.Email)}
							inputmode='text'
							name='email'
							type='text'
							value={this.state.email}
							onIonChange={(e) => this.handleEMAILChange(e)}
						/>
					</IonItem>

					<IonButton style={{ margin: '35px' }} expand='full' type='submit'>
						{Translate(lsInj.transDict.Reset) +
							' ' +
							Translate(lsInj.transDict.Passw)}
					</IonButton>

					{error && (
						<IonItem>
							<IonLabel class='ion-text-wrap' color='danger'>
								{error}
							</IonLabel>
						</IonItem>
					)}

					{/*-- Footer without a border --*/}
					<IonFooter
						className='ion-no-border'
						translucent={true}
						style={{ position: 'fixed', bottom: '0' }}>
						<IonToolbar>
							<IonButton color='light' fill='clear' routerLink='/login'>
								{Translate(lsInj.transDict.AllreadyAcc)}{' '}
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
