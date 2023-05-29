import React, { Component } from "react";
import { IonCol, IonRow, IonGrid, IonButton, IonCard, IonIcon } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import moment from "moment";
import "../../theme/CalenderStyle.css";
import { createWeedaysShort } from "./CalenderCreators";
import { generateArr } from "../../utils/Utilities";

interface iState {
  dateContext: any;
  daySelected: number;
  daySelected2: number;
  yearSelected: number;
  showYearPopup: boolean;
  showMonthPopup: boolean;
}

interface iProps {
  disabledDays: string[];
  doneBooking: (month: string, year: number, day: number, day2: number) => void;
}

const weekdayshort = moment.weekdaysShort();
const months = moment.monthsShort();
const years: number[] = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032];

/*Creates the days that are disabled TODO*/
// function createDisabledDays(workingDaysStringArray: string[], firstDayOfMonth: number) {
//   var MonBool: boolean = false;
//   var TuesBool: boolean = false;
//   var WedBool: boolean = false;
//   var ThursBool: boolean = false;
//   var FriBool: boolean = false;
//   var SatBool: boolean = false;
//   var SunBool: boolean = false;

//   //   workingDaysStringArray.forEach((string) => {
//   //     if (string === "Monday") {
//   //       // console.log('string', string);
//   //       MonBool = true;
//   //     }
//   //     if (string === "Tuesday") {
//   //       // console.log('string', string);
//   //       TuesBool = true;
//   //     }
//   //     if (string === "Wednesday") {
//   //       // console.log('string', string);
//   //       WedBool = true;
//   //     }
//   //     if (string === "Thursday") {
//   //       // console.log('string', string);
//   //       ThursBool = true;
//   //     }
//   //     if (string === "Friday") {
//   //       // console.log('string', string);
//   //       FriBool = true;
//   //     }
//   //     if (string === "Saturday") {
//   //       // console.log('string', string);
//   //       SatBool = true;
//   //     }
//   //     if (string === "Sunday") {
//   //       // console.log('string', string);
//   //       SunBool = true;
//   //     }
//   //   });

//   // console.log(SunBool, MonBool, TuesBool, WedBool, ThursBool, FriBool, SatBool);
//   const weekdays = [SunBool, MonBool, TuesBool, WedBool, ThursBool, FriBool, SatBool];
//   //   var fd = firstDayOfMonth;
//   //   const rs: boolean[] = [];
//   //   for (var row = 0; row < 6; row++) {
//   //     weekdays.forEach((en, daynr) => {
//   //       // console.debug(`generating row ${row}:${daynr} :${en}`);
//   //       if (daynr >= fd) {
//   //         if (en) {
//   //           rs.push(false);
//   //         } else {
//   //           rs.push(true);
//   //         }
//   //       }
//   //     });
//   //     fd = 0;
//   //   }
//   // console.debug('createDisabledDays', { firstDayOfMonth, weekdays, rs });
//   //   return rs;
//   return weekdays;
// }

