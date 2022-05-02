import React from 'react';
import { IonModal, IonButton, IonLabel, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { useHistory } from 'react-router-dom';

const FileUploadProgressDisplay = (props: {
	fileUploadingName: string;
	fileUploadProgress: number;
	ModalState: boolean;
	isChat?: boolean;
	type: string;
	isSupport?: boolean;
	supportFunc?: () => void;
}) => {
	const history = useHistory();
	const string = `${Translate(lsInj.transDict.files)}  ${Translate(lsInj.transDict.busy)}`;
	console.log('FILE  UPLOAD PROGRESS???', props);
	return (
		<>
			{props.type !== 'text' && (
				<IonModal cssClass='Modal1' showBackdrop={true} animated isOpen={props.ModalState}>
					<IonCard style={{ width: '327px', height: '350px' }}>
						<IonCardHeader>
							<IonCardTitle style={{ fontSize: '1.6em' }}>{Translate(lsInj.transDict.wait)}</IonCardTitle>
							<IonCardTitle style={{ fontSize: '1.3em' }}>{string}</IonCardTitle>
							<IonCardSubtitle style={{ fontSize: '1.2em' }}>
								<b>{Translate(lsInj.transDict.fileName)}</b>: {props.fileUploadingName !== undefined ? props.fileUploadingName : `Image${Math.random() * 1000}`}
							</IonCardSubtitle>
							<IonCardSubtitle style={{ fontSize: '1.4em' }}>
								<b>{Translate(lsInj.transDict.uploaded)}</b>: {props.fileUploadProgress} %
							</IonCardSubtitle>
						</IonCardHeader>

						{props.isChat === false && (
							<IonButton
								expand='full'
								onClick={() => {
									return history.goBack();
								}}>
								{Translate(lsInj.transDict.Close)}
							</IonButton>
						)}
						{props.isSupport && (
							<IonButton
								disabled={props.fileUploadProgress !== 100}
								expand='full'
								onClick={() => {
									props.supportFunc && props.supportFunc();
								}}>
								{Translate(lsInj.transDict.Close)}
							</IonButton>
						)}
					</IonCard>
				</IonModal>
			)}

			{props.type === 'text' && (
				<IonModal cssClass='Modal1' showBackdrop={true} animated isOpen={props.ModalState}>
					<IonItem lines='none'>
						<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.finishPost)}</IonLabel>
					</IonItem>
					<IonButton
						size='small'
						onClick={() => {
							return history.goBack();
						}}>
						{Translate(lsInj.transDict.Close)}
					</IonButton>
				</IonModal>
			)}
		</>
	);
};

export default FileUploadProgressDisplay;
