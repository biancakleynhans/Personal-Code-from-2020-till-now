/** @format */

import { phraseLanguages } from '../LocalLangDict';
import { convertObjectToArray } from '../../ownServices/ConverterFuncs';

// "SuperSmall", "Small", "Medium", "Large", "x-Large", "2x-Large", "3x-Large", "4x-Large"

// Should add individual sizes for kids as well
export const SizesToChosefrom = {
	transDict: {
		SuperSuperSmall: {
			en: 'Super Supper  Small',
			de: 'XXS/32'
		} as phraseLanguages,
		SuperSmall: {
			en: 'Super Small',
			de: ' XS/34'
		} as phraseLanguages,
		Small: {
			en: 'Small',
			de: 'S/36 '
		} as phraseLanguages,
		Medium: {
			en: 'Medium',
			de: 'M/38'
		} as phraseLanguages,
		Large: {
			en: 'Large',
			de: ' L/40'
		} as phraseLanguages,
		xLarge: {
			en: 'x-Large',
			de: 'XL/42'
		} as phraseLanguages,
		xxLarge: {
			en: '2x-Large',
			de: 'XXL/44'
		} as phraseLanguages,
		xxxLarge: {
			en: '3x-Large',
			de: 'XXXL/46'
		} as phraseLanguages,
		xxxxLarge: {
			en: '4x-Large',
			de: 'XXXXL/48'
		} as phraseLanguages
	}
};

export const SizesArray = convertObjectToArray(SizesToChosefrom.transDict);
