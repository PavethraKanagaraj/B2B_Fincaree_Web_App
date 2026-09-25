"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/fincaree/button";
import { MEETING_ATTENTION_STATS } from "./data";
import { ArrowRight, CalendarClock, AlertTriangle, Clock, Sparkles } from "lucide-react";

/* ============================================================
   Attention Row — 4 functional summary cards.
   Same pattern as Report Queue's AttentionRow: help the advisor
   decide what to do next, not decoration.
   ============================================================ */

interface AttentionCard {
  id: string;
  icon: React.ReactNode;
  label: string;
  count: number;
  supporting: string;
  cta: string;
  emphasis: "default" | "strong" | "warning" | "ai";
  detail?: string;
}

const cards: AttentionCard[] = [
  {
    id: "today",
    icon: <CalendarClock size={18} strokeWidth={1.75} />,
    label: "Today's Meetings",
    count: MEETING_ATTENTION_STATS.today,
    supporting: "Meetings scheduled for today",
    cta: "View schedule",
    emphasis: "default",
    detail: "Next: Sanjay Patel, 3:00 PM",
  },
  {
    id: "needs-prep",
    icon: <AlertTriangle size={18} strokeWidth={1.75} />,
    label: "Needs Prep",
    count: MEETING_ATTENTION_STATS.needsPrep,
    supporting: "Meetings without a ready pre-meeting brief",
    cta: "Prepare now",
    emphasis: "strong",
    detail: "1 due today · 1 blocked on compliance",
  },
  {
    id: "follow-up-pending",
    icon: <Clock size={18} strokeWidth={1.75} />,
    label: "Follow-ups Pending",
    count: MEETING_ATTENTION_STATS.followUpsPending,
    supporting: "Completed meetings with open action items",
    cta: "Follow up",
    emphasis: "warning",
    detail: "Longest open: 13 days",
  },
  {
    id: "ai-assistance",
    icon: <Sparkles size={18} strokeWidth={1.75} />,
    label: "AI Assistance",
    count: MEETING_ATTENTION_STATS.aiAssistance,
    supporting: "Briefs with alerts or material suggestions ready",
    cta: "View",
    emphasis: "ai",
    detail: "Finny has prepared briefs for these meetings",
  },
];

const emphasisConfig = {
  default: {
    card: "bg-[var(--bg-primary)] border border-[var(--border-tertiary)]",
    icon: "bg-[var(--bg-secondary)] text-[var(--icon-tertiary)]",
    count: "text-[var(--text-primary)]",
    cta: "text-[var(--text-brand-primary)] hover:text-[var(--text-brand-primary)]",
    detail: "text-[var(--text-tertiary)]",
  },
  strong: {
    card: "bg-[var(--bg-primary)] border-2 border-[var(--border-brand-primary)]",
    icon: "bg-[var(--bg-brand-subtle)] text-[var(--icon-brand-primary)]",
    count: "text-[var(--text-brand-primary)]",
    cta: "text-[var(--text-brand-primary)] hover:text-[var(--text-brand-primary)]",
    detail: "text-[var(--text-status-warning)]",
  },
  warning: {
    card: "bg-[var(--bg-primary)] border border-[var(--border-status-warning-subtle)]",
    icon: "bg-[var(--bg-status-warning-subtle)] text-[var(--icon-status-warning)]",
    count: "text-[var(--text-status-warning)]",
    cta: "text-[var(--text-status-warning)] hover:text-[var(--text-status-warning)]",
    detail: "text-[var(--text-tertiary)]",
  },
  ai: {
    card: "bg-[var(--bg-primary)] border border-[var(--border-tertiary)]",
    icon: "bg-[var(--bg-brand-subtle)] text-[var(--icon-brand-primary)]",
    count: "text-[var(--text-primary)]",
    cta: "text-[var(--text-brand-primary)] hover:text-[var(--text-brand-primary)]",
    detail: "text-[var(--text-tertiary)]",
  },
};

interface MeetingAttentionRowProps {
  onCardClick?: (id: string) => void;
}

export function MeetingAttentionRow({ onCardClick }: MeetingAttentionRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const cfg = emphasisConfig[card.emphasis];
        return (
          <div
            key={card.id}
            className={cn("rounded-[var(--radius-xl)] p-5", "transition-shadow hover:shadow-[var(--shadow-sm)]", cfg.card)}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className={cn("w-9 h-9 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0", cfg.icon)}>
                {card.icon}
              </span>
              <span className={cn("text-3xl font-bold leading-none tabular-nums mt-0.5", cfg.count)}>
                {card.count}
              </span>
            </div>

            <div className="mb-3">
              <div className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{card.label}</div>
              <div className="text-xs text-[var(--text-tertiary)] mt-0.5 leading-snug">{card.supporting}</div>
            </div>

            {card.detail && (
              <div className={cn("text-xs leading-snug mb-3", cfg.detail)}>{card.detail}</div>
            )}

            <Button
              variant="link-grey"
              size="sm"
              trailingIcon={<ArrowRight size={12} strokeWidth={2.5} />}
              onClick={() => onCardClick?.(card.id)}
              className={cn("text-[12px] font-semibold", cfg.cta)}
            >
              {card.cta}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
