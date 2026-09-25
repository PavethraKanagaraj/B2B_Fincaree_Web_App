"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/fincaree/avatar";
import { Badge } from "@/components/fincaree/badge";
import { Button } from "@/components/fincaree/button";
import { Tabs, TabsList, TabsTrigger, TabsPanel, TabsIndicator } from "@/components/fincaree/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/fincaree/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Report, STATUS_COLORS, STATUS_LABELS } from "./data";
import {
  X,
  MoreHorizontal,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Info,
  ExternalLink,
  Clock,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Square,
  Edit3,
  Trash2,
  Copy,
  FileDown,
  Archive,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ============================================================
   Report Drawer — Full right-side drawer
   Segments: Overview · AI Brief · Report · Client Info
   Opens when advisor clicks Review / row click
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

/** Map plan tier → Fincaree Badge color */
function planColor(plan: string): "brand" | "warning" | "gray" {
  if (plan === "Platinum") return "brand";
  if (plan === "Gold")     return "warning";
  return "gray";
}


/* ---- Sub-sections ---- */

function OverviewTab({ report }: { report: Report }) {
  return (
    <div className="space-y-5">
      {/* Context block */}
      <div className="pb-5 border-b border-[var(--border-tertiary)]">
        <div className="flex items-start gap-2.5 mb-2">
          <Sparkles size={14} strokeWidth={2} className="text-[var(--icon-brand-primary)] mt-0.5 shrink-0" />
          <span className="text-xs font-semibold text-[var(--text-brand-primary)] uppercase tracking-wider">
            Why you&apos;re seeing this
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          This report was generated because {report.client.name}&apos;s retirement goal was updated during the last review meeting.
        </p>
        <div className="mt-3 pt-3 border-t border-[var(--border-tertiary)] grid grid-cols-2 gap-3">
          <div>
            <div className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Trigger</div>
            <div className="text-xs text-[var(--text-secondary)]">Goal updated</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Generated</div>
            <div className="text-xs text-[var(--text-secondary)]">19 May 2025, 10:30 AM</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Related Goal</div>
            <div className="text-xs text-[var(--text-secondary)]">Retirement</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">AI Confidence</div>
            <div className="text-xs font-semibold text-[var(--text-primary)]">
              {report.aiConfidence}%
              <span className="text-[var(--text-tertiary)] font-normal ml-1">({report.confidenceLevel})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key AI Insights */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles size={13} strokeWidth={2} className="text-[var(--icon-brand-primary)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Key AI Insights</span>
          <span className="text-xs font-semibold text-[var(--text-brand-primary)] bg-[var(--bg-brand-subtle)] px-1.5 py-0.5 rounded-full">
            {report.aiFlags.length}
          </span>
        </div>
        {report.aiFlags.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">No AI flags on this report.</p>
        ) : (
          <div className="divide-y divide-[var(--border-tertiary)]">
            {report.aiFlags.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 -mx-5 px-5 py-3 group hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
              >
                <TrendingUp size={14} strokeWidth={2} className="text-[var(--icon-brand-primary)] mt-0.5 shrink-0" />
                <span className="text-sm text-[var(--text-secondary)] flex-1 leading-snug">{f.label}</span>
                <ChevronRight size={13} strokeWidth={2} className="text-[var(--icon-tertiary)] group-hover:text-[var(--icon-brand-primary)] transition-colors shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Required Actions */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Required Actions</h3>
        <div className="space-y-2">
          {["Verify latest income data", "Review retirement age assumption", "Check asset allocation recommendations"].map((action, i) => (
            <label key={i} className="flex items-start gap-2.5 cursor-pointer group">
              <Square size={16} strokeWidth={1.75} className="text-[var(--border-secondary)] group-hover:text-[var(--icon-brand-primary)] transition-colors mt-0.5 shrink-0" />
              <span className="text-sm text-[var(--text-secondary)] leading-snug group-hover:text-[var(--text-primary)] transition-colors">
                {action}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIBriefTab({ report }: { report: Report }) {
  return (
    <div className="space-y-5">
      {/* AI Review Assistant */}
      <div className="-mx-5 px-5 py-4 bg-[var(--bg-brand-subtle)]">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={14} strokeWidth={2} className="text-[var(--icon-brand-primary)]" />
          <span className="text-sm font-semibold text-[var(--text-brand-primary)]">AI Review Assistant</span>
        </div>
        <p className="text-xs text-[var(--text-tertiary)] mb-4">What the system found</p>

        {/* Summary */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1.5">Summary</div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Retirement readiness has improved compared with the previous plan. Projected corpus is 60% of target at current contribution rate.
          </p>
        </div>

        {/* Needs attention */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-[var(--text-status-error-strong)] uppercase tracking-wider mb-2">Needs your attention</div>
          <div className="space-y-1.5">
            {["Retirement age assumption changed", "Expected income growth is missing", "Insurance coverage data is 8 months old"].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <AlertCircle size={12} strokeWidth={2} className="text-[var(--text-status-error)] mt-0.5 shrink-0" />
                <span className="text-xs text-[var(--text-secondary)]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested checks */}
        <div>
          <div className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Suggested checks</div>
          <div className="space-y-1.5">
            {["Confirm retirement age", "Validate current income", "Confirm insurance policy details"].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={12} strokeWidth={2} className="text-[var(--text-status-success)] mt-0.5 shrink-0" />
                <span className="text-xs text-[var(--text-secondary)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles size={13} strokeWidth={2} className="text-[var(--icon-brand-primary)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">AI Suggestions</span>
        </div>
        <p className="text-xs text-[var(--text-tertiary)] mb-3 italic">
          These are AI-generated suggestions. The advisor remains the decision-maker.
        </p>
        <div className="space-y-3">
          <div>
            <div className="flex items-start gap-2 mb-2">
              <TrendingDown size={14} strokeWidth={2} className="text-[var(--text-status-warning)] mt-0.5 shrink-0" />
              <span className="text-sm font-semibold text-[var(--text-primary)]">Retirement contribution may need adjustment</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              Based on current goal timeline and projected corpus, the current contribution may fall short of the target.{" "}
              <em className="not-italic font-medium text-[var(--text-tertiary)]">Consider reviewing</em> the monthly SIP amount.
            </p>
            <Button variant="secondary" size="sm">Review calculation</Button>
          </div>
        </div>
      </div>

      {/* Data & Validation */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Data &amp; Validation</h3>
        <div className="divide-y divide-[var(--border-tertiary)]">
          <div className="flex items-start gap-3 py-3">
            <AlertTriangle size={14} strokeWidth={2} className="text-[var(--text-status-warning)] shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-xs font-semibold text-[var(--text-status-warning)] mb-0.5">Missing information</div>
              <p className="text-xs text-[var(--text-status-warning)]">Current monthly income not updated.</p>
              <Button variant="link-grey" size="sm" className="text-xs text-[var(--text-status-warning)] mt-1">
                Action: Request update →
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-3 py-3">
            <AlertTriangle size={14} strokeWidth={2} className="text-[var(--text-status-warning)] shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-xs font-semibold text-[var(--text-status-warning)] mb-0.5">Outdated information</div>
              <p className="text-xs text-[var(--text-status-warning)]">Insurance policy last updated 8 months ago.</p>
              <Button variant="link-grey" size="sm" className="text-xs text-[var(--text-status-warning)] mt-1">
                Action: Verify →
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-3 py-3">
            <CheckCircle2 size={14} strokeWidth={2} className="text-[var(--text-status-success)] shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-xs font-semibold text-[var(--text-status-success)] mb-0.5">Verified</div>
              <p className="text-xs text-[var(--text-status-success)]">Investment data synced on 18 May.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportTab() {
  // Base UI's ToggleGroup is array-valued even in single-select mode — each
  // recommendation gets a 0-or-1-item array holding "accept" | "reject".
  const [selection, setSelection] = useState<Record<number, string[]>>({});

  const recommendations = [
    "Increase monthly SIP by ₹10,000 to close the projected retirement gap.",
    "Review insurance coverage adequacy given recent life changes.",
    "Rebalance equity allocation to 60% given risk profile update.",
  ];

  return (
    <div className="space-y-5">
      {/* Financial Snapshot */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Financial Snapshot</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {[
            { label: "Net Worth",        value: "₹1.42 Cr" },
            { label: "Monthly Income",   value: "₹1,85,000" },
            { label: "Monthly Expenses", value: "₹92,000" },
            { label: "Investments",      value: "₹89 L" },
            { label: "Insurance",        value: "₹1.2 Cr cover" },
            { label: "Debt",             value: "₹18 L" },
          ].map((item) => (
            <div
              key={item.label}
              className="border-t border-[var(--border-tertiary)] pt-3"
            >
              <div className="text-xs text-[var(--text-tertiary)] mb-1">{item.label}</div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Goals</h3>
        <div className="divide-y divide-[var(--border-tertiary)]">
          {[
            { goal: "Retirement",     target: "₹3 Cr", projected: "₹1.8 Cr", gap: "₹1.2 Cr", gapBad: true },
            { goal: "Child Education",target: "₹45 L",  projected: "₹38 L",   gap: "₹7 L",    gapBad: true },
            { goal: "Emergency Fund", target: "₹6 L",   projected: "₹6.2 L",  gap: null,      gapBad: false },
          ].map((g) => (
            <div key={g.goal} className="-mx-5 px-5 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[var(--text-primary)]">{g.goal}</span>
                {g.gap && (
                  <span className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded-full",
                    g.gapBad ? "text-[var(--text-status-error-strong)] bg-[var(--bg-status-error-subtle)]" : "text-[var(--text-status-success)] bg-[var(--bg-status-success-subtle)]"
                  )}>
                    {g.gapBad ? "Gap: " : "Surplus: "}{g.gap}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-tertiary)]">
                <div>Target <span className="text-[var(--text-primary)] font-medium ml-1">{g.target}</span></div>
                <div>Projected <span className="text-[var(--text-primary)] font-medium ml-1">{g.projected}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">AI Recommendations</h3>
        <p className="text-xs text-[var(--text-tertiary)] mb-3 italic">Each recommendation is AI-suggested. Accept, edit, or reject before sharing.</p>
        <div className="divide-y divide-[var(--border-tertiary)]">
          {recommendations.map((rec, i) => {
            const picked = selection[i] ?? [];
            const accepted = picked.includes("accept");
            const rejected = picked.includes("reject");
            return (
              <div
                key={i}
                className={cn(
                  "-mx-5 px-5 py-3.5 transition-colors",
                  rejected
                    ? "bg-[var(--bg-status-error-subtle)] opacity-60"
                    : accepted
                    ? "bg-[var(--bg-status-success-subtle)]"
                    : ""
                )}
              >
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{rec}</p>
                <div className="flex items-center gap-2">
                  {/* shadcn ToggleGroup, adapted — Fincaree's Chip can't carry a
                      per-instance success/error color, so this is the correct
                      second-tier source (see design-system audit). */}
                  <ToggleGroup
                    value={picked}
                    onValueChange={(v) => setSelection((s) => ({ ...s, [i]: v }))}
                  >
                    <ToggleGroupItem value="accept" variant="success" aria-label="Accept recommendation">
                      <CheckCircle2 size={12} strokeWidth={2} />
                      Accept
                    </ToggleGroupItem>
                    <ToggleGroupItem value="reject" variant="destructive" aria-label="Reject recommendation">
                      <Trash2 size={12} strokeWidth={2} />
                      Reject
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <Button variant="secondary" size="sm" leadingIcon={<Edit3 size={12} strokeWidth={2} />}>
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ClientInfoTab({ report }: { report: Report }) {
  return (
    <div className="space-y-5">
      {/* Client context */}
      <div className="pb-5 border-b border-[var(--border-tertiary)]">
        <div className="flex items-center gap-3 mb-4">
          <Avatar size="lg" initials={initials(report.client.name)} />
          <div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">{report.client.name}</div>
            <div className="text-xs text-[var(--text-tertiary)]">{report.client.id}</div>
            <Badge color={planColor(report.client.plan)} size="sm" className="mt-1">
              {report.client.plan}
            </Badge>
          </div>
        </div>
        <div className="space-y-2.5 text-sm">
          {[
            { label: "Primary Goals",   value: "Retirement, Child Education" },
            { label: "Last Meeting",    value: "18 May 2025" },
            { label: "Next Meeting",    value: "22 May 2025" },
            { label: "Previous Report", value: "Financial Blueprint — Approved" },
          ].map((r) => (
            <div key={r.label} className="flex items-start gap-2 justify-between">
              <span className="text-[var(--text-tertiary)] shrink-0">{r.label}</span>
              <span className="text-[var(--text-primary)] font-medium text-right">{r.value}</span>
            </div>
          ))}
        </div>
        <Button
          variant="link-brand"
          size="sm"
          trailingIcon={<ExternalLink size={11} strokeWidth={2} />}
          className="mt-4 w-full justify-center text-xs"
        >
          View Client Profile
        </Button>
      </div>

      {/* Activity timeline */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Activity</h3>
        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--border-tertiary)]" />
          <div className="space-y-4">
            {[
              { time: "19 May · 10:30 AM", event: "AI generated report",                type: "ai" },
              { time: "19 May · 10:32 AM", event: "AI validation completed",             type: "ai" },
              { time: "19 May · 11:05 AM", event: "Advisor opened report",               type: "advisor" },
              { time: "19 May · 11:10 AM", event: "Advisor edited retirement assumption", type: "advisor" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 pl-1">
                <span className={cn(
                  "w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 relative z-10",
                  item.type === "ai"
                    ? "border-[var(--border-brand-tint)] bg-[var(--bg-brand-subtle)]"
                    : "border-[var(--border-secondary)] bg-[var(--bg-primary)]"
                )}>
                  {item.type === "ai"
                    ? <Sparkles size={9} strokeWidth={2} className="text-[var(--icon-brand-primary)]" />
                    : <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-grey-400)]" />
                  }
                </span>
                <div>
                  <div className="text-xs text-[var(--text-secondary)] leading-snug">{item.event}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Main Drawer ---- */
interface ReportDrawerProps {
  report: Report | null;
  onClose: () => void;
}

export function ReportDrawer({ report, onClose }: ReportDrawerProps) {
  const unresolvedCount = 2;

  // The parent nulls `report` the instant it closes, but Sheet's exit
  // animation needs content to animate against — keep the last real report
  // around through the close transition instead of unmounting to nothing.
  const [displayReport, setDisplayReport] = useState<Report | null>(null);
  useEffect(() => {
    if (report) setDisplayReport(report);
  }, [report]);

  const shown = displayReport;
  if (!shown) return null;

  return (
    <Sheet
      open={!!report}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent showCloseButton={false} aria-label={`${shown.reportName} — ${shown.client.name}`}>
        <SheetTitle className="sr-only">
          {shown.reportName} — {shown.client.name}
        </SheetTitle>
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-[var(--border-tertiary)] shrink-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <Avatar size="md" initials={initials(shown.client.name)} />
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">{shown.client.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Badge color={planColor(shown.client.plan)} size="sm">{shown.client.plan}</Badge>
                  <span className="text-xs text-[var(--text-tertiary)]">{shown.client.id}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
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
              <Button
                variant="tertiary"
                size="sm"
                iconOnly
                leadingIcon={<X size={15} strokeWidth={2} />}
                onClick={onClose}
                aria-label="Close drawer"
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="text-base font-semibold text-[var(--text-primary)] leading-snug mb-1">
              {shown.reportName}
            </div>
            <div className="flex items-center gap-2">
              <Badge color={STATUS_COLORS[shown.status] ?? "gray"} leadingIcon="dot" size="sm">
                {STATUS_LABELS[shown.status] ?? shown.status}
              </Badge>
              <span className="text-xs text-[var(--text-tertiary)]">{shown.reportCategory}</span>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              trailingIcon={<ChevronRight size={13} strokeWidth={2} />}
            >
              Open Report for Review
            </Button>
            <Button variant="secondary" size="sm">Request Client Data</Button>
          </div>

          {/* Urgent meeting banner */}
          {shown.meetingUrgency === "urgent" && (
            <div className="mt-3 -mx-5 px-5 py-2.5 flex items-start gap-2 bg-[var(--bg-status-error-subtle)]">
              <Clock size={13} strokeWidth={2} className="text-[var(--text-status-error)] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-[var(--text-status-error-strong)]">Review due today</div>
                <div className="text-xs text-[var(--text-status-error)]">
                  Please review and approve before 5:00 PM. Client meeting scheduled for tomorrow.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs — Fincaree Tabs composite (line style) */}
        <Tabs defaultValue="overview" style="line" className="flex flex-col flex-1 min-h-0">
          <div className="px-5 shrink-0 border-b border-[var(--border-tertiary)]">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ai-brief">AI Brief</TabsTrigger>
              <TabsTrigger value="report">Report</TabsTrigger>
              <TabsTrigger value="client-info">Client Info</TabsTrigger>
              <TabsIndicator />
            </TabsList>
          </div>

          {/* Scrollable tab content */}
          <TabsPanel value="overview"    className="flex-1 overflow-y-auto px-5 py-5">
            <OverviewTab report={shown} />
          </TabsPanel>
          <TabsPanel value="ai-brief"    className="flex-1 overflow-y-auto px-5 py-5">
            <AIBriefTab report={shown} />
          </TabsPanel>
          <TabsPanel value="report"      className="flex-1 overflow-y-auto px-5 py-5">
            <ReportTab />
          </TabsPanel>
          <TabsPanel value="client-info" className="flex-1 overflow-y-auto px-5 py-5">
            <ClientInfoTab report={shown} />
          </TabsPanel>
        </Tabs>

        {/* Sticky footer */}
        <div className="shrink-0 border-t border-[var(--border-tertiary)] px-5 py-4">
          {unresolvedCount > 0 && (
            <div className="flex items-center gap-2 mb-3 text-xs text-[var(--text-status-warning)]">
              <Info size={13} strokeWidth={2} className="text-[var(--text-status-warning)] shrink-0" />
              {unresolvedCount} items need your attention before this report can be approved.
            </div>
          )}
          <div className="flex items-center gap-2">
            <Button variant="primary" size="md" className="flex-1">
              Approve &amp; Continue
            </Button>
            <Button variant="secondary" size="md">Save Draft</Button>
            <Button
              variant="tertiary"
              size="md"
              color="destructive"
            >
              Request Revision
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
