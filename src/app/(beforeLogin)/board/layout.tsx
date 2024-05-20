import TopLayout from "@/components/after/TopLayout";

export default function RootLayout({
																		 children,
																	 }: {
	children: React.ReactNode
}) {
	return (
		<div className="flex justify-center flex-col">
			{children}
		</div>
	);
}
