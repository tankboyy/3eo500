'use client';

import {useState} from "react";
import {partNames, weightList} from "@/utils/weightList";
import {app, db} from "@/firebase";
import dayjs from "dayjs";
import {doc, getDoc, updateDoc} from "@firebase/firestore";


export type recordDataType = { reps: number; sets: number; weight: number; status: boolean };


export default function RecordWeight() {
	const [weightData, setWeightData] = useState();
	const [open, setOpen] = useState(false);

	const [selectPart, setSelectPart] = useState("");
	const [recordName, setRecordName] = useState("");

	const [recordDatas, setRecordDatas] = useState<recordDataType[]>([{
		reps: 0,
		sets: 0,
		weight: 0,
		status: false
	}]);

	const onChangePart = (name: string) => {
		setSelectPart(name);
		setRecordName("");
	};

	async function setRecord() {
		const uid = window.localStorage.getItem('uid');
		if (!uid) return;
		const Ref = doc(db, "record", uid);
		const docSnap = await getDoc(Ref);

		if (docSnap.exists()) {
			const data = docSnap.data();
			const nowDate = dayjs().format('YYYY-MM-DD');
			console.log(nowDate);
			if (data[nowDate]) {
				await updateDoc(Ref, {
					[nowDate]: {
						...data[nowDate],
						[recordName]: recordDatas
					}
				});
			} else {
				await updateDoc(Ref, {
					[nowDate]: {
						[recordName]: recordDatas
					}
				});
			}
		}
	}

	function removeSelection() {
		setRecordName("");
	}

	const changeRecords = (action: string) => {
		if (action === "add") {
			setRecordDatas(prev => {
				return [...prev, {
					reps: 0,
					sets: 0,
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

	return (
		<div>
			{!weightData && !open && <div className="flex flex-col text-[13px]">
        <button className="bg-blue-400 rounded-[5px] text-white text-[11px] h-[24px] w-[100px]"
                onClick={() => setOpen(true)}>
          기록 추가하기
        </button>
      </div>}
			{
				open &&
        <div>
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
											<div className="flex">
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
                          <div className="flex justify-between border-b-2 w-full pb-2 mb-6">
                            <span>{`${selectPart} | ${recordName}`}</span>
                            <div>
                              <button onClick={setRecord}>저장하기</button>
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
															<div className="flex justify-between px-[20px] h-[30px]">
																<button className="w-[28px]">{index + 1}</button>
																<input className="w-[40px] text-center" type="text" defaultValue={0} maxLength={3}/>
																<input className="w-[40px] text-center" type="text" defaultValue={0} maxLength={3}/>
																<button className="w-[28px]">{item.status ? "O" : "X"}</button>
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
        </div>
			}
		</div>
	);
}