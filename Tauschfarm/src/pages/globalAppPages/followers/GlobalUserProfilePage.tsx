import React, { Component } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonHeader, IonCol } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { IAppState } from '../../../services/redux/reduxModels';
import ProfilePage from '../../../layout/AppComponents/ProfilePage';

class GlobalUserProfilePage extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			showCats: false
		};
	}

	render() {
		const { user, arr, currentUser } = this.props;
		var windowSize = window.innerWidth;
		//console.log('windowSize', windowSize);
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} rl={`/chats/${currentUser.id}/withUser/${user.id}`} contactBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />
					{windowSize < 400 && <ProfilePage user={user} arr={arr} type='global' currentUser={currentUser} />}
					{windowSize > 800 && (
						<IonGrid>
							<IonRow>
								<IonCol size='4'></IonCol>
								<IonCol size='4'>
									<ProfilePage user={user} arr={arr} type='global' currentUser={currentUser} />
								</IonCol>
								<IonCol size='4'></IonCol>
							</IonRow>
						</IonGrid>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('GlobalUserProfilePage', ownProps.match.params);
	const parmId = ownProps.match.params.memberId;
	const userRequesting =
		state.globalUsers.GlobalUsers[parmId] !== undefined
			? state.globalUsers.GlobalUsers[parmId]
			: state.user.id === parmId
			? state.user
			: { id: 'notset', categories: {}, avatar: '', name: '', bio: '', imgArray: [] };
	var arr = userRequesting.categories ? convertObjectToArray(userRequesting.categories) : [];

	const currentU = state.globalUsers.GlobalUsers[ownProps.match.params.currentUser] !== undefined ? state.globalUsers.GlobalUsers[ownProps.match.params.currentUser] : state.user;
	// console.log('userRequesting', userRequesting);
	// console.log('arr', arr);
	return {
		user: userRequesting,
		arr: arr,
		memId: parmId,
		currentUser: currentU
	};
};

export default connect(mapStateToProps)(GlobalUserProfilePage);
