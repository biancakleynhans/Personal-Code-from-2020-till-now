import React, { Component } from 'react';
import { IonButton, IonModal } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

export class ErrorModal extends Component<any> {
	render() {
		return (
			<IonModal
				cssClass='Modal1'
				showBackdrop={true}
				isOpen={this.props.errorModal}>
				<p>{this.props.errorModalMsg}</p>
				<IonButton
					shape='round'
					size='small'
					onClick={() => {
						return window.location.reload();
					}}>
					{Translate(lsInj.transDict.Done)}
				</IonButton>
			</IonModal>
		);
	}
}

export default ErrorModal;
