import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonRow, IonCol, IonCard, IonCardContent, IonGrid, IonIcon, IonTextarea, IonButton } from '@ionic/react';
import { IAppState } from '../../../services/redux/ReduxModels';
import { connect } from 'react-redux';
import { i_BaseInterface_Chat } from '../../../models/008ChatModels';
import moment from 'moment';
import { sendSharp } from 'ionicons/icons';
import { SendMsgToOwner } from '../../../services/redux/actions/002ChatActions';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { setTimeout } from 'timers';

interface iState {
	inputTextValue: string;
	currentChatMsgs: any[];
}

function renderMsgsBothWays(msg: i_BaseInterface_Chat, ownerId: string) {
	if (msg.idFrom === ownerId) {
		return (
			<IonRow key={msg.ts}>
				<IonCol size='6'>
					<span style={{ opacity: 0.5, fontSize: '0.8em' }}>{moment(msg.ts).fromNow(false)}</span>
					<IonCard
						className='chatBubble_sender'
						style={{
							fontSize: '1em',
						}}>
						{msg.content.image !== undefined && msg.content.image.length > 0 && <img style={{ width: '100%', height: '70%' }} alt='broken' src={msg.content.image[0]} />}
						<IonCardContent>
							{msg.content.msgString !== undefined ? msg.content.msgString : msg.content} <br />
						</IonCardContent>
					</IonCard>
				</IonCol>
				<IonCol size='6'></IonCol>
			</IonRow>
		);
	} else {
		return (
			<IonRow key={msg.ts}>
				<IonCol size='6'></IonCol>
				<IonCol size='6'>
					<span style={{ opacity: 0.5, fontSize: '0.8em' }}>{moment(msg.ts).fromNow(false)}</span>
					<IonCard
						className='chatBubble_reciever'
						style={{
							fontSize: '1em',
						}}>
						{msg.content.image !== undefined && msg.content.image.length > 0 && <img style={{ width: '100%', height: '70%' }} alt='broken' src={msg.content.image[0]} />}

						<IonCardContent>
							{msg.content.msgString !== undefined ? msg.content.msgString : msg.content} <br />
						</IonCardContent>
					</IonCard>
				</IonCol>
			</IonRow>
		);
	}
}

export class ChatWithMichael extends Component<any, iState> {
	contentRef: HTMLIonContentElement | undefined;

	constructor(props: any) {
		super(props);

		this.state = {
			inputTextValue: '',
			// imgArray: [],
			// imgArrayPreview: null,
			currentChatMsgs: [],
		};
	}

	componentDidUpdate(prevProps: any) {
		// console.log('prevProps', prevProps.user.msgHistory);
		// console.log('props', this.props.user.msgHistory);
		if (prevProps.currentMsg !== this.props.currentMsg) {
			this.setState({
				currentChatMsgs: convertObjectToArray(this.props.currentMsg),
				// currentPeerUser: this.props.user.id,
			});
			setTimeout(() => {
				if (this.contentRef) {
					console.log('go page down called updated componentDidUpdate');
					this.contentRef.scrollToBottom();
				}
			}, 1000);
		}
	}

	onSendMsg() {
		const { ownerId, userIdToUse } = this.props;

		if (this.props.user.id === ownerId) {
			console.log('this.will be when the owner answers a user');
			var msgO = {
				ts: new Date().getTime(),
				idFrom: ownerId,
				idTo: userIdToUse,
				content: {
					msgString: this.state.inputTextValue,
				},
				id: new Date().getTime(),
			};
			console.log('msg', msgO);
			this.props.sendMsg(msgO);
			this.setState({
				inputTextValue: '',
			});
		} else {
			console.log('this is when a user asks owner a question ');
			var msgU = {
				ts: new Date().getTime(),
				idFrom: userIdToUse,
				idTo: ownerId,
				content: {
					msgString: this.state.inputTextValue,
				},
				id: new Date().getTime(),
			};
			console.log('msg', msgU);
			this.props.sendMsg(msgU);
			this.setState({
				inputTextValue: '',
			});
		}
	}

	setText(e: any) {
		// console.log('added text', e.detail.value);
		this.setState({ inputTextValue: e.detail.value });
	}

	renderMsgs() {
		const { ownerId } = this.props;
		var chatArr: any[] = [];
		if (this.state.currentChatMsgs.length > 0) {
			this.state.currentChatMsgs.map((msg: i_BaseInterface_Chat) => {
				// console.log('msg', msg);
				chatArr.push(<React.Fragment key={msg.ts}>{renderMsgsBothWays(msg, ownerId)}</React.Fragment>);
				return chatArr;
			});

			return chatArr;
		}
		setTimeout(() => {
			if (this.contentRef) {
				console.log('go page down called render msg renderMsgs');
				this.contentRef.scrollToBottom();
			}
		}, 2400);
		return <IonGrid>{chatArr}</IonGrid>;
	}

