import { Translate } from '../services/translate/TranslateServices';
import { lsInj } from '../services/translate/LocalLangDict';
import { AllRoutesListed } from './AllRoutesListed';

export const MainMenuContent = {
	appPagesLoggedIn: [
		{
			title: Translate(lsInj.transDict.About),
			path: AllRoutesListed.otherRoutes.about
		},
		{
			title: Translate(lsInj.transDict.ProfileSettings),
			path: AllRoutesListed.userRoutes.dash_Settings
		},
		{
			title: Translate(lsInj.transDict.AccountSettings),
			path: AllRoutesListed.accountRoutes.dash_Acc_Landing
		},
		{
			title: Translate(lsInj.transDict.chatHeader),
			path: AllRoutesListed.otherRoutes.chat
		},
		{
			title: Translate(lsInj.transDict.Links),
			path: AllRoutesListed.otherRoutes.externalLinks
		},
		{
			title: Translate(lsInj.transDict.Signout),
			path: AllRoutesListed.accountRoutes.dash_Acc_Landing
		}
	]
};
