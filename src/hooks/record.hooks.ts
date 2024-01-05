import {useQuery} from "react-query";
import {useSetRecoilState} from "recoil";
import {recordDataState} from "@/recoil/atoms";

export const useGetRecord = () => {
	const setRecordData = useSetRecoilState(recordDataState);
	return useQuery("record", async () => {
		const res = await fetch("/api/record", {
			method: "POST",
			body: JSON.stringify({uid: localStorage.getItem("uid")}),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await res.json();
		setRecordData(data);
		return data;
	});
};

