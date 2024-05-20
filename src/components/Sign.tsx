import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Login from "@/components/login/login";
import Signup from "@/components/signup/signup";


export default function Sign() {

	return (
		<Tabs defaultValue="login" className="w-[250px]">
			<TabsList className="flex space-x-8">
				<TabsTrigger value="login">로그인</TabsTrigger>
				<TabsTrigger value="signup">회원가입</TabsTrigger>
			</TabsList>
			<TabsContent value="login">
				<Login/>
			</TabsContent>
			<TabsContent value="signup">
				<Signup/>
			</TabsContent>
		</Tabs>
	);
}

