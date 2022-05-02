import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonHeader, IonGrid, IonRow, IonRefresher, IonRefresherContent } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import SecondaryPageHeader from '../../../layout/Headers/SecondaryPageHeader';
import { connect } from 'react-redux';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { Redirect } from 'react-router';
import { IAppState } from '../../../services/redux/reduxModels';
import { Global_GetAllData_AtStartUp } from '../../../services/redux/actions/GlobalAction';
import FilterGroups from '../../../layout/AppComponents/FilterGroups';

interface iState {
	sortAtrr: boolean;
	dispAtrr: boolean;
	globalGroups: any[];
	filter: boolean;
}

class GroupLandingPage extends Component<any, iState> {
	refresherRef: HTMLIonRefresherElement | undefined;
	constructor(props: any) {
		super(props);
		this.state = {
			sortAtrr: false,
			dispAtrr: false,
			filter: false,
			globalGroups: this.props.groupsGlobal
		};
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.groupsGlobal !== this.props.groupsGlobal) {
			this.setState({ globalGroups: this.props.groupsGlobal });
		}
	}

	renderUserGroups() {
		var from = window.location.pathname;
		return <Redirect to='/dashboard/groups' from={from} />;
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
		const { groupsGlobal, user } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader
							backBtn={true}
							titleString={Translate(lsInj.transDict.Group)}
							refreshBtn={true}
							refreshFunc={() => {
								this.doRefresh();
							}}
						/>
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<SecondaryPageHeader
						filter_Sort_Btn={true}
						sort_buttonBoolean={() => {
							this.setState({ sortAtrr: !this.state.sortAtrr });
						}}
						filter_buttonBoolean={() => {
							this.setState({ filter: !this.state.filter });
						}}
						groupsBtn={true}
						groupsFunc={() => {
							this.setState({ dispAtrr: !this.state.dispAtrr });
						}}
						groupsSet={this.state.dispAtrr}
					/>
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
					<IonGrid>
						<IonRow>
							{!this.state.dispAtrr && (
								<FilterGroups
									sort={this.state.sortAtrr}
									filter={this.state.filter}
									orginalGroupContent={groupsGlobal}
									lang={user.lang}
									// routerLink: string;
									currentUser={user}
									filter_buttonBoolean={() => {
										this.setState({ filter: !this.state.filter });
									}}
									sort_buttonBoolean={() => {
										this.setState({ sortAtrr: !this.state.filter });
									}}
								/>
							)}
							{this.state.dispAtrr && this.renderUserGroups()}
						</IonRow>
					</IonGrid>
				</IonContent>
			</IonPage>
		);
	}
}
const mapStateToProps = (state: IAppState) => {
	// console.log('GroupLandingPage', state);
	return {
		user: state.user,
		groupsGlobal: convertObjectToArray(state.groups.GlobalGroups)
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupLandingPage);
