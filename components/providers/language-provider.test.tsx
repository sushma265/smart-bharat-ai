import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider, useLanguage } from '@/components/providers/language-provider'

function LanguageProbe() {
  const { language, setLanguage } = useLanguage()
  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <button onClick={() => setLanguage('hi')}>Switch to Hindi</button>
    </div>
  )
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('defaults to English when nothing is saved', () => {
    render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
  })

  it('switches language when setLanguage is called and persists it', () => {
    render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>,
    )

    act(() => {
      screen.getByText('Switch to Hindi').click()
    })

    expect(screen.getByTestId('current-language')).toHaveTextContent('hi')
    expect(window.localStorage.getItem('smart-bharat-language')).toBe('hi')
  })

  it('throws a clear error when useLanguage is used outside the provider', () => {
    const consoleError = console.error
    console.error = () => {}
    expect(() => render(<LanguageProbe />)).toThrow(
      'useLanguage must be used within a LanguageProvider',
    )
    console.error = consoleError
  })
})
