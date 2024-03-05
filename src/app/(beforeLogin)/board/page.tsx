'use client';

import BoardList from "@/components/board/BoardList";
import {useRouter} from "next/navigation";

export default function Page(data: any) {
	const router = useRouter();
	return (
		<main>
			<BoardList/>
		</main>
	);
}