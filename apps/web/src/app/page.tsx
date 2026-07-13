import { Button } from "@school-os/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@school-os/ui/components/card";
import Link from "next/link";
import { HomeClient } from "@/components/home-client";

export default function Page() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
			<div className="text-center">
				<h1 className="text-3xl font-bold">School OS</h1>
				<p className="text-muted-foreground mt-2">Next.js web app backed by the NestJS API</p>
			</div>
			<HomeClient />
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Auth</CardTitle>
					<CardDescription>
						Sign in or create an account. Authentication runs against the NestJS API on port 4000.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<Link href="/login">
						<Button className="w-full">Sign in</Button>
					</Link>
					<Link href="/register">
						<Button variant="outline" className="w-full">
							Register
						</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
