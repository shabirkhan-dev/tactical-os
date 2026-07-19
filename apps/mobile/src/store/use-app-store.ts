import { create } from "zustand";

export interface LogEntry {
	id: string;
	title: string;
	subtitle: string;
	value: string;
	date: string;
	delta?: string;
}

interface AppState {
	skincareProducts: LogEntry[];
	exerciseRecords: LogEntry[];
	expensesTransactions: LogEntry[];
	nutritionMeals: LogEntry[];
	mindfulnessJournal: LogEntry[];
	focusTasks: LogEntry[];
	libraryBooks: LogEntry[];

	addEntry: (
		module:
			| "skincare"
			| "exercise"
			| "expenses"
			| "nutrition"
			| "mindfulness"
			| "focus"
			| "library",
		entry: Omit<LogEntry, "id" | "date">,
	) => void;
	deleteEntry: (
		module:
			| "skincare"
			| "exercise"
			| "expenses"
			| "nutrition"
			| "mindfulness"
			| "focus"
			| "library",
		id: string,
	) => void;
}

export const useAppStore = create<AppState>((set) => ({
	skincareProducts: [
		{
			id: "1",
			title: "Hyaluronic Serum",
			subtitle: "CeraVe — Applied daily",
			value: "★ 4.8",
			delta: "Staple",
			date: new Date().toISOString(),
		},
		{
			id: "2",
			title: "Retinol 0.5%",
			subtitle: "The Ordinary — Nightly",
			value: "★ 4.5",
			delta: "Active",
			date: new Date().toISOString(),
		},
	],
	exerciseRecords: [
		{
			id: "1",
			title: "Morning Run",
			subtitle: "Outdoor • 5K",
			value: "28:15",
			delta: "-1:10",
			date: new Date().toISOString(),
		},
	],
	expensesTransactions: [
		{
			id: "1",
			title: "Whole Foods",
			subtitle: "Groceries",
			value: "$78.46",
			delta: "Today",
			date: new Date().toISOString(),
		},
		{
			id: "2",
			title: "Uber",
			subtitle: "Transportation",
			value: "$14.20",
			delta: "Yesterday",
			date: new Date().toISOString(),
		},
	],
	nutritionMeals: [
		{
			id: "1",
			title: "Avocado Toast",
			subtitle: "Breakfast • 2 eggs",
			value: "450 kcal",
			delta: "35g Protein",
			date: new Date().toISOString(),
		},
	],
	mindfulnessJournal: [
		{
			id: "1",
			title: "Morning Pages",
			subtitle: "Brain dump & clarity",
			value: "3 pages",
			delta: "Completed",
			date: new Date().toISOString(),
		},
	],
	focusTasks: [
		{
			id: "1",
			title: "Ship Personal OS",
			subtitle: "Build UI & State",
			value: "Active",
			delta: "High Priority",
			date: new Date().toISOString(),
		},
	],
	libraryBooks: [
		{
			id: "1",
			title: "Atomic Habits",
			subtitle: "James Clear",
			value: "70%",
			delta: "Chapter 12",
			date: new Date().toISOString(),
		},
	],

	addEntry: (module, entry) =>
		set((state) => {
			const newEntry: LogEntry = {
				...entry,
				id: Math.random().toString(36).substring(7),
				date: new Date().toISOString(),
			};

			switch (module) {
				case "skincare":
					return { skincareProducts: [newEntry, ...state.skincareProducts] };
				case "exercise":
					return { exerciseRecords: [newEntry, ...state.exerciseRecords] };
				case "expenses":
					return { expensesTransactions: [newEntry, ...state.expensesTransactions] };
				case "nutrition":
					return { nutritionMeals: [newEntry, ...state.nutritionMeals] };
				case "mindfulness":
					return { mindfulnessJournal: [newEntry, ...state.mindfulnessJournal] };
				case "focus":
					return { focusTasks: [newEntry, ...state.focusTasks] };
				case "library":
					return { libraryBooks: [newEntry, ...state.libraryBooks] };
				default:
					return state;
			}
		}),

	deleteEntry: (module, id) =>
		set((state) => {
			switch (module) {
				case "skincare":
					return { skincareProducts: state.skincareProducts.filter((e) => e.id !== id) };
				case "exercise":
					return { exerciseRecords: state.exerciseRecords.filter((e) => e.id !== id) };
				case "expenses":
					return { expensesTransactions: state.expensesTransactions.filter((e) => e.id !== id) };
				case "nutrition":
					return { nutritionMeals: state.nutritionMeals.filter((e) => e.id !== id) };
				case "mindfulness":
					return { mindfulnessJournal: state.mindfulnessJournal.filter((e) => e.id !== id) };
				case "focus":
					return { focusTasks: state.focusTasks.filter((e) => e.id !== id) };
				case "library":
					return { libraryBooks: state.libraryBooks.filter((e) => e.id !== id) };
				default:
					return state;
			}
		}),
}));
