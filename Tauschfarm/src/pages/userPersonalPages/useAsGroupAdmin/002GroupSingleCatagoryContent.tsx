import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import { connect } from 'react-redux';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { IAppState } from '../../../services/redux/reduxModels';
import CategoriesToChosefrom from '../../../services/translate/OptionsDict/CatagoriesToChoseFrom';
import FilterCatContent from '../../../layout/AppComponents/FilterCatContent';
import { Global_GetAllData_AtStartUp } from '../../../services/redux/actions/GlobalAction';

class GroupSingleCategoryContent extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			sortAtrr: false,
			itemsAvailable: []
		};
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.itemsAvailable !== this.props.itemsAvailable) {
			this.setState({ itemsAvailable: this.props.itemsAvailable });
		}
	}

	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader
							backBtn={true}
							titleString={Translate(CategoriesToChosefrom.transDict[this.props.match.params.catname])}
							filter_Sort_Btn={true}
							sort_buttonBoolean={() => {
								this.setState({ sortAtrr: !this.state.sortAtrr });
							}}
							filter_buttonBoolean={() => {
								this.setState({ filterRes: !this.state.filterRes });
							}}
						/>
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<FilterCatContent
						sort={this.state.sortAtrr}
						filter={this.state.filterRes}
						orginalCatContent={this.state.itemsAvailable}
						lang={this.props.lang}
						routerLink={`/groups/selectedGroup/${this.props.match.params.groupname}/selectedCatagory/${this.props.match.params.catname}`}
						currentUser={this.props.user}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('GroupSingleCategoryContent', ownProps);

	const groupname = ownProps.match.params.groupname;
	const catname = ownProps.match.params.catname;

	// console.log('groupname', groupname);
	// console.log('catname', catname);

	const user = state.groups.UserGroups[groupname];
	const global = state.groups.GlobalGroups[groupname];

	// console.log('user', user);
	// console.log('global', global);

	const testU = user?.categories !== undefined ? user.categories[catname]?.items : undefined;
	const testG = global?.categories !== undefined ? global.categories[catname]?.items : undefined;

	const groupCatItems = testU !== undefined ? testU : testG;

	const usefinal = groupCatItems !== undefined ? convertObjectToArray(groupCatItems) : [];

	// console.log('groupCatItems', groupCatItems);
	// console.log('usefinal', usefinal);

	return {
		itemsAvailable: usefinal,
		cat: catname,
		lang: state.user.lang,
		user: state.user
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupSingleCategoryContent);
