/** @format */

import React from 'react';
import moment from 'moment';
import { IonContent, IonPage, IonText, IonCard, IonButton, IonChip, IonLabel, IonGrid, IonRow, IonCol, IonCardTitle } from '@ionic/react';
import { iTimePeriod, FastProgressText } from '../../models/FastModels';
import { LablesList } from '../../components/titleLists/Titles';
import { getType, getTimerRunning, setTimerRunning, removeTimerRunning } from '../../helpers/FastCache';
import { GetDurationTextRunning, GetDurationTextRemaining } from '../../helpers/FastUtil';
import { isLocalNotify_Mobile, LocalNotify_Mobile_TypeList } from '../../capAddOns/localNotifications/LocalNotify';
import { Add } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import PageHeader from '../../components/layout/PageHeader';
import LoaderWithChilden from '../../components/loader/LoaderWithChildren';

export default class FastTimerPage extends React.Component {
	typeofFast: any;
	CurrentFast: iTimePeriod = { startTime: new Date(), started: false };
	FastText: string = '';
	TimerRunningDisplay: string = '0:0:0:00';
	TimerRemainingDisplay: string = '0:0:0:00';
	DurationDisplayString: string = '0.0 %';
	DurationRemainingDisplayString: string = '0.0 %';
	DateDisplayString: any = LablesList.FastPages.fastTimer.displayStrings.dateDisp.af;
	tmrSecond = undefined;
	interval: any;

	FastStartDate: string = '';
	FastEndDate: string = '';
	fastEnd: Date = new Date();

	DurationPercent: number = 0;

	constructor(props: any) {
		super(props);
		this.typeofFast = getType();
		if (this.typeofFast !== undefined) {
			// console.log("HERE type of fast", this.typeofFast);
			this.CurrentFast.typeofFast = this.typeofFast;
			// console.log("type of fast",this.typeofFast)
		} else {
			// console.log("NOT HERE type of fast");
			window.location.replace('/fastType');
		}
		this.getRunningTimer();

		this.FastStartDate = this.CurrentFast.startTime.toUTCString();
		console.log('FastStartDate', this.FastStartDate);

		var x = moment(this.CurrentFast.startTime)
			.add(this.typeofFast.lengthofFast, 'hours')
			.toString();
		var y = new Date(x);
		this.FastEndDate = y.toUTCString();
		console.log('FastEndDate', this.FastEndDate);
	}

	Timer(start: Date) {
		const f = () => {
			this.setFastingText();
			this.TimerRunningDisplay = GetDurationTextRunning(start);
			this.TimerRemainingDisplay = GetDurationTextRemaining(this.fastEnd);
			this.getDurRunning();
			this.getDurRemaining();
			this.forceUpdate();
			this.interval = setTimeout(f, 1000);
		};
		f();
	}

	getRunningTimer() {
		var d = getTimerRunning();
		if (d !== undefined) {
			// console.log("HERE");
			this.CurrentFast.started = true;
			this.CurrentFast.startTime = new Date(d);
			this.Timer(this.CurrentFast.startTime);
		}
	}

	getDurRunning() {
		var start = this.CurrentFast.startTime.getTime();
		var dur = new Date().getTime() - start; //in millisec
		// console.log("getDurRunning => dur",dur)

		if (this.typeofFast !== undefined && dur !== undefined && start !== undefined) {
			var fstD = this.typeofFast.lengthofFast * 3600000;
			var diff = dur / fstD;
			// console.log(diff, "diff")

			var perDiff = diff * 100;
			this.DurationPercent = perDiff;

			var rs = `${perDiff.toFixed(2)} %`;
			this.DurationDisplayString = rs;
			// console.log("this.dispDur",rs)
		}
	}

