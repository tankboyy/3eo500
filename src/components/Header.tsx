import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";

export default function Header() {
	return (
		<header
			className="h-14 px-5 sticky top-0 z-50 w-full border-b flex justify-between items-center bg-background dark:border-border">
			<div className="flex items-center">
				<MobileNav/>
				<Nav/>
			</div>
		</header>
	);
}
