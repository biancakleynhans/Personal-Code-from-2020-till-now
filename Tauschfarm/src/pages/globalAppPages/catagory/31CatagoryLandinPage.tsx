import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonHeader, IonItem, IonLabel, IonSelect, IonSelectOption, IonRefresher, IonRefresherContent } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { IAppState } from '../../../services/redux/reduxModels';
import { GLOBALCATS, Global_GetAllData_AtStartUp } from '../../../services/redux/actions/GlobalAction';
import { AppStartGloabalBase_Categories } from '../../../models/AppStartGlobal_CatSetUp';
import FilterCats from '../../../layout/AppComponents/FilterCats';

interface iState {
	sortAtrr: boolean;
	filterRes: boolean;
}

export function renderCatSelection(func: any, lang: 'en' | 'de') {
	return (
		<IonItem>
			<IonLabel>{Translate(lsInj.transDict.catMultiple)}</IonLabel>
			<IonSelect
				multiple
				onIonChange={(e) => {
					func(e);
				}}
				cancelText={Translate(lsInj.transDict.Cancel)}
				okText={Translate(lsInj.transDict.Done)}>
				{convertObjectToArray(AppStartGloabalBase_Categories(lang)).map((i, index: number) => {
					// console.log('what happend ?', i);
					return (
						<IonSelectOption key={index} value={i}>
							{i.name}
						</IonSelectOption>
					);
				})}
			</IonSelect>
		</IonItem>
	);
}

class CategoryLandinPage extends Component<any, iState> {
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
		const { cats, lang } = this.props;
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

					<FilterCats filter={this.state.filterRes} sort={this.state.sortAtrr} orginalCatContent={cats} lang={lang} redirectLink={`/homeBasedCategories/user`} />
				</IonContent>
			</IonPage>
		);
	}
}
const mapStateToProps = (state: IAppState) => {
	// console.log('??????????? wtf ????????????????????');
	const g = GLOBALCATS(state.user, state.groups.UserGroups, state.groups.GlobalGroups, state.globalUsers.GlobalUsers);
	return {
		cats: g,
		lang: state.user.lang,
		user: state.user
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		getAlldata: (userId: string, isEmbty: boolean) => dispatch(Global_GetAllData_AtStartUp(userId, isEmbty))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryLandinPage);
