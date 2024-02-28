import {useInfiniteQuery, useQuery} from "@tanstack/react-query";

export const useGetPosts = () => {
	return useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			return fetch("api/board/write").then((res) => res.json());
		}
	});
};


export const useInfinityPosts = (pageId: string) => {
	return useInfiniteQuery({
		queryKey: ["infinityPosts"],
		queryFn: ({pageParam}) => useGetPostsAPI({pageParam}),
		initialPageParam: "",
		getNextPageParam: (prevPage, pages) => {
			return prevPage.boardList[prevPage.boardList.length - 1].id;
		},
		staleTime: 300000,
	});
};

export const useGetPostsAPI = async ({pageParam}: { pageParam: string }) => {
	return fetch("api/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({pageParam})
	})
		.then((res) => res.json());
};