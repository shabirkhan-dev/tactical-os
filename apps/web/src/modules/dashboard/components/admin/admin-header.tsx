"use client";

const SearchIcon = () => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 14 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
		<path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
	</svg>
);

const BellIcon = () => (
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
			d="M4 6C4 3.79 5.79 2 8 2C10.21 2 12 3.79 12 6V9L13 11H3L4 9V6Z"
			stroke="currentColor"
			strokeWidth="1.3"
			strokeLinejoin="round"
		/>
		<path
			d="M6.5 12C6.5 12.83 7.17 13.5 8 13.5C8.83 13.5 9.5 12.83 9.5 12"
			stroke="currentColor"
			strokeWidth="1.3"
		/>
	</svg>
);

const CalendarIcon = () => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 14 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<rect x="1.5" y="2.5" width="11" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
		<path d="M1.5 5.5H12.5" stroke="currentColor" strokeWidth="1.2" />
		<path d="M4.5 1V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
		<path d="M9.5 1V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
	</svg>
);

const DownloadIcon = () => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 14 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path d="M7 2V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
		<path
			d="M4 7L7 10L10 7"
			stroke="currentColor"
			strokeWidth="1.3"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path d="M2 12H12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
	</svg>
);

const ChevronDownSmall = () => (
	<svg
		width="10"
		height="10"
		viewBox="0 0 10 10"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path
			d="M2.5 3.5L5 6.5L7.5 3.5"
			stroke="currentColor"
			strokeWidth="1.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export function AdminHeader() {
	return (
		<header className="admin-header">
			<div className="admin-header-left">
				<span className="breadcrumb-muted">Dashboard</span>
				<span className="breadcrumb-separator">›</span>
				<span className="breadcrumb-active">Overview</span>
			</div>

			<div className="admin-header-right">
				{/* Search */}
				<div className="admin-search">
					<SearchIcon />
					<input type="text" placeholder="Search..." readOnly />
					<div className="admin-search-kbd">
						<kbd>⌘</kbd>
						<kbd>K</kbd>
					</div>
				</div>

				{/* Notification */}
				<button className="admin-header-icon-btn" type="button" aria-label="Notifications">
					<BellIcon />
				</button>

				{/* Avatar */}
				<div className="admin-header-avatar">
					{/* biome-ignore lint/performance/noImgElement: img is sufficient here */}
					<img
						src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
						alt="User"
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
					/>
				</div>
			</div>
		</header>
	);
}

export function AdminWelcome() {
	return (
		<div className="admin-welcome-row">
			<h1>Welcome back, Salung</h1>
			<div className="admin-welcome-actions">
				<button className="admin-btn-outline" type="button">
					Daily <ChevronDownSmall />
				</button>
				<button className="admin-btn-outline" type="button">
					<CalendarIcon />6 Nov 2025
				</button>
				<button className="admin-btn-primary" type="button">
					<DownloadIcon />
					Export CSV
				</button>
			</div>
		</div>
	);
}
