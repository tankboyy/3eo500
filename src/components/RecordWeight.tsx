'use client';

import {useEffect, useState} from "react";
import {partNames, weightList} from "@/utils/weightList";
import {AddRecordType, useAddRecord} from "@/hooks/useAddRecord";
import {useRecoilValue} from "recoil";
import {selectDateState} from "@/recoil/atoms";


export type recordDataType = { reps: number; weight: number; status: boolean };


export default function RecordWeight() {
	const [open, setOpen] = useState(false);
	const [selectPart, setSelectPart] = useState("");
	const [recordName, setRecordName] = useState("");
	const [recordDatas, setRecordDatas] = useState<recordDataType[]>([{
		reps: 0,
		weight: 0,
		status: false
	}]);


	const onChangePart = (name: string) => {
		setSelectPart(name);
		setRecordName("");
	};

	const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		setRecordDatas(prev => {
			const data = [...prev];
			data[index].weight = Number(e.target.value);
			return data;
		});
	};

	const onChangeReps = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		setRecordDatas(prev => {
			const data = [...prev];
			data[index].reps = Number(e.target.value);
			return data;
		});
	};

	const onChangeStatus = (index: number) => {
		setRecordDatas(prev => {
			const data = [...prev];
			data[index].status = !data[index].status;
			return data;
		});
	};


	function removeSelection() {
		setRecordName("");
	}

	const changeRecords = (action: string) => {
		if (action === "add") {
			setRecordDatas(prev => {
				return [...prev, {
					reps: 0,
					weight: 0,
					status: false
				}];
			});
		} else if (action === "remove") {
			setRecordDatas(prev => {
				return prev.slice(0, prev.length - 1);
			});
		}
	};

	const {mutation: addRecord} = useAddRecord();
	const nowDate = useRecoilValue(selectDateState);


	function onSaveRecord() {
		const uid = localStorage.getItem("uid");
		if (!uid) return;
		addRecord.mutate({uid, recordName, selectDate: nowDate, data: recordDatas});
	}

	// ;
	return (
		<div>
			{
				!open ? <button className="bg-blue-400 rounded-[5px] text-white text-[11px] h-[24px] w-[100px]"
												onClick={() => setOpen(true)}>
						기록 추가하기
					</button> :
					<div className="flex space-x-[10px] justify-center items-center">
						<div>
							<div className="pb-[24px] space-x-1">
								{partNames.map(item => {
									return (
										<button key={item}
														onClick={() => onChangePart(item)}
														className={`rounded-[10px] text-white text-[11px] h-[24px] w-[50px] bg-blue-100 ${item === selectPart && "bg-blue-400"}`}>
											{item}
										</button>
									);
								})}
							</div>
							<div className="flex flex-col">
								{selectPart && !recordName ? weightList[selectPart].map(item => {
										return (
											<div className="flex" key={item}>
												<button key={item}
																onClick={() => setRecordName(item)}
																className={`rounded-[10px] text-left text-[18px] h-[32px] w-[200px] ${item === recordName && "bg-indigo-200"}`}>
													{item}
												</button>
											</div>
										);
									}) :
									<div>
										{selectPart && recordName &&
                      <div className="w-full flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between border-b-2 w-full pb-2 mb-6 px-[6px]">
                            <span>{`${selectPart} | ${recordName}`}</span>
                            <div>
                              <button onClick={onSaveRecord
															}>저장하기
                              </button>
                              <button className="hover:bg-red-300 w-[24px] h-[24px] rounded-full"
                                      onClick={removeSelection}>X
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
												{
													<div className="pb-[20px]">{
														recordDatas?.map((item, index) => (
															<div className="flex justify-between px-[20px] h-[30px]" key={index}>
																<button className="w-[28px]">{index + 1}</button>
																<input className="w-[40px] text-center" type="text"
																			 onChange={(e) => onChangeWeight(e, index)} defaultValue={0} maxLength={3}/>
																<input className="w-[40px] text-center" type="text"
																			 onChange={(e) => onChangeReps(e, index)} defaultValue={0} maxLength={3}/>
																<button className="w-[28px]"
																				onClick={() => onChangeStatus(index)}>{item.status ? "O" : "X"}</button>
															</div>
														))}
													</div>
												}
                        <div className="flex space-x-2">
                          <button className="w-1/2 bg-blue-300 h-8 rounded-[8px] hover:bg-blue-500"
                                  onClick={() => changeRecords("add")}>세트추가
                          </button>
                          <button className="w-1/2 bg-blue-300 h-8 rounded-[8px] hover:bg-blue-500"
                                  onClick={() => changeRecords("remove")}>세트삭제
                          </button>
                        </div>
                      </div>
										}
									</div>
								}
							</div>
						</div>
					</div>

			}

		</div>
	);
}