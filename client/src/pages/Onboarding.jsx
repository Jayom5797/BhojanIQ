import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useUser } from '../context/UserContext'

const goals = [
  { id: 'lose-weight', label: 'Lose Weight', icon: 'weight', color: 'text-primary', bg: 'bg-primary/10 group-hover:bg-primary/20' },
  { id: 'stay-fit', label: 'Stay Fit', icon: 'exercise', color: 'text-secondary', bg: 'bg-secondary/10 group-hover:bg-secondary/20' },
  { id: 'eat-balanced', label: 'Eat Balanced', icon: 'nutrition', color: 'text-tertiary', bg: 'bg-tertiary/10 group-hover:bg-tertiary/20' },
  { id: 'muscle-gain', label: 'Muscle Gain', icon: 'fitness_center', color: 'text-primary', bg: 'bg-primary/10 group-hover:bg-primary/20' },
]

const diets = ['Veg', 'Non-Veg', 'Vegan', 'No Preference']

const steps = [
  { id: 'target', label: 'Target' },
  { id: 'protocol', label: 'Protocol' },
  { id: 'economy', label: 'Economy' },
]

export default function Onboarding() {
  const { profile, setProfile } = useUser()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [local, setLocal] = useState({ ...profile })

  const handleFinish = () => {
    setProfile(local)
    navigate('/analyze')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Step indicators */}
        <div className="flex justify-center items-center gap-6 mb-16">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setStep(i)}>
              <div className={`w-12 h-1 rounded-full transition-all ${i <= step ? 'bg-primary shadow-[0_0_8px_rgba(47,243,173,0.6)]' : 'bg-surface-container-highest'}`} />
              <span className={`text-[0.6875rem] font-bold tracking-widest uppercase ${i <= step ? 'text-primary' : 'text-outline'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-4">Initialize Profile</h1>
          <p className="text-on-surface-variant max-w-md mx-auto">
            Calibrating your intelligence matrix for personalized nutritional guidance.
          </p>
        </div>

        {/* Step 1: Goal */}
        {step === 0 && (
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>target</span>
              <h2 className="text-xl font-headline font-semibold">What's your goal?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {goals.map(({ id, label, icon, color, bg }) => (
                <div
                  key={id}
                  onClick={() => setLocal(p => ({ ...p, goal: label }))}
                  className={`group glass-panel p-6 rounded-xl cursor-pointer transition-all hover:bg-surface-container-highest border ${local.goal === label ? 'border-primary' : 'border-outline-variant/20'}`}
                >
                  <div className={`w-12 h-12 rounded-lg ${bg} flex items-center justify-center mb-4 transition-colors`}>
                    <span className={`material-symbols-outlined ${color} text-3xl`}>{icon}</span>
                  </div>
                  <h3 className="font-headline font-bold text-lg mb-1">{label}</h3>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Step 2: Diet */}
        {step === 1 && (
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
              <h2 className="text-xl font-headline font-semibold">Diet preference?</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {diets.map(d => (
                <button
                  key={d}
                  onClick={() => setLocal(p => ({ ...p, diet: d }))}
                  className={`px-8 py-3 rounded-full font-bold tracking-tight transition-all ${
                    local.diet === d
                      ? 'bg-secondary text-on-secondary shadow-[0_0_15px_rgba(150,145,255,0.4)]'
                      : 'bg-surface-container border border-outline-variant hover:border-secondary hover:text-secondary'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Step 3: Budget */}
        {step === 2 && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                <h2 className="text-xl font-headline font-semibold">Typical meal budget?</h2>
              </div>
              <div className="text-2xl font-headline font-bold text-primary">₹{local.budget}</div>
            </div>
            <div className="bg-surface-container p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <input
                type="range"
                min="50"
                max="500"
                value={local.budget}
                onChange={e => setLocal(p => ({ ...p, budget: Number(e.target.value) }))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary relative z-10"
              />
              <div className="flex justify-between mt-6 text-[0.6875rem] font-bold text-outline tracking-widest uppercase">
                <span>MIN: ₹50</span>
                <span>TARGET RANGE</span>
                <span>MAX: ₹500</span>
              </div>
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="pt-12 flex justify-between items-center">
          <button
            onClick={() => step > 0 ? setStep(s => s - 1) : null}
            className="text-on-surface-variant font-headline font-bold uppercase tracking-widest text-xs hover:text-on-surface transition-colors"
          >
            {step > 0 ? 'Back' : 'Skip for now'}
          </button>
          <button
            onClick={() => step < 2 ? setStep(s => s + 1) : handleFinish()}
            className="group flex items-center gap-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-black px-10 py-4 rounded-xl shadow-[0_4px_20px_rgba(47,243,173,0.3)] hover:scale-[1.02] transition-transform"
          >
            {step < 2 ? 'NEXT COMMAND' : 'LAUNCH'}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
