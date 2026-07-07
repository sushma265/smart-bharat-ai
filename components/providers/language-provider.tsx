'use client'

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react'
import type { LanguageCode } from '@/lib/constants'

interface LanguageContextValue {
  language: LanguageCode
  setLanguage: (code: LanguageCode) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'smart-bharat-language'

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === 'en' || value === 'hi' || value === 'te'
}

// In-tab subscribers. The native `storage` event only fires in *other* tabs,
// so we notify same-tab listeners manually whenever `setLanguage` is called.
const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback()
  }
  window.addEventListener('storage', handleStorageEvent)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('storage', handleStorageEvent)
  }
}

function getSnapshot(): LanguageCode {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return isLanguageCode(saved) ? saved : 'en'
}

function getServerSnapshot(): LanguageCode {
  return 'en'
}

/**
 * Reads the saved language preference via `useSyncExternalStore` rather than
 * `useEffect` + `setState`. This renders the correct value on the client's
 * first paint (after hydration) without a synchronous setState-in-effect
 * cascade, and keeps every tab in sync.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLanguage = useCallback((code: LanguageCode) => {
    window.localStorage.setItem(STORAGE_KEY, code)
    for (const listener of listeners) listener()
  }, [])

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
