import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonHeader, IonRefresher, IonRefresherContent } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/reduxModels';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { Translate } from '../../../services/translate/TranslateServices';
import CategoriesToChosefrom from '../../../services/translate/OptionsDict/CatagoriesToChoseFrom';
import { GLOBALCATS, Global_GetAllData_AtStartUp } from '../../../services/redux/actions/GlobalAction';
import FilterCatContent from '../../../layout/AppComponents/FilterCatContent';

interface iState {
	sortAtrr: boolean;
	filterRes: boolean;
}

export class MiddlePageFromCatsFromHomeScreen extends Component<any, iState> {
	refresherRef: HTMLIonRefresherElement | undefined;
	constructor(props: any) {
		super(props);
		this.state = {
			sortAtrr: false,
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
		const { catsTodisplay, user } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader
							backBtn={true}
							titleString={Translate(CategoriesToChosefrom.transDict[this.props.match.params.catName])}
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

					<FilterCatContent
						sort={this.state.sortAtrr}
						filter={this.state.filterRes}
						orginalCatContent={catsTodisplay}
						lang={user.lang}
						routerLink={''}
						currentUser={this.props.user}
					/>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('MiddlePageFromCatsFromHomeScreen', ownProps.match.params);
	// console.log('state', state);

	var g = GLOBALCATS(state.user, state.groups.UserGroups, state.groups.GlobalGroups, state.globalUsers.GlobalUsers);

	var dispLay: any[] = [];
	g.map((entry: any) => {
		if (entry.checkMatch === ownProps.match.params.catName) {
			convertObjectToArray(entry.items).map((item: any) => {
				item.useLine = item.id.split('-').length === 2 ? 'NotGroup' : 'Group'; //`${item.id.split('-')[0]}-${item.id.split('-')[1]}`;
				// console.log('item.useline', item.useLine);
				dispLay.push(item);
				return dispLay;
			});
			return dispLay;
		}
		return dispLay;
	});

	console.log('dispLay', dispLay);

	return {
		catsTodisplay: dispLay,
		user: state.user
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MiddlePageFromCatsFromHomeScreen);
