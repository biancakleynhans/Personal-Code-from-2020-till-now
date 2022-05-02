import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { IonCard, IonGrid, IonRow, IonCol, IonCardHeader, IonItem, IonAvatar, IonLabel, IonCardContent, IonToolbar, IonButton, IonIcon, IonTextarea, IonList } from '@ionic/react';
import { thumbsUpOutline, chatboxOutline, sendSharp, trashBin } from 'ionicons/icons';
import moment from 'moment';
// import { Player } from 'video-react';
import { AnimatedEmojiConst, EmojiConst, OtherEmojiConst } from '../../../components/emoji\'s/EmojiUse';
import { i_BaseInterface_Post, AddComment } from '../../../models/009PostToGroupModels';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { Group_Add_Like, Group_Add_Comment, Group_Delete_Post } from '../../../services/redux/actions/GroupActions/101GroupPosts';
import { IAppState } from '../../../services/redux/reduxModels';
import { NamedDict } from '../../../services/helpers/Tools';
import { TypesToFirebaseGlobals } from '../../../services/firebase/TypesToServer';

interface iState {
	showOptions: boolean[];
	showComment: boolean[];
	showShareOptions: boolean;
	commentText: string;
	GroupPosts: NamedDict<i_BaseInterface_Post>;
}

