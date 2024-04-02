import {Input} from "@/components/ui/input";
import React, {useEffect, useState} from "react";
import {recordDataType} from "@/components/RecordWeight";
import {useMutationRecord} from "@/hooks/record.hooks";
import {useRecoilValue} from "recoil";
import {selectDateState} from "@/recoil/atoms";

type RecordViewProps = {
	recordName: string;
	selectPart: string;

}
export default function RecordView({recordName, selectPart}: RecordViewProps) {
	const [recordData, setRecordData] = useState<recordDataType[]>([{
		reps: 0,
		weight: 0,
		status: false
	}]);
	const selectDate = useRecoilValue(selectDateState);


	const onChangeWeight: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		setRecordData(prev => {
			const data = [...prev];
			data[index].weight = Number(e.target.value);
			return data;
		});
	};

	const onChangeReps: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		setRecordData(prev => {
			const data = [...prev];
			data[index].reps = Number(e.target.value);
			return data;
		});
	};

	const onChangeStatus: (index: number) => void = (index: number) => {
		setRecordData(prev => {
			const data = [...prev];
			data[index].status = !data[index].status;
			return data;
		});
	};


	// function removeSelection() {
	// 	setRecordName("");
	// }

	const changeRecords = (action: string) => {
		if (action === "add") {
			if (recordData.length === 12) return;
			setRecordData(prev => {
				return [...prev, {
					reps: 0,
					weight: 0,
					status: false
				}];
			});
		} else if (action === "remove") {
			if (recordData.length === 0) return;
			setRecordData(prev => {
				return prev.slice(0, prev.length - 1);
			});
		}
	};


	useEffect(() => {
		console.log('useEffect');
		return () => {
			console.log('unmount');

		};
	}, []);

	// function onSaveRecord() {
	// 	const uid = localStorage.getItem("uid");
	// 	if (!uid) return;
	// 	addRecord.mutate({uid, recordName, selectDate: nowDate, data: recordDatas});
	// }

	const {mutate} = useMutationRecord();

	// const selectDate = useGet
	function removeSelection() {
		console.log('removeSelection', recordName, selectPart);
		console.log(recordData);

		mutate({selectDate, recordName: recordName, data: recordData});
	}

	return (
		<div className="w-full">
			{recordName &&
        <div className="w-full flex flex-col justify-between p-[20px]">
          <div>
            <div className="flex justify-between border-b-2 w-full pb-2 mb-6 px-[6px]">
              <span>{`${selectPart} | ${recordName}`}</span>
              <div>
                <button className="hover:bg-red-300 w-[24px] h-[24px] rounded-full"
                        onClick={() => {
													removeSelection();
												}}>X
                </button>
              </div>
            </div>
            <div className="px-[20px]">
              <div className="flex justify-between">
                <span>세트</span>
                <span>Kg</span>
                <span>횟수</span>
                <button>완료</button>
              </div>
            </div>
          </div>
          <div className="pb-[20px]">{
						recordData?.map((item: recordDataType, index) => (
							<div className="flex justify-between px-[20px] h-[30px]" key={index}>
								<button className="w-[28px]">{index + 1}</button>
								<Input className="w-[40px] px-[4px] text-center" type="text"
											 onChange={(e) => onChangeWeight(e, index)} defaultValue={item.weight} maxLength={3}/>
								<Input className="w-[40px] px-[4px] text-center" type="text"
											 onChange={(e) => onChangeReps(e, index)} defaultValue={item.reps} maxLength={3}/>
								<button className="w-[28px]"
												onClick={() => onChangeStatus(index)}>{item.status ? "O" : "X"}</button>
							</div>
						))}
          </div>
          <div className="flex space-x-2">
            <button className="w-1/2 h-8 bg-primary rounded-[8px]"
                    onClick={() => changeRecords("add")}>세트추가
            </button>
            <button className="w-1/2 h-8 bg-primary rounded-[8px]"
                    onClick={() => changeRecords("remove")}>세트삭제
            </button>
          </div>
        </div>
			}
		</div>
	);
}
