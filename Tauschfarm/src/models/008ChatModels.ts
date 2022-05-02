export interface i_BaseInterface_Chat {
	ts: number;
	content: {
		msgString: string;
		image?: any;
		images?: any[];
		id?: string;
		name?: string;
		brand?: { en: string; de: string };
		size?: { en: string; de: string };
		color?: string;
		length?: string;
		avatar?: string;
	};
	idFrom: string;
	idTo: string;
	noticationSetttings: string;
	itemPost: boolean;
	id?: string;
}

export interface iSendMsgModel {
	ts: number;
	content: {
		msgString: string;
		image?: any;
		images?: any[];
		id?: string;
		name?: string;
		brand?: string;
		size?: string;
		color?: string;
		length?: string;
		avatar?: string;
	};
	idFrom: string;
	idTo: string;
	noticationSetttings: string;
	id: string;

	itemPost: boolean;
}
