import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FavList } from '../../../Shared/FaviconList';
import { convertQueryStringToDate } from './000DayView';


interface iProps{
  changeSelectedDay: (day:any)=> void
  selectedDay:any
}

interface iState{
  pickerVisible?:boolean
}


class DaySelect extends Component <iProps,iState>{

  constructor(props:any ) {
    super(props);
    this.state = {
      pickerVisible: false
    }
    // console.log("Selected Day", this.props.selectedDay)
  }

  componentDidUpdate() {
    if(this.state.pickerVisible) {
      document.body.addEventListener('click', this.handleClick.bind(this), true);
    }
  }

  handleDayChange(day:any) {
    this.setState({pickerVisible: false});
    this.props.changeSelectedDay(day);
  }

  changeToDayBefore() {
    let newDay = this.props.selectedDay;
    newDay.setDate(newDay.getDate() - 1);
    this.handleDayChange(newDay);
  }

  changeToDayAfter() {
    let newDay = this.props.selectedDay;
    newDay.setDate(newDay.getDate() + 1);
    this.handleDayChange(newDay);
  }

  formatDayText() {
    if(this.selectedDayIsToday()) {
      return 'Today';
    }
    let date = convertQueryStringToDate(this.props.selectedDay);
    // console.log("formatDayText", date)

    // const delimiter = '/';
    // console.log(date, "formatDayText", date.getMonth() + 1, date.getDate(), date.getFullYear())
    // return [date.getMonth(), date.getDate()+1, date.getFullYear()].join(delimiter);
    return date;
  }

  selectedDayIsToday() {
    let date = this.props.selectedDay;
    let today = new Date(Date.now());
    return date === today;
  }

  /**
   * Hide DayPicker popup if clicked outside
   */
  handleClick(e:any) {
    var check = document.querySelector('.DayPicker')
    if(check) {
      if(!check.contains(e.target)) {
        document.body.removeEventListener('click', this.handleClick.bind(this), true);
        this.setState({pickerVisible: false});
      }  
    }
  }

  goToToday() {
    // update hash w/ query param of today's date, then refresh page so query string is re-read
    // window.location.href = `Boooo/${new Date(Date.now())}`
    window.location.reload(true);
  }

  render() {
    let dayText = this.formatDayText();
    return (
      <div className="DaySelect">
        
        {!this.selectedDayIsToday() && 
            <span onClick={this.goToToday} className="DaySelect--today-button small-button">Today</span>}
  		  <div className="DaySelect__arrow left" onClick={this.changeToDayBefore.bind(this)}>{FavList.arrowLeft.icon}</div>
        <span className="DaySelect__choose" onClick={() => this.setState({pickerVisible: true})}>
        <div className="DaySelect__calendar">{FavList.calender.icon}</div>
          <span className="DaySelect__daytext">{dayText}</span>
        </span>
        {!this.selectedDayIsToday() && 
        <div className="DaySelect__arrow right" onClick={this.changeToDayAfter.bind(this)}>{FavList.arrowRight.icon}</div>}

        {this.state.pickerVisible && 
          <DayPicker 
            onDayClick={this.handleDayChange.bind(this)} 
            selectedDays={new Date(this.props.selectedDay)}
            month={new Date(this.props.selectedDay)}
          />}
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default DaySelect;
