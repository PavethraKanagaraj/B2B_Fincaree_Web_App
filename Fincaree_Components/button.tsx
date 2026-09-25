'use client'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva,type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
export const buttonVariants=cva('fc-btn inline-flex items-center justify-center whitespace-nowrap font-medium leading-none',{variants:{variant:{primary:'fc-btn-primary',secondary:'fc-btn-secondary',tertiary:'fc-btn-tertiary','link-brand':'fc-btn-link-brand','link-grey':'fc-btn-link-grey'},color:{brand:'',destructive:'fc-btn-destructive'},size:{sm:'fc-btn-sm',md:'fc-btn-md',lg:'fc-btn-lg',xl:'fc-btn-xl'},iconOnly:{true:'fc-btn-icon-only',false:''}},defaultVariants:{variant:'primary',color:'brand',size:'md',iconOnly:false}})
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants>{loading?:boolean;leadingIcon?:React.ReactNode;trailingIcon?:React.ReactNode;asChild?:boolean}
export const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant,color,size,iconOnly,loading=false,disabled,leadingIcon,trailingIcon,asChild=false,children,...p},ref)=>{const C=asChild?Slot:'button';return <C ref={ref} className={cn(buttonVariants({variant,color,size,iconOnly}),className)} disabled={disabled||loading} aria-disabled={disabled||loading||undefined} data-loading={loading||undefined} {...p}>{loading?<Loader2 className="animate-spin"/>:<>{leadingIcon}{!iconOnly&&children}{trailingIcon}</>}</C>})
Button.displayName='Button'
