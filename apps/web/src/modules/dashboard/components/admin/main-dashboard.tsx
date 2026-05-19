import "./admin-dashboard.css";
import { AdminHeader, AdminWelcome } from "./admin-header";
import { AdminRevenueBreakdown } from "./admin-revenue-breakdown";
import { AdminSalesTrend } from "./admin-sales-trend";
import { AdminSidebar } from "./admin-sidebar";
import { AdminStatsCards } from "./admin-stats";
import { AdminTransactions } from "./admin-transactions";

const MainDashboard = () => {
	return (
		<div className="admin-shell">
			<AdminSidebar />
			<div className="admin-main">
				<AdminHeader />
				<div className="admin-content">
					<AdminWelcome />
					<AdminStatsCards />
					<div className="admin-charts-row">
						<AdminSalesTrend />
						<AdminRevenueBreakdown />
					</div>
					<AdminTransactions />
				</div>
			</div>
		</div>
	);
};

export default MainDashboard;
