/** @format */

//basic
export interface iFoodItem {
	name: string;
	consumptionId: number;
	foodId: string;
	day?: any;
	mealName?: string;
	macros: {
		calories: number;
		protein: number;
		carbs: number;
		fat: number;
	};
	selectedServing: {
		id: any; // selected serving size in Serving select use this value to do map for call on right cal needs
		quantity: number;
		ratio: number;
		servingSize: [{ label: string; uri: string }];
	};
}
//Advanced
export interface iFoodItemComplete {
	id?: string;
	day?: any;
	mealName?: string;

	name: string;
	foodId: string;
	macros: {
		calories: number;
		protein: number;
		carbs: number;
		fat: number;
		fiber: number;
		sodium: number;
	};
	dailyReq: {
		calories: number;
		Calcium: number;
		protein: number;
		carbs: number;
		Cholesterol: number;
		Sugar: number;
		fat: number;
	};
	selectedServing: {
		servingSizeString: any;
		quantity: number;
		yieldTotalPortions: number;
		totalWeightOfFood: number;
		mUriList: [{ label: string; uri: string }];
	};
}

export interface iMeal {
	name: string;
	id: any;
	MealId: string;
	macros: {
		// meals Total macros from all food items toghter who on there turn has own macros
		calories: number;
		protein: number;
		carbs: number;
		fat: number;
	};
	selectedServing: {
		id: string; // selected serving size in Serving select use this value to do map for call on right cal needs
		quantity: number;
		ratio: number;
		servingSize: [{ label: string; uri: string }];
	};

	mealGroupItems: iFoodItemComplete[];
}

export interface iGoals {
	calories: number;
	carbs: number;
	fat: number;
	protein: number;
	fiber: number;
	sodium: number;
	sugar: number;
}

export interface iMealsArray {
	breakfast: { items: Array<iFoodItemComplete>; mealTotals: any };
	lunch: { items: Array<iFoodItemComplete>; mealTotals: any };
	dinner: { items: Array<iFoodItemComplete>; mealTotals: any };
	snacks: { items: Array<iFoodItemComplete>; mealTotals: any };
}

export interface RCPprops {
	meal: string;
	day: string;
}

export const measuresUri = [
	{
		label: 'Ounce',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_ounce',
	},
	{
		label: 'Gram',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_gram',
	},
	{
		label: 'Pound',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_pound',
	},
	{
		label: 'Kilogram',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram',
	},
	{
		label: 'Pinch',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_pinch',
	},
	{
		label: 'Dash',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_dash',
	},
	{
		label: 'Liter',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_liter',
	},
	{
		label: 'FluidOunce',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_fluid_ounce',
	},
	{
		label: 'Gallon',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_gallon',
	},
	{
		label: 'Pint',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_pint',
	},
	{
		label: 'Quart',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_quart',
	},
	{
		label: 'Milliliter',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_milliliter',
	},
	{
		label: 'Drop',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_drop',
	},
	{
		label: 'Ounce',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_cup',
	},
	{
		label: 'Tablespoon',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_tablespoon',
	},
	{
		label: 'Teaspoon',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_teaspoon',
	},
	{
		label: 'Dessertspoon',
		symbol: 'td',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_dessert_spoon',
	},
	{
		label: 'Serving',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_serving',
	},
	{
		label: 'Unit',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_unit',
	},
	{
		label: 'Whole',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_unit',
	},
	{
		label: 'Bunch',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_bunch',
	},
	{
		label: 'Head',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_head',
	},
	{
		label: 'Unit',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_branch',
	},
	{
		label: 'Stalk',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_stalk',
	},
	{
		label: 'Stem',
		uri: 'http://www.edamam.com/ontologies/edamam.owl#Measure_stem',
	},
];

// const NutriList ={
//     Calcium:{
//         NTR_Code:"CA",
//         Name: "Calcium",
//         Unit: "mg"
//     },
//     Energy:{
//         NTR_Code:"ENERC_KCAL",
//         Name: "Energy",
//         Unit: "kcal"
//     },
//     Carbs:{
//         NTR_Code:"CHOCDF",
//         Name: "Carbs",
//         Unit:"g"
//     },
//     Niacin:{
//         NTR_Code:"NIA"	,
//         Name: "Niacin (B3)"	,
//         Unit: "mg"
//     },
//     Cholesterol:{
//         NTR_Code:"CHOLE",
//         Name: "Cholesterol"	,
//         Unit: "mg"
//     },
//     Phosphorus:{
//         NTR_Code:"P",
//         Name: "Phosphorus"	,
//         Unit: "mg"
//     },
//     Monounsaturated_fat: {
//         NTR_Code:"FAMS"	,
//         Name: "Monounsaturated"	,
//         Unit: "g"
//     },
//     Protein:{
//         NTR_Code:"PROCNT",
//         Name: "Protein"	,
//         Unit: "g"
//     },
//     Polyunsaturated_Fat:{
//         NTR_Code:"FAPU"	,
//         Name: "Polyunsaturated"	,
//         Unit: "g"
//     },
//     Riboflavin:{
//         NTR_Code:"RIBF"	,
//         Name: "Riboflavin (B2)"	,
//         Unit: "mg"
//     },
//     Saturated_Fat:{
//         NTR_Code:"FASAT",
//         Name: "Saturated",
//         Unit: "g"
//     },
//     Sugars:{
//         NTR_Code:"SUGAR",
//         Name: "Sugars",
//         Unit: "g"
//     },
//     Fat:{
//         NTR_Code:"FAT",
//         Name: "Fat"	,
//         Unit: "g"
//     },
//     Thiamin: {
//         NTR_Code:"THIA",
//         Name: "Thiamin (B1)",
//         Unit: "mg"
//     },
//     Trans_Fat:{
//         NTR_Code:"FATRN",
//         Name: "Trans",
//         Unit: "g"
//     },
//     Vitamin_E:{
//         NTR_Code:"TOCPHA",
//         Name: "Vitamin E",
//         Unit: "mg"
//     },
//     Iron:{
//         NTR_Code:"FE",
//         Name: "Iron",
//         Unit: "mg"
//     },
//     Vitamin_A:{
//         NTR_Code:"VITA_RAE",
//         Name: "Vitamin A",
//         Unit: "æg"
//     },
//     Fiber:{
//         NTR_Code:"FIBTG",
//         Name: "Fiber",
//         Unit: "g"
//     },
//     Vitamin_B12:{
//         NTR_Code:"VITB12",
//         Name: "Vitamin B12"	,
//         Unit: "æg"
//     },
//     Folate: {
//         NTR_Code:"FOLDFE",
//         Name: "Folate (Equivalent)",
//         Unit: "æg"
//     },
//     Vitamin_B6:{
//         NTR_Code:"VITB6A",
//         Name: "Vitamin B6",
//         Unit: "mg"
//     },
//     Potassium:{
//         NTR_Code:"K",
//         Name: "Potassium",
//         Unit: "mg"
//     },
//     Vitamin_C:{
//         NTR_Code:"VITC",
//         Name: "Vitamin C",
//         Unit: "mg"
//     },
//     Magnesium:{
//         NTR_Code:"MG",
//         Name: "Magnesium",
//         Unit: "mg"
//     },
//     Vitamin_D:{
//         NTR_Code:"VITD",
//         Name: "Vitamin D",
//         Unit: "æg"
//     },
//     Sodium:{
//         NTR_Code:"NA",
//         Name: "Sodium",
//         Unit: "mg"
//     },
//     Vitamin_K:{
//         NTR_Code:"VITK1",
//         Name:"Vitamin K",
//         Unit: "æg"
//     }
// }
