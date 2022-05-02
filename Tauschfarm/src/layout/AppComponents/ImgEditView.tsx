import React, { Component, Dispatch } from 'react';
import { TypesToFirebaseGlobals } from '../../services/firebase/TypesToServer';
import { updateImgPreviewAndFileN } from '../../services/ownServices/HelperFuncs';
import { i_Redux_ActionFunc_Interface_ImgDelete, i_Redux_ActionFunc_Interface_ImgEdit } from '../../models/007ImageModels';
import { IonGrid, IonRow, IonButton, IonIcon, IonCol } from '@ionic/react';
import { trashBin } from 'ionicons/icons';
import { User_Profile_DeleteImg, User_Profile_EditImg } from '../../services/redux/actions/userActions/001UserActions';
import { connect } from 'react-redux';
import { User_Item_DeleteImg, User_Item_EditImg } from '../../services/redux/actions/userActions/003ItemAction';
import { User_Event_DeleteImg, User_Event_EditImg } from '../../services/redux/actions/userActions/005EventsActions';
import { User_Donations_DeleteImg, User_Donations_EditImg } from '../../services/redux/actions/userActions/004DonationsActions';
import { IAppState } from '../../services/redux/reduxModels';
import FileUploadProgressDisplay from '../Loading_Redirecting/FileUploadProgressDisplay';
import ConfirmDoneModal from '../Loading_Redirecting/ConfirmDoneModal';
import { Group_Item_EditImg, User_Group_DeleteImg } from '../../services/redux/actions/GroupActions/103Group_ItemAction';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { Group_DeleteImg, Group_EditImg } from '../../services/redux/actions/userActions/006GroupsActions';
import ImageCropperComponent from './ImageCropperComponent';

interface iState {
	imgIndex: 0;
	imgPreview: any;
	imgArray: string;
	bio: string;
	imgReplace: string;
	fileN: string;
	changed: boolean;
	showProgressModal: boolean;
	progress: {
		progress: number;
		fileName: string;
	};
	showDeleteModal: boolean;
	showCropper: boolean;
}

class ImgEditView extends Component<any, iState> {
	imgPreview = '';
	user = {
		id: '',
		imgArray: [TypesToFirebaseGlobals.placeholderImg]
	};

	constructor(props: any) {
		super(props);

		this.state = {
			imgIndex: this.props.imgIndex,
			imgPreview: '',
			imgArray: '',
			bio: '',
			imgReplace: '',
			fileN: '',
			changed: false,
			showProgressModal: false,
			progress: {
				progress: this.props.progress.progress,
				fileName: this.props.progress.fileName
			},
			showDeleteModal: false,
			showCropper: true
		};

		// this.handleImageChange = this.handleImageChange.bind(this);
		this.deleteImg = this.deleteImg.bind(this);

		// console.log('props', this.props);

		this.user = this.props.user;
		this.user.imgArray = this.user.imgArray === undefined ? [this.props.user.avatar] : this.props.user.imgArray;
		this.imgPreview = this.props.user.imgArray[+this.props.imgIndex] ? this.props.user.imgArray[+this.props.imgIndex] : this.props.avatar;

		console.log('state', this.state);
	}

