'use client';

import Calendar from "@/components/Calendar";
import Main from "@/components/Main";
import {getRecordData, useGetRecord} from "@/hooks/record.hooks";


export default function Home() {

	useGetRecord();

	return (
		<main>
			<Calendar/>
			<Main/>
		</main>
	);
}
