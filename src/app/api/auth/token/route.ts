import useGetUid from "@/hooks/server/useGetUid";

export async function POST(request: Request) {
	const {accessToken} = await request.json().then((data: { accessToken: string }) => data);
	const data = await useGetUid(accessToken);
	return Response.json({data: data});
}
