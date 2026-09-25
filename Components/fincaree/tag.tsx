'use client'

/**
 * Fincaree Tag Component
 *
 * Figma source: E3iIKwdE2far5TdrPYla2z
 *   Component set key: 2a33ba1ce8f963e7e172506f674be1d4aab6de29  (Tag)
 *   Component set key: 305c351cc5bb1eb2d8b729e304bdc1ab72db2ebe  (_Tag count)
 * Page: Tags & Chips
 *
 * Unlike Chip, Tag is a non-interactive label element (radius-sm rectangle).
 * Interactive sub-elements are opt-in via props:
 *
 *   _Tag checkbox  → checked / onCheckedChange
 *   _Tag close X   → onRemove
 *   _Tag count     → count
 *
 * Color  : grey | brand | error | success | warning
 * Size   : sm (22px) | md (24px) | lg (28px)
 */

import * as React from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────

export type TagColor = 'grey' | 'brand' | 'error' | 'success' | 'warning'
export type TagSize  = 'sm' | 'md' | 'lg'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color variant — maps to Figma Color property */
  color?: TagColor
  /** Size variant — maps to Figma Size property */
  size?: TagSize
  /** Leading icon node */
  icon?: React.ReactNode
  /**
   * _Tag checkbox: renders a native checkbox inside the tag.
   * Pair with onCheckedChange for controlled behavior.
   */
  checked?: boolean
  /** Called when the checkbox is toggled */
  onCheckedChange?: (checked: boolean) => void
  /**
   * _Tag count: renders a count pill at the trailing edge.
   * Pass a number to display (e.g. count={3} → "+3" or "3").
   */
  count?: number
  /**
   * _Tag close X: renders a trailing close button.
   * Called when the user clicks the × icon.
   */
  onRemove?: () => void
  /** Disables all interactive sub-elements */
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

// ── Close icon sizes ────────────────────────────────────────────────────────

const closeIconSize: Record<TagSize, number> = { sm: 10, md: 12, lg: 14 }

// ── Component ──────────────────────────────────────────────────────────

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      color = 'grey',
      size = 'md',
      icon,
      checked,
      onCheckedChange,
      count,
      onRemove,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'fc-tag',
          `fc-tag-${size}`,
          `fc-tag-${color}`,
          className
        )}
        data-disabled={disabled || undefined}
        {...props}
      >
        {/* _Tag checkbox — visually-hidden input + styled indicator, same
            pattern as Checkbox/Radio, so Default/Checked/Checked-Hover/
            Disabled/Focus can each carry their own Figma-specified color
            (a native input's single accent-color can't). */}
        {onCheckedChange !== undefined && (
          <span className="fc-tag-checkbox-wrap">
            <input
              type="checkbox"
              className="fc-tag-checkbox-input sr-only"
              checked={checked}
              disabled={disabled}
              onChange={(e) => onCheckedChange(e.target.checked)}
              aria-label="Select"
            />
            <span
              className="fc-tag-checkbox"
              data-state={checked ? 'checked' : 'unchecked'}
              data-disabled={disabled || undefined}
              aria-hidden="true"
            >
              {checked && <Check size={10} strokeWidth={2.5} />}
            </span>
          </span>
        )}

        {/* Leading icon */}
        {icon && (
          <span className="fc-tag-icon" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Label */}
        {children}

        {/* _Tag count */}
        {count !== undefined && (
          <span className="fc-tag-count" aria-label={`${count} items`}>
            {count}
          </span>
        )}

        {/* _Tag close X */}
        {onRemove && (
          <button
            type="button"
            className="fc-tag-close"
            disabled={disabled}
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            aria-label="Remove"
          >
            <X size={closeIconSize[size]} strokeWidth={1.5} />
          </button>
        )}
      </span>
    )
  }
)

Tag.displayName = 'Tag'
