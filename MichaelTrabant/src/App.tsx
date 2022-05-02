import React, { Dispatch } from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { connect } from 'react-redux';

import { IAppState } from './services/redux/ReduxModels';
import { Global_GetAllData_AtStartUp, Global_User_Loc } from './services/redux/actions/GlobalAction';
import MainTabs from './routes/MainTabs';
import { GetAppSettings } from './services/ownServices/AppSettings';

class App extends React.Component<any, any> {
	componentDidUpdate() {
		// console.log('How may times do i get Triggered???', this.props);
		if (this.props.profile.isLoaded === true) {
			// console.log('isLoaded === true', this.props.profile);
			this.props.checkLock(this.props.profile);
			this.props.getAlldata();
		} else {
			// console.log('isLoaded !== true', this.props.profile);
		}
	}

	changeLang(langBool: boolean) {
		langBool = !langBool;
		return langBool;
	}

	render() {
		return (
			<IonApp>
				<IonReactRouter>
					<IonRouterOutlet></IonRouterOutlet>
					<MainTabs isOwner={this.props.isOwner} />
				</IonReactRouter>
			</IonApp>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	console.log('App.tsx', state);

	const isOwner = state.firebase.profile.email === GetAppSettings().other.ownerEmail ? true : false;
	return {
		profile: state.firebase.profile,
		isOwner
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: () => dispatch(Global_GetAllData_AtStartUp()),
		checkLock: (fbProfile: any) => dispatch(Global_User_Loc(fbProfile))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
