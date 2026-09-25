'use client'
import * as React from 'react'
import { Menu } from '@base-ui/react/menu'
import { ChevronDown,Check } from 'lucide-react'
import { cn } from '@/lib/utils'
export const DropdownMenu=Menu.Root;export const DropdownMenuGroup=Menu.Group
export const DropdownMenuTrigger=React.forwardRef<HTMLButtonElement,React.ComponentProps<typeof Menu.Trigger>&{icon?:React.ReactNode;showChevron?:boolean}>(({icon,showChevron=true,className,children,...p},ref)=><Menu.Trigger ref={ref} className={cn('fc-dropdown-trigger',className)} {...p}>{icon}{children}{showChevron&&<ChevronDown size={16}/>}</Menu.Trigger>)
export const DropdownMenuContent=React.forwardRef<HTMLDivElement,React.ComponentProps<typeof Menu.Popup>&{sideOffset?:number;alignment?:'start'|'center'|'end';side?:'top'|'right'|'bottom'|'left'}>(({sideOffset=4,alignment='start',side='bottom',className,children,...p},ref)=><Menu.Portal><Menu.Positioner sideOffset={sideOffset} align={alignment} side={side}><Menu.Popup ref={ref} className={cn('fc-dropdown-panel',className)} {...p}>{children}</Menu.Popup></Menu.Positioner></Menu.Portal>)
export const DropdownMenuItem=React.forwardRef<HTMLDivElement,React.ComponentProps<typeof Menu.Item>&{icon?:React.ReactNode;shortcut?:string}>(({icon,shortcut,className,children,...p},ref)=><Menu.Item ref={ref} className={cn('fc-dropdown-item',className)} {...p}>{icon}{children}{shortcut&&<span>{shortcut}</span>}</Menu.Item>)
export const DropdownMenuSeparator=Menu.Separator;export const DropdownMenuGroupLabel=Menu.GroupLabel