	render() {
		return (
			<IonPage>
				<IonContent
					class='scroll-content'
					scrollEvents={true}
					ref={(r) => {
						if (r) {
							this.contentRef = r;
						}
					}}>
					{this.renderMsgs()}
				</IonContent>

				{/* <IonFooter class='footer'> */}
				{/* <IonToolbar class='footerSections'> */}
				<div className='containerFooter'>
					<div className='inputConatiner'>
						<IonTextarea
							class='placeholdertext inputMessage inputBg'
							autoGrow
							placeholder='Type a message'
							value={this.state.inputTextValue}
							onIonChange={(e) => this.setText(e)}
							padding-start
						/>
					</div>
					<div className='send-button-parent'>
						<IonButton fill='clear' class='sendBtn' color='light' onClick={() => this.onSendMsg()}>
							<IonIcon icon={sendSharp} class='sendBtn-icon' color='light' />
						</IonButton>
					</div>
				</div>
				{/* </IonToolbar> */}
				{/* </IonFooter> */}
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, OwnProps: any) => {
	const checkedForWHO = OwnProps.match.params.userId !== undefined ? 'owner' : 'user';
	const userId = checkedForWHO === 'owner' ? OwnProps.match.params.userId : state.user.id;
	const msgs = checkedForWHO === 'owner' ? state.user.msgHistory[userId] : state.user.msgHistory[state.owner.owner.id];

	// console.log('OwnProps', OwnProps.match.params.userId);
	// console.log('userId', userId);
	// console.log('checkedForWHO', checkedForWHO);
	// console.log('user msgHist', state.user.msgHistory);
	// console.log('userId Msgs', state.user.msgHistory[userId]);
	// console.log('msgs', msgs);

	return {
		user: state.user,
		ownerId: state.owner.owner.id,
		currentMsg: msgs,
		checkedForWHO: checkedForWHO,
		userIdToUse: userId,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		sendMsg: (msgData: any) => dispatch(SendMsgToOwner(msgData)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWithMichael);

// ADDING IMAGES

// handleImageChange(e: any) {
// 	e.preventDefault();
// 	var arr: any[] = [];

// 	for (let i = 0; i < e.target.files.length; i++) {
// 		let reader = new FileReader();
// 		let file = e.target.files[i];
// 		arr = Object.assign(e.target.files);
// 		// console.log('arr imgArray', arr);
// 		this.setState({ imgArray: arr });

// 		reader.onloadend = () => {
// 			this.setState({ imgArrayPreview: reader.result });
// 		};
// 		reader.readAsDataURL(file);
// 	}
// }

// removeFromListImages() {
// 	this.setState({ imgArrayPreview: null, imgArray: [] });
// 	// var arrayPreview = [...this.state.imgArrayPreview]; // make a separate copy of the array
// 	// if (index !== -1) {
// 	// 	arrayPreview.splice(index, 1);
// 	// 	this.setState({ imgArrayPreview: arrayPreview });
// 	// }
// 	// var array = [...this.state.imgArray]; // make a separate copy of the array
// 	// if (index !== -1) {
// 	// 	array.splice(index, 1);
// 	// 	// console.log('arry', array);
// 	// 	this.setState({ imgArray: array });
// 	// }
// }

// renderSelectedImages() {
// 	return (
// 		<IonGrid>
// 			<IonRow>
// 				{this.state.imgArrayPreview !== null ? (
// 					<IonCol size='6' key={this.state.imgArrayPreview}>
// 						<IonCard color='secondary' style={{ width: '100px', height: '100px' }} button onClick={() => this.removeFromListImages()}>
// 							<IonCardContent style={{ margin: '0px', padding: '0px' }}>
// 								<IonFab vertical='top' horizontal='end' slot='fixed'>
// 									<IonFabButton size='small'>
// 										<IonIcon icon={trashBin} />
// 									</IonFabButton>
// 								</IonFab>
// 							</IonCardContent>
// 							<img src={this.state.imgArrayPreview} alt='broken' style={{ width: '100px', height: '100px' }} />
// 						</IonCard>
// 					</IonCol>
// 				) : (
// 					<></>
// 				)}
// 			</IonRow>
// 		</IonGrid>
// 	);
// }

/* {this.renderSelectedImages()} */

/* <label htmlFor='myfile1'>
								<div className='send-button-parent'>
									<IonIcon icon={add} class='sendBtn-icon' color='light' />
								</div>
							</label>
							<input id='myfile1' style={{ display: 'none' }} type='file' onChange={this.handleImageChange} /> */
