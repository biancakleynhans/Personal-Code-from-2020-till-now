/** @format */

import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import MembersList from '../../../layout/AppComponents/MembersList';
import { IAppState } from '../../../services/redux/reduxModels';

export class GroupMembersList extends Component<any> {
	render() {
		const { members } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />
					<MembersList
						members={members}
						title={Translate(lsInj.transDict.Members)}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('Group Req props', ownProps.match.params.groupId);
	const userGroup = state.groups.UserGroups[ownProps.match.params.groupId];
	const globalGroup = state.groups.GlobalGroups[ownProps.match.params.groupId];

	// console.log('user', userGroup);
	// console.log('global', globalGroup);

	const send = userGroup !== undefined ? userGroup : globalGroup;
	// console.log('send', send.membersList);

	return {
		members: convertObjectToArray(send.membersList)
	};
};

export default connect(mapStateToProps)(GroupMembersList);
