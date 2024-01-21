import {Input} from "@/components/ui/input";
import React from "react";
import {recordDataType} from "@/components/RecordWeight";

type Props = {
	item: recordDataType, index: number,
	onChangeReps: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void,
	onChangeStatus: (index: number) => void,
	onChangeWeight: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}
export default function RecordLine({item, index, onChangeWeight, onChangeStatus, onChangeReps}: Props) {
	return (
		<div className="flex justify-between px-[20px] h-[30px]">
			<button className="w-[28px]">{index + 1}</button>
			<Input className="w-[40px] px-[4px] text-center" type="text"
						 onChange={(e) => onChangeWeight(e, index)} defaultValue={item.weight} maxLength={3}/>
			<Input className="w-[40px] px-[4px] text-center" type="text"
						 onChange={(e) => onChangeReps(e, index)} defaultValue={item.reps} maxLength={3}/>
			<button className="w-[28px]"
							onClick={() => onChangeStatus(index)}>{item.status ? "O" : "X"}</button>
		</div>
	);
}