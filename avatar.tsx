'use client'
// Figma: E3iIKwdE2far5TdrPYla2z  node: 9971:35607
// Page: Avatar
//
// Components:
//   Avatar          — single circular avatar (image / initials / placeholder)
//   AvatarGroup     — overlapping row of avatars with optional "+N" counter
//   AvatarLabelGroup — avatar + name + subtitle side-by-side
//   AvatarAddButton  — dashed "+" button for adding to a group

import * as React from 'react'
import { Plus, Check, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip'

// ── Types ─────────────────────────────────────────────────────────────────────

export type AvatarSize   = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

// ── Internal size helpers ─────────────────────────────────────────────────────

const sizeClass: Record<AvatarSize, string> = {
  xs:  'fc-avatar-xs',
  sm:  'fc-avatar-sm',
  md:  'fc-avatar-md',
  lg:  'fc-avatar-lg',
  xl:  'fc-avatar-xl',
  '2xl': 'fc-avatar-2xl',
}

// ── Avatar ────────────────────────────────────────────────────────────────────

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize
  /** Image src — renders an <img> filling the circle */
  src?: string
  /** Alt text for image; also used as tooltip */
  alt?: string
  /** Initials to display when no src (e.g. "OL") */
  initials?: string
  /** Status dot shown at bottom-right (requires wrapping in AvatarWrap) */
  status?: AvatarStatus
  /** Blue verified checkmark badge at bottom-right */
  verified?: boolean
  /** Clickable variant — tinted overlay on hover/active (e.g. "change photo") */
  interactive?: boolean
  className?: string
}

/**
 * Base circular avatar. Status dot and verified badge are rendered outside
 * the clipping circle via AvatarWrap (internal). For standalone use without
 * a status/badge, Avatar renders a plain <span>.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size = 'md', src, alt, initials, status, verified, interactive, className, children, ...props }, ref) => {
    const hasOverlay = Boolean(status || verified)

    const circle = (
      <span
        ref={hasOverlay ? undefined : ref}
        className={cn('fc-avatar', sizeClass[size], interactive && 'fc-avatar-interactive', className)}
        title={alt}
        {...(hasOverlay ? {} : props)}
      >
        {src ? (
          <img src={src} alt={alt ?? ''} className="fc-avatar-img" />
        ) : initials ? (
          <span className="fc-avatar-initials" aria-hidden="true">{initials}</span>
        ) : children ? (
          children
        ) : (
          <span className="fc-avatar-icon" aria-hidden="true">
            <User strokeWidth={1.5} />
          </span>
        )}
      </span>
    )

    if (!hasOverlay) return circle

    return (
      <span
        ref={ref}
        className={cn('fc-avatar-wrap', sizeClass[size])}
        {...props}
      >
        {circle}
        {status && (
          <span
            className={cn('fc-avatar-status', `fc-avatar-status-${status}`)}
            aria-label={status}
            role="img"
          />
        )}
        {verified && !status && (
          <span className="fc-avatar-verified" aria-label="Verified">
            <Check strokeWidth={3} />
          </span>
        )}
      </span>
    )
  }
)
Avatar.displayName = 'Avatar'

// ── AvatarGroup ───────────────────────────────────────────────────────────────

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number to show in the "+N more" overflow counter. Omit to hide. */
  overflow?: number
  /** Size applied to every avatar and the overflow counter */
  size?: AvatarSize
  /** Negative left margin applied to each avatar after the first (default -8px) */
  overlap?: number
  className?: string
  children?: React.ReactNode
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ overflow, size = 'md', overlap = -8, className, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('fc-avatar-group', className)}
        style={{ '--_av-group-offset': `${overlap}px`, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
        {overflow !== undefined && overflow > 0 && (
          <span
            className={cn('fc-avatar-more', sizeClass[size])}
            aria-label={`${overflow} more`}
          >
            +{overflow}
          </span>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'

// ── AvatarLabelGroup ──────────────────────────────────────────────────────────

export interface AvatarLabelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The Avatar element to render on the left */
  avatar: React.ReactNode
  /** Primary name text */
  name: string
  /** Secondary subtitle / email text */
  subtitle?: string
  className?: string
}

export const AvatarLabelGroup = React.forwardRef<HTMLDivElement, AvatarLabelGroupProps>(
  ({ avatar, name, subtitle, className, ...props }, ref) => (
    <div ref={ref} className={cn('fc-avatar-label-group', className)} {...props}>
      {avatar}
      <div className="fc-avatar-label-texts">
        <p className="fc-avatar-label-name">{name}</p>
        {subtitle && <p className="fc-avatar-label-sub">{subtitle}</p>}
      </div>
    </div>
  )
)
AvatarLabelGroup.displayName = 'AvatarLabelGroup'

// ── AvatarAddButton ───────────────────────────────────────────────────────────

export interface AvatarAddButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: AvatarSize
  /** Hover/focus label, shown via the shared Tooltip component */
  tooltip?: string
  className?: string
}

export const AvatarAddButton = React.forwardRef<HTMLButtonElement, AvatarAddButtonProps>(
  ({ size = 'md', tooltip, className, ...props }, ref) => {
    const button = (
      <button
        ref={ref}
        type="button"
        className={cn('fc-avatar-add-btn', sizeClass[size], className)}
        aria-label={tooltip ?? 'Add'}
        {...props}
      >
        <Plus strokeWidth={1.5} />
      </button>
    )

    if (!tooltip) return button

    return (
      <Tooltip>
        <TooltipTrigger render={button} />
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    )
  }
)
AvatarAddButton.displayName = 'AvatarAddButton'
