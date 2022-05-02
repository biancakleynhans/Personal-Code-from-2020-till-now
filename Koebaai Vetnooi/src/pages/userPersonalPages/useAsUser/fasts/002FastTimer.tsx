import React, { Dispatch } from 'react';
import moment from 'moment';
import { IonContent, IonPage, IonText, IonCard, IonButton, IonChip, IonLabel, IonGrid, IonRow, IonCol, IonCardTitle, IonHeader } from '@ionic/react';
import { FastProgressText } from '../../../../models/FastModels';
import { getType, setTimerRunning, removeTimerRunning } from '../../../../services/helpers/FastCache';
import { GetDurationTextRunning, GetDurationTextRemaining } from '../../../../services/helpers/FastUtil';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import FastTimerComponent from '../../../../layout/Loading_Redirecting/FastTimerComponent';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { SaveFast, SaveStarttimeOfCurrentFast, DeleteStarttimeOfCurrentFast } from '../../../../services/redux/actions/002FastActions';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';

interface iState {
	typeofFast: {
		name: string;
		lengthofFast: number;
		nonFastingTime: number;
		isSet: boolean;
	};
	currentFast: {
		id: string;
		started: boolean;
		startTime: Date;
		endTime: Date;
		duration: Number;
		typeofFast: { name: String; lengthofFast: Number; nonFastingTime: Number };
	};
	FastText: string;
	DurationPercent: number;
}

function endTimemaker(startTime: any, length: number) {
	const add = moment(startTime).add(length, 'hours').toDate();
	const newDate = new Date(add);
	return newDate;
}

class FastTimerPage extends React.Component<any, iState> {
	TimerRunningDisplay: string = '0:0:0:00';
	TimerRemainingDisplay: string = '0:0:0:00';
	DurationDisplayString: string = '0.0 %';
	DurationRemainingDisplayString: string = '0.0 %';
	interval: any;

