import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonHeader, IonSelect, IonSelectOption } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/ReduxModels';
import { User_ChangeLang } from '../../../services/redux/actions/001UserActions';
import { Translate } from '../../../services/translate/TranslateServices';
import { signOutUser } from '../../../services/redux/actions/000AuthActions';
import { lsInj } from '../../../services/translate/LocalLangDict';
import PageHeader from '../../../layout/Headers/PageHeader';

class AccountSettingsLandingPage extends Component<any, any> {
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
							<IonLabel>{Translate(lsInj.transDict.Signout)}</IonLabel>
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
