import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonHeader, IonFooter } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { connect } from 'react-redux';
import { HeaderCard } from '../../../layout/Headers/HeaderCards';
import { CombinedString } from '../../../services/translate/CombinedStrings';
import HomeSkeletonScreen from '../../../layout/Loading_Redirecting/SkeletonScreen';
import PageFooter from '../../../layout/Headers/PageFooter';
import { IAppState } from '../../../services/redux/reduxModels';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { GLOBALCATS, Global_GetAllData_AtStartUp } from '../../../services/redux/actions/GlobalAction';
import { i_BaseInterface_User } from '../../../models/001UserModels';
import { i_BaseInterface_Group } from '../../../models/004GroupModels';
import { i_BaseInterface_Donation } from '../../../models/0003DonationModels';
import { i_BaseInterface_Event } from '../../../models/005EventModels';
import CardSliders from '../../../layout/CardContainers/CardSliders';
import { IonRefresher, IonRefresherContent } from '@ionic/react';

interface iState {
	globalUsers: any[];
	donsGlobal: any[];
	eventsGlobal: any[];
	groupsGlobal: any[];
	catsGlobal: any[];
}

class HomePage extends Component<any, iState> {
	refresherRef: HTMLIonRefresherElement | undefined;
	constructor(props: any) {
		super(props);
		this.state = {
			globalUsers: this.props.globalUsers,
			donsGlobal: this.props.donsGlobal,
			eventsGlobal: this.props.eventsGlobal,
			groupsGlobal: this.props.groupsGlobal,
			catsGlobal: this.props.catsGlobal
		};
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps !== this.props) {
			this.setState({
				globalUsers: this.props.globalUsers,
				donsGlobal: this.props.donsGlobal,
				eventsGlobal: this.props.eventsGlobal,
				groupsGlobal: this.props.groupsGlobal,
				catsGlobal: this.props.catsGlobal
			});
		}
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

	renderDisp() {
		const { user } = this.props;
		return (
			<IonGrid>
				<IonRow>{HeaderCard(CombinedString.homePageHeaderCats, '/categories', true)}</IonRow>
				<IonRow>
					{this.state.catsGlobal.length > 0 && (
						<CardSliders
							lang={user.lang}
							slidesContent={this.state.catsGlobal}
							type='cat'
							currentUserLoggendIn={user.id}
							currentUserAsMem={{ name: user.name, avatar: user.avatar, id: user.id }}
						/>
					)}
				</IonRow>

				{/* Donations */}

				<IonRow>{HeaderCard(CombinedString.homePageHeaderDons, '/donations', true)}</IonRow>
				<IonRow>
					{this.state.donsGlobal.length > 0 && (
						<CardSliders
							lang={user.lang}
							slidesContent={this.state.donsGlobal}
							type='dons'
							currentUserLoggendIn={user.id}
							currentUserAsMem={{ name: user.name, avatar: user.avatar, id: user.id }}
						/>
					)}
				</IonRow>

				{/* Events */}

				<IonRow>{HeaderCard(CombinedString.homePageHeaderEvents, '/events', true)}</IonRow>
				<IonRow>
					{this.state.eventsGlobal.length > 0 && (
						<CardSliders
							lang={user.lang}
							slidesContent={this.state.eventsGlobal}
							type='event'
							currentUserLoggendIn={user.id}
							currentUserAsMem={{ name: user.name, avatar: user.avatar, id: user.id }}
						/>
					)}
				</IonRow>

				{/* Groups */}

				<IonRow>{HeaderCard(CombinedString.homePageHeaderGroups, '/groups', true)}</IonRow>
				<IonRow>
					{this.state.groupsGlobal.length > 0 && (
						<CardSliders
							lang={user.lang}
							slidesContent={this.state.groupsGlobal}
							type='group'
							currentUserLoggendIn={user.id}
							currentUserAsMem={{ name: user.name, avatar: user.avatar, id: user.id }}
						/>
					)}
				</IonRow>

				{/* Members  */}

				<IonRow>{HeaderCard(Translate(lsInj.transDict.Members), '/AllUsersOfthisApp', true)}</IonRow>
				<IonRow>
					{this.state.globalUsers.length > 0 && (
						<CardSliders
							lang={user.lang}
							slidesContent={this.state.globalUsers}
							type='members'
							currentUserLoggendIn={user.id}
							currentUserAsMem={{ name: user.name, avatar: user.avatar, id: user.id }}
						/>
					)}
				</IonRow>
			</IonGrid>
		);
	}

	render() {
		// console.log('isEmpty', this.props.loading);
		const { user, tlC } = this.props;
		return (
			<IonPage>
				<IonContent>
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

					<IonHeader slot='fixed'>
						<PageHeader
							menuBtn={true}
							support={true}
							refreshBtn={true}
							tlBtn={true}
							tlCount={tlC}
							refreshFunc={() => {
								this.doRefresh();
							}}
						/>
					</IonHeader>
					<br />
					<br />
					<br />

					{!this.props.loading && this.renderDisp()}
					{this.props.loading && <HomeSkeletonScreen />}

					<IonFooter>
						<PageFooter />
					</IonFooter>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('home state:', state);
	// console.log('isEmpty', state.user.isEmpty);

	var uEvents: any[] = state.user.events ? convertObjectToArray(state.user.events) : [];
	var uGroups: any[] = state.groups.UserGroups ? convertObjectToArray(state.groups.UserGroups) : [];
	var uDons: any[] = state.user.donations ? convertObjectToArray(state.user.donations) : [];

	var gEvents: any[] = [];
	var gGroups: any[] = [];
	var gDons: any[] = [];

	convertObjectToArray(state.globalUsers.GlobalUsers).forEach((gUser: i_BaseInterface_User) => {
		convertObjectToArray(gUser.donations).forEach((don: i_BaseInterface_Donation) => {
			gDons.push(don);
			// console.log('gDons', gDons);
			return gDons;
		});
		convertObjectToArray(gUser.events).forEach((event: i_BaseInterface_Event) => {
			gEvents.push(event);
			// console.log('gEvents', gEvents);
			return gEvents;
		});

		// console.log('????', gDons, gEvents);
		return { gDons, gEvents };
	});

	convertObjectToArray(state.groups.GlobalGroups).forEach((group: i_BaseInterface_Group) => {
		// console.log('???', group);
		gGroups.push(group);
		return gGroups;
	});

	var events: any[] = uEvents.concat(gEvents).sort(sortByTextAsc); //[...uEvents, ...gEvents]; //
	var groups: any[] = uGroups.concat(gGroups).sort(sortByTextAsc); //[...uGroups, ...gGroups]; //
	var dons: any[] = uDons.concat(gDons).sort(sortByTextAsc); //[...uDons, ...gDons]; //
	var cats = GLOBALCATS(state.user, state.groups.UserGroups, state.groups.GlobalGroups, state.globalUsers.GlobalUsers);

	return {
		user: state.user,
		userLoc: state.user.location,
		loading: state.user.isEmpty,
		globalUsers: convertObjectToArray(state.globalUsers.GlobalUsers).sort(sortByTextAsc),
		catsGlobal: cats.sort(sortByTextAsc),
		eventsGlobal: events.sort(sortByTextAsc),
		groupsGlobal: groups.sort(sortByTextAsc),
		donsGlobal: dons.sort(sortByTextAsc),
		tlC: state.timeline.count
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

function sortByTextAsc(a: any, b: any) {
	// console.log('a', a);
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * -diff;
	} else return 1;
}
