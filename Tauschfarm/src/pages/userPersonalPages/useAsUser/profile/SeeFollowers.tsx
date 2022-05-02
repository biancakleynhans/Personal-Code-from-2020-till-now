import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import { IonPage, IonContent, IonHeader, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { i_BaseInterface_Member } from '../../../../models/001UserModels';

export class SeeFollowers extends Component<any> {
	render() {
		const { use, paramF, currentUser } = this.props;
		const title = paramF === 'follow' ? Translate(lsInj.transDict.seePeopleIFollow) : Translate(lsInj.transDict.seePeopleFollowingMe);
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={title} />
					</IonHeader>
					<br />
					<br />
					<br />

					<IonList>
						{use.map((mem: i_BaseInterface_Member, index: number) => {
							return (
								<IonItem key={index} button={true} routerLink={`/members/${mem.id}/${currentUser}`}>
									<IonAvatar slot='start'>
										<img src={mem.avatar} alt='broken' />
									</IonAvatar>
									<IonLabel class='ion-text-wrap'>{mem.name}</IonLabel>
								</IonItem>
							);
						})}
					</IonList>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('SeeFollowers', ownProps.match.params.followOrFollowing, ownProps.match.params.globalUser);
	const paramUser = ownProps.match.params.globalUser;
	const paramF = ownProps.match.params.followOrFollowing;
	const follow = state.globalUsers.GlobalUsers[paramUser] !== undefined ? state.globalUsers.GlobalUsers[paramUser].UsersIfollow : state.user.UsersIfollow;
	const following = state.globalUsers.GlobalUsers[paramUser] !== undefined ? state.globalUsers.GlobalUsers[paramUser].UsersFollowingMe : state.user.UsersFollowingMe;

	const checkedFollow = follow !== undefined ? follow : {};
	const checkedFollowing = following !== undefined ? following : {};

	const use = paramF === 'follow' ? checkedFollow : checkedFollowing;

	// console.log('follow', follow);
	// console.log('following', following);
	// console.log('checkedFollow', checkedFollow);
	// console.log('checkedFollowing', checkedFollowing);
	// console.log('use', use);
	return {
		currentUser: state.user,
		use: convertObjectToArray(use),
		paramF
	};
};

export default connect(mapStateToProps)(SeeFollowers);
