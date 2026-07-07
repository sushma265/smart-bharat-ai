import { describe, expect, it } from 'vitest'
import { documentRequestSchema, schemesRequestSchema } from '@/lib/validation'

describe('schemesRequestSchema', () => {
  it('accepts a valid citizen profile', () => {
    const result = schemesRequestSchema.safeParse({
      language: 'en',
      age: 34,
      gender: 'Female',
      occupation: 'Farmer',
      state: 'Andhra Pradesh',
      income: 'Below ₹1,00,000',
      category: 'Agriculture',
    })
    expect(result.success).toBe(true)
  })

  it('rejects an out-of-range age', () => {
    const result = schemesRequestSchema.safeParse({
      language: 'en',
      age: 250,
      gender: 'Male',
      occupation: 'Student',
      state: 'Kerala',
      income: 'Above ₹8,00,000',
      category: 'Education',
    })
    expect(result.success).toBe(false)
  })

  it('rejects an unsupported language code', () => {
    const result = schemesRequestSchema.safeParse({
      language: 'fr',
      age: 30,
      gender: 'Male',
      occupation: 'Student',
      state: 'Kerala',
      income: 'Above ₹8,00,000',
      category: 'Education',
    })
    expect(result.success).toBe(false)
  })
})

describe('documentRequestSchema', () => {
  it('rejects a service name that is too short', () => {
    const result = documentRequestSchema.safeParse({ language: 'en', serviceName: 'PA' })
    expect(result.success).toBe(false)
  })

  it('accepts a valid service name', () => {
    const result = documentRequestSchema.safeParse({
      language: 'hi',
      serviceName: 'Apply for a new Passport',
    })
    expect(result.success).toBe(true)
  })
})
