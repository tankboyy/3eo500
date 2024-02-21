'use client';

import {usePathname, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import moment from "moment/moment";
import Image from "next/image";
import {useQueryClient} from "@tanstack/react-query";
import {useRecoilValue} from "recoil";
import {selectPostState} from "@/recoil/atoms";


export default function Page() {
	const pathName = usePathname();
	const queryClient = useQueryClient();
	const getPostData = useRecoilValue(selectPostState);

	const [postData, setPostData] = useState(getPostData);


	const postId = pathName.split("/board/")[1];


	useEffect(() => {
		if (Object.keys(getPostData).length === 0) {
			(async () => {
				await fetch(`/api/board/${postId}`, {}).then(async (res) => {
					const {postData} = await res.json();
					setPostData(postData);
				});
			})();
		}
	}, []);


	return (
		<main>
			<article className="border rounded-lg p-4 bg-gray-800 w-full hover:bg-gray-600">
				<div className="flex space-x-4">
					<div className={"w-full"}>
						<h2 className="text-xl font-bold">{postData.title}</h2>
						<p className="text-gray-400">{postData.nick ? postData.nick : postData.uid} 님
							| {moment(new Date(postData.createAt)).fromNow()}</p>
						<div className="flex">
							<p className={``} dangerouslySetInnerHTML={{__html: postData.data}}>
							</p>
						</div>
					</div>
				</div>
			</article>
		</main>
	);
}