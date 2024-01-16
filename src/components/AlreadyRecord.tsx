import {useEffect, useState} from "react";
import RecordView from "@/components/RecordView";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {selectDateState} from "@/recoil/atoms";
import {useRecoilValue} from "recoil";
import {cn} from "@/lib/utils";
import RecordWeight from "@/components/RecordWeight";


interface Props {
	recordData: {
		[key: string]: {
			reps: number
			weight: number
			status: boolean
		}[]
	};
}

export default function AlreadyRecord({recordData}: Props) {

	const selectDate = useRecoilValue(selectDateState);

	return (
		<div id="component">
			<Card className={cn("max-w-[380px] w-full")}>
				<CardHeader>
					<CardTitle>운동 일지</CardTitle>
					<CardDescription>{selectDate}</CardDescription>
				</CardHeader>
				<CardContent>
					<Accordion type="multiple" className="w-full">
						{Object.keys(recordData).map((key, index) => {
								const data: {
									weight: number;
									reps: number;
									status: boolean
								}[] = recordData[key];

								return (
									<div key={index} onClick={() => {
										// setSelectName(key);
										// setOpen(true);
									}}>
										<AccordionItem value={`item-${index}`}>
											<AccordionTrigger>
												{key}
											</AccordionTrigger>
											<AccordionContent>
												<RecordView selectName={key}/>
											</AccordionContent>
										</AccordionItem>
									</div>
								);
							}
						)}
					</Accordion>
				</CardContent>
				<CardFooter>
					<RecordWeight/>
				</CardFooter>
			</Card>


		</div>
	);
}