"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/fincaree/avatar";
import { Badge } from "@/components/fincaree/badge";
import { Tag } from "@/components/fincaree/tag";
import {
  Report,
  ReportStatus,
  StatusBadgeColor,
  STATUS_COLORS,
  STATUS_LABELS,
} from "./data";
import {
  FileText,
  Calendar,
  Sparkles,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

/* ============================================================
   Report Card — board column card
   Card anatomy mirrors the Figma Meeting card pattern:
   ┌──────────────────────────────────────────────────────┐
   │ [Avatar]  Client Name        [Plan badge]            │
   │           Report Type/Name                           │
   ├──────────────────────────────────────────────────────│
   │ 📄 Report Category · 📅 Meeting date                 │
   │ [Tag chip] [Tag chip]  ← AI flag chips               │
   │ ● Status badge          [Readiness %]                │
   │ ✦ Attention needed  ← shown when urgent              │
   ├──────────────────────────────────────────────────────│
   │ → Primary action text              Due label (amber) │
   └──────────────────────────────────────────────────────┘
   ============================================================ */

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function planColor(plan: string): "brand" | "warning" | "gray" {
  if (plan === "Platinum") return "brand";
  if (plan === "Gold") return "warning";
  return "gray";
}

function statusColor(status: ReportStatus): StatusBadgeColor {
  return STATUS_COLORS[status] ?? "gray";
}

/**
 * Card accent, derived from the status badge colour so the left bar, the
 * hover glow. No border or accent bar is rendered — glow colour only.
 */
const ACCENTS: Record<StatusBadgeColor, { glow: string }> = {
  error:   { glow: "rgba(220, 38, 38, 0.20)" },
  warning: { glow: "rgba(217, 119, 6, 0.20)" },
  success: { glow: "rgba(47, 125, 107, 0.20)" },
  brand:   { glow: "rgba(0, 0, 0, 0.12)" },
  gray:    { glow: "rgba(0, 0, 0, 0.12)" },
  "gray-blue": { glow: "rgba(0, 0, 0, 0.12)" },
};

function statusLabel(status: ReportStatus): string {
  return STATUS_LABELS[status] ?? status;
}

function primaryActionText(status: string): string {
  const map: Record<string, string> = {
    "ai-generated": "Review & approve report",
    generating: "Generation in progress",
    "needs-input": "Resolve missing data",
    "needs-review": "Review & approve report",
    "compliance-review": "Awaiting compliance sign-off",
    approved: "Share with client",
    "compliance-cleared": "Share with client",
    "ready-to-share": "Share with client",
    shared: "Track delivery",
    "awaiting-ack": "Follow up with client",
    "revision-required": "Apply requested changes",
    completed: "Open report",
    archived: "Open report",
  };
  return map[status] ?? "Open report";
}

function dueLabel(
  urgency: Report["meetingUrgency"],
  status: string
): { text: string; urgent: boolean } | null {
  if (urgency === "urgent") return { text: "Due Today", urgent: true };
  if (urgency === "soon") return { text: "Due Soon", urgent: false };
  if (status === "needs-input" || status === "revision-required")
    return { text: "Action Required", urgent: true };
  return null;
}

function attentionNeeded(report: Report): string | null {
  if (report.status === "needs-input") return "Missing client data";
  if (report.status === "revision-required") return "Revision requested";
  if (report.status === "compliance-review") return "Compliance pending";
  if (report.status === "awaiting-ack") return "Acknowledgement pending";
  if (report.aiFlags.length > 0 && report.status === "needs-review")
    return "AI flags need review";
  if (report.meetingUrgency === "urgent") return "Meeting prep needed";
  return null;
}

/* ── Single Report Card ─────────────────────────────────────── */
export function ReportCard({
  report,
  onClick,
}: {
  report: Report;
  onClick: (r: Report) => void;
}) {
  const attention = attentionNeeded(report);
  const due = dueLabel(report.meetingUrgency, report.status);

  // Readiness color — a semantic status token, not a hardcoded hex, so it
  // adapts under dark mode the same way the rest of the design system does.
  const readinessColor =
    report.readiness >= 90
      ? "var(--text-status-success)"
      : report.readiness >= 70
      ? "var(--text-brand-primary)"
      : report.readiness >= 50
      ? "var(--text-status-warning)"
      : "var(--text-status-error)";

  const accent = ACCENTS[statusColor(report.status)];

  return (
    <div
      onClick={() => onClick(report)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(report);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${report.reportName} for ${report.client.name}`}
      style={{ "--card-glow": accent.glow } as CSSProperties}
      className={cn(
        "group relative flex flex-col rounded-[12px] overflow-hidden cursor-pointer",
        "bg-[var(--bg-primary)] border border-transparent",
        "transition-all duration-150",
        // No border, no left accent bar, in either state — plain card with a hover glow only.
        "hover:shadow-[0_4px_16px_-4px_var(--card-glow)]"
      )}
    >
      {/* ── Header: Avatar + Client name + Plan badge ── */}
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          {/* Left: Avatar + name block */}
          <div className="flex items-center gap-3 min-w-0">
            <Avatar size="md" initials={initials(report.client.name)} />
            <div className="min-w-0">
              <div className="text-[15px] font-bold text-[var(--text-primary)] leading-tight truncate">
                {report.client.name}
              </div>
              <div className="text-[13px] text-[var(--text-tertiary)] mt-0.5 leading-tight truncate">
                {report.reportName}
              </div>
            </div>
          </div>
          {/* Right: Plan badge — pill shape, matches Figma */}
          <Badge color={planColor(report.client.plan)} size="md">
            {report.client.plan}
          </Badge>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-[var(--border-tertiary)] mx-0" />

      {/* ── Body ── */}
      <div className="px-4 pt-3 pb-3 flex flex-col gap-2.5 flex-1">

        {/* Row 1: Report type · Meeting date */}
        <div className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
          <FileText size={13} strokeWidth={1.75} className="text-[var(--icon-tertiary)] shrink-0" />
          <span className="font-medium">{report.reportCategory}</span>
          {report.meetingLabel && (
            <>
              <span className="text-[var(--text-tertiary)]">·</span>
              <Calendar size={13} strokeWidth={1.75} className="text-[var(--icon-tertiary)] shrink-0" />
              <span>{report.meetingLabel}</span>
            </>
          )}
        </div>

        {/* Row 2: AI flag tags — Fincaree Tag (non-interactive label) */}
        {report.aiFlags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {report.aiFlags.slice(0, 2).map((f, i) => (
              <Tag key={i} color="brand" size="sm" icon={<Sparkles size={10} strokeWidth={2} />}>
                <span className="truncate max-w-[100px]">{f.label.split(" ").slice(0, 3).join(" ")}</span>
              </Tag>
            ))}
            {report.aiFlags.length > 2 && (
              <span className="text-xs text-[var(--text-tertiary)]">
                +{report.aiFlags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Row 3: Status badge + Readiness % — matches Confirmed / In 45m row */}
        <div className="flex items-center justify-between gap-2">
          <Badge color={statusColor(report.status)} leadingIcon="dot" size="sm">
            {statusLabel(report.status)}
          </Badge>
          {/* Readiness pill */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border"
            style={{
              color: readinessColor,
              borderColor: `color-mix(in srgb, ${readinessColor} 20%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${readinessColor} 7%, transparent)`,
            }}
          >
            {report.readiness}% ready
          </span>
        </div>

        {/* Row 4: Attention pill — matches "✦ Prep needed" in amber */}
        {attention && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[var(--bg-status-warning-subtle)] border border-[var(--border-status-warning-subtle)] w-fit">
            <AlertTriangle
              size={11}
              strokeWidth={2}
              className="text-[var(--text-status-warning)] shrink-0"
            />
            <span className="text-[12px] font-semibold text-[var(--text-status-warning)]">
              {attention}
            </span>
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-[var(--border-tertiary)]" />

      {/* ── Footer: → action text + Due label — matches Figma footer ── */}
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] min-w-0">
          <ArrowRight
            size={14}
            strokeWidth={2}
            className="text-[var(--icon-tertiary)] shrink-0 group-hover:text-[var(--icon-brand-primary)] transition-colors"
          />
          <span className="truncate group-hover:text-[var(--text-primary)] transition-colors">
            {primaryActionText(report.status)}
          </span>
        </div>
        {due && (
          <span
            className={cn(
              "text-[12px] font-bold shrink-0",
              due.urgent
                ? "text-[var(--text-status-error)]"
                : "text-[var(--text-status-warning)]"
            )}
          >
            {due.text}
          </span>
        )}
      </div>
    </div>
  );
}
