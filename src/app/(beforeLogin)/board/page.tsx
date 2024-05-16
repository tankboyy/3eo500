
import BoardList from "@/components/board/BoardList";
import {Metadata} from "next";

export const dynamic = "force-dynamic"
async function getPosts() {
	return fetch("http://localhost:3000/api/posts", {
		cache: 'no-store',
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({pageParam: ""})
	})
		.then(async (res) => {
			const data = await res.json();
			return data.boardList === "불러올 게시글이 없습니다." ? {boardList: []} : data;
		});
}

export const metadata: Metadata = {
	title: "자유게시판",
	description: "자유게시판입니다.",
};

export default async function Page() {
	const postsData = await getPosts();
	return (
		<main>
			hihi
			{postsData && <h1>자유게시판</h1>}
			{postsData.boardList.map((item: any) =>
				<div key={item.uid}>
					<h2>{item.title}</h2>
				</div>
			)}
			{/*<BoardList/>*/}
		</main>
	);
}
