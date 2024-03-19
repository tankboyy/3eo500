'use client';

import {useEffect, useState} from "react";

export default function Progress() {
	const [per, setPer] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setPer((prev) => {
				return prev > 100 ? 0 : prev + 1;
			});
		}, 50);
		return () => clearInterval(interval);
	}, []);
	return (
		<div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
			<div className="bg-primary h-1.5 rounded-full dark:bg-primary" style={{width: `${per}%`}}></div>
		</div>
	);
}
