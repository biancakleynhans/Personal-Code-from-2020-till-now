import React from 'react';
import { IonModal, IonButton, IonLabel, IonItem } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { useHistory } from 'react-router-dom';

const ConfirmDoneModal = (props: any) => {
	const history = useHistory();

	return (
		<IonModal backdropDismiss={false} cssClass='Modal2' showBackdrop={true} isOpen={props.ConfirmModal}>
			<IonItem>
				<IonLabel class='ion-text-wrap'>{props.confirmModalMsg}</IonLabel>
			</IonItem>
			<IonButton
				shape='round'
				size='small'
				onClick={() => {
					return history.goBack();
				}}>
				{Translate(lsInj.transDict.Close)}
			</IonButton>
		</IonModal>
	);
};

export default ConfirmDoneModal;
