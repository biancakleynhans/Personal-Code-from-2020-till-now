import { Translate } from './TranslateServices';
import { lsInj } from './LocalLangDict';

export const ErrorStrings = {
	email1:
		Translate(lsInj.transDict.Email) + ' ' + Translate(lsInj.transDict.req),
	email2:
		Translate(lsInj.transDict.Email) + ' ' + Translate(lsInj.transDict.incor),
	email3:
		Translate(lsInj.transDict.Email) + ' ' + Translate(lsInj.transDict.noFound),
	passw1:
		Translate(lsInj.transDict.Passw) + ' ' + Translate(lsInj.transDict.req),
	passw2:
		Translate(lsInj.transDict.Passw) + ' ' + Translate(lsInj.transDict.incor)
};
