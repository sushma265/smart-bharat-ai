export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  hi: 'Hindi',
  te: 'Telugu',
}

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
  'Chandigarh',
  'Andaman and Nicobar Islands',
] as const

export const GENDERS = ['Male', 'Female', 'Other'] as const

export const INCOME_BANDS = [
  'Below ₹1,00,000',
  '₹1,00,000 – ₹2,50,000',
  '₹2,50,000 – ₹5,00,000',
  '₹5,00,000 – ₹8,00,000',
  'Above ₹8,00,000',
] as const

export const OCCUPATIONS = [
  'Student',
  'Farmer',
  'Daily wage worker',
  'Salaried employee',
  'Self-employed / Business',
  'Homemaker',
  'Unemployed',
  'Senior citizen / Retired',
  'Other',
] as const

export const SCHEME_CATEGORIES = [
  'Any',
  'Education',
  'Agriculture',
  'Health',
  'Housing',
  'Employment',
  'Women & Child',
  'Financial / Pension',
  'Startup / Business',
] as const

export const POPULAR_SERVICES = [
  'Apply for a new Passport',
  'Apply for a PAN card',
  'Update address in Aadhaar',
  'Apply for a Driving Licence',
  'Register a birth certificate',
  'Apply for a Voter ID (EPIC)',
  'File income tax return',
  'Apply for a Ration card',
] as const

export const ASSISTANT_SUGGESTIONS = [
  'How do I apply for a new passport?',
  'What documents do I need for a PAN card?',
  'How can I check my EPF balance?',
  'How do I link Aadhaar with my mobile number?',
] as const

export const ISSUE_TYPES = [
  'Road / Infrastructure',
  'Water Supply',
  'Electricity',
  'Sanitation / Garbage',
  'Public Transport',
  'Corruption / Malpractice',
  'Other',
] as const
