import { NamedDict } from './Tools';
import { i_BaseInterface_Category } from '../../models/002CatagoryModels';
import { i_BaseInterface_Group } from '../../models/004GroupModels';
import { i_DonsNeedToGetAllCatsForAgroup, ItemsFoundObj } from '../../models/0003DonationModels';
import { convertObjectToArray } from '../ownServices/ConverterFuncs';
import { i_BaseInterface_Item } from '../../models/006ItemModels';

export function DonsFunctionBeforeMoveitemtoDons(catsOldUser: NamedDict<i_BaseInterface_Category>, catsOldGroup: NamedDict<i_BaseInterface_Group>, userId: string) {
	// const catsOldUser = getState().category.UserCats;
	// const catsOldGroup = getState().groups.UserGroups;
	// const userId = getState().user.id;

	var allUsersCats: i_DonsNeedToGetAllCatsForAgroup[] = [];
	var allGroupsCats: i_DonsNeedToGetAllCatsForAgroup[] = [];
	var allCatsCombined: i_DonsNeedToGetAllCatsForAgroup[] = [];

	var objUser: i_DonsNeedToGetAllCatsForAgroup = {
		cats: {},
		userAddedId: '',
		userId: '',
		groupId: '',
		userOrGroup: ''
	};

	convertObjectToArray(catsOldUser).map((catMap: i_BaseInterface_Category) => {
		objUser = {
			cats: {
				...objUser?.cats,
				[catMap.checkMatch]: catMap
			},
			userId: userId,
			userAddedId: userId,
			groupId: '',
			userOrGroup: 'user'
		};

		return objUser;
	});
	allUsersCats.push(objUser);

	convertObjectToArray(catsOldGroup).map((groupMap: i_BaseInterface_Group) => {
		var objGroup: i_DonsNeedToGetAllCatsForAgroup = {
			cats: {},
			groupId: '',
			userOrGroup: '',
			userAddedId: '',
			userId: ''
		};

		if (convertObjectToArray(groupMap.categories).length === 0) {
			objGroup = {
				cats: {},
				groupId: groupMap.id,
				userOrGroup: 'group',
				userAddedId: '',
				userId: ''
			};
		}
		convertObjectToArray(groupMap.categories).map((catMap: i_BaseInterface_Category) => {
			objGroup = {
				cats: {
					...objGroup?.cats,
					[catsOldGroup[groupMap.id].categories[catMap.checkMatch].checkMatch]: catsOldGroup[groupMap.id].categories[catMap.checkMatch]
				},
				groupId: groupMap.id,
				userOrGroup: 'group',
				userAddedId: '',
				userId: ''
			};
			return objGroup;
		});
		allGroupsCats.push(objGroup);
		return allGroupsCats;
	});

	if (allGroupsCats.length > 0) {
		allCatsCombined = allUsersCats.concat(allGroupsCats);
	} else {
		allCatsCombined = allUsersCats;
	}

	// console.log('catsOldUser', catsOldUser);
	// console.log('catsOldGroup', catsOldGroup);
	// console.log('allGroupsCats', allGroupsCats);
	// console.log('allUsersCats', allUsersCats);
	// console.log('allCatsCombined', allCatsCombined);
	return allCatsCombined;
}

export function ItemsFoundArrayGeneratorForDons(catsForAll: i_DonsNeedToGetAllCatsForAgroup[], itemId: string) {
	var itemsFoundArray: ItemsFoundObj[] = [];

	catsForAll.map((entry: i_DonsNeedToGetAllCatsForAgroup) => {
		convertObjectToArray(entry.cats).map((catEntry: i_BaseInterface_Category) => {
			convertObjectToArray(catEntry.items).map((catItemInEntry: i_BaseInterface_Item) => {
				if (catItemInEntry.id === itemId) {
					var obj = {
						itemId: itemId,
						category: catEntry.checkMatch,
						userId: entry.userId,
						groupId: entry.groupId,
						userOrGroup: entry.userOrGroup
					};

					itemsFoundArray.push(obj);
					return itemsFoundArray;
				}
				return itemsFoundArray;
			});
			return itemsFoundArray;
		});
		return itemsFoundArray;
	});
	return itemsFoundArray;
}

export function cleaningTheCatsforState(catsOldUser: NamedDict<i_BaseInterface_Category>, catsOldGroup: NamedDict<i_BaseInterface_Group>, itemId: string) {
	// reciving
	// console.log('catsOldUser', catsOldUser);
	// console.log('catsOldGroup', catsOldGroup);

	// returning
	var allUsersCats: NamedDict<i_BaseInterface_Category> = { ...catsOldUser };
	var allGroupsCats: NamedDict<i_BaseInterface_Group> = { ...catsOldGroup };

	convertObjectToArray(catsOldUser).map((catMap: i_BaseInterface_Category) => {
		// console.log('catMap', catMap);

		if (allUsersCats[catMap.checkMatch] !== undefined) {
			if (allUsersCats[catMap.checkMatch].items !== undefined) {
				// console.log('items', catMap.items);

				if (allUsersCats[catMap.checkMatch].items[itemId] !== undefined) {
					delete allUsersCats[catMap.checkMatch].items[itemId];
					return allUsersCats;
				}
			}
		}
		return allUsersCats;
	});

	convertObjectToArray(catsOldGroup).map((groupMap: i_BaseInterface_Group) => {
		if (allGroupsCats[groupMap.id] !== undefined) {
			if (allGroupsCats[groupMap.id].categories !== undefined) {
				// console.log('cats', groupMap.categories);

				convertObjectToArray(groupMap.categories).map((catMap: i_BaseInterface_Category) => {
					// console.log('catMap', catMap);

					if (allGroupsCats[groupMap.id].categories[catMap.checkMatch] !== undefined) {
						if (allGroupsCats[groupMap.id].categories[catMap.checkMatch].items !== undefined) {
							if (allGroupsCats[groupMap.id].categories[catMap.checkMatch].items[itemId] !== undefined) {
								// console.log('items', catMap.items);
								delete allGroupsCats[groupMap.id].categories[catMap.checkMatch].items[itemId];
								return allGroupsCats;
							}
						}
					}
					return allGroupsCats;
				});
				return allGroupsCats;
			}
		}
		return allGroupsCats;
	});

	// console.log('allUsersCats', allUsersCats);
	// console.log('allGroupsCats', allGroupsCats);

	return { allUsersCats, allGroupsCats };
}
