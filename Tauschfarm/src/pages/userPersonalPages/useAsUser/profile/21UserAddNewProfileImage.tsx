/** @format */

import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import ImgAddView from '../../../../layout/AppComponents/ImgAddView';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';

class AddNewProfileImage extends Component<any> {
	render() {
		const { user, userId, userLang } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader
							backBtn={true}
							titleString={CombinedString.profileSettingsAddPhotos}
						/>
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<ImgAddView
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
	return {
		user: state.user,
		userId: state.user.id,
		userLang: state.user.lang
	};
};

export default connect(mapStateToProps)(AddNewProfileImage);
