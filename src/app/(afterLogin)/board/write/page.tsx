'use client';


import {createElement, useEffect, useMemo, useRef, useState} from "react";
import 'react-quill/dist/quill.snow.css';
import {Button} from "@/components/ui/button";
import AWS from "aws-sdk";
import {Input} from "@/components/ui/input";
import PageLayout from "@/components/PageLayout";
import dynamic from "next/dynamic";
import {postBoard} from "@/app/actions";
import {useFormState} from "react-dom";
import {Quill} from "react-quill";


export default function Page() {
	const [data, setData] = useState("");
	const [title, setTitle] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const quillRef = useRef(null);
	const [errorMessage, dispatch] = useFormState(postBoard, undefined);

	let ReactQuill = isOpen && typeof window === 'object' ? require('react-quill') : () => false;

	useEffect(() => {
		setIsOpen(true);
	}, []);

	const VideoHandler = async () => {
		const a = document.createElement("input");
		a.setAttribute('type', 'file');
		a.setAttribute('accept', "video/mp4,video/mkv, video/x-m4v,video/*");
		a.click();
		a.addEventListener("change", async () => {
			const file = a.files?.[0];
			const url = URL.createObjectURL(file!);

			// @ts-ignore
			const editor = quillRef.current?.getEditor();
			const range = editor.getSelection();


			const iframe = document.createElement('iframe');
			iframe.className = 'ql-video';
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('allowfullscreen', 'true');
			iframe.src = url;

			console.log(iframe.outerHTML);

			setData(prev => prev + `<iframe src=${url} frameborder='0' allowfullscreen='true'></iframe>`);
			// setData((prev) => prev + video.outerHTML);
			//
			// const asd = process.env.NEXT_PUBLIC_CF_URL + 'https://3eo500-bucket.s3.ap-northeast-2.amazonaws.com/video/1719304952714';
			// videoRef.current!.src = asd;
			//
			try {
				if (!file) return;
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
						Key: `video/${name}`,
						Body: file,
						ContentType: file.type
					}
				});
				const url_key = await upload.promise().then((res) => res.Key);
				// @ts-ignore
				const editor = quillRef.current?.getEditor();
				const range = editor.getSelection();
				// @ts-ignore

				videoRef.current!.src = url_key;
				// editor.insertEmbed(range.index, 'video', process.env.NEXT_PUBLIC_CF_URL + url_key);
			} catch (error) {
				console.log(error);
			}
		});

	};

	const ImageHandler = async () => {
		const a = document.createElement("input");
		a.setAttribute('type', 'file');
		a.setAttribute('accept', 'image/*');
		a.click();

		// a.onchange = async () => {
		// 	const file = a.files?.[0];
		// 	const reader = new FileReader();
		// 	reader.onload = (e) => {
		// 		const blogUrl = e.target?.result;
		// 		const editor = quillRef.current?.getEditor();
		// 		const range = editor.getSelection();
		// 		editor.insertEmbed(range.index, 'image', blogUrl);
		// 	};
		// 	reader.readAsDataURL(file!);
		// };
		a.addEventListener("change", async () => {
			const file = a.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					const imgTag = document.createElement('img');
					imgTag.src = process.env.NEXT_PUBLIC_CF_URL + `upload/1705930801068`;
					imgTag.classList.add("w-[100px]", "h-[100px]");
					imgTag.alt = "asdf";
					console.log(imgTag);
					setData((prev) => prev + imgTag.outerHTML);

				};
				reader.readAsDataURL(file);
			}
			// const quill = document.querySelector('.ql-editor');
			// // quill?.querySelector('iframe')?.parentElement?.appendChild(handle);
			// const img = quill?.querySelector('img');
			// console.log(img?.style.width, img?.style.height);
			// img?.classList.add("w-[100px]", "h-[100px]", "object-cover", `hover:w-[${img.style.width}px]`, `hover:h-[${img.style.height}px]`, 'duration-300');
			// img?.addEventListener('click', () => {
			// 	console.log('click');
			// });
			// console.log(quill);


			// try {
			// 	const name = Date.now();
			// 	const config = {
			// 		region: process.env.NEXT_PUBLIC_REGION,
			// 		accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
			// 		secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY
			// 	};
			// 	AWS.config.update(config);
			// 	const upload = new AWS.S3.ManagedUpload({
			// 		params: {
			// 			ACL: 'public-read',
			// 			Bucket: "3eo500-bucket",
			// 			Key: `upload/${name}`,
			// 			Body: file,
			// 		}
			// 	});
			// 	const url_key = await upload.promise().then((res) => res.Key);
			// 	// @ts-ignore
			// 	const editor = quillRef.current?.getEditor();
			// 	const range = editor.getSelection();
			// 	editor.insertEmbed(range.index, 'image', process.env.NEXT_PUBLIC_CF_URL + url_key);
			// } catch (error) {
			// 	console.log(error);
			// }
		});
	};

	const modules = useMemo(() => {
		return {
			toolbar: {

				container: [
					["image"],
					["video"],
					[{header: [1, 2, 3, 4, 5, false]}],
					["bold", "underline"],
				],
				handlers: {
					image: ImageHandler,
					video: VideoHandler,
				}
			},
		};
	}, []);

	async function handleSubmit() {
		const uid = localStorage.getItem("uid");
		fetch('/api/board/write', {
			method: "POST",
			body: JSON.stringify({
				title,
				data,
				uid
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(async (res) => {
				console.log(await res.json());
			});
	}


	let videoRef = useRef(null);
	return (
		<PageLayout className="gap-0">

			{

				!!ReactQuill && isOpen &&
        <form action={dispatch}>

          <div className="flex w-full space-x-2 pb-[10px]">
            <button onClick={() => {

							console.log(data);
							// const asd = process.env.NEXT_PUBLIC_CF_URL + 'video/1719305333030';
							// setData(prev => prev + `<iframe src=${asd} frameborder='0' allowfullscreen='true'></iframe>`);

							const quill = document.querySelector('.ql-editor');
							// quill?.querySelector('iframe')?.parentElement?.appendChild(handle);
							// const img = quill?.querySelector('img');
							// console.log(img?.style.width, img?.style.height);
							// img?.classList.add("w-[100px]", "h-[100px]", "object-cover", `hover:w-[${img.style.width}px]`, `hover:h-[${img.style.height}px]`, 'duration-300');
							// img?.addEventListener('click', () => {
							// 	console.log('click');
							// });
							// console.log(quill);

							// const createHandles = (img) => {
							// 	const handle = document.createElement('div');
							// 	handle.classList.add('w-2.5', 'h-2.5', 'bg-blue-500', 'absolute', 'bottom-0', 'right-0', 'cursor-nwse-resize');
							// 	// handle.addEventListener('mousedown', handleMouseDown);
							// 	img.classList.add('relative');
							// 	img.parentElement.classList.add('relative'); // Ensure the parent is positioned relative
							// 	img.parentElement.appendChild(handle);
							// };
							// createHandles(img!);
							// quillRef.current?.getEditor().insertEmbed(0, 'video', asd);


							// videoRef.current!.src = asd;
							// console.log(quillRef.current?.getEditor());
							// const delta = [
							// 	{
							// 		insert: {
							// 			video: "blob:http://localhost:3000/451df8f1-313b-43d0-8056-6b5a752e150b"
							// 		},
							// 		attributes: {
							// 			width: '200',
							// 			height: '200'
							// 		}
							// 	},
							// ];
						}}>asd
            </button>
            <Input placeholder="제목을 입력해주세요." name="title"/>
            <Button type="submit">
              작성완료
            </Button>
          </div>
          <ReactQuill
            ref={quillRef} theme="snow" value={data} name="data" onChange={setData}
            className="w-full h-full [&_.ql-editor]:min-h-[300px]"
            modules={modules}/>
        </form>
			}
			{/*<img src={process.env.NEXT_PUBLIC_CF_URL + `upload/1705930801068`}*/}
			{/*	// className="cursor-pointer hover:w-[700px] hover:h-[800px] duration-300"*/}
			{/*		 alt="asdf"/>*/}


		</PageLayout>
	);
}






