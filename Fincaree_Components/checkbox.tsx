'use client'
import * as React from 'react'
import { Check,Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'size'|'type'>{indeterminate?:boolean;size?:'sm'|'md'}
export const Checkbox=React.forwardRef<HTMLInputElement,CheckboxProps>(({className,indeterminate=false,size='md',checked,disabled,...p},ref)=><label className={cn('fc-checkbox-root',className)}><input type="checkbox" ref={ref} checked={checked} disabled={disabled} className="sr-only" {...p}/><span className={cn('fc-checkbox-control',`fc-checkbox-${size}`)} data-state={indeterminate?'indeterminate':checked?'checked':'unchecked'}>{indeterminate?<Minus/>:checked?<Check/>:null}</span></label>)
Checkbox.displayName='Checkbox'
