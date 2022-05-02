import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { NamedDict } from '../../../../services/helpers/Tools';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import { i_BaseInterface_Item } from '../../../../models/006ItemModels';
import CatagoryEditView from '../../../../layout/AppComponents/CatagoryEditView';

interface iState {
	catToEdit: string;
	catToEditIndex: number;
	catStringChange: {
		name: string;
		avatar: string;
		items: NamedDict<i_BaseInterface_Item>;
	};
	imgPreview: any;
	imgReplace: string;
	fileN: string;
	changed: boolean;
	catImg: string;
}

class GroupEditCategory extends Component<any, iState> {
	render() {
		const { group, currentCat, catName, userId, userLang } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.profileSettingsEditCat} />
					</IonHeader>
					<br />
					<br />
					<br />

					<CatagoryEditView
						currentCat={currentCat}
						catName={catName}
						allCats={group ? group.categories : {}}
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
	// console.log('ownProps', ownProps);

	const g = state.groups.UserGroups[ownProps.match.params.group];
	const c = ownProps.match.params.catname;
	const current = g.categories[c];

	// console.log('current', current);
	return {
		group: g,
		userId: g.id,
		userLang: state.user.lang,
		currentCat: current,
		catName: c
	};
};

export default connect(mapStateToProps)(GroupEditCategory);
