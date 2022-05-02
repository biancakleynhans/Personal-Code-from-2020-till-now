import { iTypeofFast } from '../../models/FastModels';
import * as moment from 'moment';

export function GetDurationTextRunning(start?: Date, end?: Date): string {
	// console.log("inside get dur text", start, ":start", end, ":end")
	let vend = end;

	if (!start) return 'Not Started';
	if (!vend) {
		vend = new Date();
	}
	var diff_ms = vend.getTime() - start.getTime();
	var d = moment.duration(diff_ms); // eslint-disable-next-line
	var rs = `${d.hours()}:${d.minutes()}:${d.seconds()}`;
	// console.log(rs, "rs")
	return rs;
}

export function GetDurationTextRemaining(end: Date): string {
	// console.log("inside GetDurationTextRemaining", start, ":start", end, ":end")
	let current = new Date();
	var diff_ms = end.getTime() - current.getTime();
	var d = moment.duration(diff_ms); // eslint-disable-next-line
	var rs = `${d.hours()}:${d.minutes()}:${d.seconds()}`;
	// console.log(rs, "rs")
	return rs;
}

export function SetFastType(name: string, customTime?: number): iTypeofFast {
	console.log('name', name);
	//'Daniël', 'Ester', 'Elia', 'Dissipel'
	var typeOfFast: iTypeofFast = {
		name: '',
		lengthofFast: 0,
		nonFastingTime: 0
	};
	if (name === 'Daniël 21 Days') {
		typeOfFast.name = name;
		typeOfFast.lengthofFast = 504;
		typeOfFast.nonFastingTime = 504;
	} else if (name === 'Ester 3 Days') {
		typeOfFast.name = name;
		typeOfFast.lengthofFast = 72;
		typeOfFast.nonFastingTime = 72;
	} else if (name === 'Elia 24 Hours') {
		typeOfFast.name = name;
		typeOfFast.lengthofFast = 24;
		typeOfFast.nonFastingTime = 24;
	} else if (name === 'Dissipel 12 Hours') {
		typeOfFast.name = name;
		typeOfFast.lengthofFast = 12;
		typeOfFast.nonFastingTime = 12;
	}

	// if (name === '12:12') {
	// 	typeOfFast.name = name;
	// 	typeOfFast.lengthofFast = 12;
	// 	typeOfFast.nonFastingTime = 12;
	// } else if (name === '16:8') {
	// 	typeOfFast.name = name;
	// 	typeOfFast.lengthofFast = 16;
	// 	typeOfFast.nonFastingTime = 8;
	// } else if (name === '18:6') {
	// 	typeOfFast.name = name;
	// 	typeOfFast.lengthofFast = 18;
	// 	typeOfFast.nonFastingTime = 6;
	// } else if (name === '20:4') {
	// 	typeOfFast.name = name;
	// 	typeOfFast.lengthofFast = 20;
	// 	typeOfFast.nonFastingTime = 4;
	// } else if (name === '24:24') {
	// 	typeOfFast.name = name;
	// 	typeOfFast.lengthofFast = 24;
	// 	typeOfFast.nonFastingTime = 24;
	// } else if (name === '24:48') {
	// 	typeOfFast.name = name;
	// 	typeOfFast.lengthofFast = 24;
	// 	typeOfFast.nonFastingTime = 48;
	// }
	else if (name === 'custom' && customTime !== undefined) {
		typeOfFast.name = `custom ${customTime}:${customTime} `;
		typeOfFast.lengthofFast = customTime;
		// console.log('Custom Length: ', typeOfFast.lengthofFast)
		typeOfFast.nonFastingTime = customTime;
	} else {
		typeOfFast.name = 'error';
		typeOfFast.lengthofFast = 0;
		typeOfFast.nonFastingTime = 0;
	}

	return typeOfFast;
}
