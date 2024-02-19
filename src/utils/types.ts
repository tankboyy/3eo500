export type weight = {
	weight: number;
	rep: number;
	set: number;
}

export type BoardType = {
	uid: string;
	title: string;
	data: string;
	createAt: string;
}

export type apiBoardType = BoardType & {
	id: string;
	nick?: string;
	isImage?: string[];
}