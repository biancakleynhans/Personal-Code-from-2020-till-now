import { NamedDict } from '../services/helpers/Tools';
import { ASGB_Cat } from './002CatagoryModels';
import CategoriesToChosefrom from '../services/translate/OptionsDict/CatagoriesToChoseFrom';
import { TypesToFirebaseGlobals } from '../services/firebase/TypesToServer';
import { CatImages } from '../components/catImages/CatImagesToUse';

const Aces = CatImages.Accessories.internal;
const Active = CatImages.Active.internal;
const Bags = CatImages.Bags.internal;
const Blazer = CatImages.Blazer.internal;
const Blouses = CatImages.Blouses.internal;
const Babies = CatImages.Babies.internal;
const Coats = CatImages.Coats.internal;
const Dresses = CatImages.Dresses.internal;
const Jackets = CatImages.Jackets.internal;
const Jeans = CatImages.Jeans.internal;
const Jewelry = CatImages.Jewelry.internal;
const Jumpsuits = CatImages.Jumpsuits.internal;
const Kids = CatImages.Kids.internal;
const Knittedgoods = CatImages.Knittedgoods.internal;
const Male = CatImages.Male.internal;
const Pants = CatImages.Pants.internal;
const Scarfs = CatImages.Scarfs.internal;
const Shoes = CatImages.Shoes.internal;
const Skirts = CatImages.Skirts.internal;
const Sweater = CatImages.Sweater.internal;
const Swimwear = CatImages.Swimwear.internal;
const Tops = CatImages.Tops.internal;
const Female = CatImages.Misc.internal;
const Shorts = CatImages.Shorts.internal;

const Handmade = CatImages.Handmade.internal;
const Vintage = CatImages.Vintage.internal;

