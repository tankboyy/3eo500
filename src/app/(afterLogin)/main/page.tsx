// 'use client';

import Calendar from "@/components/Calendar";
import Main from "@/components/Main";
import {useGetAuthData} from "@/components/providers/AuthProvider";

// async function getRecordData(uid: string | undefined) {
// 	return fetch("/api/record", {
// 		method: "POST",
// 		body: JSON.stringify({uid: uid}),
// 		headers: {
// 			"Content-Type": "application/json"
// 		}
// 	})
// 		.then(res => res.json())
// 		.then(data => data);
// }

export default async function Home() {

	// useGetRecord();

	// const uid = useGetAuthData().user?.uid;
	// const {data: recordData} = await getRecordData(uid);

	// console.log(data);
	return (
		<main>
			<Calendar/>
			<Main/>
		</main>
	);
}
