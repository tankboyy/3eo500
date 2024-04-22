'use client';

import React, {useEffect, useState} from "react";
import {partNames, weightList} from "@/utils/weightList";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import RecordView from "@/components/record/RecordView";
import {collection, doc, getDoc, getFirestore, setDoc} from "@firebase/firestore";
import {app, db} from "@/firebase";

const _ = require("lodash");


export type recordDataType = { reps: number; weight: number; status: boolean };


export default function RecordWeight() {
	const [selectPart, setSelectPart] = useState("");
	const [recordName, setRecordName] = useState("");


	const onChangePart = (name: string) => {
		setSelectPart(name);
		setRecordName("");
	};

	const onClose = () => {
		setRecordName("");
		setSelectPart("");
	};


	return (
		<div id="component">
			<Drawer onClose={onClose}>
				<DrawerTrigger>
					<Button className="text-[11px]">기록 추가하기</Button>
				</DrawerTrigger>
				<DrawerContent className="max-h-[620px] min-h-[276px]">
					<DrawerHeader className="border p-0 m-[16px]">
						<ToggleGroup className="w-auto" type="single" onValueChange={(value) => {
							if (value) onChangePart(value);
						}}>
							<ScrollArea className="whitespace-nowrap">
								{partNames.map((item, index) => {
									return (
										<ToggleGroupItem className="text-[12px]" value={item} key={index}>
											{item}
										</ToggleGroupItem>);
								})}
								<ScrollBar orientation="horizontal"/>
							</ScrollArea>
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
							<RecordView recordName={recordName} selectPart={selectPart}/>
						}
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