export const AppStartGloabalBase_Categories = (langType: string) => {
	if (langType === 'en') {
		// console.log('user is en', langType);
		const catType: NamedDict<ASGB_Cat> = {
			Handmade: {
				name: CategoriesToChosefrom.transDict.Handmade.en,
				avatar: Handmade,
				items: {},
				checkMatch: 'Handmade'
			},
			Vintage: {
				name: CategoriesToChosefrom.transDict.Vintage.en,
				avatar: Vintage,
				items: {},
				checkMatch: 'Vintage'
			},
			Miscellaneous: {
				name: CategoriesToChosefrom.transDict.Miscellaneous.en,
				avatar: Female,
				items: {},
				checkMatch: 'Miscellaneous'
			},
			Male: {
				name: CategoriesToChosefrom.transDict.Male.en,
				avatar: Male,
				items: {},
				checkMatch: 'Male'
			},
			Babies: {
				name: CategoriesToChosefrom.transDict.Babies.en,
				avatar: Babies,
				items: {},
				checkMatch: 'Babies'
			},
			Kids: {
				name: CategoriesToChosefrom.transDict.Kids.en,
				avatar: Kids,
				items: {},
				checkMatch: 'Kids'
			},
			Accessories: {
				name: CategoriesToChosefrom.transDict.Accessories.en,
				avatar: Aces,
				items: {},
				checkMatch: 'Accessories'
			},
			Activewear: {
				name: CategoriesToChosefrom.transDict.Activewear.en,
				avatar: Active,
				items: {},
				checkMatch: 'Activewear'
			},
			Swimwear: {
				name: CategoriesToChosefrom.transDict.Swimwear.en,
				avatar: Swimwear,
				items: {},
				checkMatch: 'Swimwear'
			},
			Blazer: {
				name: CategoriesToChosefrom.transDict.Blazer.en,
				avatar: Blazer,
				items: {},
				checkMatch: 'Blazer'
			},
			Blouses: {
				name: CategoriesToChosefrom.transDict.Blouses.en,
				avatar: Blouses,
				items: {},
				checkMatch: 'Blouses'
			},
			Pants: {
				name: CategoriesToChosefrom.transDict.Pants.en,
				avatar: Pants,
				items: {},
				checkMatch: 'Pants'
			},
			Jackets: {
				name: CategoriesToChosefrom.transDict.Jackets.en,
				avatar: Jackets,
				items: {},
				checkMatch: 'Jackets'
			},
			Jeans: {
				name: CategoriesToChosefrom.transDict.Jeans.en,
				avatar: Jeans,
				items: {},
				checkMatch: 'Jeans'
			},
			Dresses: {
				name: CategoriesToChosefrom.transDict.Dresses.en,
				avatar: Dresses,
				items: {},
				checkMatch: 'Dresses'
			},
			Coats: {
				name: CategoriesToChosefrom.transDict.Coats.en,
				avatar: Coats,
				items: {},
				checkMatch: 'Coats'
			},
			Sweater: {
				name: CategoriesToChosefrom.transDict.Sweater.en,
				avatar: Sweater,
				items: {},
				checkMatch: 'Sweater'
			},
			Skirts: {
				name: CategoriesToChosefrom.transDict.Skirts.en,
				avatar: Skirts,
				items: {},
				checkMatch: 'Skirts'
			},
			Scarfs: {
				name: CategoriesToChosefrom.transDict.Scarfs.en,
				avatar: Scarfs,
				items: {},
				checkMatch: 'Scarfs'
			},
			Jewelry: {
				name: CategoriesToChosefrom.transDict.Jewelry.en,
				avatar: Jewelry,
				items: {},
				checkMatch: 'Jewelry'
			},
			Shoes: {
				name: CategoriesToChosefrom.transDict.Shoes.en,
				avatar: Shoes,
				items: {},
				checkMatch: 'Shoes'
			},
			Shorts: {
				name: CategoriesToChosefrom.transDict.Shorts.en,
				avatar: Shorts,
				items: {},
				checkMatch: 'Shorts'
			},
			Knitted_goods: {
				name: CategoriesToChosefrom.transDict.Knitted_goods.en,
				avatar: Knittedgoods,
				items: {},
				checkMatch: 'Knitted_goods'
			},
			Tops: {
				name: CategoriesToChosefrom.transDict.Tops.en,
				avatar: Tops,
				items: {},
				checkMatch: 'Tops'
			},
			Bags: {
				name: CategoriesToChosefrom.transDict.Bags.en,
				avatar: Bags,
				items: {},
				checkMatch: 'Bags'
			},
			Jumpsuits: {
				name: CategoriesToChosefrom.transDict.Jumpsuits.en,
				avatar: Jumpsuits,
				items: {},
				checkMatch: 'Jumpsuits'
			},
			Uncategorized: {
				name: 'Uncategorized', //CategoriesToChosefrom.transDict.Uncategorized.en,
				avatar: TypesToFirebaseGlobals.placeholderImg,
				items: {},
				checkMatch: 'Uncategorized'
			}
		};
		return catType;
	} else {
		// console.log('user is de', langType);
		const catType: NamedDict<ASGB_Cat> = {
			Miscellaneous: {
				name: CategoriesToChosefrom.transDict.Miscellaneous.de,
				avatar: Female,
				items: {},
				checkMatch: 'Miscellaneous'
			},
			Male: {
				name: CategoriesToChosefrom.transDict.Male.de,
				avatar: Male,
				items: {},
				checkMatch: 'Male'
			},
			Babies: {
				name: CategoriesToChosefrom.transDict.Babies.de,
				avatar: Babies,
				items: {},
				checkMatch: 'Babies'
			},
			Kids: {
				name: CategoriesToChosefrom.transDict.Kids.de,
				avatar: Kids,
				items: {},
				checkMatch: 'Kids'
			},
			Accessories: {
				name: CategoriesToChosefrom.transDict.Accessories.de,
				avatar: Aces,
				items: {},
				checkMatch: 'Accessories'
			},
			Activewear: {
				name: CategoriesToChosefrom.transDict.Activewear.de,
				avatar: Active,
				items: {},
				checkMatch: 'Activewear'
			},
			Swimwear: {
				name: CategoriesToChosefrom.transDict.Swimwear.de,
				avatar: Swimwear,
				items: {},
				checkMatch: 'Swimwear'
			},
			Blazer: {
				name: CategoriesToChosefrom.transDict.Blazer.de,
				avatar: Blazer,
				items: {},
				checkMatch: 'Blazer'
			},
			Blouses: {
				name: CategoriesToChosefrom.transDict.Blouses.de,
				avatar: Blouses,
				items: {},
				checkMatch: 'Blouses'
			},

			Pants: {
				name: CategoriesToChosefrom.transDict.Pants.de,
				avatar: Pants,
				items: {},
				checkMatch: 'Pants'
			},
			Jackets: {
				name: CategoriesToChosefrom.transDict.Jackets.de,
				avatar: Jackets,
				items: {},
				checkMatch: 'Jackets'
			},
			Jeans: {
				name: CategoriesToChosefrom.transDict.Jeans.de,
				avatar: Jeans,
				items: {},
				checkMatch: 'Jeans'
			},
			Dresses: {
				name: CategoriesToChosefrom.transDict.Dresses.de,
				avatar: Dresses,
				items: {},
				checkMatch: 'Dresses'
			},
			Coats: {
				name: CategoriesToChosefrom.transDict.Coats.de,
				avatar: Coats,
				items: {},
				checkMatch: 'Coats'
			},
			Sweater: {
				name: CategoriesToChosefrom.transDict.Sweater.de,
				avatar: Sweater,
				items: {},
				checkMatch: 'Sweater'
			},
			Skirts: {
				name: CategoriesToChosefrom.transDict.Skirts.de,
				avatar: Skirts,
				items: {},
				checkMatch: 'Skirts'
			},
			Scarfs: {
				name: CategoriesToChosefrom.transDict.Scarfs.de,
				avatar: Scarfs,
				items: {},
				checkMatch: 'Scarfs'
			},
			Jewelry: {
				name: CategoriesToChosefrom.transDict.Jewelry.de,
				avatar: Jewelry,
				items: {},
				checkMatch: 'Jewelry'
			},
			Shoes: {
				name: CategoriesToChosefrom.transDict.Shoes.de,
				avatar: Shoes,
				items: {},
				checkMatch: 'Shoes'
			},
			Shorts: {
				name: CategoriesToChosefrom.transDict.Shorts.de,
				avatar: Shorts,
				items: {},
				checkMatch: 'Shorts'
			},
			Knitted_goods: {
				name: CategoriesToChosefrom.transDict.Knitted_goods.de,
				avatar: Knittedgoods,
				items: {},
				checkMatch: 'Knitted_goods'
			},
			Tops: {
				name: CategoriesToChosefrom.transDict.Tops.de,
				avatar: Tops,
				items: {},
				checkMatch: 'Tops'
			},
			Bags: {
				name: CategoriesToChosefrom.transDict.Bags.de,
				avatar: Bags,
				items: {},
				checkMatch: 'Bags'
			},
			Jumpsuits: {
				name: CategoriesToChosefrom.transDict.Jumpsuits.de,
				avatar: Jumpsuits,
				items: {},
				checkMatch: 'Jumpsuits'
			},
			Handmade: {
				name: CategoriesToChosefrom.transDict.Handmade.de,
				avatar: Handmade,
				items: {},
				checkMatch: 'Handmade'
			},
			Vintage: {
				name: CategoriesToChosefrom.transDict.Vintage.de,
				avatar: Vintage,
				items: {},
				checkMatch: 'Vintage'
			},
			Uncategorized: {
				name: 'Uncategorized', //CategoriesToChosefrom.transDict.Uncategorized.de,
				avatar: TypesToFirebaseGlobals.placeholderImg,
				items: {},
				checkMatch: 'Uncategorized'
			}
		};
		return catType;
	}
};

