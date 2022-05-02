import React, { Component } from 'react';
import { IonCol, IonRow, IonGrid, IonButton, IonCard, IonIcon } from '@ionic/react';
import moment from 'moment';
import './CalenderStyle.css';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { chevronBack, chevronForward } from 'ionicons/icons';

interface iState {
	dateContext: any;
	showMonthPopup: boolean;
	showYearPopup: boolean;
	showTimePopup: boolean;
	disableDone: boolean;
	showPayPopUp: boolean;
	selectedtimeColor: string;
	timeIndex: number;
	selectedYear: number;
	daySelected: number;
	timeSelected: string;
}

const weekdayshort = moment.weekdaysShort();
const months = moment.monthsShort();
const years: number[] = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const fileler1 = [<IonCol key={`inset to full ${1}`}> </IonCol>];
const fileler2 = [<IonCol key={`inset to full ${1}`}> </IonCol>, <IonCol key={`inset to full ${2}`}> </IonCol>];
const fileler3 = [<IonCol key={`inset to full ${1}`}> </IonCol>, <IonCol key={`inset to full ${2}`}> </IonCol>, <IonCol key={`inset to full ${3}`}> </IonCol>];
const fileler4 = [
	<IonCol key={`inset to full ${1}`}> </IonCol>,
	<IonCol key={`inset to full ${2}`}> </IonCol>,
	<IonCol key={`inset to full ${3}`}> </IonCol>,
	<IonCol key={`inset to full ${4}`}> </IonCol>,
];
const fileler5 = [
	<IonCol key={`inset to full ${1}`}> </IonCol>,
	<IonCol key={`inset to full ${2}`}> </IonCol>,
	<IonCol key={`inset to full ${3}`}> </IonCol>,
	<IonCol key={`inset to full ${4}`}> </IonCol>,
	<IonCol key={`inset to full ${5}`}> </IonCol>,
];
const fileler6 = [
	<IonCol key={`inset to full ${1}`}> </IonCol>,
	<IonCol key={`inset to full ${2}`}> </IonCol>,
	<IonCol key={`inset to full ${3}`}> </IonCol>,
	<IonCol key={`inset to full ${4}`}> </IonCol>,
	<IonCol key={`inset to full ${5}`}> </IonCol>,
	<IonCol key={`inset to full ${6}`}> </IonCol>,
];

function createDisabledDays(workingDaysStringArray: string[], firstDayOfMonth: number) {
	var MonBool: boolean = false;
	var TuesBool: boolean = false;
	var WedBool: boolean = false;
	var ThursBool: boolean = false;
	var FriBool: boolean = false;
	var SatBool: boolean = false;
	var SunBool: boolean = false;

	workingDaysStringArray.forEach((string) => {
		if (string === 'Monday') {
			// console.log('string', string);
			MonBool = true;
		}
		if (string === 'Tuesday') {
			// console.log('string', string);
			TuesBool = true;
		}
		if (string === 'Wednesday') {
			// console.log('string', string);
			WedBool = true;
		}
		if (string === 'Thursday') {
			// console.log('string', string);
			ThursBool = true;
		}
		if (string === 'Friday') {
			// console.log('string', string);
			FriBool = true;
		}
		if (string === 'Saturday') {
			// console.log('string', string);
			SatBool = true;
		}
		if (string === 'Sunday') {
			// console.log('string', string);
			SunBool = true;
		}
	});

	// console.log(SunBool, MonBool, TuesBool, WedBool, ThursBool, FriBool, SatBool);
	const weekdays = [SunBool, MonBool, TuesBool, WedBool, ThursBool, FriBool, SatBool];
	var fd = firstDayOfMonth;
	const rs: boolean[] = [];
	for (var row = 0; row < 6; row++) {
		weekdays.forEach((en, daynr) => {
			// console.debug(`generating row ${row}:${daynr} :${en}`);
			if (daynr >= fd) {
				if (en) {
					rs.push(false);
				} else {
					rs.push(true);
				}
			}
		});
		fd = 0;
	}
	// console.debug('createDisabledDays', { firstDayOfMonth, weekdays, rs });
	return rs;
}

