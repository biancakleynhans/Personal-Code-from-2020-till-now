import { convertObjectToArray } from '../../ownServices/ConverterFuncs';
import { NamedDict } from '../../helpers/Tools';

interface CatType {
	[name: string]: {
		en: string;
		de: string;
	};
}

export const CategoriesToChosefrom: NamedDict<CatType> = {
	transDict: {
		Handmade: {
			en: 'Handmade',
			de: 'Handmade'
		},
		Vintage: {
			en: 'Vintage',
			de: 'Vintage'
		},
		Male: {
			en: 'Male',
			de: 'Männer'
		},
		Miscellaneous: {
			en: 'Miscellaneous',
			de: 'Sonstiges'
		},
		Female: {
			en: 'Female',
			de: 'Frau'
		},
		Kids: {
			en: 'Kids',
			de: 'Kinder'
		},
		Babies: {
			en: 'Babies',
			de: 'Baby'
		},
		Accessories: {
			en: 'Accessories',
			de: 'Accessoires'
		},
		Activewear: {
			en: 'Activewear',
			de: 'Activewear'
		},
		Swimwear: {
			en: 'Swimwear',
			de: 'Bademode'
		},
		Blazer: {
			en: 'Blazer',
			de: 'Blazer'
		},
		Blouses: {
			en: 'Blouses',
			de: 'Blusen'
		},

		Pants: {
			en: 'Pants',
			de: 'Hosen'
		},
		Jackets: {
			en: 'Jackets',
			de: 'Jacken '
		},
		Jeans: {
			en: 'Jeans',
			de: 'Jeans'
		},
		Dresses: {
			en: 'Dresses',
			de: 'Kleider'
		},
		Coats: {
			en: 'Coats',
			de: 'Mäntel'
		},
		Sweater: {
			en: 'Sweater',
			de: 'Pullover'
		},
		Skirts: {
			en: 'Skirts',
			de: 'Röcke'
		},
		Scarfs: {
			en: 'Scarfs',
			de: 'Schals/Tücher '
		},
		Jewelry: {
			en: 'Jewelry',
			de: 'Schmuck '
		},
		Shoes: {
			en: 'Shoes',
			de: 'Schuhe'
		},
		Shorts: {
			en: 'Shorts',
			de: 'Shorts'
		},
		Knitted_goods: {
			en: 'Knitted_goods',
			de: 'Stricksachen'
		},
		Tops: {
			en: 'Tops',
			de: 'Tops'
		},
		Bags: {
			en: 'Bags',
			de: 'Taschen'
		},
		Jumpsuits: {
			en: 'Jumpsuits',
			de: 'Jumpsuits'
		}
		// Uncategorized: {
		// 	en: 'Uncategorized',
		// 	de: 'Nicht kategorisiert'
		// }
	}
};

export const CatsToChosefrom = convertObjectToArray(CategoriesToChosefrom.transDict);
export default CategoriesToChosefrom;
