import dayjs from "dayjs";

export const useMakeMonthArr = (date: Date) => {
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
		const prevMonthEndDay = new Date(date.getFullYear(), date.getMonth() - 1, 0).getDate();
		for (let i = 0; i <= firstWeek.lastIndexOf(""); i++) {
			firstWeek[i] = dayjs(`${nowYear}-${nowMonth}-${prevMonthEndDay - (firstWeek.lastIndexOf("") + 1 - i)}`).format('YYYY-MM-DD');
		}
	}

	// 마지막 주 끝이 토요일이 아닐 경우
	if (chunks[chunks.length - 1].length !== 7) {
		const lastWeek = chunks[chunks.length - 1];
		const nextMonthEndDay = new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate();
		for (let i = lastWeek.length; i < 7; i++) {
			lastWeek[i] = dayjs(`${nowYear}-${nowMonth + 1}-${nextMonthEndDay + i}`).format('YYYY-MM-DD');
		}
	}

	return chunks;
};
