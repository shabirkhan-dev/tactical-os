import { RequireAuth } from "@/modules/auth/components";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminTopbar } from "./_components/admin-topbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<RequireAuth>
			<div className="flex min-h-screen bg-dashboard-bg text-dashboard-text-primary">
				<AdminSidebar />
				<div className="flex min-w-0 flex-1 flex-col">
					<AdminTopbar />
					<main className="flex-1 overflow-y-auto">{children}</main>
				</div>
			</div>
		</RequireAuth>
	);
};
export default AdminLayout;
