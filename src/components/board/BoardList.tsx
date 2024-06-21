'use client';

import Image from "next/image";
import 'moment/locale/ko';
import moment from "moment";
import {apiBoardType} from "@/utils/types";
import {useRouter} from "next/navigation";
import {useInfinityPosts} from "@/hooks/querys/post.hooks";
import {useSetRecoilState} from "recoil";
import {selectPostState} from "@/recoil/atoms";
import {useEffect, useRef, useState} from "react";
// @ts-ignore
import {useObserver} from "@/hooks/useObserver";
import {toast} from "sonner";
import Progress from "@/components/progress";
import Link from "next/link";


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


	useObserver({
		target: bottomRef,
		onIntersect: onIntersect,
	});


	return (
		<>
			{boardList?.map((board: apiBoardType) => {
				const content = board.data.replace(/<img\s+[^>]*>/g, '');
				return (
					<Link className="flex py-2 items-start justify-between gap-2"
								key={board.id} href={`/board/${board.id}`}>
						<div className="flex flex-col gap-1 flex-1">
							<span className="font-bold text-lg break-all line-clamp-2">{board.title}</span>
							<span className={`line-clamp-3 ... break-all`} dangerouslySetInnerHTML={{__html: content}}></span>
							<time className="text-gray-400 text-xs mt-1">{board.nick ? board.nick : board.uid} 님
								| {moment(new Date(board.createAt)).fromNow()}</time>
						</div>
						{board.isImage &&
              <Image src={board.isImage[1]} alt={board.isImage[1]}
                     width={150}
                     height={150}
                     className="object-cover w-32 h-24 rounded"
              />
						}
					</Link>
				);
			})}
			<div ref={bottomRef}/>
		</>
	);
}
