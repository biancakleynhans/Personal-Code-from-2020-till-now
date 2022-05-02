import { iAction } from '../../../models/BaseInterfaceModels';
import { TypesOfActions } from '../TypesOfActions';
import { NamedDict } from '../../helpers/Tools';

export interface iWaterDiaryEntry {
	id: string;
	waterConsumed: number;
	date: number;
}
interface iInitStateWaterDiary {
	errorMsg: string;
	WaterDiary: NamedDict<iWaterDiaryEntry>;
	editWater: iWaterDiaryEntry;
}

const InitState: iInitStateWaterDiary = {
	errorMsg: '',
	WaterDiary: {},
	editWater: {
		id: '',
		waterConsumed: 0,
		date: 0
	}
};

const WaterDiaryReducer = (
	state: iInitStateWaterDiary = InitState,
	action: iAction
) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED:
			return {
				...state,
				WaterDiary: action.payload.user.waterDiary
			};
		case TypesOfActions.CURRENT_USER_ADDED_WATER:
			return {
				...state,
				WaterDiary: {
					...state.WaterDiary,
					[action.payload.water.id]: action.payload.water
				}
			};

		default:
			return state;
	}
};

export default WaterDiaryReducer;
