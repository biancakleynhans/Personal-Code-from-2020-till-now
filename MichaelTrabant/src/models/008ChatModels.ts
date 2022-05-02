export interface i_BaseInterface_Chat {
	ts: number;
	content: {
		msgString: string;
		image: any;
	};
	idFrom: string;
	idTo: string;
	// noticationSetttings: string;
	// itemPost: boolean;
}

export interface iSendMsgModel {
	ts: number;
	content: {
		msgString: string;
		image: any;
	};
	idFrom: string;
	idTo: string;
	// noticationSetttings: string;
	id: string;
	// itemPost: boolean;
}
