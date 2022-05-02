/** @format */

export interface iTypeofFast {
	name: string;
	lengthofFast: number;
	nonFastingTime: number;
}

export interface iCurrentType {
	single: boolean;
	//typeofFast?: TypeofFast
}

export interface iTypeofDisplay {
	id: number;
	name: string;
}

export interface iTimePeriod {
	started: boolean;
	startTime: Date;
	endTime?: Date;
	duration?: Number;
	typeofFast?: { name: String; lengthofFast: Number; nonFastingTime: Number };
}

export const typeOfFastTimeEx = {
	'12:12': { name: '12:12', lengthofFast: 12, nonFastingTime: 12 },
	'16:8': { name: '16:8', lengthofFast: 16, nonFastingTime: 8 },
	'18:6': { name: '18:6', lengthofFast: 18, nonFastingTime: 6 },
	'20:4': { name: '20:4', lengthofFast: 20, nonFastingTime: 4 },
	'24:24': { name: '24:24', lengthofFast: 24, nonFastingTime: 24 },
	'24:48': { name: '24:48', lengthofFast: 24, nonFastingTime: 48 },
};

export const typeOfFastTime = {
	fastTypeTimes: ['12:12', '16:8', '18:6', '20:4', '24:24', '24:48', 'custom'],
};

export const FastProgressText = {
	beforeStart: 'Gereed om vas te begin',
	start: 'Welgedaan met die begin van u vas',
	firstQuarter: 'Kom staan sterk dis nog die begin',
	half: 'Staan vas dis halfpad gedaan',
	lastQuarter: 'Amper Korrek aanhouer wen',
	end: 'welgedaan nog i vas is gedoen geluk',
	pastEnd: 'Wow fantasiese passie om aan te hou elke eksta maak i verskil',
};

export interface iEditTimePeriod {
	id: string;
	startTime: Date;
	endTime: Date;
	duration?: Number;
	typeofFast?: { name: String; lengthofFast: Number; nonFastingTime: Number };
}

export interface FormPropsFast {
	initialstartTime?: Date;
	initialendTime?: Date;
	initialduration?: Number;
	initialtypeofFast?: { name: String; lengthofFast: Number; nonFastingTime: Number };
}
