import rootReducer from './reducers/CombinedReducers';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const configureStore = createStore(rootReducer, compose(applyMiddleware(thunk)));
export default configureStore;
