"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/fincaree/button";
import { ATTENTION_STATS } from "./data";
import { ArrowRight, FileText, Clock, AlertTriangle, Sparkles } from "lucide-react";

/* ============================================================
   Attention Row — 4 functional summary cards
   Purpose: Help advisor decide what to do next — NOT decoration.
   Visual emphasis: "Needs Review" card is strongest.
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
    id: "to-review",
    icon: <FileText size={18} strokeWidth={1.75} />,
    label: "Reports to Review",
    count: ATTENTION_STATS.toReview,
    supporting: "AI-generated reports awaiting your approval",
    cta: "View queue",
    emphasis: "default",
    detail: "2 due today · 1 blocking a meeting",
  },
  {
    id: "due-soon",
    icon: <Clock size={18} strokeWidth={1.75} />,
    label: "Due Soon",
    count: ATTENTION_STATS.dueSoon,
    supporting: "Reports to review before upcoming client meetings",
    cta: "Review now",
    emphasis: "strong",
    detail: "Next due: Today, 2:00 PM",
  },
  {
    id: "needs-attention",
    icon: <AlertTriangle size={18} strokeWidth={1.75} />,
    label: "Needs Attention",
    count: ATTENTION_STATS.needsAttention,
    supporting: "Reports with missing data or AI flags",
    cta: "Resolve",
    emphasis: "warning",
    detail: "2 data gaps · 1 assumption · 1 compliance",
  },
  {
    id: "ai-assistance",
    icon: <Sparkles size={18} strokeWidth={1.75} />,
    label: "AI Assistance",
    count: ATTENTION_STATS.aiAssistance,
    supporting: "Suggestions available across your reports",
    cta: "View",
    emphasis: "ai",
    detail: "2 assumptions to verify · 2 insights · 2 edits",
  },
];

const emphasisConfig = {
  default: {
    card:   "bg-[var(--bg-primary)] border border-[var(--border-tertiary)]",
    icon:   "bg-[var(--bg-secondary)] text-[var(--icon-tertiary)]",
    count:  "text-[var(--text-primary)]",
    cta:    "text-[var(--text-brand-primary)] hover:text-[var(--text-brand-primary)]",
    detail: "text-[var(--text-tertiary)]",
  },
  strong: {
    card:   "bg-[var(--bg-primary)] border-2 border-[var(--border-brand-primary)]",
    icon:   "bg-[var(--bg-brand-subtle)] text-[var(--icon-brand-primary)]",
    count:  "text-[var(--text-brand-primary)]",
    cta:    "text-[var(--text-brand-primary)] hover:text-[var(--text-brand-primary)]",
    detail: "text-[var(--text-status-warning)]",
  },
  warning: {
    card:   "bg-[var(--bg-primary)] border border-[var(--border-status-warning-subtle)]",
    icon:   "bg-[var(--bg-status-warning-subtle)] text-[var(--icon-status-warning)]",
    count:  "text-[var(--text-status-warning)]",
    cta:    "text-[var(--text-status-warning)] hover:text-[var(--text-status-warning)]",
    detail: "text-[var(--text-tertiary)]",
  },
  ai: {
    card:   "bg-[var(--bg-primary)] border border-[var(--border-tertiary)]",
    icon:   "bg-[var(--bg-brand-subtle)] text-[var(--icon-brand-primary)]",
    count:  "text-[var(--text-primary)]",
    cta:    "text-[var(--text-brand-primary)] hover:text-[var(--text-brand-primary)]",
    detail: "text-[var(--text-tertiary)]",
  },
};

interface AttentionRowProps {
  onCardClick?: (id: string) => void;
}

export function AttentionRow({ onCardClick }: AttentionRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const cfg = emphasisConfig[card.emphasis];
        return (
          <div
            key={card.id}
            className={cn(
              "rounded-[var(--radius-xl)] p-5",
              "transition-shadow hover:shadow-[var(--shadow-sm)]",
              cfg.card
            )}
          >
            {/* Icon + count row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className={cn("w-9 h-9 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0", cfg.icon)}>
                {card.icon}
              </span>
              <span className={cn("text-3xl font-bold leading-none tabular-nums mt-0.5", cfg.count)}>
                {card.count}
              </span>
            </div>

            {/* Label + supporting */}
            <div className="mb-3">
              <div className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
                {card.label}
              </div>
              <div className="text-xs text-[var(--text-tertiary)] mt-0.5 leading-snug">
                {card.supporting}
              </div>
            </div>

            {/* Detail hint */}
            {card.detail && (
              <div className={cn("text-xs leading-snug mb-3", cfg.detail)}>
                {card.detail}
              </div>
            )}

            {/* CTA — Fincaree Button (link-grey), colour set per emphasis */}
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
