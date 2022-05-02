import React, { Dispatch } from 'react';
import moment from 'moment';
import { IonPage, IonContent, IonCard, IonItem, IonLabel, IonButton, IonDatetime, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { connect } from 'react-redux';
import { UpdateFast } from '../../../../services/redux/actions/002FastActions';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';

interface IStates {
	id: string;
	fast: {
		id: string;
		startTime: number;
		endTime: number;
		duration: number;
		typeofFast: { name: String; lengthofFast: number; nonFastingTime: number };
	};
}

class FastEditPage extends React.Component<any, IStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			fast: {
				id: this.props.currentFast.id,
				startTime: this.props.currentFast.startTime,
				endTime: this.props.currentFast.endTime,
				duration: this.props.currentFast.duration,
				typeofFast: this.props.currentFast.typeofFast
			}
		};
	}

	startChange(e: any) {
		console.log('start Change', e.detail.value, new Date(e.detail.value).getTime());
		var s = new Date(e.detail.value).getTime();
		var changeStart = {
			id: this.state.fast.id,
			startTime: s,
			endTime: this.state.fast.endTime,
			duration: this.state.fast.duration,
			typeofFast: this.state.fast.typeofFast
		};
		this.setState({ fast: changeStart });
	}
	endChange(e: any) {
		console.log('end Change', e.detail.value, new Date(e.detail.value).getTime());
		var end = new Date(e.detail.value).getTime();
		var changeEnd = {
			id: this.state.fast.id,
			startTime: this.state.fast.startTime,
			endTime: end,
			duration: this.state.fast.duration,
			typeofFast: this.state.fast.typeofFast
		};
		this.setState({ fast: changeEnd });
	}
	saveChanges() {
		const { user } = this.props;
		var dur = this.state.fast.endTime - this.state.fast.startTime;

		var change = {
			userId: user.id,
			fast: {
				id: this.state.fast.id,
				startTime: this.state.fast.startTime,
				endTime: this.state.fast.endTime,
				duration: dur,
				typeofFast: this.state.fast.typeofFast
			}
		};
		console.log('changeEnd', change);
		this.props.udpateFast(change);
		RedirectTo(AllRoutesListed.fastRoutes.fastHist);
	}

	render() {
		// console.log(this.state, 'what do i get');
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.FastEdit)} />
					</IonHeader>
					<br /> <br /> <br />
					<IonCard style={{ color: 'var(--ion-text-color)' }}>
						<IonItem>
							<IonLabel position='floating'>
								{Translate(lsInj.transDict.startFast)}: {moment(new Date(this.state.fast.startTime)).format('lll')}
							</IonLabel>

							<IonDatetime displayFormat='D MMM YYYY H:mm' value={new Date(this.state.fast.startTime).toISOString()} onIonChange={(e) => this.startChange(e)} />
						</IonItem>

						<IonItem>
							<IonLabel position='floating'>
								{Translate(lsInj.transDict.endFast)}: {moment(new Date(this.state.fast.endTime)).format('lll')}
							</IonLabel>

							<IonDatetime displayFormat='D MMM YYYY H:mm' value={new Date(this.state.fast.endTime).toISOString()} onIonChange={(e) => this.endChange(e)} />
						</IonItem>

						<IonButton color='primary' onClick={() => this.saveChanges()}>
							{Translate(lsInj.transDict.Publish)}
						</IonButton>
						<IonButton
							color='primary'
							type='button'
							onClick={() => {
								return this.props.hist.goBack();
							}}>
							{Translate(lsInj.transDict.Cancel)}
						</IonButton>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('ownProps', ownProps, state.fast.Fasts[ownProps.match.params.id]);
	return {
		user: state.user,
		currentFast: state.fast.Fasts[ownProps.match.params.id],
		hist: ownProps.history
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		udpateFast: (fast: any) => dispatch(UpdateFast(fast))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(FastEditPage);
