'use client'

/**
 * Fincaree Checkbox Component
 *
 * Figma source: E3iIKwdE2far5TdrPYla2z  node: 10066:970
 * Variants: size (sm / md), checked, indeterminate, disabled
 * States are handled via CSS data attributes — no inline styles.
 */

import * as React from 'react'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  indeterminate?: boolean
  size?: 'sm' | 'md'
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      indeterminate = false,
      size = 'md',
      checked,
      disabled,
      ...props
    },
    ref
  ) => {
    const handleRef = (el: HTMLInputElement | null) => {
      if (el) el.indeterminate = Boolean(indeterminate)
      if (typeof ref === 'function') ref(el)
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el
    }

    const state = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'
    const iconSize = size === 'sm' ? 10 : 12

    return (
      <label className={cn('fc-checkbox-root', className)}>
        <input
          type="checkbox"
          ref={handleRef}
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <span
          className={cn('fc-checkbox-control', `fc-checkbox-${size}`)}
          data-state={state}
          data-disabled={disabled || undefined}
          aria-hidden="true"
        >
          {state === 'checked' && (
            <Check size={iconSize} strokeWidth={2.5} />
          )}
          {state === 'indeterminate' && (
            <Minus size={iconSize} strokeWidth={2.5} />
          )}
        </span>
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
