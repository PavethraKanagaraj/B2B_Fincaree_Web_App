"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/fincaree/avatar";
import { Badge } from "@/components/fincaree/badge";
import { Button } from "@/components/fincaree/button";
import { ButtonGroup } from "@/components/fincaree/button-group";
import { Checkbox } from "@/components/fincaree/checkbox";
import { SelectField, SelectItem } from "@/components/fincaree/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/fincaree/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Report,
  ReportStatus,
  StatusBadgeColor,
  STATUS_COLORS,
  STATUS_LABELS,
} from "./data";
import {
  MoreHorizontal,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Copy,
  FileDown,
  Archive,
} from "lucide-react";
import { useState } from "react";

/* ============================================================
   Report Table — Main queue view
   Columns: Client | Report | Meeting | AI Flags | Readiness | Status | Actions
   ============================================================ */

/** Derive initials from a full name — e.g. "Anika Rao" → "AR" */
function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Map report status → Fincaree Badge color token */
function statusToColor(status: ReportStatus): StatusBadgeColor {
  return STATUS_COLORS[status] ?? "gray";
}

function statusToLabel(status: ReportStatus): string {
  return STATUS_LABELS[status] ?? status;
}

function primaryAction(status: string): { label: string; variant: "primary" | "secondary" } {
  if (status === "needs-review" || status === "ai-generated") return { label: "Review", variant: "primary" };
  if (status === "needs-input") return { label: "Resolve", variant: "secondary" };
  return { label: "View", variant: "secondary" };
}

function ReadinessBar({ value, label }: { value: number; label: string }) {
  const color =
    value >= 90 ? "var(--color-success-500)" :
    value >= 70 ? "var(--color-brand-500)" :
    value >= 50 ? "var(--color-warning-500)" :
    "var(--color-error-500)";

  return (
    <div className="flex flex-col gap-1 min-w-[80px]">
      <div className="h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs text-[var(--text-tertiary)] leading-tight">{label}</span>
    </div>
  );
}

function MeetingCell({
  label,
  urgency,
}: {
  label: string | null;
  urgency: "urgent" | "soon" | "upcoming" | null;
}) {
  if (!label) {
    return <span className="text-[var(--text-tertiary)] text-xs">No meeting</span>;
  }

  const color =
    urgency === "urgent" ? "text-[var(--text-status-error)]" :
    urgency === "soon"   ? "text-[var(--text-status-warning)]" :
    "text-[var(--text-secondary)]";

  const bg =
    urgency === "urgent" ? "bg-[var(--bg-status-error-subtle)] border-[var(--border-status-error-subtle)]" :
    urgency === "soon"   ? "bg-[var(--bg-status-warning-subtle)] border-[var(--border-status-warning-subtle)]" :
    "bg-transparent border-transparent";

  return (
    <div className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded border", bg)}>
      {urgency === "urgent" && <AlertCircle size={11} strokeWidth={2} className="text-[var(--text-status-error)] shrink-0" />}
      {urgency === "soon"   && <Clock       size={11} strokeWidth={2} className="text-[var(--text-status-warning)] shrink-0" />}
      <span className={cn("text-xs font-medium leading-tight", color)}>{label}</span>
    </div>
  );
}

function AIFlagsCell({ flags }: { flags: Report["aiFlags"] }) {
  if (flags.length === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
        <span className="text-[var(--icon-placeholder)]">◇</span>
        None
      </span>
    );
  }
  return (
    <div className="flex flex-col gap-0.5">
      {flags.map((f, i) => (
        <div key={i} className="inline-flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
          <Sparkles size={10} strokeWidth={2} className="text-[var(--icon-brand-primary)] shrink-0" />
          <span className="truncate max-w-[120px]">{f.label}</span>
        </div>
      ))}
    </div>
  );
}

interface ReportTableProps {
  reports: Report[];
  onRowClick: (report: Report) => void;
}

