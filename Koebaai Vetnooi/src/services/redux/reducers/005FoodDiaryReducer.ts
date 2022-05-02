import { iAction } from '../../../models/BaseInterfaceModels';
import { TypesOfActions } from '../TypesOfActions';
import { NamedDict } from '../../helpers/Tools';

export interface iFoodDiaryEntry {
	id: string;
	date: number;
	mealType: string;
	mealContent: string;
}
interface iInitStateFoodDiary {
	errorMsg: string;
	FoodDiary: NamedDict<iFoodDiaryEntry>;
	editWater: iFoodDiaryEntry;
}

const InitState: iInitStateFoodDiary = {
	errorMsg: '',
	FoodDiary: {},
	editWater: {
		id: '',
		date: 0,
		mealType: '',
		mealContent: ''
	}
};

const FoodDiaryReducer = (
	state: iInitStateFoodDiary = InitState,
	action: iAction
) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED:
			return {
				...state,
				FoodDiary: action.payload.user.foodDiary
			};
		case TypesOfActions.CURRENT_USER_ADDED_MEAL:
			return {
				...state,
				FoodDiary: {
					...state.FoodDiary,
					[action.payload.water.id]: action.payload.meal
				}
			};

		default:
			return state;
	}
};

export default FoodDiaryReducer;
