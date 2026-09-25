'use client'
import * as React from 'react'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { cn } from '@/lib/utils'
export type SwitchVariant='default'|'slim';export type SwitchSize='sm'|'md'
export interface SwitchProps extends React.ComponentProps<typeof BaseSwitch.Root>{variant?:SwitchVariant;size?:SwitchSize}
export const Switch=React.forwardRef<HTMLSpanElement,SwitchProps>(({variant='default',size='md',className,...p},ref)=><BaseSwitch.Root ref={ref} className={cn('fc-switch',`fc-switch-${variant}-${size}`,className)} {...p}><BaseSwitch.Thumb className="fc-switch-thumb"/></BaseSwitch.Root>);Switch.displayName='Switch'