export function ReportTable({ reports, onRowClick }: ReportTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  function handlePageSizeChange(size: number) {
    setPageSize(size);
    setPage(1); // avoid landing on a now out-of-range page
  }

  const totalPages = Math.ceil(reports.length / pageSize);
  const slice = reports.slice((page - 1) * pageSize, page * pageSize);
  const allChecked = slice.length > 0 && slice.every((r) => checkedIds.has(r.id));
  const someChecked = slice.some((r) => checkedIds.has(r.id));

  function toggleAll() {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (allChecked) slice.forEach((r) => next.delete(r.id));
      else            slice.forEach((r) => next.add(r.id));
      return next;
    });
  }

  function toggleOne(id: string) {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div>
      {/* Table wrapper — shadcn Table, adapted to Fincaree tokens (no table primitive exists in Fincaree) */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--border-tertiary)] bg-[var(--bg-primary)] overflow-hidden">
        <Table className="min-w-[820px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {/* Checkbox — uses Fincaree Checkbox component */}
              <TableHead scope="col" className="w-10 px-4 py-3">
                <Checkbox
                  checked={allChecked}
                  indeterminate={!allChecked && someChecked}
                  onChange={toggleAll}
                  size="sm"
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead scope="col" className="px-4 py-3 text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wide">Client</TableHead>
              <TableHead scope="col" className="px-4 py-3 text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wide">Report</TableHead>
              <TableHead scope="col" className="px-4 py-3 text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wide">Meeting</TableHead>
              <TableHead scope="col" className="px-4 py-3 text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wide">AI Flags</TableHead>
              <TableHead scope="col" className="px-4 py-3 text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wide">Readiness</TableHead>
              <TableHead scope="col" className="px-4 py-3 text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wide">Status</TableHead>
              <TableHead scope="col" className="px-4 py-3 text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wide">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slice.map((report) => {
              const action = primaryAction(report.status);
              return (
                <TableRow
                  key={report.id}
                  onClick={() => onRowClick(report)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onRowClick(report);
                    }
                  }}
                  tabIndex={0}
                  aria-label={`Open ${report.reportName} for ${report.client.name}`}
                  className="cursor-pointer group"
                >
                  {/* Checkbox */}
                  <TableCell className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={checkedIds.has(report.id)}
                      onChange={() => toggleOne(report.id)}
                      size="sm"
                      aria-label={`Select ${report.client.name}`}
                    />
                  </TableCell>

                  {/* Client */}
                  <TableCell className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm" initials={initials(report.client.name)} />
                      <div>
                        <div className="text-sm font-medium text-[var(--text-primary)] leading-snug">
                          {report.client.name}
                        </div>
                        <div className="text-xs text-[var(--text-tertiary)] leading-tight">
                          {report.client.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Report */}
                  <TableCell className="px-4 py-3.5">
                    <div>
                      <div className="text-sm font-medium text-[var(--text-primary)] leading-snug">
                        {report.reportName}
                      </div>
                      <div className="text-xs text-[var(--text-tertiary)] leading-tight">
                        {report.reportCategory}
                      </div>
                    </div>
                  </TableCell>

                  {/* Meeting */}
                  <TableCell className="px-4 py-3.5">
                    <MeetingCell label={report.meetingLabel} urgency={report.meetingUrgency} />
                  </TableCell>

                  {/* AI Flags */}
                  <TableCell className="px-4 py-3.5">
                    <AIFlagsCell flags={report.aiFlags} />
                  </TableCell>

                  {/* Readiness */}
                  <TableCell className="px-4 py-3.5">
                    <ReadinessBar value={report.readiness} label={report.readinessLabel} />
                  </TableCell>

                  {/* Status — Fincaree Badge with dot leading icon */}
                  <TableCell className="px-4 py-3.5">
                    <Badge color={statusToColor(report.status)} leadingIcon="dot" size="sm">
                      {statusToLabel(report.status)}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant={action.variant}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(report);
                        }}
                      >
                        {action.label}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          showChevron={false}
                          render={
                            <Button
                              variant="tertiary"
                              size="sm"
                              iconOnly
                              leadingIcon={<MoreHorizontal size={15} strokeWidth={1.75} />}
                              aria-label="More options"
                            />
                          }
                        />
                        <DropdownMenuContent alignment="end">
                          <DropdownMenuItem icon={<Copy size={14} strokeWidth={1.75} />}>
                            Duplicate report
                          </DropdownMenuItem>
                          <DropdownMenuItem icon={<FileDown size={14} strokeWidth={1.75} />}>
                            Export as PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem icon={<Archive size={14} strokeWidth={1.75} />}>
                            Archive report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 px-1">
        <div className="text-xs text-[var(--text-tertiary)]">
          Showing {((page - 1) * pageSize) + 1}–{Math.min(page * pageSize, reports.length)} of {reports.length} reports
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            size="sm"
            iconOnly
            leadingIcon={<ChevronLeft size={14} strokeWidth={2} />}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          />
          <ButtonGroup
            options={Array.from({ length: totalPages }, (_, i) => ({
              value: String(i + 1),
              label: String(i + 1),
            }))}
            value={String(page)}
            onChange={(v) => setPage(Number(v))}
            aria-label="Select page"
          />
          <Button
            variant="secondary"
            size="sm"
            iconOnly
            leadingIcon={<ChevronRight size={14} strokeWidth={2} />}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
          Rows per page:
          <SelectField
            size="sm"
            value={String(pageSize)}
            onValueChange={(v: unknown) => handlePageSizeChange(Number(v))}
            aria-label="Rows per page"
            className="w-16"
          >
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectField>
        </div>
      </div>
    </div>
  );
}
