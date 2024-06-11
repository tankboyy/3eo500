'use client';

import Main from "@/components/Main";
import PageLayout from "@/components/PageLayout";
import Calendar from "@/components/Calendar";


export default function Home() {
	return (
		<PageLayout>
			<Calendar/>
			<Main/>
		</PageLayout>
	);
}
