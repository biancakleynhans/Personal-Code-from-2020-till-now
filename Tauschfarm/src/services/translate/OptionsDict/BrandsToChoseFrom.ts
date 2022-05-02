import { phraseLanguages } from '../LocalLangDict';
import { convertObjectToArray } from '../../ownServices/ConverterFuncs';

export const BrandsToChosefrom = {
	transDict: {
		DC: {
			en: 'DC',
			de: 'DC'
		} as phraseLanguages,
		Marvel: {
			en: 'Marvel',
			de: 'Marvel'
		} as phraseLanguages,
		NoBrand: {
			en: 'No Brand',
			de: 'No Brand'
		} as phraseLanguages,
		Marken: {
			en: 'Marken',
			de: 'Marken'
		} as phraseLanguages,
		Adidas: {
			en: 'Adidas',
			de: 'Adidas'
		} as phraseLanguages,
		Bershka: {
			en: 'Bershka',
			de: 'Bershka'
		} as phraseLanguages,
		CA: {
			en: 'C&A',
			de: 'C&A'
		} as phraseLanguages,
		Desigual: {
			en: 'Desigual',
			de: 'Desigual'
		} as phraseLanguages,
		Esprit: {
			en: 'Esprit',
			de: 'Esprit'
		} as phraseLanguages,
		foreverTwentyOne: {
			en: 'forever 21',
			de: 'forever 21'
		} as phraseLanguages,
		Graceland: {
			en: 'Graceland',
			de: 'Graceland'
		} as phraseLanguages,
		HM: {
			en: 'H&M',
			de: 'H&M'
		} as phraseLanguages,
		ICHI: {
			en: 'ICHI',
			de: 'ICHI'
		} as phraseLanguages,
		JackWolfskin: {
			en: 'Jack Wolfskin',
			de: 'Jack Wolfskin'
		} as phraseLanguages,
		Khujo: {
			en: 'Khujo',
			de: 'Khujo'
		} as phraseLanguages,
		Levis: {
			en: "Levi's",
			de: "Levi's"
		} as phraseLanguages,
		Mango: {
			en: 'Mango',
			de: 'Mango'
		} as phraseLanguages,
		Nike: {
			en: 'Nike',
			de: 'Nike'
		} as phraseLanguages,
		ONLY: {
			en: 'ONLY',
			de: 'ONLY'
		} as phraseLanguages,
		Pimkie: {
			en: 'Pimkie',
			de: 'Pimkie'
		} as phraseLanguages,
		Quiksilver: {
			en: 'Quiksilver',
			de: 'Quiksilver'
		} as phraseLanguages,
		RalphLauren: {
			en: ' Ralph Lauren',
			de: ' Ralph Lauren'
		} as phraseLanguages,
		SOliver: {
			en: 'S.Oliver',
			de: 'S.Oliver'
		} as phraseLanguages,
		Tommy: {
			en: 'Tommy',
			de: 'Tommy'
		} as phraseLanguages,
		Hilfiger: {
			en: 'Hilfiger',
			de: 'Hilfiger'
		} as phraseLanguages,
		UrbanOutfitters: {
			en: 'Urban Outfitters',
			de: 'Urban Outfitters'
		} as phraseLanguages,
		Vintage: {
			en: 'Vintage',
			de: 'Vintage'
		} as phraseLanguages,
		Wrangler: {
			en: 'Wrangler',
			de: 'Wrangler'
		} as phraseLanguages,
		Yessica: {
			en: 'Yessica',
			de: 'Yessica'
		} as phraseLanguages,
		Zara: {
			en: 'Zara',
			de: 'Zara'
		} as phraseLanguages,
		other: {
			en: 'other',
			de: 'other'
		} as phraseLanguages,
		ASOS: {
			en: 'ASOS',
			de: 'ASOS'
		} as phraseLanguages,
		Bugatti: {
			en: 'Bugatti',
			de: 'Bugatti'
		} as phraseLanguages,
		Clockhouse: {
			en: 'Clockhouse',
			de: 'Clockhouse'
		} as phraseLanguages,
		Diesel: {
			en: 'Diesel',
			de: 'Diesel'
		} as phraseLanguages,
		edc: {
			en: 'edc',
			de: 'edc'
		} as phraseLanguages,
		FILA: {
			en: 'FILA',
			de: 'FILA'
		} as phraseLanguages,
		GStar: {
			en: 'G-Star',
			de: 'G-Star'
		} as phraseLanguages,
		HollisterCo: {
			en: 'Hollister & Co',
			de: 'Hollister & Co'
		} as phraseLanguages,
		Intimissimi: {
			en: 'Intimissimi',
			de: 'Intimissimi'
		} as phraseLanguages,
		JOOP: {
			en: 'JOOP!',
			de: 'JOOP!'
		} as phraseLanguages,
		KangaROOS: {
			en: 'KangaROOS',
			de: 'KangaROOS'
		} as phraseLanguages,
		Liebeskind: {
			en: 'Liebeskind',
			de: 'Liebeskind'
		} as phraseLanguages,
		Mexx: {
			en: 'Mexx',
			de: 'Mexx'
		} as phraseLanguages,
		NewYorker: {
			en: 'New Yorker',
			de: 'New Yorker'
		} as phraseLanguages,
		Orsay: {
			en: 'Orsay',
			de: 'Orsay'
		} as phraseLanguages,
		PullBear: {
			en: 'Pull&Bear',
			de: 'Pull&Bear'
		} as phraseLanguages,
		Quechua: {
			en: 'Quechua',
			de: 'Quechua'
		} as phraseLanguages,
		Reebok: {
			en: 'Reebok',
			de: 'Reebok'
		} as phraseLanguages,
		superdry: {
			en: 'superdry',
			de: 'superdry'
		} as phraseLanguages,
		TomTailor: {
			en: 'Tom Tailor',
			de: 'Tom Tailor'
		} as phraseLanguages,
		UGG: {
			en: 'UGG',
			de: 'UGG'
		} as phraseLanguages,
		Vero: {
			en: 'Vero',
			de: 'Vero'
		} as phraseLanguages,
		Moda: {
			en: 'Moda',
			de: 'Moda'
		} as phraseLanguages,
		Weekday: {
			en: 'Weekday',
			de: 'Weekday'
		} as phraseLanguages,
		YoungSpirit: {
			en: 'Young Spirit',
			de: 'Young Spirit'
		} as phraseLanguages,
		Zaful: {
			en: 'Zaful',
			de: 'Zaful'
		} as phraseLanguages,
		fiveAvenue: {
			en: '5th Avenue',
			de: '5th Avenue'
		} as phraseLanguages,
		Amisu: {
			en: 'Amisu',
			de: 'Amisu'
		} as phraseLanguages,
		Benetton: {
			en: 'Benetton',
			de: 'Benetton'
		} as phraseLanguages,
		CalvinClein: {
			en: 'Calvin Clein',
			de: 'Calvin Clein'
		} as phraseLanguages,
		DKNY: {
			en: 'DKNY',
			de: 'DKNY'
		} as phraseLanguages,
		EvenOdd: {
			en: 'Even&Odd',
			de: 'Even&Odd'
		} as phraseLanguages,
		Fossil: {
			en: 'Fossil',
			de: 'Fossil'
		} as phraseLanguages,
		Gymshark: {
			en: 'Gymshark',
			de: 'Gymshark'
		} as phraseLanguages,
		Hunkemöller: {
			en: 'Hunkemöller',
			de: 'Hunkemöller'
		} as phraseLanguages,
		Icepeak: {
			en: 'Icepeak',
			de: 'Icepeak'
		} as phraseLanguages,
		JustFab: {
			en: 'JustFab',
			de: 'JustFab'
		} as phraseLanguages,
		Killah: {
			en: 'Killah',
			de: 'Killah'
		} as phraseLanguages,
		LeeMarc: {
			en: 'LeeMarc',
			de: 'LeeMarc'
		} as phraseLanguages,
		OPolo: {
			en: "O'Polo",
			de: "O'Polo"
		} as phraseLanguages,
		Naketano: {
			en: 'Naketano',
			de: 'Naketano'
		} as phraseLanguages,
		OPUS: {
			en: 'OPUS',
			de: 'OPUS'
		} as phraseLanguages,
		Puma: {
			en: 'Puma',
			de: 'Puma'
		} as phraseLanguages,
		Reserved: {
			en: 'Reserved',
			de: 'Reserved'
		} as phraseLanguages,
		StreetOne: {
			en: 'Street One',
			de: 'Street One'
		} as phraseLanguages,
		Tally: {
			en: 'Tally',
			de: 'Tally'
		} as phraseLanguages,
		Weijl: {
			en: 'Weijl',
			de: 'Weijl'
		} as phraseLanguages,
		UrbanClassics: {
			en: 'Urban Classics',
			de: 'Urban Classics'
		} as phraseLanguages,
		Vans: {
			en: 'Vans',
			de: 'Vans'
		} as phraseLanguages,
		Wellensteyn: {
			en: 'Wellensteyn',
			de: 'Wellensteyn'
		} as phraseLanguages,
		Yves: {
			en: 'Yves',
			de: 'Yves'
		} as phraseLanguages,
		SaintLaurent: {
			en: 'Saint Laurent',
			de: 'Saint Laurent'
		} as phraseLanguages,
		Zero: {
			en: 'Zero',
			de: 'Zero'
		} as phraseLanguages,
		AbercrombieFitch: {
			en: 'Abercrombie & Fitch',
			de: 'Abercrombie & Fitch'
		} as phraseLanguages,
		Bench: {
			en: 'Bench',
			de: 'Bench'
		} as phraseLanguages,
		Converse: {
			en: 'Converse',
			de: 'Converse'
		} as phraseLanguages,
		DrMartens: {
			en: 'Dr. Martens',
			de: 'Dr. Martens'
		} as phraseLanguages,
		ESCADA: {
			en: 'ESCADA',
			de: 'ESCADA'
		} as phraseLanguages,
		Guess: {
			en: 'Guess',
			de: 'Guess'
		} as phraseLanguages,
		Hallhuber: {
			en: 'Hallhuber',
			de: 'Hallhuber'
		} as phraseLanguages,
		Jessica: {
			en: 'Jessica',
			de: 'Jessica'
		} as phraseLanguages,
		KarlLagerfeld: {
			en: 'Karl Lagerfeld',
			de: 'Karl Lagerfeld'
		} as phraseLanguages,
		Lacoste: {
			en: 'Lacoste',
			de: 'Lacoste'
		} as phraseLanguages,
		Michael: {
			en: 'Michael',
			de: 'Michael'
		} as phraseLanguages,
		Kors: {
			en: 'Kors',
			de: 'Kors'
		} as phraseLanguages,
		NewBalance: {
			en: 'New Balance',
			de: 'New Balance'
		} as phraseLanguages,
		ONeill: {
			en: "O'Neill",
			de: "O'Neill"
		} as phraseLanguages,
		Pieces: {
			en: 'Pieces',
			de: 'Pieces'
		} as phraseLanguages,
		Review: {
			en: 'Review',
			de: 'Review'
		} as phraseLanguages,
		Stradivarius: {
			en: 'Stradivarius',
			de: 'Stradivarius'
		} as phraseLanguages,
		Tamaris: {
			en: 'Tamaris',
			de: 'Tamaris'
		} as phraseLanguages,
		Ulla: {
			en: 'Ulla',
			de: 'Ulla'
		} as phraseLanguages,
		Popken: {
			en: 'Popken',
			de: 'Popken'
		} as phraseLanguages,
		Viking: {
			en: 'Viking',
			de: 'Viking'
		} as phraseLanguages,
		WE: {
			en: 'WE',
			de: 'WE'
		} as phraseLanguages,
		Yakuza: {
			en: 'Yakuza',
			de: 'Yakuza'
		} as phraseLanguages,
		Zalando: {
			en: 'Zalando',
			de: 'Zalando'
		} as phraseLanguages,
		AmericanApparel: {
			en: 'American Apparel',
			de: 'American Apparel'
		} as phraseLanguages,
		Blutsgeschwister: {
			en: 'Blutsgeschwister',
			de: 'Blutsgeschwister'
		} as phraseLanguages,
		Calzedonia: {
			en: 'Calzedonia',
			de: 'Calzedonia'
		} as phraseLanguages,
		Drykorn: {
			en: 'Drykorn',
			de: 'Drykorn'
		} as phraseLanguages,
		Gina: {
			en: 'Gina',
			de: 'Gina'
		} as phraseLanguages,
		Tricot: {
			en: 'Tricot',
			de: 'Tricot'
		} as phraseLanguages,
		Hugo: {
			en: 'Hugo',
			de: 'Hugo'
		} as phraseLanguages,
		Boss: {
			en: 'Boss',
			de: 'Boss'
		} as phraseLanguages,
		Jakes: {
			en: "Jake's",
			de: "Jake's"
		} as phraseLanguages,
		kennelschmenger: {
			en: 'kennel & schmenger',
			de: 'kennel & schmenger'
		} as phraseLanguages,
		LTB: {
			en: 'LTB',
			de: 'LTB'
		} as phraseLanguages,
		Mustang: {
			en: 'Mustang',
			de: 'Mustang'
		} as phraseLanguages,
		NewLook: {
			en: 'New Look',
			de: 'New Look'
		} as phraseLanguages,
		obj: {
			en: 'Object',
			de: 'Object'
		} as phraseLanguages,
		Promod: {
			en: 'Promod',
			de: 'Promod'
		} as phraseLanguages,
		Replay: {
			en: 'Replay',
			de: 'Replay'
		} as phraseLanguages,
		SheInside: {
			en: 'SheInside',
			de: 'SheInside'
		} as phraseLanguages,
		Topshop: {
			en: 'Topshop',
			de: 'Topshop'
		} as phraseLanguages,
		Uniqlo: {
			en: 'Uniqlo',
			de: 'Uniqlo'
		} as phraseLanguages,
		Vila: {
			en: 'Vila',
			de: 'Vila'
		} as phraseLanguages,
		Woolrich: {
			en: 'Woolrich',
			de: 'Woolrich'
		} as phraseLanguages,
		Zign: {
			en: 'Zign',
			de: 'Zign'
		} as phraseLanguages,
		Asics: {
			en: 'Asics',
			de: 'Asics'
		} as phraseLanguages,
		Billabong: {
			en: 'Billabong',
			de: 'Billabong'
		} as phraseLanguages,
		COS: {
			en: 'COS',
			de: 'COS'
		} as phraseLanguages,
		Disney: {
			en: 'Disney',
			de: 'Disney'
		} as phraseLanguages,
		Gerry: {
			en: 'Gerry',
			de: 'Gerry'
		} as phraseLanguages,
		Weber: {
			en: 'Weber',
			de: 'Weber'
		} as phraseLanguages,
		Hummel: {
			en: 'Hummel',
			de: 'Hummel'
		} as phraseLanguages,
		Longchamp: {
			en: 'Longchamp',
			de: 'Longchamp'
		} as phraseLanguages,
		Monki: {
			en: 'Monki',
			de: 'Monki'
		} as phraseLanguages,
		NoaNoa: {
			en: 'Noa Noa',
			de: 'Noa Noa'
		} as phraseLanguages,
		Oasis: {
			en: 'Oasis',
			de: 'Oasis'
		} as phraseLanguages,
		PepeJeans: {
			en: 'Pepe Jeans',
			de: 'Pepe Jeans'
		} as phraseLanguages,
		Roxy: {
			en: 'Roxy',
			de: 'Roxy'
		} as phraseLanguages,
		SCOTCHSODA: {
			en: 'SCOTCH & SODA',
			de: 'SCOTCH & SODA'
		} as phraseLanguages,
		TedBaker: {
			en: 'Ted Baker',
			de: 'Ted Baker'
		} as phraseLanguages,
		Vagabond: {
			en: 'Vagabond',
			de: 'Vagabond'
		} as phraseLanguages,
		Watsons: {
			en: "Watson's",
			de: "Watson's"
		} as phraseLanguages,
		Broadway: {
			en: 'Broadway',
			de: 'Broadway'
		} as phraseLanguages,
		Closed: {
			en: 'Closed',
			de: 'Closed'
		} as phraseLanguages,
		DorothyPerkins: {
			en: ' Dorothy Perkins',
			de: ' Dorothy Perkins'
		} as phraseLanguages,
		Gabor: {
			en: 'Gabor',
			de: 'Gabor'
		} as phraseLanguages,
		Lascana: {
			en: 'Lascana',
			de: 'Lascana'
		} as phraseLanguages,
		Marco: {
			en: 'Marco',
			de: 'Marco'
		} as phraseLanguages,
		Tozzi: {
			en: 'Tozzi',
			de: 'Tozzi'
		} as phraseLanguages,
		PeekCloppenburg: {
			en: 'Peek & Cloppenburg',
			de: 'Peek & Cloppenburg'
		} as phraseLanguages,
		Rieker: {
			en: 'Rieker',
			de: 'Rieker'
		} as phraseLanguages,
		Swarovski: {
			en: 'Swarovski',
			de: 'Swarovski'
		} as phraseLanguages,
		TheNorthFace: {
			en: 'The North Face',
			de: 'The North Face'
		} as phraseLanguages,
		Versace: {
			en: 'Versace',
			de: 'Versace'
		} as phraseLanguages,
		Buffalo: {
			en: 'Buffalo',
			de: 'Buffalo'
		} as phraseLanguages,
		CheapMonday: {
			en: 'Cheap Monday',
			de: 'Cheap Monday'
		} as phraseLanguages,
		DolceGabbana: {
			en: 'Dolce & Gabbana',
			de: 'Dolce & Gabbana'
		} as phraseLanguages,
		GAP: {
			en: 'GAP',
			de: 'GAP'
		} as phraseLanguages,
		LauraScott: {
			en: 'Laura Scott',
			de: 'Laura Scott'
		} as phraseLanguages,
		MaisonScotch: {
			en: 'Maison Scotch',
			de: 'Maison Scotch'
		} as phraseLanguages,
		PaulGreen: {
			en: 'Paul Green',
			de: 'Paul Green'
		} as phraseLanguages,
		RayBan: {
			en: 'Ray Ban',
			de: 'Ray Ban'
		} as phraseLanguages,
		Timberland: {
			en: 'Timberland',
			de: 'Timberland'
		} as phraseLanguages,
		VeniceBeach: {
			en: 'Venice Beach',
			de: 'Venice Beach'
		} as phraseLanguages,
		BijouBrigitte: {
			en: 'Bijou Brigitte',
			de: 'Bijou Brigitte'
		} as phraseLanguages,
		Cecil: {
			en: 'Cecil',
			de: 'Cecil'
		} as phraseLanguages,
		Pandora: {
			en: 'Pandora',
			de: 'Pandora'
		} as phraseLanguages,
		RiverIsland: {
			en: 'River Island',
			de: 'River Island'
		} as phraseLanguages,
		VeraMont: {
			en: 'Vera Mont',
			de: 'Vera Mont'
		} as phraseLanguages,
		Comma: {
			en: 'Comma',
			de: 'Comma'
		} as phraseLanguages,
		VictoriaSecret: {
			en: "Victoria's Secret",
			de: "Victoria's Secret"
		} as phraseLanguages,
		Carhartt: {
			en: 'Carhartt',
			de: 'Carhartt'
		} as phraseLanguages
	}
};

function sortByTextDsc(a: any, b: any) {
	if (a.en !== undefined && b.en !== undefined) {
		const diff = a.en.toLowerCase().localeCompare(b.en.toLowerCase());
		return -1 * -diff;
	} else return 1;
}
var data = convertObjectToArray(BrandsToChosefrom.transDict).sort(sortByTextDsc);
export const BrandArray = data;
