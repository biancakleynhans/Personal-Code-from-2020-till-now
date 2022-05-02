/** @format */

import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import { IAppState } from '../../../../services/redux/reduxModels';
import { connect } from 'react-redux';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import ImgEditView from '../../../../layout/AppComponents/ImgEditView';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';

class EditProfileImage extends Component<any, any> {
	render() {
		const { user, userId, userLang } = this.props;

		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader
							backBtn={true}
							titleString={CombinedString.profileSettingsEditPhotos}
						/>
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<ImgEditView
						imgIndex={this.props.match.params.imgNr}
						userId={userId}
						userLang={userLang}
						user={user}
						userOrGroup={'user'}
						imgType={'profile'}
						folderType={TypesToFirebaseGlobals.FBStorage_profileImgs}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('mstp', state);
	return {
		user: state.user,
		userId: state.user.id,
		userLang: state.user.lang
	};
};

export default connect(mapStateToProps)(EditProfileImage);
