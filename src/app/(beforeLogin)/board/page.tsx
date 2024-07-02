import BoardList from "@/components/board/BoardList";
import PageLayout from "@/components/PageLayout";

async function getPosts() {
	return fetch(process.env.NEXT_PUBLIC_API_URL + "/posts", {
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
		<PageLayout
			title="자유 게시판"
		>
			<BoardList postsData={postsData}/>
		</PageLayout>
	);
}
