import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Brand({ className, href = '/' }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn('flex items-center gap-2.5', className)}
      aria-label="Smart Bharat AI home"
    >
      <span
        aria-hidden
        className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-primary"
      >
        {/* Tricolor mark */}
        <span className="absolute inset-x-0 top-0 h-1/3 bg-primary" />
        <span className="absolute inset-0 top-1/3 h-1/3 bg-card" />
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-accent" />
        <span className="relative size-2.5 rounded-full ring-2 ring-[oklch(0.45_0.1_255)]" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-base font-semibold tracking-tight">
          Smart Bharat AI
        </span>
        <span className="text-[0.7rem] text-muted-foreground">
          Your civic companion
        </span>
      </span>
    </Link>
  )
}