	deleteImg() {
		// console.log('Img Add View where everything should happen');
		// console.log('User', this.user);
		// console.log('STATE', this.state);
		// console.log('PROPS', this.props);

		var delImg = this.user.imgArray[+this.state.imgIndex];

		var name = updateImgPreviewAndFileN(delImg, this.props.userId, this.props.folderType);

		var checkfordefault = name.length > 0 ? name : 'Default';
		// console.log('delImg', name);
		var array = [...this.user.imgArray]; // make a separate copy of the array
		// console.log('arry to delete from', array);
		array.splice(this.state.imgIndex, 1);
		// console.log('arry', array);

		var sending: i_Redux_ActionFunc_Interface_ImgDelete = {
			itemId: '',
			fileName: checkfordefault,
			newArray: array
		};

		if (this.props.userOrGroup === 'user') {
			// console.log('user Type');

			if (this.props.imgType === 'profile') {
				// console.log('the img dispatch to trigger is ', this.props.imgType);
				this.setState({ showDeleteModal: !this.state.showDeleteModal });
				this.props.User_deleteImg(sending);
				this.setState({});
			}
			if (this.props.imgType === 'item') {
				// console.log('the img dispatch to trigger is ', this.props, this.state);
				sending.itemId = this.user.id;
				this.setState({ showDeleteModal: !this.state.showDeleteModal });
				this.props.Item_deleteImg(sending);
				this.setState({});
			}
			if (this.props.imgType === 'don') {
				// console.log('the img dispatch to trigger is ', this.props, this.state);
				sending.itemId = this.user.id;
				this.setState({ showDeleteModal: !this.state.showDeleteModal });
				this.props.Don_deleteImg(sending);
				this.setState({});
			}
			if (this.props.imgType === 'event') {
				// console.log('the img dispatch to trigger is ', this.props.imgType);
				sending.itemId = this.user.id;
				this.setState({ showProgressModal: !this.state.showProgressModal });
				this.props.Event_deleteImg(sending);
				this.setState({});
			} else {
				// console.log('the img dispatch to trigger is ', this.props.imgType);
			}
		} else {
			// console.log('group Type');
			if (this.props.imgType === 'item') {
				// console.log('the img dispatch to trigger is ', this.props, this.state);
				sending.itemId = this.user.id;
				this.setState({ showDeleteModal: !this.state.showDeleteModal });
				this.props.GroupItemDelte(sending);
				this.setState({});
			}
			if (this.props.imgType === 'profile') {
				console.log('the img dispatch to trigger is ', this.props, this.state);
				sending.itemId = this.user.id;
				this.setState({ showDeleteModal: !this.state.showDeleteModal });
				this.props.Group_Profile_deleteImg(sending);
				this.setState({});
			}
		}
	}

	changeImg(oldfileName: string, newFile: any, newFileName: string, newArray: string[]) {
		var sending: i_Redux_ActionFunc_Interface_ImgEdit = {
			itemId: '',
			oldFileName: oldfileName,
			newArray: newArray,
			newFileName: newFileName.replace(/\s+/g, ''),
			newFile: newFile,
			indexOfImg: this.state.imgIndex
		};

		if (this.props.userOrGroup === 'user') {
			// console.log('user Type');

			if (this.props.imgType === 'profile') {
				// console.log('the img dispatch to trigger is ', this.props.imgType);
				this.setState({ showProgressModal: !this.state.showProgressModal });
				this.props.User_changeImg(sending);
				this.setState({});
			}
			if (this.props.imgType === 'item') {
				console.log('??????', this.props.imgType, sending);
				this.setState({ showProgressModal: !this.state.showProgressModal });
				this.props.Item_changeImg(sending);
				this.setState({});
			}
			if (this.props.imgType === 'donation') {
				// console.log('the img dispatch to trigger is ', this.props.imgType);
				sending.itemId = this.user.id;
				// console.log('sending', sending);
				this.setState({ showProgressModal: !this.state.showProgressModal });
				this.props.Donatation_changeImg(sending);
				this.setState({});
			}
			if (this.props.imgType === 'event') {
				// console.log('the img dispatch to trigger is ', this.props.imgType);
				sending.itemId = this.user.id;
				this.setState({ showProgressModal: !this.state.showProgressModal });
				this.props.Event_changeImg(sending);
				this.setState({});
			}

			// else {
			// 	// console.log('the img dispatch to trigger is ', this.props.imgType);
			// }
		} else {
			// console.log('group Type');
			if (this.props.imgType === 'profile') {
				// console.log('the img dispatch to trigger is ', this.props.imgType);
				sending.itemId = this.user.id;
				// console.log('sending', sending, this.user.id);
				this.setState({ showProgressModal: !this.state.showProgressModal });
				this.props.Group_Profile_changeImg(sending);
				// this.setState({});
			}
			if (this.props.imgType === 'item') {
				console.log('??????', this.props.imgType, sending);
				sending.itemId = this.user.id;
				this.setState({ showProgressModal: !this.state.showProgressModal });
				this.props.GroupItemUpdate(sending);
				this.setState({});
			}
		}
	}

	donebeforeSub(blob: any, preview: string) {
		// console.log('did it work ????', blob, preview);
		// console.log('state', this.state);
		// console.log('state', this.props);
		// var changeArr: any = blob;
		// var prevChangeArr: any = preview;
		// changeArr.push(blob);
		// prevChangeArr.push(preview);
		var delImg = this.user.imgArray[+this.state.imgIndex];
		var oldFileName = updateImgPreviewAndFileN(delImg, this.props.userId, this.props.folderType);
		var checkfordefault = oldFileName.length > 0 ? oldFileName : 'Default';
		// console.log('delImg', oldFileName, checkfordefault);
		var arrayRemovedOld = [...this.user.imgArray]; // make a separate copy of the array
		// console.log('arry to delete from', arrayRemovedOld);
		arrayRemovedOld.splice(this.props.imgIndex, 1);
		// console.log('arry', arrayRemovedOld);
		this.setState({ imgReplace: blob });
		this.setState({ imgPreview: preview });
		this.setState({ changed: true });

		console.log('???????', checkfordefault, blob, blob.name, arrayRemovedOld);
		this.changeImg(checkfordefault, blob, blob.name, arrayRemovedOld);
	}

