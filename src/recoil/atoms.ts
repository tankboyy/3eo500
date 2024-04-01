import {atom} from "recoil";
import dayjs from "dayjs";
import {apiBoardType} from "@/utils/types";
import {User} from "@firebase/auth";

export type recordType = {
	[key: string]: {
		[key: string]: {
			reps: number
			weight: number
			status: boolean
		}[]
	}
}

export const recordDataState = atom<recordType>({
	key: 'recordDataState',
	default: {}
});


export const selectDateState = atom<string>({
	key: 'selectDateState',
	default: dayjs().format("YYYY-MM-DD")
});

export type userType = {
	uid: string
	email: string
	nick: string
}
export const userDataState = atom<User | null>({
	key: 'userDataState',
	default: null,
});

export const selectPostState = atom<apiBoardType>({
	key: 'selectPostState',
	default: {
		uid: '',
		title: '',
		data: '',
		createAt: '',
		id: ''
	}
});
