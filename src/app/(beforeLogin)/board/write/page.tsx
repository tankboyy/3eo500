'use client';

import ReactQuill from "react-quill";
import {useState} from "react";
import 'react-quill/dist/quill.snow.css';
import {Button} from "@/components/ui/button";
import AWS from "aws-sdk";

export default function Page() {
	const [value, setValue] = useState("");

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
				console.log(a.files, name, config);
				AWS.config.update(config);

				const upload = new AWS.S3.ManagedUpload({
					params: {
						ACL: 'public-read',
						Bucket: "3eo500-bucket",
						Key: `upload/${name}`,
						Body: file,
					}
				});
				const IMG_URL = await upload.promise().then((res) => res.Location);
				console.log(IMG_URL);
			} catch (error) {
				console.log(error);
			}
		});
	};

	const modules = {
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
	return (
		<main>
			<div>
				<Button onClick={() => console.log(value)}>
					작성완료
				</Button>
			</div>
			<ReactQuill theme="snow" value={value} onChange={setValue} className="h-[400px] w-full"
									modules={modules}/>
		</main>
	);
}