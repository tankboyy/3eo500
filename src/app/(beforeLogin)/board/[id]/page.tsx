'use client';

import {usePathname, useSearchParams} from "next/navigation";
import {useEffect} from "react";


export default function Page() {
	const pathName = usePathname();
	const searchParams = useSearchParams();
	

	useEffect(() => {
		console.log(pathName.split("/board/")[1], searchParams);
	}, []);

	return (
		<div>
			hi
		</div>
	);
}