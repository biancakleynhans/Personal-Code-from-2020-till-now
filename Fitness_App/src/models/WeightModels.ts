/** @format */

export interface iWeightEntry {
	weight?: string;
	bodyFat?: string;
	muscleMass?: string;
	waterDensity?: string;
	boneDensity?: string;
	notes?: string;
}

export interface WeightObjectForChart {
	date?: Date;
	weight?: number;
}

export interface FormPropsWeight {
	weight?: string;
	bodyFat?: string;
	muscleMass?: string;
	waterDensity?: string;
	boneDensity?: string;
	notes?: string;
}

/////////////////////////////////////////////////////////////////

export interface iWeightMesureEntry {
	date?: Date;
	bust?: string;
	waist?: string;
	hip?: string;
	butt?: string;
	thigh?: string;
	uperArm?: string;
	weight?: string;
}

export interface FormPropsWeightMesure {
	bust?: string;
	waist?: string;
	hip?: string;
	butt?: string;
	thigh?: string;
	uperArm?: string;
	weight?: string;
}
