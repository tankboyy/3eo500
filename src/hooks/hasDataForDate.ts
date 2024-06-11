import {useQueryClient} from "@tanstack/react-query";
import {useRecoilValue} from "recoil";
import {recordType, selectDateState} from "@/recoil/atoms";
import dayjs from "dayjs";

export default function HasDataForDate(day?: Date | string) {

	const q = useQueryClient();
	const recordData = q.getQueryData<recordType>(['record']);
	if (!recordData) return undefined;

	if (day) {
		if (typeof day === 'string') return recordData[day];
		return recordData[dayjs(day).format('YYYY-MM-DD')];
	} else {
		const selectDate = useRecoilValue(selectDateState);
		// @ts-ignore
		return recordData[selectDate];
	}
}
