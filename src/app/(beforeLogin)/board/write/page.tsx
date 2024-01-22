'use client';

import ReactQuill from "react-quill";
import {useMemo, useRef, useState} from "react";
import 'react-quill/dist/quill.snow.css';
import {Button} from "@/components/ui/button";
import AWS from "aws-sdk";

export default function Page() {
	const [value, setValue] = useState("");
	const quillRef = useRef(null);

	const ImageHandler = async () => {
		const a = document.createElement("input");
		a.setAttribute('type', 'file');
		a.setAttribute('accept', 'image/*');
		a.click();
		a.addEventListener("change", async () => {
			const file = a.files?.[0];
			try {
				const name = Date.now();
				const config = {
					region: process.env.NEXT_PUBLIC_REGION,
					accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
					secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY
				};
				AWS.config.update(config);
				const upload = new AWS.S3.ManagedUpload({
					params: {
						ACL: 'public-read',
						Bucket: "3eo500-bucket",
						Key: `upload/${name}`,
						Body: file,
					}
				});
				const url_key = await upload.promise().then((res) => res.Key);
				console.log(process.env.NEXT_PUBLIC_CF_URL, url_key);
				const editor = quillRef.current?.getEditor();
				const range = editor.getSelection();
				editor.insertEmbed(range.index, 'image', process.env.NEXT_PUBLIC_CF_URL + url_key);
				console.log(editor);
			} catch (error) {
				console.log(error);
			}
		});
	};

	const modules = useMemo(() => {
		return {
			toolbar: {
				container: [
					["image"],
					[{header: [1, 2, 3, 4, 5, false]}],
					["bold", "underline"],
				],
				handlers: {
					image: ImageHandler
				}
			},
		};
	}, []);
	return (
		<main>
			<div>
				<Button onClick={() => console.log(value)}>
					작성완료
				</Button>
			</div>
			<ReactQuill ref={quillRef} theme="snow" value={value} onChange={setValue} className="h-[400px] w-full"
									modules={modules}/>
		</main>
	);
}