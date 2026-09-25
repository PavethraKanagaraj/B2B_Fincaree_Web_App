"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/fincaree/input";
import { SelectField, SelectItem } from "@/components/fincaree/select";
import { Button } from "@/components/fincaree/button";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { QUEUE_STAGES, STATUS_LABELS } from "./data";

/* ============================================================
   Filter Toolbar
   Uses Fincaree Input (search) + Fincaree SelectField (filters)
   ============================================================ */

interface FilterToolbarProps {
  searchValue: string;
  onSearchChange: (v: string) => void;
  filters: {
    reportType: string;
    status: string;
    priority: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
}

const REPORT_TYPES = [
  { value: "financial-blueprint", label: "Financial Blueprint" },
  { value: "comprehensive-plan",  label: "Comprehensive Financial Plan" },
  { value: "goal-progress",       label: "Goal Progress Report" },
  { value: "retirement-review",   label: "Retirement Review" },
  { value: "portfolio-review",    label: "Portfolio Review" },
  { value: "insurance-review",    label: "Insurance Review" },
  { value: "tax-planning",        label: "Tax Planning" },
  { value: "health-review",       label: "Financial Health Review" },
  { value: "meeting-summary",     label: "Meeting Summary" },
];

const STATUSES = QUEUE_STAGES.flatMap((stage) =>
  stage.statuses.map((status) => ({
    value: status,
    label: STATUS_LABELS[status],
  }))
);

const PRIORITIES = [
  { value: "high",   label: "High Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "low",    label: "Low Priority" },
];

export function FilterToolbar({
  searchValue,
  onSearchChange,
  filters,
  onFilterChange,
  onReset,
}: FilterToolbarProps) {
  const hasActiveFilters =
    searchValue !== "" ||
    filters.reportType !== "" ||
    filters.status !== "" ||
    filters.priority !== "";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Search — Fincaree Input with leading icon */}
      <div className="flex-1 min-w-[220px] max-w-xs">
        <Input
          size="sm"
          placeholder="Search clients, reports..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          leadingIcon={<Search size={14} strokeWidth={1.75} />}
          aria-label="Search reports"
        />
      </div>

      <div className="h-5 w-px bg-[var(--border-tertiary)]" />

      {/* Report Type filter — Fincaree SelectField (base-ui Select) */}
      <SelectField
        size="sm"
        placeholder="Report Type"
        value={filters.reportType || null}
        onValueChange={(v: unknown) => onFilterChange("reportType", (v as string) ?? "")}
        aria-label="Filter by report type"
      >
        {REPORT_TYPES.map((o) => (
          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
        ))}
      </SelectField>

      {/* Status filter */}
      <SelectField
        size="sm"
        placeholder="Status"
        value={filters.status || null}
        onValueChange={(v: unknown) => onFilterChange("status", (v as string) ?? "")}
        aria-label="Filter by status"
      >
        {STATUSES.map((o) => (
          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
        ))}
      </SelectField>

      {/* Priority filter */}
      <SelectField
        size="sm"
        placeholder="Priority"
        value={filters.priority || null}
        onValueChange={(v: unknown) => onFilterChange("priority", (v as string) ?? "")}
        aria-label="Filter by priority"
      >
        {PRIORITIES.map((o) => (
          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
        ))}
      </SelectField>

      {/* More Filters — Fincaree secondary Button */}
      <Button
        variant="secondary"
        size="sm"
        leadingIcon={<SlidersHorizontal size={14} strokeWidth={1.75} />}
      >
        More Filters
      </Button>

      {/* Reset — shown only when filters active */}
      {hasActiveFilters && (
        <Button
          variant="link-grey"
          size="sm"
          leadingIcon={<RotateCcw size={13} strokeWidth={2} />}
          onClick={onReset}
        >
          Reset
        </Button>
      )}
    </div>
  );
}