export class BaseCalender extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			showMonthPopup: false,
			showYearPopup: false,
			showTimePopup: false,
			dateContext: moment(),
			selectedYear: +moment().format('Y'),
			daySelected: 0,
			timeSelected: '',
			selectedtimeColor: 'secondary',
			timeIndex: -1,
			disableDone: true,
			showPayPopUp: false,
		};
	}

	year() {
		return this.state.dateContext.format('Y');
	}

	month() {
		return this.state.dateContext.format('MMM');
	}

	daysInMonth() {
		return this.state.dateContext.daysInMonth();
	}

	currentDate() {
		// console.log('currentDate: ', this.state.dateContext.get('date'));
		return this.state.dateContext.get('date');
	}

	currentDay() {
		return this.state.dateContext.format('D');
	}

	firstDayOfMonth = () => {
		let firstDay = moment(this.state.dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
		return +firstDay;
	};

	createWeedaysShort() {
		const weekdayshortname = weekdayshort.map((day) => {
			return (
				<IonCol style={{ '--ion-grid-columns': 7 }} key={day}>
					{day}
				</IonCol>
			);
		});
		return weekdayshortname;
	}

	createEmptySpacesInMonth(firstDayOfMonth: number) {
		var blanks: JSX.Element[] = [];
		for (let i = 0; i < firstDayOfMonth; i++) {
			blanks.push(<IonCol key={`empty ${i}`}>{''}</IonCol>);
		}
		// console.log('blanks', blanks);
		return blanks;
	}

	createDaysInMonth(days: any, currentDay: any) {
		var MonthDays: JSX.Element[] = [];
		const disabledDays: boolean[] = createDisabledDays(this.props.disabledDays, this.firstDayOfMonth());
		const nowMonth = new Date().getMonth();
		const monthNo = months.indexOf(this.month());
		// const isMonthNow = monthNo < nowMonth ? true : false;

		const isMonthPrev = monthNo < nowMonth ? true : false;
		const isMonthNext = monthNo > nowMonth ? true : false;

		// console.log('nowMonth', nowMonth);
		// console.log('monthNo', monthNo);
		// console.log('isMonthPrev', isMonthPrev);
		// console.log('isMonthNext', isMonthNext);

		for (let d = 1; d <= days; d++) {
			var daysRemaining = d >= currentDay ? false : true;
			var disabled = isMonthPrev ? true : isMonthNext ? disabledDays[d - 1] : daysRemaining ? daysRemaining : disabledDays[d - 1];

			const classN = d === currentDay && monthNo === nowMonth ? 'day-current' : 'day';
			const filled = d === this.state.daySelected ? 'solid' : 'clear';
			const colorFilled = d === this.state.daySelected ? 'primary' : 'light';

			MonthDays.push(
				<IonCol className={classN} key={d} style={{ width: '50px', height: '50px', padding: '0px', margin: '0px' }}>
					<IonButton className='dayButton' color={colorFilled} onClick={() => this.onDayClick(d)} fill={filled} disabled={disabled}>
						{d}
					</IonButton>
				</IonCol>,
			);
		}
		// console.log('MonthDays', MonthDays);
		return MonthDays;
	}

	displayFullCalendar(blankSpaces: JSX.Element[], fullSpaces: JSX.Element[]) {
		const total = [...blankSpaces, ...fullSpaces]; //totalSlots
		// console.log('total', total);

		var rows: any[] = [];
		var cols: any[] = [];
		var filler: any = [];

		total.forEach((row, i) => {
			if (i % 7 !== 0) {
				cols.push(row); // if index not equal 7 that means not go to next week
			} else {
				rows.push(cols); // when reach next week we contain all td in last week to rows
				cols = []; // empty container
				cols.push(row); // in current loop we still push current row to new container
			}

			if (i === total.length - 1) {
				if (cols.length === 6) {
					filler = [...cols, fileler1];
				} else if (cols.length === 5) {
					filler = [...cols, fileler2];
				} else if (cols.length === 4) {
					filler = [...cols, fileler3];
				} else if (cols.length === 3) {
					filler = [...cols, fileler4];
				} else if (cols.length === 2) {
					filler = [...cols, fileler5];
				} else if (cols.length === 1) {
					filler = [...cols, fileler6];
				} else {
					filler = cols;
				}
				rows.push(filler);
			}
		});

		// console.log('cols', cols);
		// console.log('rows', rows);
		return (
			<>
				{rows.map((rowData, index) => {
					if (rowData.length > 0) {
						return (
							<IonRow key={`row ${index}`}>
								{rowData.map((entry: JSX.Element) => {
									return entry;
								})}
							</IonRow>
						);
					} else {
						return <IonRow key={`row`}></IonRow>;
					}
				})}
			</>
		);
	}

	YearNav(showPopup: boolean) {
		return <>{showPopup && <IonCard>{this.SelectYearList()}</IonCard>}</>;
	}

	SelectYearList() {
		const popup = years.map((year, index) => {
			return (
				<IonCol size='3' key={`month ${index}`}>
					<IonButton onClick={() => this.onChangeYear(year)} fill='clear'>
						{year}
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

	onChangeYear(year: number) {
		console.log('new year???', year);

		//setYear
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).set('year', year);
		this.setState({
			dateContext: dateContext,
			showYearPopup: !this.state.showYearPopup,
			selectedYear: year,
		});
	}

	//MonthNav
	MonthNav(showPopup: boolean) {
		return <>{showPopup && <IonCard>{this.SelectMonthList(months)}</IonCard>}</>;
	}

	//selectList
	SelectMonthList(months: any[]) {
		const popup = months.map((month, index) => {
			return (
				<IonCol size='6' key={`month ${index}`}>
					<IonButton onClick={() => this.onChangeMonth(month)} fill='clear'>
						{month}
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

	//onChangeMonth
	onChangeMonth(newMonth: any) {
		// console.log('???', newMonth, currentMonth);
		this.setState({ showMonthPopup: !this.state.showMonthPopup });
		this.onChangeToSelectedMonth(newMonth);
	}

	//onSelectChange
	onChangeToSelectedMonth(newMonth: string) {
		console.log('???', newMonth);

		//setMonth Function
		let monthNo = months.indexOf(newMonth);
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).set('month', monthNo);
		this.setState({ dateContext: dateContext, daySelected: 0 });

		// if parent component needs to know about this
		this.props.onMonthChange && this.props.onMonthChange();
		this.props.showtime && this.props.showtime(false);
	}

	nextMonth = () => {
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).add(1, 'month');
		this.setState({
			dateContext: dateContext,
			daySelected: 0,
		});
		this.props.onNextMonth && this.props.onNextMonth();
		this.props.showtime && this.props.showtime(false);
	};

	prevMonth = () => {
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).subtract(1, 'month');
		this.setState({
			dateContext: dateContext,
			daySelected: 0,
		});
		this.props.onPrevMonth && this.props.onPrevMonth();
		this.props.showtime && this.props.showtime(false);
	};

	onDayClick(day: any) {
		console.log('clicked on day', day);
		this.setState({ daySelected: day, showTimePopup: true });
		//get times from parent here on out parent defines view
		this.props.doneBooking && this.props.doneBooking(this.month(), months, this.state.selectedYear, day);
		this.props.showtime && this.props.showtime(true);
	}

	render() {
		const blanks = this.createEmptySpacesInMonth(this.firstDayOfMonth());
		const daysInMonth = this.createDaysInMonth(this.daysInMonth(), this.currentDate());
		const displayMonth = this.displayFullCalendar(blanks, daysInMonth);
		return (
			<>
				<IonGrid>
					<IonRow>{Translate(lsInj.transDict.selectDate)}</IonRow>
					<IonRow>
						<IonCard color='medium' style={{ width: '100%' }}>
							<IonGrid>
								<IonRow>
									<IonCol className='ion-align-item-start' size='3'>
										<IonButton fill='clear' color='dark' onClick={() => this.prevMonth()}>
											<IonIcon icon={chevronBack} />
										</IonButton>
									</IonCol>
									<IonCol className='ion-align-item-center' size='3'>
										<IonButton color='light' onClick={() => this.setState({ showMonthPopup: !this.state.showMonthPopup })} fill='clear'>
											{this.month()}
										</IonButton>
									</IonCol>
									<IonCol className='ion-align-item-center' size='3'>
										<IonButton color='light' onClick={() => this.setState({ showYearPopup: !this.state.showYearPopup })} fill='clear'>
											{this.state.selectedYear}
										</IonButton>
									</IonCol>
									<IonCol className='ion-align-item-end' size='3'>
										<IonButton fill='clear' color='dark' onClick={() => this.nextMonth()}>
											<IonIcon icon={chevronForward} />
										</IonButton>
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonCard>
					</IonRow>
					{this.MonthNav(this.state.showMonthPopup)}
					{this.YearNav(this.state.showYearPopup)}
					<IonRow>{this.createWeedaysShort()}</IonRow>
					{displayMonth}
				</IonGrid>
			</>
		);
	}
}

export default BaseCalender;
