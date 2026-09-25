"use client";

import { useMemo } from "react";
import { ReportCard } from "./ReportCard";
import {
  Report,
  ReportStatus,
  QUEUE_STAGES,
  QueueStageId,
  STATUS_LABELS,
  stageForStatus,
} from "./data";

/* ============================================================
   Report Board — Kanban view for /reports

   Four fixed columns from QUEUE_STAGES:
     ① Needs Action       ② Ready to Send
     ③ Sent / In Progress ④ Completed

   Cards inside a column are sub-grouped by status, in the order
   declared on the stage, so the queue taxonomy stays visible.
   ============================================================ */

interface ReportBoardProps {
  reports: Report[];
  onCardClick: (report: Report) => void;
}

export function ReportBoard({ reports, onCardClick }: ReportBoardProps) {
  const byStage = useMemo(() => {
    const groups = new Map<QueueStageId, Report[]>(
      QUEUE_STAGES.map((s) => [s.id, [] as Report[]])
    );
    for (const report of reports) {
      groups.get(stageForStatus(report.status))!.push(report);
    }
    return groups;
  }, [reports]);

  return (
    <div className="fc-board-scroller">
      {QUEUE_STAGES.map((stage) => {
        const stageReports = byStage.get(stage.id) ?? [];

        const subGroups = stage.statuses
          .map((status: ReportStatus) => ({
            status,
            items: stageReports.filter((r) => r.status === status),
          }))
          .filter((g) => g.items.length > 0);

        return (
          <section
            key={stage.id}
            aria-label={stage.label}
            className="flex-1 min-w-[320px] max-w-[420px] flex flex-col rounded-[var(--radius-xl)] bg-[var(--bg-subtle)]"
          >
            {/* ── Column header ── */}
            <header className="px-3 pt-3 pb-2.5 bg-[var(--bg-subtle)] rounded-t-[var(--radius-xl)]">
              <div className="flex items-center gap-2">
                <span
                  className="w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: stage.accent }}
                >
                  {stage.number}
                </span>
                <h2 className="text-[13px] font-bold uppercase tracking-wide text-[var(--text-primary)]">
                  {stage.label}
                </h2>
                <span className="ml-auto text-xs font-semibold text-[var(--text-tertiary)] bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-full px-2 py-0.5">
                  {stageReports.length}
                </span>
              </div>
              <div
                className="mt-2.5 h-0.5 rounded-full"
                style={{ backgroundColor: stage.accent }}
              />
            </header>

            {/* ── Cards ── */}
            <div className="px-3 pb-3 flex flex-col gap-4 flex-1">
              {subGroups.length === 0 ? (
                <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border-secondary)] py-8 text-center text-[12px] text-[var(--text-tertiary)]">
                  No reports
                </div>
              ) : (
                subGroups.map((group) => (
                  <div key={group.status} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-0.5">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                        {STATUS_LABELS[group.status]}
                      </span>
                      <span className="text-xs text-[var(--text-tertiary)]">
                        {group.items.length}
                      </span>
                      <span className="flex-1 h-px bg-[var(--border-tertiary)]" />
                    </div>

                    {group.items.map((report) => (
                      <ReportCard
                        key={report.id}
                        report={report}
                        onClick={onCardClick}
                      />
                    ))}
                  </div>
                ))
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
