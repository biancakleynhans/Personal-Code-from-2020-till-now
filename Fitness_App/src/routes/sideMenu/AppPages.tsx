/** @format */

import { FavList } from '../../components/icons/FaviconList';
import { LablesList } from '../../components/titleLists/Titles';

export const appPagesNotAuthed = [
	{
		title: LablesList.Page_Menu_Names.Home.af,
		url: '/home',
		icon: FavList.menuIcons.home.icon
	},
	{
		title: LablesList.Page_Menu_Names.Login.af,
		url: '/',
		icon: FavList.userIcons.userLogged.icon
	},
	{
		title: LablesList.Page_Menu_Names.Register.af,
		url: '/register',
		icon: FavList.userIcons.newUser.icon
	}
];

export const appPagesAuthed = [
	{
		title: LablesList.Page_Menu_Names.Home.af,
		url: '/home',
		icon: FavList.menuIcons.home.icon
	},
	{
		title: LablesList.Page_Menu_Names.Dashboard.af,
		url: '/dashboard',
		icon: FavList.userIcons.userDash.icon
	},
	{
		title: LablesList.Page_Menu_Names.FastType.af,
		url: '/fastType',
		icon: FavList.menuIcons.clock.icon
	},
	{
		title: LablesList.Page_Menu_Names.FastTimer.af,
		url: '/fastTimer',
		icon: FavList.menuIcons.clock.icon
	},
	{
		title: LablesList.Page_Menu_Names.FastHistory.af,
		url: '/fastHistory',
		icon: FavList.menuIcons.clockHist.icon
	},
	{
		title: LablesList.Page_Menu_Names.WeightAdd.af,
		url: '/weightAdd',
		icon: FavList.menuIcons.weight.icon
	},
	{
		title: LablesList.Page_Menu_Names.WeightHistory.af,
		url: '/weightHistory',
		icon: FavList.menuIcons.weight.icon
	},
	{
		title: LablesList.Page_Menu_Names.WaterDiary.af,
		url: '/waterDiary',
		icon: FavList.other.water.icon
	},
	{
		title: LablesList.Page_Menu_Names.FoodDiary.dayView.af,
		url: '/foodDiary',
		icon: FavList.foodIcons.burger.icon
	},
	{
		title: LablesList.Page_Menu_Names.ScaleGalery.af,
		url: '/scalePhoto',
		icon: FavList.userIcons.userDash.icon
	},
	{
		title: LablesList.Page_Menu_Names.Vloermoer.af,
		url: '/tantrum',
		icon: FavList.emojiIcons.sad.icon
	},
	{
		title: LablesList.Page_Menu_Names.Recipes.af,
		url: '/recipes',
		icon: FavList.other.fire.iconAlt
	},
	{
		title: LablesList.Page_Menu_Names.Libary.container.af,
		url: '/booksContainer',
		icon: FavList.menuIcons.book.icon
	},
	{
		title: LablesList.Page_Menu_Names.Libary.vetnoi.af,
		url: '/vetnoi',
		icon: FavList.menuIcons.book.icon
	},{
		title: LablesList.Page_Menu_Names.Libary.byble.af,
		url: '/byble',
		icon: FavList.menuIcons.book.icon
	},
	{
		title: LablesList.Page_Menu_Names.Libary.bybleStudy.af,
		url: '/bybleStudy',
		icon: FavList.menuIcons.book.icon
	},
	{
		title: LablesList.Page_Menu_Names.Libary.news.af,
		url: '/news',
		icon: FavList.menuIcons.book.icon
	},
	{
		title: LablesList.Page_Menu_Names.Libary.course.af,
		url: '/courses',
		icon: FavList.menuIcons.book.icon
	},


];
