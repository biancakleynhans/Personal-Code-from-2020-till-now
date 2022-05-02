import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonAvatar,
	IonItem,
	IonInput,
	IonButton,
	IonFooter,
	IonToolbar,
	IonTitle,
	IonModal,
	IonLabel,
	IonCardTitle,
	IonCard,
	IonCardContent,
	IonGrid,
	IonRow,
	IonCol,
} from '@ionic/react';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { signUpUser, changeChoice } from '../../../services/redux/actions//000AuthActions';

import { TypesToFirebaseGlobals } from '../../../services/firebase/TypesToServer';
import { IAppState } from '../../../services/redux/ReduxModels';

const Main = TypesToFirebaseGlobals.Main;
const MainText = TypesToFirebaseGlobals.MainText;

export class Register extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			password: this.props.pasw,
			email: this.props.email,
			showLogging: false,
		};
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
		this.setState({ showLogging: true });
		this.props.register(this.state);
	}

	RENDERFORM() {
		return (
			<>
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
				<IonCardTitle class='ion-text-wrap'>{Translate(lsInj.transDict.Passw)}</IonCardTitle>
				<IonItem className='roundedInput'>
					<IonInput
						required
						minlength={6}
						placeholder='Password = Pretoria'
						inputmode='text'
						name='password'
						type='password'
						value={this.state.password}
						onIonChange={(e) => this.handlePWChange(e)}
					/>
				</IonItem>
			</>
		);
	}

	render() {
		const { error } = this.props;
		return (
			<IonPage>
				<IonContent fullscreen>
					<IonAvatar className='avatarSmall' style={{ width: '150px', height: '150px' }}>
						<img src={Main} alt='img' />
					</IonAvatar>

					<img style={{ height: window.innerWidth > 400 ? '100px' : 'unset' }} src={MainText} alt='main tetx' />

					{window.innerWidth > 400 ? (
						<IonGrid>
							<IonRow>
								<IonCol></IonCol>
								<IonCol> {this.RENDERFORM()}</IonCol>
								<IonCol></IonCol>
							</IonRow>
						</IonGrid>
					) : (
						this.RENDERFORM()
					)}

					<IonButton shape='round' type='submit' onClick={(e: any) => this.handleSubmit(e)}>
						{Translate(lsInj.transDict.SignUp)}
					</IonButton>

					<br />

					<IonButton
						class='ion-text-wrap'
						shape='round'
						fill='solid'
						onClick={() => {
							this.props.changeChoice(this.state);
						}}
						routerLink='/login'>
						{Translate(lsInj.transDict.AllreadyAcc)} {Translate(lsInj.transDict.SignIn)}
					</IonButton>
					<br />

					{error && (
						<IonCard>
							<IonCardContent color='danger'>{error}</IonCardContent>
						</IonCard>
					)}

					<br />
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
		register: (user: any) => dispatch(signUpUser(user)),
		changeChoice: (user: any) => dispatch(changeChoice(user)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
