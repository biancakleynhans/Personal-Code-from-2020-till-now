import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonAvatar, IonItem, IonInput, IonButton, IonTitle, IonModal } from '@ionic/react';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';

import { forgotPasswUser } from '../../../services/redux/actions/000AuthActions';

import { TypesToFirebaseGlobals } from '../../../services/firebase/TypesToServer';
import { IAppState } from '../../../services/redux/ReduxModels';

const Main = TypesToFirebaseGlobals.Main;
const MainText = TypesToFirebaseGlobals.MainText;

export class ForgotPassword extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			email: '',
			password: '',
			showLogging: false
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
					<IonAvatar className='avatarSmall' style={{ width: '150px', height: '150px', marginTop: '50px' }}>
						<img src={Main} alt='img' />
					</IonAvatar>
					<img src={MainText} alt='main tetx' />
					<IonItem className='roundedInput'>
						<IonInput
							required
							minlength={6}
							placeholder={Translate(lsInj.transDict.Email)}
							inputmode='text'
							name='email'
							type='text'
							value={this.state.email}
							onIonChange={(e) => this.handleEMAILChange(e)}
						/>
					</IonItem>

					<IonButton shape='round' type='submit'>
						{Translate(lsInj.transDict.Reset) + ' ' + Translate(lsInj.transDict.Passw)}
					</IonButton>

					{this.state.showLogging && (
						<IonModal cssClass='Modal1' showBackdrop={true} isOpen={this.state.showLogging}>
							<p>Please check your emails</p>
						</IonModal>
					)}

					<br />
					<br />
					{error ? <IonTitle color='danger'>{error}</IonTitle> : <></>}
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
