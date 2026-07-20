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
			title: "Glock 19 Gen 5",
			subtitle: "9mm • Last cleaned 2 days ago",
			value: "★ Ready",
			delta: "Primary",
			date: new Date().toISOString(),
		},
		{
			id: "2",
			title: "AR-15 — Patrol Config",
			subtitle: "5.56 • Bore snake after range",
			value: "★ Ready",
			delta: "Active",
			date: new Date().toISOString(),
		},
	],
	exerciseRecords: [
		{
			id: "1",
			title: "Bill Drill — Stage 3",
			subtitle: "6 rounds • Draw to first shot",
			value: "1.42s",
			delta: "A-Zone",
			date: new Date().toISOString(),
		},
		{
			id: "2",
			title: "El Presidente",
			subtitle: "6 targets • Reload on move",
			value: "8.12s",
			delta: "PASS",
			date: new Date().toISOString(),
		},
	],
	expensesTransactions: [
		{
			id: "1",
			title: "9mm FMJ — 500 rnd",
			subtitle: "Range day allocation",
			value: "500 rnd",
			delta: "Today",
			date: new Date().toISOString(),
		},
		{
			id: "2",
			title: "5.56 NATO — 200 rnd",
			subtitle: "Carbine qualification prep",
			value: "200 rnd",
			delta: "Yesterday",
			date: new Date().toISOString(),
		},
	],
	nutritionMeals: [
		{
			id: "1",
			title: "Range Loadout — Pistol",
			subtitle: "3 mags • Holster • Ears & eyes",
			value: "Packed",
			delta: "Verified",
			date: new Date().toISOString(),
		},
	],
	mindfulnessJournal: [
		{
			id: "1",
			title: "Post-Drill Debrief",
			subtitle: "Grip reset • Trigger prep notes",
			value: "Complete",
			delta: "Filed",
			date: new Date().toISOString(),
		},
	],
	focusTasks: [
		{
			id: "1",
			title: "Qualification Week Prep",
			subtitle: "Dry fire + live fire schedule",
			value: "Active",
			delta: "High Priority",
			date: new Date().toISOString(),
		},
	],
	libraryBooks: [
		{
			id: "1",
			title: "Principles of Personal Defense",
			subtitle: "Jeff Cooper — SOP reference",
			value: "70%",
			delta: "Chapter 8",
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
