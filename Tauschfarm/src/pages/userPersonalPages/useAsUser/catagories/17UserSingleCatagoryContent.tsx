import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { Translate } from '../../../../services/translate/TranslateServices';
import { IAppState } from '../../../../services/redux/reduxModels';
import CategoriesToChosefrom from '../../../../services/translate/OptionsDict/CatagoriesToChoseFrom';
import FilterCatContent from '../../../../layout/AppComponents/FilterCatContent';

export class UserSingleCategoryContent extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			sortAtrr: false
		};
	}

	render() {
		const { itemsAvailable, cat } = this.props;
		return (
			<IonPage>
				<IonContent fullscreen>
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
						orginalCatContent={itemsAvailable}
						lang={this.props.lang}
						routerLink={`/dashboard/categories/selectedCategory/${cat}`}
						currentUser={this.props.user}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('UserSingleCategoryContent', ownProps);

	const userId = ownProps.match.params.userId;
	const catName = ownProps.match.params.catname;

	const checkUser = userId !== 'undefined' ? userId : state.user.id;
	// console.log('checkUser', checkUser);

	const FoundUser = state.globalUsers.GlobalUsers[checkUser] !== undefined ? state.globalUsers.GlobalUsers[checkUser] : state.user;
	// console.log('user', FoundUser);

	const userCats = FoundUser.categories[catName];

	// console.log('userCats', userCats);

	const itemArr = userCats.items !== undefined ? convertObjectToArray(userCats.items) : [];
	// console.log('itemArr', itemArr);

	return {
		itemsAvailable: itemArr,
		cat: catName,
		lang: state.user.lang,
		user: state.user
	};
};

export default connect(mapStateToProps)(UserSingleCategoryContent);
