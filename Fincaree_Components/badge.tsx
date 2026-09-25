'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
export type BadgeSize='sm'|'md'|'lg';export type BadgeColor='gray'|'brand'|'error'|'warning'|'success'|'gray-blue'
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>{size?:BadgeSize;color?:BadgeColor;leadingIcon?:'dot'|React.ReactNode}
export const Badge=React.forwardRef<HTMLSpanElement,BadgeProps>(({size='md',color='gray',leadingIcon,className,children,...p},ref)=><span ref={ref} className={cn('fc-badge',`fc-badge-${size}`,`fc-badge-${color}`,className)} {...p}>{leadingIcon==='dot'?<span className="fc-badge-dot"/>:leadingIcon?<span className="fc-badge-icon">{leadingIcon}</span>:null}{children}</span>)
Badge.displayName='Badge'
