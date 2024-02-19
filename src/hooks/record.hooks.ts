import {useMutation, useQuery} from "react-query";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {recordDataState, selectDateState} from "@/recoil/atoms";
import {recordDataType} from "@/components/RecordWeight";
import {doc, getDoc, updateDoc} from "@firebase/firestore";
import {db} from "@/firebase";

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

export const useUpdateRecord = async ({uid, recordName, data}: {
	uid: string,
	recordName: string,
	data: recordDataType[]
}) => {
	const setRecordData = useSetRecoilState(recordDataState);
	const nowDate = useRecoilValue(selectDateState);

	const Ref = doc(db, "record", uid);
	const docSnap = await getDoc(Ref);

	if (docSnap.exists()) {
		const prevData = docSnap.data();
		let data = {};
		if (prevData[nowDate]) {
			data = {
				[nowDate]: {
					...prevData[nowDate],
					[recordName]: data
				}
			};
		} else {
			data = {
				[nowDate]: {
					[recordName]: data
				}
			};
		}

		// useMutation(updateDoc(Ref, data));

		// toast.promise(updateDoc(Ref, data).then(() => {
		// 	return "성공";
		// }), {
		// 	loading: '기록중...',
		// 	success: '기록완료!',
		// 	error: '기록실패!'
		// });
	}
};