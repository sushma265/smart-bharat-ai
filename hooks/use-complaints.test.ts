import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useComplaints } from '@/hooks/use-complaints'

describe('useComplaints', () => {
  it('starts with an empty list', () => {
    const { result } = renderHook(() => useComplaints())
    expect(result.current.complaints).toHaveLength(0)
  })

  it('adds a new complaint with Submitted status and a generated id', () => {
    const { result } = renderHook(() => useComplaints())

    act(() => {
      result.current.submitComplaint({
        issueType: 'Water Supply',
        location: 'MG Road, Vijayawada',
        description: 'No water supply for three days.',
      })
    })

    expect(result.current.complaints).toHaveLength(1)
    expect(result.current.complaints[0]?.status).toBe('Submitted')
    expect(result.current.complaints[0]?.id).toMatch(/^SBA-/)
  })

  it('prepends new complaints so the most recent appears first', () => {
    const { result } = renderHook(() => useComplaints())

    act(() => {
      result.current.submitComplaint({
        issueType: 'Road / Infrastructure',
        location: 'First location',
        description: 'First report description.',
      })
    })
    act(() => {
      result.current.submitComplaint({
        issueType: 'Electricity',
        location: 'Second location',
        description: 'Second report description.',
      })
    })

    expect(result.current.complaints[0]?.location).toBe('Second location')
    expect(result.current.complaints[1]?.location).toBe('First location')
  })
})
