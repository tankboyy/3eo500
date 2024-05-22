import Sign from "@/components/Sign";
import PageLayout from "@/components/PageLayout";
import {checkAuth} from "@/app/(afterLogin)/layout";
import {redirect} from "next/navigation";


export default async function Page() {
	const {isAuthenticated} = await checkAuth();

	if (isAuthenticated) {
		redirect("/main");
	}
	return (
		<PageLayout>
			<Sign/>
		</PageLayout>
	);
}
