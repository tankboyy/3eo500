'use client';

import Image from "next/image";
import 'moment/locale/ko';
import moment from "moment";
import {apiBoardType} from "@/utils/types";
import {useRouter} from "next/navigation";
import {useGetPosts, useInfinityPosts} from "@/hooks/post.hooks";
import {useSetRecoilState} from "recoil";
import {selectPostState} from "@/recoil/atoms";
import {useEffect, useRef, useState} from "react";
// @ts-ignore
import {useObserver} from "@/hooks/useObserver";
import {toast} from "sonner";


export default function BoardList() {
	const [boardList, setBoardList] = useState<apiBoardType[]>([]);
	const setPostData = useSetRecoilState(selectPostState);
	const router = useRouter();
	const bottomRef = useRef(null);


	const {
		data,
		fetchNextPage,
	} = useInfinityPosts();


	useEffect(() => {
		if (!data) return;
		setBoardList((prev) => [...prev, ...data.pages[data.pages?.length - 1]?.boardList]);
		console.log(data.pages[data.pages?.length - 1]?.boardList);
		toast.success('게시글을 불러왔습니다.');
	}, [data]);
	const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

	function onClickBoard(board: apiBoardType) {
		setPostData(board);
		router.push(`/board/${board.id}`);
	}

	useObserver({
		target: bottomRef,
		onIntersect: onIntersect,
	});


	return (
		<div className="h-full">
			<header className="flex items-center justify-between px-6 py-4">
				<button className="text-gray-400 w-[30px] h-[30px] relative hover:text-white" onClick={() => {
					console.log(window.scrollY);
				}}>
					<Image src="/icons/reading.svg" alt="돋보기" layout="fill" className="fill-amber-50"/>

				</button>
				<h1 className="text-2xl font-bold">자유 게시판</h1>
			</header>
			<main className="px-6 py-4 space-y-4">
				{boardList?.map((board: apiBoardType) => {

					const content = board.data.replace(/<img\s+[^>]*>/g, '');

					return (
						<article className="border rounded-lg p-4 bg-gray-800 w-full cursor-pointer hover:bg-gray-600"
										 key={board.id}>
							<div className="flex space-x-4" onClick={() => onClickBoard(board)}>
								<div className={`${board.isImage ? "w-2/3" : "w-full"}`}>
									<h2 className="text-xl font-bold">{board.title}</h2>
									<p className="text-gray-400">{board.nick ? board.nick : board.uid} 님
										| {moment(new Date(board.createAt)).fromNow()}</p>
									<div className="flex">
										<p className={`line-clamp-3 ...`} dangerouslySetInnerHTML={{__html: content}}>
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
					);
				})}
				<div ref={bottomRef}/>
			</main>
		</div>
	);
}