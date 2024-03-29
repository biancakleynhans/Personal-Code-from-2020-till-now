import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import {
	ReactReduxFirebaseStore,
	ReactReduxFirebaseProps,
	AuthIsLoaded
} from './services/redux/Store';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

ReactDOM.render(
	<Provider store={ReactReduxFirebaseStore}>
		<ReactReduxFirebaseProvider {...ReactReduxFirebaseProps}>
			<AuthIsLoaded>
				<App />
			</AuthIsLoaded>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root')
);

defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
