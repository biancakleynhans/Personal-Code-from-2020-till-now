import React from 'react';
import { IonModal, IonButton, IonLabel } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { useHistory } from 'react-router-dom';

const FileUploadProgressDisplay = (props: any) => {
	const history = useHistory();
	const string = `${Translate(lsInj.transDict.files)}  ${Translate(lsInj.transDict.busy)}`;
	const fileN = `${Translate(lsInj.transDict.fileName)} ${props.fileUploadingName}`;
	const prog = `${Translate(lsInj.transDict.uploaded)}: ${props.fileUploadProgress} %`;

	// console.log('string', string);
	// console.log('fileN', fileN, props.fileUploadingName);
	// console.log('prog', prog, props.fileUploadProgress);
	return (
		<IonModal cssClass='Modal1' showBackdrop={true} animated isOpen={props.ModalState}>
			<IonLabel class='ion-text-wrap'>{string}</IonLabel>
			<IonLabel class='ion-text-wrap'>{fileN}</IonLabel>
			<IonLabel class='ion-text-wrap'>{prog}</IonLabel>
			<IonButton
				size='small'
				onClick={() => {
					return history.goBack();
				}}>
				{Translate(lsInj.transDict.Done)}
			</IonButton>
		</IonModal>
	);
};

export default FileUploadProgressDisplay;
