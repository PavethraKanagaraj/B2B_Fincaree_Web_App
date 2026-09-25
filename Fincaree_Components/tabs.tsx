'use client'
import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from '@/lib/utils'
const Style=React.createContext<'pill'|'line'>('pill')
export interface TabsProps extends React.ComponentProps<typeof BaseTabs.Root>{style?:'pill'|'line'}
export const Tabs=React.forwardRef<HTMLDivElement,TabsProps>(({style='pill',className,children,...p},ref)=><Style.Provider value={style}><BaseTabs.Root ref={ref} className={cn('fc-tabs-root',className)} {...p}>{children}</BaseTabs.Root></Style.Provider>);Tabs.displayName='Tabs'
export const TabsList=React.forwardRef<HTMLDivElement,React.ComponentProps<typeof BaseTabs.List>&{style?:'pill'|'line'}>(({style:own,className,children,...p},ref)=>{const style=own??React.useContext(Style);return <Style.Provider value={style}><BaseTabs.List ref={ref} className={cn('fc-tabs-list',`fc-tabs-list-${style}`,className)} {...p}>{children}</BaseTabs.List></Style.Provider>});TabsList.displayName='TabsList'
export const TabsTrigger=React.forwardRef<HTMLButtonElement,React.ComponentProps<typeof BaseTabs.Tab>>(({className,...p},ref)=><BaseTabs.Tab ref={ref} className={cn('fc-tabs-trigger',className)} {...p}/>);TabsTrigger.displayName='TabsTrigger'
export const TabsIndicator=BaseTabs.Indicator;export const TabsPanel=BaseTabs.Panel
