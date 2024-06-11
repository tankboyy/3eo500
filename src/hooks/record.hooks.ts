import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {recordType, selectDateState, userDataState} from "@/recoil/atoms";
import {useRecoilValue} from "recoil";
import {doc, getDoc, updateDoc} from "@firebase/firestore";
import {db, useAuth} from "@/firebase";
import {recordDataType} from "@/components/RecordWeight";
import {toast} from "sonner";
import nookies from "nookies";

export async function getRecordData() {
	const {data: uid} = await fetch('api/auth/user').then(res => res.json());

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
	// const auth = getAuth();
	const uid = 'jZvW9dLKixZnLW5KBXSuPDv59Ip2';
	if (!uid) return;
	const ref = doc(db, "record", uid);
	console.log('ref', ref.firestore, ref.id, ref.path);
	const docSnap = await getDoc(doc(db, "record", uid));
	console.log('docSnap', docSnap.data());
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
	console.log('returnData', returnData);
	return await updateDoc(ref, returnData);
}

export const useMutationRecord = () => {
	const q = useQueryClient();
	const selectDate = useRecoilValue(selectDateState);
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
			console.log('error', error, context);
			toast.error("저장에 실패했습니다.");
		},
		onMutate: ({selectDate, recordName, data}: UpdateRecordType) => {
		}
	});
};
