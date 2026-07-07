import type { LucideIcon } from 'lucide-react'

export function PageHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5.5" aria-hidden />
      </span>
      <div className="space-y-1">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      </div>
    </div>
  )
}
