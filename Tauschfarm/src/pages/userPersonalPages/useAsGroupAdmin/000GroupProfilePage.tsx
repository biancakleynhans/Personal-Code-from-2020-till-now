import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { connect } from 'react-redux';
import FabButtonSelection from '../../../layout/Buttons/Fab';
import PageHeader from '../../../layout/Headers/PageHeader';
import GroupInfoViewJoined from '../../../layout/AppComponents/GroupInfoViewJoined';
import { IAppState } from '../../../services/redux/reduxModels';
import ProfileSkeletonScreen from '../../../layout/Loading_Redirecting/ProfileSkeletonScreen';

class GroupProfilePage extends Component<any> {
	render() {
		const { currentGroup, reqNum, ownerData, user, loading, isMine } = this.props;
		// console.log(currentGroup.id, '??????');
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />
					{!loading && (
						<>
							<GroupInfoViewJoined
								group={currentGroup}
								//type={'Group'} // changed from user to Group when going from group profile to item
								redirectLink={`/groups/selectedGroup/${currentGroup !== undefined ? currentGroup.id : 'none'}/selectedCatagory`}
								user={user}
								owner={ownerData}
							/>

							{isMine && <FabButtonSelection userOrGroup={'group'} idOfUserOrGroup={currentGroup.id} reqNum={reqNum} />}
						</>
					)}

					{loading && <ProfileSkeletonScreen />}
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('Group Profile Page', ownProps);

	var arr =
		state.groups.UserGroups[ownProps.match.params.groupId]?.categories !== undefined ? convertObjectToArray(state.groups.UserGroups[ownProps.match.params.groupId].categories) : [];

	const reqNum =
		state.groups.UserGroups[ownProps.match.params.groupId]?.membersRequests !== undefined
			? convertObjectToArray(state.groups.UserGroups[ownProps.match.params.groupId]?.membersRequests).length
			: 0;

	const owner =
		state.globalUsers.GlobalUsers[ownProps.match.params.groupId.split('-')[0]] !== undefined
			? state.globalUsers.GlobalUsers[ownProps.match.params.groupId.split('-')[0]]
			: state.user;
	console.log('owner', owner);

	const isMine = ownProps.match.params.groupId.split('-')[0] === state.user.id ? true : false;
	console.log('isMine', isMine, ownProps.match.params.groupId.split('-')[0] === state.user.id, ownProps.match.params.groupId.split('-')[0], owner.id);

	return {
		currentGroup:
			state.groups.UserGroups[ownProps.match.params.groupId] !== undefined
				? state.groups.UserGroups[ownProps.match.params.groupId]
				: state.groups.GlobalGroups[ownProps.match.params.groupId],
		currentGroupCats: arr,
		reqNum: reqNum,
		ownerData: owner,
		user: state.user,
		loading: state.user.isEmpty,
		isMine
	};
};

export default connect(mapStateToProps)(GroupProfilePage);
