import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonFooter,
	IonToolbar,
	IonIcon,
	IonAvatar,
	IonLabel,
	IonItem,
	IonTextarea,
	IonGrid,
	IonRow,
	IonCol,
	IonCard,
	IonCardContent,
	IonFab,
	IonFabButton,
	IonButton,
	IonRefresher,
	IonRefresherContent,
	IonButtons,
	IonSpinner
} from '@ionic/react';
import { trashBin, imageOutline, send, chevronDownOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import { iSendMsgModel, i_BaseInterface_Chat } from '../../models/008ChatModels';
import moment from 'moment';
import { User_SendMessageFromChatApp, User_DeleteMessageFromChatApp } from '../../services/redux/actions/userActions/007UserChats';
import { IAppState } from '../../services/redux/reduxModels';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { FakeUser } from './FakeUser';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import { Global_GetAllData_AtStartUp } from '../../services/redux/actions/GlobalAction';

interface iState {
	inputTextValue: string;
	imgArray: any[];
	imgArrayPreview: any[];
	showmodal: boolean;
}

export interface iDeleteChatMsg {
	path1: {
		userId: string;
		chatwith: string;
		chat: string | undefined;
	};
	path2: {
		userId: string;
		chatwith: string;
		chat: string | undefined;
	};
}

export class ChatBox extends Component<any, iState> {
	contentRef: HTMLIonContentElement | undefined;
	refresherRef: HTMLIonRefresherElement | undefined;

	constructor(props: any) {
		super(props);
		this.state = {
			inputTextValue: '',
			imgArray: [],
			imgArrayPreview: [],
			showmodal: false
		};
		this.handleImageChange = this.handleImageChange.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			if (this.contentRef) {
				// console.log('go page down called mounted');
				this.contentRef.scrollToBottom();
			}
		}, 1000);
	}

	onSendMsg() {
		const { currentUser, currentPeerUser, notifToken } = this.props;

		// console.log('send msg', content, value);
		// console.log('currentPeerUser', currentPeerUser.name);
		// console.log('currentUser', currentUser.name);
		// console.log('idToUse', idToUse);

		const idString = `${currentUser.id}-${currentPeerUser.id}`;
		// console.log('idString', idString);
		this.state.imgArray.length > 0 && this.setState({ showmodal: true });

		var msg: iSendMsgModel = {
			ts: new Date().getTime(),
			idFrom: currentUser.id,
			idTo: currentPeerUser.id,
			content: {
				msgString: this.state.inputTextValue,
				images: this.state.imgArray
			},
			noticationSetttings: notifToken,
			id: idString,
			itemPost: false
		};

		// console.log('msg send state', this.state);
		this.props.sendMsg(msg);
		this.setState({ inputTextValue: '', imgArray: [], imgArrayPreview: [] });
		this.forceUpdate();
	}

	setText(e: any) {
		// console.log('added text', e.detail.value);
		this.setState({ inputTextValue: e.detail.value });
	}

	deleteMsg(msgId: string) {
		const { currentUser, currentPeerUser } = this.props;
		var c = currentUser.msgHistory[currentPeerUser.id];
		var cu = currentPeerUser.msgHistory[currentUser.id];
		var splitId: string = msgId.slice(0, 6);
		var cMSG = {} as i_BaseInterface_Chat;
		var cuMSG = {} as i_BaseInterface_Chat;
		// console.log('c', c);
		// console.log('cu', cu);
		// console.log('msg id', msgId);
		// console.log('splitId', splitId);

		convertObjectToArray(c, true).forEach((cM: i_BaseInterface_Chat) => {
			if (cM.id?.startsWith(splitId)) {
				// console.log('Matched startWith cM', cM, cM.idFrom);
				cMSG = cM;
			}
		});

		convertObjectToArray(cu, true).forEach((cuM: i_BaseInterface_Chat) => {
			if (cuM.id?.startsWith(splitId)) {
				// console.log('Matched startWith cuM', cuM, cuM.idTo);
				cuMSG = cuM;
			}
		});

		if (window.confirm('Delete msg')) {
			console.log('user accepted delete of msg:', cuMSG.id, cuMSG.idTo, cMSG.id, cMSG.idFrom);
			console.log('path', `${cMSG.idFrom}/msgHistory/${cuMSG.idTo}/${cMSG.id}`);
			console.log('path2', `${cuMSG.idTo}/msgHistory/${cMSG.idFrom}/${cuMSG.id}`);

			var send: iDeleteChatMsg = {
				path1: {
					userId: cMSG.idFrom,
					chatwith: cuMSG.idTo,
					chat: cMSG.id
				},
				path2: {
					userId: cuMSG.idTo,
					chatwith: cMSG.idFrom,
					chat: cuMSG.id
				}
			};
			this.props.deleteMsg(send);
		} else {
			console.log('user did not accept delete of msg');
		}
	}

	renderMsgs() {
		const { currentUser, currentPeerUser, lang, currentChatMsgs } = this.props;
		var chatArr: any[] = [];
		// console.log('msg???', currentChatMsgs);
		if (currentChatMsgs.length > 0) {
			currentChatMsgs.map((msg: i_BaseInterface_Chat, index: number) => {
				chatArr.push(
					<React.Fragment key={index}>
						{msg.idFrom === currentUser.id && (
							<IonRow>
								<IonCol>
									<span style={{ opacity: 0.5, fontSize: '0.8em' }}>{moment(msg.ts).utcOffset('+0200').calendar()}</span>
									<IonButton
										class='message-timestamp'
										fill='clear'
										onClick={() => {
											this.deleteMsg(msg.id !== undefined ? msg.id : '');
										}}>
										<IonIcon style={{ opacity: 0.5 }} color='dark' icon={trashBin} />
									</IonButton>
									<IonCard className='chatBubble_sender'>
										{msg.content.image !== undefined && <img style={{ width: '100%', height: '50%' }} alt='broken' src={msg.content.image} />}

										{msg.content.images !== undefined &&
											msg.content.images.length > 0 &&
											msg.content.images.map((img: string, index) => {
												return (
													img.startsWith('https://firebasestorage.googleapis.com/v0/b/tauschfarm-dev.appspot.com/o/') && (
														<img key={index} style={{ width: '100%', height: '100%' }} alt='broken' src={img} />
													)
												);
											})}

										<IonCardContent>
											{msg.content.msgString !== undefined && msg.content.msgString}
											{msg.content.name !== undefined && (
												<>
													<br />
													{msg.content.name !== undefined && (
														<>
															<b>{Translate(lsInj.transDict.Name)}</b>: {msg.content.name}
														</>
													)}
													<br />
													{msg.content.size !== undefined && (
														<>
															<b>{Translate(lsInj.transDict.Size)}</b>: {lang === 'en' ? msg.content.size.en : msg.content.size.de}
														</>
													)}
													<br />
													{msg.content.brand !== undefined && (
														<>
															<b>{Translate(lsInj.transDict.Brand)}</b>: {lang === 'en' ? msg.content.brand.en : msg.content.brand.de}
														</>
													)}
													<br />
													{msg.content.color !== undefined && (
														<>
															<b>{Translate(lsInj.transDict.Color)}</b>: {msg.content.color}
														</>
													)}
												</>
											)}
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonRow>
						)}
						{msg.idTo === currentUser.id && (
							<IonRow>
								<IonCol>
									<span style={{ opacity: 0.5, fontSize: '0.8em' }}>{moment(msg.ts).utcOffset('+0200').calendar()}</span>
									<IonCard className='chatBubble_reciever'>
										{msg.content.image !== undefined && <img style={{ width: '100%', height: '50%' }} alt='broken' src={msg.content.image} />}

										{msg.content.images &&
											msg.content.images.map((img: string, index) => {
												return <img key={index} style={{ width: '100%', height: '100%' }} alt='broken' src={img} />;
											})}
										<IonCardContent>
											{msg.content.msgString !== undefined && msg.content.msgString}
											{msg.content.name !== undefined && (
												<>
													<br />
													{msg.content.name !== undefined && (
														<>
															<b>{Translate(lsInj.transDict.Name)}</b>: {msg.content.name}
														</>
													)}
													<br />
													{msg.content.size !== undefined && (
														<>
															<b>{Translate(lsInj.transDict.Size)}</b>: {lang === 'en' ? msg.content.size.en : msg.content.size.de}
														</>
													)}
													<br />
													{msg.content.brand !== undefined && (
														<>
															<b>{Translate(lsInj.transDict.Brand)}</b>: {lang === 'en' ? msg.content.brand.en : msg.content.brand.de}
														</>
													)}
													<br />
													{msg.content.color !== undefined && (
														<>
															<b>{Translate(lsInj.transDict.Color)}</b>: {msg.content.color}
														</>
													)}
												</>
											)}
											<br />
											{msg.content.name !== undefined && (
												<>
													<IonCard color='tertiary' button style={{ height: '180px', padding: '10px' }} class='ion-text-wrap' routerLink={`/user/${currentPeerUser.id}`}>
														<IonAvatar className='avatarSmall'>
															<img src={currentUser.avatar} alt='broken' />
														</IonAvatar>
														<IonCardContent>
															{currentUser.name}, {Translate(lsInj.transDict.viewMy)}
														</IonCardContent>
													</IonCard>
												</>
											)}
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonRow>
						)}
					</React.Fragment>
				);
				return chatArr;
			});
			setTimeout(() => {
				if (this.contentRef) {
					// console.log('go page down called render msg');
					this.contentRef.scrollToBottom();
				}
			}, 2400);
			return <IonGrid>{chatArr}</IonGrid>;
		} else {
			return <IonGrid></IonGrid>;
		}
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

	removeFromListImages(index: number) {
		var arrayPreview = [...this.state.imgArrayPreview]; // make a separate copy of the array
		if (index !== -1) {
			arrayPreview.splice(index, 1);
			this.setState({ imgArrayPreview: arrayPreview });
			this.forceUpdate();
		}
		var array = [...this.state.imgArray]; // make a separate copy of the array
		if (index !== -1) {
			array.splice(index, 1);
			// console.log('arry', array);
			this.setState({ imgArray: array });
			this.forceUpdate();
		}
	}

	renderSelectedImages() {
		return (
			<IonGrid>
				<IonRow>
					{this.state.imgArrayPreview.length > 0 &&
						this.state.imgArrayPreview.map((img: string, index) => {
							return (
								<IonCol size='6' key={index}>
									<IonCard color='secondary' style={{ width: '100px', height: '100px' }} button onClick={() => this.removeFromListImages(index)}>
										<IonCardContent style={{ margin: '0px', padding: '0px' }}>
											<IonFab vertical='top' horizontal='end' slot='fixed'>
												<IonFabButton size='small'>
													<IonIcon icon={trashBin} />
												</IonFabButton>
											</IonFab>
										</IonCardContent>
										<img src={img} alt='broken' style={{ width: '100px', height: '100px' }} />
									</IonCard>
								</IonCol>
							);
						})}
				</IonRow>
			</IonGrid>
		);
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
		const { currentPeerUser } = this.props;

		var windowSize = window.innerWidth;
		//console.log('windowSize', windowSize);

		return (
			<IonPage>
				<IonHeader slot='fixed'>
					<IonToolbar>
						<IonItem style={{ width: '300px', textAlign: 'left' }} routerLink={`/user/${currentPeerUser.id}`}>
							<IonAvatar style={{ padding: '3px' }}>
								<img src={currentPeerUser.avatar} alt='broken' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap'>{currentPeerUser.name}</IonLabel>
						</IonItem>
					</IonToolbar>
				</IonHeader>
				<IonContent
					class='scroll-content'
					scrollEvents={true}
					ref={(r) => {
						if (r) {
							this.contentRef = r;
						}
					}}>
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

					{/* Here i need to add the messages they send each other  */}
					{windowSize < 400 && (
						<>
							{this.renderMsgs()} <br />
							{/* {this.props.loader === 'start' && (
								<IonRow>
									<IonCol>
										<IonCard className='chatBubble_sender'>
											{this.state.imgArrayPreview[0] !== undefined && (
												// <>
												// <IonSpinner name='circles'></IonSpinner>
												<img style={{ width: '100%', height: '50%', opacity: 0.5 }} alt='broken' src={this.state.imgArrayPreview[0]} />
												// </>
											)}
										</IonCard>
									</IonCol>
								</IonRow>
							)} */}
						</>
					)}
					{windowSize > 800 && (
						<IonGrid>
							<IonRow>
								<IonCol size='4'></IonCol>
								<IonCol size='4'>{this.renderMsgs()}</IonCol>
								<IonCol size='4'></IonCol>
							</IonRow>
						</IonGrid>
					)}

					{/* {this.state.showmodal && <FileUploadProgressDisplay isChat={true} fileUploadingName={imageUploadStat.fileName} fileUploadProgress={imageUploadStat.progress} />} */}

					<IonFab style={{ width: '30px', height: '30px' }} color='primary' vertical='bottom' horizontal='end' slot='fixed'>
						<IonFabButton
							style={{ width: '30px', height: '30px' }}
							onClick={() => {
								setTimeout(() => {
									if (this.contentRef) {
										// console.log('go page down called mounted');
										this.contentRef.scrollToBottom();
									}
								}, 100);
							}}
							color='primary'>
							<IonIcon size='small' icon={chevronDownOutline}></IonIcon>
						</IonFabButton>
					</IonFab>
				</IonContent>

				<IonFooter>
					<IonToolbar>
						{this.renderSelectedImages()}
						<IonButtons slot='start'>
							<label htmlFor='myfile1'>
								<IonIcon size='large' icon={imageOutline} />
							</label>
							<input id='myfile1' style={{ display: 'none' }} type='file' onChange={this.handleImageChange} />
						</IonButtons>

						<div className='input-container'>
							<IonTextarea autoGrow value={this.state.inputTextValue} placeholder='Type a message' onIonChange={(e) => this.setText(e)} />
						</div>

						<IonButtons slot='end'>
							<IonButton onClick={() => this.onSendMsg()}>
								<IonIcon style={{ width: '25px', height: '25px', paddingTop: '11px' }} icon={send} />
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonFooter>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownprops: any) => {
	// const currentUserId = ownprops.match.params.currentUser;
	const currentPeerUserId = ownprops.match.params.currentPeerUser;
	const currentPeerUser = state.globalUsers.GlobalUsers[currentPeerUserId] !== undefined ? state.globalUsers.GlobalUsers[currentPeerUserId] : FakeUser;
	const currentUser = state.user !== undefined ? state.user : FakeUser;

	// console.log('currentPeerUser', currentPeerUser?.msgHistory);
	// console.log('currentUser', currentUser?.msgHistory[currentPeerUserId]);

	const currentchat = currentUser.msgHistory !== undefined ? (currentUser.msgHistory[currentPeerUserId] !== undefined ? currentUser.msgHistory[currentPeerUserId] : {}) : {};

	// console.log('????? why no work', currentchat, currentUser?.msgHistory[currentPeerUserId]);
	console.log('loadfing image', state.user.loader);
	return {
		currentUser: currentUser,
		currentPeerUser: currentPeerUser,
		currentChatMsgs: convertObjectToArray(currentchat, true),
		lang: state.user.lang,
		notifToken: currentPeerUser.notifyToken,
		imageUploadStat: state.user.progress,
		loader: state.user.loader
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		sendMsg: (msgContent: iSendMsgModel) => dispatch(User_SendMessageFromChatApp(msgContent)),
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty)),
		deleteMsg: (msgDel: iDeleteChatMsg) => dispatch(User_DeleteMessageFromChatApp(msgDel))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
