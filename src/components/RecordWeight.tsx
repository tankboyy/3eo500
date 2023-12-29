'use client';

import {useState} from "react";
import {partNames, weightList} from "@/utils/weightList";

export default function RecordWeight() {
	const [weightData, setWeightData] = useState();
	const [open, setOpen] = useState(false);

	const [selectPart, setSelectPart] = useState("");
	console.log(selectPart);
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
            <div className="space-x-1">
							{partNames.map(item => {
								return (
									<button key={item}
													onClick={() => setSelectPart(item)}
													className={`rounded-[10px] text-white text-[11px] h-[24px] w-[50px] bg-blue-100 ${item === selectPart && "bg-blue-400"}`}>
										{item}
									</button>
								);
							})}
            </div>
          </div>
        </div>
			}
		</div>
	);
}