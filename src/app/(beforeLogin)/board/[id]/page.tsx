'use client';

import {usePathname, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import moment from "moment/moment";
import 'moment/locale/ko';
import {useRecoilValue} from "recoil";
import {selectPostState} from "@/recoil/atoms";


export default function Page() {
	const pathName = usePathname();
	const getPostData = useRecoilValue(selectPostState);
	const [postData, setPostData] = useState(getPostData);
	const postId = pathName.split("/board/")[1];


	useEffect(() => {
		if (Object.keys(getPostData).length === 0) {
			(async () => {
				await fetch(`/api/board/${postId}`, {}).then(async (res) => {
					const {postData} = await res.json();
					setPostData(postData);
					console.log(postData.createAt, new Date(postData.createAt));
				});
			})();
		}
	}, []);


	return (
		<main>
			<article className="border rounded-lg p-4 bg-gray-800 w-full">
				<div className="flex space-x-4">
					<div className={"w-full space-y-2"}>
						<h2 className="text-xl text-center font-bold">{postData.title}</h2>
						<p className="text-gray-400 flex justify-end">
							<em className="hover:text-blue-200 cursor-pointer">
								{postData.nick ? postData.nick : postData.uid}
							</em>
							님
							| {moment(new Date(postData.createAt)).fromNow()}</p>
						<div className="flex p-2">
							<p className={``} dangerouslySetInnerHTML={{__html: postData.data}}>
							</p>
						</div>
					</div>
				</div>
			</article>
		</main>
	);
}