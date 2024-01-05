import {useRecoilValue} from "recoil";
import {recordDataState, selectDateState} from "@/recoil/atoms";

export default function UseGetTodayRecord() {
	const selectDate = useRecoilValue(selectDateState);
	const recordData = useRecoilValue(recordDataState);

	const data = recordData[selectDate];

	if (!data) return undefined;

	return data;
}