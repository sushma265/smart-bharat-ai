'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Brand } from './brand'
import { LanguageSwitcher } from './language-switcher'
import { SidebarNav } from './sidebar-nav'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Move focus into the drawer when it opens, and return it to the trigger on close.
  useEffect(() => {
    if (mobileOpen) {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus()
    } else {
      menuButtonRef.current?.focus()
    }
  }, [mobileOpen])

  // Close on Escape and trap Tab focus within the open drawer.
  useEffect(() => {
    if (!mobileOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (focusable.length === 0) return
      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  return (
    <div className="min-h-svh bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-border bg-sidebar px-4 py-5 lg:flex">
        <div className="px-1">
          <Brand />
        </div>
        <div className="mt-8 flex-1 overflow-y-auto">
          <SidebarNav />
        </div>
        <div className="mt-4 space-y-1.5 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
          <p>
            Information is AI-generated. Always confirm details on official
            government portals before acting.
          </p>
          <p>We don&apos;t store your personal details.</p>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar px-4 py-5 shadow-xl"
          >
            <div className="flex items-center justify-between px-1">
              <Brand />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-4" />
              </Button>
            </div>
            <div className="mt-8 flex-1 overflow-y-auto">
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-2">
            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="size-5" />
            </Button>
            <div className="lg:hidden">
              <Brand />
            </div>
          </div>
          <LanguageSwitcher />
        </header>
        <main className="mx-auto w-full max-w-5xl px-4 py-6 md:px-6 md:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}