	changeView() {
		this.setState({ showCropper: true });
	}

	render() {
		// const { user, imgIndex } = this.props;
		return (
			<>
				<IonGrid>
					<IonRow>
						{!this.state.showCropper && <img src={this.state.imgPreview} alt='broken' style={{ width: '100%' }} />}
						{this.state.showCropper && <img src={this.imgPreview} alt='broken' style={{ width: '100%' }} />}
					</IonRow>
					<IonRow>
						<IonCol style={{ width: '100px', height: '70px' }}>
							<IonButton style={{ width: '150px', height: '70px' }} color='primary' onClick={() => this.deleteImg()}>
								<IonIcon color='light' size='large' icon={trashBin} />
							</IonButton>
						</IonCol>

						{this.state.showCropper && (
							<ImageCropperComponent imgDone={(blob: any, preview: string) => this.donebeforeSub(blob, preview)} changeDisp={() => this.changeView()} editView={true} />
						)}
					</IonRow>
				</IonGrid>

				{this.state.showDeleteModal && <ConfirmDoneModal ConfirmModal={this.state.showDeleteModal} confirmModalMsg={Translate(lsInj.transDict.doneDeleteProfile)} />}

				{this.state.showProgressModal && (
					<FileUploadProgressDisplay
						ModalState={this.state.showProgressModal}
						fileUploadingName={this.props.progress.fileName}
						fileUploadProgress={this.props.progress.progress}
						isChat={false}
						type={'img'}
					/>
				)}
			</>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('ImgEditView', ownProps);

	const type = ownProps.imgType;

	const t1 = type === 'event' ? state.events.progress : undefined;
	const t2 = type === 'profile' ? state.user.progress : undefined;
	const t3 = type === 'item' ? state.item.progress : undefined;
	const t4 = type === 'donation' ? state.donations.progress : undefined;
	const t5 = type === 'profile' && ownProps.userOrGroup === 'group' ? state.groups.progress : undefined;
	// console.log('t5', t5);

	const prog = t1 !== undefined ? t1 : t2 !== undefined ? t2 : t3 !== undefined ? t3 : t4 !== undefined ? t4 : t5 !== undefined ? t5 : { progress: 0, fileName: '' };

	// console.log('prog', prog);

	return {
		progress: prog
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		User_deleteImg: (imgData: i_Redux_ActionFunc_Interface_ImgDelete) => dispatch(User_Profile_DeleteImg(imgData)),
		User_changeImg: (imgData: i_Redux_ActionFunc_Interface_ImgEdit) => dispatch(User_Profile_EditImg(imgData)),

		Item_deleteImg: (imgData: i_Redux_ActionFunc_Interface_ImgDelete) => dispatch(User_Item_DeleteImg(imgData)),
		Item_changeImg: (imgData: i_Redux_ActionFunc_Interface_ImgEdit) => dispatch(User_Item_EditImg(imgData)),

		Event_changeImg: (imgData: i_Redux_ActionFunc_Interface_ImgEdit) => dispatch(User_Event_EditImg(imgData)),
		Event_deleteImg: (imgData: i_Redux_ActionFunc_Interface_ImgDelete) => dispatch(User_Event_DeleteImg(imgData)),

		Donatation_changeImg: (imgData: i_Redux_ActionFunc_Interface_ImgEdit) => dispatch(User_Donations_EditImg(imgData)),
		Don_deleteImg: (imgData: i_Redux_ActionFunc_Interface_ImgDelete) => dispatch(User_Donations_DeleteImg(imgData)),

		GroupItemUpdate: (data: i_Redux_ActionFunc_Interface_ImgEdit) => dispatch(Group_Item_EditImg(data)),
		GroupItemDelte: (data: i_Redux_ActionFunc_Interface_ImgDelete) => dispatch(User_Group_DeleteImg(data)),

		Group_Profile_changeImg: (imgData: i_Redux_ActionFunc_Interface_ImgEdit) => dispatch(Group_EditImg(imgData)),
		Group_Profile_deleteImg: (imgData: i_Redux_ActionFunc_Interface_ImgDelete) => dispatch(Group_DeleteImg(imgData))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(ImgEditView);
