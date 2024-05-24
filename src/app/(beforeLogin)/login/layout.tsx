import {checkAuth} from "@/app/actions";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export default async function layout({children}: {
	children: React.ReactNode
}) {

	const {isAuthenticated} = await checkAuth();

	if (isAuthenticated) {
		redirect("/main");
	}

	async function Delete() {
		'use server';
		cookies().delete("accessToken");
	}

	Delete();

	return (
		<>{children}</>
	);
}
