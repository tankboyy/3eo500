'use client';

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import moment from "moment/moment";
import {useEffect, useState} from "react";
import useGetUid from "@/hooks/server/useGetUid";

export default function CommentSection({data}: any) {
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {

		console.log(document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1"));
	}, []);
	return (
		<div>
			<div>
				<div className="flex justify-between">
					<h3 className="text-lg font-bold">댓글</h3>
					<div className="flex justify-end">
						<button onClick={() => setIsOpen(!isOpen)} className="text-blue-500">댓글 작성</button>
					</div>
				</div>
				<div
					className={`transition-all p-4 duration-1000 ease-in-out overflow-hidden ${
						isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
					}`}
				>
        <textarea
					className="w-full p-2 mb-2 rounded-lg"
					disabled={true}
					rows={3}
					placeholder={"댓글을 입력하세요...z"}
				></textarea>
					<button className="w-full bg-blue-500 text-white p-2 rounded-lg">
						댓글 작성
					</button>
				</div>
			</div>
			{
				data.data &&
				data.data.map((comment: any, index: number) => (
					<div className={`min-h-20 m-2 ${index !== data.length && "border-b "}`}>
						<div className="flex space-x-2">
							<Avatar className="">
								<AvatarImage src="https://github.com/shadcn.png"/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div>
								<div className="font-bold">
									{comment.userId}
								</div>
								<div className="font-light">
									{"약 " + moment(comment.createAt.seconds * 1000).fromNow()}
								</div>
							</div>
						</div>
						<div className="p-2">
							{comment.data}
						</div>
					</div>
				))
			}
		</div>
	);
}
