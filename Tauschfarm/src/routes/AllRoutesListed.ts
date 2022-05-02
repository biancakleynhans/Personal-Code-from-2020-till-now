export const AllRoutesListed = {
	otherRoutes: {
		about: '/about',
		changeLoc: '/changeLoc',
		midleWarePageCats: '/homeBasedCategories/:userName/:catName/:groupName',
		tc: '/termsConditions',
		tl: '/timeline'
	},
	authRoutes: {
		login: '/login',
		registerOrHome: '/',
		forgotPassword: '/reset',
		loginFB: '/loginFacebook'
	},
	userRoutes: {
		dash_Landing: '/dashboard',
		dash_Settings: '/dashboard/settings/:isFirst',
		dash_Settings_Profile_Img_Add: '/dashboard/settings/imgBio',
		dash_Settings_Profile_Img_Edit: '/dashboard/settings/imgBio/:imgNr',
		dash_Settings_Cat_Edit: '/dashboard/settings/categories/editCat/:catName',
		dash_Settings_Cat_Delete: '/dashboard/settings/categories/deleteCat/:catName',

		//from profile page
		dash_Cats: '/dashboard/categories',
		dash_CatsAll: '/dashboard/categories/all',
		dash_Cats_Select: '/dashboard/categories/selectedCategory/:catname/:userId',
		dash_Cats_Item: '/dashboard/categories/selectedCategory/:catname/selectedItem/:itemname/:groupId/:userId',
		dash_Cats_Item_Edit: '/dashboard/categories/selectedCategory/:catname/selectedItem/:itemname/editItem/:itemId/:groupId',
		dash_Cats_ItemImg_Edit: '/dashboard/categories/selectedCategory/:catname/selectedItem/:itemname/editImg/:itemId/:groupId/:imgIndex',

		dash_Cats_ItemDelete: '/item/delete/:itemId/:userWhoDeleted/:userWhoAdded/:userOrGroup/:itemCat/:groupId',
		dash_Acc_Landing: '/dashboard/acc',
		dash_Acc_Privacy: '/dashboard/acc/privicy',
		dash_Acc_Notify: '/dashboard/acc/notify',
		// dash_Acc_Subs: '/dashboard/acc/subcriptions',
		dash_Acc_Support: '/dashboard/support',

		create_Item: '/createItem/:idOfUserOrGroup/:userOrGroup',
		create_Item_Img: '/createItem/imgDesc/:idOfUserOrGroup/:userOrGroup',
		create_ItemImgEdit: '/createItem/imgDesc/:idOfUserOrGroup/:userOrGroup/:imgIndex',
		create_Group: '/createGroup/:idOfUserOrGroup/:userOrGroup',
		create_Group_Img: '/createGroup/imgDesc/:idOfUserOrGroup/:userOrGroup',
		create_Event: '/createEvent/:idOfUserOrGroup/:userOrGroup',
		create_Event_Img: '/createEvent/imgDesc/:idOfUserOrGroup/:userOrGroup'
	},
	catagoryRoutes: {
		//main page
		cats_Landing: '/categories',
		cats_Selected: '/categories/selectedCategory/:catname/:groupId',
		cats_Item: '/categories/selectedCategory/:catname/selectedItem/:itemId/:groupId',
		cats_Selected1: '/categories/selectedCategory/:catname',
		cats_Item1: '/categories/selectedCategory/:catname/selectedItem/:itemId/:userId/:userOrGroup'
	},
	dontationRoutes: {
		User_Dons_Landing: '/userDonations',
		User_Dons_Item: '/userDonations/selectedItem/:itemname',
		User_Dons_Item_Edit: '/userDonations/selectedItem/:itemId/edit',
		User_Dons_Item_Img_Edit: '/userDonations/selectedItem/:itemId/:index/editImg',
		User_Dons_Item_Img_Add: '/userDonations/selectedItem/:itemId/addImg',
		User_Dons_Item_Delete: '/userDonations/selectedItem/:itemId/delete',
		Global_Dons_Landing_fromHomeScreen: '/donations',
		Global_Dons_Item_fromHomeScreen: '/donations/selectedItem/:itemname'
	},
	eventRoutes: {
		events_Landing: '/events',

		events_Selected: '/events/selectedEvent/:eventname/:userName',
		events_Selected_Edit: '/events/editEvent/selectedEvent/:eventname',
		events_SelectedImg_Edit: '/events/editIMG/selectedEvent/:eventname/:indexImg',
		events_Selected_Delete: '/events/delete/selectedEvent/:eventname',
		event_SeeGoing: '/events/seeStats/going/:eventId',
		event_SeeIntrested: '/events/seeStats/intrested/:eventId',

		events_HomePage_Selected: '/events/selectedEvent/:eventname/:userOwnsEvent'
	},
	groupRoutes: {
		//group settings
		dash_Groups_ProfilePage: '/groups/dashboard/:groupId',
		groups_Selected_allCats: '/groups/selectedGroup/:groupname/categories',
		groups_Selected_Cat: '/groups/selectedGroup/:groupname/selectedCatagory/:catname',
		groups_Item: '/groups/selectedGroup/:groupname/selectedCatagory/:catname/selectedItem/:itemId/:groupId/:userOrGroup',

		group_joinReqs: '/groups/selectedGroup/requests/:groupId',
		group_members: '/group/:groupId/members',

		dash_Groups_Selected: '/dashboard/groups/selectedGroup/:groupname/:isfirst',
		dash_Groups_Selected_Img_Edit: '/dashboard/groups/:group/imgBio/:index',
		dash_Groups_Selected_Cat_Edit: '/dashboard/groups/categories/editCat/:catname/:group',
		dash_Groups_Selected_Cat_Delete: '/dashboard/groups/categories/deleteCat/:catname/:group',
		dash_Groups_Delete: '/dashboard/groups/delete/selectedGroup/:groupname',

		//main tabs
		dash_Groups_Landing: '/dashboard/groups',
		groups_Landing: '/groups',

		//main tab bottom
		groups_Selected: '/groups/selectedGroup/:groupname',
		groups_Selected_Item: '/groups/selectedGroup/:groupname/cat/:catname/item/:itemId',

		//new added
		group_history: '/groups/history/:groupId',
		group_add_post: '/groups/addPost/:groupId'
	},
	globaRoutes: {
		userProfileView: '/user/:userId'
	},
	itemRoutes: {},

	chatSide: {
		root: '/chats',
		chatOn: '/chats/:currentUser/withUser/:currentPeerUser'
	},
	members: {
		homePage: '/AllUsersOfthisApp',
		landing: '/members/:memberId/:currentUser',
		seeCurrentUsersFollowers: '/dashboard/members/:followOrFollowing/:globalUser'
	}
};
