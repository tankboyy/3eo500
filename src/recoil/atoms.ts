import {atom, selector} from "recoil";
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


export const selectDateState = atom<string>({
	key: 'selectDateState',
	default: dayjs().format("YYYY-MM-DD"),
});

function isValidDateFormat(dateString: string) {
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	if (!regex.test(dateString)) {
		return false;
	}

	// 날짜 유효성 검사를 추가로 수행합니다.
	const date = new Date(dateString);
	const year = dateString.substring(0, 4);
	const month = dateString.substring(5, 7);
	const day = dateString.substring(8, 10);

	return date.getFullYear() === parseInt(year) &&
		(date.getMonth() + 1) === parseInt(month) &&
		date.getDate() === parseInt(day);
}

export const selectorDateState = selector({
	key: 'selectorDate',
	get: ({get}) => {
		return get(selectDateState);
	},
	set: ({set}, newValue) => {
		if (typeof newValue === "string" && isValidDateFormat(newValue)) {
			set(selectDateState, newValue);
		} else if (newValue instanceof Date) {
			set(selectDateState, dayjs(newValue).format("YYYY-MM-DD"));
		}
	}
});

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
