import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import DecisionBadge from '../components/ui/DecisionBadge'
import { useUser } from '../context/UserContext'

export default function DecisionResult() {
  const { lastResult } = useUser()
  const navigate = useNavigate()

  // Fallback demo data if accessed directly
  const result = lastResult || {
    decision: 'modify',
    foodDetected: 'Pepperoni Pizza',
    confidence: 95,
    explanation: 'Based on your evening timing and earlier heavy lunch, high-carb intake is not recommended. Specific modifications will optimize your metabolic response.',
    suggestions: ['Switch to thin crust', 'Reduce portion', 'Add a salad'],
    alternatives: [
      { name: 'Garden Green Bowl', reason: 'Low glycemic index keeps insulin stable.' },
      { name: 'Minestrone Soup', reason: 'High fiber aligns with your daily macro targets.' },
      { name: 'Grilled Salmon', reason: 'Omega-3s support neural recovery during rest.' },
    ],
  }

  const decisionKey = result.decision?.toLowerCase() || 'eat'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Result Card */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-surface-container rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 blur-[100px]" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <span className="font-label text-[0.6875rem] uppercase tracking-widest text-primary font-bold">
                    Intelligence Verdict
                  </span>
                  <DecisionBadge decision={decisionKey} />
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="flex h-3 w-3 rounded-full bg-primary animate-pulse" />
                    <span className="text-on-surface-variant font-medium">Detected: {result.foodDetected}</span>
                    <span className="bg-surface-container-highest px-2 py-0.5 rounded text-[10px] text-primary-fixed border border-primary/20">
                      {result.confidence}% CONFIDENCE
                    </span>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="mt-8 p-6 rounded-xl glass-panel border border-outline-variant/10">
                <h3 className="font-headline text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  AI Analysis
                </h3>
                <p className="text-on-surface-variant leading-relaxed">{result.explanation}</p>
              </div>

              {/* Suggestions */}
              <div className="mt-8">
                <span className="font-label text-[0.6875rem] uppercase tracking-widest text-on-surface-variant block mb-4">
                  Strategic Adjustments
                </span>
                <div className="flex flex-wrap gap-3">
                  {result.suggestions?.map((s, i) => (
                    <div key={i} className="px-4 py-2 rounded-full bg-secondary/15 border border-secondary/20 text-secondary font-medium text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 btn-primary py-4 text-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">history_edu</span>
                Save to History
              </button>
              <button
                onClick={() => navigate('/analyze')}
                className="flex-1 border border-outline-variant/30 text-on-surface py-4 rounded-xl font-headline font-bold text-lg hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">restart_alt</span>
                Analyze Another
              </button>
            </div>
          </section>

          {/* Alternatives Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-container-high rounded-2xl p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline text-xl font-bold">Optimal Alternatives</h2>
                <span className="material-symbols-outlined text-secondary">alt_route</span>
              </div>
              <div className="flex flex-col gap-4">
                {result.alternatives?.map((alt, i) => (
                  <div key={i} className="group bg-surface-container-highest p-4 rounded-xl border border-transparent hover:border-secondary/30 transition-all cursor-pointer">
                    <h4 className="font-bold text-on-surface mb-1">{alt.name}</h4>
                    <p className="text-xs text-on-surface-variant leading-snug">{alt.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  )
}
