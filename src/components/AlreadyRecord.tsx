import {useEffect, useState} from "react";
import {recordDataType} from "@/components/RecordWeight";
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
	const [selectRecordData, setSelectRecordData] = useState<recordDataType[]>([{
		reps: 0,
		weight: 0,
		status: false
	}]);


	const onReset = () => {
		setOpen(false);
		setSelectName("");
	};

	useEffect(() => {
		onReset();
	}, [recordData]);

	useEffect(() => {
		if (selectName !== "") {
			const data = recordData[selectName];
			if (!data) return;
			setSelectRecordData(data);
		} else setSelectRecordData([{
			reps: 0,
			weight: 0,
			status: false
		}]);

	}, [selectName]);


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
				<RecordView selectRecordData={selectRecordData} selectName={selectName}/>
			}
		</main>
	);
}