import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';

import { connect } from 'react-redux';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';
import ImgEditView from '../../../../layout/AppComponents/ImgEditView';
import { IAppState } from '../../../../services/redux/reduxModels';

export class UserEditItemImg extends Component<any, any> {
	render() {
		const { user, event, index } = this.props;
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
						imgIndex={index}
						userId={user.id}
						userLang={user.lang}
						user={event}
						userOrGroup={'user'}
						imgType={'event'}
						folderType={TypesToFirebaseGlobals.FBStorage_EventImgs}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('mstp', state, ownProps);
	// const current = state.user.events[ownProps.match.params.eventname] ? state.user.events[ownProps.match.params.eventname].imgArray : [];

	var creating = state.events.creatingEvent;
	creating.imgArray = state.events.pendingImgUrl;
	creating.avatar = state.events.pendingImgUrl[0];

	var created = state.user.events[ownProps.match.params.eventname];

	console.log('creating', creating);
	console.log('created', created);

	console.log('???', created !== undefined ? created : creating);

	return {
		user: state.user,
		// Eimg: current,
		event: created !== undefined ? created : creating,
		index: ownProps.match.params.indexImg
	};
};

export default connect(mapStateToProps)(UserEditItemImg);
