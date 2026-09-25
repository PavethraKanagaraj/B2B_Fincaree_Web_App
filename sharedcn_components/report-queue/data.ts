/* ============================================================
   Report Queue — Mock Data
   Based on wireframe sample rows and page context requirements.
   All names / amounts follow the Fincaree product context.
   ============================================================ */

export type ReportStatus =
  // ① Needs action
  | "ai-generated"
  | "generating"
  | "needs-input"
  | "needs-review"
  | "compliance-review"
  // ② Ready to send
  | "approved"
  | "compliance-cleared"
  | "ready-to-share"
  // ③ Sent / in progress
  | "shared"
  | "awaiting-ack"
  | "revision-required"
  // ④ Completed
  | "completed"
  | "archived";

export type QueueStageId =
  | "needs-action"
  | "ready-to-send"
  | "sent-in-progress"
  | "completed";

export interface QueueStage {
  id: QueueStageId;
  number: number;
  label: string;
  /** Statuses that roll up into this column, in display order. */
  statuses: ReportStatus[];
  /** Column accent — drives the header rule and count pill. */
  accent: string;
}

export const QUEUE_STAGES: QueueStage[] = [
  {
    id: "needs-action",
    number: 1,
    label: "Needs Action",
    statuses: ["ai-generated", "generating", "needs-input", "needs-review", "compliance-review"],
    accent: "var(--color-error-500)",
  },
  {
    id: "ready-to-send",
    number: 2,
    label: "Ready to Send",
    statuses: ["approved", "compliance-cleared", "ready-to-share"],
    accent: "var(--color-success-700)",
  },
  {
    id: "sent-in-progress",
    number: 3,
    label: "Sent / In Progress",
    statuses: ["shared", "awaiting-ack", "revision-required"],
    accent: "var(--color-warning-700)",
  },
  {
    id: "completed",
    number: 4,
    label: "Completed",
    statuses: ["completed", "archived"],
    accent: "var(--color-grey-600)",
  },
];

export type StatusBadgeColor =
  | "gray"
  | "brand"
  | "error"
  | "warning"
  | "success"
  | "gray-blue";

export const STATUS_LABELS: Record<ReportStatus, string> = {
  "ai-generated": "Draft",
  generating: "Generating...",
  "needs-input": "Missing Information",
  "needs-review": "Review Required",
  "compliance-review": "Compliance Review",
  approved: "Advisor Approved",
  "compliance-cleared": "Compliance Cleared",
  "ready-to-share": "Ready for Client",
  shared: "Sent to Client",
  "awaiting-ack": "Awaiting Acknowledgement",
  "revision-required": "Changes Requested",
  completed: "Delivered",
  archived: "Archived",
};

export const STATUS_COLORS: Record<ReportStatus, StatusBadgeColor> = {
  "ai-generated": "brand",
  generating: "gray",
  "needs-input": "error",
  "needs-review": "warning",
  "compliance-review": "warning",
  approved: "success",
  "compliance-cleared": "success",
  "ready-to-share": "success",
  shared: "gray-blue",
  "awaiting-ack": "gray-blue",
  "revision-required": "error",
  completed: "gray",
  archived: "gray",
};

const STATUS_TO_STAGE = new Map<ReportStatus, QueueStageId>(
  QUEUE_STAGES.flatMap((stage) =>
    stage.statuses.map((status) => [status, stage.id] as const)
  )
);

export function stageForStatus(status: ReportStatus): QueueStageId {
  return STATUS_TO_STAGE.get(status) ?? "needs-action";
}

export type PriorityLevel = "high" | "medium" | "low";

export type ConfidenceLevel = "high" | "medium" | "low";

export type PlanTier = "Gold" | "Platinum" | "Silver";

export interface AIFlag {
  type: "suggestion" | "data-gap" | "assumption" | "validation";
  label: string;
}

