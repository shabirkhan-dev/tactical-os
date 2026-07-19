import { RecentAdmissionsCard } from "./_components/dashboard/admissions/recent-admissions-card";
import { DashboardHeader } from "./_components/dashboard/dashboard-header";
import { EnrollmentTrendCard } from "./_components/dashboard/enrollment-trend/enrollment-trend-card";
import { FadeIn } from "./_components/dashboard/fade-in";
import { GradeDistributionCard } from "./_components/dashboard/grade-distribution/grade-distribution-card";
import { StatCardsRow } from "./_components/dashboard/stat-cards-row";

const AdminPage = () => {
	return (
		<div className="mx-auto w-full max-w-[1600px] space-y-5 px-3 py-4 sm:px-6 sm:py-6 lg:space-y-6 lg:px-8">
			<FadeIn>
				<DashboardHeader />
			</FadeIn>
			<FadeIn delay={0.05}>
				<StatCardsRow />
			</FadeIn>
			<div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
				<FadeIn delay={0.1} className="xl:col-span-8">
					<EnrollmentTrendCard />
				</FadeIn>
				<FadeIn delay={0.15} className="xl:col-span-4">
					<GradeDistributionCard />
				</FadeIn>
			</div>
			<FadeIn delay={0.2}>
				<RecentAdmissionsCard />
			</FadeIn>
		</div>
	);
};

export default AdminPage;
