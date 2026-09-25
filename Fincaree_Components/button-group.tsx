'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { ButtonGroupItem,type ButtonGroupItemIconType } from './button-group-item'
export interface ButtonGroupOption{value:string;label?:string;icon?:React.ReactNode;iconType?:ButtonGroupItemIconType;disabled?:boolean;['aria-label']?:string}
export interface ButtonGroupProps{options:ButtonGroupOption[];value?:string;defaultValue?:string;onChange?:(v:string)=>void;disabled?:boolean;className?:string;['aria-label']?:string}
export const ButtonGroup=React.forwardRef<HTMLDivElement,ButtonGroupProps>(({options,value,defaultValue,onChange,disabled=false,className,'aria-label':label},ref)=>{const [current,setCurrent]=React.useState(defaultValue??'');const selected=value??current;return <div ref={ref} role="group" aria-label={label} className={cn('fc-btn-group',className)}>{options.map(o=><ButtonGroupItem key={o.value} {...o} isCurrent={selected===o.value} disabled={disabled||o.disabled} onClick={()=>{if(value===undefined)setCurrent(o.value);onChange?.(o.value)}}/>)}</div>})
ButtonGroup.displayName='ButtonGroup'
