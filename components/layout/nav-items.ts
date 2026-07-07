import {
  FileText,
  LayoutDashboard,
  MessageCircle,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  description: string
  icon: LucideIcon
  available: boolean
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Overview',
    description: 'Your civic companion home',
    icon: LayoutDashboard,
    available: true,
  },
  {
    href: '/dashboard/assistant',
    label: 'Civic Assistant',
    description: 'Ask anything about government services',
    icon: MessageCircle,
    available: true,
  },
  {
    href: '/dashboard/schemes',
    label: 'Scheme Finder',
    description: 'Find schemes you are eligible for',
    icon: Sparkles,
    available: true,
  },
  {
    href: '/dashboard/documents',
    label: 'Document Assistant',
    description: 'Step-by-step document guides',
    icon: FileText,
    available: true,
  },
  {
    href: '/dashboard/simplify',
    label: 'Notice Simplifier',
    description: 'Coming soon',
    icon: ScrollText,
    available: false,
  },
]
