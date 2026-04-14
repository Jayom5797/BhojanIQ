import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const steps = [
  {
    num: '1',
    icon: 'upload_file',
    color: 'text-primary',
    bg: 'bg-primary/10',
    numColor: 'text-surface-container-highest/40',
    title: 'Upload or Describe',
    desc: 'Snap a photo of your meal or type a quick description. Our vision system handles everything from blurred labels to messy plates.',
  },
  {
    num: '2',
    icon: 'neurology',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    numColor: 'text-secondary/10',
    title: 'AI Analyzes',
    desc: 'Multi-modal LLMs decompose the input, cross-referencing ingredients against our database and your health goals.',
  },
  {
    num: '3',
    icon: 'verified',
    color: 'text-primary',
    bg: 'bg-primary/20',
    numColor: 'text-primary/10',
    title: 'Instant Decision',
    desc: 'Receive a binary GO or AVOID signal backed by precise macros, allergy alerts, and metabolic impact forecasts.',
    highlight: true,
  },
]

const techStack = [
  { name: 'Gemini 1.5 Pro', color: 'bg-gradient-to-br from-blue-400 to-purple-500' },
  { name: 'Vertex AI', color: 'bg-[#4285F4]' },
  { name: 'Cloud Vision', color: 'bg-[#34A853]' },
  { name: 'Cloud NLP', color: 'bg-[#FBBC04]' },
  { name: 'Cloud Run', color: 'bg-[#34A853]' },
  { name: 'Firestore', color: 'bg-[#FF6D00]' },
  { name: 'Cloud Storage', color: 'bg-[#4285F4]' },
  { name: 'Cloud Translation', color: 'bg-[#EA4335]' },
  { name: 'Cloud Logging', color: 'bg-[#9C27B0]' },
]

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 lg:px-24">
        {/* Hero */}
        <header className="max-w-4xl mx-auto text-center mb-24">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            The Science of <span className="text-gradient">Smarter Consumption</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            From raw data to actionable nutrition intelligence in under 3 seconds.
          </p>
        </header>

        {/* Steps */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-32 max-w-6xl mx-auto">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant to-transparent -z-10" />

          {steps.map(({ num, icon, color, bg, numColor, title, desc, highlight }) => (
            <div key={num} className={`glass-panel p-8 rounded-xl border ${highlight ? 'border-primary/20' : 'border-outline-variant/10'} relative group overflow-hidden`}>
              <div className={`absolute -right-4 -top-8 font-headline font-black text-9xl ${numColor} pointer-events-none`}>{num}</div>
              <div className={`mb-8 w-16 h-16 rounded ${bg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${color} text-4xl`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              </div>
              <h3 className={`font-headline text-2xl font-bold mb-4 ${highlight ? 'text-primary' : ''}`}>{title}</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">{desc}</p>
              {highlight && (
                <div className="h-24 w-full rounded bg-primary/5 flex flex-col items-center justify-center border border-primary/20">
                  <span className="font-headline font-black text-3xl text-primary tracking-widest">SAFE TO EAT</span>
                  <span className="font-label text-[0.6875rem] uppercase tracking-widest text-primary mt-1">Decision Confirmed</span>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Tech Stack */}
        <section className="max-w-5xl mx-auto py-20 border-t border-surface-container-highest">
          <div className="text-center mb-12">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">The Tactical Core</span>
            <h2 className="font-headline text-3xl font-bold mt-4">Powered by Enterprise Intelligence</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map(({ name, color }) => (
              <div key={name} className="flex items-center gap-3 bg-surface-container-highest px-6 py-3 rounded-full border border-outline-variant/20">
                <div className={`w-5 h-5 rounded-full ${color}`} />
                <span className="font-headline font-medium text-sm">{name}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-surface-container rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-8">Ready to decode your diet?</h2>
            <Link
              to="/analyze"
              className="inline-block bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-black text-xl px-12 py-5 rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(47,243,173,0.2)]"
            >
              Try BhojanIQ Free
            </Link>
            <p className="mt-6 text-on-surface-variant text-sm uppercase tracking-widest">No credit card required</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
