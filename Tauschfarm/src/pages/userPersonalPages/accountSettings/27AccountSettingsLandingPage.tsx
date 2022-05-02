import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonHeader, IonSelect, IonSelectOption } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { arrowForward } from 'ionicons/icons';
import { connect } from 'react-redux';
import { User_ChangeLang } from '../../../services/redux/actions/userActions/001UserActions';
import { SetLanguage, Translate } from '../../../services/translate/TranslateServices';
import { signOutUser } from '../../../services/redux/actions/userActions/000AuthActions';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { IAppState } from '../../../services/redux/reduxModels';

class AccountSettingsLandingPage extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			lang: this.props.profile.lang === 'en' ? Translate(lsInj.transDict.English) : Translate(lsInj.transDict.Dutch)
		};
	}

	setLang(e: any) {
		const { profile } = this.props;
		// console.log('e', e);
		this.setState({ lang: e });

		var sending = {
			id: profile.id,
			lang: e
		};
		this.props.changeLang(sending);
		SetLanguage(e);
		window.location.replace('/');
	}
	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.AccountSettings)} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<IonList>
						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.Language)}</IonLabel>
							<IonSelect value={this.state.lang} placeholder={this.state.lang} onIonChange={(e) => this.setLang(e.detail.value)}>
								<IonSelectOption value='en'>{Translate(lsInj.transDict.English)}</IonSelectOption>
								<IonSelectOption value='de'>{Translate(lsInj.transDict.Dutch)}</IonSelectOption>
							</IonSelect>
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.Notifications)}</IonLabel>
							<IonButton fill='clear' slot='end' routerLink='/dashboard/acc/notify'>
								<IonIcon size='large' icon={arrowForward} />
							</IonButton>
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.Privacy)}</IonLabel>
							<IonButton fill='clear' slot='end' routerLink='/dashboard/acc/privicy'>
								<IonIcon size='large' icon={arrowForward} />
							</IonButton>
						</IonItem>

						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.Signout)}</IonLabel>
							<IonButton fill='clear' slot='end' onClick={() => this.props.signOutUser()}>
								<IonIcon size='large' icon={arrowForward} />
							</IonButton>
						</IonItem>
					</IonList>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('App.tsx', state);
	return {
		profile: state.user
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		changeLang: (user: any) => dispatch(User_ChangeLang(user)),
		signOutUser: () => dispatch(signOutUser())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsLandingPage);
