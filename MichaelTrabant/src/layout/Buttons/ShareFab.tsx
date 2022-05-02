/** @format */

import React, { Component } from 'react';
import { IonToolbar } from '@ionic/react';
import {
	FacebookShareButton,
	PinterestShareButton,
	TwitterShareButton,
	WhatsappShareButton
} from 'react-share';

import {
	FacebookIcon,
	PinterestIcon,
	TwitterIcon,
	WhatsappIcon
} from 'react-share';

export class ShareFab extends Component<any> {
	render() {
		console.log('url', this.props.url);
		const shareUrl = this.props.url; //GetAppSettings().firebase.shareUrl;
		const title = 'Tauschfarm ';

		return (
			<IonToolbar>
				<FacebookShareButton url={shareUrl} quote={title}>
					<FacebookIcon size={32} round={true} />
				</FacebookShareButton>

				<TwitterShareButton url={shareUrl} title={title}>
					<TwitterIcon size={32} round={true} />
				</TwitterShareButton>

				<WhatsappShareButton url={shareUrl} title={title}>
					<WhatsappIcon size={32} round={true} />
				</WhatsappShareButton>

				<PinterestShareButton
					url={shareUrl}
					title={title}
					media={this.props.MediaForP}>
					<PinterestIcon size={32} round={true} />
				</PinterestShareButton>
			</IonToolbar>
		);
	}
}

export default ShareFab;
