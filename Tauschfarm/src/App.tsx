import React, { Dispatch, Suspense } from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { connect } from 'react-redux';
import MainTabs from './routes/MainTabs';
import MainMenu from './routes/MainMenu';
import { IAppState } from './services/redux/reduxModels';
import { Global_GetAllData_AtStartUp, Global_User_Loc } from './services/redux/actions/GlobalAction';
import { SetLanguage } from './services/translate/TranslateServices';
import { Plugins, DeviceInfo } from '@capacitor/core';
import { AddNotifToRedux } from './services/redux/actions/userActions/001UserActions';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import LoadingScreen from './layout/Loading_Redirecting/LoadingScreen';

const { Device } = Plugins;

class App extends React.Component<any> {
	componentDidMount() {
		Device.getInfo().then((info: DeviceInfo) => {
			if (info && info.platform && info.platform === 'android') {
				FirebaseCrashlytics.initialise();
				FirebaseAnalytics.setEnabled(true);
			}
		});
	}

	componentDidUpdate() {
		if (this.props.profile.isLoaded === true) {
			SetLanguage(this.props.profile.lang);
			this.props.checkLock(this.props.profile);
			this.props.getAlldata(this.props.profile.id, this.props.isEmpt);
		}
	}

	changeLang(langBool: boolean) {
		langBool = !langBool;
		return langBool;
	}

	render() {
		const { profile } = this.props;

		return (
			<IonApp>
				<IonReactRouter>
					<Suspense fallback={<LoadingScreen />}>
						<IonRouterOutlet></IonRouterOutlet>
						<MainTabs />
					</Suspense>
					<MainMenu {...profile} changeLang={() => this.changeLang(profile.lang)} />
				</IonReactRouter>
			</IonApp>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	console.log('App.tsx', state);
	return {
		profile: state.firebase.profile,
		isEmpt: state.user.isEmpty
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty)),
		checkLock: (fbProfile: any) => dispatch(Global_User_Loc(fbProfile)),
		addNotifToredux: (notifs: any[]) => dispatch(AddNotifToRedux(notifs))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
