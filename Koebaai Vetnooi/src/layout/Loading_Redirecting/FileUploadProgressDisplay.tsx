/** @format */

import React from 'react';
import { IonModal, IonButton } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

import { useHistory } from 'react-router-dom';

const FileUploadProgressDisplay = (props: any) => {
	const history = useHistory();
	const string =
		Translate(lsInj.transDict.files) + ' ' + Translate(lsInj.transDict.busy);
	const fileN =
		Translate(lsInj.transDict.fileName) + ' ' + props.fileUploadingName;
	const prog =
		Translate(lsInj.transDict.uploaded) +
		' ' +
		':' +
		props.fileUploadProgress +
		'%';

	// console.log('string', string);
	// console.log('fileN', fileN, props.fileUploadingName);
	// console.log('prog', prog, props.fileUploadProgress);
	return (
		<>
			{props.type !== 'text' && (
				<IonModal
					cssClass='Modal1'
					showBackdrop={true}
					animated
					isOpen={props.ModalState}>
					<p>
						{string} <br />
						{fileN} <br />
						{prog} <br />
					</p>

					{!props.hide && (
						<IonButton
							size='small'
							onClick={() => {
								return history.goBack();
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					)}
				</IonModal>
			)}

			{props.type === 'text' && (
				<IonModal
					cssClass='Modal1'
					showBackdrop={true}
					animated
					isOpen={props.ModalState}>
					<p>{Translate(lsInj.transDict.finishPost)}</p>
					{!props.hide && (
						<IonButton
							size='small'
							onClick={() => {
								return history.goBack();
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					)}
				</IonModal>
			)}
		</>
	);
};

// export class FileUploadProgressDisplay extends Component<any> {
// 	renderModal() {
// 		// const newRL = this.props.rL;
// 		// // this.props.rL !== undefined
// 		// // 	? this.props.rL
// 		// // 	: AllRoutesListed.userRoutes.dash_Settings;
// 		// console.log('newRL', newRL);
// 		if (this.props.type !== 'text') {
// 			return (
// 				<IonModal
// 					cssClass='Modal1'
// 					showBackdrop={true}
// 					animated
// 					isOpen={this.props.ModalState}>
// 					<p>
// 						{Translate(lsInj.transDict.files)} {Translate(lsInj.transDict.busy)}
// 					</p>
// 					<p>
// 						{Translate(lsInj.transDict.fileName)} {this.props.fileUploadingName}
// 					</p>
// 					<p>
// 						{Translate(lsInj.transDict.uploaded)} :{' '}
// 						{this.props.fileUploadProgress.toFixed(2)} %
// 					</p>
// 					<IonButton
// 						size='small'
// 						onClick={() => {
// 							return routeChange();
// 						}}>
// 						{Translate(lsInj.transDict.Done)}
// 					</IonButton>
// 				</IonModal>
// 			);
// 		} else {
// 			return (
// 				<IonModal
// 					cssClass='Modal1'
// 					showBackdrop={true}
// 					animated
// 					isOpen={this.props.ModalState}>
// 					<p>{Translate(lsInj.transDict.finishPost)}</p>
// 					<IonButton
// 						size='small'
// 						onClick={() => {
// 							this.props.close();
// 						}}>
// 						{Translate(lsInj.transDict.Done)}
// 					</IonButton>
// 				</IonModal>
// 			);
// 		}
// 	}
// 	render() {
// 		console.log('props', this.props);
// 		return <>{this.renderModal()}</>;
// 	}
// }

export default FileUploadProgressDisplay;
