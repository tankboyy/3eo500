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
	const response = await fetch(`http://localhost:3000/api/board/${postId}`);
	return response.json();
}

export default async function Page(request: any) {

	const postId = request.params.id;
	const postData = await getPostData(postId);

	return (
		<>
			<Main post={postData.postData}/>
		</>
	);
}
