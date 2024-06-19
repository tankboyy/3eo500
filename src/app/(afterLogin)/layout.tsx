import UseCheckAuth from "@/hooks/auth/useCheckAuth";

export default async function RootLayout({
																					 children,
																				 }: {
	children: React.ReactNode
}) {


	return (

		<div className="flex flex-col justify-center">
			<UseCheckAuth/>
			{children}
		</div>
	);
}


