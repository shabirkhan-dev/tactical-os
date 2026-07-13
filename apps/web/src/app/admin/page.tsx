import { DashboardHeader } from "./_components/dashboard/dashboard-header";
import { RevenueBreakdownCard } from "./_components/dashboard/revenue-breakdown/revenue-breakdown-card";
import { SalesTrendCard } from "./_components/dashboard/sales-trend/sales-trend-card";
import { StatCardsRow } from "./_components/dashboard/stat-cards-row";
import { RecentTransactionsCard } from "./_components/dashboard/transactions/recent-transactions-card";

const AdminPage = () => {
	return (
		<div className="mx-auto w-full max-w-[1600px] space-y-5 px-3 py-4 sm:px-6 sm:py-6 lg:space-y-6 lg:px-8">
			<DashboardHeader />
			<StatCardsRow />
			<div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
				<SalesTrendCard className="xl:col-span-8" />
				<RevenueBreakdownCard className="xl:col-span-4" />
			</div>
			<RecentTransactionsCard />
		</div>
	);
};

export default AdminPage;
