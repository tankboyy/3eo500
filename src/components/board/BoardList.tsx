'use client';

import {DetailedHTMLProps, HTMLAttributes, MouseEventHandler, useEffect, useState} from "react";
import Image from "next/image";
import 'moment/locale/ko';
import moment from "moment";
import {apiBoardType} from "@/utils/types";
import {useRouter} from "next/navigation";
import {useGetPosts} from "@/hooks/post.hooks";


export default function BoardList() {
	const router = useRouter();
	const {data, refetch} = useGetPosts();

	if (!data) return (
		<>
			loading...
		</>
	);

	function onClickBoard(board: apiBoardType) {
		router.push(`/board/${board.uid}`);
	}

	return (
		<div className="h-full">
			<header className="flex items-center justify-between px-6 py-4">
				<button className="text-gray-400 hover:text-white" onClick={() => {
					refetch();
					console.log(data, 'z');
				}}>
					<svg
						className="h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/>
					</svg>
				</button>
				<h1 className="text-2xl font-bold">자유 게시판</h1>
			</header>
			<main className="px-6 py-4 space-y-4">
				{data.boardList?.map((board: apiBoardType) => (
					<article className="border rounded-lg p-4 bg-gray-800 w-full" key={board.id}>
						<div className="flex space-x-4" onClick={() => onClickBoard(board)}>
							<div className={`${board.isImage ? "w-2/3" : "w-full"}`}>
								<h2 className="text-xl font-bold">{board.title}</h2>
								<p className="text-gray-400">{board.nick ? board.nick : board.uid} 님
									| {moment(new Date(board.createAt)).fromNow()}</p>
								<div className="flex">
									<p className={`line-clamp-3 ...`}>
										{board.data}
									</p>
								</div>
							</div>
							{board.isImage &&
                <div className="w-1/3">
                  <Image src={board.isImage[1]} alt={'asdff'}
                         width={40} height={40}
                         layout="responsive"
                  />
                </div>
							}
						</div>
					</article>
				))}
			</main>
		</div>
	);
}