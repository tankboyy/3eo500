import MobileNav from "@/components/MobileNav";

export default function Header() {
	return (
		<header
			className="h-14 px-5 sticky top-0 z-50 w-full border-b flex justify-between items-center bg-background">
			<div>
				<MobileNav/>
			</div>
		</header>
	);
}
