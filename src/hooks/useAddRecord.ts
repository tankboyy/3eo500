import {doc, getDoc, updateDoc} from "@firebase/firestore";
import {db} from "@/firebase";
import {useMutation, useQueryClient} from "react-query";
import {recordDataType} from "@/components/RecordWeight";
import {toast} from "sonner";

export type AddRecordType = { uid: string, recordName: string, selectDate: string, data: recordDataType[] }

export function useAddRecord() {
	const queryClient = useQueryClient();
	const mutation = useMutation(updateRecord, {
		onSuccess: async () => {
			await queryClient.invalidateQueries("record");
			toast("저장되었습니다.");
		},
		onError: () => {
			toast("저장에 실패했습니다.");
		}
	});
	return {mutation};
}

const updateRecord = async ({uid, recordName, selectDate, data}: AddRecordType) => {
	const Ref = doc(db, "record", uid);
	const docSnap = await getDoc(Ref);
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
	await updateDoc(Ref, returnData);
};