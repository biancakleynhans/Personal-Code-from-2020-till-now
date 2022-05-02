import React, { Dispatch } from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { connect } from 'react-redux';

import { IAppState } from './services/redux/ReduxModels';
import {
	Global_GetAllData_AtStartUp,
	Global_User_Loc
} from './services/redux/actions/GlobalAction';
import MainTabs from './routes/MainTabs';
import MainMenu from './routes/MainMenu';

class App extends React.Component<any, any> {
	componentDidUpdate() {
		// console.log('How may times do i get Triggered???', this.props);
		if (this.props.profile.isLoaded === true) {
			// console.log('isLoaded === true', this.props.profile);
			this.props.checkLock(this.props.profile);
			this.props.getAlldata(this.props.profile);
		} else {
			// console.log('isLoaded !== true', this.props.profile);
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
					<IonRouterOutlet></IonRouterOutlet>
					<MainTabs />
					<MainMenu
						{...profile}
						changeLang={() => this.changeLang(profile.lang)}
					/>
				</IonReactRouter>
			</IonApp>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	console.log('App.tsx', state);
	return {
		profile: state.firebase.profile
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (fbProfile: any) =>
			dispatch(Global_GetAllData_AtStartUp(fbProfile)),
		checkLock: (fbProfile: any) => dispatch(Global_User_Loc(fbProfile))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
