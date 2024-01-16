import {atom} from "recoil";
import dayjs from "dayjs";

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