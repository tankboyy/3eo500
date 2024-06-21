import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {authState, recordType, selectDateState, userDataState} from "@/recoil/atoms";
import {doc, getDoc, updateDoc} from "@firebase/firestore";
import {db, useAuth} from "@/firebase";
import {recordDataType} from "@/components/RecordWeight";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useSetRecoilState} from "recoil";
import Cookies from "js-cookie";

export async function getRecordData() {
	const {data: uid} = await fetch('http://localhost:3000/api/auth/user', {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			'Authorization': "Bearer " + Cookies.get('accessToken')
		}
	}).then(res => res.json());

	if (!uid) return;
	return fetch("/api/record", {
		method: "POST",
		body: JSON.stringify({uid: uid}),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
		.then(data => data)
		.catch(err => console.error(err));
}

export const useGetRecord = () => {
	return useQuery<recordType>({
		queryKey: ["record"],
		queryFn: () => getRecordData(),
	});
};

interface UpdateRecordType {
	selectDate: string;
	recordName: string;
	data: recordDataType[];
}

async function updateRecord({selectDate, recordName, data}: UpdateRecordType) {
	const res = await fetch("http://localhost:3000/api/auth/user", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			'Authorization': "Bearer " + Cookies.get('accessToken')
		}
	});
	if (res.status !== 200) throw Error("auth error");

	const {data: uid} = await res.json();
	const ref = doc(db, "record", uid);
	const docSnap = await getDoc(doc(db, "record", uid));
	let returnData = {};
	if (docSnap.exists()) {
		const prevData = docSnap.data();
		if (prevData[selectDate]) {
			returnData = {
				[selectDate]: {
					...prevData[selectDate],
					[recordName]: data
				}
			};
		} else {
			returnData = {
				[selectDate]: {
					[recordName]: data
				}
			};
		}
	}
	return await updateDoc(ref, returnData);
}

export const useMutationRecord = () => {
	const q = useQueryClient();
	const setAuth = useSetRecoilState(authState);

	return useMutation({
		mutationFn: updateRecord,
		onSuccess: async (data1, variables, context) => {
			toast.success("저장되었습니다.");
			const {selectDate, recordName, data} = variables as UpdateRecordType;
			q.setQueryData(["record"], (old) => {
				return {
					// @ts-ignore
					...old,
					[selectDate]: {
						// @ts-ignore
						...old[selectDate],
						[recordName]: data
					}
				};
			});
		},
		onError: (error, context) => {
			toast.error("저장에 실패했습니다.");
			if (error.message === "auth error") {
				setAuth(true);
			}
			return error.message;
		},
		onMutate: ({selectDate, recordName, data}: UpdateRecordType) => {
		}
	});
};
