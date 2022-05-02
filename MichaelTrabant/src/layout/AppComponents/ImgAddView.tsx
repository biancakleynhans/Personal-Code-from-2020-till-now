import React, { Component, Dispatch } from 'react';
import { IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonFab, IonFabButton, IonIcon, IonButton, IonPage, IonContent, IonHeader } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { trashBin } from 'ionicons/icons';
import { i_Redux_ActionFunc_Interface_ImgUpload } from '../../models/007ImageModels';
import FileUploadProgressDisplay from '../Loading_Redirecting/FileUploadProgressDisplay';
import { IAppState } from '../../services/redux/ReduxModels';
import { Owner_Profile_AddImg } from '../../services/redux/actions/OwnerActions';
import { connect } from 'react-redux';
import PageHeader from '../Headers/PageHeader';

interface iState {
	imgArrayPreview: any[];
	imgArray: any[];
	bio: string;
	userArry: any[];
	showModal: boolean;
}

class ImgAddView extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			imgArrayPreview: [],
			imgArray: [],
			bio: '',
			userArry: [],
			showModal: false
		};

		this.handleImageChange = this.handleImageChange.bind(this);
		this.removeFromList = this.removeFromList.bind(this);
		this.Submit = this.Submit.bind(this);

		// console.log('Props imgViewAdd', this.props);
	}

	handleImageChange(e: any) {
		e.preventDefault();
		var arrPreview: any[] = [];
		var arr: any[] = [];

		for (let i = 0; i < e.target.files.length; i++) {
			let reader = new FileReader();
			let file = e.target.files[i];
			arr = Object.assign(e.target.files);
			// console.log('arr imgArray', arr);
			this.setState({ imgArray: arr });
			reader.onloadend = () => {
				arrPreview.push(reader.result);

				// console.log('arrPreview, imgArrayPreview', arrPreview);
				this.setState({ imgArrayPreview: arrPreview });
			};
			reader.readAsDataURL(file);
		}
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
		// console.log('Img Add View where everything should happen');
		// console.log('STATE', this.state);
		// console.log('PROPS', this.props);
		for (let i = 0; i < this.state.imgArray.length; i++) {
			var obj: i_Redux_ActionFunc_Interface_ImgUpload = {
				uID: this.props.user.id,
				file: this.state.imgArray[i],
				fileName: this.state.imgArray[i].name.replace(/\s+/g, ''),
				newArray: []
			};
			console.log('sending : ', obj);
			this.setState({
				showModal: !this.state.showModal
			});
			this.props.User_addImg(obj);
			this.setState({});
		}
	}

	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />
					<IonGrid>
						<IonRow>
							<label htmlFor='myfile1' className='uploadBtn'>
								{Translate(lsInj.transDict.Upload)}
							</label>
							<input id='myfile1' style={{ display: 'none' }} type='file' multiple onChange={this.handleImageChange} />
						</IonRow>
						<IonRow>
							{this.state.imgArrayPreview.length > 0 ? (
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
								})
							) : (
								<></>
							)}
						</IonRow>
					</IonGrid>
					{this.state.showModal && (
						<FileUploadProgressDisplay ModalState={this.state.showModal} fileUploadingName={this.props.progress.fileName} fileUploadProgress={this.props.progress.progress} />
					)}
					<IonButton onClick={() => this.Submit()}>{Translate(lsInj.transDict.Add)}</IonButton>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	const prog = state.user.progress ? state.user.progress : { progress: 0, fileName: '' };
	console.log('prog', prog);

	return {
		user: state.owner.owner,
		progress: prog
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		User_addImg: (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => dispatch(Owner_Profile_AddImg(imgData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImgAddView);
