import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonHeader, IonGrid, IonRefresher, IonRefresherContent } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/reduxModels';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { i_BaseInterface_User } from '../../../models/001UserModels';
import { i_BaseInterface_Donation } from '../../../models/0003DonationModels';
import FilterDonsContent from '../../../layout/AppComponents/FilterDonsContent';
import { Global_GetAllData_AtStartUp } from '../../../services/redux/actions/GlobalAction';

interface iState {
	sortAtrr: boolean;
	filterRes: boolean;
}

class GlobalDontationsLandingPage extends Component<any, iState> {
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
		const { donsGlobal, lang } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader
							backBtn={true}
							titleString={Translate(lsInj.transDict.Donations)}
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
					<IonGrid>
						<FilterDonsContent
							userOrGlobal='global'
							sort={this.state.sortAtrr}
							filter={this.state.filterRes}
							orginalCatContent={donsGlobal}
							lang={lang}
							currentUser={this.props.user}
						/>
					</IonGrid>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	const uDons = state.user.donations ? convertObjectToArray(state.user.donations) : [];
	const gDons: any[] = [];

	convertObjectToArray(state.globalUsers.GlobalUsers).map((user: i_BaseInterface_User) => {
		convertObjectToArray(user.donations).map((don: i_BaseInterface_Donation) => {
			// console.log('don', don);
			gDons.push(don);
			return gDons;
		});
		return gDons;
	});

	const dons = uDons.concat(gDons);

	// console.log('gDons', gDons);
	// console.log('dons', dons);
	return {
		donsGlobal: dons,
		lang: state.user.lang,
		user: state.user
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalDontationsLandingPage);
