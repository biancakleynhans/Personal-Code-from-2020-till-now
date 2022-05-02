import React, { Component, Dispatch } from 'react';
import { IonItem, IonSelect, IonSelectOption, IonPage, IonContent, IonHeader, IonList, IonListHeader, IonButton } from '@ionic/react';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { Times } from '../../../../models/002OwnerModels';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Owner_UpdateNonWorkHoursDaily } from '../../../../services/redux/actions/OwnerActions';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';

interface iState {
	nonWorkTimeStart: string;
	nonWorkTimeEnd: string;
}

class SelectNonWorkingHours extends Component<any, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			nonWorkTimeStart: '05:00',
			nonWorkTimeEnd: '08:00',
		};
	}
	setNonworkTimeStart(e: any) {
		e.preventDefault();
		console.log('e', e);
		this.setState({ nonWorkTimeStart: e.detail.value });
	}

	setNonworkTimeEnd(e: any) {
		e.preventDefault();
		console.log('e', e);
		this.setState({ nonWorkTimeEnd: e.detail.value });
	}

	done() {
		const start = Times.indexOf(this.state.nonWorkTimeStart);
		const end = Times.indexOf(this.state.nonWorkTimeStart);
		const timeAv = Times.slice(start, end + 2);
		console.log('timeAv', timeAv);

		const { user } = this.props;
		var senddata1 = {
			id: user.id,
			timesNotAvailable: timeAv,
		};

		this.props.updateOwnerWorkHours(senddata1);
		RedirectTo(AllRoutesListed.ownerRoutes.dashLanding);
	}

	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.NonWorkHours)} />
					</IonHeader>
					<br />
					<br />
					<br />

					<IonList>
						<IonListHeader>{Translate(lsInj.transDict.From)}</IonListHeader>
						<IonItem>
							<IonSelect value={this.state.nonWorkTimeStart} placeholder={'08:00'} onIonChange={(e) => this.setNonworkTimeStart(e)}>
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
							<IonSelect value={this.state.nonWorkTimeEnd} placeholder={'08:00'} onIonChange={(e) => this.setNonworkTimeEnd(e)}>
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
					{/* <IonItem>
						<IonLabel position='fixed' slot='start'>
							{Translate(lsInj.transDict.NonHours)}
						</IonLabel>

						<IonLabel className='toAndFrom'>from</IonLabel>

						<IonSelect value={this.state.nonWorkTimeStart} placeholder={'08:00'} onIonChange={(e) => this.setNonworkTimeStart(e)}>
							{Times.map((time, index) => {
								return (
									<IonSelectOption key={index} value={time}>
										{time}
									</IonSelectOption>
								);
							})}
						</IonSelect>

						<IonLabel className='toAndFrom'>to</IonLabel>

						<IonSelect value={this.state.nonWorkTimeEnd} placeholder={'08:00'} onIonChange={(e) => this.setNonworkTimeEnd(e)}>
							{Times.map((time, index) => {
								return (
									<IonSelectOption key={index} value={time}>
										{time}
									</IonSelectOption>
								);
							})}
						</IonSelect>
					</IonItem> */}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('dash props:', state.user.categories);
	return {
		user: state.owner.owner,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		updateOwnerWorkHours: (data: any) => dispatch(Owner_UpdateNonWorkHoursDaily(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectNonWorkingHours);
