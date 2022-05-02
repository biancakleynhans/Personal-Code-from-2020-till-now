import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { LoadingScreen } from '../../layout/Loading_Redirecting/LoadingScreen';

export function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth)) return <LoadingScreen />;

	return children;
}
