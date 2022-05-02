export class NamedDict<T> {
	[v: string]: T;
}
export function NamedDictKeyValues<T>(d: NamedDict<T>) {
	return Object.keys(d).map((k) => {
		return { k: k, v: d[k] };
	});
}

export function BMI(weight: number, height: number) {
	//  weight/(height/100*height/100)
	console.log(weight, height, 'got this info for bmi');
	if (weight !== undefined && height !== undefined) {
		var bmi = weight / (((height / 100) * height) / 100);
		console.log(bmi, 'BMI');
		return +bmi.toFixed(2);
	} else {
		return 0;
	}
}

export function BMR(
	age: number,
	weight: number,
	height: number,
	gender: string
) {
	// BMR for Men = 66.47 + (13.7 * weight [kg]) + (5 * height [cm]) − (6.8 * age [years])
	// BMR for Women = 655.1 + (9.6 * weight [kg]) + (1.8 * height [cm]) − (4.7 * age [years])
	//console.log(age, weight, height, gender, "got this info for bmr")

	if (
		weight !== undefined &&
		height !== undefined &&
		age !== undefined &&
		gender !== undefined
	) {
		if (gender === 'female') {
			var bmi = 655.1 + 9.6 * weight + 1.8 * height - 4.7 * age;
			//console.log("female", bmi)
			return +bmi.toFixed(2);
		}
		if (gender === 'male') {
			var bmiM = 66.47 + 13.7 * weight + 5 * height - 6.8 * age;
			//console.log("male", bmiM)
			return +bmiM.toFixed(2);
		} else {
			return 0;
		}
	} else {
		return 0;
	}
}

export function CALORIES_REQUIRED(activeLevel: string, bmr: number) {
	var calReq = 0;
	if (activeLevel === 'None') {
		var cal = +bmr * 1.2;
		console.log(cal, 'cal');
		return (calReq = +cal.toFixed(2));
	}
	if (activeLevel === 'Light') {
		var cal1 = +bmr * 1.375;
		console.log(cal1, 'cal');
		return (calReq = +cal1.toFixed(2));
	}
	if (activeLevel === 'Moderate') {
		var cal2 = +bmr * 1.55;
		console.log(cal2, 'cal');
		return (calReq = +cal2.toFixed(2));
	}
	if (activeLevel === 'Very') {
		var cal3 = +bmr * 1.725;
		console.log(cal3, 'cal');
		return (calReq = +cal3.toFixed(2));
	}
	if (activeLevel === 'Extra') {
		var cal4 = +bmr * 1.9;
		console.log(cal4, 'cal');
		return (calReq = +cal4.toFixed(2));
	}

	console.log('calReq', calReq);
	return calReq;
}

export function MacroMaker(diettype: string) {
	console.log('diettype', diettype);
	//"keto" "banting""highCarb""vegan""vegetarian""highProtein"
	var macros = { carb: 0, fat: 0, protein: 0 };

	if (diettype === 'keto') {
		return (macros = { carb: 5, fat: 70, protein: 25 });
	}
	if (diettype === 'banting') {
		return (macros = { carb: 10, fat: 60, protein: 30 });
	}
	if (diettype === 'highCarb') {
		return (macros = { carb: 55, fat: 15, protein: 30 });
	}
	if (diettype === 'vegan') {
		return (macros = { carb: 50, fat: 30, protein: 20 });
	}
	if (diettype === 'vegetarian') {
		return (macros = { carb: 50, fat: 30, protein: 20 });
	}
	if (diettype === 'highProtein') {
		return (macros = { carb: 10, fat: 40, protein: 50 });
	}
	if (diettype === 'koebaaiVetnoi') {
		return (macros = { carb: 15, fat: 35, protein: 50 });
	}

	return macros;
}
