/** @format */

import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import CatagoryDeleteView from '../../../../layout/AppComponents/CatagoryDeleteView';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';

export class UserDeleteCategory extends Component<any> {
	render() {
		const { user, currentCat, catName, userId, userLang } = this.props;

		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.profileSettingsDeleteCat} />
					</IonHeader>
					<br />
					<br />
					<br />

					<CatagoryDeleteView
						currentCat={currentCat}
						catName={catName}
						allCats={user ? user.categories : {}}
						userId={userId}
						userLang={userLang}
						redirectLink={AllRoutesListed.userRoutes.dash_Settings}
						userOrGroup={'user'}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	const current = state.user.categories[ownProps.match.params.catName];
	return {
		user: state.user,
		userId: state.user.id,
		userLang: state.user.lang,
		currentCat: current,
		catName: ownProps.match.params.catName
	};
};

export default connect(mapStateToProps)(UserDeleteCategory);
