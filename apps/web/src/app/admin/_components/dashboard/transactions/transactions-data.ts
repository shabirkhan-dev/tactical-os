export type TxStatus = "success" | "pending" | "refunded";

export type Transaction = {
	id: string;
	customer: string;
	product: string;
	status: TxStatus;
	qty: number;
	unitPrice: number;
	totalRevenue: number;
};

export const transactions: Transaction[] = [
	{
		id: "#04910",
		customer: "Ryan Korsgaard",
		product: "Ergo Office Chair",
		status: "success",
		qty: 12,
		unitPrice: 3450,
		totalRevenue: 41400,
	},
	{
		id: "#04911",
		customer: "Madelyn Lubin",
		product: "Sunset Desk 02",
		status: "success",
		qty: 20,
		unitPrice: 2980,
		totalRevenue: 89200,
	},
	{
		id: "#04912",
		customer: "Abram Bergson",
		product: "Eco Bookshelf",
		status: "pending",
		qty: 22,
		unitPrice: 1750,
		totalRevenue: 75900,
	},
	{
		id: "#04913",
		customer: "Phillip Mango",
		product: "Green Leaf Desk",
		status: "refunded",
		qty: 24,
		unitPrice: 1950,
		totalRevenue: 19500,
	},
];

export const currency = (n: number) =>
	`$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
