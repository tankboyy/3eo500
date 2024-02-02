export type weight = {
	weight: number;
	rep: number;
	set: number;
}

export type BoardType = {
	uid: string;
	title: string;
	data: string;
	createAt: Object;
}

export type apiBoardType = BoardType & {
	id: string;
	isImage?: string[];
}