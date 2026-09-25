'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { type InputTag } from './input'
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{label?:string;hint?:string;error?:string;required?:boolean;labelIcon?:React.ReactNode;tags?:InputTag[];onTagRemove?:(id:string)=>void}
export const Textarea=React.forwardRef<HTMLTextAreaElement,TextareaProps>(({label,hint,error,required,tags,onTagRemove,disabled,className,id,...p},ref)=>{const uid=React.useId(),textareaId=id??uid;return <div className="fc-input-root" data-error={!!error}>{label&&<label htmlFor={textareaId} className="fc-input-label">{label}{required&&'*'}</label>}<div className={cn('fc-textarea-field',className)}>{tags?.map(t=><span key={t.id} className="fc-input-tag">{t.label}{onTagRemove&&<button type="button" onClick={()=>onTagRemove(t.id)}>×</button>}</span>)}<textarea ref={ref} id={textareaId} className="fc-textarea-element" disabled={disabled} {...p}/></div>{(hint||error)&&<p>{error??hint}</p>}</div>});Textarea.displayName='Textarea'
