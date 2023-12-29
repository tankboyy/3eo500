'use client';

import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useMakeMonthArr} from "@/hooks/useMakeMonthArr";

const days = ['일', '월', '화', '수', '목', '금', '토'];


export default function Calendar() {
	const [nowDate, setNowDate] = useState(new Date());
	const [nowMonth, setNowMonth] = useState(nowDate.getMonth());
	const [selectDay, setSelectDay] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
	const [monthArr, setMonthArr] = useState<string[][]>();


	useEffect(() => {
		setMonthArr(useMakeMonthArr(nowDate));

		const uid = window.localStorage.getItem('uid');

		async function getData() {
			const data = await fetch("/api/record", {
				method: 'POST',
				body: JSON.stringify({
					uid: uid
				})
			});
			if (!data.ok) {
				// This will activate the closest `error.js` Error Boundary
				throw new Error('Failed to fetch data');
			}
			return data;
		}


		getData().then(async (data) => {
			console.log(await data.json());
		});
	}, []);


	return (
		<div className="flex flex-col justify-center border-b-4 pb-[10px] w-full px-[10px] mb-[20px]">
			<div className="flex justify-between">
				<button className="" onClick={() => {
					setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, nowDate.getDate()));
				}}> prev
				</button>
				<span>
					{dayjs(nowDate).format('YYYY년 MM월')}
				</span>
				<button className="" onClick={() => {
					setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()));
				}}> next
				</button>
			</div>
			<div className="flex justify-between py-[4px]">
				{days.map((day, index) =>
					<div key={index}
							 className={`w-6 h-6 text-center ${index === 0 && "text-red-600"} ${index === 6 && "text-blue-500"}`}>
						{day}
					</div>
				)}
			</div>
			<div>
				{useMakeMonthArr(nowDate).map((week, index) =>
					<div key={index} className="flex justify-between">
						{week.map((day, index) =>
							<div key={index}
									 className={`w-6 h-6 text-center cursor-pointer rounded-full hover:bg-gray-200 ${index === 0 && "text-red-600"} ${index === 6 && "text-blue-500"} ${day === selectDay && "bg-gray-400"}`}
									 onClick={() => setSelectDay(day)}>
								{dayjs(day).format('D')}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
