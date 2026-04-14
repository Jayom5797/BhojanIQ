import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const features = [
  {
    icon: 'query_stats',
    color: 'text-primary',
    border: 'border-primary/20 hover:border-primary',
    glow: 'group-hover:bg-primary/20',
    title: 'Instant Analysis',
    desc: 'Upload a photo or describe your meal. Our neural network decomposes ingredients in milliseconds.',
    cta: 'Initialize Scan',
    ctaColor: 'text-primary',
  },
  {
    icon: 'psychology',
    color: 'text-secondary',
    border: 'border-secondary/20 hover:border-secondary',
    glow: 'group-hover:bg-secondary/20',
    title: 'Context-Aware',
    desc: 'BhojanIQ learns your goals and recent meals to provide hyper-personalized verdicts.',
    cta: 'View Logic',
    ctaColor: 'text-secondary',
  },
  {
    icon: 'encrypted',
    color: 'text-tertiary',
    border: 'border-tertiary/20 hover:border-tertiary',
    glow: 'group-hover:bg-tertiary/20',
    title: 'Zero Tracking',
    desc: 'No endless logging. No manual entry. AI does the heavy lifting so you decide fast.',
    cta: 'Privacy Specs',
    ctaColor: 'text-tertiary',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-16">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2ff3ad" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary-fixed">
              Intelligence Command Active
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter leading-[0.9] mb-6">
            Eat Smart.<br />
            <span className="text-gradient">Decide Fast.</span>
          </h1>

          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Real-time AI guidance for every food decision —{' '}
            <span className="text-on-surface font-medium">before you take a bite.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/analyze" className="btn-primary text-lg w-full sm:w-auto text-center">
              Try It Now
            </Link>
            <Link to="/how-it-works" className="btn-ghost text-lg w-full sm:w-auto flex items-center justify-center gap-2">
              See How It Works
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 px-6 md:px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-black text-secondary mb-4">Core Protocols</h2>
            <h3 className="text-4xl font-headline font-bold">The Tactical Advantage</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(({ icon, color, border, glow, title, desc, cta, ctaColor }) => (
              <div key={title} className={`group relative p-8 rounded-2xl glass-panel border ${border} transition-all duration-500 overflow-hidden`}>
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl ${glow} transition-all`} />
                <div className={`mb-6 w-14 h-14 flex items-center justify-center rounded-xl bg-surface-container-highest border border-outline-variant ${color}`}>
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <h4 className="text-xl font-headline font-bold mb-4">{title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                <div className={`mt-8 flex items-center gap-2 ${ctaColor} font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity`}>
                  {cta} <span className="material-symbols-outlined text-xs">chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
