/* ============================================================
   Meeting Desk — Mock Data
   Same client roster as the Report Queue (Anika Rao, Sanjay
   Patel, etc.) so the two surfaces tell one coherent story
   rather than diverging demo data.
   ============================================================ */

export type MeetingType =
  | "Discovery Call"
  | "Financial Blueprint Review"
  | "Proposal Walkthrough"
  | "Annual Plan Review"
  | "Family Wealth Review"
  | "Follow-up Call";

export type MeetingStatus =
  | "needs-prep"
  | "scheduled"
  | "prepped"
  | "rescheduled"
  | "cancelled"
  | "completed"
  | "follow-up-pending";

export type MeetingStageId = "needs-prep" | "upcoming" | "cancelled" | "follow-up" | "completed";

export interface MeetingStage {
  id: MeetingStageId;
  number: number;
  label: string;
  statuses: MeetingStatus[];
  accent: string;
}

export const MEETING_STAGES: MeetingStage[] = [
  { id: "needs-prep", number: 1, label: "Needs Prep", statuses: ["needs-prep"], accent: "var(--color-error-500)" },
  { id: "upcoming", number: 2, label: "Upcoming", statuses: ["scheduled", "prepped", "rescheduled"], accent: "var(--color-success-700)" },
  { id: "cancelled", number: 3, label: "Cancelled", statuses: ["cancelled"], accent: "var(--color-warning-700)" },
  { id: "follow-up", number: 4, label: "Follow-up", statuses: ["follow-up-pending"], accent: "var(--color-brand-600)" },
  { id: "completed", number: 5, label: "Completed", statuses: ["completed"], accent: "var(--color-grey-600)" },
];

export type StatusBadgeColor = "gray" | "brand" | "error" | "warning" | "success" | "gray-blue";

export const STATUS_LABELS: Record<MeetingStatus, string> = {
  "needs-prep": "Needs Prep",
  scheduled: "Scheduled",
  prepped: "Prepped & Ready",
  rescheduled: "Rescheduled",
  cancelled: "Cancelled",
  completed: "Completed",
  "follow-up-pending": "Follow-up Pending",
};

export const STATUS_COLORS: Record<MeetingStatus, StatusBadgeColor> = {
  "needs-prep": "error",
  scheduled: "gray",
  prepped: "success",
  rescheduled: "gray-blue",
  cancelled: "warning",
  completed: "gray",
  "follow-up-pending": "warning",
};

const STATUS_TO_STAGE = new Map<MeetingStatus, MeetingStageId>(
  MEETING_STAGES.flatMap((stage) => stage.statuses.map((status) => [status, stage.id] as const))
);

export function stageForStatus(status: MeetingStatus): MeetingStageId {
  return STATUS_TO_STAGE.get(status) ?? "needs-prep";
}

export type PlanTier = "Gold" | "Platinum" | "Silver";

export interface ActionItem {
  id: string;
  text: string;
  owner: "Advisor" | "Client";
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
}

export interface SuggestedMaterial {
  name: string;
  type: "Video" | "Article" | "Workshop" | "Simulation" | "PDF Guide";
}

export interface MeetingRecord {
  id: string;
  client: { name: string; id: string; plan: PlanTier };
  meetingType: MeetingType;
  date: string;
  dateLabel: string;
  urgency: "urgent" | "soon" | "upcoming" | null;
  duration: string;
  mode: "Video" | "In-person" | "Phone";
  status: MeetingStatus;
  briefPoints: string[];
  alerts: string[];
  lastMeetingSummary: string | null;
  lastMeetingDate: string | null;
  actionItems: ActionItem[];
  suggestedMaterials: SuggestedMaterial[];
  materialsComplianceChecked: boolean;
  reportAttached: string | null;
  nextBestAction: string;
  complianceLogged: boolean;
  adviceNoteLogged: boolean;
}

