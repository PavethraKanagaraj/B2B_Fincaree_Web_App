'use client'

/**
 * Fincaree Input Field Component
 *
 * Figma source: E3iIKwdE2far5TdrPYla2z  node: 9971:15525
 * Page: Input
 *
 * Sizes    (Figma: Size)        : sm | md
 * Types    (Figma: Type)        :
 *   default          — plain text input with optional icons
 *   leading-addon    — grey addon area on the left  (leading text, leading dropdown)
 *   trailing-addon   — grey addon area on the right (trailing dropdown, trailing button)
 *   tags             — tag chips rendered inside the field
 *
 * Destructive (Figma: Destructive=True) : error prop
 * Status  (Figma: Warning / Success)    : status prop — ignored while error is set
 * States — handled by CSS :focus-within, :disabled, :has(), [data-error], [data-status], [data-disabled]
 *
 * API cheat-sheet
 * ───────────────
 * leadingIcon   — icon rendered inside the field on the left (no bg, no divider)
 * trailingIcon  — icon rendered inside the field on the right
 * leadingAddon  — ReactNode in the grey attachment zone on the left  (leadingText / dropdown)
 * trailingAddon — ReactNode in the grey attachment zone on the right (trailingText / button)
 * tags          — when provided, renders tag chips; pass [] to show empty tag input
 * onTagRemove   — called with tag id when the × button is clicked
 * labelIcon     — optional icon after the label (e.g. tooltip trigger)
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

// ── Shared tag type ────────────────────────────────────────────────────────

export interface InputTag {
  id: string
  label: string
  icon?: React.ReactNode
}

// ── Props ────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible field label */
  label?: string
  /** Helper text shown below the field */
  hint?: string
  /** Error message — activates destructive/error state */
  error?: string
  /** Non-blocking status border/icon/focus-halo. Ignored while `error` is set. */
  status?: 'warning' | 'success'
  /** Shows a red asterisk next to the label */
  required?: boolean
  /** Maps to Figma Size property */
  size?: 'sm' | 'md'
  /** Icon inside the left edge of the field (no grey bg) */
  leadingIcon?: React.ReactNode
  /** Icon inside the right edge of the field (no grey bg) */
  trailingIcon?: React.ReactNode
  /** Grey attachment area on the left — use for leading text / dropdown trigger */
  leadingAddon?: React.ReactNode
  /** Grey attachment area on the right — use for trailing text / button / dropdown */
  trailingAddon?: React.ReactNode
  /** Optional adornment rendered after the label (e.g. tooltip icon) */
  labelIcon?: React.ReactNode
  /** Tag chips rendered inside the field (Type=Tags) */
  tags?: InputTag[]
  /** Called with the removed tag's id */
  onTagRemove?: (id: string) => void
}

// ── Component ──────────────────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      status,
      required,
      size = 'md',
      leadingIcon,
      trailingIcon,
      leadingAddon,
      trailingAddon,
      labelIcon,
      tags,
      onTagRemove,
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const uid = React.useId()
    const inputId = id ?? uid
    const hintId = `${inputId}-hint`
    const isError = Boolean(error)
    // error takes precedence — a field can't be both invalid and "looking good"
    const activeStatus = isError ? undefined : status
    const hasTags = tags !== undefined

    return (
      <div
        className="fc-input-root"
        data-error={isError || undefined}
        data-status={activeStatus}
        data-disabled={disabled || undefined}
      >
        {/* Label row */}
        {label && (
          <div className="fc-input-label-row">
            <label htmlFor={inputId} className="fc-input-label">
              {label}
            </label>
            {required && (
              <span className="fc-input-required" aria-hidden="true">*</span>
            )}
            {labelIcon && (
              <span className="fc-input-icon" style={{ color: 'var(--input-icon)' }}>
                {labelIcon}
              </span>
            )}
          </div>
        )}

        {/* Bordered field container */}
        <div
          className={cn(
            'fc-input-field',
            size === 'sm' ? 'fc-input-field-sm' : 'fc-input-field-md',
            className
          )}
          data-error={isError || undefined}
          data-status={activeStatus}
          data-disabled={disabled || undefined}
        >
          {/* Leading addon (grey bg + right divider) */}
          {leadingAddon && (
            <div className="fc-input-addon fc-input-addon-leading">
              {leadingAddon}
            </div>
          )}

          {/* Leading icon (inside field, no bg) */}
          {leadingIcon && !hasTags && (
            <span className="fc-input-icon fc-input-icon-leading" aria-hidden="true">
              {leadingIcon}
            </span>
          )}

          {/* Tags variant */}
          {hasTags ? (
            <div className="fc-input-tags-row">
              {tags!.map((tag) => (
                <span key={tag.id} className="fc-input-tag">
                  {tag.icon && (
                    <span aria-hidden="true">{tag.icon}</span>
                  )}
                  {tag.label}
                  {onTagRemove && (
                    <button
                      type="button"
                      className="fc-input-tag-remove"
                      onClick={() => onTagRemove(tag.id)}
                      aria-label={`Remove ${tag.label}`}
                      tabIndex={-1}
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
              <input
                ref={ref}
                id={inputId}
                className="fc-input-element"
                disabled={disabled}
                aria-describedby={hint || error ? hintId : undefined}
                aria-invalid={isError || undefined}
                aria-required={required || undefined}
                {...props}
              />
            </div>
          ) : (
            /* Standard input */
            <input
              ref={ref}
              id={inputId}
              className="fc-input-element"
              disabled={disabled}
              aria-describedby={hint || error ? hintId : undefined}
              aria-invalid={isError || undefined}
              aria-required={required || undefined}
              {...props}
            />
          )}

          {/* Trailing icon (inside field, no bg) */}
          {trailingIcon && (
            <span className="fc-input-icon fc-input-icon-trailing" aria-hidden="true">
              {trailingIcon}
            </span>
          )}

          {/* Trailing addon (grey bg + left divider) */}
          {trailingAddon && (
            <div className="fc-input-addon fc-input-addon-trailing">
              {trailingAddon}
            </div>
          )}
        </div>

        {/* Hint / error message */}
        {(hint || error) && (
          <p id={hintId} className="fc-input-hint">
            {error ?? hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
