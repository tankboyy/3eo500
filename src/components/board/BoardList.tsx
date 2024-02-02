'use client';

import {useEffect, useState} from "react";
import Image from "next/image";
import 'moment/locale/ko';
import moment from "moment";


export default function BoardList() {
	const [boardList, setBoardList] = useState<any[]>();
	useEffect(() => {
		fetch("/api/board/write")
			.then(async (res) => {
				const data = await res.json();
				console.log(data.boardList);
				setBoardList(data.boardList);
			});
	}, []);
	return (
		<div className="dark h-full bg-gray-900 text-white">

			<header className="flex items-center justify-between px-6 py-4">
				<h1 className="text-2xl font-bold">자유 게시판</h1>
				<button className="text-gray-400 hover:text-white">
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
			</header>
			<main className="px-6 py-4 space-y-4">
				{boardList?.map((board) => (
					<article className="border rounded-lg p-4 bg-gray-800 w-full" key={board}>
						<div className="flex space-x-4">
							<div className={`${board.isImage ? "w-2/3" : "w-full"}`}>
								<h2 className="text-xl font-bold">{board.title}</h2>

								<p className="text-gray-400">Posted by User1 | {moment(new Date(board.createAt)).fromNow()}</p>
								<div className="flex">
									<p className={`line-clamp-3 ...`}>
										{board.data}
									</p>
								</div>
							</div>
							{board.isImage &&
                <div className="w-1/3">
									{/*<Image src={board.isImage} alt="image1" fill/>*/}
                  <Image src={board.isImage[1]} alt={'asdff'}
										// width={40} height={40}
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