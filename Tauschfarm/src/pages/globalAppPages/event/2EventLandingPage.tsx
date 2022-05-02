import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonHeader, IonRefresher, IonRefresherContent } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import SecondaryPageHeader from '../../../layout/Headers/SecondaryPageHeader';
import { connect } from 'react-redux';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { IAppState } from '../../../services/redux/reduxModels';
import { NamedDict } from '../../../services/helpers/Tools';
import { i_BaseInterface_Event } from '../../../models/005EventModels';
import { i_BaseInterface_User } from '../../../models/001UserModels';
import { Global_GetAllData_AtStartUp } from '../../../services/redux/actions/GlobalAction';
import FilterEvents from '../../../layout/AppComponents/FilterEvents';

interface iState {
	sortAtrr: boolean;
	dispAtrr: boolean;
	filter: boolean;
}

class EventLandingPage extends Component<any, iState> {
	refresherRef: HTMLIonRefresherElement | undefined;
	constructor(props: any) {
		super(props);
		this.state = {
			sortAtrr: false,
			filter: false,
			dispAtrr: false
			// clickedFab: false
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
		const { loading, user, eventUser, eventsGlobal } = this.props;
		// console.log('??', this.state.sortAtrr, this.state.filter, this.state.dispAtrr);
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader
							backBtn={true}
							titleString={Translate(lsInj.transDict.Event)}
							refreshBtn={true}
							refreshFunc={() => {
								this.doRefresh();
							}}
						/>
					</IonHeader>{' '}
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
					{!loading && (
						<>
							<SecondaryPageHeader
								filter_Sort_Btn={true}
								sort_buttonBoolean={() => {
									this.setState({ sortAtrr: !this.state.sortAtrr });
								}}
								filter_buttonBoolean={() => {
									this.setState({ filter: !this.state.filter });
								}}
								eventsBtn={true}
								eventFunc={() => {
									this.setState({ dispAtrr: !this.state.dispAtrr });
								}}
								eventSet={this.state.dispAtrr}
							/>
							{/* {this.state.dispAtrr ? this.renderGlobalEvents() : this.renderUserEvents()} */}
							{!this.state.dispAtrr && (
								<FilterEvents
									orginalEventContent={eventUser}
									filter={this.state.filter}
									sort={this.state.filter}
									lang={user.lang}
									currentUser={user}
									filter_buttonBoolean={() => {
										this.setState({ filter: !this.state.filter });
									}}
									sort_buttonBoolean={() => {
										this.setState({ sortAtrr: !this.state.sortAtrr });
									}}
								/>
							)}
							{this.state.dispAtrr && (
								<FilterEvents
									orginalEventContent={eventsGlobal}
									filter={this.state.filter}
									sort={this.state.sortAtrr}
									lang={user.lang}
									currentUser={user}
									filter_buttonBoolean={() => {
										this.setState({ filter: !this.state.filter });
									}}
									sort_buttonBoolean={() => {
										this.setState({ sortAtrr: !this.state.sortAtrr });
									}}
								/>
							)}
						</>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('Event ', convertObjectToArray(state.user.events));

	var globalEvents: NamedDict<i_BaseInterface_Event> = {};

	if (convertObjectToArray(state.globalUsers.GlobalUsers).length > 0) {
		convertObjectToArray(state.globalUsers.GlobalUsers).map((user: i_BaseInterface_User) => {
			convertObjectToArray(user.events).map((ev: i_BaseInterface_Event) => {
				globalEvents = {
					...globalEvents,
					[ev.id]: ev
				};
				return globalEvents;
			});
			return globalEvents;
		});
	}

	// console.log('globalEvents', globalEvents);

	return {
		loading: state.user.isEmpty,
		user: state.user,
		eventUser: convertObjectToArray(state.user.events),
		eventsGlobal: convertObjectToArray(globalEvents)
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EventLandingPage);
