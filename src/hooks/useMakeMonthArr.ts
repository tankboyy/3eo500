import dayjs from "dayjs";


export const useMakeMonthArr = (date: Date): { day: string; isTrue: false }[][] => {
	const monthArr: string[] = [];
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	const nowYear = date.getFullYear();
	const nowMonth = date.getMonth();


	for (let i = 0; i < firstDay.getDay(); i++) {
		monthArr.push("");
	}

	for (let i = 1; i <= lastDay.getDate(); i++) {
		monthArr.push(dayjs(`${nowYear}-${nowMonth + 1}-${i}`).format('YYYY-MM-DD'));
	}

	const chunks: string[][] = [];
	for (let i = 0; i < monthArr.length; i += 7) {
		chunks.push(monthArr.slice(i, i + 7));
	}


	// 첫 주 시작이 일요일이 아닐 경우
	if (chunks[0].indexOf("") === 0) {
		const firstWeek = chunks[0];
		const prevMonthEndDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
		let p = 0;
		for (let i = firstWeek.lastIndexOf(""); i >= 0; i--) {
			firstWeek[i] = dayjs(`${nowYear}-${nowMonth}-${prevMonthEndDay - p}`).format('YYYY-MM-DD');
			p++;
		}
	}

	// 마지막 주 끝이 토요일이 아닐 경우
	if (chunks[chunks.length - 1].length !== 7) {
		const lastWeek = chunks[chunks.length - 1];
		const nextMonthEndDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		let p = 1;
		for (let i = lastWeek.length; i < 7; i++) {
			lastWeek[i] = dayjs(`${nowYear}-${nowMonth + 1}-${nextMonthEndDay + p}`).format('YYYY-MM-DD');
			p++;
		}
	}

	return chunks.map((week) => week.map((day) => ({day: day, isTrue: false})));

};
