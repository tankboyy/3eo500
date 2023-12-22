'use client';

import {useState} from "react";

const days = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar() {
	const [nowDate, setNowDate] = useState(new Date());
	const [nowMonth, setNowMonth] = useState(nowDate.getMonth());

	const makeMonthArr = (date: Date) => {
		const monthArr: number[] = [];
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		for (let i = 0; i < firstDay.getDay(); i++) {
			monthArr.push(0);
		}

		for (let i = 1; i <= lastDay.getDate(); i++) {
			monthArr.push(i);
		}

		const chunks: number[][] = [];
		for (let i = 0; i < monthArr.length; i += 7) {
			chunks.push(monthArr.slice(i, i + 7));
		}

		// 첫 주 시작이 일요일이 아닐 경우
		if (chunks[0].indexOf(0) === 0) {
			const firstWeek = chunks[0];
			const prevMonthEndDay = new Date(date.getFullYear(), date.getMonth() - 1, 0).getDate();
			for (let i = 0; i <= firstWeek.lastIndexOf(0); i++) {
				firstWeek[i] = prevMonthEndDay + i - firstWeek.lastIndexOf(0);
			}
		}

		// 마지막 주 끝이 토요일이 아닐 경우
		if (chunks[chunks.length - 1].length !== 7) {
			const lastWeek = chunks[chunks.length - 1];
			const nextMonthStartDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDate();
			for (let i = lastWeek.length; i < 7; i++) {
				lastWeek[i] = i;
			}
		}

		return chunks;
	};


	return (
		<div>
			<div className="flex space-x-6">
				{days.map((day, index) =>
					<div key={index} className="w-6 h-6 text-center">
						{day}
					</div>
				)}
			</div>
			<div>
				{makeMonthArr(nowDate).map((week, index) =>
					<div key={index} className="flex space-x-6" onScroll={(e) => {
						console.log(e);
					}}>
						{week.map((day, index) =>
							<div key={index} className="w-6 h-6 text-center">
								{day}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
