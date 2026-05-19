"use client";

import { useState } from "react";

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const salesData = [
	{ month: "JAN", newUser: 8, existing: 4 },
	{ month: "FEB", newUser: 12, existing: 5 },
	{ month: "MAR", newUser: 15, existing: 7 },
	{ month: "APR", newUser: 10, existing: 5 },
	{ month: "MAY", newUser: 22, existing: 10 },
	{ month: "JUN", newUser: 38, existing: 18 },
	{ month: "JUL", newUser: 28, existing: 14 },
	{ month: "AUG", newUser: 18, existing: 8 },
	{ month: "SEP", newUser: 14, existing: 6 },
	{ month: "OCT", newUser: 10, existing: 4 },
	{ month: "NOV", newUser: 6, existing: 3 },
	{ month: "DEC", newUser: 4, existing: 2 },
];

const yLabels = ["0k", "10k", "20k", "30k", "40k", "50k", "60k", "70k"];
const maxValue = 70;

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

const MoreIcon = () => (
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-label="icon" role="img">
		<circle cx="3" cy="7" r="1" fill="currentColor" />
		<circle cx="7" cy="7" r="1" fill="currentColor" />
		<circle cx="11" cy="7" r="1" fill="currentColor" />
	</svg>
);

export function AdminSalesTrend() {
	const [activeTab, setActiveTab] = useState("Monthly");
	const [hoveredBar, setHoveredBar] = useState<number | null>(null);

	return (
		<div className="admin-chart-card" style={{ flex: 1 }}>
			{/* Header */}
			<div className="admin-chart-card-header">
				<div className="admin-chart-title">
					SALES TREND <InfoIcon />
				</div>
				<button className="admin-chart-more-btn" type="button">
					<MoreIcon />
				</button>
			</div>

			{/* Sub header */}
			<div className="admin-chart-sub-header">
				<div className="admin-chart-revenue-label">
					<span className="label">Total Revenue:</span>
					<span className="value">$20,320</span>
				</div>

				<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
					<div className="admin-chart-legend">
						<div className="admin-chart-legend-item">
							<span className="admin-chart-legend-dot new-user" />
							NEW USER
						</div>
						<div className="admin-chart-legend-item">
							<span className="admin-chart-legend-dot existing-user" />
							EXISTING USER
						</div>
					</div>

					<div className="admin-chart-toggle">
						{["Weekly", "Monthly", "Yearly"].map((tab) => (
							<button
								key={tab}
								type="button"
								className={activeTab === tab ? "active" : ""}
								onClick={() => setActiveTab(tab)}
							>
								{tab}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Chart */}
			<div className="admin-sales-chart-area">
				{/* Y axis labels */}
				<div className="admin-bar-chart-y-axis">
					{yLabels.map((label) => (
						<span key={label} className="admin-bar-chart-y-label">
							{label}
						</span>
					))}
				</div>

				{/* Grid lines */}
				<div className="admin-bar-chart-grid">
					{yLabels.map((label) => (
						<div key={label} className="admin-bar-chart-grid-line" />
					))}
				</div>

				{/* Bars */}
				<div className="admin-bar-chart">
					{salesData.map((data, index) => {
						const newHeight = (data.newUser / maxValue) * 240;
						const existingHeight = (data.existing / maxValue) * 240;

						return (
							// biome-ignore lint/a11y/useSemanticElements: graph interaction
							<div
								role="button"
								tabIndex={0}
								key={data.month}
								className="admin-bar-group"
								onMouseEnter={() => setHoveredBar(index)}
								onMouseLeave={() => setHoveredBar(null)}
								style={{ cursor: "pointer" }}
							>
								<div className="admin-bar-stack">
									<div className="admin-bar-new" style={{ height: `${newHeight}px` }} />
									<div className="admin-bar-existing" style={{ height: `${existingHeight}px` }} />
								</div>

								{/* Tooltip */}
								{hoveredBar === index && (
									<div
										className="admin-bar-tooltip"
										style={{
											bottom: `${newHeight + existingHeight + 16}px`,
											left: "50%",
											transform: "translateX(-50%)",
										}}
									>
										<div className="admin-bar-tooltip-title">{data.month} 2025</div>
										<div className="admin-bar-tooltip-row">
											<span
												className="admin-bar-tooltip-dot"
												style={{ background: "var(--admin-orange)" }}
											/>
											<span>New User:</span>
											<span className="admin-bar-tooltip-value">{data.newUser}k</span>
										</div>
										<div className="admin-bar-tooltip-row">
											<span
												className="admin-bar-tooltip-dot"
												style={{ background: "var(--admin-text-dim)" }}
											/>
											<span>Existing User:</span>
											<span className="admin-bar-tooltip-value">{data.existing}k</span>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* X axis labels */}
				<div className="admin-bar-x-labels">
					{months.map((m) => (
						<span key={m} className={`admin-bar-x-label${m === "JUN" ? " active" : ""}`}>
							{m}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
