import React, { Component, Dispatch } from 'react';
import { IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonFab, IonFabButton, IonIcon, IonButton } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { add, trashBin } from 'ionicons/icons';
import { i_Redux_ActionFunc_Interface_ImgUpload } from '../../models/007ImageModels';
import { User_Profile_AddImg } from '../../services/redux/actions/userActions/001UserActions';
import { connect } from 'react-redux';
import { User_Item_AddImg } from '../../services/redux/actions/userActions/003ItemAction';
import { User_Event_AddImg } from '../../services/redux/actions/userActions/005EventsActions';
import { Group_AddImg } from '../../services/redux/actions/userActions/006GroupsActions';
import { Group_Item_AddImg } from '../../services/redux/actions/GroupActions/103Group_ItemAction';
import { IAppState } from '../../services/redux/reduxModels';
import FileUploadProgressDisplay from '../Loading_Redirecting/FileUploadProgressDisplay';
import ImageCropperComponent from './ImageCropperComponent';
import { User_Donations_AddImg } from '../../services/redux/actions/userActions/004DonationsActions';

interface iState {
	imgArrayPreview: any[];
	imgArray: any[];
	bio: string;
	userArry: any[];
	showModal: boolean;
	showCropper: boolean;
}

class ImgAddView extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			imgArrayPreview: [],
			imgArray: [],
			bio: '',
			userArry: [],
			showModal: false,
			showCropper: true
		};

		// this.handleImageChange = this.handleImageChange.bind(this);
		this.removeFromList = this.removeFromList.bind(this);
		this.Submit = this.Submit.bind(this);

		// console.log('Props imgViewAdd', this.props);
	}

	removeFromList(index: number) {
		var arrayPreview = [...this.state.imgArrayPreview]; // make a separate copy of the array
		if (index !== -1) {
			arrayPreview.splice(index, 1);
			this.setState({ imgArrayPreview: arrayPreview });
		}
		var array = [...this.state.imgArray]; // make a separate copy of the array
		if (index !== -1) {
			array.splice(index, 1);
			// console.log('arry', array);
			this.setState({ imgArray: array });
		}
	}

	Submit() {
		console.log('SUBMIT PROPS', { props: this.props, state: this.state });

		if (this.props.userOrGroup === 'user') {
			// console.log('user Type');
			if (this.props.imgType === 'profile') {
				// console.log('the img dispatch to trigger is ', this.props.imgType);

				for (let i = 0; i < this.state.imgArray.length; i++) {
					var obj: i_Redux_ActionFunc_Interface_ImgUpload = {
						uID: this.props.user.id,
						file: this.state.imgArray[i],
						fileName: this.state.imgArray[i].name.replace(/\s+/g, '')
					};
					// console.log('sending : ', obj);
					this.setState({
						showModal: !this.state.showModal
					});
					this.props.User_addImg(obj);
					this.setState({});
				}
			}
			if (this.props.imgType === 'item') {
				console.log('the img dispatch to trigger is imgType=item ', this.props.imgType);
				for (let i = 0; i < this.state.imgArray.length; i++) {
					var objA: i_Redux_ActionFunc_Interface_ImgUpload = {
						uID: this.props.userId,
						file: this.state.imgArray[i],
						fileName: this.state.imgArray[i].name.replace(/\s+/g, '')
					};
					console.log('sending : ', objA);
					this.setState({ showModal: !this.state.showModal });
					this.props.Item_addImg(objA);
					this.setState({});
				}
			}
			if (this.props.imgType === 'don') {
				console.log('the img dispatch to trigger is imgType=item ', this.props.imgType);
				for (let i = 0; i < this.state.imgArray.length; i++) {
					var objB: i_Redux_ActionFunc_Interface_ImgUpload = {
						uID: this.props.userId,
						file: this.state.imgArray[i],
						fileName: this.state.imgArray[i].name.replace(/\s+/g, '')
					};
					// console.log('sending : ', objB);
					this.setState({ showModal: !this.state.showModal });
					this.props.Dons_addImg(objB);
					this.setState({});
				}
			}
			if (this.props.imgType === 'event') {
				// console.log('the img dispatch to trigger is ', this.props.imgType);

				for (let i = 0; i < this.state.imgArray.length; i++) {
					var objC: i_Redux_ActionFunc_Interface_ImgUpload = {
						uID: this.props.userId,
						file: this.state.imgArray[i],
						fileName: this.state.imgArray[i].name.replace(/\s+/g, '')
					};
					// console.log('sending : ', objB);
					this.setState({
						showModal: !this.state.showModal
					});
					this.props.Event_addImg(objC);

					this.setState({});
				}
			}
			// else {
			// 	// console.log('the img dispatch to trigger is ', this.props.imgType);
			// }
		} else {
			// console.log('group Type');
			if (this.props.imgType === 'profile') {
				console.log('the img dispatch to trigger is ', this.props, this.state);

				for (let i = 0; i < this.state.imgArray.length; i++) {
					var objE: i_Redux_ActionFunc_Interface_ImgUpload = {
						uID: this.props.user.id,
						file: this.state.imgArray[i],
						fileName: this.state.imgArray[i].name.replace(/\s+/g, '')
					};
					// console.log('sending : ', objE);
					this.setState({
						showModal: !this.state.showModal
					});
					this.props.Group_Profile_addImg(objE);

					this.setState({});
				}
			}
			if (this.props.imgType === 'item') {
				// console.log('the img dispatch to trigger is ', this.props.imgType);
				for (let i = 0; i < this.state.imgArray.length; i++) {
					var objD: i_Redux_ActionFunc_Interface_ImgUpload = {
						uID: this.props.userId,
						file: this.state.imgArray[i],
						fileName: this.state.imgArray[i].name.replace(/\s+/g, '')
					};
					// console.log('sending : ', objD);
					this.setState({
						showModal: !this.state.showModal
					});
					this.props.Group_Item_addImg(objD);

					this.setState({});
				}
			}
		}
	}

	donebeforeSub(blob: any, preview: string) {
		console.log('did it work ????', blob, preview);

		var changeArr: any[] = [...this.state.imgArray];
		var prevChangeArr: any[] = [...this.state.imgArrayPreview];
		changeArr.push(blob);
		prevChangeArr.push(preview);

		this.setState({ imgArray: changeArr, imgArrayPreview: prevChangeArr, showCropper: false });
	}

	changeView() {
		this.setState({ showCropper: true });
	}

	render() {
		return (
			<>
				<IonGrid>
					{this.state.showCropper && (
						<IonRow>
							<ImageCropperComponent imgDone={(blob: any, preview: string) => this.donebeforeSub(blob, preview)} changeDisp={() => this.changeView()} />
						</IonRow>
					)}

					{/* preview sqares  */}
					{!this.state.showCropper && (
						<IonRow>
							{this.state.imgArrayPreview.length > 0 &&
								this.state.imgArrayPreview.map((url: any, index) => {
									return (
										<IonCol size='4' key={index}>
											<IonCard color='secondary' style={{ width: '100px', height: '100px' }} button onClick={() => this.removeFromList(index)}>
												<IonCardContent style={{ margin: '0px', padding: '0px' }}>
													<IonFab vertical='top' horizontal='end' slot='fixed'>
														<IonFabButton size='small'>
															<IonIcon icon={trashBin} />
														</IonFabButton>
													</IonFab>
												</IonCardContent>
												<img src={url} alt='broken' style={{ width: '100px', height: '100px' }} />
											</IonCard>
										</IonCol>
									);
								})}
							<IonCard color='secondary' style={{ width: '100px', height: '100px' }} button onClick={() => this.changeView()}>
								<IonCardContent>
									<IonIcon style={{ width: '70px', height: '70px' }} icon={add} />
								</IonCardContent>
							</IonCard>
						</IonRow>
					)}
				</IonGrid>

				{/* Progress upload */}
				{this.state.showModal && (
					<FileUploadProgressDisplay
						ModalState={this.state.showModal}
						fileUploadingName={this.props.progress.fileName}
						fileUploadProgress={this.props.progress.progress}
						isChat={false}
						type={'img'}
					/>
				)}
				{/* done button */}
				{this.state.imgArray.length > 0 && <IonButton onClick={() => this.Submit()}>{Translate(lsInj.transDict.Add)}</IonButton>}
			</>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('ImgAddView ownProps', ownProps);

	const type = ownProps.imgType;

	var isTrue = ownProps.userOrGroup === 'group' && type === 'profile' ? true : false;

	const t1 = type === 'event' ? state.events.progress : undefined;
	const t2 = type === 'profile' ? state.user.progress : undefined;
	const t3 = type === 'item' ? state.item.progress : undefined;
	const t4 = type === 'don' ? state.donations.progress : undefined;
	const t5 = isTrue ? state.groups.progress : undefined;

	const prog = t1 !== undefined ? t1 : t2 !== undefined ? t2 : t3 !== undefined ? t3 : t4 !== undefined ? t4 : t5 !== undefined ? t5 : { progress: 0, fileName: '' };

	console.log('prog', prog);

	return {
		progress: prog
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		User_addImg: (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => dispatch(User_Profile_AddImg(imgData)),
		Item_addImg: (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => dispatch(User_Item_AddImg(imgData)),
		Event_addImg: (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => dispatch(User_Event_AddImg(imgData)),
		Dons_addImg: (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => dispatch(User_Donations_AddImg(imgData)),
		Group_Profile_addImg: (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => dispatch(Group_AddImg(imgData)),
		Group_Item_addImg: (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => dispatch(Group_Item_AddImg(imgData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImgAddView);
