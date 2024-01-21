'use client';

import React, {useEffect, useState} from "react";
import {partNames, weightList} from "@/utils/weightList";
import {AddRecordType, useAddRecord} from "@/hooks/useAddRecord";
import {useRecoilValue} from "recoil";
import {selectDateState} from "@/recoil/atoms";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {useGetRecord} from "@/hooks/record.hooks";
import {useQueryClient} from "react-query";
import {Input} from "@/components/ui/input";

const _ = require("lodash");


export type recordDataType = { reps: number; weight: number; status: boolean };


export default function RecordWeight() {
	const [selectPart, setSelectPart] = useState("");
	const [recordName, setRecordName] = useState("");
	const [recordDatas, setRecordDatas] = useState<recordDataType[]>([{
		reps: 0,
		weight: 0,
		status: false
	}]);


	const queryClient = useQueryClient();
	const selectDate = useRecoilValue(selectDateState);

	useEffect(() => {
		setRecordDatas([{
			reps: 0,
			weight: 0,
			status: false
		}]);
	}, [selectPart, recordName]);

	useEffect(() => {
		if (recordName) {
			const data = queryClient.getQueryData<any>('record');
			if (data[selectDate]) {
				const recordData = data[selectDate][recordName];
				if (recordData) {
					setRecordDatas(recordData);
				}
			}
		}
	}, [recordName]);


	const onChangePart = (name: string) => {
		setSelectPart(name);
		setRecordName("");
	};

	const onChangeWeight: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		setRecordDatas(prev => {
			const data = [...prev];
			data[index].weight = Number(e.target.value);
			return data;
		});
	};

	const onChangeReps: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		setRecordDatas(prev => {
			const data = [...prev];
			data[index].reps = Number(e.target.value);
			return data;
		});
	};

	const onChangeStatus: (index: number) => void = (index: number) => {
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
			if (recordDatas.length === 12) return;
			setRecordDatas(prev => {
				return [...prev, {
					reps: 0,
					weight: 0,
					status: false
				}];
			});
		} else if (action === "remove") {
			if (recordDatas.length === 0) return;
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

	function onClosed() {
		const compareArr = [{
			reps: 0,
			weight: 0,
			status: false
		}];
		if (recordName && selectPart && !(_.isEqual(recordDatas, compareArr))) onSaveRecord();
	}

	// ;
	return (
		<div id="component">
			<Drawer onClose={onClosed}>
				<DrawerTrigger>
					<Button className="text-[11px]">기록 추가하기</Button>
				</DrawerTrigger>
				<DrawerContent className="max-h-[620px] min-h-[276px]">
					<DrawerHeader>
						<ToggleGroup className="border w-auto" type="single" onValueChange={(value) => {
							if (value) onChangePart(value);
						}}>
							{partNames.map((item, index) => {
								return (
									<ToggleGroupItem className="text-[12px]" value={item} key={index}>
										{item}
									</ToggleGroupItem>);
							})}
						</ToggleGroup>
					</DrawerHeader>
					<div className="flex justify-center h-auto px-[18px]">
						{selectPart && !recordName ?
							<ScrollArea className="w-96 rounded-md max-h-[150px] h-auto border mb-[40px]">
								<div>
									{weightList[selectPart].map(item => {
										return (
											<div className="flex items-center" key={item}>
												<button key={item}
																onClick={() => setRecordName(item)}
																className={`rounded-[10px] text-center text-[16px] h-[28px] w-full ${item === recordName && "bg-indigo-200"}`}>
													{item}
												</button>
											</div>
										);
									})}
								</div>
								<ScrollBar orientation="vertical"/>
							</ScrollArea> :
							<div className="w-full">
								{recordName &&
                  <div className="w-full flex flex-col justify-between p-[20px]">
                    <div>
                      <div className="flex justify-between border-b-2 w-full pb-2 mb-6 px-[6px]">
                        <span>{`${selectPart} | ${recordName}`}</span>
                        <div>
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
                    <div className="pb-[20px]">{
											recordDatas?.map((item: recordDataType, index) => (
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
						}
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
}