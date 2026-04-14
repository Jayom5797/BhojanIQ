import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const DEMO_HISTORY = [
  {
    id: 1,
    food: 'Quinoa & Roasted Veggie Bowl',
    decision: 'eat',
    time: 'Today, 12:45 PM',
    explanation: 'Excellent choice for sustained glucose stability. High fiber and complex carbohydrates identified.',
    macros: { protein: '18g', carbs: '42g', fats: '12g' },
  },
  {
    id: 2,
    food: 'Caramel Macchiato',
    decision: 'modify',
    time: 'Today, 08:30 AM',
    explanation: 'High sugar syrup detected. Swap for almond milk and reduce syrup pumps to 1.',
    tags: ['High Sugar', 'Caffeine'],
  },
  {
    id: 3,
    food: 'Double Cheeseburger',
    decision: 'avoid',
    time: 'Yesterday, 07:15 PM',
    explanation: 'Severe inflammatory markers detected. High trans-fat and refined sodium exceeds daily limit.',
    tags: ['High Sodium', 'Trans Fats', 'Refined Flour'],
  },
  {
    id: 4,
    food: 'Grilled Salmon & Asparagus',
    decision: 'eat',
    time: 'Yesterday, 12:00 PM',
    explanation: 'High Omega-3 content confirmed. Optimal micronutrient profile for cognitive recovery.',
    macros: { protein: '34g', carbs: '8g', fats: '18g' },
  },
]

const decisionStyle = {
  eat: { chip: 'bg-primary/10 text-primary border-primary/20', border: 'border-primary/10 hover:border-primary/30', dot: 'border-primary shadow-[0_0_10px_rgba(47,243,173,0.5)]', label: 'Go: Eat' },
  modify: { chip: 'bg-secondary/10 text-secondary border-secondary/20', border: 'border-secondary/10 hover:border-secondary/30', dot: 'border-secondary shadow-[0_0_10px_rgba(150,145,255,0.5)]', label: 'Modify' },
  avoid: { chip: 'bg-error/10 text-error border-error/20', border: 'border-error/10 hover:border-error/30', dot: 'border-error shadow-[0_0_10px_rgba(255,113,108,0.5)]', label: 'Avoid' },
}

const filters = ['All', 'Eat', 'Modify', 'Avoid']

export default function MealHistory() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = DEMO_HISTORY.filter(h =>
    activeFilter === 'All' || h.decision === activeFilter.toLowerCase()
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-primary font-headline font-bold text-sm tracking-[0.2em] uppercase mb-2 block">Archive System</span>
              <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Intelligence Log</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex bg-surface-container rounded-xl p-1">
                {filters.map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      activeFilter === f ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Timeline */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-32 h-32 bg-surface-container rounded-full flex items-center justify-center mb-6 border border-outline-variant/10">
              <span className="material-symbols-outlined text-6xl text-outline">history_toggle_off</span>
            </div>
            <h3 className="text-2xl font-headline font-bold mb-2">No Records Found</h3>
            <p className="text-on-surface-variant max-w-xs">Your command center is clear. Scan a meal to begin tracking.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/20 via-surface-container-highest to-primary/20 -translate-x-1/2" />

            {filtered.map((entry, i) => {
              const style = decisionStyle[entry.decision]
              const isLeft = i % 2 === 0
              return (
                <div key={entry.id} className={`relative group ${!isLeft ? 'md:mt-16' : ''}`}>
                  {/* Timeline dot */}
                  <div className={`hidden md:block absolute ${isLeft ? '-right-[44px]' : '-left-[44px]'} top-12 z-10 w-6 h-6 rounded-full bg-surface border-4 ${style.dot}`} />

                  <div className={`bg-surface-container rounded-2xl p-6 border ${style.border} transition-all duration-300`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{entry.time}</p>
                        <h3 className="text-xl font-headline font-bold">{entry.food}</h3>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full border ${style.chip} whitespace-nowrap ml-2`}>
                        {style.label}
                      </span>
                    </div>

                    <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{entry.explanation}</p>

                    {entry.macros && (
                      <div className="grid grid-cols-3 gap-4 p-4 bg-surface-container-low rounded-xl">
                        {Object.entries(entry.macros).map(([k, v]) => (
                          <div key={k} className="text-center">
                            <span className="block text-[10px] text-on-surface-variant font-bold uppercase">{k}</span>
                            <span className="text-primary font-headline font-bold">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {entry.tags && (
                      <div className="flex gap-2 flex-wrap">
                        {entry.tags.map(t => (
                          <span key={t} className="bg-surface-container-highest text-on-surface-variant text-[10px] font-bold px-3 py-1 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
