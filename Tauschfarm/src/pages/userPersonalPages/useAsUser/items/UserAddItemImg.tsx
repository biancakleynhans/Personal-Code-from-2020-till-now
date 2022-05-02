import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import ImgAddView from '../../../../layout/AppComponents/ImgAddView';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';

class AddImgToItem extends Component<any> {
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
						redirectLink={`/createItem/${this.props.match.params.idOfUserOrGroup}/${this.props.match.params.userOrGroup}`}
						userOrGroup={checker} //this.props.match.params.userOrGroup
						imgType={'item'}
						folderType={TypesToFirebaseGlobals.FBStorage_ItemImgs}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('state add imgae', ownProps, ownProps.match.params.userOrGroup);
	const idMak = state.groups.UserGroups[ownProps.match.params.idOfUserOrGroup] ? state.groups.UserGroups[ownProps.match.params.idOfUserOrGroup] : state.user;

	var checker = ownProps.match.params.userOrGroup !== 'user' ? (ownProps.match.params.userOrGroup.split('-').length === 1 ? 'user' : 'group') : 'user';
	console.log(checker);
	return {
		user: idMak,
		userId: idMak.id,
		userLang: state.user.lang,
		item: state.item,
		checker
	};
};

export default connect(mapStateToProps)(AddImgToItem);
