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

import { trashBin } from 'ionicons/icons';
import { connect } from 'react-redux';
import { i_BaseInterface_Member } from '../../../../models/001UserModels';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';
import FileUploadProgressDisplay from '../../../../layout/Loading_Redirecting/FileUploadProgressDisplay';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { Group_Add_Post } from '../../../../services/redux/actions/101GroupPosts';

interface iState {
	inputTextValue: string;
	showStickers: boolean;
	imgArray: any[];
	imgArrayPreview: any[];
	typeOfPost: 'text' | 'images' | 'notSet';
	userWhoPosted: i_BaseInterface_Member;
	stateMetaData: any;
	progressModalState: boolean;
}

class CreateAGroupPost extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		const { Member, metaData } = this.props;
		this.state = {
			inputTextValue: '',
			showStickers: false,
			imgArrayPreview: [],
			imgArray: [],
			typeOfPost: 'notSet',
			userWhoPosted: Member,
			stateMetaData: metaData,
			progressModalState: false
		};

		this.handleImageChange = this.handleImageChange.bind(this);
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
				this.setState({ imgArrayPreview: arrPreview, typeOfPost: 'images' });
			};
			reader.readAsDataURL(file);
		}
	}

	handleTextChange(e: any) {
		// console.log('e', e.detail);
		if (this.state.typeOfPost === 'images') {
			this.setState({ inputTextValue: e.detail.value, typeOfPost: 'images' });
		} else {
			this.setState({ inputTextValue: e.detail.value, typeOfPost: 'text' });
		}
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

	renderSelectedImages() {
		return (
			<IonGrid>
				<IonRow>
					{this.state.imgArrayPreview.length > 0 ? (
						this.state.imgArrayPreview.map((url: any, index) => {
							return (
								<IonCol size='6' key={url}>
									<IonCard color='secondary' style={{ color: 'var(--ion-text-color)', width: '100px', height: '100px' }} button onClick={() => this.removeFromListImages(index)}>
										<IonCardContent style={{ color: 'var(--ion-text-color)', margin: '0px', padding: '0px' }}>
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
		);
	}

	Post() {
		// console.log('state', this.state);
		var sendData = {
			typeOfPost: this.state.typeOfPost,
			userWhoPosted: this.state.userWhoPosted,
			inputTextValue: this.state.inputTextValue,
			imagesUrlArray: this.state.imgArray,
			postId: `${new Date().getTime()}`,
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
		console.log('sendData', sendData);
		this.setState({ progressModalState: true });
		this.props.post(sendData);
		setTimeout(() => {
			this.setState({
				inputTextValue: '',
				imgArrayPreview: [],
				imgArray: [],
				typeOfPost: 'notSet',
				progressModalState: false
			});
		}, 2400);
	}

	render() {
		// console.log('state', this.state);
		const { metaData } = this.props;

		return (
			<IonCard style={{ color: 'var(--ion-text-color)' }}>
				<IonToolbar>
					<IonCardHeader style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.createPost)}</IonCardHeader>
				</IonToolbar>

				<IonTextarea placeholder="What's on you mind today" autoGrow spellCheck value={this.state.inputTextValue} onIonChange={(e) => this.handleTextChange(e)} />

				{this.state.imgArrayPreview.length > 0 && this.renderSelectedImages()}

				<IonToolbar>
					<label htmlFor='myfile1'>
						<IonChip slot='start'>
							<IonAvatar>
								<img src={TypesToFirebaseGlobals.placeholderImg} alt='borken' />
							</IonAvatar>
							<IonLabel>Foto's</IonLabel>
						</IonChip>
					</label>
					<input id='myfile1' style={{ display: 'none' }} type='file' onChange={this.handleImageChange} multiple />
				</IonToolbar>
				<IonButton disabled={this.state.typeOfPost === 'notSet'} expand='full' onClick={() => this.Post()}>
					{Translate(lsInj.transDict.post)}
				</IonButton>

				{this.state.progressModalState && (
					<FileUploadProgressDisplay
						type={this.state.typeOfPost}
						fileUploadingName={metaData.name}
						fileUploadProgress={metaData.progress}
						ModalState={this.state.progressModalState}
						hide={true}
					/>
				)}
			</IonCard>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	const user: i_BaseInterface_Member = {
		id: state.user.id,
		name: state.user.name,
		avatar: state.user.avatar
	};
	console.log('metaData', state.user.avatar);
	return {
		Member: user,
		metaData: state.user.progress
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		post: (postData: any) => dispatch(Group_Add_Post(postData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAGroupPost);
