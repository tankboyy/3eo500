'use client';

import RecordWeight from "@/components/RecordWeight";
import AlreadyRecord from "@/components/AlreadyRecord";
import useGetTodayRecord from "@/hooks/useGetTodayRecord";
import {useEffect} from "react";
import {useRecoilValue} from "recoil";
import {recordDataState} from "@/recoil/atoms";

export default function Main() {

	const todayRecordData = useGetTodayRecord();


	return (
		<div>
			{
				!todayRecordData ?
					<RecordWeight/> :
					<AlreadyRecord recordData={todayRecordData}/>
			}
		</div>
	);
}