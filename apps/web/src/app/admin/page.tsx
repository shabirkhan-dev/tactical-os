import { DashboardHeader } from "./_components/dashboard/dashboard-header";
import { RevenueBreakdownCard } from "./_components/dashboard/revenue-breakdown/revenue-breakdown-card";
import { SalesTrendCard } from "./_components/dashboard/sales-trend/sales-trend-card";
import { StatCardsRow } from "./_components/dashboard/stat-cards-row";
import { RecentTransactionsCard } from "./_components/dashboard/transactions/recent-transactions-card";

const AdminPage = () => {
	return (
		<div className="space-y-4 px-3 py-4 sm:px-6 sm:py-6">
			<DashboardHeader />
			<StatCardsRow />
			<div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
				<SalesTrendCard className="xl:col-span-2" />
				<RevenueBreakdownCard />
			</div>
			<RecentTransactionsCard />
		</div>
	);
};

export default AdminPage;
