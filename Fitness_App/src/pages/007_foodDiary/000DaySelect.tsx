/** @format */

import React, { Component } from 'react';
import { IonDatetime, IonButton, IonCardContent } from '@ionic/react';
import { convertQueryStringToDate } from './000DayView';
import { FavList } from '../../components/icons/FaviconList';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {
	changeSelectedDay: (day: any) => void;
	selectedDay: any;
}

interface iState {
	pickerVisible?: boolean;
}

class DaySelect extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = { pickerVisible: false };
		// console.log("Selected Day", this.props.selectedDay)
	}

	handleDayChange(e: any) {
		// console.log("daypicker ", e)
		this.setState({ pickerVisible: false });

		this.props.changeSelectedDay(convertQueryStringToDate(e.detail.value));
		this.forceUpdate();
	}

	selectedDayIsToday() {
		let date = this.props.selectedDay;
		let today = new Date(Date.now());
		return date === today;
	}

	goToToday() {
		window.location.reload();
	}

	render() {
		var dayDate = this.props.selectedDay.toLocaleString();
		return (
			<IonCardContent>
				<IonButton fill='clear' onClick={() => this.setState({ pickerVisible: true })}>
					{/* <IonIcon color='medium' size="large" icon={calendar} /> */}
					{FavList.other.calender.iconAlt}
				</IonButton>

				{this.state.pickerVisible && <IonDatetime color='medium' displayFormat='D MMM YYYY' value={new Date(this.props.selectedDay).toLocaleString()} onIonChange={this.handleDayChange.bind(this)} />}
				{!this.selectedDayIsToday() && (
					<IonButton fill='clear' onClick={this.goToToday}>
						{LablesList.FoodDiary.daySelec.af} <br /> {dayDate}
					</IonButton>
				)}
			</IonCardContent>
		);
	}
}

export default DaySelect;
