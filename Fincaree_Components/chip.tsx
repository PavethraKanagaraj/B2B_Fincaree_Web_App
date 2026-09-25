'use client'
import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
export type ChipSize='sm'|'md'|'lg'
export interface ChipProps extends React.HTMLAttributes<HTMLElement>{size?:ChipSize;selected?:boolean;defaultSelected?:boolean;onSelectChange?:(v:boolean)=>void;dot?:boolean;icon?:React.ReactNode;avatar?:React.ReactNode;onRemove?:()=>void;disabled?:boolean}
export const Chip=React.forwardRef<HTMLElement,ChipProps>(({size='md',selected:controlled,defaultSelected=false,onSelectChange,dot,icon,avatar,onRemove,disabled,className,children,...p},ref)=>{const [own,setOwn]=React.useState(defaultSelected);const selected=controlled??own;const toggle=()=>{if(disabled)return;const n=!selected;if(controlled===undefined)setOwn(n);onSelectChange?.(n)};const content=<>{dot&&<span className="fc-chip-dot"/>}{icon&&<span className="fc-chip-icon">{icon}</span>}{avatar&&<span className="fc-chip-avatar">{avatar}</span>}{children}</>;return onRemove?<div ref={ref as React.Ref<HTMLDivElement>} className={cn('fc-chip',`fc-chip-${size}`,className)} {...p}>{content}<button type="button" onClick={e=>{e.stopPropagation();onRemove()}} disabled={disabled} aria-label="Remove"><X/></button></div>:<button ref={ref as React.Ref<HTMLButtonElement>} type="button" className={cn('fc-chip',`fc-chip-${size}`,className)} disabled={disabled} aria-pressed={selected} onClick={toggle} {...p}>{content}</button>})
Chip.displayName='Chip'
