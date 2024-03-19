'use client';

import {usePathname, useSearchParams} from "next/navigation";
import {useEffect, useLayoutEffect, useState} from "react";
import moment from "moment/moment";
import 'moment/locale/ko';
import {useRecoilValue} from "recoil";
import {selectPostState} from "@/recoil/atoms";
import {apiBoardType} from "@/utils/types";
import {Separator} from "@/components/ui/separator";


export default function Page() {
	const pathName = usePathname();
	const getPostData = useRecoilValue(selectPostState);
	const [postData, setPostData] = useState<apiBoardType>(getPostData);
	const postId = pathName?.split("/board/")[1];


	useLayoutEffect(() => {
		if (postData.id === "") {
			(async () => {
				await fetch(`/api/board/${postId}`, {}).then(async (res) => {
					const {postData} = await res.json();
					setPostData(postData);
				});
			})();
		}
	}, []);


	if (postData.id === "") return <div>로딩중...</div>;

	return (
		<main>
			<div className="border m-2 rounded-md border-b transition-colors data-[state=selected]:bg-muted w-full">
				<article className="p-4 w-full">
					<div className="flex space-x-4">
						<div className={"w-full space-y-2"}>
							<h2 className="text-xl text-center font-bold">{postData.title}</h2>
							<span className="text-gray-400 flex justify-end">
								<p className="hover:text-blue-200 cursor-pointer">
									{postData.nick ? postData.nick : postData.uid}
								</p>
								님
								| {moment(new Date(postData.createAt)).fromNow()}</span>
							<div className="flex p-2">
								<p className={``} dangerouslySetInnerHTML={{__html: postData.data}}>
								</p>
							</div>
						</div>
					</div>
					<Separator className="my-4"/>
					<div>
						{"댓글 기능은 아직 구현되지 않았습니다."}
					</div>
				</article>
			</div>
		</main>
	);
}
