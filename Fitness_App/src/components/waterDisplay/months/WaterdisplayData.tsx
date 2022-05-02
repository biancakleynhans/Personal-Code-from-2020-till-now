/** @format */

import moment from 'moment';
import { NamedDict } from '../../../helpers/Tools';

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
				perday: {},
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

	console.log(`waterdisplaydatatransformed ${JSON.stringify(months, undefined, 4)}`);

	var arrToReturn: any[] = [];
	Object.entries(months).forEach(key => {
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

export function getWaterfromLs() {
	var JanArr: any[] = [];
	var FebArr: any[] = [];
	var MarArr: any[] = [];
	var AprArr: any[] = [];
	var MayArr: any[] = [];
	var JunArr: any[] = [];
	var JulArr: any[] = [];
	var AugArr: any[] = [];
	var SepArr: any[] = [];
	var OctArr: any[] = [];
	var NovArr: any[] = [];
	var DecArr: any[] = [];

	var ls1 = localStorage.getItem('JanArr');
	var ls2 = localStorage.getItem('FebArr');
	var ls3 = localStorage.getItem('MarArr');
	var ls4 = localStorage.getItem('AprArr');
	var ls5 = localStorage.getItem('MayArr');
	var ls6 = localStorage.getItem('JunArr');
	var ls7 = localStorage.getItem('JulArr');
	var ls8 = localStorage.getItem('AugArr');
	var ls9 = localStorage.getItem('SepArr');
	var ls10 = localStorage.getItem('OctArr');
	var ls11 = localStorage.getItem('NovArr');
	var ls12 = localStorage.getItem('DecArr');

	if (ls1 !== null) {
		JanArr = JSON.parse(ls1);
	} else {
		JanArr = [];
	}
	if (ls2 !== null) {
		FebArr = JSON.parse(ls2);
	} else {
		FebArr = [];
	}
	if (ls3 !== null) {
		MarArr = JSON.parse(ls3);
	} else {
		MarArr = [];
	}
	if (ls4 !== null) {
		AprArr = JSON.parse(ls4);
	} else {
		AprArr = [];
	}
	if (ls5 !== null) {
		MayArr = JSON.parse(ls5);
	} else {
		MayArr = [];
	}
	if (ls6 !== null) {
		JunArr = JSON.parse(ls6);
	} else {
		JunArr = [];
	}
	if (ls7 !== null) {
		JulArr = JSON.parse(ls7);
	} else {
		JulArr = [];
	}
	if (ls8 !== null) {
		AugArr = JSON.parse(ls8);
	} else {
		AugArr = [];
	}
	if (ls9 !== null) {
		SepArr = JSON.parse(ls9);
	} else {
		SepArr = [];
	}
	if (ls10 !== null) {
		OctArr = JSON.parse(ls10);
	} else {
		OctArr = [];
	}
	if (ls11 !== null) {
		NovArr = JSON.parse(ls11);
	} else {
		NovArr = [];
	}
	if (ls12 !== null) {
		DecArr = JSON.parse(ls12);
	} else {
		DecArr = [];
	}

	return {
		JanArr,
		FebArr,
		MarArr,
		AprArr,
		MayArr,
		JunArr,
		JulArr,
		AugArr,
		SepArr,
		OctArr,
		NovArr,
		DecArr,
	};
}

export function setWaterfromLs(
	JanArr?: any[],
	FebArr?: any[],
	MarArr?: any[],
	AprArr?: any[],
	MayArr?: any[],
	JunArr?: any[],
	JulArr?: any[],
	AugArr?: any[],
	SepArr?: any[],
	OctArr?: any[],
	NovArr?: any[],
	DecArr?: any[],
) {
	if (JanArr !== undefined) {
		localStorage.setItem('JanArr', JSON.stringify(JanArr));
	}
	if (FebArr !== undefined) {
		localStorage.setItem('FebArr', JSON.stringify(FebArr));
	}
	if (MarArr !== undefined) {
		localStorage.setItem('MarArr', JSON.stringify(MarArr));
	}
	if (AprArr !== undefined) {
		localStorage.setItem('AprArr', JSON.stringify(AprArr));
	}
	if (MayArr !== undefined) {
		localStorage.setItem('MayArr', JSON.stringify(MayArr));
	}
	if (JunArr !== undefined) {
		localStorage.setItem('JunArr', JSON.stringify(JunArr));
	}
	if (JulArr !== undefined) {
		localStorage.setItem('JulArr', JSON.stringify(JulArr));
	}
	if (AugArr !== undefined) {
		localStorage.setItem('AugArr', JSON.stringify(AugArr));
	}
	if (SepArr !== undefined) {
		localStorage.setItem('SepArr', JSON.stringify(SepArr));
	}
	if (OctArr !== undefined) {
		localStorage.setItem('OctArr', JSON.stringify(OctArr));
	}
	if (NovArr !== undefined) {
		localStorage.setItem('NovArr', JSON.stringify(NovArr));
	}
	if (DecArr !== undefined) {
		localStorage.setItem('DecArr', JSON.stringify(DecArr));
	}
}
