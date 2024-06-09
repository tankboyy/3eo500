export default async function POST(request: Request) {
	const {email, password} = await request.json().then((data: { email: string, password: string }) => data);
	// const user = await useLogin(email, password);
	// return Response.json({data: user});
}
