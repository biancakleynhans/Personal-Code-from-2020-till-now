import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonTextarea,
	IonButton,
	IonIcon,
	IonFooter,
	IonItem,
	IonLabel,
	IonAvatar,
	IonCard,
	IonCardHeader,
	IonCardContent,
	IonGrid,
	IonRow,
	IonCol,
	IonFab,
	IonFabButton,
	IonPopover,
	IonCardTitle,
	IonRefresher,
	IonRefresherContent
} from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/reduxModels';
import { send, arrowUndoOutline, videocam, trashBin, images } from 'ionicons/icons';
import { Post_A_FAQ, Post_A_FAQ_Answer, Post_A_FAQ_IMG, Post_A_FAQ_VIDEO, Post_A_FAQ_DISP } from '../../../models/010SupportModels';
import { AddFAQ, AddFAQ_Answer, AddFAQ_IMG, AddFAQ_VIDEO, RemoveFAQ, RemoveFAQ_Ans } from '../../../services/redux/actions/userActions/008SupportActions';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import moment from 'moment';
import { NamedDict } from '../../../services/helpers/Tools';
import FileUploadProgressDisplay from '../../../layout/Loading_Redirecting/FileUploadProgressDisplay';
import { Player } from 'video-react';
import { Global_GetAllData_AtStartUp } from '../../../services/redux/actions/GlobalAction';

interface iState {
	inputTextValue: string;
	searchText: string;
	showQ_A_TxtBox: boolean;
	Q_A_txt: string;
	imgArrayPreview: any[];
	imgArray: any[];
	vidArrayPreview: any[];
	vidArray: any[];
	showModal: boolean;
	showPopover: boolean;
	bigurl: string;
	currentPostAns: string;
	Q_A: Post_A_FAQ_DISP[];
}

class SupportPage extends Component<any, iState> {
	refresherRef: HTMLIonRefresherElement | undefined;
	constructor(props: any) {
		super(props);
		this.state = {
			inputTextValue: '',
			searchText: '',
			showQ_A_TxtBox: false,
			Q_A_txt: '',
			imgArrayPreview: [],
			imgArray: [],
			vidArrayPreview: [],
			vidArray: [],
			showModal: false,
			showPopover: false,
			bigurl: '',
			currentPostAns: '',
			Q_A: convertObjectToArray(this.props.Q_A).sort((a, b) => Number(b.ts) - Number(a.ts))
		};

		this.handleImageChange = this.handleImageChange.bind(this);
		this.removeFromList = this.removeFromList.bind(this);
		this.handleVideoChange = this.handleVideoChange.bind(this);
		this.removeFromListVideo = this.removeFromListVideo.bind(this);
	}

	componentDidUpdate(prevProps: any) {
		if (this.props.Q_A !== prevProps.Q_A) {
			var change = convertObjectToArray(this.props.Q_A).sort((a, b) => Number(b.ts) - Number(a.ts));
			this.setState({ Q_A: change });
		}
	}

	handleTextChange(e: any) {
		this.setState({ inputTextValue: e.detail.value });
	}

	setSearchText(e: any) {
		this.setState({ searchText: e.detail.value });
	}

