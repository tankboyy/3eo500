import useGetUid from "@/hooks/server/useGetUid";

export async function POST(request: Request) {
	console.log('POST');
	const {accessToken} = await request.json().then((data: { accessToken: string }) => data);
	
	await useGetUid("asd");
	return Response.json({accessToken});
}
