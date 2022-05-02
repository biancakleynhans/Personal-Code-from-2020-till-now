import React, { Component, Dispatch } from 'react';
import { IonToolbar, IonTitle, IonItem, IonIcon, IonLabel, IonText, IonButton, IonModal, IonGrid, IonRow, IonCol, IonAvatar } from '@ionic/react';
import { peopleCircleOutline } from 'ionicons/icons';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { User_ReqToJoin_Group } from '../../services/redux/actions/userActions/006GroupsActions';
import { i_Join_req, i_BaseInterface_Group } from '../../models/004GroupModels';
import ShareFab from '../Buttons/ShareFab';
import ViewGroupPosts from '../../pages/userPersonalPages/useAsGroupAdmin/007ViewGroupPosts';
import { i_BaseInterface_User, i_BaseInterface_Member } from '../../models/001UserModels';

interface iProps {
	user: i_BaseInterface_User;
	owner: i_BaseInterface_Member;
	group: i_BaseInterface_Group;
	type: 'user' | 'global';
	redirectLink: string;
}

class GroupInfoViewGlobalUnjoined extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			openModal: false,
			showCats: false,
			showTimeLine: false
		};
	}

	joinGroup() {
		var createJoinReq: i_Join_req = {
			userWhoWantsToJoin: {
				id: this.props.user.id,
				name: this.props.user.name,
				avatar: this.props.user.avatar
			},
			groupUserWantsToJoin: {
				id: this.props.group.id
			},
			reqStats: {
				status: 'pending',
				reqDate: new Date()
			}
		};

		this.props.joinGroupReq(createJoinReq);
		this.setState({ openModal: !this.state.openModal });
	}

	renderGroup() {
		return (
			<>
				<img style={{ display: 'block', height: '400px', width: '400px' }} src={this.props?.group?.avatar} alt='Broken' />
				<IonToolbar className='rounding'>
					<IonTitle>{this.props?.group?.name}</IonTitle>
				</IonToolbar>

				<IonItem lines='none' button routerLink={`/members/${this.props?.owner?.id}/${this.props?.user?.id}`}>
					<IonAvatar class='avatar'>
						<img src={this.props?.owner?.avatar} alt='broken' />
					</IonAvatar>
					<IonLabel>{this.props?.owner?.name}</IonLabel>
				</IonItem>

				<IonItem lines='none' button={true} routerLink={`/group/${this.props?.group?.id}/members`}>
					<IonIcon icon={peopleCircleOutline}></IonIcon>
					<IonLabel class='ion-text-wrap'>
						{this.props.group.memberCount} {Translate(lsInj.transDict.Members)}
					</IonLabel>
				</IonItem>
				<br />
				<br />
				{this.props.type === 'global' && <IonButton onClick={() => this.joinGroup()}>{Translate(lsInj.transDict.Join)}</IonButton>}
				<br />
				<br />
				{this.state.openModal && (
					<IonModal cssClass='Modal1' showBackdrop={true} isOpen={this.state.openModal}>
						<IonItem>
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.doneJoin)}</IonLabel>
							<IonButton
								shape='round'
								size='small'
								onClick={() => {
									return this.setState({ openModal: !this.state.openModal });
								}}>
								{Translate(lsInj.transDict.Close)}
							</IonButton>
						</IonItem>
					</IonModal>
				)}

				<IonText style={{ margin: '20px', fontSize: 'large' }}>{this.props.group.description}</IonText>
				<br />
				<br />
				<br />

				<ShareFab
					titleProp={Translate(lsInj.transDict.checkgroup)}
					descProp={this.props.group.description}
					imageProp={this.props.group.avatar}
					partFallback={`groups/selectedGroup/${this.props.group.id}`}
				/>
				<br />
				<br />
				<br />
				<IonTitle>
					<IonButton fill='outline' color='primary' routerLink={`/groups/selectedGroup/${this.props.group.id}/categories`}>
						{Translate(lsInj.transDict.AllCatMultiple)}
					</IonButton>
				</IonTitle>
				<br />

				<ViewGroupPosts groupId={this.props.group.id} />
			</>
		);
	}
	render() {
		// console.log('GroupInfoView props', this.props.group);

		var windowSize = window.innerWidth;
		//console.log('windowSize', windowSize);
		return (
			<>
				{windowSize < 400 && <>{this.renderGroup()}</>}

				{windowSize > 800 && (
					<IonGrid>
						<IonRow>
							<IonCol size='4'></IonCol>
							<IonCol size='4'>{this.renderGroup()}</IonCol>
							<IonCol size='4'></IonCol>
						</IonRow>
					</IonGrid>
				)}
			</>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		joinGroupReq: (reqData: any) => dispatch(User_ReqToJoin_Group(reqData))
	};
};

export default connect(null, mapDispatchToProps)(GroupInfoViewGlobalUnjoined);
