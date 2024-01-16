import {recordDataType} from "@/components/RecordWeight";
import {useEffect, useRef, useState} from "react";
import useGetTodayRecord from "@/hooks/useGetTodayRecord";
import {useAddRecord} from "@/hooks/useAddRecord";
import {useRecoilValue} from "recoil";
import {selectDateState} from "@/recoil/atoms";

type Props = {
	selectName: string;
	recordData?: {
		[key: string]: {
			reps: number
			weight: number
			status: boolean
		}[]
	};
}

export default function RecordView({selectName, recordData = useGetTodayRecord()}: Props) {

	const [newRecordData, setNewRecordData] = useState<recordDataType[]>(!recordData ? [{
		reps: 0,
		weight: 0,
		status: false
	}] : recordData[selectName]);
	const recordDatas = useRef(newRecordData);
	const [recordingState, setRecordingState] = useState(false);
	const {mutation: addRecord} = useAddRecord();
	const nowDate = useRecoilValue(selectDateState);
	const uid = localStorage.getItem("uid")!;

	useEffect(() => {
		recordDatas.current = newRecordData;
	}, [newRecordData]);

	useEffect(() => {
		return () => {
			if (recordDatas.current === newRecordData) return;
			addRecord.mutate({uid, recordName: selectName, selectDate: nowDate, data: recordDatas.current});
		};
	}, []);


	const changeRecords = (action: string) => {
		if (!recordingState) setRecordingState(true);
		if (action === "add") {
			setNewRecordData(prev => {
				return [...prev, {
					reps: 0,
					weight: 0,
					status: false
				}];
			});
		} else if (action === "remove") {
			setNewRecordData(prev => {
				return prev.slice(0, prev.length - 1);
			});
		}
	};

	const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		if (!recordingState) setRecordingState(true);

		setNewRecordData(prev => {
			const data = [...prev];
			data[index] = {
				...data[index],
				weight: Number(e.target.value)
			};
			return data;
		});
	};

	const onChangeReps = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		if (!recordingState) setRecordingState(true);

		setNewRecordData(prev => {
			const data = [...prev];
			data[index] = {
				...data[index],
				reps: Number(e.target.value)
			};
			return data;
		});
	};

	const onChangeStatus = (index: number) => {
		if (!recordingState) setRecordingState(true);

		setNewRecordData(prev => {
			const data = [...prev];
			console.log(data, index, data[index].status);
			data[index] = {
				...data[index],
				status: !data[index].status
			};
			return data;
		});
	};

	return (
		<div className="pb-[20px] flex flex-col p-[20px] w-full">
			<div className="px-[20px]">
				<div className="flex justify-between">
					<span>세트</span>
					<span>Kg</span>
					<span>횟수</span>
					<button>완료</button>
				</div>
			</div>
			<div>
				<div className="pb-[20px]">
					{
						newRecordData?.map((item, index) => (
							<div className="flex justify-between px-[20px] h-[30px]" key={index}>
								<button className="w-[28px]">{index + 1}</button>
								<input className="w-[40px] text-center" onChange={(e) => onChangeWeight(e, index)} type="text"
											 defaultValue={item.weight} maxLength={3}/>
								<input className="w-[40px] text-center" onChange={(e) => onChangeReps(e, index)} type="text"
											 defaultValue={item.reps} maxLength={3}/>
								<button className="w-[28px]" onClick={() => onChangeStatus(index)}>{item.status ? "O" : "X"}</button>
							</div>
						))
					}
				</div>
				<div className="flex space-x-2">
					<button className="w-1/2 bg-blue-300 h-8 rounded-[8px] hover:bg-blue-500"
									onClick={() => changeRecords("add")}>세트추가
					</button>
					<button className="w-1/2 bg-blue-300 h-8 rounded-[8px] hover:bg-blue-500"
									onClick={() => changeRecords("remove")}>세트삭제
					</button>
				</div>
			</div>

		</div>
	);
}