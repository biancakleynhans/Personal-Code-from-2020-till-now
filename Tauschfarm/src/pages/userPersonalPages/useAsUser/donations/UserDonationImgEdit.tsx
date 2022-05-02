import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import ImgEditView from '../../../../layout/AppComponents/ImgEditView';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';

class UserDonatimgEdit extends Component<any> {
	render() {
		const { itemFromPreview, user, index } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.ItemEditImg} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<ImgEditView
						imgIndex={index}
						userId={user.id}
						userLang={user.lang}
						user={itemFromPreview}
						userOrGroup={'user'}
						imgType={'donation'}
						folderType={TypesToFirebaseGlobals.FBStorage_DonImgs}
					/>
				</IonContent>
			</IonPage>
		);
	}
}
const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('UserDonatimgEdit', state, ownProps);

	const Iid = ownProps.match.params.itemId;
	const currentDons = state.user.donations;
	const Item = currentDons ? currentDons[Iid] : { id: 'notSet', categories: ['notSet'] };

	// console.log('currentDons', currentDons);
	// console.log('Item', Item);
	return {
		itemId: Iid,
		itemFromPreview: Item,
		user: state.user,
		index: ownProps.match.params.index
	};
};

export default connect(mapStateToProps)(UserDonatimgEdit);
