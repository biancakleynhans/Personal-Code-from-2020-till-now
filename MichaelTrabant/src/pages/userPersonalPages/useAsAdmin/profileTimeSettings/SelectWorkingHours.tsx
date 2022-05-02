import React, { Component, Dispatch } from 'react';
import { IonItem, IonSelect, IonSelectOption, IonPage, IonContent, IonHeader, IonList, IonListHeader, IonButton } from '@ionic/react';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { connect } from 'react-redux';
import { Times } from '../../../../models/002OwnerModels';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Owner_UpdateWorkHoursDaily } from '../../../../services/redux/actions/OwnerActions';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';

interface iState {
	workTimeStart: string;
	workTimeEnd: string;
}

class SelectWorkingHours extends Component<any, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			workTimeStart: '05:00',
			workTimeEnd: '08:00'
		};
	}
	setworkTimeStart(e: any) {
		e.preventDefault();
		console.log('e', e);
		this.setState({ workTimeStart: e.detail.value });
	}

	setworkTimeEnd(e: any) {
		e.preventDefault();
		console.log('e', e);
		this.setState({ workTimeEnd: e.detail.value });
	}

	done() {
		const start = Times.indexOf(this.state.workTimeStart);
		const end = Times.indexOf(this.state.workTimeEnd);
		const timeAv = Times.slice(start, end + 1);
		console.log('timeAv', timeAv);

		const { user } = this.props;
		var senddata1 = {
			id: user.id,
			timesAvailable: timeAv
		};

		this.props.updateOwnerWorkHours(senddata1);
		RedirectTo(AllRoutesListed.ownerRoutes.dashLanding);
	}

	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.workHours)} />
					</IonHeader>
					<br />
					<br />
					<br />

					<IonList>
						<IonListHeader>{Translate(lsInj.transDict.From)}</IonListHeader>
						<IonItem>
							<IonSelect value={this.state.workTimeStart} placeholder={'08:00'} onIonChange={(e) => this.setworkTimeStart(e)}>
								{Times.map((time, index) => {
									return (
										<IonSelectOption key={index} value={time}>
											{time}
										</IonSelectOption>
									);
								})}
							</IonSelect>
						</IonItem>
						<IonListHeader>{Translate(lsInj.transDict.To)}</IonListHeader>
						<IonItem>
							<IonSelect value={this.state.workTimeEnd} placeholder={'08:00'} onIonChange={(e) => this.setworkTimeEnd(e)}>
								{Times.map((time, index) => {
									return (
										<IonSelectOption key={index} value={time}>
											{time}
										</IonSelectOption>
									);
								})}
							</IonSelect>
						</IonItem>

						<IonButton onClick={() => this.done()}>{Translate(lsInj.transDict.Done)}</IonButton>
					</IonList>
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
	return {
		updateOwnerWorkHours: (data: any) => dispatch(Owner_UpdateWorkHoursDaily(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectWorkingHours);
