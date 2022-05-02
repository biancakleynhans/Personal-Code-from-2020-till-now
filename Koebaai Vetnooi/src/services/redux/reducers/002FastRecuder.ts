import { iAction } from '../../../models/BaseInterfaceModels';
import { NamedDict } from '../../helpers/Tools';
import { iTimePeriod } from '../../../models/FastModels';
import { TypesOfActions } from '../TypesOfActions';

interface iInitStateFast {
	errorMsg: string;
	Fasts: NamedDict<iTimePeriod>;
	editfast: iTimePeriod;
	currentRunningFast: {
		startTime: number;
		id: string;
	};
}

const InitState: iInitStateFast = {
	errorMsg: '',
	Fasts: {},
	editfast: {
		id: '',
		started: false,
		startTime: new Date(),
		endTime: new Date(),
		duration: 0,
		typeofFast: {
			name: '',
			lengthofFast: 0,
			nonFastingTime: 0
		}
	},
	currentRunningFast: {
		startTime: 0,
		id: ''
	}
};

const FastReducer = (state: iInitStateFast = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED:
			return {
				...state,
				Fasts: action.payload.user.fasts,
				currentRunningFast: action.payload.global.fastRunning
			};
		case TypesOfActions.CURRENT_USER_ADDED_FAST:
			return {
				...state,
				Fasts: {
					...state.Fasts,
					[action.payload.fast.id]: action.payload.fast
				}
			};
		case TypesOfActions.CURRENT_USER_UPDATED_FAST:
			return {
				...state,
				Fasts: {
					...state.Fasts,
					[action.payload.fast.id]: action.payload.fast
				}
			};
		case TypesOfActions.CURRENT_USER_STARTED_FAST:
			return {
				...state,
				currentRunningFast: action.payload.fast
			};
		case TypesOfActions.CURRENT_USER_ENDED_FAST:
			return {
				...state,
				currentRunningFast: action.payload.fast
			};

		default:
			return state;
	}
};

export default FastReducer;
