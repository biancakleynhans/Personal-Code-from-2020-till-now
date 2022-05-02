import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonHeader, IonRefresher, IonRefresherContent } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { IAppState } from '../../../../services/redux/reduxModels';
import FilterCats from '../../../../layout/AppComponents/FilterCats';
import { Global_GetAllData_AtStartUp } from '../../../../services/redux/actions/GlobalAction';

interface iState {
	sortAtrr: boolean;
	filterRes: boolean;
}

class UserCategoryPage extends Component<any, iState> {
	refresherRef: HTMLIonRefresherElement | undefined;
	constructor(props: any) {
		super(props);
		this.state = {
			sortAtrr: true,
			filterRes: false
		};
	}

	doRefresh() {
		// console.log('Begin async operation', event);
		// setTimeout(() => {
		const { user, getAlldata } = this.props;
		// console.log('Async operation has ended');
		// console.log('Doing the update call');
		getAlldata(user.id, true);
		// event.detail.complete();
		if (this.refresherRef) {
			// this.refresherRef.current!.complete();
			this.refresherRef.complete();
		}
		// }, 2000);
		// clearTimeout();
	}

	render() {
		const { arr, user } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader
							backBtn={true}
							titleString={Translate(lsInj.transDict.CatMultiple)}
							filter_Sort_Btn={true}
							sort_buttonBoolean={() => {
								this.setState({ sortAtrr: !this.state.sortAtrr });
							}}
							filter_buttonBoolean={() => {
								this.setState({ filterRes: !this.state.filterRes });
							}}
							refreshBtn={true}
							refreshFunc={() => {
								this.doRefresh();
							}}
						/>
					</IonHeader>
					<IonRefresher
						style={{ zIndex: 10000000 }}
						slot='fixed'
						closeDuration='9000ms'
						snapbackDuration='10ms'
						pullFactor={2}
						ref={(r) => {
							if (r) {
								this.refresherRef = r;
							}
						}}
						onIonRefresh={() => this.doRefresh()}>
						<IonRefresherContent pullingIcon='bubbles' refreshingSpinner='bubbles' />
					</IonRefresher>
					<br />
					<br />
					<br />
					<FilterCats filter={this.state.filterRes} sort={this.state.sortAtrr} orginalCatContent={arr} lang={user.lang} redirectLink={`/dashboard/categories/selectedCategory`} />
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('UserCategoryPage', ownProps);
	// console.log('state', state.user.categories, convertObjectToArray(state.user.categories));
	return {
		user: state.user,
		arr: convertObjectToArray(state.user.categories)
	};
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCategoryPage);
