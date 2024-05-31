'use client';

import RecordWeight from "@/components/RecordWeight";
import AlreadyRecord from "@/components/AlreadyRecord";
import useGetTodayRecord from "@/hooks/useGetTodayRecord";

export default function Main() {

	const todayRecordData = useGetTodayRecord();

	if (todayRecordData === undefined) return <RecordWeight/>;

	return (
		<>
			<AlreadyRecord recordData={todayRecordData}/>
		</>
	);
}
