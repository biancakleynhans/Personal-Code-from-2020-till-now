import Accessories from './img/Accessoires.webp';
import Active from './img/Activewear.webp';
import Babies from './img/Baby.webp';
import Blouses from './img/Blusen.webp';
import Blazer from './img/Blazer.webp';
import Jackets from './img/jacke_3.webp';
import Jeans from './img/Jeans.webp';
import Jumpsuits from './img/Jumpsuit.webp';
import Kids from './img/Kinder.webp';
import Male from './img/Männer.webp';
import Swimwear from './img/Bademode.webp';
import Handmade from './img/Handmade.webp';
import Pants from './img/Hose.webp';
import Dresses from './img/Kleider.webp';
import Coats from './img/Mantel.webp';
import Sweater from './img/Pullover.webp';
import Skirts from './img/Röcke.webp';
import Scarfs from './img/Schal.webp';
import Jewelry from './img/Schmuck.webp';
import Shoes from './img/schuhe.webp';
import Shorts from './img/Shorts.webp';
import Misc from './img/Sonstiges.webp';
import Knittedgoods from './img/strichsachen.webp';
import Bags from './img/taschen.webp';
import Main from './img/Main.webp';
import Female from './img/Main.webp';
import Tops from './img/Tops.webp';
import Vintage from './img/Vintage.webp';

import { NamedDict } from '../../services/helpers/Tools';

export const CatImages: NamedDict<{ internal: string; name: string }> = {
	Handmade: {
		internal: Handmade,
		name: 'Handmade'
	},
	Vintage: {
		internal: Vintage,
		name: 'Vintage'
	},
	Accessories: {
		internal: Accessories,
		name: 'Accessories'
	},
	Active: {
		internal: Active,
		name: 'ActiveW'
	},
	Bags: {
		name: 'Bags',
		internal: Bags
	},
	Blazer: {
		name: 'Blazer',
		internal: Blazer
	},
	Blouses: {
		name: 'Blouses',
		internal: Blouses
	},
	Babies: {
		name: 'Babies',
		internal: Babies
	},
	Coats: {
		name: 'Coats',
		internal: Coats
	},
	Dresses: {
		name: 'Dresses',
		internal: Dresses
	},
	Jackets: {
		name: 'Jackets',
		internal: Jackets
	},
	Jeans: {
		name: 'Jeans',
		internal: Jeans
	},
	Jewelry: {
		name: 'Jewelry',
		internal: Jewelry
	},
	Jumpsuits: {
		name: 'Jumpsuits',
		internal: Jumpsuits
	},
	Kids: {
		name: 'Kids',
		internal: Kids
	},
	Knittedgoods: {
		name: 'Knittedgoods',
		internal: Knittedgoods
	},
	Male: {
		name: 'Male',
		internal: Male
	},
	Pants: {
		name: 'Pants',
		internal: Pants
	},
	Scarfs: {
		name: 'Scarfs',
		internal: Scarfs
	},
	Shoes: {
		name: 'Shoes',
		internal: Shoes
	},
	Skirts: {
		name: 'Skirts',
		internal: Skirts
	},
	Sweater: {
		name: 'Sweater',
		internal: Sweater
	},
	Swimwear: {
		name: 'Swimwear',
		internal: Swimwear
	},
	Tops: {
		name: 'Tops',
		internal: Tops
	},
	Female: {
		name: 'Female',
		internal: Female
	},
	Shorts: {
		name: 'Shorts',
		internal: Shorts
	},
	Misc: {
		name: 'Misc',
		internal: Misc
	},
	Main: {
		name: 'Main',
		internal: Main
	}
};
