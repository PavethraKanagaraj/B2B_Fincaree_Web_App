'use client'
// Figma: E3iIKwdE2far5TdrPYla2z  node: 9420:4201
// Page: Switch
// Type: Default | Slim   ×   Size: sm | md   ×   State (Default / Hover / Focus / Disabled)

import * as React from 'react'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

/** Default — standard height track. Slim — reduced height track. */
export type SwitchVariant = 'default' | 'slim'
export type SwitchSize    = 'sm' | 'md'

export interface SwitchProps
  extends React.ComponentProps<typeof BaseSwitch.Root> {
  variant?: SwitchVariant
  size?: SwitchSize
}

// ── Size → CSS class map ──────────────────────────────────────────────────────

const sizeClass: Record<SwitchVariant, Record<SwitchSize, string>> = {
  default: { sm: 'fc-switch-sm',      md: 'fc-switch-md'      },
  slim:    { sm: 'fc-switch-slim-sm', md: 'fc-switch-slim-md' },
}

// ── Component ─────────────────────────────────────────────────────────────────

export const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>(
  ({ variant = 'default', size = 'md', className, ...props }, ref) => (
    <BaseSwitch.Root
      ref={ref}
      className={cn('fc-switch', sizeClass[variant][size], className)}
      {...props}
    >
      <BaseSwitch.Thumb className="fc-switch-thumb" />
    </BaseSwitch.Root>
  )
)

Switch.displayName = 'Switch'
