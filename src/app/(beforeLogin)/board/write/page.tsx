'use client';

import ReactQuill from "react-quill";
import {useState} from "react";
import 'react-quill/dist/quill.snow.css';
import {Button} from "@/components/ui/button";

export default function Page() {
	const [value, setValue] = useState("");
	const modules = {
		toolbar: {
			container: [
				["image"],
				[{header: [1, 2, 3, 4, 5, false]}],
				["bold", "underline"],
			],
		},
	};
	return (
		<main>
			<div>
				<Button onClick={() => console.log(value)}>
					작성완료
				</Button>
			</div>
			<ReactQuill theme="snow" value={value} onChange={setValue} className="h-[400px] w-full" modules={modules}/>
		</main>
	);
}