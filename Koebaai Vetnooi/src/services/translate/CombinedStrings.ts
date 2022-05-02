import { Translate } from './TranslateServices';
import { lsInj } from './LocalLangDict';

export const CombinedString = {
	profileName: Translate(lsInj.transDict.Profile) + ' ' + Translate(lsInj.transDict.Name),
	profileSettings: Translate(lsInj.transDict.Profile) + ' ' + Translate(lsInj.transDict.Settings)
};
