import * as React from 'react';
import { Redirect } from 'react-router';

export const CommonUIProps = {
	redirect: '' as string,
	serviceElComponent: {} as CommonUIServicesComponent
};

export function RedirectTo(to: string) {
	CommonUIProps.redirect = to;
	CommonUIProps.serviceElComponent.lastRenderTo = '';
	CommonUIProps.serviceElComponent.forceUpdate();
}
export class CommonUIServicesComponent extends React.Component {
	componentDidMount() {
		CommonUIProps.serviceElComponent = this;
	}
	lastRenderTo: string = '';
	render() {
		if (CommonUIProps.redirect && this.lastRenderTo !== CommonUIProps.redirect) {
			this.lastRenderTo = CommonUIProps.redirect;
			setTimeout(() => {
				CommonUIProps.redirect = '';
				this.forceUpdate();
			}, 0);
			// console.log('COMMONSERVICES RENDER REDIRECT ' + CommonUIProps.redirect);
			return <Redirect from={window.location.pathname} to={CommonUIProps.redirect} />;
		} else {
			return <></>;
		}
	}
}
