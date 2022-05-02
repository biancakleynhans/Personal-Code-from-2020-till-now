import React, { Component, Dispatch } from 'react';
import {
	IonCard,
	IonTextarea,
	IonAvatar,
	IonLabel,
	IonCardHeader,
	IonToolbar,
	IonChip,
	IonButton,
	IonCol,
	IonGrid,
	IonRow,
	IonCardContent,
	IonFab,
	IonFabButton,
	IonIcon
} from '@ionic/react';
import { TypesToFirebaseGlobals } from '../../../services/firebase/TypesToServer';
import { trashBin } from 'ionicons/icons';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import { connect } from 'react-redux';
import { i_BaseInterface_Member } from '../../../models/001UserModels';
import { i_BaseInterface_MetaData, i_BaseInterface_Post } from '../../../models/009PostToGroupModels';
import { Group_Add_Post } from '../../../services/redux/actions/GroupActions/101GroupPosts';
import FileUploadProgressDisplay from '../../../layout/Loading_Redirecting/FileUploadProgressDisplay';
import { IAppState } from '../../../services/redux/reduxModels';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';

interface iState {
	inputTextValue: string;
	imgArray: any[];
	imgArrayPreview: any[];
	videoFile: any[];
	videoFilePreview: any;
	typeOfPost: 'text' | 'video' | 'images' | 'notSet' | 'videoAndImagesAndTextAndEmoji';
	currentGroupId: string;
	userWhoPosted: i_BaseInterface_Member;
	stateMetaData: i_BaseInterface_MetaData;
	progressModalState: boolean;
}

