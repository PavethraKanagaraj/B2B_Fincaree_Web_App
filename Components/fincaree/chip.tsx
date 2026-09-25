'use client'

/**
 * Fincaree Chip Component
 *
 * Figma source: E3iIKwdE2far5TdrPYla2z  node: 10259:8318
 * Page: Tags & Chips
 *
 * Variant    : Filter | Input | Assist  (semantic, no visual difference)
 * Content    : Label | Dot | Leading Icon | Leading Avatar | Trailing Close
 * Selection  : Default | Selected | Disabled
 * Size       : sm (18px) | md (24px) | lg (32px)
 *
 * API
 * ───
 * size            — sm | md | lg
 * selected        — controlled selected state (Filter / Assist variants)
 * defaultSelected — initial uncontrolled state
 * onSelectChange  — called with new selected value
 * dot             — shows a colored dot before the label
 * icon            — leading icon node
 * avatar          — leading avatar node (circular crop)
 * onRemove        — when provided, renders a trailing close button;
 *                   the chip root becomes a <div> to avoid nested <button>
 * disabled        — disables all interaction
 */

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────

export type ChipSize = 'sm' | 'md' | 'lg'

export interface ChipProps extends React.HTMLAttributes<HTMLElement> {
  size?: ChipSize
  /** Controlled selection state */
  selected?: boolean
  /** Uncontrolled initial selection state */
  defaultSelected?: boolean
  /** Called when selection toggles */
  onSelectChange?: (selected: boolean) => void
  /** Shows a colored dot before the label */
  dot?: boolean
  /** Leading icon node */
  icon?: React.ReactNode
  /** Leading avatar node (circular crop applied) */
  avatar?: React.ReactNode
  /**
   * When provided, renders a trailing close <button> and the chip root
   * becomes a <div> to avoid invalid nested-button HTML.
   */
  onRemove?: () => void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

// ── Close icon sizes ────────────────────────────────────────────────────────

const closeIconSize: Record<ChipSize, number> = { sm: 10, md: 12, lg: 14 }

// ── Component ──────────────────────────────────────────────────────────

export const Chip = React.forwardRef<HTMLElement, ChipProps>(
  (
    {
      size = 'md',
      selected: controlledSelected,
      defaultSelected = false,
      onSelectChange,
      dot,
      icon,
      avatar,
      onRemove,
      disabled,
      onClick,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledSelected !== undefined
    const [internalSelected, setInternalSelected] = React.useState(defaultSelected)
    const selected = isControlled ? controlledSelected : internalSelected

    function handleToggle(e: React.MouseEvent | React.KeyboardEvent) {
      if (disabled) return
      const next = !selected
      if (!isControlled) setInternalSelected(next)
      onSelectChange?.(next)
      if ('type' in e && e.type === 'click') {
        ;(onClick as React.MouseEventHandler<HTMLElement> | undefined)?.(
          e as React.MouseEvent<HTMLElement>
        )
      }
    }

    const sizeClass = `fc-chip-${size}`
    const sharedDataProps = {
      'data-selected': selected || undefined,
      'data-disabled': disabled || undefined,
    }

    const content = (
      <>
        {dot    && <span className="fc-chip-dot" aria-hidden="true" />}
        {icon   && <span className="fc-chip-icon" aria-hidden="true">{icon}</span>}
        {avatar && <span className="fc-chip-avatar" aria-hidden="true">{avatar}</span>}
        {children}
      </>
    )

    // Removable chip: div wrapper + close button (avoids nested <button>)
    if (onRemove) {
      const hasToggle = Boolean(onSelectChange || onClick)
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn('fc-chip', sizeClass, className)}
          role={hasToggle ? 'button' : undefined}
          tabIndex={hasToggle ? (disabled ? -1 : 0) : undefined}
          aria-pressed={hasToggle ? selected : undefined}
          onClick={hasToggle ? (handleToggle as React.MouseEventHandler<HTMLDivElement>) : undefined}
          onKeyDown={
            hasToggle
              ? (e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleToggle(e)
                  }
                }
              : undefined
          }
          {...sharedDataProps}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
          {content}
          <button
            type="button"
            className="fc-chip-close"
            disabled={disabled}
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            aria-label="Remove"
          >
            <X size={closeIconSize[size]} strokeWidth={1.5} />
          </button>
        </div>
      )
    }

    // Non-removable chip: semantic <button>
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={cn('fc-chip', sizeClass, className)}
        disabled={disabled}
        aria-pressed={selected}
        onClick={handleToggle as React.MouseEventHandler<HTMLButtonElement>}
        {...sharedDataProps}
        {...(props as React.HTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  }
)

Chip.displayName = 'Chip'
