import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './Theme/Styles/spinner.css'
import './Theme/Styles/img.css'
import './Theme/Styles/form-display.css'
import './Theme/Styles/table.css'
import './Theme/Styles/footer.css'
import './Theme/Styles/Navbar.styles.css'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
