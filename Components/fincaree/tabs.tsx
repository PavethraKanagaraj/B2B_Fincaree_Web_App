'use client'
// Figma: E3iIKwdE2far5TdrPYla2z  node: 10390:14617
// Page: Tabs
// Style: Pill | Line   ×   Orientation: Horizontal | Vertical
//
// Components: TabsTrigger, TabsList, Tabs (composite)
// Built on @base-ui/react/tabs

import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from '@/lib/utils'

// ── Style context ─────────────────────────────────────────────────────────
// Passed from TabsList → TabsTrigger so consumers don't repeat the style prop.

type TabsStyle = 'pill' | 'line'

const TabsStyleContext = React.createContext<TabsStyle>('pill')

// ── Tabs (Root) ──────────────────────────────────────────────────────────

export interface TabsProps extends React.ComponentProps<typeof BaseTabs.Root> {
  /** Figma: Style — 'pill' (rounded card) or 'line' (underline indicator) */
  style?: TabsStyle
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ style = 'pill', className, children, ...props }, ref) => (
    <TabsStyleContext.Provider value={style}>
      <BaseTabs.Root
        ref={ref}
        className={cn('fc-tabs-root', className)}
        {...props}
      >
        {children}
      </BaseTabs.Root>
    </TabsStyleContext.Provider>
  )
)
Tabs.displayName = 'Tabs'

// ── TabsList ───────────────────────────────────────────────────────────

export interface TabsListProps extends React.ComponentProps<typeof BaseTabs.List> {
  /** Overrides the style from the parent <Tabs> if needed */
  style?: TabsStyle
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ style: styleProp, className, children, ...props }, ref) => {
    const ctxStyle = React.useContext(TabsStyleContext)
    const style    = styleProp ?? ctxStyle

    return (
      <TabsStyleContext.Provider value={style}>
        <BaseTabs.List
          ref={ref}
          className={cn(
            'fc-tabs-list',
            style === 'pill' ? 'fc-tabs-list-pill' : 'fc-tabs-list-line',
            className
          )}
          {...props}
        >
          {children}
        </BaseTabs.List>
      </TabsStyleContext.Provider>
    )
  }
)
TabsList.displayName = 'TabsList'

// ── TabsTrigger ──────────────────────────────────────────────────────────

export interface TabsTriggerProps extends React.ComponentProps<typeof BaseTabs.Tab> {
  /** Leading icon node */
  icon?: React.ReactNode
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ icon, className, children, ...props }, ref) => {
    const style = React.useContext(TabsStyleContext)

    return (
      <BaseTabs.Tab
        ref={ref}
        className={cn(
          'fc-tabs-trigger',
          style === 'pill' ? 'fc-tabs-trigger-pill' : 'fc-tabs-trigger-line',
          className
        )}
        {...props}
      >
        {icon && <span className="fc-tabs-trigger-icon" aria-hidden="true">{icon}</span>}
        {children}
      </BaseTabs.Tab>
    )
  }
)
TabsTrigger.displayName = 'TabsTrigger'

// ── TabsIndicator ─────────────────────────────────────────────────────────
// Used with Line style only. Place as the last child of <TabsList>.
// @base-ui/react sets --active-tab-left + --active-tab-width (horizontal) or
// --active-tab-top + --active-tab-height (vertical) as inline CSS vars.

export const TabsIndicator = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<typeof BaseTabs.Indicator>
>(({ className, ...props }, ref) => (
  <BaseTabs.Indicator
    ref={ref}
    className={cn('fc-tabs-indicator', className)}
    {...props}
  />
))
TabsIndicator.displayName = 'TabsIndicator'

// ── TabsPanel ──────────────────────────────────────────────────────────

export const TabsPanel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseTabs.Panel>
>(({ className, ...props }, ref) => (
  <BaseTabs.Panel
    ref={ref}
    className={cn('fc-tabs-panel', className)}
    {...props}
  />
))
TabsPanel.displayName = 'TabsPanel'
