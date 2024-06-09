'use client';

import Main from "@/components/Main";
import PageLayout from "@/components/PageLayout";
import {useGetRecord} from "@/hooks/record.hooks";
import {useQueryClient} from "@tanstack/react-query";
import Calendar from "@/components/Calendar";


export default function Home() {
	const q = useQueryClient();
	if (!q.getQueryData(['record'])) {
		const {data} = useGetRecord();
	}
	return (
		<PageLayout>
			<button onClick={async () => {
				// const res = await fetch("/api/auth/token", {
				// 	method: "POST",
				// 	headers: {
				// 		"Content-Type": "application/json",
				// 	},
				// 	body: JSON.stringify({
				// 		accessToken: "asd"
				// 	})
				// }).then(res => res.json()).then(data => data);
				// console.log(res);
				console.log(q.getQueryData(['record']));
			}}>
				asd
			</button>
			<Calendar/>
			<Main/>

		</PageLayout>
	);
}
