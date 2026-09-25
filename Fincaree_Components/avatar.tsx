'use client'
import * as React from 'react'
import { Plus, Check, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip'
export type AvatarSize='xs'|'sm'|'md'|'lg'|'xl'|'2xl'
export type AvatarStatus='online'|'offline'|'away'|'busy'
const sizeClass:Record<AvatarSize,string>={xs:'fc-avatar-xs',sm:'fc-avatar-sm',md:'fc-avatar-md',lg:'fc-avatar-lg',xl:'fc-avatar-xl','2xl':'fc-avatar-2xl'}
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement>{size?:AvatarSize;src?:string;alt?:string;initials?:string;status?:AvatarStatus;verified?:boolean;interactive?:boolean}
export const Avatar=React.forwardRef<HTMLSpanElement,AvatarProps>(({size='md',src,alt,initials,status,verified,interactive,className,children,...props},ref)=>{const circle=<span className={cn('fc-avatar',sizeClass[size],interactive&&'fc-avatar-interactive',className)} title={alt}>{src?<img src={src} alt={alt??''} className="fc-avatar-img"/>:initials?<span className="fc-avatar-initials" aria-hidden="true">{initials}</span>:children??<span className="fc-avatar-icon"><User strokeWidth={1.5}/></span>}</span>;return status||verified?<span ref={ref} className={cn('fc-avatar-wrap',sizeClass[size])} {...props}>{circle}{status&&<span className={cn('fc-avatar-status',`fc-avatar-status-${status}`)} aria-label={status} role="img"/>}{verified&&!status&&<span className="fc-avatar-verified" aria-label="Verified"><Check strokeWidth={3}/></span>}</span>:React.cloneElement(circle,{ref,...props})})
Avatar.displayName='Avatar'
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement>{overflow?:number;size?:AvatarSize;overlap?:number}
export const AvatarGroup=React.forwardRef<HTMLDivElement,AvatarGroupProps>(({overflow,size='md',overlap=-8,className,children,style,...props},ref)=><div ref={ref} className={cn('fc-avatar-group',className)} style={{'--_av-group-offset':`${overlap}px`,...style} as React.CSSProperties} {...props}>{children}{overflow!==undefined&&overflow>0&&<span className={cn('fc-avatar-more',sizeClass[size])}>+{overflow}</span>}</div>)
AvatarGroup.displayName='AvatarGroup'
export interface AvatarLabelGroupProps extends React.HTMLAttributes<HTMLDivElement>{avatar:React.ReactNode;name:string;subtitle?:string}
export const AvatarLabelGroup=React.forwardRef<HTMLDivElement,AvatarLabelGroupProps>(({avatar,name,subtitle,className,...p},ref)=><div ref={ref} className={cn('fc-avatar-label-group',className)} {...p}>{avatar}<div className="fc-avatar-label-texts"><p className="fc-avatar-label-name">{name}</p>{subtitle&&<p className="fc-avatar-label-sub">{subtitle}</p>}</div></div>)
AvatarLabelGroup.displayName='AvatarLabelGroup'
export interface AvatarAddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{size?:AvatarSize;tooltip?:string}
export const AvatarAddButton=React.forwardRef<HTMLButtonElement,AvatarAddButtonProps>(({size='md',tooltip,className,...p},ref)=>{const b=<button ref={ref} type="button" className={cn('fc-avatar-add-btn',sizeClass[size],className)} aria-label={tooltip??'Add'} {...p}><Plus strokeWidth={1.5}/></button>;return tooltip?<Tooltip><TooltipTrigger render={b}/><TooltipContent>{tooltip}</TooltipContent></Tooltip>:b})
AvatarAddButton.displayName='AvatarAddButton'
