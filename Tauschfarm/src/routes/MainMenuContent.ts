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
			title: Translate(lsInj.transDict.Donations),
			path: AllRoutesListed.dontationRoutes.User_Dons_Landing
		},
		{
			title: Translate(lsInj.transDict.ProfileSettings),
			path: AllRoutesListed.userRoutes.dash_Settings
		},
		{
			title: Translate(lsInj.transDict.GroupSettings),
			path: AllRoutesListed.groupRoutes.dash_Groups_Landing
		},
		{
			title: Translate(lsInj.transDict.AccountSettings),
			path: AllRoutesListed.userRoutes.dash_Acc_Landing
		},
		{
			title: Translate(lsInj.transDict.Support),
			path: AllRoutesListed.userRoutes.dash_Acc_Support
		},
		// {
		// 	title: Translate(lsInj.transDict.Subcriptions),
		// 	path: AllRoutesListed.userRoutes.dash_Acc_Subs
		// },
		{
			title: Translate(lsInj.transDict.Signout),
			path: AllRoutesListed.userRoutes.dash_Acc_Landing
		}
	]
};
