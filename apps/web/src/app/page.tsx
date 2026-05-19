import Link from "next/link";
import { HomeClient } from "@/components/home-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
			<div className="text-center">
				<h1 className="text-3xl font-bold">School OS</h1>
				<p className="text-muted-foreground mt-2">Monorepo: Next.js, Python API, Rust API</p>
			</div>
			<HomeClient />
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Auth demo</CardTitle>
					<CardDescription>
						Sign in or register. You can switch between Python (FastAPI) and Rust (Axum) APIs on
						login/register and in the dashboard.
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
