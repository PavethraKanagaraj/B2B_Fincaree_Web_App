'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'size'|'type'>{size?:'sm'|'md'}
export const Radio=React.forwardRef<HTMLInputElement,RadioProps>(({className,size='md',checked,disabled,...p},ref)=><label className={cn('fc-checkbox-root',className)}><input type="radio" ref={ref} checked={checked} disabled={disabled} className="sr-only" {...p}/><span className={cn('fc-radio-control',`fc-radio-${size}`)} data-state={checked?'checked':'unchecked'}>{checked&&<span className="fc-radio-indicator"/>}</span></label>);Radio.displayName='Radio'
