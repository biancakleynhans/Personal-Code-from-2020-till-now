import { NamedDict } from '../helpers/Tools';
import { GL_CATS } from '../../models/002CatagoryModels';

export function convertObjectToArray(obj: any, keepKeyId?: boolean) {
	var arrToReturn: any[] = [];

	if (obj === null || obj === undefined) {
		// console.log('undefided ', obj);
		return arrToReturn;
	} else {
		// console.log('not undefided ', obj);
		Object.entries(obj).forEach((key) => {
			var obj: any,
				// eslint-disable-next-line
				{} = {};
			obj = key[1];
			if (keepKeyId) {
				obj.id = key[0];
			}
			// console.log("obj", obj)
			arrToReturn.push(obj);
			return arrToReturn;
		});
		return arrToReturn;
	}
}

export function GlobalCatReducer(arr: GL_CATS[]) {
	var returnArr: GL_CATS[] = [];
	var updatedArr: any[] = [];

	arr.map((entry: GL_CATS) => {
		updatedArr.push(entry);
		return updatedArr;
	});
	// console.log('updatedArr', updatedArr);

	var returnObj: NamedDict<any> = {};
	updatedArr.reduce((s, c) => {
		if (!s[c.checkMatch]) {
			s[c.checkMatch] = {
				name: c.name,
				avatar: c.avatar,
				checkMatch: c.checkMatch,
				items: c.items,
				groupName: c.groupName,
				userName: c.userName
			};
		} else if (s[c.checkMatch]) {
			s[c.checkMatch] = {
				name: c.name,
				avatar: c.avatar,
				checkMatch: c.checkMatch,
				groupName: c.groupName,
				userName: c.userName,
				items: {
					...s[c.checkMatch]?.items,
					...c.items
				}
			};
		}

		return s;
	}, returnObj);

	// console.log('??? my reduce', returnObj);
	returnArr = convertObjectToArray(returnObj);
	return returnArr;
}
