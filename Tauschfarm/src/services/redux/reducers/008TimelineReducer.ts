import { TypesOfActions } from '../TypesOfActions';
import { iAction } from '../../../models/BaseInterfaceModels';
import { iTimeLineEntry } from '../../../models/TimelineModels';
import { NamedDict } from '../../helpers/Tools';

export interface iTimeline {
	tl: NamedDict<iTimeLineEntry>;
	count: number;
}
const InitState = {
	tl: {},
	count: 0
};

const TimelineReducer = (state: iTimeline = InitState, action: iAction) => {
	switch (action.type) {
		case TypesOfActions.APP_DATA_LOADED_USERS:
			return {
				...state,
				tl: action.payload.tl,
				count: action.payload.tlCount
			};
		default:
			return state;
	}
};

export default TimelineReducer;
