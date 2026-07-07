'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from './nav-items'

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === '/dashboard'
            ? pathname === item.href
            : pathname.startsWith(item.href)
        const Icon = item.icon

        const content = (
          <>
            <span
              className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors',
                isActive
                  ? 'border-transparent bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground group-hover:text-foreground',
              )}
            >
              <Icon className="size-4.5" aria-hidden />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium leading-tight">
                {item.label}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {item.description}
              </span>
            </span>
          </>
        )

        if (!item.available) {
          return (
            <div
              key={item.href}
              className="group flex cursor-not-allowed items-center gap-3 rounded-xl px-2 py-2 opacity-55"
              aria-disabled
            >
              {content}
            </div>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors',
              isActive ? 'bg-secondary' : 'hover:bg-secondary/60',
            )}
          >
            {content}
          </Link>
        )
      })}
    </nav>
  )
}
