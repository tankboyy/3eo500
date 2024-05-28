
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {checkAuth} from "@/hooks/useCheckAuth";

export default async function layout({children}: {
	children: React.ReactNode
}) {

	const {isAuthenticated} = await checkAuth();

	if (isAuthenticated) {
		redirect("/main");
	}

	return (
		<>{children}</>
	);
}
