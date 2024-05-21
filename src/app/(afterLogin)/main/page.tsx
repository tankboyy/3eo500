'use client';

import Calendar from "@/components/Calendar";
import Main from "@/components/Main";
import PageLayout from "@/components/PageLayout";
import {useGetRecord} from "@/hooks/record.hooks";

export default function Home() {
	useGetRecord();
	return (
		<PageLayout>
			<Calendar/>
			<Main/>
		</PageLayout>
	);
}
