import { i_BaseInterface_User } from '../../models/001UserModels';

export const FakeUser: i_BaseInterface_User = {
	id: '',
	name: '',
	avatar: '',
	imgArray: [],
	bio: '',
	location: {
		address: {
			district: '',
			houseNumber: '',
			street: '',
			city: '',
			state: '',
			postalCode: '',
			country: '',
			county: '',
			label: ''
		},

		locationId: '',
		locationType: '',

		coords: {
			lat: 0,
			long: 0
		}
	},
	lang: '',
	groups: {},
	categories: {},
	events: {},
	donations: {},
	msgHistory: {},
	newMsgs: 0,
	subscriptionType: {
		type: 'free',
		startDate: '',
		payedWith: 'free'
	},
	notifications: [],
	notifyToken: '',
	typesOfsubjectsTonotifyOn: {
		NewEventsNearYou: false,
		NewFollowAddedSomething: false,
		NewItemsinGroups: false,
		NewMessages: true
	},

	UsersFollowingMe: {},
	UsersIfollow: {}
};
