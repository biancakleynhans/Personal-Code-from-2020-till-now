import React, { Component } from 'react';
import { IonModal, IonButton } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

export class ConfirmDoneModal extends Component<any> {
	render() {
		return (
			<IonModal
				onDidDismiss={() => window.location.replace(this.props.rL)}
				backdropDismiss={false}
				cssClass='Modal1'
				showBackdrop={true}
				isOpen={this.props.ConfirmModal}>
				<p>{this.props.confirmModalMsg}</p>
				<IonButton
					shape='round'
					size='small'
					onClick={() => {
						return window.location.replace(this.props.rL);
					}}>
					{Translate(lsInj.transDict.Done)}
				</IonButton>
			</IonModal>
		);
	}
}

export default ConfirmDoneModal;
