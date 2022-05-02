import { iAction } from '../../../models/BaseInterfaceModels';
import { TypesOfActions } from '../TypesOfActions';
import { NamedDict } from '../../helpers/Tools';
import { iWeightMesureEntry } from '../../../models/WeightModels';
interface iInitStateWeight {
	errorMsg: string;
	Weights: NamedDict<iWeightMesureEntry>;
	editWeight: iWeightMesureEntry;
}

const InitState: iInitStateWeight = {
	errorMsg: '',
	Weights: {},
	editWeight: {
		id: '',
		date: 0,
		bust: 0,
		waist: 0,
		hip: 0,
		butt: 0,
		thigh: 0,
		uperArm: 0,
		weight: 0,
		goalWeight: 0,
		height: 0,
		activeLevel: '',
		age: 0,
		sex: '',
		bmi: 0,
		bmr: 0,
		calReq: 0,
		macros: { carbs: 0, fats: 0, protein: 0 },
		dietType: '',
		goalToAchieve: ''
	}
};

const WeightReducer = (state: iInitStateWeight = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED:
			return {
				...state,
				Weights: action.payload.user.weights
			};
		case TypesOfActions.CURRENT_USER_ADDED_WEIGHT:
			return {
				...state,
				Weights: {
					...state.Weights,
					[action.payload.weight.id]: action.payload.weight
				}
			};

		default:
			return state;
	}
};

export default WeightReducer;
