'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LANGUAGES, type LanguageCode } from '@/lib/constants'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Select value={language} onValueChange={(v) => setLanguage(v as LanguageCode)}>
      <SelectTrigger
        size="sm"
        className="gap-2"
        aria-label="Choose language"
      >
        <Globe className="size-4 text-muted-foreground" aria-hidden />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span>{lang.native}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
