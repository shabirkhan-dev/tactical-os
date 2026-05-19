"use client";

const revenueBarData = [
	65, 80, 45, 92, 70, 55, 88, 60, 75, 50, 85, 40, 72, 58, 90, 48, 68, 82, 55, 78, 42, 95, 62, 70,
	53, 88, 45, 76, 60, 85,
];

const revenueXLabels = [
	"1 JAN",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"30 JAN 2025",
];

const InfoIcon = () => (
	<svg
		className="info-icon"
		width="14"
		height="14"
		viewBox="0 0 14 14"
		fill="none"
		aria-label="icon"
		role="img"
	>
		<circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
		<path d="M7 6V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
		<circle cx="7" cy="4.5" r="0.5" fill="currentColor" />
	</svg>
);

const SparkleIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path
			d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z"
			stroke="currentColor"
			strokeWidth="1.2"
			strokeLinejoin="round"
		/>
	</svg>
);

const ChevronDownSmall = () => (
	<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-label="icon" role="img">
		<path
			d="M2.5 3.5L5 6.5L7.5 3.5"
			stroke="currentColor"
			strokeWidth="1.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export function AdminRevenueBreakdown() {
	return (
		<div className="admin-chart-card admin-revenue-breakdown">
			<div className="admin-chart-card-header">
				<div className="admin-chart-title">
					REVENUE BREAKDOWN <InfoIcon />
				</div>
			</div>

			<div className="admin-revenue-category">
				<span>Revenue by Category</span>
				<span className="admin-revenue-date-range">
					Jan 1 - Aug 30 <ChevronDownSmall />
				</span>
			</div>

			<div className="admin-revenue-big-value">$20,320</div>

			<button className="admin-ai-insight-btn" type="button">
				<span className="sparkle">
					<SparkleIcon />
				</span>
				Get AI Insight for better analysis
			</button>

			{/* Revenue bar chart */}
			<div className="admin-revenue-chart-area">
				{revenueBarData.map((value, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: static array
						key={i}
						className="admin-revenue-bar"
						style={{ height: `${(value / 100) * 100}%` }}
					/>
				))}
			</div>

			<div className="admin-revenue-x-labels">
				{revenueXLabels.map((label, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: static array
					<span key={i} className="admin-revenue-x-label">
						{label}
					</span>
				))}
			</div>
		</div>
	);
}
