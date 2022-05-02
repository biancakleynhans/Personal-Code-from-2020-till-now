/** @format */

import { NamedDict } from '../helpers/Tools';

interface FirebaseSettings {
	apiKey: string;
	authDomain: string;
	databaseURL: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
}

export interface AppSettings {
	firebase: FirebaseSettings;
	other: {
		appbaseUrl: string;
		shareUrl: string;
	};
}
type environments = 'dev';

//change this each time
const settingsModule = {
	env: 'dev' as environments
};

const configs = {
	dev: {
		firebase: {
			apiKey: "AIzaSyBCra4FnlxeSY2tJCEqTmywgF94AXCO7Zs",
			authDomain: "koebaaivetnooitest.firebaseapp.com",
			databaseURL: "https://koebaaivetnooitest.firebaseio.com",
			projectId: "koebaaivetnooitest",
			storageBucket: "koebaaivetnooitest.appspot.com",
			messagingSenderId: "1032143062508",
			appId: "1:1032143062508:web:6fab5d6764c23d1c9eacc9",
			measurementId: "G-E2BEZGF4ZP"
		},
		other: {
			appbaseUrl: 'https://firebasestorage.googleapis.com/v0/b/koebaaivetnooitest.appspot.com/o/',
			shareUrl: 'https://koebaaivetnooitest.firebaseapp.com/'
		}
	}
} as NamedDict<AppSettings>;

export function GetAppSettings() {
	return configs[settingsModule.env];
}