	handleTextChangeQA(e: any) {
		this.setState({ Q_A_txt: e.detail.value });
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

	handleVideoChange(e: any) {
		e.preventDefault();
		var arrPreview: any[] = [];
		var arr: any[] = [];

		for (let i = 0; i < e.target.files.length; i++) {
			let reader = new FileReader();
			let file = e.target.files[i];
			arr = Object.assign(e.target.files);
			// console.log('arr imgArray', arr);
			this.setState({ vidArray: arr });
			reader.onloadend = () => {
				arrPreview.push(reader.result);
				// console.log('arrPreview, imgArrayPreview', arrPreview);
				this.setState({ vidArrayPreview: arrPreview });
			};
			reader.readAsDataURL(file);
		}
	}

	removeFromListVideo(index: number) {
		var arrayPreview = [...this.state.vidArrayPreview]; // make a separate copy of the array
		if (index !== -1) {
			arrayPreview.splice(index, 1);
			this.setState({ vidArrayPreview: arrayPreview });
		}
		var array = [...this.state.imgArray]; // make a separate copy of the array
		if (index !== -1) {
			array.splice(index, 1);
			// console.log('arry', array);
			this.setState({ vidArray: array });
		}
	}

	PostQ_A() {
		const { currentUser } = this.props;
		// console.log('PostQ_A', this.state.inputTextValue);
		var post: Post_A_FAQ = {
			ts: new Date().getTime(),
			id: `${currentUser.id}-${new Date().getTime()}-FAQ`,
			userWhoFAQ: {
				id: currentUser.id,
				name: currentUser.name,
				avatar: currentUser.avatar
			},
			type: 'text',
			content: this.state.inputTextValue,
			answers: {}
		};

		this.props.postFAQ(post);
		this.setState({ inputTextValue: '' });
	}

	PostQ_A_IMG() {
		const { currentUser } = this.props;
		var post: Post_A_FAQ_IMG = {
			ts: new Date().getTime(),
			id: `${currentUser.id}-${new Date().getTime()}-FAQ`,
			userWhoFAQ: {
				id: currentUser.id,
				name: currentUser.name,
				avatar: currentUser.avatar
			},
			type: 'img',
			content: this.state.imgArray,
			answers: {}
		};

		this.setState({ showModal: true });
		this.props.postFAQ_IMG(post);
		this.setState({ imgArray: [], imgArrayPreview: [] });
	}

	PostQ_A_VIDEO() {
		const { currentUser } = this.props;
		this.setState({ showModal: true });
		var post: Post_A_FAQ_IMG = {
			ts: new Date().getTime(),
			id: `${currentUser.id}-${new Date().getTime()}-FAQ`,
			userWhoFAQ: {
				id: currentUser.id,
				name: currentUser.name,
				avatar: currentUser.avatar
			},
			type: 'video',
			content: this.state.vidArray,
			answers: {}
		};

		this.props.postFAQ_VIDEO(post);
		this.setState({ vidArray: [], vidArrayPreview: [] });
		this.forceUpdate();
	}

	deleteFaq(id: string, userWhoPostedId: string) {
		const { currentUser } = this.props;
		if (currentUser.id === userWhoPostedId) {
			// console.log('delete faq with id : ', id);
			// this.props.removeFAQ_POST(id);
			// this.forceUpdate();
		}
	}

	deleteFAQAnswer(id: string, postBelongToId: string, userWhoPostedId: string) {
		const { currentUser } = this.props;
		if (currentUser.id === userWhoPostedId) {
			// console.log('delete faq anser with id: ', postBelongToId, id);
			var deleter = {
				idOfPost: postBelongToId,
				idOfAns: id
			};
			this.props.removeFAQ_POST_ANSW(deleter);
			this.forceUpdate();
		}
	}

	ShowAnswerFAQ(id: string) {
		this.setState({ showQ_A_TxtBox: !this.state.showQ_A_TxtBox, currentPostAns: id });
	}

	PostAnswerFAQ(Q_A_id: string) {
		// console.log('Q_A_id', Q_A_id);
		const { currentUser } = this.props;

		// const PostedQ_A = Q_A[Q_A_id];
		// console.log('PostedQ_A', PostedQ_A);

		const AnserTOFAQ: Post_A_FAQ_Answer = {
			id: new Date().getTime().toString(),
			ts: new Date().getTime(),
			content: this.state.Q_A_txt,
			Post_Id_I_BelongTo: Q_A_id,
			userWhoAnswered: {
				id: currentUser.id,
				name: currentUser.name,
				avatar: currentUser.avatar
			}
		};

		this.props.postFAQ_ANSWER(AnserTOFAQ);
		this.setState({ showQ_A_TxtBox: !this.state.showQ_A_TxtBox, Q_A_txt: '' });
	}

	showBig(url: string) {
		this.setState({ showPopover: true, bigurl: url });
	}

	renderQ_AList() {
		// console.log('Q_A', Q_A);
		var returnArr: any[] = [];

		this.state.Q_A.forEach((qa: Post_A_FAQ_DISP, index: number) => {
			if (qa.type === 'text') {
				returnArr.push(
					<IonCard color='tertiary' key={qa.ts}>
						<IonCardHeader>
							<IonItem lines='none'>
								<IonAvatar slot='start'>
									<img src={qa.userWhoFAQ.avatar} alt='brokjen' />
								</IonAvatar>
								<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap' }}>
									{qa.userWhoFAQ.name} <br />
									<span
										style={{
											opacity: 0.5,
											fontSize: '0.8em',
											flex: '0 0 100%'
										}}>
										{moment(qa.ts).utcOffset('+0200').format('ll')} {moment(qa.ts).utcOffset('+0200').format('HH:mm')}
									</span>
								</IonLabel>

								<IonButton slot='end' fill='clear' onClick={() => this.ShowAnswerFAQ(qa.id)}>
									<IonIcon icon={arrowUndoOutline} />
								</IonButton>

								<IonButton slot='end' fill='clear' onClick={() => this.deleteFaq(qa.id, qa.userWhoFAQ.id)}>
									<IonIcon icon={trashBin} />
								</IonButton>
							</IonItem>
						</IonCardHeader>

						<IonCardContent style={{ textAlign: 'left' }}>
							{qa.content}
							<br />
						</IonCardContent>

						{this.renderAnwerstoQ_A(qa.answers)}
					</IonCard>
				);
			}
			if (qa.type === 'img') {
				returnArr.push(
					<IonCard color='tertiary' key={qa.ts}>
						<IonCardHeader>
							<IonItem lines='none'>
								<IonAvatar slot='start'>
									<img src={qa.userWhoFAQ.avatar} alt='brokjen' />
								</IonAvatar>
								<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap' }}>
									{qa.userWhoFAQ.name} <br />
									<span
										style={{
											opacity: 0.5,
											fontSize: '0.8em',
											flex: '0 0 100%'
										}}>
										{moment(qa.ts).utcOffset('+0200').format('ll')} {moment(qa.ts).utcOffset('+0200').format('HH:mm')}
									</span>
								</IonLabel>

								<IonButton slot='end' fill='clear' onClick={() => this.ShowAnswerFAQ(qa.id)}>
									<IonIcon icon={arrowUndoOutline} />
								</IonButton>

								<IonButton slot='end' fill='clear' onClick={() => this.deleteFaq(qa.id, qa.userWhoFAQ.id)}>
									<IonIcon icon={trashBin} />
								</IonButton>
							</IonItem>
						</IonCardHeader>

						<IonCardContent style={{ padding: '0px', margin: '0px' }}>
							<IonGrid>
								<IonRow>
									{qa.content.length > 0 &&
										qa.content.map((url: string, index: number) => {
											return (
												<IonCol size='4' key={index}>
													<IonCard style={{ width: '75px', height: '75px' }} button onClick={() => this.showBig(url)}>
														<img style={{ width: '75px', height: '75px' }} src={url} alt='broken' />;
													</IonCard>
												</IonCol>
											);
										})}
									<br />
								</IonRow>
							</IonGrid>
						</IonCardContent>

						{/* {this.state.showQ_A_TxtBox && (
								<IonFooter>
									<IonToolbar style={{ padding: '5px' }}>
										<IonTextarea autoGrow className='inputWhatsapp' value={this.state.Q_A_txt} placeholder='Type a question' onIonChange={(e) => this.handleTextChangeQA(e)} />

										<IonIcon slot='end' style={{ width: '25px', height: '25px' }} icon={send} onClick={() => this.PostAnswerFAQ(qa.id)} />
									</IonToolbar>
								</IonFooter>
							)} */}

						{this.renderAnwerstoQ_A(qa.answers)}
					</IonCard>
				);
			}
			if (qa.type === 'video') {
				returnArr.push(
					<IonCard color='tertiary' key={qa.ts}>
						<IonCardHeader>
							<IonItem lines='none'>
								<IonAvatar slot='start'>
									<img src={qa.userWhoFAQ.avatar} alt='brokjen' />
								</IonAvatar>
								<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap' }}>
									{qa.userWhoFAQ.name} <br />
									<span
										style={{
											opacity: 0.5,
											fontSize: '0.8em',
											flex: '0 0 100%'
										}}>
										{moment(qa.ts).utcOffset('+0200').format('ll')} {moment(qa.ts).utcOffset('+0200').format('HH:mm')}
									</span>
								</IonLabel>

								<IonButton slot='end' fill='clear' onClick={() => this.ShowAnswerFAQ(qa.id)}>
									<IonIcon icon={arrowUndoOutline} />
								</IonButton>

								<IonButton slot='end' fill='clear' onClick={() => this.deleteFaq(qa.id, qa.userWhoFAQ.id)}>
									<IonIcon icon={trashBin} />
								</IonButton>
							</IonItem>
						</IonCardHeader>

						<IonCardContent>
							{qa.content.length > 0 &&
								qa.content.map((url: string, index: number) => {
									return (
										<React.Fragment key={index}>
											<Player>
												<source src={url} />
											</Player>
										</React.Fragment>
									);
								})}
							<br />
						</IonCardContent>

						{/* {this.state.showQ_A_TxtBox && (
								<IonFooter>
									<IonToolbar style={{ padding: '5px' }}>
										<IonTextarea autoGrow className='inputWhatsapp' value={this.state.Q_A_txt} placeholder='Type a question' onIonChange={(e) => this.handleTextChangeQA(e)} />

										<IonIcon slot='end' style={{ width: '25px', height: '25px' }} icon={send} onClick={() => this.PostAnswerFAQ(qa.id)} />
									</IonToolbar>
								</IonFooter>
							)} */}

						{this.renderAnwerstoQ_A(qa.answers)}
					</IonCard>
				);
			}
		});
		return returnArr;
	}

	renderAnwerstoQ_A(answers: NamedDict<Post_A_FAQ_Answer>) {
		// console.log('answers', answers);
		const returnArr: any[] = [];

		convertObjectToArray(answers)
			.sort((a, b) => Number(b.ts) - Number(a.ts))
			.forEach((ans: Post_A_FAQ_Answer, index) => {
				returnArr.push(
					<IonCard key={index}>
						<IonCardHeader>
							<IonItem lines='none'>
								<IonAvatar slot='start'>
									<img src={ans.userWhoAnswered.avatar} alt='brokjen' />
								</IonAvatar>
								<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap' }}>
									{ans.userWhoAnswered.name} <br />
									<span
										style={{
											opacity: 0.5,
											fontSize: '0.8em',
											flex: '0 0 100%'
										}}>
										{moment(ans.ts).utcOffset('+0200').format('ll')} {moment(ans.ts).utcOffset('+0200').format('HH:mm')}
									</span>
								</IonLabel>

								<IonButton slot='end' fill='clear' onClick={() => this.deleteFAQAnswer(ans.id, ans.Post_Id_I_BelongTo, ans.userWhoAnswered.id)}>
									<IonIcon icon={trashBin} />
								</IonButton>
							</IonItem>
						</IonCardHeader>

						<IonCardContent style={{ textAlign: 'left' }}>
							{ans.content}
							<br />
						</IonCardContent>
					</IonCard>
				);

				return returnArr;
			});

		return returnArr;
	}

	doRefresh() {
		// console.log('Begin async operation', event);
		// setTimeout(() => {
		const { currentUser, getAlldata } = this.props;
		// console.log('Async operation has ended');
		// console.log('Doing the update call');
		getAlldata(currentUser.id, true);
		// event.detail.complete();
		if (this.refresherRef) {
			// this.refresherRef.current!.complete();
			this.refresherRef.complete();
		}
		// }, 2000);
		// clearTimeout();
	}

	render() {
		const { prog } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonRefresher
						style={{ zIndex: 10000000 }}
						slot='fixed'
						closeDuration='9000ms'
						snapbackDuration='10ms'
						pullFactor={2}
						ref={(r) => {
							if (r) {
								this.refresherRef = r;
							}
						}}
						onIonRefresh={() => this.doRefresh()}>
						<IonRefresherContent pullingIcon='bubbles' refreshingSpinner='bubbles' />
					</IonRefresher>
					<IonHeader slot='fixed'>
						<PageHeader
							backBtn
							titleString={Translate(lsInj.transDict.Support)}
							refreshBtn={true}
							refreshFunc={() => {
								this.doRefresh();
							}}
						/>
					</IonHeader>
					<br />
					<br />
					<br />
					{/* <IonSearchbar
						value={this.state.searchText}
						onIonChange={(e) => this.setSearchText(e)}
						animated></IonSearchbar> */}

					<IonToolbar>
						<span
							style={{
								opacity: 0.5,
								fontSize: '1em',
								flex: '0 0 100%',
								overflow: 'visible'
							}}>
							{Translate(lsInj.transDict.SupportHeader)}
						</span>
					</IonToolbar>
					<br />
					<br />
					<IonFooter>
						<IonToolbar style={{ padding: '5px' }}>
							<IonItem lines='none'>
								<IonTextarea autoGrow value={this.state.inputTextValue} placeholder={Translate(lsInj.transDict.typeQ)} onIonChange={(e) => this.handleTextChange(e)} />
								<IonIcon slot='end' style={{ width: '25px', height: '25px', padding: '0px 0px 0px' }} icon={send} onClick={() => this.PostQ_A()} />
							</IonItem>

							{/* IMAGES UPLOAD  */}
							<IonItem lines='none'>
								<IonLabel>{Translate(lsInj.transDict.uploadimg)} </IonLabel>
								<label style={{ padding: '0px 20px 0px' }} htmlFor='myfile1'>
									<IonIcon icon={images} size='large' />
								</label>
								<IonIcon slot='end' style={{ width: '25px', height: '25px', padding: '0px 0px 0px' }} icon={send} onClick={() => this.PostQ_A_IMG()} />
								<input id='myfile1' style={{ display: 'none' }} type='file' multiple onChange={this.handleImageChange} />
							</IonItem>

							{/* IMAGES PREVIEW  */}
							<IonGrid>
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
								</IonRow>
							</IonGrid>

							{/* VIDEO UPLOAD */}

							<IonItem lines='none'>
								<IonLabel>{Translate(lsInj.transDict.videoUpload)}</IonLabel>
								<label style={{ padding: '0px 20px 0px' }} htmlFor='myfile2'>
									<IonIcon icon={videocam} size='large' />
								</label>
								<IonIcon slot='end' style={{ width: '25px', height: '25px', padding: '0px 0px 0px' }} icon={send} onClick={() => this.PostQ_A_VIDEO()} />
								<input id='myfile2' style={{ display: 'none' }} type='file' multiple onChange={this.handleVideoChange} />
							</IonItem>

							{/* VIDEO PREVIEW */}

							<IonGrid>
								<IonRow>
									{this.state.vidArrayPreview.length > 0 &&
										this.state.vidArrayPreview.map((url: any, index) => {
											return (
												<IonCol key={index}>
													<IonCard color='secondary' style={{ width: '150px', height: '150px' }} button onClick={() => this.removeFromListVideo(index)}>
														<IonCardContent style={{ margin: '0px', padding: '0px' }}>
															<IonFab vertical='top' horizontal='end' slot='fixed'>
																<IonFabButton size='small'>
																	<IonIcon icon={trashBin} />
																</IonFabButton>
															</IonFab>
														</IonCardContent>
														{/* <img src={url} alt='broken' style={{ width: '100px', height: '100px' }} /> */}
														<video width='150px' height='150px'>
															<source src={url} type='video/mp4' />
															Your browser does not support the video tag.
														</video>
													</IonCard>
												</IonCol>
											);
										})}
								</IonRow>
							</IonGrid>
						</IonToolbar>
					</IonFooter>
					<br />
					<br />
					<IonTitle>{Translate(lsInj.transDict.faq)}</IonTitle>

					{/* FILE UPLOAD PROGRESS */}
					<FileUploadProgressDisplay
						isSupport={true}
						supportFunc={() => this.setState({ showModal: false })}
						ModalState={this.state.showModal}
						fileUploadProgress={prog.progress}
						fileUploadingName={prog.fileName}
						type='img'
					/>
					{this.renderQ_AList()}
					{this.state.showPopover && (
						<IonPopover cssClass='my-custom-class' isOpen={this.state.showPopover} backdropDismiss={true} onDidDismiss={(e) => this.setState({ showPopover: false })}>
							<IonCard>
								<img src={this.state.bigurl} alt='broken' />
							</IonCard>
						</IonPopover>
					)}

					{this.state.showQ_A_TxtBox && (
						<IonPopover cssClass='my-custom-class2' isOpen={this.state.showQ_A_TxtBox} backdropDismiss={true} onDidDismiss={(e) => this.setState({ showQ_A_TxtBox: false })}>
							<IonCard>
								<IonCardTitle>{Translate(lsInj.transDict.qAns)}</IonCardTitle>
								<IonFooter>
									<IonToolbar style={{ padding: '5px' }}>
										<IonTextarea autoGrow className='inputWhatsapp' value={this.state.Q_A_txt} placeholder='Type a answer' onIonChange={(e) => this.handleTextChangeQA(e)} />

										<IonIcon slot='end' style={{ width: '25px', height: '25px' }} icon={send} onClick={() => this.PostAnswerFAQ(this.state.currentPostAns)} />
									</IonToolbar>
								</IonFooter>
							</IonCard>
						</IonPopover>
					)}
					<br />
					<br />
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		currentUser: state.user,
		Q_A: state.support.Q_A,
		docs: state.support.supportDocs,
		prog: state.support.progress
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		postFAQ: (FAQ_DATA: Post_A_FAQ) => dispatch(AddFAQ(FAQ_DATA)),
		postFAQ_IMG: (FAQ_DATA_IMG: Post_A_FAQ_IMG) => dispatch(AddFAQ_IMG(FAQ_DATA_IMG)),
		postFAQ_VIDEO: (FAQ_DATA_VIDEO: Post_A_FAQ_VIDEO) => dispatch(AddFAQ_VIDEO(FAQ_DATA_VIDEO)),
		postFAQ_ANSWER: (FAQ_DATA_ANSWER: Post_A_FAQ_Answer) => dispatch(AddFAQ_Answer(FAQ_DATA_ANSWER)),
		removeFAQ_POST: (id: string) => dispatch(RemoveFAQ(id)),
		removeFAQ_POST_ANSW: (delData: { idOfPost: string; idOfAns: string }) => dispatch(RemoveFAQ_Ans(delData)),
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportPage);
