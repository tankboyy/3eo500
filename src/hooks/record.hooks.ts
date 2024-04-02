import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {getAuth, User} from "@firebase/auth";
import {recordType, selectDateState} from "@/recoil/atoms";
import {useRecoilValue} from "recoil";
import {doc, getDoc, updateDoc} from "@firebase/firestore";
import {db} from "@/firebase";
import {recordDataType} from "@/components/RecordWeight";
import {toast} from "sonner";

export async function getRecordData(uid: string | undefined) {
	return fetch("/api/record", {
		method: "POST",
		body: JSON.stringify({uid: uid}),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
		.then(data => data);
}

export const useGetRecord = () => {
	const auth = getAuth();

	if (!auth) return;
	return useQuery<recordType>({
		queryKey: ["record"],
		queryFn: () => getRecordData(auth.currentUser?.uid),
		staleTime: 300000,
	});
};

interface UpdateRecordType {
	selectDate: string;
	recordName: string;
	data: recordDataType[];
}

async function updateRecord({selectDate, recordName, data}: UpdateRecordType) {
	const auth = getAuth();
	const uid = auth.currentUser?.uid;
	if (!uid) return;
	const ref = doc(db, "record", uid);
	const docSnap = await getDoc(ref);
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
