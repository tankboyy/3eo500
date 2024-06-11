import {useQueryClient} from "@tanstack/react-query";
import {useRecoilValue} from "recoil";
import {recordType, selectDateState} from "@/recoil/atoms";
import dayjs from "dayjs";
import {useGetRecord} from "@/hooks/record.hooks";

export default function HasDataForDate(day?: Date | string) {

	const {data: recordData} = useGetRecord();
	if (!recordData) return;
	if (day) {
		if (typeof day === 'string') return recordData[day];
		return recordData[dayjs(day).format('YYYY-MM-DD')];
	} else {
		const selectDate = useRecoilValue(selectDateState);
		return recordData[selectDate];
	}
}
