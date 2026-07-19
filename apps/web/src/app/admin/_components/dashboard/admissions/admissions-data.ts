export type AdmissionStatus = "enrolled" | "pending" | "waitlisted";

export type Admission = {
	id: string;
	student: string;
	grade: string;
	guardian: string;
	date: string;
	status: AdmissionStatus;
};

export const admissions: Admission[] = [
	{
		id: "#A-2041",
		student: "Amara Okafor",
		grade: "Grade 1",
		guardian: "Chidi Okafor",
		date: "Jul 14, 2026",
		status: "enrolled",
	},
	{
		id: "#A-2042",
		student: "Liam Bennett",
		grade: "Grade 4",
		guardian: "Sarah Bennett",
		date: "Jul 14, 2026",
		status: "pending",
	},
	{
		id: "#A-2043",
		student: "Sofia Reyes",
		grade: "Grade 7",
		guardian: "Miguel Reyes",
		date: "Jul 13, 2026",
		status: "enrolled",
	},
	{
		id: "#A-2044",
		student: "Noah Kim",
		grade: "Grade 2",
		guardian: "Grace Kim",
		date: "Jul 12, 2026",
		status: "waitlisted",
	},
	{
		id: "#A-2045",
		student: "Zara Ahmed",
		grade: "Grade 10",
		guardian: "Imran Ahmed",
		date: "Jul 11, 2026",
		status: "enrolled",
	},
	{
		id: "#A-2046",
		student: "Elias Novak",
		grade: "Grade 5",
		guardian: "Petra Novak",
		date: "Jul 10, 2026",
		status: "pending",
	},
];
