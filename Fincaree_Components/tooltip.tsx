'use client'
import * as React from 'react'
import { Tooltip as Primitive } from '@base-ui/react/tooltip'
import { cn } from '@/lib/utils'
export function Tooltip(p:Primitive.Root.Props){return <Primitive.Root {...p}/>}export function TooltipTrigger(p:Primitive.Trigger.Props){return <Primitive.Trigger {...p}/>}export function TooltipContent({className,side='right',sideOffset=8,children,...p}:Primitive.Popup.Props&Pick<Primitive.Positioner.Props,'side'|'sideOffset'>){return <Primitive.Portal><Primitive.Positioner side={side} sideOffset={sideOffset}><Primitive.Popup className={cn('z-[var(--z-tooltip)] rounded-[var(--radius-md)] px-2.5 py-1.5 bg-[var(--tooltip-bg)] text-[var(--tooltip-text)] text-xs font-medium',className)} {...p}>{children}</Primitive.Popup></Primitive.Positioner></Primitive.Portal>}
