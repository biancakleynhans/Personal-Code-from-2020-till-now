import React from 'react';
import { NamedDict } from '../../services/helpers/Tools';
import { BookCoverImgs } from '../../components/media/BooksForLibrary/BookImgs';
import Book1 from './Book1';
import Book2 from './Book2';
import Book3 from './Book3';
import Book4 from './Book4';
import Book5 from './Book5';
import Book6 from './Book6';
import Book7 from './Book7';
import Book8 from './Book8';
import Book9 from './Book9';
import Book10 from './Book10';
import Book11 from './Book11';
import Book12 from './Book12';
import Book13 from './Book13';
import Book14 from './Book14';
import Book15 from './Book15';
import Book16 from './Book16';
import Book17 from './Book17';
import Book18 from './Book18';
import Book19 from './Book19';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';

export interface iBookEntry {
	component: any;
	name: string;
	coverImg: string;
}

export const BookCombiner: NamedDict<iBookEntry> = {
	Book1: {
		component: <Book1 />,
		name: 'Sluit toe jou spens en oop jou gebeds kamer',
		coverImg: BookCoverImgs.SluitToeJouSpensOopJouGebedskamer
	},
	Book2: {
		component: <Book2 />,
		name: 'Loop jy op die planke',
		coverImg: BookCoverImgs.LoopJyOpDiePlanke
	},
	Book3: {
		component: <Book3 />,
		name: 'Koebaai Virus',
		coverImg: BookCoverImgs.KoebaaiVirus
	},
	Book4: {
		component: <Book4 />,
		name: 'Het jy al ooit 20 Kg opgetel in 60 Sekondes!',
		coverImg: BookCoverImgs.kgIn60sec
	},
	Book5: {
		component: <Book5 />,
		name: 'VAS EN NAGMAAL',
		coverImg: BookCoverImgs.VasNagmaal
	},
	Book6: {
		component: <Book6 />,
		name: 'Ek is GATVOL!!!',
		coverImg: BookCoverImgs.gatvol
	},
	Book7: {
		component: <Book7 />,
		name: 'Lusteloos leweloos BLEGH',
		coverImg: BookCoverImgs.lusteloosLewelosBlegh
	},
	Book8: {
		component: <Book8 />,
		name: 'Na na na na na vettie....',
		coverImg: BookCoverImgs.naNaNaNaVettie
	},
	Book9: {
		component: <Book9 />,
		name: 'Die Boemelaar in my....',
		coverImg: BookCoverImgs.dieBoemelaarInMy
	},
	Book10: {
		component: <Book10 />,
		name: 'Joh amper verdrink ek!!',
		coverImg: BookCoverImgs.johAmperVerdrinkEk
	},
	Book11: {
		component: <Book11 />,
		name: 'Talita jy is niks meer as n klug, n BEDROG nie!!!',
		coverImg: BookCoverImgs.IsEkKlugBedrog
	},
	Book12: {
		component: <Book12 />,
		name: 'KARWAS',
		coverImg: BookCoverImgs.KARWAS
	},
	Book13: {
		component: <Book13 />,
		name: 'DIE BRIEF...',
		coverImg: BookCoverImgs.dieBrief
	},
	Book14: {
		component: <Book14 />,
		name: 'GEBROKE GEDAGTES',
		coverImg: BookCoverImgs.GEBROKE_GEDAGTES
	},
	Book15: {
		component: <Book15 />,
		name: 'HET JOU LONGE AL ONTPLOF?',
		coverImg: BookCoverImgs.HET_JOU_LONGE_AL_ONTPLOF
	},
	Book16: {
		component: <Book16 />,
		name: 'GENESING MET FROZEN WATER',
		coverImg: BookCoverImgs.GENESING_MET_FROZEN_WATER
	},
	Book17: {
		component: <Book17 />,
		name: 'HET JY JOU PASSIE VERLOOR?',
		coverImg: BookCoverImgs.HET_JY_JOU_PASSIE_VERLOOR
	},
	Book18: {
		component: <Book18 />,
		name: 'LOCKDOWN TUIS SKOOL...',
		coverImg: BookCoverImgs.LOCKDOWN_TUIS_SKOOL
	},
	Book19: {
		component: <Book19 />,
		name: 'NAT WASGOED...',
		coverImg: BookCoverImgs.NAT_WASGOED
	}
};

export const CombinedBooksLibraryArray = convertObjectToArray(BookCombiner);
