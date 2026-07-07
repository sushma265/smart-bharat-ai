import { ArrowRight, FileText, MessageCircle, ScrollText, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Brand } from '@/components/layout/brand'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const FEATURES = [
  {
    icon: MessageCircle,
    title: 'AI Civic Assistant',
    body: 'Ask anything about passports, Aadhaar, taxes, or licences and get simple, plain-language answers.',
    available: true,
  },
  {
    icon: Sparkles,
    title: 'Scheme Finder',
    body: 'Tell us about yourself and discover the government schemes you may be eligible for.',
    available: true,
  },
  {
    icon: FileText,
    title: 'Document Assistant',
    body: 'Get step-by-step checklists of documents, fees, and timelines for any service.',
    available: true,
  },
  {
    icon: ScrollText,
    title: 'Notice Simplifier',
    body: 'Paste a confusing government notice and get a clear summary of what to do next.',
    available: false,
  },
]

const STATS = [
  { value: '12+', label: 'Government schemes indexed' },
  { value: '3', label: 'Languages supported' },
  { value: '4', label: 'Core civic tools' },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Brand href="/" />
        <Button render={<Link href="/dashboard" />}>
          Open app
          <ArrowRight className="size-4" data-icon="inline-end" />
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" />
              Built for every Indian citizen
            </span>
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
              Government services, finally explained in your language.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
              Smart Bharat AI is your friendly civic companion. Understand
              schemes, documents, and public services in simple English,
              हिन्दी, or తెలుగు — no jargon, no confusion.
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
              Millions of Indians miss out on benefits they qualify for
              simply because the process is confusing. Smart Bharat AI
              closes that gap — explaining schemes, paperwork, and process
              in plain language, in the language you&apos;re most comfortable in.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" render={<Link href="/dashboard" />}>
                Get started
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/dashboard/assistant" />}
              >
                Try the assistant
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl ring-1 ring-foreground/10">
              <Image
                src="/hero-civic.webp"
                alt="Illustration of Indian citizens in front of a government building"
                width={720}
                height={560}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-4 md:px-6">
          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card px-4 py-5 md:px-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-2xl font-semibold text-primary md:text-3xl">
                  {s.value}
                </p>
                <p className="text-xs leading-snug text-muted-foreground md:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6">
          <div className="mb-8 max-w-2xl">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              Everything you need to deal with government, in one place
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <Card key={f.title} className={!f.available ? 'opacity-70' : undefined}>
                  <CardContent className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5.5" aria-hidden />
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-medium">{f.title}</h3>
                        {!f.available && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                            Coming soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {f.body}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground md:px-6">
          <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <p>Smart Bharat AI — an AI-powered civic companion.</p>
            <p>
              Information is AI-generated. Always verify on official government
              portals.
            </p>
          </div>
          <p>
            How we handle your data: we don&apos;t store your personal
            details — profile inputs are used only to generate your answer
            and are not retained.
          </p>
        </div>
      </footer>
    </div>
  )
}