export class CreateAGroupPost extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		const { Member, groupId, metaData } = this.props;

		this.state = {
			inputTextValue: '',
			imgArrayPreview: [],
			imgArray: [],
			videoFile: [],
			videoFilePreview: '',
			typeOfPost: 'notSet',
			currentGroupId: groupId,
			userWhoPosted: Member,
			stateMetaData: metaData,
			progressModalState: false
		};

		this.handleImageChange = this.handleImageChange.bind(this);
		this.handleVideoChange = this.handleVideoChange.bind(this);
	}

	// componentDidUpdate(prevprops: any) {
	// 	console.log('prev', prevprops, 'now', this.props);
	// }

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
				this.setState({ imgArrayPreview: arrPreview, typeOfPost: 'images' });
			};
			reader.readAsDataURL(file);
		}
	}

	handleVideoChange(e: any) {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ videoFile: Object.assign(e.target.files) });
		reader.onloadend = () => {
			this.setState({ videoFilePreview: reader.result, typeOfPost: 'video' });
		};
		reader.readAsDataURL(file);
	}

	handleTextChange(e: any) {
		// console.log('e', e.detail);
		this.setState({ inputTextValue: e.detail.value, typeOfPost: 'text' });
	}

	removeFromListImages(index: number) {
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
		if (array.length === 0) {
			this.setState({ typeOfPost: 'notSet' });
		}
	}

	removeFromListVideo() {
		this.setState({
			videoFilePreview: '',
			videoFile: [],
			typeOfPost: 'notSet'
		});
	}

	renderSelectedImages() {
		return (
			<IonGrid>
				<IonRow>
					{this.state.imgArrayPreview.length > 0 ? (
						this.state.imgArrayPreview.map((url: any, index) => {
							return (
								<IonCol size='6' key={index}>
									<IonCard color='secondary' style={{ width: '100px', height: '100px' }} button onClick={() => this.removeFromListImages(index)}>
										<IonCardContent style={{ margin: '0px', padding: '0px' }}>
											<IonFab style={{ top: '0', right: '0', zIndex: 'auto' }} vertical='top' horizontal='end' slot='fixed'>
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
		);
	}

	renderSelectedvideo() {
		return (
			<>
				<Player playsInline src={this.state.videoFilePreview} />
			</>
		);
	}

	Post() {
		// console.log('state', this.state);
		var sendData: i_BaseInterface_Post = {
			typeOfPost: this.state.typeOfPost,
			currentGroupId: this.state.currentGroupId,
			userWhoPosted: this.state.userWhoPosted,
			inputTextValue: this.state.inputTextValue,
			videoUrl: this.state.videoFile,
			imagesUrlArray: this.state.imgArray,
			postId: `${this.state.currentGroupId}-${new Date().getTime()}`,
			commentsOnPost: {},
			ts: new Date().getTime(),
			counts: {
				liked: 0,
				whoLiked: {},
				love: 0,
				whoLoved: {},
				disappointed: 0,
				whoDisappointed: {},
				funny: 0,
				whoFunny: {}
			}
		};
		// console.log('sendData', sendData);
		// this.setState({ progressModalState: true });
		this.props.post(sendData);
		this.setState({
			inputTextValue: '',
			imgArrayPreview: [],
			imgArray: [],
			videoFile: [],
			videoFilePreview: '',
			typeOfPost: 'notSet'
		});
	}

	render() {
		// console.log('state', this.state);
		const { metaData } = this.props;
		return (
			<IonCard>
				<IonToolbar>
					<IonCardHeader>{Translate(lsInj.transDict.createPost)}</IonCardHeader>
				</IonToolbar>

				<IonTextarea placeholder="What's on you mind today" autoGrow spellCheck value={this.state.inputTextValue} onIonChange={(e) => this.handleTextChange(e)} />

				{this.state.imgArrayPreview.length > 0 && this.renderSelectedImages()}
				{this.state.videoFilePreview.length > 0 && this.renderSelectedvideo()}

				<IonToolbar>
					<label htmlFor='myfile1'>
						<IonChip slot='start'>
							<IonAvatar>
								<img src={TypesToFirebaseGlobals.placeholderImg} alt='borken' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.PhotoMultiple)}</IonLabel>
						</IonChip>
					</label>
					<input id='myfile1' style={{ display: 'none' }} type='file' onChange={this.handleImageChange} multiple />

					{/* <label htmlFor='myfile2'>
						<IonChip slot='start'>
							<IonAvatar>
								<img src={TypesToFirebaseGlobals.placeholderImg} alt='borken' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.videos)}</IonLabel>
						</IonChip>
					</label>
					<input id='myfile2' style={{ display: 'none' }} type='file' onChange={this.handleVideoChange} /> */}

					{/* {this.state.videoFilePreview.length > 0 && (
						<IonChip>
							<IonIcon icon={trashBin} />
							<IonButton fill='clear' onClick={() => this.removeFromListVideo()}>
								{Translate(lsInj.transDict.removeVideo)}
							</IonButton>
						</IonChip>
					)} */}
				</IonToolbar>

				<IonButton disabled={this.state.typeOfPost === 'notSet'} expand='full' onClick={() => this.Post()}>
					{Translate(lsInj.transDict.post)}
				</IonButton>

				{this.state.progressModalState && (
					<FileUploadProgressDisplay
						type={this.state.typeOfPost}
						fileUploadingName={metaData.fileUploadingName}
						fileUploadProgress={metaData.fileUploadProgress}
						ModalState={this.state.progressModalState}
						isChat={false}

						// close={() => {
						// 	this.setState({
						// 		progressModalState: !this.state.progressModalState
						// 	});
						// }}
					/>
				)}
			</IonCard>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('CreateAGroupPost', ownProps);
	// console.log('metaData', state.groups.mediaForPosts);

	const user: i_BaseInterface_Member = {
		id: state.user.id,
		name: state.user.name,
		avatar: state.user.avatar
	};
	return {
		Member: user,
		groupId: ownProps.groupId,
		metaData: state.groups.mediaForPosts
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		post: (data: i_BaseInterface_Post) => dispatch(Group_Add_Post(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAGroupPost);
