'use client'
import * as React from 'react'
import { Check,X } from 'lucide-react'
import { cn } from '@/lib/utils'
export type TagColor='grey'|'brand'|'error'|'success'|'warning';export type TagSize='sm'|'md'|'lg'
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>{color?:TagColor;size?:TagSize;icon?:React.ReactNode;checked?:boolean;onCheckedChange?:(v:boolean)=>void;count?:number;onRemove?:()=>void;disabled?:boolean}
export const Tag=React.forwardRef<HTMLSpanElement,TagProps>(({color='grey',size='md',icon,checked,onCheckedChange,count,onRemove,disabled,className,children,...p},ref)=><span ref={ref} className={cn('fc-tag',`fc-tag-${size}`,`fc-tag-${color}`,className)} {...p}>{onCheckedChange&&<input type="checkbox" className="sr-only" checked={checked} disabled={disabled} onChange={e=>onCheckedChange(e.target.checked)}/>} {icon&&<span>{icon}</span>}{children}{count!==undefined&&<span>{count}</span>}{onRemove&&<button type="button" disabled={disabled} onClick={onRemove} aria-label="Remove"><X/></button>}</span>);Tag.displayName='Tag'
