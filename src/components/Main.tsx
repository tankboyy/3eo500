'use client';

import RecordWeight from "@/components/RecordWeight";
import AlreadyRecord from "@/components/AlreadyRecord";
import useGetTodayRecord from "@/hooks/useGetTodayRecord";
import {useQueryClient} from "react-query";

export default function Main() {

	const todayRecordData = useGetTodayRecord();

	const queryClient = useQueryClient();
	queryClient.getQueryData("record");

	return (
		<div id="component">
			{
				!todayRecordData ?
					<RecordWeight/> :
					<AlreadyRecord recordData={todayRecordData}/>
			}
		</div>
	);
}