export class BaseCalender extends Component<iProps, iState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dateContext: moment(),
      daySelected: 0,
      daySelected2: 0,
      yearSelected: +moment().format("Y"),
      showYearPopup: false,
      showMonthPopup: false
    };
  }

  // HELPERS
  generateEntries(startNum: number, endNum: number, isRev: boolean) {
    let arr = isRev ? generateArr(startNum, true).reverse() : generateArr(startNum, true);
    let use = arr.slice(0, endNum);
    let returnArr: JSX.Element[] = [];

    for (let i = 0; i < endNum; i++) {
      returnArr.push(
        <IonButton className='dayButton' color='secondary' onClick={() => this.onDayClick(`notCurr ${i + 1}`)} fill='clear' disabled={isRev ? true : false}>
          {use[i]}
        </IonButton>
      );
    }
    return returnArr;
  }

  /*Gets first day in curr month*/
  firstDayOfMonth = () => {
    // Day of week 0...1..5...6
    let firstDay = moment(this.state.dateContext).startOf("month").format("d");
    return +firstDay;
  };

  /*Gets last day in curr month*/
  lastDayOfMonth() {
    // Day of week 0...1..5...6
    let lastDay = moment(this.state.dateContext).endOf("month").format("d");
    return +lastDay;
  }
  /*The amount of days in a given month*/
  daysInMonth() {
    return this.state.dateContext.daysInMonth();
  }

  /*Creates the  spaces for days at start of row that can be filled with prev month*/
  createStartSpacesInMonth(firstDayOfMonth: number) {
    var blanks: JSX.Element[] = [];
    let count: number = moment(this.state.dateContext).subtract(1, "month").daysInMonth();
    let children = this.generateEntries(count, firstDayOfMonth, true).reverse();

    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(
        <IonCol className='calRow' key={`start ${i}`}>
          {children[i]}
        </IonCol>
      );
    }
    return blanks;
  }

  /*Creates the spaces for days in the end of the moth where next month should be */
  createEndSpacesInMonth(endDayOfMonth: number) {
    var blanks: JSX.Element[] = [];
    let count: number = moment(this.state.dateContext).add(1, "month").daysInMonth();
    let children = this.generateEntries(count, endDayOfMonth, false);
    for (let i = 0; i < endDayOfMonth; i++) {
      blanks.push(
        <IonCol className='calRow' key={`end ${i}`} id={`end ${i}`}>
          {children[i]}
        </IonCol>
      );
    }
    // console.log("End blanks", blanks);
    return blanks;
  }

  /*Creates the single day entries inside a full month calender*/
  createDaysInMonth(days: any, currentDay: any) {
    let MonthDays: JSX.Element[] = [];
    const m = this.state.dateContext.format("MMM");
    const disabledDays: boolean[] = []; //createDisabledDays(this.props.disabledDays, this.firstDayOfMonth());
    const nowMonth = new Date().getMonth();
    const monthNo = months.indexOf(m); //
    const isMonthPrev = monthNo < nowMonth ? true : false;
    const isMonthNext = monthNo > nowMonth ? true : false;

    for (let d = 1; d <= days; d++) {
      const classN = d === currentDay && monthNo === nowMonth ? "day-current" : "day";
      let daysRemaining = d >= currentDay ? false : true;
      let disable = isMonthPrev ? true : isMonthNext ? disabledDays[d - 1] : daysRemaining ? daysRemaining : disabledDays[d - 1];
      let filled: "clear" | "solid" = "clear";
      let colorFilled: "dark" | "primary" = "dark";

      if (d === this.state.daySelected) {
        colorFilled = "primary";
        filled = "solid";
      } else if (d === this.state.daySelected2) {
        colorFilled = "primary";
        filled = "solid";
      } else {
        colorFilled = "dark";
        filled = "clear";
      }

      MonthDays.push(
        <IonCol className={classN} key={d} style={{ width: "50px", height: "50px", padding: "0px", margin: "0px", "--ion-grid-columns": 7 }}>
          <IonButton className='dayButton' color={colorFilled} onClick={() => this.onDayClick(d)} fill={filled} disabled={disable}>
            {d}
          </IonButton>
        </IonCol>
      );
    }
    // console.log('MonthDays', MonthDays);
    return MonthDays;
  }

  /*Generates the full calender*/
  displayFullCalendar(blankSpaces: JSX.Element[], fullSpaces: JSX.Element[]) {
    let total = [...blankSpaces, ...fullSpaces]; //totalSlots
    let ends = this.createEndSpacesInMonth(this.lastDayOfMonth());
    // console.log('total', total);
    console.log("ends", ends.length, ends);

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
        if (cols.length < 7) {
          console.log("CHecking if this is the spot ", ends.length, cols.length, 7 - cols.length, cols);

          if (ends.length >= 7 - cols.length) {
            filler = [...cols, ...ends.slice(0, 7 - cols.length)];
          } else {
            let needed = 7 - cols.length - ends.length;
            let temp: any[] = [];
            // console.log("To few entries ", needed);

            for (let i = 0; i < needed; i++) {
              console.log("i");
              temp.push(
                <IonCol className='calRow' key={`end ${ends.length + i + 1}`} id={`end ${ends.length + i + 1}`}>
                  <IonButton className='dayButton' color='secondary' onClick={() => this.onDayClick(`notCurr ${i + 1}`)} fill='clear' disabled={false}>
                    {ends.length + i + 1}
                  </IonButton>
                </IonCol>
              );
            }

            filler = [...cols, ...ends.slice(0, 7 - cols.length), ...temp];
          }
        } else {
          filler = cols;
        }
        rows.push(filler);
      }
    });

    return (
      <>
        <IonRow>{createWeedaysShort(weekdayshort)}</IonRow>
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

  // NAVIGATION
  /*Allows naving of years available*/
  YearNav(showPopup: boolean) {
    return <>{showPopup && <IonCard>{this.SelectYearList()}</IonCard>}</>;
  }

  /*Displays the years and allows naving*/
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

  /*Handles the switch over to the year selected */
  onChangeYear(year: number) {
    console.log("new year???", year);
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("year", year);
    this.setState({
      dateContext: dateContext,
      showYearPopup: !this.state.showYearPopup,
      yearSelected: year
    });
  }

  /*Allows naving of months available*/
  MonthNav(showPopup: boolean) {
    return <>{showPopup && <IonCard>{this.SelectMonthList(months)}</IonCard>}</>;
  }

  /*Displays the years and allows naving*/
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

  /*Switch over container function for months */
  onChangeMonth(newMonth: any) {
    // console.log('???', newMonth, currentMonth);
    this.setState({ showMonthPopup: !this.state.showMonthPopup });
    this.onChangeToSelectedMonth(newMonth);
  }

  /*Handles the switch over to the month selected */
  onChangeToSelectedMonth(newMonth: string) {
    console.log("???", newMonth);
    let monthNo = months.indexOf(newMonth);
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("month", monthNo);
    this.setState({ dateContext: dateContext, daySelected: 0 });
  }

  /*Moves to the next month*/
  nextMonth() {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    this.setState({
      dateContext: dateContext,
      daySelected: 0
    });
  }

  /*Moves to the prev month*/
  prevMonth() {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    this.setState({
      dateContext: dateContext,
      daySelected: 0
    });
  }

  // SUBMISSION

  /*Handles the event when a day has been clicked or selected for start and end day so both days controled by this day */
  onDayClick(day: any) {
    console.log("clicked on day", day, this.state.daySelected, this.state.daySelected2);
    if (this.state.daySelected === 0) {
      this.setState({ daySelected: day });
    } else if (this.state.daySelected !== 0 && day === this.state.daySelected) {
      this.setState({ daySelected: 0 });
    } else if (this.state.daySelected2 !== 0 && day === this.state.daySelected2) {
      this.setState({ daySelected2: 0 });
    } else {
      this.setState({ daySelected2: day });
    }
  }

  /*Passes all relevant info up to component that called this class and gives it all the relevant info to continue*/
  handleBook() {
    const m = this.state.dateContext.month() + 1;
    console.log("????", m);
    //   this.props.doneBooking()
  }

  render() {
    const m = this.state.dateContext.format("MMM");
    const d = this.state.dateContext.get("date");
    const blanks = this.createStartSpacesInMonth(this.firstDayOfMonth());
    const daysInMonth = this.createDaysInMonth(this.daysInMonth(), d);
    const displayMonth = this.displayFullCalendar(blanks, daysInMonth);
    return (
      <IonGrid>
        {/* Main banner for nav to years and months */}
        <IonRow>
          <IonCard color='secondary' style={{ width: "100%" }}>
            <IonGrid>
              <IonRow>
                {/* Prev month btn */}
                <IonCol>
                  <IonButton style={{ float: "left" }} fill='clear' color='dark' onClick={() => this.prevMonth()}>
                    <IonIcon icon={chevronBack} />
                  </IonButton>
                </IonCol>

                {/* Month & Year */}
                <IonCol>
                  <IonButton style={{ float: "left" }} color='dark' onClick={() => this.setState({ showMonthPopup: !this.state.showMonthPopup })} fill='clear'>
                    {m}
                  </IonButton>

                  <IonButton style={{ float: "right" }} color='dark' onClick={() => this.setState({ showYearPopup: !this.state.showYearPopup })} fill='clear'>
                    {this.state.yearSelected}
                  </IonButton>
                </IonCol>

                {/* Next month btn */}
                <IonCol>
                  <IonButton style={{ float: "right" }} fill='clear' color='dark' onClick={() => this.nextMonth()}>
                    <IonIcon icon={chevronForward} />
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        </IonRow>

        <br />
        <br />
        <br />

        {/* Display of month content and popUps */}
        {this.MonthNav(this.state.showMonthPopup)}
        {this.YearNav(this.state.showYearPopup)}
        {displayMonth}

        <br />
        <br />
        <br />

        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <IonButton expand='full' onClick={() => this.handleBook()}>
              Book now
            </IonButton>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </IonGrid>
    );
  }
}

export default BaseCalender;