	getDurRemaining() {
		var date = moment(this.CurrentFast.startTime)
			.add(this.typeofFast.lengthofFast, 'h')
			.toDate();
		// console.log("date",date)
		this.fastEnd = date;

		var durRemaining = date.getTime() - new Date().getTime();
		// console.log("getDurRemaining dur =>",durRemaining)

		if (this.typeofFast !== undefined && durRemaining !== undefined) {
			var fstD = this.typeofFast.lengthofFast * 3600000;

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
		if (this.DurationPercent === 0) {
			this.FastText = FastProgressText.beforeStart;
		}
		if (this.DurationPercent >= 0 && this.DurationPercent <= 25) {
			this.FastText = FastProgressText.start;
		}
		if (this.DurationPercent >= 25 && this.DurationPercent <= 50) {
			this.FastText = FastProgressText.firstQuarter;
			isLocalNotify_Mobile(LocalNotify_Mobile_TypeList.ScheduleNotify, '25% - 50% ', FastProgressText.firstQuarter, true, true, 0, 0, new Date(new Date().getTime()));
		}
		if (this.DurationPercent >= 50 && this.DurationPercent <= 75) {
			this.FastText = FastProgressText.half;
			isLocalNotify_Mobile(LocalNotify_Mobile_TypeList.ScheduleNotify, '50% - 75% ', FastProgressText.half, true, true, 0, 0, new Date(new Date().getTime()));
		}
		if (this.DurationPercent >= 75 && this.DurationPercent <= 100) {
			this.FastText = FastProgressText.lastQuarter;
			isLocalNotify_Mobile(LocalNotify_Mobile_TypeList.ScheduleNotify, '75% - 90% ', FastProgressText.lastQuarter, true, true, 0, 0, new Date(new Date().getTime()));
		}
		if (this.DurationPercent === 100) {
			this.FastText = FastProgressText.end;
			isLocalNotify_Mobile(LocalNotify_Mobile_TypeList.ScheduleNotify, '100%', FastProgressText.end, true, true, 0, 0, new Date(new Date().getTime()));
		}
		if (this.DurationPercent >= 100) {
			this.FastText = FastProgressText.pastEnd;
			isLocalNotify_Mobile(LocalNotify_Mobile_TypeList.ScheduleNotify, '> 100%', FastProgressText.pastEnd, true, true, 0, 0, new Date(new Date().getTime()));
		}
	}

	StartOrEnd(trigger: boolean) {
		// console.log('trigger',trigger)
		if (trigger) {
			return this.endBTN();
		}
		return this.startBTN();
	}

	startBTN() {
		// console.log("start")
		return (
			<IonRow align-items-center>
				<IonCol>
					<IonButton
						className='btn'
						onClick={() => {
							this.CurrentFast.startTime = new Date();
							this.CurrentFast.started = true;
							this.Timer(this.CurrentFast.startTime);
							setTimerRunning(this.CurrentFast.startTime);
						}}>
						{LablesList.FastPages.fastTimer.buttons.startFast.af}
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
					<IonButton
						onClick={() => {
							clearInterval(this.interval);
							this.CurrentFast.endTime = new Date(new Date().getTime());
							this.CurrentFast.duration = (this.CurrentFast.endTime.getTime() - this.CurrentFast.startTime.getTime()) / 3600000;
							//console.log(this.CurrentFast, "end of fast")
							this.TimerRunningDisplay = 'Klaar met u vas tydperk';
							removeTimerRunning();

							var fastObj = {
								startTime: this.CurrentFast.startTime.toUTCString(),
								endTime: this.CurrentFast.endTime.toUTCString(),
								duration: this.CurrentFast.duration,
								typeofFast: this.CurrentFast.typeofFast
							};

							console.log('fastObj', fastObj);
							Add(TypesToServer.Fast, fastObj);
							window.location.reload();
						}}>
						{LablesList.FastPages.fastTimer.buttons.endFast.af}
					</IonButton>
					<br />
				</IonCol>
			</IonRow>
		);
	}

	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.FastTimer.af} />
				<IonContent>
					<IonCard className='ion-card-padding'>
						<IonGrid>
							<IonRow align-items-center>
								<IonCol>
									<IonCardTitle>{this.FastText}</IonCardTitle>
								</IonCol>
							</IonRow>

							<IonRow align-items-center>
								<IonCol>
									<IonChip>
										<IonLabel>
											{this.typeofFast.name} {LablesList.FastPages.fastTimer.fastT.af}
										</IonLabel>
									</IonChip>
								</IonCol>
							</IonRow>

							<IonRow>
								<IonCol>
									<LoaderWithChilden
										value={this.DurationPercent}
										donePer={this.DurationDisplayString}
										doneTimer={this.TimerRunningDisplay}
										remPer={this.DurationRemainingDisplayString}
										remTimer={this.TimerRemainingDisplay}
									/>
								</IonCol>
							</IonRow>

							<IonRow>
								<IonCol>
									<IonCardTitle>{LablesList.FastPages.fastTimer.start.af}</IonCardTitle>
									<IonText>{this.FastStartDate}</IonText>
								</IonCol>
								<IonCol>
									<IonCardTitle>{LablesList.FastPages.fastTimer.end.af}</IonCardTitle>
									<IonText>{this.FastEndDate}</IonText>
								</IonCol>
							</IonRow>

							<IonRow align-items-center>
								<IonCol>{this.StartOrEnd(this.CurrentFast.started)}</IonCol>
							</IonRow>
						</IonGrid>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}
