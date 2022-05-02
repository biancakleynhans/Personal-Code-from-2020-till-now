import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import CatagoryDeleteView from '../../../../layout/AppComponents/CatagoryDeleteView';

interface iState {
	catToEdit: string;
}

class GroupDeleteCategory extends Component<any, iState> {
	render() {
		// console.log('state', this.state);
		const { group, currentCat, catName, userId, userLang } = this.props;
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
						allCats={group.categories ? group.categories : {}}
						userId={userId}
						userLang={userLang}
						redirectLink={`/dashboard/groups/selectedGroup/${group.id}/:isfirst`}
						userOrGroup={'group'}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('own', ownProps.match.params);
	// console.log('group: ', state.groups.UserGroups[ownProps.match.params.group]);
	// console.log('group id', ownProps.match.params.group);
	// console.log('Category', ownProps.match.params.catname);
	// return {
	// 	user: state.groups.UserGroups[ownProps.match.params.group],
	// 	userId: ownProps.match.params.group,
	// 	Category: ownProps.match.params.catname
	// };

	const g = state.groups.UserGroups[ownProps.match.params.group];
	const c = ownProps.match.params.catname;
	const current = g.categories[c]; // state.user.categories[ownProps.match.params.catName];
	return {
		group: g,
		userId: g.id,
		userLang: state.user.lang,
		currentCat: current,
		catName: ownProps.match.params.catname
	};
};

const matchDispatchToProps = (dispatch: any) => {
	return {
		// deleteCat: (data: any) => dispatch(Group_DeleteCats(data))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(GroupDeleteCategory);
