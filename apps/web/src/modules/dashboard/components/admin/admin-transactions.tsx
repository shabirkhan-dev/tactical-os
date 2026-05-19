"use client";

type Transaction = {
	id: string;
	customer: string;
	product: string;
	status: "Success" | "Pending" | "Refunded";
	qty: number;
	unitPrice: string;
	totalRevenue: string;
};

const transactions: Transaction[] = [
	{
		id: "#04910",
		customer: "Ryan Korsgaard",
		product: "Ergo Office Chair",
		status: "Success",
		qty: 12,
		unitPrice: "$3,450",
		totalRevenue: "$41,400",
	},
	{
		id: "#04911",
		customer: "Madelyn Lubin",
		product: "Sunset Desk 02",
		status: "Success",
		qty: 20,
		unitPrice: "$2,980",
		totalRevenue: "$89,200",
	},
	{
		id: "#04912",
		customer: "Abram Bergson",
		product: "Eco Bookshelf",
		status: "Pending",
		qty: 22,
		unitPrice: "$1,750",
		totalRevenue: "$75,900",
	},
	{
		id: "#04913",
		customer: "Phillip Mango",
		product: "Green Leaf Desk",
		status: "Refunded",
		qty: 24,
		unitPrice: "$1,950",
		totalRevenue: "$19,500",
	},
];

const SearchIcon = () => (
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-label="icon" role="img">
		<circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
		<path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
	</svg>
);

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

const PlusIcon = () => (
	<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-label="icon" role="img">
		<path d="M6 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const SortIcon = () => <span className="sort-icon">⇅</span>;

function statusClass(status: Transaction["status"]) {
	if (status === "Success") return "success";
	if (status === "Pending") return "pending";
	return "refunded";
}

export function AdminTransactions() {
	return (
		<div className="admin-transactions">
			<div className="admin-transactions-header">
				<div className="admin-transactions-title">
					RECENT TRANSACTIONS <InfoIcon />
				</div>
				<div className="admin-transactions-actions">
					<div className="admin-transactions-search">
						<SearchIcon />
						<input type="text" placeholder="Search transactions..." readOnly />
					</div>
					<button className="admin-add-transaction-btn" type="button">
						<PlusIcon />
						Add Transaction
					</button>
				</div>
			</div>

			<table className="admin-table">
				<thead>
					<tr>
						<th>
							ID <SortIcon />
						</th>
						<th>
							CUSTOMER <SortIcon />
						</th>
						<th>
							PRODUCT <SortIcon />
						</th>
						<th>
							STATUS <SortIcon />
						</th>
						<th>
							QTY <SortIcon />
						</th>
						<th>
							UNIT PRICE <SortIcon />
						</th>
						<th>
							TOTAL REVENUE <SortIcon />
						</th>
						<th>ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((tx) => (
						<tr key={tx.id}>
							<td style={{ color: "var(--admin-text-muted)" }}>{tx.id}</td>
							<td>{tx.customer}</td>
							<td>{tx.product}</td>
							<td>
								<span className={`admin-status-badge ${statusClass(tx.status)}`}>
									<span className="status-dot" />
									{tx.status}
								</span>
							</td>
							<td>{tx.qty}</td>
							<td className="price">{tx.unitPrice}</td>
							<td className="price">{tx.totalRevenue}</td>
							<td>
								<button className="admin-table-actions-btn" type="button">
									⋯
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
