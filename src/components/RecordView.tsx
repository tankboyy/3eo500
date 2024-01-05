import {recordDataType} from "@/components/RecordWeight";
import {useEffect, useState} from "react";
import useGetTodayRecord from "@/hooks/useGetTodayRecord";

type Props = {
	selectName: string;
	selectRecordData: recordDataType[];
	recordData?: {
		[key: string]: {
			reps: number
			weight: number
			status: boolean
		}[]
	};
}

export default function RecordView({selectName, selectRecordData, recordData = useGetTodayRecord()}: Props) {

	const [newRecordData, setNewRecordData] = useState(!recordData ? [{
		reps: 0,
		weight: 0,
		status: false
	}] : recordData[selectName]);

	useEffect(() => {
		console.log("hihi");
		return () => {
			if (selectRecordData !== newRecordData) alert("변경사항이 있습니다.");
			console.log("byebye");

		};
	}, []);

	const changeRecords = (action: string) => {
		if (action === "add") {
			console.log("changeRecords");
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

	return (
		<div className="pb-[20px] flex flex-col p-[20px] w-full">
			<div className=" flex justify-between border-b-2 w-full pb-2 mb-6 px-[6px]">
						<span>
							{selectName}
							{/*//TODO: 수정중 이미지로 변경하기.*/}
							{selectRecordData !== newRecordData && "(수정중)"}
						</span>
				<div>
					<button
						// onClick={onReset}
					>
						X
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
			<div>
				<div className="pb-[20px]">
					{
						newRecordData?.map((item, index) => (
							<div className="flex justify-between px-[20px] h-[30px]">
								<button className="w-[28px]">{index + 1}</button>
								<input className="w-[40px] text-center" type="text" defaultValue={0} maxLength={3}/>
								<input className="w-[40px] text-center" type="text" defaultValue={0} maxLength={3}/>
								<button className="w-[28px]">{item.status ? "O" : "X"}</button>
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