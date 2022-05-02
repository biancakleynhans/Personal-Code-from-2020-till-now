/** @format */

import { Translate } from './TranslateServices';
import { lsInj } from './LocalLangDict';

export const CombinedString = {
	profileName:
		Translate(lsInj.transDict.Profile) + ' ' + Translate(lsInj.transDict.Name),
	profilePhoto:
		Translate(lsInj.transDict.Profile) +
		' ' +
		Translate(lsInj.transDict.PhotoSingle),
	profilePhotos:
		Translate(lsInj.transDict.Profile) +
		' ' +
		Translate(lsInj.transDict.PhotoMultiple),
	profileSettings:
		Translate(lsInj.transDict.Profile) +
		' ' +
		Translate(lsInj.transDict.Settings),

	profileSettingsEditPhotos:
		Translate(lsInj.transDict.Edit) +
		' ' +
		Translate(lsInj.transDict.PhotoSingle),
	profileSettingsAddPhotos:
		Translate(lsInj.transDict.Add) +
		' ' +
		Translate(lsInj.transDict.PhotoSingle),
	profileSettingsChangePhotos:
		Translate(lsInj.transDict.Change) +
		' ' +
		Translate(lsInj.transDict.PhotoSingle)
};
