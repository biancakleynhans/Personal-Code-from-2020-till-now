export interface WeightObjectForChart {
	date?: Date;
	weight?: number;
}

export interface iWeightMesureEntry {
	id: string;
	date: number;
	bust: number;
	waist: number;
	hip: number;
	butt: number;
	thigh: number;
	uperArm: number;
	goalWeight: number;
	weight: number;
	height: number;
	activeLevel: string;
	age: number;
	sex: string;
	bmi: number;
	bmr: number;
	calReq: number;
	macros: { carbs: number; fats: number; protein: number };
	dietType: string;
	goalToAchieve: string;
}
