/** @format */

export interface i_Redux_ActionFunc_Interface_ImgUpload {
	uID: string;
	newArray: any[];
	file: any;
	fileName: string[];
}

export interface i_Redux_ActionFunc_Interface_ImgEdit {
	oldFileName: string;
	newArray: any[];
	newFileName: string;
	newFile: any;
	itemId: string | undefined;
}

export interface i_Redux_ActionFunc_Interface_ImgDelete {
	fileName: string;
	newArray: any[];
	itemId: string | undefined;
}
