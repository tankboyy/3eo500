import PageLayout from "@/components/PageLayout";


export default async function layout({children}: {
																			 children: React.ReactNode;
																		 }
) {

	return (
		<PageLayout>
			{children}
		</PageLayout>
	);

}
