/** @format */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//FONTAWESOME
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
	faTired,
	faTint,
	faUserShield,
	faHome,
	faUserPlus,
	faUserCog,
	faClock,
	faHistory,
	faWeight,
	faBreadSlice,
	faBacon,
	faEgg,
	faHeart,
	faFire,
	faFireAlt,
	faCalendar,
	faCalendarAlt,
	faArrowLeft,
	faArrowRight,
	faPenFancy,
	faPlusCircle,
	faHamburger,
	faMinus,
	faSadCry,
	faSearch,
	faCarrot,
	faCandyCane,
	faLemon,
	faChevronLeft,
	faChevronRight,
	faBook
	// faSignOutAlt,
	// faUserLock,
	// faHourglass,
	// faEdit,
	// faFileCsv,
	// faPlus,
	// faRedo,
	// faUser,
	// faSignInAlt,
	// faSync,
	// faDrumstickBite,
	// faSpinner,
	// faCheck,
	// faTrash,
	// faTrashAlt,
	// faAngleLeft,
	// faAngleRight,
	
} from '@fortawesome/free-solid-svg-icons';


library.add(
	fab,
	faTired,
	faTint,
	faUserShield,
	faWeight,
	faHistory,
	faClock,
	faHome,
	faUserPlus,
	faUserCog,
	faWeight,
	faBreadSlice,
	faBacon,
	faEgg,
	faHeart,
	faFire,
	faFireAlt,
	faCalendar,
	faCalendarAlt,
	faArrowLeft,
	faArrowRight,
	faPenFancy,
	faPlusCircle,
	faHamburger,
	faMinus,
	faSadCry,
	faSearch,
	faCarrot,
	faCandyCane,
	faLemon,
	faChevronLeft,
	faChevronRight,
	faBook
	// faUserLock,
	// faRedo,
	// faUser,
	// faSignOutAlt,
	// faSignInAlt,
	// faClock,
	// faHourglass,
	// faHistory,
	// faEdit,
	// faFileCsv,
	// faPlus,
	// faSync,
	// faDrumstickBite,
	// faSpinner,
	// faCheck,
	// faTrash,
	// faTrashAlt,
	// faAngleLeft,
	// faAngleRight,
);


export const FavList = {
	userIcons: {
		userLogged: {
			icon: <FontAwesomeIcon icon='user-shield' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		newUser: {
			icon: <FontAwesomeIcon icon='user-plus' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		userDash: {
			icon: <FontAwesomeIcon icon='user-cog' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		}
	},
	menuIcons: {
		home: {
			icon: <FontAwesomeIcon icon='home' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		clock: {
			icon: <FontAwesomeIcon icon='clock' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		clockHist: {
			icon: <FontAwesomeIcon icon='history' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		weight: {
			icon: <FontAwesomeIcon icon='weight' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		book: {
			icon: <FontAwesomeIcon icon='book' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
	},
	navIcons: {
		search: {
			icon: <FontAwesomeIcon icon='search' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		arrowLeft: {
			icon: <FontAwesomeIcon icon='arrow-left' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />,
			iconAlt: <FontAwesomeIcon icon='chevron-left' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		arrowRight: {
			icon: <FontAwesomeIcon icon='arrow-right' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />,
			iconAlt: <FontAwesomeIcon icon='chevron-right' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		edit: {
			icon: <FontAwesomeIcon icon={['fas', 'pen-fancy']} style={{ color: 'var(--text-color)', paddingRight: '5px' }} pull='left' />
		},
		add: {
			icon: <FontAwesomeIcon icon='plus-circle' style={{ color: '#0ec254' }} size='2x' />
		},
		remove: {
			icon: <FontAwesomeIcon icon='minus-circle' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		done: {
			icon: <FontAwesomeIcon icon='check' style={{ color: '#01ff67' }} />
		},
		delete: {
			icon: <FontAwesomeIcon icon='trash' style={{ color: '#d33939' }} size='2x' />
		}
	},
	foodIcons: {
		burger: {
			icon: <FontAwesomeIcon icon='hamburger' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		breadSlice: {
			icon: <FontAwesomeIcon icon='bread-slice' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		bacon: {
			icon: <FontAwesomeIcon icon='bacon' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		egg: {
			icon: <FontAwesomeIcon icon='egg' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		carrot: {
			icon: <FontAwesomeIcon icon='carrot' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		candy: {
			icon: <FontAwesomeIcon icon='candy-cane' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		lemon: {
			icon: <FontAwesomeIcon icon='lemon' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		}
	},
	emojiIcons: {
		sad: {
			icon: <FontAwesomeIcon icon='sad-cry' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		tired: {
			icon: <FontAwesomeIcon icon='tired' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		}
	},
	other: {
		heart: {
			icon: <FontAwesomeIcon icon='heart' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		fire: {
			icon: <FontAwesomeIcon icon='fire' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />,
			iconAlt: <FontAwesomeIcon icon='fire-alt' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		},
		calender: {
			icon: <FontAwesomeIcon icon='calendar' style={{ color: 'var(--text-color)', paddingRight: '5px' }} size='2x' />,
			iconAlt: <FontAwesomeIcon icon='calendar-alt' style={{ color: 'var(--text-color)', paddingRight: '5px' }} size='2x' />
		},
		water: {
			icon: <FontAwesomeIcon icon='tint' style={{ color: 'var(--text-color)', paddingRight: '5px' }} />
		}
	}
};
