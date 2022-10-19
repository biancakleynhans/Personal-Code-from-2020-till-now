import moment from "moment";

export function setColor(state: string) {
  //"waiting on data"| "processing history"| "comparing data" | "compiling data" | "processing data" | "sucess"
  if (state == "sucess") {
    return "success";
  }
  if (state == "busy" || state == "processing history") {
    return "warning";
  }
  if (state == "error") {
    return "danger";
  }
  if (state == "waiting" || state == "comparing data") {
    return "primary";
  }
  if (state == "waiting on data") {
    return "medium";
  }
  if (state == "compiling" || state == "compiling data") {
    return "secondary";
  }
  if (state == "processing" || state == "processing data") {
    return "tertiary";
  }
}

export function date_std_format(date_entry: string) {
  if (date_entry) {
    // moment(datestring).format("DD-MM-YYYY")
    var returner = moment(date_entry).format("YYYY/MM/DD");
    // console.log('string', date_entry, 'returner', returner);
    return returner;
  } else {
    return date_entry;
  }
}

export function date_year_month(old: string) {
  var new_date = "";
  var month = moment(new Date(old)).month();
  var year = moment(new Date(old)).year();
  var use = month + 1 < 10 ? `0${month + 1}` : month + 1;
  new_date = `${year}_${use}`;
  // console.log("old", old, year, month, new_date);
  return new_date;
}
