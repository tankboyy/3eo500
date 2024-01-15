import {useEffect, useState} from "react";
import RecordView from "@/components/RecordView";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";


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
	const [selectName, setSelectName] = useState("");
	const [open, setOpen] = useState(false);


	const onReset = () => {
		setOpen(false);
		setSelectName("");
	};

	useEffect(() => {
		onReset();
	}, [recordData]);


	return (
		<main>
			<Accordion type="single" collapsible className="w-full">
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
										{data.length}
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

		</main>
	);
}