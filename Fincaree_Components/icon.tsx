import * as React from 'react'
import { type LucideIcon,type LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'
export const IconSize={xs:12,sm:16,md:20,lg:24,xl:32,'2xl':40} as const;export type IconSizeToken=keyof typeof IconSize
export const IconWeight={regular:1.5,bold:2} as const;export type IconWeightToken=keyof typeof IconWeight
export interface IconProps extends Omit<LucideProps,'size'|'strokeWidth'>{icon:LucideIcon;size?:IconSizeToken|number;weight?:IconWeightToken|number}
export const Icon=React.forwardRef<SVGSVGElement,IconProps>(({icon:Component,size='md',weight='regular',className,...p},ref)=><Component ref={ref} size={typeof size==='number'?size:IconSize[size]} strokeWidth={typeof weight==='number'?weight:IconWeight[weight]} className={cn(className)} {...p}/>);Icon.displayName='Icon'
export * from 'lucide-react'
