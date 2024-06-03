'use client';

import {useState} from "react";
import {
	addDays,
	addMonths,
	endOfMonth,
	endOfWeek,
	format,
	isSameDay,
	isSameMonth,
	startOfMonth,
	startOfWeek,
	subMonths
} from "date-fns";
import {useRecoilState} from "recoil";
import {selectorDateState} from "@/recoil/atoms";
import {useGetRecord} from "@/hooks/record.hooks";
import {useQueryClient} from "@tanstack/react-query";

export default function Calendar() {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [slideDirection, setSlideDirection] = useState('');
	const [selectorDate, setSelectorDate] = useRecoilState(selectorDateState);
	const query = useQueryClient();
	const allRecordData = query.getQueryData(['record']);


	const nextMonth = () => {
		console.log('nextMonth');
		setSlideDirection('transform translate-x-full');
		setTimeout(() => {
			setCurrentMonth(addMonths(currentMonth, 1));
			setSlideDirection('');
		}, 500);
	};

	const prevMonth = () => {
		console.log('prevMonth');
		setSlideDirection('transform -translate-x-full');
		setTimeout(() => {
			setCurrentMonth(subMonths(currentMonth, 1));
			setSlideDirection('');
		}, 500);
	};


	const renderCells = () => {
		const monthStart = startOfMonth(currentMonth);
		const monthEnd = endOfMonth(monthStart);
		const startDate = startOfWeek(monthStart);
		const endDate = endOfWeek(monthEnd);

		const onDateClick = (day: Date) => {
			console.log(day, format(day, 'yyyy-MM-dd'));
			setCurrentMonth(day);
			setSelectorDate(day);
		};

		const rows = [];
		let days = [];
		let day = startDate;
		let formattedDate = '';

		while (day <= endDate) {
			for (let i = 0; i < 7; i++) {
				formattedDate = format(day, 'd');
				const cloneDay = day;
				days.push(
					<div
						className={`flex-1 h-8 flex justify-center items-center relative cursor-pointer ${
							!isSameMonth(day, monthStart)
								? 'text-gray-400'
								:
								// useGetRecord(cloneDay) ? 'bg-cyan-300' :
								isSameDay(day, selectorDate)
									? 'bg-blue-200'
									: ''
						}`}
						key={String(day)}
						onClick={() => onDateClick(cloneDay)}
					>
						<span className="z-10">{formattedDate}</span>
						<span className="absolute text-gray-300 text-2xl">{formattedDate}</span>
					</div>
				);
				day = addDays(day, 1);
			}
			rows.push(
				<div className="flex" key={String(day)}>
					{days}
				</div>
			);
			days = [];
		}
		return <div className={`transition-transform duration-500 ${slideDirection}`}>{rows}</div>;
	};

	const renderDays = () => {
		const days = [];
		const date = ['일', '월', '화', '수', '목', '금', '토'];

		for (let i = 0; i < 7; i++) {
			days.push(
				<div className={`flex-1 text-center py-2 ${i === 0 && "text-red-600"} ${i === 6 && "text-blue-500"}`} key={i}>
					{date[i]}
				</div>
			);
		}

		return <div className="flex">{days}</div>;
	};

	const renderHeader = () => {
		return (
			<div className="flex justify-between items-center py-2 px-2">
				<div className="cursor-pointer" onClick={prevMonth}>
					&lt;
				</div>
				<div className="text-lg">
          <span>
            {format(currentMonth, 'MMMM yyyy')}
          </span>
				</div>
				<div className="cursor-pointer" onClick={nextMonth}>
					&gt;
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col justify-center border-b-4 pb-[10px] w-full px-[10px] mb-[20px]">
			<button
				onClick={() => {
					setSelectorDate('2022-01-01');
				}}
			>asdz
			</button>

			{renderHeader()}
			{renderDays()}
			<div className="overflow-hidden">
				{renderCells()}
			</div>
		</div>

	);
}
