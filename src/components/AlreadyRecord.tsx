import {useEffect, useState} from "react";
import RecordView from "@/components/RecordView";

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
			{!open ?
				<div>
					{Object.keys(recordData).map((key, index) => {
							const data: {
								weight: number;
								reps: number;
								status: boolean
							}[] = recordData[key];

							return (
								<div key={index} onClick={() => {
									setSelectName(key);
									setOpen(true);
								}}>
									{key}
									{data.length}
								</div>
							);
						}
					)}
				</div> :
				<RecordView selectName={selectName}/>
			}
		</main>
	);
}