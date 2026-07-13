import { RequireAuth } from "@/modules/auth/components";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminTopbar } from "./_components/admin-topbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<RequireAuth>
			<div className="flex h-svh overflow-hidden bg-dashboard-bg text-dashboard-text-primary">
				<AdminSidebar className="hidden lg:flex" />
				<div className="flex min-h-0 min-w-0 flex-1 flex-col">
					<AdminTopbar />
					<main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
				</div>
			</div>
		</RequireAuth>
	);
};
export default AdminLayout;
