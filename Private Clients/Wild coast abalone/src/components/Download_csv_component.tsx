import React, { Component } from "react";
import { IonCard, IonCardContent } from "@ionic/react";
import { CSVLink } from "react-csv";

interface iProps {
  perMonthData: { [k: string]: any[] };
  passportArr: any[];
}

interface iState {
  downloadState: "busy" | "sucess" | "error" | "waiting";
}

const headerObj = [
  { label: "Record type", key: "Record type" },
  { label: "UIF Reference Number", key: "UIF Reference Number" },
  { label: "Identity Number", key: "Identity Number" },
  { label: "Other Numbers", key: "Other Numbers" },
  { label: "Personnel/Clock Card Number", key: "Personnel/Clock Card Number" },
  { label: "Surname", key: "Surname" },
  { label: "First Name", key: "First Name" },
  { label: "Date of Birth", key: "Date of Birth" },
  { label: "Employment Start Date", key: "Employment Start Date" },
  { label: "Employment End Date", key: "Employment End Date" },
  { label: "Employment Status Code", key: "Employment Status Code" },
  { label: "Reason for Non Contribution", key: "Reason for Non Contribution" },
  { label: "Gross Taxable Remuneration", key: "Gross Taxable Remuneration" },
  { label: "Remuneration subject to UIF", key: "Remuneration subject to UIF" }
];

const headerObjPassport = [
  { label: "UIF Reference Number", key: "UIF Reference Number" },
  { label: "Title", key: "Title" },
  { label: "Initial", key: "Initial" },
  { label: "Names", key: "Names" },
  { label: "Surname", key: "Surname" },
  { label: "ID Type", key: "ID Type" },
  { label: "Identity Number", key: "Identity Number" },
  { label: "Passport Number", key: "Passport Number" },
  { label: "Physical Address Line 1", key: "Physical Address Line 1" },
  { label: "Physical Address Line 2", key: "Physical Address Line 2" },
  { label: "Physical Address Line 3", key: "Physical Address Line 3" },
  { label: "Suburb", key: "Suburb" },
  { label: "City", key: "City" },
  { label: "Postal Code", key: "Postal Code" },
  { label: "Postal Address Line 1", key: "Postal Address Line 1" },
  { label: "Postal Address Line 2", key: "Postal Address Line 2" },
  { label: "Postal Address Line 3", key: "Postal Address Line 3" },
  { label: "Suburb ", key: "Suburb " },
  { label: "City ", key: "City " },
  { label: "Postal Code ", key: "Postal Code " },
  { label: "Country of Issue", key: "Country of Issue" },
  { label: "Date of Birth", key: "Date of Birth" },
  { label: "Commencement date of Employment Date", key: "Commencement date of Employment Date" },
  { label: "Employed To", key: "Employed To" },
  { label: "Total Hours Worked per Month", key: "Total Hours Worked per Month" },
  { label: "Employment Status (Termination Reason)", key: "Employment Status (Termination Reason)" },
  { label: "Reason for Non Contribution", key: "Reason for Non Contribution" },
  { label: "Gross Taxable Remuneration", key: "Gross Taxable Remuneration" },
  { label: "Remuneration subject to UIF", key: "Remuneration subject to UIF" },
  { label: "UIF Contribution", key: "UIF Contribution" }
];

export class Download_csv_component extends Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      downloadState: "waiting"
    };
  }

  render() {
    return (
      <>
        {Object.keys(this.props.perMonthData).map((month) => {
          return (
            <IonCard key={month}>
              <IonCardContent>
                <CSVLink enclosingCharacter={``} data={this.props.perMonthData[month]} headers={headerObj} filename={`${month}.csv`}>
                  Download {month} data as .csv now
                </CSVLink>
              </IonCardContent>
            </IonCard>
          );
        })}

        {this.props.passportArr.length > 0 ? (
          <IonCard key={"pass"}>
            <IonCardContent>
              <CSVLink enclosingCharacter={``} data={this.props.passportArr} headers={headerObjPassport} filename={"passports.csv"}>
                Download passport data now
              </CSVLink>
            </IonCardContent>
          </IonCard>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Download_csv_component;
