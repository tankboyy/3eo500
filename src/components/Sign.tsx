import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Login from "@/components/login/login";
import Signup from "@/components/signup/signup";


export default function Sign() {
	return (
		<div id="component" className="flex items-center h-full -translate-y-20">
			<Tabs defaultValue="login" className="w-[250px]">
				<TabsList className="flex space-x-8">
					<TabsTrigger value="login">로그인</TabsTrigger>
					<TabsTrigger value="signup">회원가입</TabsTrigger>
				</TabsList>
				<TabsContent value="login" className="h-[200px]">
					<Login/>
				</TabsContent>
				<TabsContent value="signup" className="h-[200px]">
					<Signup/>
				</TabsContent>
			</Tabs>
		</div>
	);
}