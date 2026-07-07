import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { NAV_ITEMS } from '@/components/layout/nav-items'
import { Card, CardContent } from '@/components/ui/card'

export default function DashboardHome() {
  const features = NAV_ITEMS.filter((item) => item.href !== '/dashboard')

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Namaste! How can I help you today?
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
          Choose a tool below to get started. Everything is explained in simple
          language, and you can switch between English, Hindi, and Telugu
          anytime from the top bar.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((item) => {
          const Icon = item.icon
          const card = (
            <Card className="h-full transition-colors hover:bg-secondary/40">
              <CardContent className="flex h-full items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5.5" aria-hidden />
                </span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-medium">{item.label}</h2>
                    {!item.available && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {item.available && (
                  <ArrowRight
                    className="mt-1 size-4 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                )}
              </CardContent>
            </Card>
          )

          if (!item.available) {
            return (
              <div key={item.href} className="cursor-not-allowed opacity-60">
                {card}
              </div>
            )
          }
          return (
            <Link key={item.href} href={item.href} className="block">
              {card}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
