import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonPopover } from '@ionic/react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseCalender from '../../../components/calendar/BaseCalender';
import PageHeader from '../../../layout/Headers/PageHeader';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { FakeYear } from '../../../services/redux/actions/GlobalActionHelpers';
import { IAppState } from '../../../services/redux/ReduxModels';
import { BookingCompleted } from '../useAsUser/UserCalendarLandingPage';

interface iState {
	showTimePopup: boolean;
	showOptionsPopUp: boolean;
	timeSelected: string;
	daySelected: number;
	yearSeleted: number;
	monthSelected: number;
	popInfo: any;
}

export class MichealCalendarLandingPage extends Component<any, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			showTimePopup: false,
			showOptionsPopUp: false,
			timeSelected: '',
			daySelected: 0,
			yearSeleted: 0,
			monthSelected: 0,
			popInfo: {},
		};
	}

	getAllInfoReady(currentMonth: string, allMonths: string[], year: number, day: number) {
		const mon = currentMonth; //this.month();
		const monthNo = allMonths.indexOf(mon); //months.indexOf(mon);
		this.setState({ daySelected: day, yearSeleted: year, monthSelected: monthNo });
	}

	showAvailableTimes(showPopup: boolean) {
		this.setState({ showTimePopup: showPopup });
		// console.log(this.state.selectedYear, months.indexOf(this.month()), this.state.daySelected);
	}

	SelectTimesList() {
		const { booked } = this.props;

		const c = booked[this.state.monthSelected][this.state.daySelected];

		const popup = c
			.sort((a: any, b: any) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime())
			.map((el: any, index: number) => {
				console.log('el', el);
				var e = new Date(el.bookingDate).getHours();
				return (
					<IonItem
						button
						onClick={() => {
							this.setState({ showOptionsPopUp: true, popInfo: el });
						}}
						key={index}>
						<IonLabel>
							<span style={{ opacity: 0.5, paddingRight: '10px' }}>{`${e}:00`}</span>
							{el.name}
						</IonLabel>
					</IonItem>
				);
			});
		return popup;
	}

	render() {
		const { workDays } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader titleString={'Schedule'} />
					</IonHeader>
					<br />
					<br />
					<br />

					<BaseCalender
						disabledDays={workDays}
						showtime={(clicked: boolean) => this.showAvailableTimes(clicked)}
						doneBooking={(currentMonth: string, allMonths: string[], year: number, day: number) => this.getAllInfoReady(currentMonth, allMonths, year, day)}
					/>

					<IonList>{this.state.showTimePopup && <>{this.SelectTimesList()}</>}</IonList>

					<IonPopover
						isOpen={this.state.showOptionsPopUp}
						onDidDismiss={(e) => {
							this.setState({ showOptionsPopUp: !this.state.showOptionsPopUp });
						}}>
						<IonCard color='secondary' style={{ width: '250px', height: '250px' }}>
							<IonCardHeader>
								<IonCardTitle style={{ color: 'white' }}>
									{`${new Date(this.state.popInfo.bookingDate).getHours()}:00`} {this.state.popInfo.name}
								</IonCardTitle>
							</IonCardHeader>
							<IonButton color='secondary'>Cancel this session</IonButton>
							<IonButton
								onClick={() => {
									this.setState({ showOptionsPopUp: false });
								}}
								routerLink={`/dashboard/chat/${this.state.popInfo.id}`}>
								Go to messages
							</IonButton>
						</IonCard>
					</IonPopover>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	var b: any = FakeYear;
	convertObjectToArray(state.owner.owner.sessionsBooked).forEach((user: any) => {
		convertObjectToArray(user).forEach((ses: BookingCompleted) => {
			console.log('Booking Date', ses.client.bookingDate);

			var month = new Date(ses.client.bookingDate).getMonth();
			var day = new Date(ses.client.bookingDate).getDate();
			var time = new Date(ses.client.bookingDate).getHours();

			console.log('Month', month);
			console.log('Date', day);
			console.log('Time', time);

			b[month][day].push(ses.client);
		});
	});

	console.log('b updated ??', b);
	return {
		booked: b,
		workDays: state.owner.owner.workData.daysOfwork,
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MichealCalendarLandingPage);
