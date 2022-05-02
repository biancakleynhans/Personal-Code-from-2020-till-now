/** @format */

import moment from 'moment';
import { NamedDict } from '../../../services/helpers/Tools';

interface waterDataFormat {
	date: string;
	id: string;
	waterConsumed: number;
}

export interface iWaterDataPerMonthAndDay {
	year: number;
	month: number;
	perday: NamedDict<{ totalWater: number }>;
}

export default function WaterdisplayData(dataArr: waterDataFormat[]) {
	var months = dataArr.reduce((s, c) => {
		var ts = moment(new Date(c.date));
		var monthKey = ts.format('YYYY-MM');

		var m = s[monthKey];
		if (!m) {
			var year_month = monthKey.split('-');
			m = {
				year: parseInt(year_month[0]),
				month: parseInt(year_month[1]),
				perday: {}
			};
			s[monthKey] = m;
		}
		var day = parseInt(ts.format('D'));
		if (!m.perday[day]) {
			m.perday[day] = { totalWater: 0 };
		}
		m.perday[day].totalWater += c.waterConsumed;
		return s;
	}, {} as NamedDict<iWaterDataPerMonthAndDay>);

	// console.log(
	// 	`waterdisplaydatatransformed ${JSON.stringify(months, undefined, 4)}`
	// );

	var arrToReturn: any[] = [];
	Object.entries(months).forEach((key) => {
		var obj: any,
			// eslint-disable-next-line
			{} = {};
		obj = key[1];
		// obj.id = key[0]
		// console.log("obj", obj)
		arrToReturn.push(obj);
	});

	return arrToReturn;
	// return months
}