	constructor(props: any) {
		super(props);
		const { isRunningFastAlready } = this.props;
		this.state = {
			typeofFast: getType() !== undefined ? getType() : { name: '', lengthofFast: 0, nonFastingTime: 0, isSet: false },
			currentFast: {
				id: isRunningFastAlready.startTime > 0 ? isRunningFastAlready.id : new Date().getTime(),
				started: isRunningFastAlready.startTime > 0 ? true : false,
				startTime: isRunningFastAlready.startTime > 0 ? new Date(isRunningFastAlready.startTime) : new Date(),
				endTime: new Date(),
				duration: 0,
				typeofFast: getType() !== undefined ? getType() : { name: '', lengthofFast: 0, nonFastingTime: 0 }
			},
			FastText: '',
			DurationPercent: 0
		};

		if (this.state.typeofFast.isSet !== false) {
			console.log('HERE type of fast', this.state.typeofFast);
		} else {
			// console.log("NOT HERE type of fast");
			RedirectTo(AllRoutesListed.fastRoutes.fastType);
		}

		this.state.currentFast.endTime = new Date(endTimemaker(this.state.currentFast.startTime, this.state.typeofFast.lengthofFast));
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps !== this.props) {
			const type = getType() !== undefined ? getType() : { name: '', lengthofFast: 0, nonFastingTime: 0, isSet: false };
			var newSate = {
				typeofFast: type,
				currentFast: {
					id: this.props.isRunningFastAlready.startTime > 0 ? this.props.isRunningFastAlready.id : new Date().getTime(),
					started: this.props.isRunningFastAlready.startTime > 0 ? true : false,
					startTime: this.props.isRunningFastAlready.startTime > 0 ? new Date(this.props.isRunningFastAlready.startTime) : new Date(),
					endTime: endTimemaker(this.props.isRunningFastAlready.startTime, type.lengthofFast),
					duration: 0,
					typeofFast: type
				},
				FastText: '',
				DurationPercent: 0
			};

			this.setState(newSate);
		}
	}

	componentDidMount() {
		if (this.state.currentFast.started) {
			this.Timer(this.state.currentFast.startTime);
		}
	}

	componentWillUnmount() {
		if (this.interval) {
			clearTimeout(this.interval);
		}
	}

	Timer(start: Date) {
		const f = () => {
			this.setFastingText();
			this.TimerRunningDisplay = GetDurationTextRunning(start);
			this.TimerRemainingDisplay = GetDurationTextRemaining(this.state.currentFast.endTime);
			this.getDurRunning();
			this.getDurRemaining();
			this.interval = setTimeout(f, 1000);
		};
		f();
	}

	getDurRunning() {
		var start = this.state.currentFast.startTime.getTime();
		var dur = new Date().getTime() - start; //in millisec
		// console.log("getDurRunning => dur",dur)

		if (this.state.typeofFast !== undefined && dur !== undefined && start !== undefined) {
			var fstD = this.state.typeofFast.lengthofFast * 3600000;
			var diff = dur / fstD;
			// console.log(diff, "diff")

			var perDiff = diff * 100;
			// this.DurationPercent = perDiff;
			this.setState({ DurationPercent: perDiff });

			var rs = `${perDiff.toFixed(2)} %`;
			this.DurationDisplayString = rs;
			// console.log("this.dispDur",rs)
		}
	}

	getDurRemaining() {
		var durRemaining = this.state.currentFast.endTime.getTime() - new Date().getTime();
		// console.log('getDurRemaining dur =>', durRemaining);

		if (this.state.typeofFast !== undefined && durRemaining !== undefined) {
			var fstD = this.state.typeofFast.lengthofFast * 3600000;

			var diff = durRemaining / fstD;
			// console.log(diff, "diff")

			var perDiff = diff * 100;
			// console.log(perDiff, "perDiff")

			var rs = `${perDiff.toFixed(2)} %`;
			this.DurationRemainingDisplayString = rs;
			// console.log("this.dispDur",rs)
		}
	}

	setFastingText() {
		if (this.state.DurationPercent === 0) {
			this.setState({ FastText: FastProgressText.beforeStart });
		} else if (this.state.DurationPercent >= 0 && this.state.DurationPercent <= 25) {
			this.setState({ FastText: FastProgressText.start });
		} else if (this.state.DurationPercent >= 25 && this.state.DurationPercent <= 50) {
			this.setState({ FastText: FastProgressText.firstQuarter });
		} else if (this.state.DurationPercent >= 50 && this.state.DurationPercent <= 75) {
			this.setState({ FastText: FastProgressText.half });
		} else if (this.state.DurationPercent >= 75 && this.state.DurationPercent <= 100) {
			this.setState({ FastText: FastProgressText.lastQuarter });
		} else if (this.state.DurationPercent === 100) {
			this.setState({ FastText: FastProgressText.end });
		} else if (this.state.DurationPercent >= 100) {
			this.setState({ FastText: FastProgressText.pastEnd });
		} else {
			this.setState({ FastText: '' });
		}
	}

	StartOrEnd(trigger: boolean) {
		// console.log('trigger',trigger)
		if (trigger) {
			return this.endBTN();
		}
		return this.startBTN();
	}

	startButtonFunction() {
		const { user } = this.props;
		var x = moment(new Date()).add(this.state.typeofFast.lengthofFast, 'hours').toString();
		var running = {
			started: true,
			startTime: new Date(),
			id: this.state.currentFast.id,
			endTime: new Date(x),
			duration: 0,
			typeofFast: this.state.currentFast.typeofFast
		};
		this.setState({ currentFast: running });
		this.Timer(this.state.currentFast.startTime);
		setTimerRunning(this.state.currentFast.startTime);

		var sendStart = {
			fast: {
				startTime: new Date().getTime(),
				id: new Date().getTime()
			},
			userId: user.id
		};

		this.props.saveStartOfCurrentFast(sendStart);
	}

	startBTN() {
		// console.log("start")
		return (
			<IonRow align-items-center>
				<IonCol>
					<IonButton className='btn' onClick={() => this.startButtonFunction()}>
						{Translate(lsInj.transDict.startTimer)}
					</IonButton>
				</IonCol>
			</IonRow>
		);
	}

	endBTN() {
		// console.log("end")
		return (
			<IonRow align-items-center>
				<IonCol>
					<IonButton onClick={() => this.SubmitAndSaveFast()}>{Translate(lsInj.transDict.endTimer)}</IonButton>
					<br />
				</IonCol>
			</IonRow>
		);
	}

	SubmitAndSaveFast() {
		console.log('pressed save', this.state);
		const { user } = this.props;

		var id = this.state.currentFast.startTime.getTime();

		var dur = this.state.currentFast.endTime.getTime() - this.state.currentFast.startTime.getTime();

		var sendFastData = {
			userId: user.id,
			fast: {
				id: id,
				startTime: this.state.currentFast.startTime.getTime(),
				endTime: this.state.currentFast.endTime.getTime(),
				duration: dur,
				typeofFast: this.state.currentFast.typeofFast
			}
		};

		var sendEnd = {
			fast: {
				startTime: 0,
				id: ''
			},
			userId: user.id
		};

		console.log('sendFastData', sendFastData);
		this.props.saveFast(sendFastData);
		this.props.deleteStartOfCurrentFast(sendEnd);
		this.resetTimer();
	}

	resetTimer() {
		removeTimerRunning();
		this.setState({
			typeofFast: {
				name: '',
				lengthofFast: 0,
				nonFastingTime: 0,
				isSet: false
			},
			currentFast: {
				id: '',
				started: false,
				startTime: new Date(),
				endTime: new Date(),
				duration: 0,
				typeofFast: { name: '', lengthofFast: 0, nonFastingTime: 0 }
			},
			FastText: 'Klaar met u vas tydperk',
			DurationPercent: 0
		});
		this.TimerRunningDisplay = '0:0:0:00';
		this.TimerRemainingDisplay = '0:0:0:00';
		this.DurationDisplayString = '0.0 %';
		this.DurationRemainingDisplayString = '0.0 %';
		clearInterval(this.interval);
		this.interval = null;
	}

	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.FastTimer)} />
					</IonHeader>
					<br /> <br />
					<br />
					<IonCard className='ion-card-padding'>
						<IonGrid>
							<IonRow align-items-center>
								<IonCol>
									<IonCardTitle style={{ color: 'var(--ion-color-primary)' }}>{this.state.FastText}</IonCardTitle>
								</IonCol>
							</IonRow>

							<IonRow align-items-center>
								<IonCol>
									<IonChip>
										<IonLabel>{this.state.typeofFast.name}</IonLabel>
									</IonChip>
								</IonCol>
							</IonRow>

							<IonRow>
								<IonCol>
									<FastTimerComponent
										value={this.state.DurationPercent}
										donePer={this.DurationDisplayString}
										doneTimer={this.TimerRunningDisplay}
										remPer={this.DurationRemainingDisplayString}
										remTimer={this.TimerRemainingDisplay}
									/>
								</IonCol>
							</IonRow>

							<IonRow>
								<IonCol>
									<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.startFast)}</IonCardTitle>
									<IonText style={{ color: 'var(--ion-text-color)' }}>{moment(this.state.currentFast.startTime).format('Do MMMM, h:mm a')}</IonText>
								</IonCol>
								<IonCol>
									<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.endFast)}</IonCardTitle>
									<IonText style={{ color: 'var(--ion-text-color)' }}>{moment(this.state.currentFast.endTime).format('Do MMMM, h:mm a')}</IonText>
								</IonCol>
							</IonRow>

							<IonRow align-items-center>
								<IonCol>{this.StartOrEnd(this.state.currentFast.started)}</IonCol>
							</IonRow>
						</IonGrid>
					</IonCard>
					<IonButton routerLink={AllRoutesListed.fastRoutes.fastType}>{Translate(lsInj.transDict.FastType)}</IonButton>
					<IonButton routerLink={AllRoutesListed.fastRoutes.fastHist}>{Translate(lsInj.transDict.FastHistory)}</IonButton>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		user: state.user,
		isRunningFastAlready: state.fast.currentRunningFast
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		saveFast: (fast: any) => {
			dispatch(SaveFast(fast));
		},
		saveStartOfCurrentFast: (data: any) => dispatch(SaveStarttimeOfCurrentFast(data)),
		deleteStartOfCurrentFast: (data: any) => dispatch(DeleteStarttimeOfCurrentFast(data))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(FastTimerPage);
