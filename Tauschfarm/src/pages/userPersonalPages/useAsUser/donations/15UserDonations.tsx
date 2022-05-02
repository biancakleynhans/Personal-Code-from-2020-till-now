import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonToolbar, IonHeader, IonText, IonCard, IonRefresher, IonRefresherContent } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { IAppState } from '../../../../services/redux/reduxModels';
import FilterDonsContent from '../../../../layout/AppComponents/FilterDonsContent';
import { Global_GetAllData_AtStartUp } from '../../../../services/redux/actions/GlobalAction';

interface iState {
	sortAtrr: boolean;
	filterRes: boolean;
}

class UserDonations extends Component<any, iState> {
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
		// console.log('donations', this.props.donations);
		const { loading, donations, lang } = this.props;
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

					<IonToolbar>
						<IonText>{Translate(lsInj.transDict.donsAll)}</IonText>
					</IonToolbar>

					{!loading && (
						<FilterDonsContent
							userOrGlobal='user'
							sort={this.state.sortAtrr}
							filter={this.state.filterRes}
							orginalCatContent={donations}
							lang={lang}
							currentUser={this.props.user}
						/>
					)}

					{loading && <IonCard>{Translate(lsInj.transDict.gettingDons)}</IonCard>}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('donations:',state.user.donations);
	return {
		donations: convertObjectToArray(state.user.donations),
		loading: state.user.isEmpty,
		lang: state.user.lang,
		user: state.user
	};
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDonations);
