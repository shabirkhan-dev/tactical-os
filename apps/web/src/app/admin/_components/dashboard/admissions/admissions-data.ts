export type SessionStatus = "qualified" | "review" | "running" | "failed";

export type DrillSession = {
	id: string;
	operator: string;
	email: string;
	drillType: string;
	cohort: string;
	instructor: string;
	weapon: string;
	score: string;
	date: string;
	status: SessionStatus;
	range: string;
	note: string;
};

/** @deprecated Use DrillSession — kept for gradual table migration */
export type AdmissionStatus = SessionStatus;
export type Admission = DrillSession & {
	student: string;
	grade: string;
	campus: string;
	guardian: string;
	guardianRelation: string;
	guardianPhone: string;
	source: string;
};

export const drillSessions: DrillSession[] = [
	{
		id: "#D-4412",
		operator: "ALPHA-1 · Mercer",
		email: "mercer@alpha.unit",
		drillType: "CQB qual",
		cohort: "Alpha",
		instructor: "Instructor Hale",
		weapon: "Carbine / red-dot",
		score: "18/20 · 90%",
		date: "Jul 20, 2026",
		status: "qualified",
		range: "Range B",
		note: "Split avg 8% faster than last CQB session",
	},
	{
		id: "#D-4411",
		operator: "ALPHA-2 · Rivera",
		email: "rivera@alpha.unit",
		drillType: "Marksmanship",
		cohort: "Alpha",
		instructor: "Instructor Chen",
		weapon: "Pistol / irons",
		score: "16/20 · 80%",
		date: "Jul 20, 2026",
		status: "review",
		range: "Range A",
		note: "Awaiting instructor sign-off",
	},
	{
		id: "#D-4410",
		operator: "BRAVO-3 · Santos",
		email: "santos@bravo.unit",
		drillType: "Physical",
		cohort: "Bravo",
		instructor: "Instructor Park",
		weapon: "—",
		score: "12:04 course",
		date: "Jul 19, 2026",
		status: "qualified",
		range: "Obstacle course",
		note: "Logged offline · synced 14:22",
	},
	{
		id: "#D-4409",
		operator: "ALPHA-4 · Kim",
		email: "kim@alpha.unit",
		drillType: "Qualification",
		cohort: "Alpha",
		instructor: "Instructor Hale",
		weapon: "Carbine / LPVO",
		score: "—",
		date: "Jul 19, 2026",
		status: "running",
		range: "Range B",
		note: "Timer active on mobile",
	},
	{
		id: "#D-4408",
		operator: "BRAVO-1 · Ahmed",
		email: "ahmed@bravo.unit",
		drillType: "CQB",
		cohort: "Bravo",
		instructor: "Instructor Ortiz",
		weapon: "SMG / holo",
		score: "14/20 · 70%",
		date: "Jul 18, 2026",
		status: "failed",
		range: "Kill house 2",
		note: "Below qual threshold — remedial assigned",
	},
	{
		id: "#D-4407",
		operator: "ALPHA-5 · Novak",
		email: "novak@alpha.unit",
		drillType: "Custom",
		cohort: "Alpha",
		instructor: "Instructor Chen",
		weapon: "Carbine / magnifier",
		score: "19/20 · 95%",
		date: "Jul 18, 2026",
		status: "qualified",
		range: "Range A",
		note: "Optic change logged — accuracy +4%",
	},
];

function toAdmission(row: DrillSession): Admission {
	return {
		...row,
		student: row.operator,
		grade: row.drillType,
		campus: row.cohort,
		guardian: row.instructor,
		guardianRelation: row.range,
		guardianPhone: row.weapon,
		source: row.range,
	};
}

export const admissions: Admission[] = drillSessions.map(toAdmission);

export function sessionSummary(rows: DrillSession[]) {
	return {
		total: rows.length,
		review: rows.filter((r) => r.status === "review").length,
		running: rows.filter((r) => r.status === "running").length,
		qualified: rows.filter((r) => r.status === "qualified").length,
		failed: rows.filter((r) => r.status === "failed").length,
	};
}

export function admissionSummary(rows: Admission[]) {
	return sessionSummary(rows);
}
