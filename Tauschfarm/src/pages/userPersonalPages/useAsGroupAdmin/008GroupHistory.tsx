/** @format */

import React, { Component } from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonAvatar, IonItem, IonLabel, IonCardTitle, IonPage, IonContent, IonHeader } from '@ionic/react';
import { connect } from 'react-redux';
import moment from 'moment';
import PageHeader from '../../../layout/Headers/PageHeader';
import { IAppState } from '../../../services/redux/reduxModels';

class GroupHistory extends Component<any> {
	render() {
		const { timeline, globalUsers, user, group } = this.props;
		// console.log('tl', timeline);
		return (
			<IonPage>
				<IonContent>
					<IonHeader>
						<PageHeader backBtn={true} titleString='Group History' />
					</IonHeader>
					<br />

					{timeline.length > 0 ? (
						timeline.map((tl: any) => {
							const didActionUser = user.id === tl.uid ? user : globalUsers[tl.uid];
							var memReq = '';

							var itemName = '';

							if (tl.memberId !== undefined) {
								if (tl.memberId === user.id) {
									memReq = user.name;
								} else if (globalUsers[tl.memberId] !== undefined) {
									memReq = globalUsers[tl.memberId].name;
								} else {
									memReq = 'Broken';
								}
							}

							if (group.categories[tl.categoryId] !== undefined) {
								if (group.categories[tl.categoryId].items !== undefined) {
									if (group.categories[tl.categoryId].items[tl.itemId] !== undefined) {
										itemName = group.categories[tl.categoryId].items[tl.itemId].name;
									}
								}
							}
							const groupForthisTl = group;
							// console.log('didActionUser', didActionUser);
							// console.log('groupForthisTl', groupForthisTl);
							return (
								<IonCard key={tl.ts + didActionUser.name + groupForthisTl.name}>
									<IonCardHeader>
										<IonItem lines='none'>
											<IonAvatar slot='start'>
												<img src={didActionUser.avatar} alt='brokjen' />
											</IonAvatar>
											<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap' }}>
												{tl.eventType} <br />
												<span
													style={{
														opacity: 0.5,
														fontSize: '0.8em',
														flex: '0 0 100%'
													}}>
													{moment(tl.ts).utcOffset('+0200').fromNow(false)} <br />
													{moment(tl.ts).utcOffset('+0200').calendar()}
												</span>
											</IonLabel>
										</IonItem>
									</IonCardHeader>

									{tl.eventType === 'Group Created' && (
										<IonCardContent style={{ textAlign: 'left' }}>
											<strong>User</strong> {didActionUser.name} <br />
											{tl.eventType === 'Group Created' && `Created the group with name ${groupForthisTl.name}`} <br />
											{tl.eventType === 'Group Created' && `Created the group with description ${groupForthisTl.description}`}
										</IonCardContent>
									)}

									{tl.eventType === 'Add categories' && (
										<IonCardContent style={{ textAlign: 'left' }}>
											<strong>User</strong> {didActionUser.name} <br />
											{tl.eventType === 'Add categories' && `Created the category with the name ${tl.categoryId} to ${groupForthisTl.name}`} <br />
										</IonCardContent>
									)}

									{tl.eventType === 'Add Member Request' && (
										<IonCardContent style={{ textAlign: 'left' }}>
											<strong>User</strong> {didActionUser.name} <br />
											{tl.eventType === 'Add Member Request' && `Requested to join group ${groupForthisTl.name} request not yet approved`} <br />
										</IonCardContent>
									)}

									{tl.eventType === 'Add Member' && (
										<IonCardContent style={{ textAlign: 'left' }}>
											<strong>User</strong> {memReq} <br />
											{tl.eventType === 'Add Member' && `Requested to join group ${groupForthisTl.name} request has been aproved by ${didActionUser.name}`} <br />
										</IonCardContent>
									)}

									{tl.eventType === 'Add Item' && (
										<IonCardContent style={{ textAlign: 'left' }}>
											<strong>User</strong> {didActionUser.name} <br />
											{tl.eventType === 'Add Item' && `Added item ${itemName.length > 0 ? itemName : tl.itemId} to category ${tl.categoryId} for this group`} <br />
										</IonCardContent>
									)}
								</IonCard>
							);
						})
					) : (
						<IonCard>
							<IonCardTitle>No timeline content found</IonCardTitle>
						</IonCard>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('GroupTimeLine props', ownProps.match.params.groupId);
	// console.log('glU', state.globalUsers.GlobalUsers);
	const tl = {}; //state.groups.userGroupsTimeLines[ownProps.match.params.groupId];
	return {
		timeline: tl,
		globalUsers: state.globalUsers.GlobalUsers,
		user: state.user,
		group: state.groups.UserGroups[ownProps.match.params.groupId]
	};
};

export default connect(mapStateToProps)(GroupHistory);

// eventType: "Group Created"
// groupId: "CKpwdCEHdkTylKof1EWUtM9KcE92-1589279997637"
// ts: 1589280013531
// uid: "CKpwdCEHdkTylKof1EWUtM9KcE92"

// categoryId: "Miscellaneous"
// eventType: "Add categories"
// groupId: "CKpwdCEHdkTylKof1EWUtM9KcE92-1589279997637"
// ts: 1589283220186
// uid: "CKpwdCEHdkTylKof1EWUtM9KcE92"

// eventType: "Add Member Request"
// groupId: "CKpwdCEHdkTylKof1EWUtM9KcE92-1589279997637"
// memberId: "Af0eknwhvgOnkDt8Y7UsItslDqG2"
// ts: 1589285194744
// uid: "Af0eknwhvgOnkDt8Y7UsItslDqG2"

// eventType: "Add Member"
// groupId: "CKpwdCEHdkTylKof1EWUtM9KcE92-1589279997637"
// memberId: "Af0eknwhvgOnkDt8Y7UsItslDqG2"
// ts: 1589285959345
// uid: "CKpwdCEHdkTylKof1EWUtM9KcE92"

// categoryId: "Accessories"
// eventType: "Add Item"
// groupId: "CKpwdCEHdkTylKof1EWUtM9KcE92-1589463630833"
// itemId: "CKpwdCEHdkTylKof1EWUtM9KcE92-1589463630833-1589466971960"
// ts: 1589466982374
// uid: "CKpwdCEHdkTylKof1EWUtM9KcE92"
