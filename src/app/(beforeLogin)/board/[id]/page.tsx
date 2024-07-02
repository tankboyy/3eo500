import {usePathname, useSearchParams} from "next/navigation";
import moment from "moment/moment";
import 'moment/locale/ko';
import {useRecoilValue} from "recoil";
import {selectPostState} from "@/recoil/atoms";
import {apiBoardType} from "@/utils/types";
import {Separator} from "@/components/ui/separator";
import Progress from "@/components/progress";
import Main from "@/app/(beforeLogin)/board/[id]/_components/main";

async function getPostData(postId: string) {
	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/board/${postId}`);
	return response.json();
}

async function getPostComments(postId: string) {
	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/board/${postId}/comment`);
	return response.json();
}

export default async function Page(request: any) {

	const postId = request.params.id;

	const {postData, postComments} = await Promise.all([getPostData(postId), getPostComments(postId)])
		.then((values) => {
			return {postData: values[0], postComments: values[1]};
		});

	return (
		<>
			<Main post={postData.postData} comments={postComments && postComments}/>
		</>
	);
}
