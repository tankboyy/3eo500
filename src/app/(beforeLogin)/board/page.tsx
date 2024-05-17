import BoardList from "@/components/board/BoardList";

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


export default async function Page() {
	const postsData = await getPosts();
	return (
		<main>
			<BoardList postsData={postsData}/>
		</main>
	);
}
