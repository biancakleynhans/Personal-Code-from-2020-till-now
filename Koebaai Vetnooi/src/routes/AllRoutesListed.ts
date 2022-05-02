export const AllRoutesListed = {
	otherRoutes: {
		about: '/about',
		changeLoc: '/changeLoc',
		recipes: '/recipes',
		books: '/books',
		emo: '/emo',
		chat: '/chatPage',
		agentStory: '/story/:agentName',
		externalLinks: '/links'
	},
	classroom: {
		landing: '/classroom'
	},
	authRoutes: {
		login: '/login',
		registerOrHome: '/',
		forgotPassword: '/reset'
	},
	userRoutes: {
		dash_Landing: '/dashboard',
		dash_Settings: '/dashboard/settings',
		dash_Settings_Profile_Img_Add: '/dashboard/settings/imgBio',
		dash_Settings_Profile_Img_Edit: '/dashboard/settings/imgBio/:imgNr',
		dash_Settings_UserData: '/dashboard/userData',
		dashScale: '/dashboard/scalePhoto'
	},
	accountRoutes: {
		dash_Acc_Landing: '/dashboard/acc',
		dash_Acc_Subs: '/dashboard/acc/subcriptions',
		dash_Acc_Privacy: '/dashboard/acc/privicy',
		dash_Acc_Notify: '/dashboard/acc/notify',
		dash_Acc_Support: '/dashboard/support'
	},
	fastRoutes: {
		fastType: '/fastType',
		fastTimer: '/fastTimer',
		fastHist: '/fastHistory',
		fastEdit: '/fastEdit/:id'
	},
	weightRoutes: {
		weightAdd: '/weightAdd',
		weightHist: '/weightHistory'
	},
	waterDiarRoutes: {
		main: '/waterDiary'
	},
	foodDiaryRoute: {
		add: '/add/fooddiary',
		hist: '/hist/fooddiary'
	},
	adminRoutes: {
		main: '/mainAdmin',
		selectedUser: '/mainAdmin/:userId'
	}
};
