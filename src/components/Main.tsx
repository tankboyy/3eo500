'use client';

import RecordWeight from "@/components/RecordWeight";
import AlreadyRecord from "@/components/AlreadyRecord";
import useGetTodayRecord from "@/hooks/useGetRecord";
import {selectDateState} from "@/recoil/atoms";
import {useRecoilValue} from "recoil";

export default function Main() {

	const selectDate = useRecoilValue(selectDateState);
	const todayRecordData = useGetTodayRecord(selectDate);

	if (todayRecordData === undefined) return <RecordWeight/>;

	return (
		<>
			<AlreadyRecord recordData={todayRecordData}/>
		</>
	);
}
