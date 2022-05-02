import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import { IAppState } from '../../../../services/redux/reduxModels';
import { connect } from 'react-redux';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';
import ImgEditView from '../../../../layout/AppComponents/ImgEditView';

class GroupEditImage extends Component<any, any> {
	render() {
		const { userId, userLang, user, imgIndex } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.profileSettingsEditPhotos} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<ImgEditView
						imgIndex={imgIndex}
						userId={userId}
						userLang={userLang}
						user={user}
						userOrGroup={'group'}
						imgType={'profile'}
						folderType={TypesToFirebaseGlobals.FBStorage_GroupImgs}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('Group Profile image edit', ownProps);
	// console.log('state', state);
	// console.log('ownProps', ownProps);

	return {
		user: state.groups.UserGroups[ownProps.match.params.group],
		userId: ownProps.match.params.group,
		userLang: state.user.lang,
		imgIndex: +ownProps.match.params.index
		// progress:  state.groups.progress
	};
};

export default connect(mapStateToProps)(GroupEditImage);
