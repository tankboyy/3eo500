import {getAuth} from "@firebase/auth";

export default async function layout({children}: {
	children: React.ReactNode
}) {

	return (
		<>{children}</>
	);
}
