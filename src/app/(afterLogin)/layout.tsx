import TopLayout from "@/components/after/TopLayout";

export default function RootLayout({
																		 children,
																	 }: {
	children: React.ReactNode
}) {
	
	return (
		
		<div className="flex flex-col justify-center">
			<TopLayout after/>
			{children}
		</div>
	);
}
