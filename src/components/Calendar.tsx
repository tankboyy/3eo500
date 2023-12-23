'use client';

import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {makeMonthArr} from "@/utils/makeMonthArr";

const days = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar() {
	const [nowDate, setNowDate] = useState(new Date());
	const [nowMonth, setNowMonth] = useState(nowDate.getMonth());
	const [selectDay, setSelectDay] = useState(dayjs(new Date()).format('YYYY-MM-DD'));

	const [monthArr, setMonthArr] = useState<string[][]>();

	useEffect(() => {
		setMonthArr(makeMonthArr(nowDate));
	}, []);


	return (
		<div className="flex flex-col justify-center">
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
			<div className="flex space-x-6">
				{days.map((day, index) =>
					<div key={index}
							 className={`w-6 h-6 text-center ${index === 0 && "text-red-600"} ${index === 6 && "text-blue-500"}`}>
						{day}
					</div>
				)}
			</div>
			<div>
				{makeMonthArr(nowDate).map((week, index) =>
					<div key={index} className="flex space-x-6">
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
