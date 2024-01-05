'use client';

import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useMakeMonthArr} from "@/hooks/useMakeMonthArr";
import {useGetRecord} from "@/hooks/record.hooks";
import {useRecoilState, useRecoilValue} from "recoil";
import {recordDataState, selectDateState} from "@/recoil/atoms";

const days = ['일', '월', '화', '수', '목', '금', '토'];


export default function Calendar() {
	const [nowDate, setNowDate] = useState(new Date());
	const [nowMonth, setNowMonth] = useState(nowDate.getMonth());
	const [selectDate, setSelectDate] = useRecoilState(selectDateState);
	const [monthArr, setMonthArr] = useState<({ isTrue: boolean; day: string })[][]>();
	const recordData = useRecoilValue(recordDataState);
	useGetRecord();

	useEffect(() => {
		const keys = Object.keys(recordData);
		if (keys.length === 0) return;
		const newMonthArr = useMakeMonthArr(nowDate).map((week) => week.map((day) => {
			if (keys.includes(day.day)) {
				return ({
					day: day.day, isTrue: true
				});
			} else return ({
				day: day.day, isTrue: false
			});
		}));
		setMonthArr(newMonthArr);
	}, [recordData]);


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
				{monthArr?.map((week, index) =>
					<div key={index} className="flex justify-between">
						{week.map((day, index) =>
							<div key={index}
									 className={`w-6 h-6 text-center cursor-pointer rounded-full hover:bg-gray-200 ${index === 0 && "text-red-600"} ${index === 6 && "text-blue-500"} ${day.day === selectDate && "bg-gray-400"} ${day.isTrue && "bg-blue-300"} `}
									 onClick={() => setSelectDate(day.day)}>
								{dayjs(day.day).format('D')}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
