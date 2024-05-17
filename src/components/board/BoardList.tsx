'use client';

import Image from "next/image";
import 'moment/locale/ko';
import moment from "moment";
import {apiBoardType} from "@/utils/types";
import {useRouter} from "next/navigation";
import {useInfinityPosts} from "@/hooks/post.hooks";
import {useSetRecoilState} from "recoil";
import {selectPostState} from "@/recoil/atoms";
import {useEffect, useRef, useState} from "react";
// @ts-ignore
import {useObserver} from "@/hooks/useObserver";
import {toast} from "sonner";
import Progress from "@/components/progress";


export default function BoardList({postsData}: { postsData: { boardList: apiBoardType[] } }) {
	const [boardList, setBoardList] = useState<apiBoardType[]>(postsData.boardList);
	const setPostData = useSetRecoilState(selectPostState);
	const router = useRouter();
	const bottomRef = useRef(null);


	const {
		data,
		fetchNextPage,
	} = useInfinityPosts();


	useEffect(() => {
		if (data === undefined) return;
		setBoardList(() => {
			if (data?.pages.map((page) => page.boardList).flat().length !== boardList.length) {
				toast.success('게시글을 불러왔습니다.');
			}
			return data?.pages.map((page) => page.boardList).flat();
		});

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
		<main className="px-6 py-4">
			{!boardList.length ? <Progress/> :
				<div className="border rounded-md w-full">
					<div className="relative w-full overflow-auto">
						<div className="w-full caption-bottom text-sm">
							<div
								className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-center font-bold text-2xl">
								<div>
									자유 게시판
								</div>
							</div>
							<div className="[&_article:last-child]:border-0">
								{boardList?.map((board: apiBoardType) => {
									const content = board.data.replace(/<img\s+[^>]*>/g, '');
									return (
										<div className=" p-4 w-full cursor-pointer
								border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted
								"
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
                          <div className="w-1/3 h-[50px]">
                            <Image src={board.isImage[1]} alt={board.isImage[1]}
                                   style={{
																		 objectFit: "cover",
																		 height: "100%",
																		 width: "100%",
																	 }}
                                   width={100}
                                   height={50}
                                   quality={50}
                            />
                          </div>
												}
											</div>
										</div>
									);
								})}
							</div>

						</div>
					</div>
				</div>
			}
			<div ref={bottomRef}/>
		</main>
	);
}