export interface Report {
  id: string;
  client: {
    name: string;
    id: string;
    plan: PlanTier;
  };
  reportName: string;
  reportCategory: string;
  generatedAt: string;           // ISO string
  meetingDate: string | null;    // ISO string or null
  meetingLabel: string | null;   // "Tomorrow", "Today 5:00 PM", etc.
  meetingUrgency: "urgent" | "soon" | "upcoming" | null;
  aiFlags: AIFlag[];
  readiness: number;             // 0–100
  readinessLabel: string;
  status: ReportStatus;
  priority: PriorityLevel;
  aiConfidence: number;          // 0–100
  confidenceLevel: ConfidenceLevel;
  advisorAttention: string;      // What the advisor needs to do
  reviewedBy: string | null;
}

export const REPORTS: Report[] = [
  {
    id: "R001",
    client: { name: "Anika Rao",    id: "C12345", plan: "Platinum" },
    reportName: "Retirement Plan Review",
    reportCategory: "Comprehensive",
    generatedAt: "2025-05-19T10:30:00",
    meetingDate: "2025-05-20T10:30:00",
    meetingLabel: "Tomorrow",
    meetingUrgency: "urgent",
    aiFlags: [
      { type: "suggestion", label: "Retirement goal is 12% behind target" },
      { type: "suggestion", label: "Consider increasing SIP by ₹10,000/month" },
    ],
    readiness: 90,
    readinessLabel: "Almost ready",
    status: "needs-review",
    priority: "high",
    aiConfidence: 92,
    confidenceLevel: "high",
    advisorAttention: "Review assumptions",
    reviewedBy: null,
  },
  {
    id: "R002",
    client: { name: "Sanjay Patel", id: "C12312", plan: "Gold" },
    reportName: "Education Fund Planning",
    reportCategory: "Detailed Analysis",
    generatedAt: "2025-05-19T09:15:00",
    meetingDate: "2025-05-19T15:00:00",
    meetingLabel: "Today 3:00 PM",
    meetingUrgency: "urgent",
    aiFlags: [
      { type: "data-gap", label: "1 data gap" },
    ],
    readiness: 80,
    readinessLabel: "Needs attention",
    status: "needs-input",
    priority: "high",
    aiConfidence: 74,
    confidenceLevel: "medium",
    advisorAttention: "Validate insurance data",
    reviewedBy: null,
  },
  {
    id: "R003",
    client: { name: "Meera Nair",   id: "C12111", plan: "Gold" },
    reportName: "Goal Progress Report",
    reportCategory: "Goal Based",
    generatedAt: "2025-05-19T08:00:00",
    meetingDate: "2025-05-20T00:00:00",
    meetingLabel: "Tomorrow",
    meetingUrgency: "soon",
    aiFlags: [
      { type: "suggestion", label: "2 suggestions" },
    ],
    readiness: 95,
    readinessLabel: "Ready",
    status: "needs-review",
    priority: "medium",
    aiConfidence: 88,
    confidenceLevel: "high",
    advisorAttention: "Confirm recommendation",
    reviewedBy: null,
  },
  {
    id: "R004",
    client: { name: "Rohan Kumar",  id: "C12456", plan: "Silver" },
    reportName: "Portfolio Review Report",
    reportCategory: "Performance Analysis",
    generatedAt: "2025-05-23T11:00:00",
    meetingDate: "2025-05-22T00:00:00",
    meetingLabel: "In 3 days",
    meetingUrgency: "upcoming",
    aiFlags: [
      { type: "assumption", label: "1 assumption" },
    ],
    readiness: 70,
    readinessLabel: "In progress",
    status: "needs-input",
    priority: "medium",
    aiConfidence: 81,
    confidenceLevel: "high",
    advisorAttention: "Add retirement preference",
    reviewedBy: null,
  },
  {
    id: "R005",
    client: { name: "Deepak Iyer",  id: "C11976", plan: "Silver" },
    reportName: "Insurance Review Report",
    reportCategory: "Protection Analysis",
    generatedAt: "2025-05-19T14:00:00",
    meetingDate: null,
    meetingLabel: null,
    meetingUrgency: null,
    aiFlags: [],
    readiness: 85,
    readinessLabel: "Almost ready",
    status: "ai-generated",
    priority: "low",
    aiConfidence: 79,
    confidenceLevel: "medium",
    advisorAttention: "No action needed",
    reviewedBy: null,
  },
  {
    id: "R006",
    client: { name: "Kavya Shah",   id: "C12587", plan: "Gold" },
    reportName: "Tax Planning Report",
    reportCategory: "Tax Analysis",
    generatedAt: "2025-05-26T16:00:00",
    meetingDate: "2025-05-25T00:00:00",
    meetingLabel: "In 6 days",
    meetingUrgency: "upcoming",
    aiFlags: [
      { type: "suggestion", label: "1 suggestion" },
    ],
    readiness: 60,
    readinessLabel: "In progress",
    status: "generating",
    priority: "low",
    aiConfidence: 65,
    confidenceLevel: "medium",
    advisorAttention: "Awaiting generation",
    reviewedBy: null,
  },
  {
    id: "R007",
    client: { name: "Vikram Tandon", id: "C12890", plan: "Platinum" },
    reportName: "Financial Health Report",
    reportCategory: "Summary Report",
    generatedAt: "2025-05-28T11:30:00",
    meetingDate: null,
    meetingLabel: null,
    meetingUrgency: null,
    aiFlags: [],
    readiness: 100,
    readinessLabel: "Complete",
    status: "completed",
    priority: "low",
    aiConfidence: 96,
    confidenceLevel: "high",
    advisorAttention: "No action needed",
    reviewedBy: "Advisor",
  },
  {
    id: "R008",
    client: { name: "Neha Suri",    id: "C12765", plan: "Gold" },
    reportName: "Wealth Projection Report",
    reportCategory: "Scenario Analysis",
    generatedAt: "2025-05-28T11:30:00",
    meetingDate: "2025-05-27T00:00:00",
    meetingLabel: "In 8 days",
    meetingUrgency: "upcoming",
    aiFlags: [
      { type: "suggestion", label: "2 suggestions" },
    ],
    readiness: 75,
    readinessLabel: "In progress",
    status: "needs-review",
    priority: "medium",
    aiConfidence: 83,
    confidenceLevel: "high",
    advisorAttention: "Review assumptions",
    reviewedBy: null,
  },
  {
    id: "R009",
    client: { name: "Arjun Bhatia", id: "C12902", plan: "Platinum" },
    reportName: "Estate Planning Report",
    reportCategory: "Comprehensive",
    generatedAt: "2025-05-27T09:45:00",
    meetingDate: "2025-05-29T00:00:00",
    meetingLabel: "In 4 days",
    meetingUrgency: "upcoming",
    aiFlags: [{ type: "validation", label: "Suitability wording flagged" }],
    readiness: 88,
    readinessLabel: "Almost ready",
    status: "compliance-review",
    priority: "high",
    aiConfidence: 86,
    confidenceLevel: "high",
    advisorAttention: "Awaiting compliance sign-off",
    reviewedBy: "Advisor",
  },
  {
    id: "R010",
    client: { name: "Sneha Kulkarni", id: "C12344", plan: "Gold" },
    reportName: "Annual Portfolio Summary",
    reportCategory: "Performance Analysis",
    generatedAt: "2025-05-24T13:20:00",
    meetingDate: null,
    meetingLabel: null,
    meetingUrgency: null,
    aiFlags: [],
    readiness: 100,
    readinessLabel: "Ready",
    status: "approved",
    priority: "medium",
    aiConfidence: 94,
    confidenceLevel: "high",
    advisorAttention: "Ready to share with client",
    reviewedBy: "Advisor",
  },
  {
    id: "R011",
    client: { name: "Deepak Malhotra", id: "C12010", plan: "Platinum" },
    reportName: "Risk Profile Review",
    reportCategory: "Protection Analysis",
    generatedAt: "2025-05-25T10:05:00",
    meetingDate: "2025-05-30T00:00:00",
    meetingLabel: "In 5 days",
    meetingUrgency: "upcoming",
    aiFlags: [],
    readiness: 100,
    readinessLabel: "Ready",
    status: "compliance-cleared",
    priority: "medium",
    aiConfidence: 91,
    confidenceLevel: "high",
    advisorAttention: "Compliance cleared — send to client",
    reviewedBy: "Compliance",
  },
  {
    id: "R012",
    client: { name: "Lakshmi Venkat", id: "C12233", plan: "Silver" },
    reportName: "Goal Funding Report",
    reportCategory: "Goal Based",
    generatedAt: "2025-05-26T08:30:00",
    meetingDate: null,
    meetingLabel: null,
    meetingUrgency: null,
    aiFlags: [],
    readiness: 97,
    readinessLabel: "Ready",
    status: "ready-to-share",
    priority: "low",
    aiConfidence: 89,
    confidenceLevel: "high",
    advisorAttention: "Ready to share with client",
    reviewedBy: "Advisor",
  },
  {
    id: "R013",
    client: { name: "Farhan Qureshi", id: "C12781", plan: "Gold" },
    reportName: "Tax Optimisation Report",
    reportCategory: "Tax Analysis",
    generatedAt: "2025-05-21T15:10:00",
    meetingDate: null,
    meetingLabel: null,
    meetingUrgency: null,
    aiFlags: [],
    readiness: 100,
    readinessLabel: "Sent",
    status: "shared",
    priority: "low",
    aiConfidence: 90,
    confidenceLevel: "high",
    advisorAttention: "Sent 2 days ago",
    reviewedBy: "Advisor",
  },
  {
    id: "R014",
    client: { name: "Meera Chopra", id: "C12655", plan: "Silver" },
    reportName: "Retirement Readiness Report",
    reportCategory: "Scenario Analysis",
    generatedAt: "2025-05-18T11:00:00",
    meetingDate: null,
    meetingLabel: null,
    meetingUrgency: null,
    aiFlags: [],
    readiness: 100,
    readinessLabel: "Sent",
    status: "awaiting-ack",
    priority: "medium",
    aiConfidence: 87,
    confidenceLevel: "high",
    advisorAttention: "No acknowledgement for 7 days",
    reviewedBy: "Advisor",
  },
  {
    id: "R015",
    client: { name: "Arun Singh", id: "C12466", plan: "Gold" },
    reportName: "Asset Allocation Review",
    reportCategory: "Performance Analysis",
    generatedAt: "2025-05-20T09:00:00",
    meetingDate: "2025-05-24T00:00:00",
    meetingLabel: "In 2 days",
    meetingUrgency: "soon",
    aiFlags: [{ type: "data-gap", label: "Equity split needs rework" }],
    readiness: 62,
    readinessLabel: "In progress",
    status: "revision-required",
    priority: "high",
    aiConfidence: 71,
    confidenceLevel: "medium",
    advisorAttention: "Client requested changes",
    reviewedBy: "Advisor",
  },
  {
    id: "R016",
    client: { name: "Priya Nambiar", id: "C11845", plan: "Silver" },
    reportName: "FY24 Annual Summary",
    reportCategory: "Summary Report",
    generatedAt: "2025-04-30T17:00:00",
    meetingDate: null,
    meetingLabel: null,
    meetingUrgency: null,
    aiFlags: [],
    readiness: 100,
    readinessLabel: "Archived",
    status: "archived",
    priority: "low",
    aiConfidence: 95,
    confidenceLevel: "high",
    advisorAttention: "No action needed",
    reviewedBy: "Advisor",
  },
];

export const ATTENTION_STATS = {
  toReview: 5,
  dueSoon: 3,
  needsAttention: 4,
  aiAssistance: 6,
};
