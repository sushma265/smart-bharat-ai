import { render, screen } from '@testing-library/react'
import { Sparkles } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'
import { ErrorState } from '@/components/shared/error-state'
import { PageHeader } from '@/components/shared/page-header'
import { SchemeCard } from '@/components/schemes/scheme-card'
import type { Scheme } from '@/types'

describe('PageHeader', () => {
  it('renders without crashing and shows the title and description', () => {
    render(<PageHeader icon={Sparkles} title="Scheme Finder" description="Find schemes for you." />)
    expect(screen.getByText('Scheme Finder')).toBeInTheDocument()
    expect(screen.getByText('Find schemes for you.')).toBeInTheDocument()
  })
})

describe('ErrorState', () => {
  it('renders the message and calls onRetry when clicked', () => {
    const onRetry = vi.fn()
    render(<ErrorState message="Something went wrong." onRetry={onRetry} />)
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong.')
    screen.getByText('Try again').click()
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('renders without a retry button when onRetry is not provided', () => {
    render(<ErrorState message="No schemes matched your inputs." />)
    expect(screen.queryByText('Try again')).not.toBeInTheDocument()
  })
})

describe('SchemeCard', () => {
  const scheme: Scheme = {
    name: 'PM Kisan Samman Nidhi',
    ministry: 'Ministry of Agriculture',
    benefit: '₹6,000 per year in three instalments.',
    eligibility: ['Small and marginal farmers'],
    howToApply: 'Register on the PM-Kisan portal.',
    officialLink: 'https://pmkisan.gov.in',
    deadline: 'Rolling, no fixed deadline',
  }

  it('renders without crashing and shows the deadline when present', () => {
    render(<SchemeCard scheme={scheme} />)
    expect(screen.getByText('PM Kisan Samman Nidhi')).toBeInTheDocument()
    expect(screen.getByText('Rolling, no fixed deadline')).toBeInTheDocument()
  })

  it('does not render a deadline line when none is given', () => {
    render(<SchemeCard scheme={{ ...scheme, deadline: undefined }} />)
    expect(screen.queryByText('Rolling, no fixed deadline')).not.toBeInTheDocument()
  })
})
