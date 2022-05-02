export interface i_Redux_ActionFunc_Interface_ImgUpload {
	uID: string;
	file: any;
	fileName: string;
}

export interface i_Redux_ActionFunc_Interface_ImgEdit {
	oldFileName: string;
	newArray: any[];
	newFileName: string;
	newFile: any;
	itemId: string;
	indexOfImg: number;
}

export interface i_Redux_ActionFunc_Interface_ImgDelete {
	fileName: string;
	newArray: any[];
	itemId: string | undefined;
}
