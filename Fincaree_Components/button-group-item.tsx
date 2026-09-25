'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
export type ButtonGroupItemIconType='none'|'leading'|'dot'|'only'
export interface ButtonGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{label?:string;icon?:React.ReactNode;iconType?:ButtonGroupItemIconType;isCurrent?:boolean}
export const ButtonGroupItem=React.forwardRef<HTMLButtonElement,ButtonGroupItemProps>(({label,icon,iconType='none',isCurrent=false,className,...p},ref)=><button ref={ref} type="button" className={cn('fc-btn-group-item',iconType==='only'&&'fc-btn-group-item-icon-only',className)} data-current={isCurrent||undefined} aria-pressed={isCurrent} {...p}>{iconType==='leading'&&icon}<>{iconType==='dot'&&<span className="fc-btn-group-dot"/>}{iconType!=='only'&&label}{iconType==='only'&&icon}</></button>)
ButtonGroupItem.displayName='ButtonGroupItem'
