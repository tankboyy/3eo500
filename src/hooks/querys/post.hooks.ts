import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {apiBoardType} from "@/utils/types";


type useInfinityPostsType = {
	boardList: apiBoardType[];
}

export const useInfinityPosts = () => {
	return useInfiniteQuery<useInfinityPostsType>({
		queryKey: ["infinityPosts"],
		queryFn: ({pageParam}: any) => useGetPostsAPI({pageParam}),
		initialPageParam: "",
		getNextPageParam: (prevPage, pages) => {
			return prevPage.boardList.length === 0 ? "end" : prevPage.boardList[prevPage.boardList.length - 1].id;
		},
		staleTime: 60000,
		// cacheTime: 60000,


	});
};

export const useGetPostsAPI = async ({pageParam}: { pageParam: string }) => {
	if (pageParam === "end") return {boardList: []};
	return fetch("api/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({pageParam})
	})
		.then(async (res) => {
			const data = await res.json();
			return data.boardList === "불러올 게시글이 없습니다." ? {boardList: []} : data;
		});
};
