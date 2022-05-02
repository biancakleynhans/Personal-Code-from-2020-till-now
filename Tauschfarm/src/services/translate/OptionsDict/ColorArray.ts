import { convertObjectToArray } from '../../ownServices/ConverterFuncs';

export const COLOR_NAMES = {
	black: { en: 'Black', de: 'Schwarz' },
	white: { en: 'White', de: 'Weiß' },
	gray: { en: 'Gray', de: 'Grau' },
	red: { en: 'Red', de: 'Rot' },
	blue: { en: 'Blue', de: 'Blau' },
	yellow: { en: 'Yellow', de: 'Gelb' },
	green: { en: 'green', de: 'Grün' },
	orange: { en: 'Orange', de: 'Orange' },
	purple: { en: 'Purple', de: 'Lila' },
	pink: { en: 'Pink', de: 'Rosa' },
	brown: { en: 'brown', de: 'braun' }
};

export const ColorArr = convertObjectToArray(COLOR_NAMES);
