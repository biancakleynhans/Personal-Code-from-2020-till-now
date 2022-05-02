import React, { Component, Dispatch } from 'react';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { connect } from 'react-redux';
import { IonPage, IonContent, IonHeader, IonRefresher, IonRefresherContent } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { IAppState } from '../../../services/redux/reduxModels';
import FilterCats from '../../../layout/AppComponents/FilterCats';
import { Global_GetAllData_AtStartUp } from '../../../services/redux/actions/GlobalAction';

interface iState {
	sortAtrr: boolean;
	filterRes: boolean;
}

class GroupCategoryPage extends Component<any, iState> {
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
					<br />
					<br />
					<br />
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
					<FilterCats
						filter={this.state.filterRes}
						sort={this.state.sortAtrr}
						orginalCatContent={arr}
						lang={user.lang}
						redirectLink={`/groups/selectedGroup/${this.props.match.params.groupname}/selectedCatagory`}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('GroupCategoryPage', ownProps.match.params.groupname);

	const gName = ownProps.match.params.groupname;
	const global = state.groups.GlobalGroups[gName] !== undefined ? state.groups.GlobalGroups[gName] : undefined;
	const user = state.groups.UserGroups[gName] !== undefined ? state.groups.UserGroups[gName] : undefined;

	const use = global !== undefined ? global.categories : user !== undefined ? user.categories : undefined;

	// console.log('global', global);
	// console.log('user', user);
	// console.log('use', use);

	return {
		user: state.user,
		arr: convertObjectToArray(use)
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupCategoryPage);
