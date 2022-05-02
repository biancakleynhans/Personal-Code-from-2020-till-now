export function emp_status_maker_rev(emp_code: string) {
  var returner: string = "";
  // console.log('empcode', emp_code);
  if (emp_code === "Active") {
    returner = "01";
  } else if (emp_code === "Deceased") {
    returner = "02";
  } else if (emp_code === "Retired") {
    returner = "03";
  } else if (emp_code === "Dismissed") {
    returner = "04";
  } else if (emp_code === "Contract Expired") {
    returner = "05";
  } else if (emp_code === "Resigned") {
    returner = "06";
  } else if (emp_code === "Constructively Dismissed") {
    returner = "07";
  } else if (emp_code === "Employers Insolvency") {
    returner = "08";
  } else if (emp_code === "Maternity/Adoption leave") {
    returner = "09";
  } else if (emp_code === "Maternity / Adoption leave") {
    returner = "09";
  } else if (emp_code === "Illness leave") {
    returner = "10";
  } else if (emp_code === "Retrenched") {
    returner = "11";
  } else if (emp_code === "Transfer to another branch") {
    returner = "12";
  } else if (emp_code === "Absconded") {
    returner = "13";
  } else if (emp_code === "Business Closed") {
    returner = "14";
  } else if (emp_code === "Death of Domestic Employer") {
    returner = "15";
  } else if (emp_code === "Voluntary Severance Package") {
    returner = "16";
  } else if (emp_code === "Reduced Working Time") {
    returner = "17";
  } else if (emp_code === "") {
    returner = "18";
  } else if (emp_code === "Parental Leave") {
    returner = "19";
  }

  return returner;
}

export function emp_status_maker(emp_code: string) {
  var returner: string = "";
  // console.log('empcode', emp_code);
  if (emp_code === "01") {
    returner = "Active";
  } else if (emp_code === "02") {
    returner = "Deceased";
  } else if (emp_code === "03") {
    returner = "Retired";
  } else if (emp_code === "04") {
    returner = "Dismissed";
  } else if (emp_code === "05") {
    returner = "Contract Expired";
  } else if (emp_code === "06") {
    returner = "Resigned";
  } else if (emp_code === "07") {
    returner = "Constructively Dismissed";
  } else if (emp_code === "08") {
    returner = "Employers Insolvency";
  } else if (emp_code === "09") {
    returner = "Maternity/Adoption leave";
  } else if (emp_code === "10") {
    returner = "Illness leave";
  } else if (emp_code === "11") {
    returner = "Retrenched";
  } else if (emp_code === "12") {
    returner = "Transfer to another branch";
  } else if (emp_code === "13") {
    returner = "Absconded";
  } else if (emp_code === "14") {
    returner = "Business Closed";
  } else if (emp_code === "15") {
    returner = "Death of Domestic Employer";
  } else if (emp_code === "16") {
    returner = "Voluntary Severance Package";
  } else if (emp_code === "17") {
    returner = "Reduced Working Time";
  } else if (emp_code === "18") {
    returner = "";
  } else if (emp_code === "19") {
    returner = "Parental Leave";
  }

  return returner;
}

export function reason_for_non_cont_maker(check_amount_val: string) {
  var returner: string = "";

  if (check_amount_val === "0" || check_amount_val === "0.01") {
    returner = "No income paid for the payroll period";
    return returner;
  } else {
    returner = "";
    return returner;
  }
}

export function generate_ID(idString: string) {
  var idNum: string = "";

  if (idString !== undefined && idString.length === 13) {
    idNum = idString;
  } else if (idString.length < 13) {
    if (idString.length === 10) {
      idNum = `000${idString}`;
    }
    if (idString.length === 11) {
      idNum = `00${idString}`;
    }
    if (idString.length === 12) {
      idNum = `0${idString}`;
    }
  } else {
    idNum = "";
  }
  return idNum;
}

export function cleanUpNames(originalString: string, useSpace: boolean = true) {
  if (useSpace) {
    return originalString.replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, " ");
  } else {
    return originalString.replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, "");
  }
}

export function get2percent(num: string, percent: number = 2) {
  if (num.length < 2) {
    return "0";
  } else {
    var use = 0;
    use = (percent / 100) * Number(num);
    return use.toFixed(2);
  }
}
