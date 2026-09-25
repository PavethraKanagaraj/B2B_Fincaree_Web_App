"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Calendar,
  FileText,
  Library,
  FlaskConical,
  Presentation,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/fincaree/tooltip";

const RAIL_WIDTH = 64;

/* ============================================================
   Fincaree Side Navigation
   Always a collapsed, icon-only rail — no expand/collapse toggle.
   Hover (or keyboard focus) an icon to preview its label as a
   tooltip popup. No submenus yet — every current item is a single
   page (see NavItem.subItems, reserved for when nested pages exist).
   ============================================================ */

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  /** Reserved for future nested pages — none exist yet. */
  subItems?: { label: string; href: string }[];
}

/* Icon language matches the rest of the app on purpose: simulations use
   the same FlaskConical and workshops the same Presentation as the
   Content Studio cards, so an icon means one thing everywhere. */
const navItems: NavItem[] = [
  { label: "Dashboard",     href: "/",                   icon: <LayoutDashboard size={18} strokeWidth={1.75} /> },
  { label: "Leads",         href: "/leads",              icon: <UserPlus size={18} strokeWidth={1.75} /> },
  { label: "Clients",       href: "/clients",            icon: <Users size={18} strokeWidth={1.75} /> },
  { label: "Meetings",      href: "/meetings",           icon: <Calendar size={18} strokeWidth={1.75} /> },
  { label: "Reports",       href: "/reports",            icon: <FileText size={18} strokeWidth={1.75} /> },
  { label: "Content",       href: "/client-suggestions", icon: <Library size={18} strokeWidth={1.75} /> },
  { label: "Simulations",   href: "/simulations",        icon: <FlaskConical size={18} strokeWidth={1.75} /> },
  { label: "Workshops",     href: "/workshops",          icon: <Presentation size={18} strokeWidth={1.75} /> },
  { label: "Opportunities", href: "/opportunities",      icon: <BarChart3 size={18} strokeWidth={1.75} /> },
];

function RailItem({
  href,
  label,
  icon,
  active,
  badge,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  badge?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link
            href={href}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-[var(--radius-lg)]",
              "transition-colors duration-100",
              active
                ? "bg-[var(--bg-brand-subtle)] text-[var(--icon-brand-primary)]"
                : "text-[var(--icon-tertiary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--icon-secondary)]"
            )}
          >
            {icon}
            {badge && (
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[var(--color-error-500)]" />
            )}
          </Link>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function SideNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav
      className="flex flex-col h-full bg-[var(--bg-primary)] border-r border-[var(--border-tertiary)]"
      style={{ width: RAIL_WIDTH }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-14 border-b border-[var(--border-tertiary)] shrink-0">
        <Tooltip>
          <TooltipTrigger
            render={
              <img
                src="/brand/logo.png"
                alt="Fincaree"
                width={36}
                height={36}
                style={{ display: 'block' }}
              />
            }
          />
          <TooltipContent>Fincaree — Advisor CRM</TooltipContent>
        </Tooltip>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-3">
        <ul className="flex flex-col items-center gap-0.5" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <RailItem
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={isActive(item.href)}
                badge={item.badge}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom: Finny AI + Plan + Settings */}
      <div className="border-t border-[var(--border-tertiary)] shrink-0 py-3 flex flex-col items-center gap-0.5">
<Tooltip>
          <TooltipTrigger
            render={
              <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--bg-brand-subtle)] border border-[var(--border-brand-secondary)] cursor-default">
                <Sparkles size={14} strokeWidth={2} className="text-[var(--icon-brand-primary)]" />
              </div>
            }
          />
          <TooltipContent>Platinum plan — valid till 24 May 2025</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Link
                href="/settings"
                aria-label="Settings"
                className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-lg)] text-[var(--icon-tertiary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--icon-secondary)] transition-colors"
              >
                <Settings size={18} strokeWidth={1.75} />
              </Link>
            }
          />
          <TooltipContent>Settings</TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
}
