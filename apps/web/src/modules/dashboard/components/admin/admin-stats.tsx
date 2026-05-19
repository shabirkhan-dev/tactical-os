"use client";

import { useQuery } from "@tanstack/react-query";

type StatCard = {
	label: string;
	value: string;
	suffix?: string;
	change: string;
	positive: boolean;
	miniBarHeights: number[];
	accentIndex: number;
	activeDot: number;
};

// Simulate an API call
const fetchAdminStats = async (): Promise<StatCard[]> => {
	// Simulated network delay
	await new Promise((resolve) => setTimeout(resolve, 800));

	return [
		{
			label: "Total Revenue",
			value: "$20,320",
			suffix: undefined,
			change: "-0.94",
			positive: false,
			miniBarHeights: [55, 70, 45, 80, 60, 90, 75],
			accentIndex: 5,
			activeDot: 0,
		},
		{
			label: "Total Orders",
			value: "10,320",
			suffix: "Orders",
			change: "+0.94",
			positive: true,
			miniBarHeights: [40, 60, 75, 50, 85, 65, 80],
			accentIndex: 4,
			activeDot: 1,
		},
		{
			label: "New Customers",
			value: "4,305",
			suffix: "New Users",
			change: "+0.94",
			positive: true,
			miniBarHeights: [50, 35, 65, 80, 45, 70, 55],
			accentIndex: 3,
			activeDot: 2,
		},
		{
			label: "Conversion Rate",
			value: "3.9%",
			suffix: undefined,
			change: "-0.94",
			positive: false,
			miniBarHeights: [70, 55, 40, 65, 50, 80, 60],
			accentIndex: 5,
			activeDot: 0,
		},
	];
};

/* Mini bar chart – gray bars with one orange accent vertical line */
function MiniBarChart({ heights, accentIndex }: { heights: number[]; accentIndex: number }) {
	return (
		<div className="admin-stat-mini-chart">
			{heights.map((h, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: Static array
					key={i}
					className={`admin-stat-mini-bar${i === accentIndex ? " accent" : ""}`}
					style={{ "--bar-height": `${(h / 100) * 28}px` } as React.CSSProperties}
				/>
			))}
		</div>
	);
}

/* Small up-arrow icon for the footer */
const ArrowUpIcon = () => (
	<svg
		width="10"
		height="10"
		viewBox="0 0 10 10"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path d="M5 2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
		<path
			d="M2.5 4.5L5 2L7.5 4.5"
			stroke="currentColor"
			strokeWidth="1.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export function AdminStatsCards() {
	const { data: statsData, isLoading } = useQuery({
		queryKey: ["adminStats"],
		queryFn: fetchAdminStats,
	});

	if (isLoading || !statsData) {
		return (
			<div className="admin-stats-grid">
				{[...Array(4)].map((_, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: skeleton
						key={`skeleton-${i}`}
						className="admin-stat-card"
						style={{ height: "140px", opacity: 0.5, background: "var(--admin-surface)" }}
					/>
				))}
			</div>
		);
	}

	return (
		<div className="admin-stats-grid">
			{statsData.map((stat) => (
				<div key={stat.label} className="admin-stat-card">
					<div className="admin-stat-card-inner">
						<div className="admin-stat-card-header">
							<span className="admin-stat-label">{stat.label}</span>
							<MiniBarChart heights={stat.miniBarHeights} accentIndex={stat.accentIndex} />
						</div>
						<div className="admin-stat-value-row">
							<span className="admin-stat-value">{stat.value}</span>
							{stat.suffix && <span className="admin-stat-suffix">{stat.suffix}</span>}
						</div>
					</div>
				</div>
			))}
			<div className="admin-stat-footer">
				<div className="admin-stat-arrow-icon">
					<ArrowUpIcon />
				</div>
				<div className="admin-stat-change positive">
					<span>200%</span>
					<span className="label">last year</span>
				</div>
			</div>
		</div>
	);
}
