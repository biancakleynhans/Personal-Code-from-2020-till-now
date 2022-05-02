import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import BaseCalender from '../../../../components/calendar/BaseCalender';

class SelectExpetionTimes extends Component<any> {
	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.NonHours)} />
					</IonHeader>
					<br />
					<br />
					<br />
					<BaseCalender disabledDays={[]} />
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('dash props:', state.user.categories);
	return {
		user: state.owner.owner
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectExpetionTimes);
