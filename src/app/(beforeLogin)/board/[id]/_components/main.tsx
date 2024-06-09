'use client';

import moment from "moment";
import {Separator} from "@/components/ui/separator";
import {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import 'moment/locale/ko';
import dayjs from "dayjs";
import {Timestamp} from "@firebase/firestore";
import CommentSection from "@/app/(beforeLogin)/board/[id]/_components/commentSection";
import Image from "next/image";

export default function Main({post, comments}: { post: any, comments?: any }) {
	const [postData, setPostData] = useState(post);
	const [commentsData, setCommentsData] = useState(comments);

	console.log(post);

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
							<div className="text-white stroke-amber-50">
								<Image
									src="/icons/eye.svg"
									alt="view"
									className="stroke-amber-50"
									width={20}
									height={20}
								/>
								{postData.views && postData.views}
							</div>
						</div>
					</div>
				</div>
				<Separator className="my-4"/>
				<div>
					<CommentSection data={commentsData}/>
				</div>
			</article>
		</div>
	);
}
