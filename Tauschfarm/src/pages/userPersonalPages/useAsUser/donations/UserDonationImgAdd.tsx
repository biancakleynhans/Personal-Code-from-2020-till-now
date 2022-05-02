import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import ImgAddView from '../../../../layout/AppComponents/ImgAddView';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';

class UserDonationImgAdd extends Component<any> {
	render() {
		const { item, userId, userLang, checker } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.profileSettingsAddPhotos} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<ImgAddView
						userId={userId}
						userLang={userLang}
						user={item}
						redirectLink={`/userDonations/selectedItem/${item.id}/edit`}
						userOrGroup={checker} //this.props.match.params.userOrGroup
						imgType={'don'}
						folderType={TypesToFirebaseGlobals.FBStorage_DonImgs}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('DOns state add imgae', ownProps);

	var donId = ownProps.match.params.itemId;
	var don = state.user.donations[donId];
	// const idMak = state.groups.UserGroups[ownProps.match.params.idOfUserOrGroup] ? state.groups.UserGroups[ownProps.match.params.idOfUserOrGroup] : state.user;
	var checker = 'user'; //ownProps.match.params.userOrGroup !== 'user' ? (ownProps.match.params.userOrGroup.split('-').length === 1 ? 'user' : 'group') : 'user';
	// var param = ownProps.match.params.userOrGroup;
	console.log('don', don);
	return {
		user: state.user, //idMak,
		userId: state.user.id, //idMak.id,
		userLang: state.user.lang,
		item: don, //state.item,
		checker
	};
};

export default connect(mapStateToProps)(UserDonationImgAdd);
