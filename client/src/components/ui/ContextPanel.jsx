import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const items = [
  { key: 'goal', label: 'Active Goal', icon: 'track_changes', color: 'text-primary' },
  { key: 'diet', label: 'Dietary Preference', icon: 'restaurant', color: 'text-secondary' },
  { key: 'budget', label: 'Meal Budget', icon: 'payments', color: 'text-tertiary' },
]

export default function ContextPanel() {
  const { profile } = useUser()
  const navigate = useNavigate()

  return (
    <div className="glass-panel border border-outline-variant/20 rounded-2xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline text-xl font-bold">Your Context</h2>
        <span className="text-[10px] font-black bg-secondary/15 text-secondary px-2 py-0.5 rounded tracking-widest uppercase">
          Active Profile
        </span>
      </div>

      <div className="space-y-4">
        {items.map(({ key, label, icon, color }) => (
          <div
            key={key}
            className="group flex items-start gap-4 p-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => navigate('/onboarding')}
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
              <span className={`material-symbols-outlined ${color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {icon}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black text-outline uppercase tracking-widest">{label}</p>
              <p className="font-semibold text-on-surface">
                {key === 'budget' ? `₹${profile.budget}` : profile[key] || 'Not set'}
              </p>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary text-lg transition-colors">edit</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-outline-variant/10">
        <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/20">
          <span className="material-symbols-outlined text-primary text-sm">info</span>
          <p className="text-xs text-on-surface-variant">AI calibrates results against these metrics.</p>
        </div>
      </div>
    </div>
  )
}
