export function convertObjectToArray(obj: any) {
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
			// obj.id = key[0];
			// console.log("obj", obj)
			arrToReturn.push(obj);
			return arrToReturn;
		});
		return arrToReturn;
	}
}

// export interface catContent {
// 	id: string;
// 	name: string;
// 	avatar: string;
// 	items: NamedDict<i_BaseInterface_Item>;
// }

// export interface itemContent {
// 	name: string;
// 	brand: string;
// 	size: string;
// 	color: string;
// 	length: string;
// 	description: string;
// 	imgArray: any[];
// 	userWhoAddedItem: NamedDict<i_BaseInterface_Member>;
// }

// export const TypesofObj = {
// 	catCont: {} as NamedDict<catContent>,
// 	itemCont: {} as NamedDict<itemContent>,
// 	catArr: [] as i_BaseInterface_Category[]
// };

// export function create_CatObj_FromStringArray(arr: string[], asType: any) {
// 	const perCatString = arr.reduce((s, c) => {
// 		s[c] = {
// 			name: c,
// 			avatar: TypesToFirebaseGlobals.placeholderImg,
// 			items: {}
// 		};
// 		return s;
// 	}, asType);
// 	// console.log(`create_CatObj_FromString`, perCatString);
// 	return perCatString;
// }

// export function GlobalCatReducer(arr: GL_CATS[]) {
// 	var returnArr: GL_CATS[] = [];
// 	var updatedArr: any[] = [];

// 	arr.map((entry: GL_CATS) => {
// 		if (entry.items !== undefined) {
// 			// console.log('entry does have items');
// 			// console.log('entry', entry.name, entry.urlStringStatic, entry.items);

// 			// for (const key in entry.items) {
// 			// 	// console.log('key', key);
// 			// 	if (entry.items.hasOwnProperty(key)) {
// 			// 		const element = entry.items[key];
// 			// 		// console.log('element', element);
// 			// 		// console.log('entry', entry.name, entry.urlStringStatic, Object.keys(entry.items));

// 			// 		element.url = entry.urlStringStatic;

// 			// 		// return element;
// 			// 	}
// 			// 	// return entry;
// 			// }
// 			updatedArr.push(entry);
// 			return updatedArr;
// 		} else {
// 			// console.log('entry does not have items ', entry);
// 			updatedArr.push(entry);
// 			return updatedArr;
// 		}
// 	});
// 	console.log('updatedArr', updatedArr);

// 	var returnObj: NamedDict<any> = {};
// 	updatedArr.reduce((s, c) => {
// 		if (!s[c.name]) {
// 			s[c.name] = {
// 				name: c.name,
// 				avatar: c.avatar,
// 				checkMatch: c.name,
// 				items: c.items,
// 				groupName: c.groupName,
// 				userName: c.userName
// 			};
// 		} else if (s[c.name]) {
// 			s[c.name] = {
// 				name: c.name,
// 				avatar: c.avatar,
// 				checkMatch: c.name,
// 				groupName: c.groupName,
// 				userName: c.userName,
// 				items: {
// 					...s[c.name].items,
// 					...c.items
// 				}
// 			};
// 		}

// 		return s;
// 	}, returnObj);

// 	// console.log('??? my reduce', returnObj);
// 	returnArr = convertObjectToArray(returnObj);
// 	return returnArr;
// }
