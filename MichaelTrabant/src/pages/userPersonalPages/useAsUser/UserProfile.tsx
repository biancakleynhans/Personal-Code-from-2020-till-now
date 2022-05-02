import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonList, IonInput, IonHeader, IonToolbar, IonFooter, IonIcon, IonChip } from '@ionic/react';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/ReduxModels';
import { SetLanguage, Translate, GetLanguage } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { User_ChangeLang, User_Update } from '../../../services/redux/actions/001UserActions';
import { signOutUser } from '../../../services/redux/actions/000AuthActions';
import PageHeader from '../../../layout/Headers/PageHeader';
import { checkmark, exit } from 'ionicons/icons';

class Dashboard extends Component<any, any> {
	constructor(props: any) {
		super(props);
		const { user } = this.props;

		const pDes = user.connectp ? user.connectp.split('*') : [];

		this.state = {
			lang: GetLanguage() === 'en' ? Translate(lsInj.transDict.English) : Translate(lsInj.transDict.Dutch),
			name: user.name,
			email: pDes.length > 0 ? pDes[1] : '',
			psw: pDes.length > 0 ? pDes[0] : '',
		};
	}

	changeUsername(e: any) {
		e.preventDefault();
		// console.log('e', e.detail.value);
		this.setState({ name: e.detail.value });
	}

	changeEmail(e: any) {
		e.preventDefault();
		// console.log('e', e.detail.value);
		this.setState({ email: e.detail.value });
	}

	changePsw(e: any) {
		e.preventDefault();
		// console.log('e', e.detail.value);
		this.setState({ psw: e.detail.value });
	}

	setLang(e: any) {
		const { user } = this.props;
		// console.log('e', e);
		this.setState({ lang: e });

		var sending = {
			id: user.id,
			lang: e,
		};
		this.props.changeLang(sending);
		SetLanguage(e);
		window.location.replace('/');
	}

	submit() {
		// console.log('submit ', this.state);
		var sendData = {
			name: this.state.name,
			connectp: `${this.state.psw}*${this.state.email}`,
		};
		console.log('submit', sendData);
		this.props.updateUser(sendData);
	}

	submitDisconnect() {
		// console.log('submit ', this.state);
		var sendData = {
			name: this.state.name,
			connectp: 'diss',
		};
		console.log('submit', sendData);
		this.props.updateUser(sendData);
		this.setState({ email: '', psw: '' });
	}

	saveNameChange() {
		console.log('clicked name save');
		const { user } = this.props;
		var sendData = {
			name: this.state.name,
			connectp: user.connectp,
		};
		console.log('submit', sendData);
		this.props.updateUser(sendData);
	}

	render() {
		const { user, userSessions } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader titleString={`${Translate(lsInj.transDict.AccountSettings)}`} />
					</IonHeader>
					<br />
					<br />

					<IonList>
						<IonItem className='roundedInput'>
							<IonInput placeholder={user.name} inputmode='text' type='text' name='username' value={this.state.name} onIonChange={(e) => this.changeUsername(e)} />
							<IonIcon color='primary' icon={checkmark} onClick={() => this.saveNameChange()} />
						</IonItem>
						<IonItem>
							<IonLabel>{Translate(lsInj.transDict.Language)}</IonLabel>
							<IonSelect value={this.state.lang} placeholder={this.state.lang} onIonChange={(e) => this.setLang(e.detail.value)}>
								<IonSelectOption value='en'>{Translate(lsInj.transDict.English)}</IonSelectOption>
								<IonSelectOption value='de'>{Translate(lsInj.transDict.Dutch)}</IonSelectOption>
							</IonSelect>
						</IonItem>
						<IonItem>
							<IonLabel>
								{Translate(lsInj.transDict.My)} {Translate(lsInj.transDict.Sessions)}
							</IonLabel>
						</IonItem>
						{/* Default chip  */}
						<IonChip
							color='secondary'
							style={{
								width: '250px',
								textAlign: 'center',
								fontSize: '1.5em',
							}}>
							<IonLabel style={{ width: 'inherit' }}>07 july 2020 - 12:00</IonLabel>
						</IonChip>
						{/* Acutal chip */}
						{userSessions.map((session: any) => {
							if (session.date > new Date().getTime()) {
								return (
									<IonChip key={1} color='secondary' style={{ width: '200px' }}>
										<IonLabel style={{ width: 'inherit' }}>{session.date}</IonLabel>
									</IonChip>
								);
							} else {
								return <></>;
							}
						})}
						<IonItem>
							<IonLabel>
								{user.connectp.length === 0 && Translate(lsInj.transDict.connectPayPal)}
								{user.connectp.length > 0 && Translate(lsInj.transDict.disconnectPayPal)}
							</IonLabel>
						</IonItem>
						{user.connectp.length === 0 && (
							<>
								<IonItem className='roundedInput'>
									<IonInput placeholder={user.email} inputmode='text' type='text' name='username' value={this.state.email} onIonChange={(e) => this.changeEmail(e)} />
								</IonItem>
								<IonItem className='roundedInput'>
									<IonInput placeholder={'enter here'} inputmode='text' type='text' name='username' value={this.state.psw} onIonChange={(e) => this.changePsw(e)} />
								</IonItem>
							</>
						)}

						{user.connectp.length === 0 && (
							<IonButton color='primary' onClick={() => this.submit()} disabled={this.state.email.length === 0 || this.state.psw.length === 0}>
								{Translate(lsInj.transDict.Connect)}
							</IonButton>
						)}

						{user.connectp.length > 0 && (
							<IonButton color='primary' onClick={() => this.submitDisconnect()}>
								{Translate(lsInj.transDict.Disconnect)}
							</IonButton>
						)}
					</IonList>

					<IonFooter className='ion-no-border' translucent={true} style={{ position: 'fixed', bottom: '0' }}>
						<IonToolbar>
							<IonButton fill='clear' slot='start' onClick={() => this.props.signOutUser()}>
								<IonIcon icon={exit} />
								{Translate(lsInj.transDict.Signout)}
							</IonButton>
						</IonToolbar>
					</IonFooter>
					{/* {this.props.loading && <ProfileSkeletonScreen />} */}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('dash props:', state.user.categories);

	return {
		user: state.user,
		loading: state.user.isEmpty,
		userSessions: [],
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		changeLang: (user: any) => dispatch(User_ChangeLang(user)),
		signOutUser: () => dispatch(signOutUser()),
		updateUser: (user: any) => dispatch(User_Update(user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
