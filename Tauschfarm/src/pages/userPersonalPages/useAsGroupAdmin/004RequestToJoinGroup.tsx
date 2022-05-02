import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonHeader, IonItem, IonLabel, IonButton, IonCard, IonCardTitle, IonAvatar, IonIcon } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { i_MembersRequests } from '../../../models/004GroupModels';
import moment from 'moment';
import { Group_CorfirmJoinReq, Group_DenyJoinReq } from '../../../services/redux/actions/GroupActions/100GroupRequestsAction';
import { calendarOutline, alert } from 'ionicons/icons';
import { IAppState } from '../../../services/redux/reduxModels';

class RequestToJoinGroup extends Component<any> {
	renderRequsetToJoin() {
		const { reqs } = this.props;
		const returnArry: JSX.Element[] = [];

		if (reqs.length > 0) {
			reqs.map((req: i_MembersRequests, index: number) => {
				const color = req.stats.status === 'pending' ? 'danger' : 'secondary';
				const color2 = req.stats.status === 'aproved' ? 'success' : 'secondary';
				const useColor = color === 'danger' ? color : color2;
				returnArry.push(
					<IonCard key={index}>
						<IonItem lines='none' button={true} routerLink={`/user/${req.user.id}`}>
							<IonAvatar slot='start' style={{ width: '50px', height: '50px' }}>
								<img src={req.user.avatar} alt='broken' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap'>{req.user.name}</IonLabel>
						</IonItem>
						<IonItem lines='none' button={true} routerLink={`/user/${req.user.id}`}>
							<IonButton class='ion-text-wrap' color='primary' fill='clear' routerLink={`/user/${req.user.id}`}>
								{Translate(lsInj.transDict.viewProfile)}
							</IonButton>
						</IonItem>

						<IonItem lines='none'>
							<IonIcon icon={calendarOutline}></IonIcon>
							<IonLabel class='ion-text-wrap'>{moment(req.stats.reqDate).utcOffset('+0200').calendar()}</IonLabel>
						</IonItem>

						<IonItem lines='none'>
							<IonIcon color={useColor} icon={alert}></IonIcon>
							<IonLabel class='ion-text-wrap' color={useColor}>
								{req.stats.status.toUpperCase()}
							</IonLabel>
						</IonItem>

						<IonButton class='ion-text-wrap' onClick={() => this.addUserToGroup(req)}>
							{Translate(lsInj.transDict.confirmReq)}{' '}
						</IonButton>
						<IonButton class='ion-text-wrap' onClick={() => this.declineUserToGroup(req)}>
							{Translate(lsInj.transDict.rejectReq)}{' '}
						</IonButton>
					</IonCard>
				);
				return returnArry;
			});

			return returnArry;
		} else {
			return (
				<IonCard>
					<IonCardTitle>{Translate(lsInj.transDict.noContent)}</IonCardTitle>
				</IonCard>
			);
		}
	}

	addUserToGroup(req: i_MembersRequests) {
		const { group, Guser } = this.props;
		delete group.membersRequests[req.user.id];

		group.membersList = {
			...group.membersList,
			[req.user.id]: req.user
		};

		group.memberCount = group.memberCount + 1;

		Guser[req.user.id].groups = {
			...Guser[req.user.id].groups,
			[group.id]: { id: group.id }
		};

		var objC = {
			groupId: group.id,
			group: group,
			userId: req.user.id,
			userG: Guser[req.user.id].groups
		};

		// console.log('Pressed to confirm user add');
		// console.log('group', group);
		// console.log('req', req);
		// console.log('req user from global users', Guser[req.user.id]);
		// console.log('objC', objC);

		this.props.confirmReq(objC);
		// RedirectTo('/dashboard/groups');
	}

	declineUserToGroup(req: i_MembersRequests) {
		const { group, Guser } = this.props;
		// console.log('Pressed to confirm user add');
		// console.log('group', group);
		// console.log('req', req);
		// console.log('req user from global users', Guser[req.user.id]);

		delete group.membersRequests[req.user.id];

		// console.log('group mod', group);
		group.memberCount = group.memberCount + 1;

		var objD = {
			groupId: group.id,
			group: group,
			userId: req.user.id,
			userG: Guser[req.user.id].groups
		};

		this.props.denyReq(objD);
	}

	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.joinGroup)} />
					</IonHeader>
					<br />
					<br />
					<br />

					{this.renderRequsetToJoin()}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('Group Req props', ownProps.match.params.groupId);
	const userGroup = state.groups.UserGroups[ownProps.match.params.groupId];
	const userGroupReq = state.groups.UserGroups[ownProps.match.params.groupId].membersRequests;
	const userRequesting = state.globalUsers.GlobalUsers;
	// console.log('userGroup', convertObjectToArray(userGroupReq), userGroup);
	return {
		groupId: ownProps.match.params.groupId,
		group: userGroup,
		reqs: convertObjectToArray(userGroupReq),
		Guser: userRequesting
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		confirmReq: (reqData: any) => dispatch(Group_CorfirmJoinReq(reqData)),
		denyReq: (reqData: any) => dispatch(Group_DenyJoinReq(reqData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestToJoinGroup);
