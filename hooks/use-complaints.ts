'use client'

import { useCallback, useState } from 'react'
import type { Complaint } from '@/types'

export interface ComplaintInput {
  issueType: string
  location: string
  description: string
}

export function useComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([])

  const submitComplaint = useCallback((input: ComplaintInput) => {
    const complaint: Complaint = {
      id: `SBA-${Date.now().toString(36).toUpperCase()}`,
      issueType: input.issueType,
      location: input.location,
      description: input.description,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
    }
    setComplaints((prev) => [complaint, ...prev])
    return complaint
  }, [])

  return { complaints, submitComplaint }
}