export const CatType: NamedDict<ASGB_Cat> = {
	Handmade: {
		name: CategoriesToChosefrom.transDict.Handmade.en,
		avatar: Handmade,
		items: {},
		checkMatch: 'Handmade'
	},
	Vintage: {
		name: CategoriesToChosefrom.transDict.Vintage.en,
		avatar: Vintage,
		items: {},
		checkMatch: 'Vintage'
	},
	Miscellaneous: {
		name: CategoriesToChosefrom.transDict.Miscellaneous.en,
		avatar: Female,
		items: {},
		checkMatch: 'Miscellaneous'
	},
	Male: {
		name: CategoriesToChosefrom.transDict.Male.en,
		avatar: Male,
		items: {},
		checkMatch: 'Male'
	},
	Babies: {
		name: CategoriesToChosefrom.transDict.Babies.en,
		avatar: Babies,
		items: {},
		checkMatch: 'Babies'
	},
	Kids: {
		name: CategoriesToChosefrom.transDict.Kids.en,
		avatar: Kids,
		items: {},
		checkMatch: 'Kids'
	},
	Accessories: {
		name: CategoriesToChosefrom.transDict.Accessories.en,
		avatar: Aces,
		items: {},
		checkMatch: 'Accessories'
	},
	Activewear: {
		name: CategoriesToChosefrom.transDict.Activewear.en,
		avatar: Active,
		items: {},
		checkMatch: 'Activewear'
	},
	Swimwear: {
		name: CategoriesToChosefrom.transDict.Swimwear.en,
		avatar: Swimwear,
		items: {},
		checkMatch: 'Swimwear'
	},
	Blazer: {
		name: CategoriesToChosefrom.transDict.Blazer.en,
		avatar: Blazer,
		items: {},
		checkMatch: 'Blazer'
	},
	Blouses: {
		name: CategoriesToChosefrom.transDict.Blouses.en,
		avatar: Blouses,
		items: {},
		checkMatch: 'Blouses'
	},
	Pants: {
		name: CategoriesToChosefrom.transDict.Pants.en,
		avatar: Pants,
		items: {},
		checkMatch: 'Pants'
	},
	Jackets: {
		name: CategoriesToChosefrom.transDict.Jackets.en,
		avatar: Jackets,
		items: {},
		checkMatch: 'Jackets'
	},
	Jeans: {
		name: CategoriesToChosefrom.transDict.Jeans.en,
		avatar: Jeans,
		items: {},
		checkMatch: 'Jeans'
	},
	Dresses: {
		name: CategoriesToChosefrom.transDict.Dresses.en,
		avatar: Dresses,
		items: {},
		checkMatch: 'Dresses'
	},
	Coats: {
		name: CategoriesToChosefrom.transDict.Coats.en,
		avatar: Coats,
		items: {},
		checkMatch: 'Coats'
	},
	Sweater: {
		name: CategoriesToChosefrom.transDict.Sweater.en,
		avatar: Sweater,
		items: {},
		checkMatch: 'Sweater'
	},
	Skirts: {
		name: CategoriesToChosefrom.transDict.Skirts.en,
		avatar: Skirts,
		items: {},
		checkMatch: 'Skirts'
	},
	Scarfs: {
		name: CategoriesToChosefrom.transDict.Scarfs.en,
		avatar: Scarfs,
		items: {},
		checkMatch: 'Scarfs'
	},
	Jewelry: {
		name: CategoriesToChosefrom.transDict.Jewelry.en,
		avatar: Jewelry,
		items: {},
		checkMatch: 'Jewelry'
	},
	Shoes: {
		name: CategoriesToChosefrom.transDict.Shoes.en,
		avatar: Shoes,
		items: {},
		checkMatch: 'Shoes'
	},
	Shorts: {
		name: CategoriesToChosefrom.transDict.Shorts.en,
		avatar: Shorts,
		items: {},
		checkMatch: 'Shorts'
	},
	Knitted_goods: {
		name: CategoriesToChosefrom.transDict.Knitted_goods.en,
		avatar: Knittedgoods,
		items: {},
		checkMatch: 'Knitted_goods'
	},
	Tops: {
		name: CategoriesToChosefrom.transDict.Tops.en,
		avatar: Tops,
		items: {},
		checkMatch: 'Tops'
	},
	Bags: {
		name: CategoriesToChosefrom.transDict.Bags.en,
		avatar: Bags,
		items: {},
		checkMatch: 'Bags'
	},
	Jumpsuits: {
		name: CategoriesToChosefrom.transDict.Jumpsuits.en,
		avatar: Jumpsuits,
		items: {},
		checkMatch: 'Jumpsuits'
	}
	// Uncategorized: {
	// 	name: 'Uncategorized', // CategoriesToChosefrom.transDict.Uncategorized.en,
	// 	avatar: TypesToFirebaseGlobals.placeholderImg,
	// 	items: {},
	// 	checkMatch: 'Uncategorized'
	// }
};
