import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonGrid,
	IonRow,
	IonButton,
	IonCol,
	IonPopover,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
} from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import BaseCalender from '../../../components/calendar/BaseCalender';
import moment from 'moment';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/ReduxModels';
import PaypalButton from '../../../components/paypal/Paypal';
import { CompletedBookingAdd } from '../../../services/redux/actions/001UserActions';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { FakeYear } from '../../../services/redux/actions/GlobalActionHelpers';

interface iState {
	showTimePopup: boolean;
	disableDone: boolean;
	showPayPopUp: boolean;
	selectedtimeColor: string;
	timeIndex: number;
	timeSelected: string;
	daySelected: number;
	yearSeleted: number;
	finalBookingDate: any;
	monthSelected: number;
}

interface PaypalPaymentDetails {
	orderDetails: {
		orderID: string;
		payedAmount: string;
		paymentDate: any;
	};
	payerDetails: {
		payerID: string;
		payerName: string;
	};
}

export interface BookingCompleted {
	client: {
		id: string;
		name: string;
		bookingDate: any;
	};
	payment: PaypalPaymentDetails;
}

export class UserCalendarLandingPage extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			showTimePopup: false,
			selectedtimeColor: 'secondary',
			timeIndex: -1,
			disableDone: true,
			showPayPopUp: false,
			finalBookingDate: '',
			timeSelected: '',
			daySelected: 0,
			yearSeleted: 0,
			monthSelected: 0,
		};
	}

	monthChange() {
		console.log('moth has been changed');
	}

	nextMonth() {
		console.log('moth has been changed');
	}

	prevMonth() {
		console.log('moth has been changed');
	}

	showAvailableTimes(showPopup: boolean) {
		this.setState({ showTimePopup: showPopup });
		// console.log(this.state.selectedYear, months.indexOf(this.month()), this.state.daySelected);
	}

	SelectTimesList() {
		const { booked, timesAv } = this.props;
		const timesPerday: string[] = timesAv;
		const remove = booked[this.state.monthSelected][this.state.daySelected];

		const popup = timesPerday
			.filter((f) => !remove.includes(f))
			.map((time, index) => {
				const colorFilled = index === this.state.timeIndex ? this.state.selectedtimeColor : 'secondary';
				return (
					<IonCol size='4' key={`time ${index}`}>
						<IonButton color={colorFilled} shape='round' onClick={() => this.setSelectedTime(time, index)} fill='solid'>
							{time}
						</IonButton>
					</IonCol>
				);
			});
		return (
			<IonGrid>
				<IonRow>{popup}</IonRow>
			</IonGrid>
		);
	}

	setSelectedTime(time: string, index: number) {
		console.log('clicked on time', time);
		this.setState({ timeSelected: time, selectedtimeColor: 'primary', timeIndex: index, disableDone: false });
	}

	getAllInfoReady(currentMonth: string, allMonths: string[], year: number, day: number) {
		const mon = currentMonth; //this.month();
		const monthNo = allMonths.indexOf(mon); //months.indexOf(mon);
		this.setState({ daySelected: day, yearSeleted: year, monthSelected: monthNo });
	}

	bookNow() {
		const times = this.state.timeSelected.split(':');
		const newDateString: number[] = [+this.state.yearSeleted, +this.state.monthSelected, +this.state.daySelected, +times[0], +times[1]];
		const bookingDate = moment(newDateString);

		// console.log('state done', this.state);
		// console.log('times', times);
		// console.log('newDateString', newDateString);
		// console.log('bookingDate', bookingDate);
		this.setState({ finalBookingDate: bookingDate });
		this.setState({ showPayPopUp: true });
	}

	getPayment(paymentDetails: any) {
		const { client } = this.props;
		console.log('calendar component getPayment', paymentDetails);

		var Transdetails: PaypalPaymentDetails = {
			orderDetails: {
				orderID: paymentDetails.orderID,
				payedAmount: paymentDetails.orderDetails.amount.value,
				paymentDate: moment(paymentDetails.paymentDate).toString(),
			},
			payerDetails: {
				payerID: paymentDetails.payerID,
				payerName: `${paymentDetails.payerDetails.name.given_name} ${paymentDetails.payerDetails.name.surname}`,
			},
		};
		var bookingDetails: BookingCompleted = {
			client: {
				id: client.id,
				name: client.name,
				bookingDate: this.state.finalBookingDate.toString(),
			},
			payment: Transdetails,
		};

		console.log('bookingDetails', bookingDetails);
		this.props.saveCompletedBooking(bookingDetails);
	}

	render() {
		const { workDays } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader titleString={Translate(lsInj.transDict.BookTraining)} />
					</IonHeader>
					<br />
					<br />
					<br />
					<br />
					<BaseCalender
						onMonthChange={() => this.monthChange()}
						onNextMonth={() => this.nextMonth}
						onPrevMonth={() => this.prevMonth()}
						disabledDays={workDays}
						showtime={(clicked: boolean) => this.showAvailableTimes(clicked)}
						doneBooking={(currentMonth: string, allMonths: string[], year: number, day: number) => this.getAllInfoReady(currentMonth, allMonths, year, day)}
					/>

					<IonGrid>
						<IonRow>{Translate(lsInj.transDict.SelectTime)}</IonRow>
						<IonRow>{this.state.showTimePopup && <>{this.SelectTimesList()}</>}</IonRow>
					</IonGrid>
					<IonButton onClick={() => this.bookNow()} expand='full' disabled={this.state.disableDone}>
						{Translate(lsInj.transDict.bookSes)}
					</IonButton>
					{this.state.showPayPopUp && (
						<IonPopover
							isOpen={this.state.showPayPopUp}
							// cssClass='my-custom-class'
							onDidDismiss={(e) => {
								this.setState({ showPayPopUp: !this.state.showPayPopUp });
							}}>
							<IonCard style={{ width: '270px', height: '270px' }}>
								<IonCardHeader>
									<IonCardTitle style={{ color: 'white', fontSize: 'xx-large' }}>Payment</IonCardTitle>
									<IonCardContent>
										{/* <IonButton shape='round'>Pay by PayPal</IonButton> */}
										<PaypalButton
											completed={(details: any) => this.getPayment(details)}
											before={
												<>
													<IonCardSubtitle style={{ color: 'white', textAlign: 'left', fontSize: 'large' }}>Chosen date: </IonCardSubtitle>
													<IonCardSubtitle style={{ color: 'white', textAlign: 'left', fontSize: 'medium' }}>
														{moment(this.state.finalBookingDate).format('D MMMM YYYY HH:MM')}{' '}
													</IonCardSubtitle>
												</>
											}
										/>
									</IonCardContent>
								</IonCardHeader>
							</IonCard>
						</IonPopover>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('dash props:', state.user.categories);

	var b: any = FakeYear;
	// {
	// 	0: {
	// 		1: [],
	// 		2: [],
	// 	},
	// 	1: {
	// 		1: [],
	// 		2: [],
	// 	},
	// };

	const tA = state.owner.owner.workData !== undefined ? state.owner.owner.workData.hoursOfwork : [];
	const s = state.owner.owner.workData.hoursOfwork.indexOf(state.owner.owner.workData.hoursOfNonWork[0]);
	const e = state.owner.owner.workData.hoursOfNonWork.length + 1;

	const final = tA.slice(0, s).concat(tA.slice(s + e));

	// console.log('final', final);
	// console.log('days of work', state.owner.owner.workData.daysOfwork);
	// console.log('Booked sessions', state.owner.owner.sessionsBooked);

	convertObjectToArray(state.owner.owner.sessionsBooked).forEach((user: any) => {
		convertObjectToArray(user).forEach((ses: BookingCompleted) => {
			console.log('Booking Date', ses.client.bookingDate);

			var month = new Date(ses.client.bookingDate).getMonth();
			var day = new Date(ses.client.bookingDate).getDate();
			var time = new Date(ses.client.bookingDate).getHours();

			console.log('Month', month);
			console.log('Date', day);
			console.log('Time', time);

			b[month][day].push(`${time}:00`);
		});
	});

	console.log('b updated ??', b);
	return {
		booked: b,
		client: state.user,
		timesAv: final,
		workDays: state.owner.owner.workData.daysOfwork,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		saveCompletedBooking: (booking: BookingCompleted) => dispatch(CompletedBookingAdd(booking)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCalendarLandingPage);
