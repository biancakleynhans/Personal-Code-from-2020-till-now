import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import ImgAddView from '../../../../layout/AppComponents/ImgAddView';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';

class AddImgToGroup extends Component<any> {
	render() {
		const { group, idtoUseFromUrl } = this.props;
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
						userId={idtoUseFromUrl}
						userLang={'de'}
						user={group}
						redirectLink={AllRoutesListed.userRoutes.create_Group}
						userOrGroup={'group'}
						imgType={'profile'}
						folderType={TypesToFirebaseGlobals.FBStorage_profileImgs}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('AddImgToGroup ', ownProps);

	const idtoUseFromUrl = ownProps.match.params.idOfUserOrGroup;
	// const idtoUseFromCreate = state.groups.creatingGroup;
	console.log('idtoUseFromUrl', idtoUseFromUrl);
	// console.log('idtoUseFromCreate', idtoUseFromCreate);

	const groupExsists = state.groups.UserGroups[idtoUseFromUrl];
	const groupNot = state.groups.creatingGroup;
	const group = groupExsists !== undefined ? groupExsists : groupNot;

	console.log('groupExsists', groupExsists);
	console.log('groupNot', groupNot);
	console.log('group', group);

	return {
		idtoUseFromUrl,
		group: group
	};
};

export default connect(mapStateToProps)(AddImgToGroup);
