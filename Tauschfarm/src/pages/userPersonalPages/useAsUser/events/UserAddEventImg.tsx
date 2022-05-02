/** @format */

import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { connect } from 'react-redux';
import ImgAddView from '../../../../layout/AppComponents/ImgAddView';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';
import { IAppState } from '../../../../services/redux/reduxModels';

interface iState {
	imgArrayPreview: any[];
	imgArray: any[];
	itemDesc: string;
}

class AddImgToEvent extends Component<any, iState> {
	render() {
		const { event, userId, userLang } = this.props;
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
						user={event}
						redirectLink={AllRoutesListed.userRoutes.create_Event}
						userOrGroup={'user'}
						imgType={'event'}
						folderType={TypesToFirebaseGlobals.FBStorage_EventImgs}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('Event img ', state);
	return {
		user: state.user,
		event: state.events.creatingEvent,
		userId: state.user.id,
		userLang: state.user.lang,
	};
};

export default connect(mapStateToProps)(AddImgToEvent);
