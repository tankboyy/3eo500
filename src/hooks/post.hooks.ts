import {useQuery} from "@tanstack/react-query";

export const useGetPosts = () => {
	return useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			return fetch("api/board/write").then((res) => res.json());
		}
	});
};