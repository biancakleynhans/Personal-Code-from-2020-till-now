/** @format */

import { iTimePeriod } from '../../models/FastModels';
import { iTypeofFast } from '../../models/FastModels';

//type of fast
export function getType() {
	var ls = localStorage.getItem('CurrentType');
	var parse = { name: '', lengthofFast: 0, nonFastingTime: 0, isSet: false };
	if (ls !== null) {
		parse = {
			name: JSON.parse(ls).name,
			lengthofFast: JSON.parse(ls).lengthofFast,
			nonFastingTime: JSON.parse(ls).nonFastingTime,
			isSet: true
		};
		return parse;
	} else {
		return parse;
	}
}

export function setType(type: iTypeofFast) {
	return localStorage.setItem('CurrentType', JSON.stringify(type));
}

export function removeType() {
	return localStorage.removeItem('CurrentType');
}

//fast timer Running

export function getTimerRunning() {
	var ls = localStorage.getItem('TimerRunning');
	if (ls !== null) {
		var parse = JSON.parse(ls);
		return parse;
	}
	if (ls === null) {
		return;
	}
}

export function setTimerRunning(type: Date) {
	return localStorage.setItem('TimerRunning', JSON.stringify(type));
}

export function removeTimerRunning() {
	return localStorage.removeItem('TimerRunning');
}

//fast timer Done

export function getTimerDone() {
	var ls = localStorage.getItem('TimerDone');
	if (ls !== null) {
		var parse = {
			startTime: Date,
			endTime: Date,
			duration: 0,
			typeOfFast: { name: '', lengthofFast: 0, nonFastingTime: 0 },
			targetComplete: ''
		};
		parse = JSON.parse(ls);
		return parse;
	}
	if (ls === null) {
		return;
	}
}

export function setTimerDone(type: iTimePeriod) {
	return localStorage.setItem('TimerDone', JSON.stringify(type));
}

export function removeTimerDone() {
	return localStorage.removeItem('TimerDone');
}