class ViewGroupPosts extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		const { GroupPosts } = this.props;

		this.state = {
			showOptions: [],
			showComment: [],
			showShareOptions: false,
			commentText: '',
			GroupPosts: GroupPosts
		};
		var arr: boolean[] = [];
		convertObjectToArray(GroupPosts).map(() => {
			arr.push(false);
			this.state = {
				showOptions: arr,
				showComment: [],
				showShareOptions: false,
				commentText: '',
				GroupPosts: GroupPosts
			};
			return arr;
		});
		// console.log('state', this.state);
	}

	componentDidUpdate(prevProps: any) {
		// console.log('prevProps', prevProps.GroupPosts);
		// console.log('props', this.props.GroupPosts);
		if (prevProps.GroupPosts !== this.props.GroupPosts) {
			this.setState({ GroupPosts: this.props.GroupPosts });
			var arr: boolean[] = [];
			convertObjectToArray(this.props.GroupPosts).map(() => {
				arr.push(false);
				return arr;
			});
			this.setState({ showOptions: arr, showComment: [], showShareOptions: false, commentText: '', GroupPosts: this.props.GroupPosts });
		}
	}

	handleCommentChange(e: any) {
		// console.log('e', e.detail.value);
		this.setState({ commentText: e.detail.value });
	}

	saveComment(indexOfPost: number, postId: string) {
		// console.log('save comment', this.state.commentText);
		const { GroupPosts, currentUser } = this.props;
		var post = GroupPosts; //convertObjectToArray(GroupPosts);
		// console.log('current post ', post[indexOfPost]);

		//chnage display
		var change = this.state.showComment;
		change[indexOfPost] = !this.state.showComment[indexOfPost];
		this.setState({ showComment: change });

		var sendCom: AddComment = {
			commentId: new Date().getTime(),
			postId: post[postId].postId,
			groupId: post[postId].currentGroupId,
			whoCommented: {
				id: currentUser.id,
				name: currentUser.name,
				avatar: currentUser.avatar
			},
			contentComment: this.state.commentText,
			ts: new Date().getTime()
		};
		this.props.addComment(sendCom);
		this.setState({ commentText: '' });
		this.forceUpdate();
	}

	clickedButtonOptionInLike(type: string, indexOfPost: number, postId: string) {
		// console.log('type', type, indexOfPost);
		// console.log('index of ', this.state.showOptions[indexOfPost]);
		//chnage display
		var change = this.state.showOptions;
		change[indexOfPost] = !this.state.showOptions[indexOfPost];
		this.setState({ showOptions: change });

		//and to post const
		const { GroupPosts, currentUser } = this.props;
		var post = GroupPosts; //convertObjectToArray(GroupPosts);
		// console.log('current post ', post[indexOfPost]);

		var changedPosted: i_BaseInterface_Post = post[postId];
		// console.log('changedPosted', changedPosted);

		if (changedPosted.counts !== undefined) {
			// console.log('base is not undefined', changedPosted.counts);

			//case of like
			if (type === 'like') {
				// 	console.log('like');
				if (convertObjectToArray(changedPosted.counts.whoLiked).length > 0) {
					convertObjectToArray(changedPosted.counts.whoLiked).forEach((ls) => {
						if (ls.id !== currentUser.id) {
							// console.log('user has not already liked');
							changedPosted.counts.liked = changedPosted.counts.liked + 1;
							changedPosted.counts = {
								...changedPosted.counts,
								whoLiked: {
									...changedPosted.counts.whoLiked,
									[currentUser.id]: {
										id: currentUser.id,
										name: currentUser.name,
										avatar: currentUser.avatar
									}
								}
							};

							// console.log('CHanged Done', changedPosted.counts);
							var send = {
								change: changedPosted.counts,
								postId: changedPosted.postId,
								groupId: changedPosted.currentGroupId
							};
							this.props.addLike(send);
						}
					});
				} else {
					// console.log('base is ok but this is first like');
					changedPosted.counts.liked = changedPosted.counts.liked + 1;
					changedPosted.counts = {
						...changedPosted.counts,
						whoLiked: {
							...changedPosted.counts.whoLiked,
							[currentUser.id]: {
								id: currentUser.id,
								name: currentUser.name,
								avatar: currentUser.avatar
							}
						}
					};

					// console.log('CHanged Done', changedPosted.counts);
					var send9 = {
						change: changedPosted.counts,
						postId: changedPosted.postId,
						groupId: changedPosted.currentGroupId
					};
					this.props.addLike(send9);
					this.forceUpdate();
				}
			}
			//case of love
			else if (type === 'love') {
				// console.log('love');
				if (convertObjectToArray(changedPosted.counts.whoLoved).length > 0) {
					// eslint-disable-next-line
					convertObjectToArray(changedPosted.counts.whoLoved).map((ls) => {
						if (ls.id !== currentUser.id) {
							// console.log('user has not already loved');
							changedPosted.counts.love = changedPosted.counts.love + 1;
							changedPosted.counts = {
								...changedPosted.counts,
								whoLoved: {
									...changedPosted.counts.whoLoved,
									[currentUser.id]: {
										id: currentUser.id,
										name: currentUser.name,
										avatar: currentUser.avatar
									}
								}
							};
							// console.log('CHanged Done', changedPosted.counts);
							var send3 = {
								change: changedPosted.counts,
								postId: changedPosted.postId,
								groupId: changedPosted.currentGroupId
							};
							this.props.addLike(send3);
							this.forceUpdate();
						}
					});
				} else {
					changedPosted.counts.love = changedPosted.counts.love + 1;
					changedPosted.counts = {
						...changedPosted.counts,
						whoLoved: {
							...changedPosted.counts.whoLoved,
							[currentUser.id]: {
								id: currentUser.id,
								name: currentUser.name,
								avatar: currentUser.avatar
							}
						}
					};
					// console.log('CHanged Done', changedPosted.counts);
					var send10 = {
						change: changedPosted.counts,
						postId: changedPosted.postId,
						groupId: changedPosted.currentGroupId
					};
					this.props.addLike(send10);
					this.forceUpdate();
				}
			}
			// case of disapointed
			else if (type === 'disappointed') {
				// 	console.log('disappointed');
				if (convertObjectToArray(changedPosted.counts.whoDisappointed).length > 0) {
					// eslint-disable-next-line
					convertObjectToArray(changedPosted.counts.whoDisappointed).map((ls) => {
						if (ls.id !== currentUser.id) {
							changedPosted.counts.disappointed = changedPosted.counts.disappointed + 1;
							changedPosted.counts = {
								...changedPosted.counts,
								whoDisappointed: {
									...changedPosted.counts.whoDisappointed,
									[currentUser.id]: {
										id: currentUser.id,
										name: currentUser.name,
										avatar: currentUser.avatar
									}
								}
							};
							// console.log('CHanged Done', changedPosted.counts);
							var send5 = {
								change: changedPosted.counts,
								postId: changedPosted.postId,
								groupId: changedPosted.currentGroupId
							};
							this.props.addLike(send5);
							this.forceUpdate();
						}
					});
				} else {
					changedPosted.counts.disappointed = changedPosted.counts.disappointed + 1;
					changedPosted.counts = {
						...changedPosted.counts,
						whoDisappointed: {
							...changedPosted.counts.whoDisappointed,
							[currentUser.id]: {
								id: currentUser.id,
								name: currentUser.name,
								avatar: currentUser.avatar
							}
						}
					};
					// console.log('CHanged Done', changedPosted.counts);
					var send11 = {
						change: changedPosted.counts,
						postId: changedPosted.postId,
						groupId: changedPosted.currentGroupId
					};
					this.props.addLike(send11);
					this.forceUpdate();
				}
			}
			//case of funny
			else if (type === 'funny') {
				// console.log('funny');
				if (convertObjectToArray(changedPosted.counts.whoFunny).length > 0) {
					// console.log('base has funny alreay');
					// eslint-disable-next-line
					convertObjectToArray(changedPosted.counts.whoFunny).map((ls) => {
						if (ls.id !== currentUser.id) {
							changedPosted.counts.funny = changedPosted.counts.funny + 1;
							changedPosted.counts = {
								...changedPosted.counts,
								whoFunny: {
									...changedPosted.counts.whoFunny,
									[currentUser.id]: {
										id: currentUser.id,
										name: currentUser.name,
										avatar: currentUser.avatar
									}
								}
							};
							// console.log('CHanged Done', changedPosted.counts);
							var send7 = {
								change: changedPosted.counts,
								postId: changedPosted.postId,
								groupId: changedPosted.currentGroupId
							};
							this.props.addLike(send7);
							this.forceUpdate();
						}
					});
				} else {
					// console.log('base not funny alreay');
					changedPosted.counts.funny = changedPosted.counts.funny + 1;
					changedPosted.counts = {
						...changedPosted.counts,
						whoFunny: {
							...changedPosted.counts.whoFunny,
							[currentUser.id]: {
								id: currentUser.id,
								name: currentUser.name,
								avatar: currentUser.avatar
							}
						}
					};
					// console.log('CHanged Done', changedPosted.counts);
					var send12 = {
						change: changedPosted.counts,
						postId: changedPosted.postId,
						groupId: changedPosted.currentGroupId
					};
					this.props.addLike(send12);
					this.forceUpdate();
				}
			}
		} else {
			// console.log('base is undefined', changedPosted.counts);
			// Base startUp
			changedPosted.counts = {
				liked: 0,
				whoLiked: {},
				love: 0,
				whoLoved: {},
				disappointed: 0,
				whoDisappointed: {},
				funny: 0,
				whoFunny: {}
			};

			// Actual Call

			if (type === 'like') {
				// console.log('first entry for like');

				changedPosted = {
					...changedPosted,
					counts: {
						...changedPosted.counts,
						liked: 1,
						whoLiked: {
							[currentUser.id]: {
								id: currentUser.id,
								name: currentUser.name,
								avatar: currentUser.avatar
							}
						}
					}
				};

				// console.log('CHanged Done', changedPosted.counts);
				var send2 = {
					change: changedPosted.counts,
					postId: changedPosted.postId,
					groupId: changedPosted.currentGroupId
				};
				this.props.addLike(send2);
			} else if (type === 'love') {
				// console.log('first entry for love');

				changedPosted = {
					...changedPosted,
					counts: {
						...changedPosted.counts,
						love: 1,
						whoLoved: {
							[currentUser.id]: {
								id: currentUser.id,
								name: currentUser.name,
								avatar: currentUser.avatar
							}
						}
					}
				};
				// console.log('CHanged Done', changedPosted.counts);
				var send4 = {
					change: changedPosted.counts,
					postId: changedPosted.postId,
					groupId: changedPosted.currentGroupId
				};
				this.props.addLike(send4);
			} else if (type === 'disappointed') {
				// console.log('first entry for disapoint');
				changedPosted = {
					...changedPosted,
					counts: {
						...changedPosted.counts,
						disappointed: 1,
						whoDisappointed: {
							[currentUser.id]: {
								id: currentUser.id,
								name: currentUser.name,
								avatar: currentUser.avatar
							}
						}
					}
				};

				// console.log('CHanged Done', changedPosted.counts);
				var send6 = {
					change: changedPosted.counts,
					postId: changedPosted.postId,
					groupId: changedPosted.currentGroupId
				};
				this.props.addLike(send6);
			} else if (type === 'funny') {
				// console.log('first entry for funny');
				changedPosted = {
					...changedPosted,
					counts: {
						...changedPosted.counts,
						funny: 1,
						whoFunny: {
							[currentUser.id]: {
								id: currentUser.id,
								name: currentUser.name,
								avatar: currentUser.avatar
							}
						}
					}
				};

				// console.log('CHanged Done', changedPosted.counts);
				var send8 = {
					change: changedPosted.counts,
					postId: changedPosted.postId,
					groupId: changedPosted.currentGroupId
				};
				this.props.addLike(send8);
			}
		}
	}

	renderComment(comments: any) {
		// console.log('renderComment', comments);

		var commentArray: any[] = [];

		if (comments !== undefined) {
			convertObjectToArray(comments).map((com, index: number) => {
				commentArray.push(
					<IonItem lines='none' key={index} className='comment'>
						<IonAvatar className='listAvatar'>
							<img src={com.whoCommented.avatar} alt='broken' />
						</IonAvatar>
						<IonLabel class='ion-text-wrap' className='longLabel'>
							{com.contentComment}
						</IonLabel>
					</IonItem>
				);
				return commentArray;
			});

			return <IonList>{commentArray}</IonList>;
		} else {
			return <></>;
		}
	}

	deletePost(postId: string) {
		const { groupId } = this.props;
		const confirm = window.confirm('Are you sure you would like to delete this post??');
		var returnObj = {};
		var changed = this.state.GroupPosts;
		var arr = convertObjectToArray(changed);

		if (confirm) {
			// console.log('user conrimed to delete post ', postId);
			// console.log('????', this.state.GroupPosts[postId]);

			// console.log('arr', arr);
			arr.map((post: i_BaseInterface_Post) => {
				// console.log('post', post);
				if (post.postId !== postId) {
					returnObj = {
						...returnObj,
						[post.postId]: post
					};

					return returnObj;
				}
				return returnObj;
			});

			var send = {
				postId: postId,
				groupId: groupId,
				changedPosts: returnObj
			};
			this.props.deletePost(send);
			this.setState({ GroupPosts: returnObj });
		} else {
			// console.log('user did not conrimed to delete post ', postId);
		}
	}

	PostDisplay(postData: i_BaseInterface_Post, indexOfPost: number) {
		// console.log('PostDisplay', indexOfPost, postData);
		const count = postData.commentsOnPost !== undefined ? convertObjectToArray(postData.commentsOnPost).length : 0;
		const countLikes = postData.counts !== undefined ? postData.counts.liked + postData.counts.funny + postData.counts.disappointed + postData.counts.love : 0;

		const { currentUser } = this.props;
		// console.log('count', count, 'countLikes', countLikes);
		return (
			<IonCard key={postData.postId} className='postContainer'>
				<IonGrid>
					{/* Here comes the user who posted name and avatar as well as time posted  */}
					<IonRow>
						<IonCol size='12'>
							<IonCardHeader style={{ margin: 0, padding: 0, fontSize: ' 1.1em' }}>
								<IonItem lines='none'>
									<IonAvatar slot='start'>
										<img src={postData?.userWhoPosted?.avatar} alt='brokjen' />
									</IonAvatar>
									<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap', overflow: 'visible' }}>
										{postData?.userWhoPosted?.name} <br />
										<span
											style={{
												opacity: 0.5,
												fontSize: '0.9em',
												flex: '0 0 100%',
												overflow: 'visible'
											}}>
											{moment(postData?.ts).utcOffset('+0200').fromNow(false)}
										</span>
									</IonLabel>

									{postData?.userWhoPosted?.id === currentUser.id && (
										<IonButton size='small' fill='clear' slot='end' onClick={() => this.deletePost(postData?.postId)}>
											<IonIcon icon={trashBin} />
										</IonButton>
									)}
								</IonItem>
							</IonCardHeader>
						</IonCol>
					</IonRow>
					{/* Here comes any text that might be on a post */}
					{postData.inputTextValue !== undefined && (
						<IonRow>
							<IonCol>
								<IonCardContent style={{ fontSize: '1.2em' }}>{postData?.inputTextValue}</IonCardContent>
							</IonCol>
						</IonRow>
					)}

					{/* Here comes any images that might be on a post */}
					{postData.imagesUrlArray !== undefined && (
						<IonRow>
							<IonCol size='12'>
								<img src={postData.imagesUrlArray[0] !== undefined ? postData.imagesUrlArray[0] : TypesToFirebaseGlobals.placeholderImg} alt='broken' />
								{/* <IonSlides
									pager={true}
									options={{
										initialSlide: 0,
										speed: 400
									}}>
									{postData.imagesUrlArray.length > 0 &&
										postData.imagesUrlArray.map((img) => {
											return (
												<IonSlide key={img}>
													<img src={img !== undefined ? img : TypesToFirebaseGlobals.placeholderImg} alt='broken' />
												</IonSlide>
											);
										})}
								</IonSlides> */}
							</IonCol>
						</IonRow>
					)}
					{/* Here comes any videos that might be on a post */}
					{/* {postData.videoUrl !== undefined && (
						<IonRow>
							<IonCol>
								<Player fluid={false} width={300} height={150} playsInline src={postData.videoUrl[0]} />
							</IonCol>
						</IonRow>
					)} */}

					{/* Here comes the display of liked and loved and shared */}
					<IonRow>
						<IonCol size='12'>
							<IonCardHeader style={{ margin: 0, padding: 0, fontSize: '0.9em' }}>
								<IonItem lines='none'>
									<img className='ownIconMaker' src={OtherEmojiConst.FBLike.internal} alt='broken' />
									<img className='ownIconMaker' src={EmojiConst.InLove.internal} alt='broken' />
									<img className='ownIconMaker' src={EmojiConst.Sad.internal} alt='broken' />
									<img className='ownIconMaker' src={EmojiConst.Happy.internal} alt='broken' />
									<p>{countLikes}</p>

									<IonLabel class='ion-text-wrap' slot='end' style={{ flexWrap: 'wrap', overflow: 'visible' }}>
										Comments {count}
									</IonLabel>
								</IonItem>
							</IonCardHeader>
						</IonCol>
					</IonRow>
					{/* Like options  */}
					<IonRow>
						{this.state.showOptions[indexOfPost] && (
							<IonToolbar>
								<IonButton
									fill='clear'
									onClick={() => {
										this.clickedButtonOptionInLike('like', indexOfPost, postData.postId);
									}}>
									<img className='ownIconMaker1' src={AnimatedEmojiConst.FB_LIKE.internal} alt='broken' />
								</IonButton>
								<IonButton
									fill='clear'
									onClick={() => {
										this.clickedButtonOptionInLike('love', indexOfPost, postData.postId);
									}}>
									<img className='ownIconMaker1' src={AnimatedEmojiConst.HEART.internal} alt='broken' />
								</IonButton>

								<IonButton
									fill='clear'
									onClick={() => {
										this.clickedButtonOptionInLike('disappointed', indexOfPost, postData.postId);
									}}>
									<img className='ownIconMaker1' src={AnimatedEmojiConst.DISAPPOINTED.internal} alt='broken' />
								</IonButton>

								<IonButton
									fill='clear'
									onClick={() => {
										this.clickedButtonOptionInLike('funny', indexOfPost, postData.postId);
									}}>
									<img className='ownIconMaker1' src={AnimatedEmojiConst.LAUGHING.internal} alt='broken' />
								</IonButton>
							</IonToolbar>
						)}
					</IonRow>
					{/* Here comes the toolbar to do  liked and loved and shared */}
					<IonRow>
						<IonCol size='12'>
							<IonToolbar style={{ fontSize: '0.9em' }}>
								<IonButton
									fill='clear'
									slot='start'
									color='dark'
									onClick={() => {
										// console.log('index', this.state.showOptions[indexOfPost]);
										var change = this.state.showOptions;
										change[indexOfPost] = !this.state.showOptions[indexOfPost];
										this.setState({ showOptions: change });
									}}>
									<IonIcon slot='start' icon={thumbsUpOutline} /> Like
								</IonButton>
								<IonButton
									fill='clear'
									slot='end'
									color='dark'
									onClick={() => {
										// console.log('index', this.state.showComment[indexOfPost]);
										var change = this.state.showComment;
										change[indexOfPost] = !this.state.showComment[indexOfPost];
										this.setState({ showComment: change });
										// this.setState({ showComment: !this.state.showComment });
									}}>
									<IonIcon slot='start' icon={chatboxOutline} /> Comment
								</IonButton>
							</IonToolbar>
						</IonCol>
					</IonRow>

					{/* Here comes the toolbar to do a comment */}
					<IonRow>
						{this.state.showComment[indexOfPost] && (
							<IonToolbar>
								<IonCardHeader style={{ margin: 0, padding: 0 }}>
									<IonItem lines='none'>
										<IonAvatar slot='start'>
											<img src={postData?.userWhoPosted?.avatar} alt='brokjen' />
										</IonAvatar>
										<IonTextarea
											value={this.state.commentText}
											style={{ flexWrap: 'wrap', overflow: 'visible' }}
											className='inputWhatsapp'
											autoGrow
											onIonChange={(e) => this.handleCommentChange(e)}
										/>
										<IonIcon slot='end' style={{ width: '25px', height: '25px' }} icon={sendSharp} onClick={() => this.saveComment(indexOfPost, postData.postId)} />
									</IonItem>
								</IonCardHeader>
							</IonToolbar>
						)}
					</IonRow>
					{/* Here comes the view of all coments on a post  */}
					{this.renderComment(postData.commentsOnPost)}
				</IonGrid>
			</IonCard>
		);
	}

	Populate() {
		// const { GroupPosts } = this.props;
		// console.log('GroupPosts', this.state.GroupPosts);
		var postArray: any[] = [];

		convertObjectToArray(this.state.GroupPosts)
			.sort((a, b) => Number(b.ts) - Number(a.ts))
			.map((post: i_BaseInterface_Post, index: number) => {
				// console.log('?????', post.commentsOnPost);
				postArray.push(this.PostDisplay(post, index));
				return postArray;
			});

		return postArray;
	}

	render() {
		return <>{this.Populate()}</>;
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('ViewGroupPosts', ownProps, state);
	const groupId = ownProps.groupId;
	const userGroups = state.groups.UserGroups;

	const currrentgroup = userGroups[groupId] !== undefined ? userGroups[groupId] : state.groups.GlobalGroups[groupId];
	// console.log('currrentgroup', currrentgroup);
	const currentGroupPosts = currrentgroup !== undefined ? currrentgroup.posts : {};
	return {
		groupId: groupId,
		GroupPosts: currentGroupPosts,
		currentUser: state.user
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		addLike: (countsData: any) => dispatch(Group_Add_Like(countsData)),
		addComment: (commentData: AddComment) => dispatch(Group_Add_Comment(commentData)),
		deletePost: (postId: any) => dispatch(Group_Delete_Post(postId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewGroupPosts);

// currentGroupId: "CKpwdCEHdkTylKof1EWUtM9KcE92-1589463630833"
// imagesUrlArray: ["https://firebasestorage.googleapis.com/v0/b/tausch…=media&token=6355032e-4f23-49c4-817a-596f3c53973d"]
// inputTextValue: ""
// postId: "CKpwdCEHdkTylKof1EWUtM9KcE92-1589463630833-1589964667233"
// stickerValue: ""
// typeOfPost: "images"
// userWhoPosted: {avatar: "", id: "", name: ""}
// videoUrl: ""
//ts : ''

// 1590064317017:
// contentComment: undefined
// ts: 1590064317017
// whoCommented:
// avatar: "https://firebasestorage.googleapis.com/v0/b/tauschfarmdev2020.appspot.com/o/CKpwdCEHdkTylKof1EWUtM9KcE92%2FprofileImgs%2Fsmiley_tongue_side.png?alt=media&token=41829c8d-100f-4e80-9dd9-f2ded0b1d269"
// id: "CKpwdCEHdkTylKof1EWUtM9KcE92"
// name: "bianca"
