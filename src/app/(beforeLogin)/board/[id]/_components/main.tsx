'use client';

import moment from "moment";
import {Separator} from "@/components/ui/separator";
import {useState} from "react";

export default function Main({post}: { post: any }) {
	const [postData, setPostData] = useState(post);

	return (
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
	);
}
