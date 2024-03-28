import {useQueryClient} from "@tanstack/react-query";
import {useRecoilValue} from "recoil";
import {recordType, selectDateState} from "@/recoil/atoms";

export default function UseGetTodayRecord() {

	const q = useQueryClient();
	const selectDate = useRecoilValue(selectDateState);
	const recordData = q.getQueryData<recordType>(['record']);

	if (!recordData) return undefined;

	return recordData[selectDate];
}
