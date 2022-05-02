import { Translate } from './TranslateServices';
import { lsInj } from './LocalLangDict';

export const CombinedString = {
	profileName: Translate(lsInj.transDict.Profile) + ' ' + Translate(lsInj.transDict.Name),
	profilePhoto: Translate(lsInj.transDict.Profile) + ' ' + Translate(lsInj.transDict.PhotoSingle),
	profilePhotos: Translate(lsInj.transDict.Profile) + ' ' + Translate(lsInj.transDict.PhotoMultiple),
	profileSettings: Translate(lsInj.transDict.Profile) + ' ' + Translate(lsInj.transDict.Settings),
	profileSettingsEditCat: Translate(lsInj.transDict.Edit) + ' ' + Translate(lsInj.transDict.CatSingle),
	profileSettingsDeleteCat: Translate(lsInj.transDict.Delete) + ' ' + Translate(lsInj.transDict.CatSingle),
	profileSettingsChangeCat: Translate(lsInj.transDict.Change) + ' ' + Translate(lsInj.transDict.CatSingle),

	profileSettingsEditPhotos: Translate(lsInj.transDict.PhotoSingle) + ' ' + Translate(lsInj.transDict.Edit),
	profileSettingsAddPhotos: Translate(lsInj.transDict.PhotoSingle) + ' ' + Translate(lsInj.transDict.Add),
	profileSettingsChangePhotos: Translate(lsInj.transDict.editImg),
	profileSettingsAddNewCat: Translate(lsInj.transDict.Enter) + ' ' + Translate(lsInj.transDict.New) + ' ' + Translate(lsInj.transDict.CatSingle),
	profileSettingsCatNameString: Translate(lsInj.transDict.CatSingle) + ' ' + Translate(lsInj.transDict.Name),
	profileSettingsCatToDel: Translate(lsInj.transDict.CatSingle) + ' ' + Translate(lsInj.transDict.youWishTo) + ' ' + Translate(lsInj.transDict.Delete),
	profileSettingsCatContains: Translate(lsInj.transDict.This) + ' ' + Translate(lsInj.transDict.CatSingle) + ' ' + Translate(lsInj.transDict.contains),
	profileSettingsCatNoItems:
		Translate(lsInj.transDict.No) +
		' ' +
		Translate(lsInj.transDict.ItemMultiple) +
		' ' +
		Translate(lsInj.transDict.in) +
		' ' +
		Translate(lsInj.transDict.this) +
		' ' +
		Translate(lsInj.transDict.CatSingle),

	ItemsAddPhotos: Translate(lsInj.transDict.ItemMultiple) + ' ' + Translate(lsInj.transDict.PhotoSingle),
	ItemBuildName: Translate(lsInj.transDict.ItemMultiple) + ' ' + Translate(lsInj.transDict.Name),
	ItemDonate: Translate(lsInj.transDict.Donate) + ' ' + Translate(lsInj.transDict.this) + ' ' + Translate(lsInj.transDict.ItemSingle),
	ItemDelete: Translate(lsInj.transDict.Delete) + ' ' + Translate(lsInj.transDict.this) + ' ' + Translate(lsInj.transDict.ItemSingle),

	ItemEdit: Translate(lsInj.transDict.Edit) + ' ' + Translate(lsInj.transDict.this) + ' ' + Translate(lsInj.transDict.ItemSingle),
	ItemEditImg: Translate(lsInj.transDict.Edit) + ' ' + Translate(lsInj.transDict.this) + ' ' + Translate(lsInj.transDict.ItemSingle) + ' ' + Translate(lsInj.transDict.img),
	ItemCreate: Translate(lsInj.transDict.CreateItem),
	groupSetting: Translate(lsInj.transDict.Group) + ' ' + Translate(lsInj.transDict.Settings),
	GroupCreate: Translate(lsInj.transDict.Group) + ' ' + Translate(lsInj.transDict.Create),
	eventCreate: Translate(lsInj.transDict.Event) + ' ' + Translate(lsInj.transDict.Create),

	eventEdit: Translate(lsInj.transDict.Event) + ' ' + Translate(lsInj.transDict.Edit),

	homePageHeaderCats: Translate(lsInj.transDict.CatMultiple),
	homePageHeaderEvents: Translate(lsInj.transDict.Event),
	homePageHeaderGroups: Translate(lsInj.transDict.Group),
	homePageHeaderDons: Translate(lsInj.transDict.Donations)
};