export const MEETINGS: MeetingRecord[] = [
  {
    id: "M001",
    client: { name: "Anika Rao", id: "C12345", plan: "Platinum" },
    meetingType: "Annual Plan Review",
    date: "2025-05-20T10:30:00",
    dateLabel: "Tomorrow",
    urgency: "urgent",
    duration: "45 min",
    mode: "Video",
    status: "needs-prep",
    briefPoints: ["Retirement funding gap has improved 8% since the last review.", "Wedding goal amount needs reconfirmation.", "Protection information is still incomplete."],
    alerts: ["Retirement goal off-track", "Risk profile due for renewal"],
    lastMeetingSummary: "Plan Discussion — retirement target set at 60, insurance policy details still pending.",
    lastMeetingDate: "20 May 2025",
    actionItems: [{ id: "a1", text: "Update retirement projection", owner: "Advisor", dueDate: "28 Aug", status: "in-progress" }, { id: "a2", text: "Upload insurance policy", owner: "Client", dueDate: "01 Sep", status: "pending" }],
    suggestedMaterials: [{ name: "Retirement Planning Essentials", type: "Workshop" }, { name: "Understanding Term Insurance", type: "Article" }],
    materialsComplianceChecked: true,
    reportAttached: "Retirement Plan Review",
    nextBestAction: "Prepare and send the Annual Plan Review report before the meeting.",
    complianceLogged: false,
    adviceNoteLogged: false,
  },
  {
    id: "M002",
    client: { name: "Sanjay Patel", id: "C12312", plan: "Gold" },
    meetingType: "Follow-up Call",
    date: "2025-05-19T15:00:00",
    dateLabel: "Today 3:00 PM",
    urgency: "urgent",
    duration: "20 min",
    mode: "Phone",
    status: "needs-prep",
    briefPoints: ["Education fund projection was flagged short by ₹4L last review.", "Client requested a follow-up call to confirm the revised SIP."],
    alerts: ["1 data gap in insurance details"],
    lastMeetingSummary: "Education Fund Planning review — client asked for a follow-up before committing to a higher SIP.",
    lastMeetingDate: "12 May 2025",
    actionItems: [{ id: "a1", text: "Validate insurance data", owner: "Advisor", dueDate: "Today", status: "pending" }, { id: "a2", text: "Confirm revised SIP amount", owner: "Client", dueDate: "Today", status: "pending" }],
    suggestedMaterials: [{ name: "Education Fund Planning Guide", type: "PDF Guide" }],
    materialsComplianceChecked: true,
    reportAttached: "Education Fund Planning",
    nextBestAction: "Confirm the revised SIP on the call and log it as a decision.",
    complianceLogged: false,
    adviceNoteLogged: false,
  },
  {
    id: "M003", client: { name: "Meera Nair", id: "C12111", plan: "Gold" }, meetingType: "Annual Plan Review", date: "2025-05-20T00:00:00", dateLabel: "Tomorrow", urgency: "soon", duration: "40 min", mode: "Video", status: "prepped",
    briefPoints: ["Goal progress report shows 2 suggestions ready for discussion.", "No alerts — client is broadly on track."], alerts: [], lastMeetingSummary: "Goal Progress Report reviewed — both goals tracking within range.", lastMeetingDate: "18 Apr 2025", actionItems: [{ id: "a1", text: "Share updated goal progress report", owner: "Advisor", dueDate: "20 May", status: "completed" }], suggestedMaterials: [{ name: "Goal-Based Investing Basics", type: "Article" }], materialsComplianceChecked: true, reportAttached: "Goal Progress Report", nextBestAction: "Walk through the 2 AI suggestions and agree next actions.", complianceLogged: false, adviceNoteLogged: false,
  },
  {
    id: "M004", client: { name: "Rohan Kumar", id: "C12456", plan: "Silver" }, meetingType: "Financial Blueprint Review", date: "2025-05-22T00:00:00", dateLabel: "In 3 days", urgency: "upcoming", duration: "35 min", mode: "Video", status: "scheduled",
    briefPoints: ["Blueprint highlights retirement as the highest-priority gap.", "Client hasn't confirmed retirement preference yet."], alerts: ["1 assumption unverified"], lastMeetingSummary: "Discovery call — client confirmed interest in a one-time blueprint.", lastMeetingDate: "10 May 2025", actionItems: [{ id: "a1", text: "Add retirement preference", owner: "Client", dueDate: "22 May", status: "pending" }], suggestedMaterials: [{ name: "Financial Blueprint Explainer", type: "Video" }], materialsComplianceChecked: false, reportAttached: "Portfolio Review Report", nextBestAction: "Prompt the client to submit their retirement preference before the meeting.", complianceLogged: false, adviceNoteLogged: false,
  },
  {
    id: "M005", client: { name: "Deepak Iyer", id: "C11976", plan: "Silver" }, meetingType: "Follow-up Call", date: "2025-05-14T14:00:00", dateLabel: "5 days ago", urgency: null, duration: "25 min", mode: "Phone", status: "follow-up-pending",
    briefPoints: ["Insurance review report was well received — client wants to proceed with implementation."], alerts: [], lastMeetingSummary: "Insurance Review Report walkthrough — client agreed with recommendations.", lastMeetingDate: "14 May 2025", actionItems: [{ id: "a1", text: "Send policy comparison document", owner: "Advisor", dueDate: "16 May", status: "in-progress" }, { id: "a2", text: "Decide on top-up cover", owner: "Client", dueDate: "20 May", status: "pending" }], suggestedMaterials: [{ name: "Term vs Whole Life Insurance", type: "Article" }], materialsComplianceChecked: true, reportAttached: "Insurance Review Report", nextBestAction: "Follow up — client hasn't decided on the top-up cover in 5 days.", complianceLogged: true, adviceNoteLogged: true,
  },
  {
    id: "M006", client: { name: "Kavya Shah", id: "C12587", plan: "Gold" }, meetingType: "Annual Plan Review", date: "2025-05-25T00:00:00", dateLabel: "In 6 days", urgency: "upcoming", duration: "45 min", mode: "Video", status: "scheduled",
    briefPoints: ["Tax planning report is still generating — will be ready 2 days before the meeting."], alerts: ["Advisory agreement due for renewal in 30 days"], lastMeetingSummary: "Plan kickoff — tax planning identified as the primary focus for this cycle.", lastMeetingDate: "28 Apr 2025", actionItems: [{ id: "a1", text: "Finalise tax planning report", owner: "Advisor", dueDate: "23 May", status: "in-progress" }], suggestedMaterials: [{ name: "Tax-Saving Instruments 101", type: "Workshop" }], materialsComplianceChecked: false, reportAttached: "Tax Planning Report", nextBestAction: "Nothing to action yet — report is still generating.", complianceLogged: false, adviceNoteLogged: false,
  },
  {
    id: "M007", client: { name: "Vikram Tandon", id: "C12890", plan: "Platinum" }, meetingType: "Family Wealth Review", date: "2025-05-10T11:00:00", dateLabel: "9 days ago", urgency: null, duration: "60 min", mode: "Video", status: "completed",
    briefPoints: ["Family wealth strategy reaffirmed — no changes to allocation."], alerts: [], lastMeetingSummary: "Family Wealth Review — long-term strategy aligned with family goals.", lastMeetingDate: "10 May 2025", actionItems: [{ id: "a1", text: "Share Financial Health Report", owner: "Advisor", dueDate: "12 May", status: "completed" }], suggestedMaterials: [], materialsComplianceChecked: true, reportAttached: "Financial Health Report", nextBestAction: "Schedule the next strategic review in 6 months.", complianceLogged: true, adviceNoteLogged: true,
  },
  {
    id: "M008", client: { name: "Neha Suri", id: "C12765", plan: "Gold" }, meetingType: "Annual Plan Review", date: "2025-05-27T00:00:00", dateLabel: "In 8 days", urgency: "upcoming", duration: "40 min", mode: "Video", status: "scheduled",
    briefPoints: ["Wealth projection report has 2 suggestions flagged for discussion."], alerts: [], lastMeetingSummary: "Scenario planning session — client explored early-retirement scenarios.", lastMeetingDate: "30 Mar 2025", actionItems: [{ id: "a1", text: "Model early-retirement scenario at 55", owner: "Advisor", dueDate: "25 May", status: "in-progress" }], suggestedMaterials: [{ name: "Early Retirement Simulator", type: "Simulation" }], materialsComplianceChecked: true, reportAttached: "Wealth Projection Report", nextBestAction: "Finish the early-retirement scenario model before the meeting.", complianceLogged: false, adviceNoteLogged: false,
  },
  {
    id: "M009", client: { name: "Arjun Bhatia", id: "C12902", plan: "Platinum" }, meetingType: "Proposal Walkthrough", date: "2025-05-29T00:00:00", dateLabel: "In 4 days", urgency: "upcoming", duration: "30 min", mode: "Video", status: "needs-prep",
    briefPoints: ["Estate planning report is awaiting compliance sign-off on suitability wording."], alerts: ["Compliance review pending — blocks meeting prep"], lastMeetingSummary: "Financial Blueprint review — estate planning identified as a new priority.", lastMeetingDate: "1 May 2025", actionItems: [{ id: "a1", text: "Resolve compliance flag on suitability wording", owner: "Advisor", dueDate: "27 May", status: "pending" }], suggestedMaterials: [{ name: "Estate Planning Basics for Indian Families", type: "Article" }], materialsComplianceChecked: false, reportAttached: "Estate Planning Report", nextBestAction: "Resolve the compliance flag before this meeting can be prepped.", complianceLogged: false, adviceNoteLogged: false,
  },
  {
    id: "M010", client: { name: "Sneha Kulkarni", id: "C12344", plan: "Gold" }, meetingType: "Annual Plan Review", date: "2025-05-08T13:20:00", dateLabel: "11 days ago", urgency: null, duration: "45 min", mode: "In-person", status: "completed",
    briefPoints: ["Annual portfolio summary approved and shared with client."], alerts: [], lastMeetingSummary: "Annual review — portfolio performance discussed, no rebalancing needed.", lastMeetingDate: "8 May 2025", actionItems: [], suggestedMaterials: [], materialsComplianceChecked: true, reportAttached: "Annual Portfolio Summary", nextBestAction: "No further action — schedule next annual review.", complianceLogged: true, adviceNoteLogged: true,
  },
  {
    id: "M011", client: { name: "Deepak Malhotra", id: "C12010", plan: "Platinum" }, meetingType: "Annual Plan Review", date: "2025-05-30T00:00:00", dateLabel: "In 5 days", urgency: "upcoming", duration: "45 min", mode: "Video", status: "prepped",
    briefPoints: ["Risk profile review cleared by compliance — ready to share and discuss."], alerts: [], lastMeetingSummary: "Risk tolerance reassessment requested by client after market volatility.", lastMeetingDate: "5 Apr 2025", actionItems: [{ id: "a1", text: "Share compliance-cleared risk profile report", owner: "Advisor", dueDate: "28 May", status: "completed" }], suggestedMaterials: [{ name: "Understanding Market Volatility", type: "Video" }], materialsComplianceChecked: true, reportAttached: "Risk Profile Review", nextBestAction: "Send the risk profile report ahead of the meeting so the client can review it.", complianceLogged: false, adviceNoteLogged: false,
  },
  {
    id: "M012", client: { name: "Lakshmi Venkat", id: "C12233", plan: "Silver" }, meetingType: "Financial Blueprint Review", date: "2025-05-06T08:30:00", dateLabel: "13 days ago", urgency: null, duration: "35 min", mode: "Video", status: "follow-up-pending",
    briefPoints: ["Goal funding report shared — client to decide whether to proceed with implementation."], alerts: [], lastMeetingSummary: "Blueprint walkthrough — client engaged but undecided on next steps.", lastMeetingDate: "6 May 2025", actionItems: [{ id: "a1", text: "Decide whether implementation support is needed", owner: "Client", dueDate: "Within 1 week", status: "pending" }], suggestedMaterials: [{ name: "From Blueprint to Action", type: "Article" }], materialsComplianceChecked: true, reportAttached: "Goal Funding Report", nextBestAction: "Follow up — client hasn't responded on implementation in over a week.", complianceLogged: true, adviceNoteLogged: false,
  },
  {
    id: "M013", client: { name: "Farhan Qureshi", id: "C12781", plan: "Gold" }, meetingType: "Follow-up Call", date: "2025-05-21T15:10:00", dateLabel: "2 days ago", urgency: null, duration: "20 min", mode: "Phone", status: "completed",
    briefPoints: ["Tax optimisation report acknowledged by client — no further questions."], alerts: [], lastMeetingSummary: "Tax optimisation report sent and reviewed on call.", lastMeetingDate: "21 May 2025", actionItems: [], suggestedMaterials: [], materialsComplianceChecked: true, reportAttached: "Tax Optimisation Report", nextBestAction: "No action needed — client acknowledged the report.", complianceLogged: true, adviceNoteLogged: true,
  },
  {
    id: "M014", client: { name: "Arun Singh", id: "C12466", plan: "Gold" }, meetingType: "Follow-up Call", date: "2025-05-24T00:00:00", dateLabel: "In 2 days", urgency: "soon", duration: "20 min", mode: "Phone", status: "needs-prep",
    briefPoints: ["Client requested changes to the equity split in the asset allocation review."], alerts: ["Revision requested — equity split needs rework"], lastMeetingSummary: "Asset allocation review — client flagged the equity split as too aggressive.", lastMeetingDate: "20 May 2025", actionItems: [{ id: "a1", text: "Rework equity split per client feedback", owner: "Advisor", dueDate: "23 May", status: "in-progress" }], suggestedMaterials: [{ name: "Asset Allocation & Risk", type: "Article" }], materialsComplianceChecked: false, reportAttached: "Asset Allocation Review", nextBestAction: "Finish reworking the equity split before this call.", complianceLogged: false, adviceNoteLogged: false,
  },
];

export const MEETING_ATTENTION_STATS = {
  today: 1,
  needsPrep: MEETINGS.filter((m) => m.status === "needs-prep").length,
  followUpsPending: MEETINGS.filter((m) => m.status === "follow-up-pending").length,
  aiAssistance: MEETINGS.filter((m) => m.suggestedMaterials.length > 0 || m.alerts.length > 0).length,
};
