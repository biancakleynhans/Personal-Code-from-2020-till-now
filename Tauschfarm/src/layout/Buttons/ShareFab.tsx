import React, { Component } from 'react';
import { IonToolbar } from '@ionic/react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

interface iProps {
	imageProp: string;
	titleProp: string;
	descProp: string;
	partFallback: string;
}

export class ShareFab extends Component<iProps> {
	render() {
		const { imageProp, descProp, partFallback } = this.props;
		// console.log('url', this.props.url, this.props.url.split('http://localhost:8100/'));
		//https://your_subdomain.page.link/?link=your_deep_link&apn=package_name[&amv=minimum_version][&afl=fallback_link]

		//only use this while playstore app is not up yet when play store app is up
		//we remove this part &afl=${fallback_link}
		//&d=1 at end for debugging

		var t = 'Besuche Tauschfarm und sieh dich in den digitalen Kleiderschränken der User um';

		var title = encodeURIComponent(t);
		var image = encodeURIComponent(imageProp); //'https://firebasestorage.googleapis.com/v0/b/tauschfarm.appspot.com/o/main_400x400.png?alt=media&token=53ba3585-c817-421d-887c-7be49a3f61a0'
		var link = encodeURIComponent(`https://tauschfarm.firebaseapp.com/${partFallback}`);
		var desc = encodeURIComponent(descProp);
		var package_name = encodeURIComponent('io.ionic.tauschfarm');
		var minimum_version = encodeURIComponent(1);
		// var fallback_link = encodeURIComponent(`https://tauschfarm.firebaseapp.com/${partFallback}`);
		var shareUrl = `https://tauschfarm.page.link/?link=${link}&apn=${package_name}&amv=${minimum_version}&st=${title}&si=${image}&sd=${desc}`;
		// console.log('shareUrl', shareUrl);

		return (
			<IonToolbar>
				<FacebookShareButton url={shareUrl} quote={t}>
					<FacebookIcon size={32} round={true} />
				</FacebookShareButton>

				<TwitterShareButton url={shareUrl} title={t}>
					<TwitterIcon size={32} round={true} />
				</TwitterShareButton>

				<WhatsappShareButton url={'https://tauschfarm.page.link/newUserLink'} title={t}>
					<WhatsappIcon size={32} round={true} />
				</WhatsappShareButton>
			</IonToolbar>
		);
	}
}

export default ShareFab;
