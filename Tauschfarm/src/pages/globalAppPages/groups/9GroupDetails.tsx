import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import GroupInfoViewGlobalUnjoined from '../../../layout/AppComponents/GroupInfoView_Global_Unjoined';
import GroupInfoViewJoined from '../../../layout/AppComponents/GroupInfoViewJoined';
import { IAppState } from '../../../services/redux/reduxModels';
import { i_BaseInterface_Member } from '../../../models/001UserModels';

class GroupDetails extends Component<any> {
	render() {
		const { currentGroup, globalGroup, user, isMember, ownerData } = this.props;
		// console.log('currentGroup', currentGroup);
		// console.log('globalGroup', globalGroup);
		// console.log('user', user.groups);

		const joinedGlobale = globalGroup !== undefined && isMember === true ? true : false;
		const global = globalGroup !== undefined && isMember === false ? true : false;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} contactBtn={true} rl={`/chats/${user.id}/withUser/${ownerData.id}`} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					{currentGroup && (
						<>
							<GroupInfoViewJoined user={user} owner={ownerData} group={currentGroup} type={'user'} redirectLink={`/groups/selectedGroup/${currentGroup.id}/selectedCatagory`} />
						</>
					)}
					{joinedGlobale && (
						<>
							<GroupInfoViewJoined user={user} owner={ownerData} group={globalGroup} type={'user'} redirectLink={`/groups/selectedGroup/${globalGroup.id}/selectedCatagory`} />
						</>
					)}
					{global && (
						<>
							<GroupInfoViewGlobalUnjoined
								owner={ownerData}
								group={globalGroup}
								type={'global'}
								user={user}
								redirectLink={`/groups/selectedGroup/${globalGroup.id}/selectedCatagory`}
							/>
						</>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('GroupDetails', ownProps, state);
	const finder = ownProps.match.params.groupname;

	const globalGroup = state.groups.GlobalGroups[finder];
	// const userGroup = state.groups.UserGroups[finder];

	const isInM = globalGroup !== undefined ? globalGroup.membersList[state.user.id] : undefined;
	const isMember = isInM !== undefined ? true : false;

	const owner = state.globalUsers.GlobalUsers[finder.split('-')[0]] !== undefined ? state.globalUsers.GlobalUsers[finder.split('-')[0]] : state.user;

	// console.log('globalGroup', globalGroup);
	// console.log('userGroup', userGroup);
	// console.log('isInM', isInM);
	// console.log('isMember', isMember);
	// console.log(globalGroup?.membersList[state.user.id]);
	console.log('owner', owner);

	var ownerData: i_BaseInterface_Member = { name: owner.name, avatar: owner.avatar, id: owner.id };

	return {
		user: state.user,
		currentGroup: state.groups.UserGroups[finder],
		globalGroup: state.groups.GlobalGroups[finder],
		isMember,
		ownerData
	};
};

export default connect(mapStateToProps)(GroupDetails);
